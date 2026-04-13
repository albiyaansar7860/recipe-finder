import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { getRecipeById, recipeService } from '../services/api';
import { Heart, Loader2, Search } from 'lucide-react';
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
    <div className="container py-12 min-h-[calc(100vh-72px)]">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold flex items-center justify-center md:justify-start gap-3">
            <Heart className="text-red-500 fill-red-500" size={36} /> My Favorites
          </h1>
          <p className="text-text-muted">You have {favoriteRecipes.length} recipes saved in your collection</p>
        </div>
        
        <Link to="/" className="btn-primary flex items-center gap-2">
          <Search size={20} /> Discover More
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-primary">
          <Loader2 size={48} className="animate-spin" />
          <p className="font-medium">Loading your favorites...</p>
        </div>
      ) : favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteRecipes.map((recipe, index) => (
            <div key={recipe.idMeal || recipe.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-6 text-center border-2 border-dashed border-border rounded-3xl">
          <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
            <Heart size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Your collection is empty</h3>
            <p className="text-text-muted max-w-sm mx-auto">Start exploring and tap the heart icon on any recipe to save it here for later!</p>
          </div>
          <Link to="/" className="btn-primary px-8">
            Start Exploring
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;