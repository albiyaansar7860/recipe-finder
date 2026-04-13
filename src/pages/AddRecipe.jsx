import React, { useState } from 'react';
import { ChefHat, Image as ImageIcon, Sparkles, Plus, AlertCircle } from 'lucide-react';
import { recipeService } from '../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    category: 'Breakfast',
    image: '',
    ingredients: '',
    instructions: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipe.title || !recipe.ingredients || !recipe.instructions) {
      toast.error('Please fill in all required fields');
      return;
    }

    recipeService.add(recipe);
    toast.success('Recipe added successfully!');
    navigate('/admin/manage');
  };

  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
          <ChefHat size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Create New Recipe</h1>
          <p className="text-text-muted">Share your culinary masterpiece with the world.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-bg-card border border-border rounded-3xl p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Recipe Title *</label>
              <input
                type="text"
                className="w-full h-12 px-4 bg-bg-main border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="e.g. Grandma's Secret Pasta"
                value={recipe.title}
                onChange={(e) => setRecipe({...recipe, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Category</label>
              <select
                className="w-full h-12 px-4 bg-bg-main border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                value={recipe.category}
                onChange={(e) => setRecipe({...recipe, category: e.target.value})}
              >
                <option>Breakfast</option>
                <option>Beef</option>
                <option>Chicken</option>
                <option>Dessert</option>
                <option>Lamb</option>
                <option>Pasta</option>
                <option>Seafood</option>
                <option>Vegan</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 flex items-center gap-2">
              <ImageIcon size={16} /> Image URL
            </label>
            <input
              type="url"
              className="w-full h-12 px-4 bg-bg-main border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="https://example.com/image.jpg"
              value={recipe.image}
              onChange={(e) => setRecipe({...recipe, image: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 flex items-center gap-2">
              <Sparkles size={16} className="text-primary" /> Ingredients (comma separated) *
            </label>
            <textarea
              className="w-full min-h-[120px] p-4 bg-bg-main border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
              placeholder="e.g. 2 cups flour, 1 egg, 1/2 cup milk..."
              value={recipe.ingredients}
              onChange={(e) => setRecipe({...recipe, ingredients: e.target.value})}
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold ml-1">Instructions *</label>
            <textarea
              className="w-full min-h-[200px] p-4 bg-bg-main border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
              placeholder="Step by step instructions..."
              value={recipe.instructions}
              onChange={(e) => setRecipe({...recipe, instructions: e.target.value})}
            ></textarea>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-xl flex items-start gap-4 text-primary text-sm">
             <AlertCircle className="shrink-0 mt-0.5" size={20} />
             <p className="font-medium">Make sure your content is high-quality and includes accurate measurements for the best experience for your users.</p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/admin/manage')}
            className="px-8 py-3 rounded-xl font-bold border border-border hover:bg-black/5 dark:hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} /> Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
