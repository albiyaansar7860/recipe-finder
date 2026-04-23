import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, ChevronRight, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recipeService } from '../services/api';
import { toast } from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';

const RecipeCard = ({ recipe }) => {
  const { userData, currentUser } = useAuth();
  const navigate = useNavigate();
  const id = recipe.idMeal || recipe.id;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (userData?.favorites) {
      setIsFavorite(userData.favorites.includes(id));
    }
  }, [userData, id]);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    if (!currentUser) {
      toast.error('Please login to save favorites');
      return;
    }
    await recipeService.toggleFavorite(currentUser.uid, id);
    // State is updated automatically via onSnapshot in AuthContext
  };

  const goToDetails = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500"
    >
      <div onClick={goToDetails} className="cursor-pointer">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={recipe.strMealThumb || recipe.image} 
            alt={recipe.strMeal || recipe.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-sm">
              <ChefHat size={14} className="text-emerald-500" />
              {recipe.strCategory || 'Gourmet'}
            </span>
          </div>

          {/* Favorite Button */}
          <button 
            onClick={handleToggleFavorite}
            className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md ${
              isFavorite ? 'bg-red-500 text-white scale-110' : 'bg-white/80 text-slate-500 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-1 mb-4 leading-tight">
            {recipe.strMeal || recipe.title}
          </h3>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center gap-4 text-slate-500">
              <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest">
                <Clock size={16} className="text-emerald-500" />
                <span>35 Min</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest text-slate-400">
                <ChefHat size={16} />
                <span>Easy</span>
              </div>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all transform group-hover:translate-x-1">
              <ChevronRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;