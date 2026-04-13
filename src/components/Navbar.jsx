import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, LogOut, User } from 'lucide-react';
import { authService } from '../services/api';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full h-[70px] bg-white border-b border-slate-100 shadow-sm flex items-center">
      <div className="container-saas w-full flex items-center justify-between gap-4 md:gap-8">
        
        {/* LEFT: Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🍽️</span>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">Recipe Finder</span>
        </Link>

        {/* CENTER: Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-[500px] relative items-center group">
          <div className="absolute left-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-full outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all font-medium text-slate-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearchKeyPress}
          />
        </div>

        {/* RIGHT: Links & Buttons */}
        <div className="flex items-center gap-2 lg:gap-6">
          <div className="hidden lg:flex items-center gap-6 mr-2">
            <Link to="/" className={`font-semibold transition-colors ${location.pathname === '/' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}>
              Home
            </Link>
            <Link to="/favorites" className={`flex items-center gap-1.5 font-semibold transition-colors ${location.pathname === '/favorites' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}>
              <Heart size={18} /> Favorites
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-slate-700 border border-slate-200">
                  <User size={16} />
                  <span className="text-sm font-bold">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link to="/login" className="px-4 py-2 font-bold text-slate-600 hover:text-emerald-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary px-6 h-10 text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl p-6 flex flex-col gap-6 animate-fade" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-lg">Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <nav className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-700 hover:text-emerald-600">Home</Link>
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-700 hover:text-emerald-600">Favorites</Link>
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              {!user && (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn-outline w-full">Login</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full">Register</Link>
                </>
              )}
              {user && (
                <button onClick={handleLogout} className="flex items-center justify-center gap-2 p-3 text-red-500 font-bold border border-red-100 rounded-xl hover:bg-red-50">
                  <LogOut size={18} /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;