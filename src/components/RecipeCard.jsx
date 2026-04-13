import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, ArrowRight, ChefHat } from 'lucide-react';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group card-premium overflow-hidden flex flex-col h-full bg-white"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={recipe.strMealThumb || recipe.image} 
          alt={recipe.strMeal || recipe.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-primary text-xs font-bold shadow-sm">
            <ChefHat size={14} />
            {recipe.strCategory || 'Gourmet'}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={handleToggleFavorite}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md ${
            isFavorite ? 'bg-red-500 text-white scale-110' : 'bg-white/80 text-text-muted hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {recipe.strMeal || recipe.title}
        </h3>
        
        <p className="text-sm text-text-muted line-clamp-2 mb-2 leading-relaxed">
          {recipe.strInstructions || recipe.description || "Discover the secrets of this amazing culinary masterpiece. Click to view full details."}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
          <div className="flex items-center gap-2 text-text-muted text-xs font-semibold">
            <Clock size={16} className="text-primary" />
            <span>25 - 35 min</span>
          </div>
          
          <button 
            onClick={() => navigate(`/recipe/${recipe.idMeal || recipe.id}`)}
            className="flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all"
          >
            Details <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;