import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import { getCategories, searchRecipes, getRecipesByCategory } from '../services/api';
import { Loader2, ChefHat, Sparkles, Filter } from 'lucide-react';

const Home = ({ searchQuery, setSearchQuery }) => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const cats = await getCategories();
      setCategories(cats);
      
      const initialRecipes = await searchRecipes(searchQuery);
      setRecipes(initialRecipes.slice(0, 12));
      setLoading(false);
    };
    initData();
  }, [searchQuery]);

  const handleCategorySelect = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    setSearchQuery('');
    
    if (category === 'All') {
      const results = await searchRecipes('');
      setRecipes(results.slice(0, 12));
    } else {
      const results = await getRecipesByCategory(category);
      setRecipes(results);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <Hero />

      {/* Categories Section */}
      <section className="py-16 md:py-24 border-b border-border bg-white/50">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} /> Trending Now
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
                <ChefHat className="text-primary" /> Popular Categories
              </h2>
              <p className="text-text-muted text-lg max-w-xl">
                Explore our wide variety of cuisines and meal types carefully curated for you.
              </p>
            </div>
            
            <button className="btn btn-outline btn-pill h-12 gap-2">
              <Filter size={18} /> View All
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
            <CategoryCard 
               category={{ strCategory: 'All', strCategoryThumb: 'https://www.themealdb.com/images/category/beef.png' }}
               isSelected={selectedCategory === 'All'}
               onClick={() => handleCategorySelect('All')}
            />
            {categories.slice(0, 10).map(cat => (
              <CategoryCard 
                key={cat.idCategory}
                category={cat}
                isSelected={selectedCategory === cat.strCategory}
                onClick={() => handleCategorySelect(cat.strCategory)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Grid Section */}
      <section className="py-20 flex-1">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight">
              {searchQuery ? `Searching for "${searchQuery}"` : selectedCategory === 'All' ? 'Latest Recipes' : `${selectedCategory} Specials`}
            </h2>
            <div className="text-sm font-semibold text-text-muted">
              {recipes.length} results found
            </div>
          </div>

          {loading ? (
            <div className="grid-main">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="card-premium h-[400px] bg-white animate-pulse">
                  <div className="h-48 bg-gray-100 rounded-t-2xl"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid-main">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-6 text-center animate-fade">
              <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center text-5xl">🔍</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">No recipes found</h3>
                <p className="text-text-muted max-w-sm mx-auto">
                  We couldn't find any recipes matching your criteria. Try searching for something else.
                </p>
              </div>
              <button 
                onClick={() => handleCategorySelect('All')}
                className="btn btn-primary btn-pill px-8"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;