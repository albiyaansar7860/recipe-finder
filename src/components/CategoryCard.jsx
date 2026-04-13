import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative cursor-pointer group rounded-2xl overflow-hidden min-w-[140px] md:min-w-[180px] h-32 flex flex-col items-center justify-center gap-3 transition-all ${
        isSelected 
          ? 'bg-primary text-white shadow-lg ring-2 ring-primary ring-offset-2 dark:ring-offset-bg-main' 
          : 'bg-bg-card border border-border hover:border-primary/50 text-text-main shadow-sm'
      }`}
    >
      <div className={`p-3 rounded-full transition-colors ${
        isSelected ? 'bg-white/20' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
      }`}>
        <img 
          src={category.strCategoryThumb} 
          alt={category.strCategory} 
          className="w-10 h-10 object-contain"
        />
      </div>
      <span className="font-bold text-sm tracking-wide uppercase">{category.strCategory}</span>
    </motion.div>
  );
};

export default CategoryCard;
