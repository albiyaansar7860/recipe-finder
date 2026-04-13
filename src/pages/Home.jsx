import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import { getCategories, searchRecipes, getRecipesByCategory } from '../services/api';
import { Loader2, ChefHat } from 'lucide-react';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const cats = await getCategories();
      setCategories(cats);
      
      const initialRecipes = await searchRecipes('');
      setRecipes(initialRecipes.slice(0, 12));
      setLoading(false);
    };
    initData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const results = await searchRecipes(searchQuery);
    setRecipes(results);
    setSelectedCategory('All');
    setLoading(false);
  };

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
    <div className="min-h-screen flex flex-col">
      <Hero 
        onSearch={handleSearch} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* Categories Horizontal Scroll */}
      <div className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ChefHat className="text-primary" /> Popular Categories
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
          <CategoryCard 
             category={{ strCategory: 'All', strCategoryThumb: 'https://www.themealdb.com/images/category/beef.png' }}
             isSelected={selectedCategory === 'All'}
             onClick={() => handleCategorySelect('All')}
          />
          {categories.slice(0, 8).map(cat => (
            <CategoryCard 
              key={cat.idCategory}
              category={cat}
              isSelected={selectedCategory === cat.strCategory}
              onClick={() => handleCategorySelect(cat.strCategory)}
            />
          ))}
        </div>
      </div>

      <SearchBar 
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategorySelect}
      />

      {/* Recipe Grid */}
      <div className="container pb-20 flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-primary">
            <Loader2 size={48} className="animate-spin" />
            <p className="font-medium animate-pulse">Finding the best recipes for you...</p>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recipes.map((recipe, index) => (
              <div key={recipe.idMeal} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="text-6xl">🔍</div>
            <h3 className="text-2xl font-bold">No recipes found</h3>
            <p className="text-text-muted">Try searching for something else or browse categories.</p>
            <button 
              onClick={() => handleCategorySelect('All')}
              className="btn-primary mt-4"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;