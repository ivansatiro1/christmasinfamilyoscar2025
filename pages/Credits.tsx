
import React from 'react';
import { Screen } from '../types';

interface CreditsProps {
  onNavigate: (screen: Screen) => void;
}

const Credits: React.FC<CreditsProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fade-in-up flex flex-col items-center w-full pb-20">
      <div className="w-full flex justify-center py-10 px-4">
        <div className="w-full max-w-[960px]">
          <div 
            className="relative overflow-hidden rounded-xl bg-cover bg-center min-h-[500px] flex flex-col items-center justify-center text-center p-8 gap-8 border border-[#482323]" 
            style={{ backgroundImage: 'linear-gradient(rgba(34, 16, 16, 0.7) 0%, rgba(34, 16, 16, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHnno3B78o21T0ULkCq9fco6x_xBMZL-qWyWRIDLXo8vJfma16dwW4UfLG_v6iIMDsYnAXTLgS_JmQJDSiMcmWJtoIci22Pp8AdXXRVc-JPCIErt_YehaZe8IlyZaQYfxpI7kAS72jP1JM8mmpkWgYrW5gjEIjywfy_3jcIFMPYYD87MKB-jFmAiHdexDn0gG_wa_2-UWT0JrHlgI6SnC3N_TL3zbSXXHNa-c2pUCfevFzLsQlm1WJ341DLkf2T0qs6_znrVrPJ9k")' }}
          >
            <div className="flex flex-col gap-4">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Fine della trasmissione</span>
              <h1 className="text-white text-5xl md:text-8xl font-black leading-tight tracking-tighter drop-shadow-2xl">
                Grazie per la visione
              </h1>
              <div className="h-1 w-24 bg-primary mx-auto rounded-full my-4"></div>
              <h2 className="text-white/80 text-lg md:text-2xl font-normal max-w-2xl mx-auto">
                Una produzione speciale realizzata con passione, dedizione e creatività dal nostro incredibile team.
              </h2>
            </div>
            <div className="flex gap-4 mt-4">
              <button className="flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-colors border border-white/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                Mi piace
              </button>
              <button 
                onClick={() => onNavigate('home')}
                className="flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-primary hover:bg-red-600 text-white font-bold transition-colors shadow-lg"
              >
                <span className="material-symbols-outlined text-[20px]">replay</span>
                Riavvia
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[960px] px-4 py-12">
        <h2 className="text-white text-3xl md:text-5xl font-bold text-center mb-12">Riconoscimenti Speciali</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'star', role: 'Miglior Attore', name: 'Alessandro Magno', desc: 'Per la sua performance carismatica che ha catturato l\'attenzione di tutti.' },
            { icon: 'favorite', role: 'Miglior Attrice', name: 'Cleopatra', desc: 'Per l\'eleganza senza tempo e una presenza scenica ineguagliabile.' },
            { icon: 'emoji_events', role: 'Miglior Supporto', name: 'Giulio Cesare', desc: 'Per la visione strategica e il supporto fondamentale al team.' }
          ].map((item, i) => (
            <div key={i} className="group flex flex-col items-center text-center gap-4 rounded-xl border border-[#482323] bg-[#2a1515] p-8 transition-transform hover:-translate-y-2 hover:border-[#673232]">
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-4xl">{item.icon}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[#c99292] uppercase tracking-widest text-xs font-bold">{item.role}</h3>
                <p className="text-white font-black text-2xl">{item.name}</p>
                <p className="text-[#c99292] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-gradient-to-b from-transparent via-[#1a0c0c] to-transparent py-20 px-4">
        <div className="w-full max-w-[700px] mx-auto flex flex-col items-center gap-16">
          <div className="w-full flex flex-col items-center gap-8">
            <h3 className="text-white text-3xl font-black tracking-[0.2em] uppercase border-b-2 border-primary pb-2 mb-8">Cast Principale</h3>
            {[
              { role: 'Il Protagonista', name: 'Mario Rossi' },
              { role: 'L\'Antagonista', name: 'Luigi Verdi' },
              { role: 'Narratore', name: 'Anna Bianchi' },
              { role: 'Ospite Speciale', name: 'Giovanni Neri' }
            ].map((c, i) => (
              <div key={i} className="flex justify-between w-full max-w-lg border-b border-white/5 pb-2">
                <div className="text-[#9CA3AF] uppercase tracking-wider text-sm text-right flex-1 pr-8">{c.role}</div>
                <div className="text-white font-bold text-xl flex-1 text-left">{c.name}</div>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col items-center gap-8 mt-8">
            <h3 className="text-white text-3xl font-black tracking-[0.2em] uppercase border-b-2 border-primary pb-2 mb-8">Produzione</h3>
            {[
              { role: 'Regia', name: 'Sofia Gialli' },
              { role: 'Sceneggiatura', name: 'Marco Viola' },
              { role: 'Montaggio', name: 'Elena Blu' },
              { role: 'Costumi', name: 'Giulia Rosa' }
            ].map((c, i) => (
              <div key={i} className="flex justify-between w-full max-w-lg border-b border-white/5 pb-2">
                <div className="text-[#9CA3AF] uppercase tracking-wider text-sm text-right flex-1 pr-8">{c.role}</div>
                <div className="text-white font-bold text-xl flex-1 text-left">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
