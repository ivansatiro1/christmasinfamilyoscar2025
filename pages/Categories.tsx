
import React from 'react';
import { Screen, AwardCategory } from '../types';
import { CATEGORY_IMAGES } from '../constants';

interface CategoriesProps {
  onNavigate: (screen: Screen, data: AwardCategory) => void;
  categories: AwardCategory[];
}

const Categories: React.FC<CategoriesProps> = ({ onNavigate, categories }) => {
  return (
    <div className="animate-fade-in-up flex flex-col items-center py-12 px-4 md:px-10">
      <div className="w-full max-w-[1000px] flex flex-col gap-8">
        <div className="relative overflow-hidden rounded-xl bg-cover bg-center h-80 flex flex-col items-center justify-center p-8 text-center" style={{ backgroundImage: 'linear-gradient(rgba(34, 16, 16, 0.4), rgba(34, 16, 16, 0.9)), url("https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200")' }}>
          <span className="material-symbols-outlined text-gold text-4xl mb-4">emoji_events</span>
          <h1 className="text-white text-5xl font-black uppercase tracking-tight md:text-6xl drop-shadow-lg">
            Le Nomination 2025
          </h1>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-[#482323] mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Categorie Ufficiali</h2>
          <span className="text-[#c99292] text-sm font-medium uppercase tracking-widest">{categories.length} Nomination</span>
        </div>

        <div className="flex flex-col gap-8">
          {categories.map((cat, index) => (
            <div 
              key={cat.id}
              onClick={() => onNavigate('nominees', cat)}
              className="group relative flex flex-col md:flex-row h-full overflow-hidden rounded-2xl bg-[#2a1515] border border-[#482323] hover:border-primary/50 transition-all cursor-pointer shadow-lg hover:shadow-primary/10"
            >
              <div className="w-full md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{ backgroundImage: `url("${CATEGORY_IMAGES[index] || cat.nominees[0].imageUrl}")` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a1515] md:bg-gradient-to-r md:from-transparent md:to-[#2a1515] opacity-90 md:opacity-100"></div>
              </div>
              <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-widest">Categoria</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-3 group-hover:text-primary transition-colors leading-tight">{cat.title}</h3>
                <p className="text-[#dccbcb] text-base md:text-lg leading-relaxed mb-6 font-light">{cat.description}</p>
                <div className="flex items-center text-white text-sm font-bold tracking-wide mt-auto">
                  <span className="border-b-2 border-primary pb-0.5 group-hover:text-primary transition-colors uppercase">Scopri Candidati</span>
                  <span className="material-symbols-outlined text-lg ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
