import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, LogOut, ChevronRight, BarChart3, Package, Users } from 'lucide-react';
import { authService } from '../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useAuth();

  const user = userData;

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/add-recipe', icon: <PlusCircle size={20} />, label: 'Add Recipe' },
    { path: '/admin/manage', icon: <Package size={20} />, label: 'Manage Recipes' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'User Roles' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-100 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-50">
          <Link to="/" className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 group">
            <span className="group-hover:rotate-12 transition-transform duration-300">🛡️</span> Admin Hub
          </Link>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 mt-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Main Menu</p>
          {menuItems.slice(0, 3).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                location.pathname === item.path 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                  : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500'} transition-colors`}>
                  {item.icon}
                </span>
                <span className="font-bold">{item.label}</span>
              </div>
              {location.pathname === item.path && <ChevronRight size={16} />}
            </Link>
          ))}

          <div className="pt-8 space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">System Control</p>
            {menuItems.slice(3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                  location.pathname === item.path 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                    : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${location.pathname === item.path ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500'} transition-colors`}>
                    {item.icon}
                  </span>
                  <span className="font-bold">{item.label}</span>
                </div>
                {location.pathname === item.path && <ChevronRight size={16} />}
              </Link>
            ))}
          </div>
        </nav>
        
        <div className="p-6 border-t border-slate-50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-4 rounded-2xl text-red-500 bg-red-50 border border-red-100 hover:bg-red-500 hover:text-white transition-all font-bold group"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform" /> Logout Account
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-slate-50 flex items-center justify-between px-8 md:px-12 sticky top-0 z-10">
           <div className="flex items-center gap-4">
              <div className="md:hidden text-2xl">🛡️</div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {menuItems.find(i => i.path === location.pathname)?.label || 'Admin Panel'}
              </h1>
           </div>
           <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Admin User</span>
                <span className="text-sm font-bold text-slate-900 leading-tight">{user.name}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-200">
                 {user.name.charAt(0).toUpperCase()}
              </div>
           </div>
        </header>

        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

