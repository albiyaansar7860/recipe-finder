import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById, recipeService } from '../services/api';
import { Clock, Users, ChefHat, ArrowLeft, Heart, CheckCircle2, Share2, Printer, Sparkles, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';

const RecipeDetails = () => {
  const { id } = useParams();
  const { userData, currentUser } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        // Check if it's a Firestore ID (usually longer alphanumeric)
        const customRecipes = await recipeService.getAll();
        const custom = customRecipes.find(r => r.id === id);
        
        if (custom) {
          setRecipe(custom);
        } else {
          const data = await getRecipeById(id);
          setRecipe(data);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (userData?.favorites) {
      setIsFavorite(userData.favorites.includes(id));
    }
  }, [userData, id]);

  const toggleFavorite = async () => {
    if (!currentUser) {
      toast.error('Please login to save favorites');
      return;
    }
    await recipeService.toggleFavorite(currentUser.uid, id);
  };

  if (loading) return (
    <div className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center gap-4 bg-white">
      <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="text-slate-400 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Preparing Recipe...</p>
    </div>
  );

  if (!recipe) return (
    <div className="container-saas py-32 text-center space-y-6">
      <div className="text-6xl mb-4">🙊</div>
      <h2 className="text-4xl font-black text-slate-900 tracking-tight">Recipe not found!</h2>
      <p className="text-slate-500 text-lg max-w-md mx-auto font-medium">This recipe might have been removed or the link is incorrect.</p>
      <Link to="/" className="btn-primary px-10">Back to Recipes</Link>
    </div>
  );

  const ingredientsList = [];
  // TheMealDB ID check (usually numeric strings)
  const isApiRecipe = !isNaN(id);
  
  if (isApiRecipe) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredientsList.push({ ingredient, measure });
      }
    }
  } else {
    // Firestore recipes store ingredients as arrays
    const rawIngredients = recipe.ingredients || [];
    if (Array.isArray(rawIngredients)) {
      rawIngredients.forEach(p => ingredientsList.push({ ingredient: p.trim(), measure: '' }));
    } else {
      // Fallback for old data or string format
      rawIngredients.split(',').forEach(p => ingredientsList.push({ ingredient: p.trim(), measure: '' }));
    }
  }

  return (
    <div className="bg-bg-main min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-50 py-12 md:py-20">
        <div className="container-saas">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Image Container */}
            <div className="w-full md:w-1/2 lg:w-5/12 animate-fade">
              <div className="relative rounded-[48px] overflow-hidden shadow-premium aspect-[4/3] group">
                <img 
                  src={recipe.strMealThumb || recipe.image} 
                  alt={recipe.strMeal || recipe.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button 
                  onClick={toggleFavorite}
                  className={`absolute top-6 right-6 p-4 rounded-full shadow-2xl transition-all active:scale-90 z-10 ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-md text-slate-600 hover:text-red-500'
                  }`}
                >
                  <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Title & Info */}
            <div className="w-full md:w-1/2 lg:w-7/12 space-y-8 animate-fade" style={{ animationDelay: '0.1s' }}>
              <div className="space-y-4">
                <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all mb-2">
                  <ArrowLeft size={18} /> Back to discover
                </Link>
                <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-bold text-xs uppercase tracking-widest">
                     {recipe.strCategory || recipe.category}
                   </span>
                   {recipe.strArea && (
                     <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full font-bold text-xs uppercase tracking-widest">
                       {recipe.strArea} Cuisine
                     </span>
                   )}
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">{recipe.strMeal || recipe.title}</h1>
              </div>

              <div className="flex flex-wrap gap-8 items-center pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time</p>
                    <p className="font-bold text-slate-900">45 Mins</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                    <Flame size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Calories</p>
                    <p className="font-bold text-slate-900">320 kcl</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600">
                    <ChefHat size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skill</p>
                    <p className="font-bold text-slate-900">Medium</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button className="btn-primary h-14 px-10 text-lg shadow-emerald-200">Start Cooking</button>
                <div className="flex gap-2">
                  <button className="p-3.5 rounded-full bg-white border border-slate-100 hover:border-emerald-200 hover:text-emerald-500 transition-all text-slate-400">
                    <Share2 size={22} />
                  </button>
                  <button className="p-3.5 rounded-full bg-white border border-slate-100 hover:border-emerald-200 hover:text-emerald-500 transition-all text-slate-400">
                    <Printer size={22} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-saas mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Ingredients Column */}
          <div className="lg:col-span-4 space-y-8 animate-fade" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white border border-slate-100 rounded-[48px] p-8 md:p-10 shadow-sm sticky top-32">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 pb-4 border-b border-slate-50">
                <Sparkles className="text-emerald-500" /> Ingredients
              </h3>
              <ul className="space-y-6">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="text-emerald-500" size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-lg leading-tight">{item.ingredient}</span>
                      {item.measure && <span className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-widest">{item.measure}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions Column */}
          <div className="lg:col-span-8 space-y-12 animate-fade" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white border border-slate-100 rounded-[48px] p-8 md:p-12 shadow-sm">
              <h3 className="text-3xl font-black text-slate-900 mb-10">Cooking Instructions</h3>
              <div className="space-y-10">
                {(recipe.strInstructions || recipe.instructions || '').split('\n').filter(step => step.trim()).map((step, index) => {
                  const cleanedStep = step.replace(/^\d+[\.\)]\s*/, '').trim();
                  return (
                    <div key={index} className="flex gap-8 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-emerald-500 group-hover:text-white rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-300">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-4">
                        <p className="text-xl leading-relaxed text-slate-700 font-medium pt-1">
                          {cleanedStep}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tags Section */}
            {recipe.strTags && (
              <div className="p-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Recipe Tags</h4>
                <div className="flex flex-wrap gap-3">
                  {recipe.strTags.split(',').map(tag => (
                    <span key={tag} className="px-5 py-2.5 bg-white border border-slate-100 rounded-full text-sm font-bold text-slate-500 hover:border-emerald-200 hover:text-emerald-600 transition-all cursor-pointer shadow-sm">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;