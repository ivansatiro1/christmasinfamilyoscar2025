
import React from 'react';
import { Screen } from '../types';

interface NavbarProps {
  onNavigate: (screen: Screen) => void;
  activeScreen: Screen;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeScreen }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-background-dark/80 backdrop-blur-md px-6 py-4 lg:px-12">
      <div 
        className="flex items-center gap-4 cursor-pointer text-white" 
        onClick={() => onNavigate('home')}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
          <span className="material-symbols-outlined text-2xl">movie</span>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-wide uppercase hidden sm:block">
          Cerimonia di Premiazione
        </h2>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        {[
          { id: 'home', label: 'Home' },
          { id: 'categories', label: 'Categorie' },
          { id: 'presenter', label: 'Virtual Host' },
          { id: 'credits', label: 'Sponsor' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className={`text-sm font-medium transition-colors ${
              activeScreen === item.id ? 'text-gold' : 'text-white/80 hover:text-gold'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="flex cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-transparent border border-white/20 hover:border-gold hover:text-gold text-white text-sm transition-all">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>
        <button className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary hover:bg-red-700 text-white text-sm font-bold leading-normal tracking-wide transition-all shadow-[0_0_15px_rgba(236,19,19,0.5)]">
          <span className="truncate">Accedi</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
