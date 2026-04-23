import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Search, ExternalLink, Plus, Package, CookingPot } from 'lucide-react';
import { recipeService } from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = recipeService.subscribeToRecipes((data) => {
      setRecipes(data);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      try {
        await recipeService.delete(id);
        toast.success('Recipe deleted from cloud database');
      } catch (error) {
        toast.error('Error deleting recipe: ' + error.message);
      }
    }
  };

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fade">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center gap-5">
           <div className="p-4 bg-emerald-500 text-white rounded-[24px] shadow-lg shadow-emerald-200">
             <Package size={28} />
           </div>
           <div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventory Control</h1>
             <p className="text-slate-500 font-medium">Manage your custom culinary collection.</p>
           </div>
        </div>
        <Link to="/admin/add-recipe" className="btn-primary h-14 px-8 shadow-emerald-200 flex items-center gap-2 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
          Add New Recipe
        </Link>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-premium">
        {/* Search Header */}
        <div className="p-8 border-b border-slate-50 bg-slate-50/30">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Filter recipes by name or category..."
              className="w-full h-14 pl-14 pr-6 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Recipe Identity</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">System ID</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRecipes.length > 0 ? filteredRecipes.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      {recipe.image ? (
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex-shrink-0">
                          <img src={recipe.image} className="w-full h-full object-cover" alt={recipe.title} />
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0">
                          {recipe.title[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <span className="block font-black text-slate-900 group-hover:text-emerald-600 transition-colors tracking-tight leading-none mb-1">{recipe.title}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Added Locally</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest leading-none group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                      {recipe.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <code className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                      {recipe.id.toString().slice(-8)}
                    </code>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/recipe/${recipe.id}`}
                        className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-emerald-500 hover:text-white rounded-xl transition-all"
                        title="View Details"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(recipe.id)}
                        className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white rounded-xl transition-all"
                        title="Delete Recipe"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan="4" className="px-8 py-32 text-center bg-slate-50/10">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-slate-100 text-slate-300 rounded-[32px] flex items-center justify-center">
                          <CookingPot size={40} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xl font-black text-slate-900">No recipes found</p>
                          <p className="text-slate-500 font-medium max-w-[240px] mx-auto">
                            {searchTerm 
                              ? `No results match your search "${searchTerm}"` 
                              : "Your inventory is currently empty. Start creating magic!"}
                          </p>
                        </div>
                        {!searchTerm && (
                          <Link to="/admin/add-recipe" className="mt-4 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200">
                            Create First Recipe
                          </Link>
                        )}
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRecipes;


