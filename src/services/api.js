import axios from "axios";

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

// --- MOCK AUTH SERVICE ---
const INITIAL_USERS = [
  { id: 1, name: "Admin", email: "admin@gmail.com", password: "123", role: "admin" }
];

export const authService = {
  login: (email, password) => {
    let users = JSON.parse(localStorage.getItem("users"));
    
    // Seed default admin if no users exist
    if (!users || users.length === 0) {
      users = INITIAL_USERS;
      localStorage.setItem("users", JSON.stringify(users));
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: "Invalid email or password" };
  },
  
  register: (name, email, password, role = "user") => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Ensure initial users are present if empty
    if (users.length === 0) {
      users = [...INITIAL_USERS];
    }

    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email already registered" };
    }
    const newUser = { id: Date.now(), name, email, password, role }; 
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
  },

  
  getCurrentUser: () => JSON.parse(localStorage.getItem("currentUser")),
  
  logout: () => localStorage.removeItem("currentUser"),
};


// --- LOCAL RECIPE SERVICE (For Admin) ---
export const recipeService = {
  getAll: () => JSON.parse(localStorage.getItem("customRecipes") || "[]"),
  
  add: (recipe) => {
    const recipes = JSON.parse(localStorage.getItem("customRecipes") || "[]");
    const newRecipe = { ...recipe, id: `local_${Date.now()}` };
    recipes.push(newRecipe);
    localStorage.setItem("customRecipes", JSON.stringify(recipes));
    return newRecipe;
  },
  
  update: (id, updatedRecipe) => {
    const recipes = JSON.parse(localStorage.getItem("customRecipes") || "[]");
    const index = recipes.findIndex(r => r.id === id);
    if (index !== -1) {
      recipes[index] = { ...updatedRecipe, id };
      localStorage.setItem("customRecipes", JSON.stringify(recipes));
      return true;
    }
    return false;
  },
  
  delete: (id) => {
    const recipes = JSON.parse(localStorage.getItem("customRecipes") || "[]");
    const filtered = recipes.filter(r => r.id !== id);
    localStorage.setItem("customRecipes", JSON.stringify(filtered));
  },
  
  toggleFavorite: (recipeId) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const index = favorites.indexOf(recipeId);
    if (index === -1) {
      favorites.push(recipeId);
    } else {
      favorites.splice(index, 1);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    return favorites;
  },
  
  getFavorites: () => JSON.parse(localStorage.getItem("favorites") || "[]"),
};