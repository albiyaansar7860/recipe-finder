import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getRecipeById, recipeService } from '../services/api';
import { Heart, Loader2, Sparkles, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Favorites = () => {
  const { userData, loading: authLoading } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userData?.favorites) {
        setFavoriteRecipes([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const favoriteIds = userData.favorites;
      const customRecipes = await recipeService.getAll();
      
      const recipes = [];
      
      // Fetch from MealDB or Firestore
      for (const id of favoriteIds) {
        // If it's a numeric string, it's MealDB
        if (!isNaN(id)) {
          const recipe = await getRecipeById(id);
          if (recipe) recipes.push(recipe);
        } else {
          // Check in custom recipes
          const custom = customRecipes.find(r => r.id === id);
          if (custom) recipes.push(custom);
        }
      }
      
      setFavoriteRecipes(recipes);
      setLoading(false);
    };

    if (!authLoading) {
      fetchFavorites();
    }
  }, [userData, authLoading]);

  return (
    <div className="bg-bg-main min-h-[calc(100vh-70px)]">
      <div className="container-saas py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left animate-fade">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all mb-2">
              <ArrowLeft size={18} /> Back to discover
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} /> Your Collection
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-4">
              <Heart className="text-red-500 fill-red-500" size={40} /> My Favorites
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              You have {favoriteRecipes.length} recipes saved in your personal wishlist.
            </p>
          </div>
          
          <Link to="/" className="btn-primary h-14 px-8 shadow-emerald-200">
            <ShoppingBag size={20} className="mr-2" /> Discover More
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white border border-slate-100 rounded-[32px] h-[400px] animate-pulse">
                <div className="h-56 bg-slate-50 rounded-t-[32px]"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-50 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : favoriteRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 animate-fade">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal || recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-8 text-center bg-white border border-slate-100 rounded-[48px] shadow-sm animate-fade">
            <div className="w-28 h-28 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
              <Heart size={56} strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-slate-900">Your collection is empty</h3>
              <p className="text-slate-500 text-lg max-w-sm mx-auto font-medium">
                Explore our recipes and tap the heart icon to save your next favorite meal here!
              </p>
            </div>
            <Link to="/" className="btn-primary px-10 h-14 text-lg">
              Start Exploring
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;