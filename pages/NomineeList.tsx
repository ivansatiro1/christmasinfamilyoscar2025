
import React from 'react';
import { Screen, AwardCategory, Nominee } from '../types';

interface NomineeListProps {
  category: AwardCategory;
  onNavigate: (screen: Screen, data: Nominee) => void;
}

const NomineeList: React.FC<NomineeListProps> = ({ category, onNavigate }) => {
  // Logic to select a winner for this category presentation
  // In a real app, this might be fetched from an API or state
  const handleDiscoverWinner = () => {
    if (category.nominees.length > 0) {
      onNavigate('winner', category.nominees[0]);
    }
  };

  return (
    <div className="animate-fade-in-up flex flex-col items-center py-12 px-4">
      <div className="max-w-[960px] w-full">
        <div className="text-center mb-12 space-y-4">
          <span className="text-primary text-sm font-bold tracking-widest uppercase">Categoria Ufficiale</span>
          <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">Nomination: {category.title}</h1>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="text-[#c99292] text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Celebrando gli eroi di ogni giorno. Onorando la dedizione, il talento e l'impegno. Ecco i finalisti del 2025.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {category.nominees.map((nominee) => (
            <div 
              key={nominee.id}
              onClick={() => onNavigate('winner', nominee)}
              className="group flex flex-col gap-3 cursor-pointer"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl border border-[#482323] group-hover:border-primary transition-colors duration-300">
                <div 
                  className="w-full h-full bg-center bg-no-repeat bg-cover transform group-hover:scale-105 transition-transform duration-500" 
                  style={{ backgroundImage: `url("${nominee.imageUrl}")` }}
                ></div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white text-xl font-bold leading-normal group-hover:text-primary transition-colors">{nominee.name}</p>
                <p className="text-[#c99292] text-sm font-normal">{nominee.work}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#482323]/20 to-[#221010] border border-[#482323] p-10 text-center flex flex-col items-center gap-6">
          <span className="material-symbols-outlined text-gold text-5xl mb-2">emoji_events</span>
          <h2 className="text-white text-3xl md:text-4xl font-black leading-tight">Il verdetto finale</h2>
          <p className="text-[#c99292] text-base max-w-[600px]">
            La giuria ha espresso il suo voto. Il momento che tutti stavamo aspettando è finalmente arrivato.
          </p>
          <button 
            onClick={handleDiscoverWinner}
            className="flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 bg-primary hover:bg-red-700 transition-all hover:scale-105 shadow-lg shadow-primary/20 text-white font-bold text-lg uppercase tracking-wider"
          >
            Scopri il vincitore
          </button>
        </div>
      </div>
    </div>
  );
};

export default NomineeList;
