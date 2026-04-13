import React from 'react';
import { BarChart3, Users, ChefHat, Heart, Star, Activity, TrendingUp, Package, Sparkles } from 'lucide-react';
import { recipeService } from '../services/api';

const AdminDashboard = () => {
  const customRecipes = recipeService.getAll();
  const favorites = recipeService.getFavorites();

  const stats = [
    { label: 'Total Recipes', value: 1240 + customRecipes.length, icon: <ChefHat size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Custom Recipes', value: customRecipes.length, icon: <Package size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Community Savs', value: favorites.length + 42, icon: <Heart size={24} />, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Active Drafts', value: 3, icon: <Star size={24} />, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-12 animate-fade">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 font-medium text-lg">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs uppercase tracking-widest leading-none">
                 <TrendingUp size={14} /> +12%
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white border border-slate-100 rounded-[48px] p-10 space-y-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Recipes Added</h3>
            <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 underline decoration-2 underline-offset-4">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {customRecipes.length > 0 ? customRecipes.slice(-5).reverse().map((r, i) => (
              <div key={i} className="py-5 flex items-center justify-between group">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    {r.title[0]}
                   </div>
                   <div>
                     <p className="font-bold text-slate-900 text-lg leading-tight">{r.title}</p>
                     <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">{r.category}</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-400 font-bold rounded-full text-[10px] uppercase tracking-widest">
                  <Activity size={12} /> Just now
                </div>
              </div>
            )) : (
              <div className="py-12 text-center text-slate-400 font-medium">
                No custom recipes added yet. Let's create one!
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[48px] p-10 shadow-premium flex flex-col justify-between relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
           <div className="relative z-10 space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 font-black rounded-full text-[10px] uppercase tracking-widest">
               <Sparkles size={14} /> System Health
             </div>
             <h3 className="text-3xl font-black text-white leading-tight">Quick System Control</h3>
             <div className="space-y-3">
                <button className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg transition-all shadow-lg shadow-emerald-500/20 active:scale-95">Generate Report</button>
                <button className="w-full h-14 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-lg transition-all active:scale-95">Manage Roles</button>
             </div>
           </div>

           <div className="relative z-10 pt-10 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] text-center">
             Last backup: 2 hours ago
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

