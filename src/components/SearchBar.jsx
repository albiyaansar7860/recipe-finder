import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const SearchBar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Trending Recipes</h2>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-12 pl-12 pr-10 rounded-xl border border-border bg-bg-card appearance-none focus:ring-2 focus:ring-primary outline-none transition-all font-medium"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.idCategory} value={cat.strCategory}>
                  {cat.strCategory}
                </option>
              ))}
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              <Filter size={20} />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;