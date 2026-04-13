import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, User, LogOut, Menu, X, Heart, Search } from 'lucide-react';
import { authService } from '../services/api';

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  };

  return (
    <nav className="glass sticky top-0 z-50 w-full h-[var(--navbar-height)] flex items-center">
      <div className="container w-full flex items-center justify-between gap-8">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold gradient-text shrink-0">
          <span>🍽️</span>
          <span className="hidden lg:inline">Recipe Finder</span>
        </Link>

        {/* Center: Search Pill */}
        <div className="hidden md:flex flex-1 max-w-[500px] relative items-center group">
          <div className="absolute left-4 text-text-muted group-focus-within:text-primary transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search recipes, cuisines..."
            className="w-full h-12 pl-12 pr-4 bg-bg-main/50 border border-border rounded-full outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearchKeyPress}
          />
        </div>

        {/* Right: Nav Links */}
        <div className="flex items-center gap-2 lg:gap-6">
          <div className="hidden md:flex items-center gap-6 mr-2">
            <Link to="/" className={`font-semibold transition-colors ${location.pathname === '/' ? 'text-primary' : 'hover:text-primary'}`}>Home</Link>
            <Link to="/favorites" className={`flex items-center gap-1 font-semibold transition-colors ${location.pathname === '/favorites' ? 'text-primary' : 'hover:text-primary'}`}>
              <Heart size={18} /> Favorites
            </Link>
          </div>

          <div className="h-6 w-px bg-border hidden lg:block"></div>

          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <User size={18} />
                <span className="text-sm font-bold hidden sm:inline">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="p-2.5 rounded-xl hover:bg-red-500/10 text-red-500 transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-4">
              <Link to="/login" className="px-4 py-2 font-bold hover:text-primary transition-colors">Login</Link>
              <Link to="/register" className="btn btn-primary btn-pill shadow-md hidden sm:flex">Register</Link>
            </div>
          )}

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[var(--navbar-height)] left-0 w-full bg-bg-card border-b border-border p-6 flex flex-col gap-6 animate-fade shadow-xl">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full h-12 px-4 bg-bg-main border border-border rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-bold">Home</Link>
          <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="font-bold">Favorites</Link>
          {!user && (
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-outline">Login</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;