
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
  const [isLocalVideo, setIsLocalVideo] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
  const [pendingWinnerNavigation, setPendingWinnerNavigation] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);

  const isChoreographer = category.id === 'choreographer';

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

  const playLocalFile = (fileName: string) => {
    if (localAudioRef.current) {
      localAudioRef.current.pause();
    }
    const audio = new Audio(`img/${fileName}`);
    localAudioRef.current = audio;
    audio.play().catch(err => console.error("Local audio playback error:", err));
  };

  useEffect(() => {
    setRevealedCount(0);
    setAllRevealed(false);
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      if (localAudioRef.current) {
        localAudioRef.current.pause();
        localAudioRef.current = null;
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

  const handleDiscoverJury = () => {
    setIsLocalVideo(true);
    setActiveVideo("img/ilmondodelladanzasa.mp4");
  };

  const handleNomineeClick = async (nominee: Nominee) => {
    setLoadingAudio(nominee.id);
    try {
      if (nominee.id === 'c1-1') {
        playLocalFile('Genitori.m4a');
      } else if (nominee.id === 'c1-2') {
        playLocalFile('EmaRaffa.m4a');
      } else if (nominee.id === 'c1-3') {
        setIsLocalVideo(false);
        setActiveVideo("https://www.youtube.com/embed/IIXN684w4rU?start=50&autoplay=1");
      } else if (nominee.id === 'c1-4') {
        playLocalFile('Fede.m4a');
      } else if (nominee.id === 'c4-4') {
        playLocalFile('AudioVittoria.m4a');
      } else if (nominee.id === 'c2-2') {
        setIsLocalVideo(false);
        setActiveVideo("https://www.youtube.com/embed/mrDOc7DaBJk?start=1&autoplay=1");
      } else if (nominee.id === 'c2-3') {
        setIsLocalVideo(false);
        setActiveVideo("https://www.youtube.com/embed/xuqYNx8zaXM?start=1&autoplay=1");
      } else if (nominee.id === 'c2-4') {
        setIsLocalVideo(false);
        setActiveVideo("https://www.youtube.com/embed/RGbnp-LMJRE?start=10&autoplay=1");
      } else if (category.id === 'christmas') {
        const prompt = `Dì con entusiasmo: Ecco lo splendido albero di Natale di ${nominee.name}! Che magia!`;
        const audioData = await gemini.textToSpeech(prompt, 'Zephyr');
        if (audioData) await playAudioFromBase64(audioData);
      }
    } catch (err) {
      console.error("Interaction error:", err);
    } finally {
      setLoadingAudio(null);
    }
  };

  const handleDiscoverWinner = () => {
    // Prima di navigare, mostriamo il video di suspense richiesto
    setIsLocalVideo(false);
    setActiveVideo("https://www.youtube.com/embed/ua-5RI4dJOU?start=5&autoplay=1&controls=0&rel=0");
    setPendingWinnerNavigation(true);
  };

  const executeWinnerNavigation = () => {
    const categoryIndex = CATEGORIES.findIndex(c => c.id === category.id);
    let targetWinner: Nominee;
    
    if (categoryIndex !== -1 && Winners[categoryIndex]) {
      targetWinner = Winners[categoryIndex];
    } else if (category.nominees.length > 0) {
      targetWinner = category.nominees[0];
    } else {
      targetWinner = Winners.find(w => w.category === category.title) || Winners[0];
    }
    
    onNavigate('winner', targetWinner);
  };

  const closeVideo = () => {
    setActiveVideo(null);
    setIsLocalVideo(false);
    if (pendingWinnerNavigation) {
      setPendingWinnerNavigation(false);
      executeWinnerNavigation();
    }
  };

  return (
    <div className="animate-fade-in-up flex flex-col items-center py-12 px-4 min-h-[80vh]">
      <div className="max-w-[1100px] w-full">
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">stars</span>
            <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">
              {isChoreographer ? 'Voto della Giuria' : 'Nomination Ufficiali'}
            </span>
          </div>
          <h1 className="text-white text-4xl md:text-7xl font-black leading-tight tracking-tighter uppercase italic">
            {category.title}
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full"></div>
          <p className="text-[#c99292] text-lg font-light leading-relaxed max-w-2xl mx-auto italic">
            "{category.description}"
          </p>
        </div>

        {!isChoreographer ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-surface-dark/30 rounded-3xl border border-white/5 mb-20 animate-fade-in-up">
             <div className="mb-10 p-6 rounded-full bg-primary/10 border border-primary/20">
                <span className="material-symbols-outlined text-primary text-7xl animate-pulse">groups</span>
             </div>
             <p className="text-white/70 text-center max-w-md mb-8 italic">
                In questa categoria d'eccellenza, i candidati sono stati valutati segretamente dalla nostra commissione tecnica.
             </p>
             <button 
                onClick={handleDiscoverJury}
                className="group relative flex items-center justify-center h-20 px-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-white font-bold uppercase tracking-widest overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="material-symbols-outlined text-gold group-hover:rotate-12 transition-transform">how_to_reg</span>
                  Scopri la Giuria
                </span>
              </button>
          </div>
        )}

        <div className="flex flex-col items-center gap-8">
          {!isChoreographer && !allRevealed ? (
            <div className="flex flex-col items-center gap-6">
              <p className="text-white/60 text-sm font-bold uppercase tracking-[0.2em] animate-pulse">
                Svelati: {revealedCount} di {category.nominees.length}
              </p>
              <button 
                onClick={handleRevealNext}
                className="group relative flex items-center justify-center h-20 px-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-white font-bold uppercase tracking-widest overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center gap-3">
                  <span className="material-symbols-outlined text-gold">visibility</span>
                  Svela Prossimo Candidato
                </span>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleDiscoverWinner}
              className="group relative flex items-center justify-center h-24 px-16 bg-primary hover:bg-red-600 rounded-full transition-all text-white font-black uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(236,19,19,0.5)] hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined mr-3 text-3xl">emoji_events</span>
              Scopri il Vincitore
            </button>
          )}
        </div>
      </div>
      
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 md:p-8">
          <div className="w-full max-w-5xl flex justify-between items-center mb-4">
             <h3 className="text-white text-lg font-bold uppercase tracking-widest">
                {pendingWinnerNavigation ? "And the Oscar goes to..." : "Visualizzazione Video"}
             </h3>
             <button 
              onClick={closeVideo}
              className="text-white/70 hover:text-white transition-all flex items-center gap-2 group"
            >
              <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {pendingWinnerNavigation ? "Proclama Vincitore" : "Chiudi"}
              </span>
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>
          </div>
          
          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_50px_rgba(236,19,19,0.3)] bg-black">
            {isLocalVideo ? (
              <video 
                className="w-full h-full object-contain" 
                controls 
                autoPlay 
                playsInline
                src={activeVideo}
              ></video>
            ) : (
              <iframe 
                className="w-full h-full"
                src={activeVideo} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            )}
          </div>
          
          {pendingWinnerNavigation && (
            <div className="mt-8">
              <button 
                onClick={closeVideo}
                className="px-10 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-full hover:bg-red-600 transition-all shadow-xl animate-pulse"
              >
                Scopri il Nome!
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NomineeList;
