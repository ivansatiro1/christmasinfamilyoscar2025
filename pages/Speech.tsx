
import React, { useState, useEffect } from 'react';
import { Screen, Nominee } from '../types';
import { gemini } from '../geminiService';

interface SpeechProps {
  winner: Nominee;
  category: string;
  onNavigate: (screen: Screen) => void;
}

const Speech: React.FC<SpeechProps> = ({ winner, category, onNavigate }) => {
  const [speech, setSpeech] = useState<string>("Generazione del discorso emozionale...");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    gemini.generateSpeech(winner.name, category).then(setSpeech);
  }, [winner, category]);

  return (
    <div className="animate-fade-in-up flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-[960px] flex flex-col items-center">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#3a1d1d] px-3 py-1 rounded-full text-primary text-xs font-bold uppercase tracking-wider mb-2 border border-[#482323]">
            <span className="material-symbols-outlined text-sm">movie_filter</span>
            {category}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
            Discorso di Accettazione
          </h1>
          <p className="text-[#c99292] text-xl font-medium mt-2">
            Vincitore: <span className="text-white border-b border-primary/50 pb-0.5">{winner.name}</span>
          </p>
        </div>

        <div className="w-full max-w-sm mb-8">
          <div className="flex bg-[#2c1515] p-1 rounded-xl shadow-inner border border-[#3a1d1d]">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#482323] text-white text-sm font-medium">
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              <span>Video</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-[#c99292] hover:text-white text-sm font-medium transition-colors">
              <span className="material-symbols-outlined text-[18px]">description</span>
              <span>Trascrizione</span>
            </button>
          </div>
        </div>

        <div className="w-full bg-[#1a0b0b] rounded-2xl p-2 md:p-4 shadow-2xl border border-[#3a1d1d] relative overflow-hidden group/player mb-10">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isPlaying ? 'opacity-20' : 'opacity-80 group-hover/player:opacity-60'}`}
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNFNxBrLMh5LPzOZ_v6z-av95dMuw3HaJI43efrDlVGCu3Vy9kVoQdODvDukjx2ay0k2DlWNhUjQp6ahzTMM6hw9bO81Y7lLV-Xc2mbt2XkDCfgyPYJCtP8b7QUHZn5mPMQTfUhCZec7T73QuJEU_a25XJc4W9KvCgWnCAPHwqIiFh5BDpOTRvCz0DHyOU8VN403whWLDb9yBh34ht7PjI0DHjDK_mMcQ1cRiIcJ4BA4OEp6fVZAMMuUBY8S3VQ6NBGAdwtlrmFqw")' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="group/btn flex items-center justify-center w-24 h-24 rounded-full bg-primary/90 text-white shadow-[0_0_30px_rgba(236,19,19,0.5)] hover:bg-primary hover:scale-110 transition-all duration-300 z-20"
              >
                <span className="material-symbols-outlined text-5xl ml-1">{isPlaying ? 'pause' : 'play_arrow'}</span>
              </button>
            </div>
            
            {isPlaying && (
               <div className="absolute inset-0 flex items-center justify-center p-8 text-center z-10 animate-fade-in-up">
                 <p className="text-xl md:text-3xl text-white font-light italic leading-relaxed">
                   "{speech.split(' ').slice(0, 15).join(' ')}..."
                 </p>
               </div>
            )}
          </div>
        </div>

        <div className="w-full max-w-2xl text-center space-y-6">
          <span className="material-symbols-outlined text-4xl text-[#482323]">format_quote</span>
          <p className="text-white/90 text-xl md:text-3xl font-light leading-relaxed italic animate-fade-in-up">
            "{speech}"
          </p>
          <div className="h-1 w-20 bg-[#482323] mx-auto rounded-full mt-8"></div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#2c1515] border border-[#3a1d1d] text-gray-300 hover:text-white hover:border-primary/50 hover:bg-[#3a1d1d] transition-all">
            <span className="material-symbols-outlined text-[20px]">share</span>
            <span className="text-sm font-bold uppercase tracking-wider">Condividi</span>
          </button>
          <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#2c1515] border border-[#3a1d1d] text-gray-300 hover:text-white hover:border-primary/50 hover:bg-[#3a1d1d] transition-all">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span className="text-sm font-bold uppercase tracking-wider">Scarica Trascrizione</span>
          </button>
        </div>

        <div className="mt-16 w-full pt-8 border-t border-[#3a1d1d] flex justify-between items-center text-sm text-[#c99292]">
          <button onClick={() => onNavigate('categories')} className="flex items-center gap-2 hover:text-white transition-colors group">
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Vincitore Precedente
          </button>
          <button onClick={() => onNavigate('credits')} className="flex items-center gap-2 hover:text-white transition-colors group">
            Prossimo Vincitore
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Speech;
