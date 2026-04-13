import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById, recipeService } from '../services/api';
import { Clock, Users, ChefHat, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (!recipe) return (
    <div className="container py-20 text-center">
      <h2 className="text-3xl font-bold">Recipe not found!</h2>
      <Link to="/" className="btn-primary mt-6 inline-block">Back to Home</Link>
    </div>
  );

  // Parse MealDB ingredients
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
    // Local recipe ingredients are stored as a string or array
    const parts = recipe.ingredients.split(',');
    parts.forEach(p => ingredients.push({ ingredient: p.trim(), measure: '' }));
  }

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <img 
          src={recipe.strMealThumb || recipe.image} 
          alt={recipe.strMeal || recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-12 text-white">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors glass px-4 py-2 rounded-full">
              <ArrowLeft size={18} /> Back to Search
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{recipe.strMeal || recipe.title}</h1>
            <div className="flex flex-wrap gap-6 items-center">
              <span className="px-4 py-2 bg-primary rounded-full font-bold text-sm uppercase tracking-wider">
                {recipe.strCategory || recipe.category}
              </span>
              <div className="flex items-center gap-2 font-medium">
                <Clock size={20} className="text-primary" /> 30-45 Mins
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Users size={20} className="text-primary" /> 4 Servings
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={toggleFavorite}
          className={`absolute bottom-12 right-6 md:right-12 p-4 rounded-full shadow-2xl transition-all scale-110 ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-red-50'
          }`}
        >
          <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="container mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-bg-card border border-border rounded-3xl p-8 sticky top-24">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <ChefHat className="text-primary" /> Ingredients
              </h3>
              <ul className="space-y-4">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0">
                    <CheckCircle2 className="text-primary mt-1 shrink-0" size={18} />
                    <span className="font-medium">
                      {item.measure && <span className="text-primary mr-2 font-bold">{item.measure}</span>}
                      {item.ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-bg-card border border-border rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-8">Cooking Instructions</h3>
              <div className="space-y-6 text-lg leading-relaxed text-text-muted">
                {(recipe.strInstructions || recipe.instructions).split('\n').filter(step => step.trim()).map((step, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-1">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tags/Extra */}
            {recipe.strTags && (
              <div className="flex flex-wrap gap-3">
                {recipe.strTags.split(',').map(tag => (
                  <span key={tag} className="px-4 py-2 bg-bg-card border border-border rounded-full text-sm font-semibold text-text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;