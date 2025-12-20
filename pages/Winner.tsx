
import React, { useState, useRef, useEffect } from 'react';
import { Screen, Nominee } from '../types';
import { gemini } from '../geminiService';

interface WinnerProps {
  winner: Nominee;
  category: string;
  onNavigate: (screen: Screen, data?: any) => void;
}

const Winner: React.FC<WinnerProps> = ({ winner, category, onNavigate }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const isBestParent = category === 'Best Parent';
  const isBestBabysitter = category === 'Best Babysitter';

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

  const handleAction = async () => {
    if (isBestBabysitter) {
      // Embed video richiesto: 3lM1dfW8a44
      setActiveVideo("https://www.youtube.com/embed/3lM1dfW8a44?autoplay=1");
    } else if (isBestParent) {
      // Audio Alexa
      setLoadingAudio(true);
      try {
        const prompt = `Dì con voce neutra, chiara e robotica stile assistente vocale: Congratulazioni a Emanuele e Raffaella. Avete vinto il premio Best Parent per la vostra dedizione e il vostro amore incondizionato. Grazie per essere un esempio per tutti noi.`;
        const audioData = await gemini.textToSpeech(prompt, 'Kore');
        if (audioData) await playAudioFromBase64(audioData);
      } finally {
        setLoadingAudio(false);
      }
    } else {
      onNavigate('speech', winner);
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center py-12 px-6 min-h-[70vh]">
      <div className="text-center mb-12">
        <p className="text-[#c99292] text-sm sm:text-base font-medium tracking-widest uppercase mb-3">La Notte delle Stelle</p>
        <h1 className="text-white text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-2xl uppercase italic">
          {category}
        </h1>
      </div>

      <div className="w-full max-w-5xl relative group perspective-1000">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-red-500 to-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
        <div className="relative flex flex-col md:flex-row items-stretch overflow-hidden rounded-xl bg-[#2a1515] shadow-2xl ring-1 ring-white/10 border border-white/5">
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
                <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/20 tracking-wider uppercase">Vincitore Ufficiale</span>
                <span className="flex h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></span>
              </div>
              <div>
                <h2 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold leading-none tracking-tight mb-2">
                  {winner.name.split(' ')[0]} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 italic">{winner.name.split(' ').slice(1).join(' ')}</span>
                </h2>
                {winner.work && (
                   <p className="text-[#c99292] text-xl sm:text-2xl font-normal mt-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">verified</span>
                    {winner.work}
                  </p>
                )}
              </div>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <button 
                  onClick={handleAction}
                  disabled={loadingAudio}
                  className="flex-1 min-w-[200px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 bg-primary hover:bg-red-600 disabled:opacity-50 text-white text-base font-bold shadow-lg shadow-primary/25 transition-all transform active:scale-95 group/btn"
                >
                  <div className="flex items-center gap-2">
                    {loadingAudio ? (
                       <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <span className="material-symbols-outlined group-hover/btn:animate-bounce">
                        {isBestBabysitter ? 'play_circle' : isBestParent ? 'spatial_audio' : 'auto_fix_high'}
                      </span>
                    )}
                    <span className="truncate uppercase">
                      {isBestBabysitter ? 'Guarda Video' : isBestParent ? 'Ascolta Ringraziamenti' : 'Discorso AI'}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 w-full max-w-lg">
        <button 
          onClick={() => onNavigate('categories')}
          className="w-full cursor-pointer flex items-center justify-between rounded-xl h-16 px-6 bg-[#2a1515] hover:bg-[#381e1e] border border-white/5 text-white transition-all group shadow-xl"
        >
          <span className="font-bold uppercase tracking-widest text-sm">Torna alle Categorie</span>
          <div className="size-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </button>
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

export default Winner;
