import React, { useState } from 'react';
import { ChefHat, Image as ImageIcon, Sparkles, Plus, AlertCircle, ArrowLeft } from 'lucide-react';
import { recipeService } from '../services/api';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className="max-w-4xl mx-auto animate-fade">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[32px] flex items-center justify-center shadow-sm">
          <ChefHat size={40} />
        </div>
        <div>
           <Link to="/admin" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all mb-1">
             <ArrowLeft size={16} /> Back to Dashboard
           </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create New Recipe</h1>
          <p className="text-slate-500 font-medium text-lg">Share your culinary masterpiece with the world.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white border border-slate-100 rounded-[48px] p-10 md:p-12 shadow-sm space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-widest block text-left font-black">Recipe Title *</label>
              <input
                type="text"
                className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                placeholder="e.g. Grandma's Secret Pasta"
                value={recipe.title}
                onChange={(e) => setRecipe({...recipe, title: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-widest block text-left font-black">Category</label>
              <select
                className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700 appearance-none"
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

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-widest block text-left font-black flex items-center gap-2">
              <ImageIcon size={18} /> Image URL
            </label>
            <input
              type="url"
              className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
              placeholder="https://images.unsplash.com/photo-..."
              value={recipe.image}
              onChange={(e) => setRecipe({...recipe, image: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-widest block text-left font-black flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-500" /> Ingredients (comma separated) *
            </label>
            <textarea
              className="w-full min-h-[140px] p-6 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all resize-none font-bold text-slate-700"
              placeholder="e.g. 2 cups flour, 1 egg, 1/2 cup milk..."
              value={recipe.ingredients}
              onChange={(e) => setRecipe({...recipe, ingredients: e.target.value})}
            ></textarea>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-widest block text-left font-black">Cooking Instructions *</label>
            <textarea
              className="w-full min-h-[220px] p-6 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all resize-none font-bold text-slate-700"
              placeholder="Step by step instructions to make the dish..."
              value={recipe.instructions}
              onChange={(e) => setRecipe({...recipe, instructions: e.target.value})}
            ></textarea>
          </div>
          
          <div className="bg-emerald-50/50 p-6 rounded-3xl flex items-start gap-4 text-emerald-700 border border-emerald-100">
             <AlertCircle className="shrink-0 mt-0.5" size={20} />
             <p className="font-bold text-sm">Make sure your content is high-quality and includes accurate measurements. This ensures the best experience for your community.</p>
          </div>
        </div>

        <div className="flex justify-end gap-6 items-center">
          <button 
            type="button" 
            onClick={() => navigate('/admin/manage')}
            className="text-slate-400 hover:text-slate-600 font-black uppercase tracking-widest transition-colors"
          >
            Cancel Changes
          </button>
          <button 
            type="submit" 
            className="btn-primary h-16 px-12 text-lg shadow-emerald-200"
          >
            <Plus size={24} className="mr-2" /> Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;

