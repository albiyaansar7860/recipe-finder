import React from 'react';
import { Layout, Play, Share2, Mail, Globe, MessageSquare, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-50 relative z-10">
      <div className="container-saas py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          <div className="md:col-span-12 lg:col-span-5 space-y-8 text-center lg:text-left">
            <Link to="/" className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center lg:justify-start gap-2 group">
              <span className="group-hover:rotate-12 transition-transform duration-300">🍽️</span> 
              Recipe Finder
            </Link>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Transforming your kitchen experience. Discover, save, and share incredible recipes from around the world. Your next culinary masterpiece starts here.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:border-emerald-200 hover:text-emerald-500 hover:bg-emerald-50 transition-all shadow-sm">
                <Globe size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:border-emerald-200 hover:text-emerald-500 hover:bg-emerald-50 transition-all shadow-sm">
                <MessageSquare size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:border-emerald-200 hover:text-emerald-500 hover:bg-emerald-50 transition-all shadow-sm">
                <Heart size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-3 text-center md:text-left">
            <h4 className="font-bold text-slate-900 text-lg mb-6 uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-slate-500 font-bold">
              <li><Link to="/" className="hover:text-emerald-600 transition-colors">Discover</Link></li>
              <li><Link to="/favorites" className="hover:text-emerald-600 transition-colors">My Favorites</Link></li>
              <li><Link to="/login" className="hover:text-emerald-600 transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-emerald-600 transition-colors">Register</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-6 lg:col-span-4 text-center md:text-left">
            <h4 className="font-bold text-slate-900 text-lg mb-6 uppercase tracking-widest">Newsletter</h4>
            <p className="text-slate-500 mb-6 font-medium">Join our community and get weekly updates.</p>
            <div className="flex gap-2">
               <input 
                 type="email" 
                 placeholder="your@email.com" 
                 className="flex-1 h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
               />
               <button className="h-12 w-12 flex items-center justify-center bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200">
                 <Mail size={20} />
               </button>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Recipe Finder — Premium Culinary Experience</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


