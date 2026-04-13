import React from 'react';
import { Search } from 'lucide-react';

const Hero = ({ onSearch, searchQuery, setSearchQuery }) => {
  return (
    <div className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
      {/* Background with Blur Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight animate-fade-in">
          Discover <span className="text-primary">Delicious</span> Recipes
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto animate-fade-in">
          Search from thousands of curated recipes instantly. From home-style meals to gourmet desserts, find your next favorite dish here.
        </p>

        {/* Hero Search Bar */}
        <div className="max-w-2xl mx-auto w-full mt-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex bg-white rounded-full p-1.5 shadow-2xl focus-within:ring-2 focus-within:ring-primary transition-all">
            <input
              type="text"
              placeholder="What would you like to cook today?"
              className="flex-1 bg-transparent px-6 py-3 text-text-main outline-none text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
            <button 
              onClick={onSearch}
              className="btn-primary flex items-center gap-2 px-8"
            >
              <Search size={20} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
