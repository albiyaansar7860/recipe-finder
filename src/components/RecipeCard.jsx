import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recipeService } from '../services/api';

const RecipeCard = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const favorites = recipeService.getFavorites();
    setIsFavorite(favorites.includes(recipe.idMeal || recipe.id));
  }, [recipe.idMeal, recipe.id]);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    recipeService.toggleFavorite(recipe.idMeal || recipe.id);
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group bg-bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 shadow-sm hover:shadow-xl transition-all cursor-pointer"
      onClick={() => navigate(`/recipe/${recipe.idMeal || recipe.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={recipe.strMealThumb || recipe.image} 
          alt={recipe.strMeal || recipe.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Favorite Button */}
        <button 
          onClick={handleToggleFavorite}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/70 text-black hover:bg-white'
          }`}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="px-2 py-1 rounded bg-primary/10">{recipe.strCategory || 'Custom'}</span>
        </div>
        
        <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
          {recipe.strMeal || recipe.title}
        </h3>
        
        <p className="text-sm text-text-muted line-clamp-2">
          {recipe.strInstructions || recipe.description || "Click to see detailed ingredients and instructions for this delicious meal."}
        </p>

        <div className="pt-4 flex items-center justify-between border-t border-border mt-auto">
          <div className="flex items-center gap-1.5 text-text-muted text-sm font-medium">
            <Clock size={16} />
            <span>25-30 min</span>
          </div>
          
          <button className="flex items-center gap-1 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
            View Details <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;