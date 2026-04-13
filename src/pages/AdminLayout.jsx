import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, LogOut, ChevronRight, BarChart3 } from 'lucide-react';
import { authService } from '../services/api';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
    }
    setUser(currentUser);
  }, [navigate]);

  if (!user) return null;

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/add-recipe', icon: <PlusCircle size={20} />, label: 'Add Recipe' },
    { path: '/admin/manage', icon: <Settings size={20} />, label: 'Manage Recipes' },
  ];

  return (
    <div className="flex min-h-screen bg-bg-main">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-8 border-b border-border">
          <Link to="/" className="text-xl font-bold gradient-text flex items-center gap-2">
            <span>🍽️</span> Admin Panel
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                location.pathname === item.path 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-semibold">{item.label}</span>
              </div>
              {location.pathname === item.path && <ChevronRight size={16} />}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-border">
          <button 
            onClick={() => { authService.logout(); navigate('/login'); }}
            className="flex items-center gap-3 w-full p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-semibold"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 md:p-12">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between mb-8">
             <h1 className="text-2xl font-bold">Admin Panel</h1>
             {/* Simple mobile menu toggle could go here */}
          </div>
          
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
