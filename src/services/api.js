import axios from "axios";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  updateDoc
} from "firebase/firestore";
import { db, auth } from "./firebase";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// --- MEAL DB API ---
export const searchRecipes = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
    return response.data.meals || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/categories.php`);
    return res.data.categories || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRecipesByCategory = async (category) => {
  try {
    const res = await axios.get(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    return res.data.meals || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getRecipeById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    return res.data.meals ? res.data.meals[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// --- FIREBASE AUTH SERVICE ---
export const authService = {
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      return { success: true, user: { ...user, ...userDoc.data() } };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  
  register: async (name, email, password, role = "user") => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        createdAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  logout: () => signOut(auth),

  getUserRole: async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? userDoc.data().role : "user";
  },

  getAllUsers: async () => {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

// --- FIRESTORE RECIPE SERVICE ---
export const recipeService = {
  getAll: async () => {
    const q = query(collection(db, "recipes"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  add: async (recipe) => {
    const newRecipe = {
      ...recipe,
      ingredients: typeof recipe.ingredients === 'string' 
        ? recipe.ingredients.split(',').map(i => i.trim()) 
        : recipe.ingredients,
      createdAt: serverTimestamp()
    };
    const docRef = await addDoc(collection(db, "recipes"), newRecipe);
    return { id: docRef.id, ...newRecipe };
  },
  
  delete: async (id) => {
    await deleteDoc(doc(db, "recipes", id));
  },

  // Real-time synchronization
  subscribeToRecipes: (callback) => {
    const q = query(collection(db, "recipes"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(recipes);
    });
  },

  toggleFavorite: async (userId, recipeId) => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const favorites = userDoc.data()?.favorites || [];
    
    if (favorites.includes(recipeId)) {
      await updateDoc(userRef, { favorites: arrayRemove(recipeId) });
    } else {
      await updateDoc(userRef, { favorites: arrayUnion(recipeId) });
    }
  },

  getFavorites: async (userId) => {
    if (!userId) return [];
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.data()?.favorites || [];
  }
};
