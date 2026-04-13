import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById, recipeService } from '../services/api';
import { Clock, Users, ChefHat, ArrowLeft, Heart, CheckCircle2, Share2, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      if (id.startsWith('local_')) {
        const custom = recipeService.getAll().find(r => r.id === id);
        setRecipe(custom);
      } else {
        const data = await getRecipeById(id);
        setRecipe(data);
      }
      
      const favorites = recipeService.getFavorites();
      setIsFavorite(favorites.includes(id));
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  const toggleFavorite = () => {
    recipeService.toggleFavorite(id);
    setIsFavorite(!isFavorite);
  };

  if (loading) return (
    <div className="min-h-[calc(100vh-var(--navbar-height))] flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-text-muted font-bold animate-pulse uppercase tracking-widest text-xs">Preparing Recipe...</p>
    </div>
  );

  if (!recipe) return (
    <div className="container py-32 text-center space-y-6">
      <div className="text-6xl mb-4">🙊</div>
      <h2 className="text-4xl font-extrabold">Recipe not found!</h2>
      <p className="text-text-muted text-lg max-w-md mx-auto">This recipe might have been removed or the link is incorrect.</p>
      <Link to="/" className="btn btn-primary btn-pill px-10">Back to Recipes</Link>
    </div>
  );

  const ingredients = [];
  if (!id.startsWith('local_')) {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
  } else {
    const parts = recipe.ingredients.split(',');
    parts.forEach(p => ingredients.push({ ingredient: p.trim(), measure: '' }));
  }

  return (
    <div className="bg-bg-main min-h-screen pb-24">
      {/* Header Section */}
      <div className="bg-white border-b border-border py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Image Container */}
            <div className="w-full md:w-1/2 lg:w-5/12 animate-fade">
              <div className="relative rounded-[32px] overflow-hidden shadow-premium aspect-[4/3] group">
                <img 
                  src={recipe.strMealThumb || recipe.image} 
                  alt={recipe.strMeal || recipe.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button 
                  onClick={toggleFavorite}
                  className={`absolute top-6 right-6 p-4 rounded-full shadow-2xl transition-all scale-110 z-10 ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-md text-text-muted hover:bg-white hover:text-red-500'
                  }`}
                >
                  <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Title & Info */}
            <div className="w-full md:w-1/2 lg:w-7/12 space-y-8 animate-fade" style={{ animationDelay: '0.1s' }}>
              <div className="space-y-4">
                <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all mb-2">
                  <ArrowLeft size={18} /> Back to discover
                </Link>
                <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-bold text-xs uppercase tracking-wider">
                     {recipe.strCategory || recipe.category}
                   </span>
                   {recipe.strArea && (
                     <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-bold text-xs uppercase tracking-wider">
                       {recipe.strArea} Cuisine
                     </span>
                   )}
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">{recipe.strMeal || recipe.title}</h1>
              </div>

              <div className="flex flex-wrap gap-8 items-center pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Time</p>
                    <p className="font-bold">35-45 Mins</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Serves</p>
                    <p className="font-bold">4 People</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                    <ChefHat size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Difficulty</p>
                    <p className="font-bold">Intermediate</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button className="btn btn-primary btn-pill h-14 px-8 shadow-md">Start Cooking</button>
                <button className="p-3 rounded-full border border-border hover:bg-bg-main transition-colors text-text-muted">
                  <Share2 size={24} />
                </button>
                <button className="p-3 rounded-full border border-border hover:bg-bg-main transition-colors text-text-muted">
                  <Printer size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Ingredients Column */}
          <div className="lg:col-span-4 space-y-8 animate-fade" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white border border-border rounded-[32px] p-8 md:p-10 shadow-sm sticky top-32">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 pb-4 border-b border-border">
                <ChefHat className="text-primary" /> Ingredients
              </h3>
              <ul className="space-y-6">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="text-primary" size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-text-main text-lg leading-tight">{item.ingredient}</span>
                      {item.measure && <span className="text-sm text-text-muted font-medium mt-1 uppercase tracking-wider">{item.measure}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions Column */}
          <div className="lg:col-span-8 space-y-12 animate-fade" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white border border-border rounded-[32px] p-8 md:p-12 shadow-sm">
              <h3 className="text-3xl font-bold mb-10">Cooking Instructions</h3>
              <div className="space-y-10">
                {(recipe.strInstructions || recipe.instructions).split('\n').filter(step => step.trim()).map((step, index) => {
                  // Clean up step text (remove leading numbers/bullets)
                  const cleanedStep = step.replace(/^\d+[\.\)]\s*/, '').trim();
                  return (
                    <div key={index} className="flex gap-8 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-bg-main text-text-muted group-hover:bg-primary group-hover:text-white rounded-2xl flex items-center justify-center font-extrabold text-xl transition-all duration-300">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-4">
                        <p className="text-xl leading-relaxed text-text-main font-medium pt-1">
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
                <h4 className="text-sm font-bold text-text-muted uppercase tracking-[0.2em] mb-6">Recipe Tags</h4>
                <div className="flex flex-wrap gap-3">
                  {recipe.strTags.split(',').map(tag => (
                    <span key={tag} className="px-5 py-2.5 bg-white border border-border rounded-full text-sm font-bold text-text-muted hover:border-primary hover:text-primary transition-all cursor-pointer">
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