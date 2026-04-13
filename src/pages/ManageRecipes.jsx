import React, { useState, useEffect } from 'react';
import { Settings, Edit2, Trash2, Search, ExternalLink, Plus } from 'lucide-react';
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
      toast.success('Recipe deleted');
    }
  };

  const filteredRecipes = recipes.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Manage Recipes</h1>
          <p className="text-text-muted">Edit, delete, or review your custom recipes.</p>
        </div>
        <Link to="/admin/add-recipe" className="btn-primary flex items-center gap-2 self-start md:self-auto">
          <Plus size={20} /> Add New Recipe
        </Link>
      </div>

      <div className="bg-bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        {/* Search Header */}
        <div className="p-6 border-b border-border bg-bg-main/30">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Filter by title or category..."
              className="w-full h-12 pl-12 pr-4 bg-bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-main/50 text-text-muted text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Recipe</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Base</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRecipes.length > 0 ? filteredRecipes.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {recipe.image ? (
                        <img src={recipe.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                      ) : (
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                          {recipe.title[0]}
                        </div>
                      )}
                      <span className="font-bold">{recipe.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase">
                      {recipe.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-muted">Local Database</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/recipe/${recipe.id}`}
                        className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                        title="View Details"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <button 
                        className="p-2 hover:bg-yellow-500/10 text-yellow-500 rounded-lg transition-colors"
                        title="Edit Recipe"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(recipe.id)}
                        className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                        title="Delete Recipe"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan="4" className="px-6 py-20 text-center text-text-muted italic">
                      No recipes found matching your search.
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
