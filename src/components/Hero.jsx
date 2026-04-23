import React from 'react';

const Hero = () => {
  return (
    <div className="relative py-20 md:py-32 bg-white border-b border-slate-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[30%] h-[40%] bg-emerald-50/50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[25%] h-[35%] bg-amber-50/50 rounded-full blur-[100px]"></div>
      </div>

      <div className="container-saas relative z-10 text-center animate-fade">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Discover 5,000+ hand-picked recipes
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 max-w-4xl mx-auto">
          Cook Like a <span className="text-emerald-500">Pro</span> <br /> 
          with our curated recipes
        </h1>
        
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-12">
          From quick 15-minute meals to elaborate gourmet feasts, find everything you need to create magic in your kitchen.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={() => document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary h-14 px-10 text-lg shadow-emerald-200"
          >
            Browse All Recipes
          </button>
          <button className="btn-outline h-14 px-10 text-lg">
            How it works
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;


