import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative cursor-pointer group rounded-2xl p-6 min-w-[140px] md:min-w-[160px] flex flex-col items-center justify-center gap-4 transition-all ${
        isSelected 
          ? 'bg-primary text-white shadow-lg ring-4 ring-primary/10' 
          : 'bg-white border border-border hover:border-primary/30 text-text-main shadow-sm hover:shadow-md'
      }`}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
        isSelected ? 'bg-white/20' : 'bg-bg-main group-hover:bg-primary/5'
      }`}>
        <img 
          src={category.strCategoryThumb} 
          alt={category.strCategory} 
          className="w-10 h-10 object-contain"
        />
      </div>
      <span className="font-bold text-sm tracking-wide text-center">{category.strCategory}</span>
    </motion.div>
  );
};

export default CategoryCard;

