import React from 'react';

const Hero = () => {
  return (
    <div className="relative py-24 md:py-32 w-full flex items-center justify-center overflow-hidden bg-bg-main border-b border-border">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2"></div>

      {/* Content */}
      <div className="relative z-10 container text-center space-y-8 animate-fade">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-2">
          <span>🍕</span> Over 5,000+ Recipes
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto">
          Discover <span className="text-primary">Delicious</span> Recipes <br /> 
          for Every Occasion
        </h1>
        
        <p className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto leading-relaxed">
          The most comprehensive collection of hand-picked recipes from around the world. Start your culinary journey today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <button className="btn btn-primary btn-pill px-10 h-14 text-lg">Browse Categories</button>
          <button className="btn btn-outline btn-pill px-10 h-14 text-lg">Top Rated</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

