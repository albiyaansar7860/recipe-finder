import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getRecipeById, recipeService } from '../services/api';
import { Heart, Loader2, Sparkles, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const favoriteIds = recipeService.getFavorites();
      const customRecipes = recipeService.getAll();
      
      const recipes = [];
      
      // Fetch from MealDB
      for (const id of favoriteIds) {
        if (!id.toString().startsWith('local_')) {
          const recipe = await getRecipeById(id);
          if (recipe) recipes.push(recipe);
        }
      }
      
      // Filter from local custom recipes
      const favoriteCustom = customRecipes.filter(r => favoriteIds.includes(r.id));
      
      setFavoriteRecipes([...recipes, ...favoriteCustom]);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="bg-bg-main min-h-[calc(100vh-var(--navbar-height))]">
      <div className="container py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-center md:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Your Collection
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center md:justify-start gap-4">
              <Heart className="text-red-500 fill-red-500" size={40} /> My Favorites
            </h1>
            <p className="text-text-muted text-lg">
              You have {favoriteRecipes.length} recipes saved in your personal wishlist.
            </p>
          </div>
          
          <Link to="/" className="btn btn-primary btn-pill h-14 px-8 shadow-lg">
            <ShoppingBag size={20} /> Discover More
          </Link>
        </div>

        {loading ? (
          <div className="grid-main">
            {[1, 2, 3, 4].map(Math.random).map(i => (
              <div key={i} className="card-premium h-[400px] bg-white animate-pulse">
                <div className="h-48 bg-gray-100 rounded-t-2xl"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : favoriteRecipes.length > 0 ? (
          <div className="grid-main animate-fade">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal || recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-8 text-center bg-white border border-border rounded-[32px] shadow-sm animate-fade">
            <div className="w-28 h-28 bg-red-500/5 text-red-500 rounded-full flex items-center justify-center">
              <Heart size={56} strokeWidth={1.5} />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold">Your collection is empty</h3>
              <p className="text-text-muted text-lg max-w-sm mx-auto">
                Explore our recipes and tap the heart icon to save your next favorite meal here!
              </p>
            </div>
            <Link to="/" className="btn btn-primary btn-pill px-10 h-14 text-lg">
              Start Exploring
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;