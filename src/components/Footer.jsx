import React from 'react';
import { Layout, Play, Share2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-bg-card border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="text-2xl font-bold gradient-text flex items-center gap-2">
              <span>🍽️</span> Recipe Finder
            </Link>
            <p className="text-text-muted max-w-md">
              Bringing the joy of cooking to your kitchen. Discover thousands of curated recipes, save your favorites, and share your culinary creations with our community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full border border-border hover:bg-primary hover:text-white transition-all">
                <Layout size={18} />
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:bg-primary hover:text-white transition-all">
                <Play size={18} />
              </a>
              <a href="#" className="p-2 rounded-full border border-border hover:bg-primary hover:text-white transition-all">
                <Share2 size={18} />
              </a>
            </div>
          </div>


          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-text-muted">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/favorites" className="hover:text-primary transition-colors">Favorites</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2 text-text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Breakfast</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dessert</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Italian</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Vegan</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-text-muted text-sm">
          <p>© {new Date().getFullYear()} Recipe Finder. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
