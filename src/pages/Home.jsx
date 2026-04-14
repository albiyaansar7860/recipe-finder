import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import RecipeCard from '../components/RecipeCard';
import { getCategories, searchRecipes, getRecipesByCategory, recipeService } from '../services/api';
import { Loader2, ChefHat, Sparkles, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = ({ searchQuery, setSearchQuery }) => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const cats = await getCategories();
      setCategories(cats);
      
      const localRecipes = await recipeService.getAll();
      const apiRecipes = await searchRecipes(searchQuery);
      
      // Combine local and API recipes
      setRecipes([...localRecipes, ...apiRecipes.slice(0, 12)]);
      setLoading(false);
    };
    initData();
  }, [searchQuery]);

  const handleCategorySelect = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    setSearchQuery('');
    
    if (category === 'All') {
      const localRecipes = await recipeService.getAll();
      const results = await searchRecipes('');
      setRecipes([...localRecipes, ...results.slice(0, 12)]);
    } else {
      const allLocal = await recipeService.getAll();
      const filteredLocal = allLocal.filter(r => r.category === category);
      const results = await getRecipesByCategory(category);
      setRecipes([...filteredLocal, ...results]);
    }
    setLoading(false);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-bg-main min-h-screen">
      {!searchQuery && <Hero />}

      <main className="container-saas py-16 md:py-24">
        {/* Categories Section */}
        {!searchQuery && (
          <section className="mb-24 animate-fade">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest">
                  <Sparkles size={14} /> Trending Now
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <ChefHat className="text-emerald-500" size={40} /> Popular Categories
                </h2>
                <p className="text-slate-500 text-lg max-w-xl font-medium">
                  Explore our wide variety of cuisines and meal types carefully curated for you.
                </p>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => scroll('left')} className="p-3 rounded-full bg-white border border-slate-100 hover:border-emerald-200 hover:text-emerald-500 transition-all shadow-sm">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => scroll('right')} className="p-3 rounded-full bg-white border border-slate-100 hover:border-emerald-200 hover:text-emerald-500 transition-all shadow-sm">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide scroll-smooth no-scrollbar"
            >
              <CategoryCard 
                 category={{ strCategory: 'All', strCategoryThumb: 'https://www.themealdb.com/images/category/beef.png' }}
                 isSelected={selectedCategory === 'All'}
                 onClick={() => handleCategorySelect('All')}
              />
              {categories.map(cat => (
                <CategoryCard 
                  key={cat.idCategory}
                  category={cat}
                  isSelected={selectedCategory === cat.strCategory}
                  onClick={() => handleCategorySelect(cat.strCategory)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recipe Grid Section */}
        <section className="animate-fade" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {searchQuery ? `Searching for "${searchQuery}"` : selectedCategory === 'All' ? 'Latest Recipes' : `${selectedCategory} Specials`}
            </h2>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              {recipes.length} results
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="bg-white border border-slate-100 rounded-[32px] h-[400px] animate-pulse">
                  <div className="h-56 bg-slate-50 rounded-t-[32px]"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-slate-50 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-50 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-6 text-center bg-white border border-slate-100 rounded-[48px] shadow-sm animate-fade">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-5xl">🔍</div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">No recipes found</h3>
                <p className="text-slate-500 max-w-sm mx-auto font-medium">
                  We couldn't find any recipes matching your criteria. Try searching for something else.
                </p>
              </div>
              <button 
                onClick={() => handleCategorySelect('All')}
                className="btn-primary"
              >
                Reset Search
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;