
import React from 'react';
import { Screen, Nominee } from '../types';

interface WinnerProps {
  winner: Nominee;
  category: string;
  // Fix: Made the second argument optional to support navigation to screens that don't require data
  onNavigate: (screen: Screen, data?: any) => void;
}

const Winner: React.FC<WinnerProps> = ({ winner, category, onNavigate }) => {
  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center py-12 px-6">
      <div className="text-center mb-12">
        <p className="text-[#c99292] text-sm sm:text-base font-medium tracking-widest uppercase mb-3">The 45th Annual Awards</p>
        <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-2xl">
          {category}
        </h1>
      </div>

      <div className="w-full max-w-5xl relative group perspective-1000">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-red-500 to-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
        <div className="relative flex flex-col md:flex-row items-stretch overflow-hidden rounded-xl bg-[#2a1515] shadow-2xl ring-1 ring-white/10">
          <div className="w-full md:w-1/2 lg:w-5/12 relative aspect-[4/5] md:aspect-auto">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-700 ease-out" 
              style={{ backgroundImage: `url("${winner.imageUrl}")` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a1515] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#2a1515]"></div>
          </div>

          <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center p-6 sm:p-10 lg:p-12 relative">
            <span className="absolute top-10 right-10 text-yellow-500/20 text-4xl select-none animate-pulse">✦</span>
            <div className="space-y-6">
              <div className="hidden md:flex items-center gap-3">
                <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/20 tracking-wider uppercase">Vincitore</span>
                <span className="flex h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></span>
              </div>
              <div>
                <h2 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold leading-none tracking-tight mb-2">
                  {winner.name.split(' ')[0]} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">{winner.name.split(' ').slice(1).join(' ')}</span>
                </h2>
                <p className="text-[#c99292] text-xl sm:text-2xl font-normal mt-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">movie_filter</span>
                  {winner.work}
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <button 
                  onClick={() => onNavigate('speech', winner)}
                  className="flex-1 min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 bg-primary hover:bg-red-600 text-white text-base font-bold shadow-lg shadow-primary/25 transition-all transform active:scale-95 group/btn"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined group-hover/btn:animate-spin">play_circle</span>
                    <span className="truncate uppercase">Guarda Discorso</span>
                  </div>
                </button>
                <button className="flex-1 min-w-[180px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-base font-medium transition-all uppercase">
                  Galleria
                </button>
              </div>
              <p className="text-white/40 text-sm font-light italic border-l-2 border-primary/50 pl-4 mt-6">
                "Per una performance che ha catturato la complessità e l'anima del personaggio in modo indimenticabile."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 w-full max-w-lg">
        <button 
          onClick={() => onNavigate('categories')}
          className="w-full cursor-pointer flex items-center justify-between rounded-xl h-16 px-6 bg-[#2a1515] hover:bg-[#381e1e] border border-white/5 text-white transition-all group"
        >
          <div className="size-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Winner;
