import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, User, LogOut, Menu, X, Heart } from 'lucide-react';
import { authService } from '../services/api';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDark(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    setUser(authService.getCurrentUser());
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 w-full h-[72px]">
      <div className="container h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold gradient-text">
          <span>🍽️</span>
          <span className="hidden sm:inline">Recipe Finder</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/favorites" className="flex items-center gap-1 font-medium hover:text-primary transition-colors">
            <Heart size={18} /> Favorites
          </Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" className="font-medium hover:text-primary transition-colors">Admin</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                <User size={16} />
                <span className="text-sm font-semibold">{user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 font-medium hover:text-primary transition-colors">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </div>
          )}

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 w-full bg-bg-main border-b border-border p-4 flex flex-col gap-4 animate-fade-in">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
          {user && user.role === 'admin' && (
             <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
          )}
          {!user && (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary text-center">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;