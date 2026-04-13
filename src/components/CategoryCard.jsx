import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative cursor-pointer group rounded-3xl p-6 min-w-[150px] flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
        isSelected 
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 ring-4 ring-emerald-50' 
          : 'bg-white border border-slate-100 hover:border-emerald-200 text-slate-700 shadow-sm hover:shadow-md'
      }`}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
        isSelected ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-emerald-50'
      }`}>
        <img 
          src={category.strCategoryThumb} 
          alt={category.strCategory} 
          className="w-12 h-12 object-contain group-hover:rotate-6 transition-transform"
        />
      </div>
      <span className="font-bold text-sm text-center uppercase tracking-wider">{category.strCategory}</span>
    </motion.div>
  );
};

export default CategoryCard;


