import React from 'react';
import { BarChart3, Users, ChefHat, Heart, Star, Activity } from 'lucide-react';
import { recipeService } from '../services/api';

const AdminDashboard = () => {
  const customRecipes = recipeService.getAll();
  const favorites = recipeService.getFavorites();

  const stats = [
    { label: 'Total Recipes', value: 1240 + customRecipes.length, icon: <ChefHat size={24} />, color: 'bg-primary' },
    { label: 'Custom Recipes', value: customRecipes.length, icon: <Activity size={24} />, color: 'bg-blue-500' },
    { label: 'Total Favorites', value: favorites.length, icon: <Heart size={24} />, color: 'bg-red-500' },
    { label: 'Drafts', value: 3, icon: <Star size={24} />, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Dashboard Overview</h1>
        <p className="text-text-muted">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl text-white ${stat.color}`}>
                {stat.icon}
              </div>
              <BarChart3 className="text-text-muted" size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-text-muted">{stat.label}</p>
              <h3 className="text-3xl font-extrabold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-bg-card border border-border rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold">Recent Recipes Added</h3>
          <div className="divide-y divide-border">
            {customRecipes.length > 0 ? customRecipes.slice(-5).reverse().map((r, i) => (
              <div key={i} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {r.title[0]}
                   </div>
                   <div>
                     <p className="font-bold">{r.title}</p>
                     <p className="text-sm text-text-muted">{r.category}</p>
                   </div>
                </div>
                <span className="text-xs font-semibold text-text-muted">Just now</span>
              </div>
            )) : (
              <p className="py-8 text-center text-text-muted italic">No custom recipes added yet.</p>
            )}
          </div>
        </div>

        <div className="bg-bg-card border border-border rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="space-y-3">
             <button className="w-full btn-primary py-4">Generate Report</button>
             <button className="w-full bg-bg-main border border-border py-4 rounded-xl font-bold hover:bg-border transition-colors">Manage Users</button>
             <button className="w-full bg-bg-main border border-border py-4 rounded-xl font-bold hover:bg-border transition-colors">System Health</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
