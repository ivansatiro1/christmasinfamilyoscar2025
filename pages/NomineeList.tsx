
import React, { useState, useEffect, useRef } from 'react';
import { Screen, AwardCategory, Nominee } from '../types';
import { Winners, CATEGORIES } from '../constants';
import { gemini } from '../geminiService';

interface NomineeListProps {
  category: AwardCategory;
  onNavigate: (screen: Screen, data: Nominee) => void;
}

const NomineeList: React.FC<NomineeListProps> = ({ category, onNavigate }) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number = 24000,
    numChannels: number = 1
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const playAudioFromBase64 = async (base64: string) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const audioData = decode(base64);
      const audioBuffer = await decodeAudioData(audioData, ctx);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start();
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  useEffect(() => {
    setRevealedCount(0);
    setAllRevealed(false);
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [category.id]);

  const handleRevealNext = () => {
    if (revealedCount < category.nominees.length) {
      setRevealedCount(prev => prev + 1);
    }
    if (revealedCount + 1 === category.nominees.length) {
      setAllRevealed(true);
    }
  };

  const handleNomineeClick = async (nominee: Nominee) => {
    setLoadingAudio(nominee.id);
    try {
      if (nominee.id === 'c1-1') {
        const audioData = await gemini.textToSpeech("Volevamo far crescere i nostri figli con Tonio Cartonio e Lupo lucio", 'Kore');
        if (audioData) await playAudioFromBase64(audioData);
      } else if (nominee.id === 'c1-2') {
        const prompt = "Dì con la voce squillante ed energica di Ezio Greggio: Lo mollo o non lo mollo, ma ceeeeeeeeeerto che lo mollo!";
        const audioData = await gemini.textToSpeech(prompt, 'Puck');
        if (audioData) await playAudioFromBase64(audioData);
      } else if (nominee.id === 'c1-3') {
        setActiveVideo("https://www.youtube.com/embed/IIXN684w4rU?start=50&autoplay=1");
      } else if (nominee.id === 'c1-4' || nominee.id === 'c4-4') {
        const prompt1= "Dì con la voce agitata: Luca, è passata la finestra del soono!!!!Vittoria, sveglia, vittoria sveglia, non dormire, giochiamo un pò!!!";
        const audioData = await gemini.textToSpeech(prompt1, 'Kore');
        if (audioData) await playAudioFromBase64(audioData);
      } else if (nominee.id === 'c2-2') {
        setActiveVideo("https://www.youtube.com/embed/mrDOc7DaBJk?start=1&autoplay=1");
      } else if (nominee.id === 'c2-3') {
        setActiveVideo("https://www.youtube.com/embed/xuqYNx8zaXM?start=1&autoplay=1");
      } else if (nominee.id === 'c2-4') {
        setActiveVideo("https://www.youtube.com/embed/RGbnp-LMJRE?start=10&autoplay=1");
      }
    } catch (err) {
      console.error("Interaction error:", err);
    } finally {
      setLoadingAudio(null);
    }
  };

  const handleDiscoverWinner = () => {
    const categoryIndex = CATEGORIES.findIndex(c => c.id === category.id);
    if (categoryIndex !== -1 && Winners[categoryIndex]) {
      onNavigate('winner', Winners[categoryIndex]);
    } else if (category.nominees.length > 0) {
      onNavigate('winner', category.nominees[0]);
    }
  };

  return (
    <div className="animate-fade-in-up flex flex-col items-center py-12 px-4 min-h-[80vh]">
      <div className="max-w-[1100px] w-full">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">stars</span>
            <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">Nomination Ufficiali</span>
          </div>
          <h1 className="text-white text-4xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic">
            {category.title}
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full"></div>
          <p className="text-[#c99292] text-lg font-light leading-relaxed max-w-2xl mx-auto italic">
            "{category.description}"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {category.nominees.map((nominee, index) => {
            const isRevealed = index < revealedCount;
            const isLoading = loadingAudio === nominee.id;
            
            return (
              <div 
                key={nominee.id}
                className={`transition-all duration-700 transform ${
                  isRevealed 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12 pointer-events-none'
                }`}
              >
                <div 
                  className={`group flex flex-col gap-4 ${isRevealed ? 'cursor-pointer' : ''}`}
                  onClick={() => isRevealed && handleNomineeClick(nominee)}
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl border-2 border-[#482323] group-hover:border-primary transition-all duration-500 shadow-2xl bg-black">
                    <div 
                      className="w-full h-full bg-center bg-no-repeat bg-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" 
                      style={{ backgroundImage: `url("${nominee.imageUrl}")` }}
                    ></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                      ) : (
                        <span className="material-symbols-outlined text-white text-6xl drop-shadow-lg">play_circle</span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4">
                       <span className="text-white/40 text-4xl font-black italic opacity-20">0{index + 1}</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-left space-y-1 px-2">
                    <p className="text-white text-2xl font-black leading-tight tracking-tight uppercase group-hover:text-primary transition-colors">
                      {nominee.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-8">
          {!allRevealed ? (
            <div className="flex flex-col items-center gap-6">
              <p className="text-white/60 text-sm font-bold uppercase tracking-[0.2em] animate-pulse">
                Svelati: {revealedCount} di {category.nominees.length}
              </p>
              <button 
                onClick={handleRevealNext}
                className="group relative flex items-center justify-center h-20 px-12 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 font-black text-xl uppercase tracking-tighter overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Svela Candidato
                  <span className="material-symbols-outlined text-3xl">expand_more</span>
                </span>
                <div className="absolute inset-0 bg-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          ) : (
            <div className="w-full animate-fade-in-up">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#482323] to-[#1a0b0b] border-2 border-gold/30 p-12 text-center flex flex-col items-center gap-8 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                <span className="material-symbols-outlined text-gold text-7xl animate-bounce">emoji_events</span>
                <div className="space-y-2">
                  <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter">Candidati pronti</h2>
                  <p className="text-[#c99292] text-lg max-w-[600px] mx-auto italic">
                    "Clicca sui candidati svelati per il contributo multimediale. Quando sei pronto, proclama il vincitore!"
                  </p>
                </div>
                <button 
                  onClick={handleDiscoverWinner}
                  className="flex w-full max-w-md cursor-pointer items-center justify-center rounded-full h-16 bg-primary hover:bg-red-700 transition-all hover:scale-105 shadow-2xl shadow-primary/40 text-white font-black text-xl uppercase tracking-widest active:scale-95"
                >
                  Proclama il Vincitore
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8">
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white z-10 transition-colors"
          >
            <span className="material-symbols-outlined text-5xl">close</span>
          </button>
          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_50px_rgba(236,19,19,0.3)] bg-black">
            <iframe 
              className="w-full h-full"
              src={activeVideo} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default NomineeList;
