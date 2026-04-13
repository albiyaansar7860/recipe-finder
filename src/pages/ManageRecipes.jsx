import React, { useState, useEffect } from 'react';
import { Settings, Edit2, Trash2, Search, ExternalLink, Plus, Package, ArrowLeft } from 'lucide-react';
import { recipeService } from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setRecipes(recipeService.getAll());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      recipeService.delete(id);
      setRecipes(recipeService.getAll());
      toast.success('Recipe deleted successfully');
    }
  };

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fade">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm">
             <Package size={28} />
           </div>
           <div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventory Control</h1>
             <p className="text-slate-500 font-medium">Edit, delete, or review your custom recipes.</p>
           </div>
        </div>
        <Link to="/admin/add-recipe" className="btn-primary h-14 px-8 shadow-emerald-200 flex items-center gap-2">
          <Plus size={20} /> Add New Recipe
        </Link>
      </div>

      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
        {/* Search Header */}
        <div className="p-8 border-b border-slate-50">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Filter by title or category..."
              className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Recipe Identity</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Storage</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRecipes.length > 0 ? filteredRecipes.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      {recipe.image ? (
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm">
                          <img src={recipe.image} className="w-full h-full object-cover" alt="" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 rounded-2xl flex items-center justify-center font-black text-xl transition-colors">
                          {recipe.title[0]}
                        </div>
                      )}
                      <span className="font-black text-slate-900 text-lg group-hover:text-emerald-600 transition-colors tracking-tight">{recipe.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                      {recipe.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      Local Database
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <Link 
                        to={`/recipe/${recipe.id}`}
                        className="w-10 h-10 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-500 rounded-xl transition-all"
                        title="View Details"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <button 
                        className="w-10 h-10 flex items-center justify-center hover:bg-amber-50 hover:text-amber-500 rounded-xl transition-all"
                        title="Edit Recipe"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(recipe.id)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 rounded-xl transition-all"
                        title="Delete Recipe"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan="4" className="px-8 py-24 text-center text-slate-400 font-medium italic">
                      No recipes found matching your search criteria.
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

