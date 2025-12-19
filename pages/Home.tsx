
import React, { useState, useEffect } from 'react';
import { Screen, Nominee } from '../types';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
  nominees: Nominee[];
}

const Home: React.FC<HomeProps> = ({ onNavigate, nominees }) => {
  const calculateTimeLeft = () => {
    // Target: December 25th at 22:00
    const target = new Date('2025-12-25T22:00:00');
    const now = new Date();
    const difference = target.getTime() - now.getTime();
    
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Cinematic background" 
            className="h-full w-full object-cover opacity-40 scale-110 blur-[2px]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIynJEMH6I_D0HlGTjirDX9wmK8DzlZ89Z2THpm2VxAFUzlLCf71F8GuFUVkTko4cmCnhdQY-U9yaDDJR96xcSAKY4LdquZPeM7QRi3-yvhfrSmUQFOSanmz7F3tvJejOezbHQhMlNCr_hLy00JUzCEhW0aFMKy1t_H2jMBcX04bhH6IBynSW3dbJAqphDMPunWHad5FREcVZruRdKx2h4eeF_IsWGBTfLR-WB4KPHHh4uA7gSxK3J_TRInXExISYh0cYMpddrXf8" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
        </div>

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="material-symbols-outlined text-gold text-sm">stars</span>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">1 Edizione annuale</span>
            </div>
            <h1 className="font-display text-5xl font-black uppercase leading-tight tracking-tight text-white sm:text-7xl lg:text-8xl">
              La Notte <br/>
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Delle Stelle</span>
            </h1>
          </div>

          {/* Countdown */}
          <div className="w-full max-w-3xl rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-md sm:p-8">
            <div className="grid grid-cols-4 gap-4 sm:gap-8">
              {[
                { label: 'Giorni', val: format(timeLeft.days), color: 'text-white' },
                { label: 'Ore', val: format(timeLeft.hours), color: 'text-white' },
                { label: 'Minuti', val: format(timeLeft.minutes), color: 'text-gold' },
                { label: 'Secondi', val: format(timeLeft.seconds), color: 'text-primary' },
              ].map((t) => (
                <div key={t.label} className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-full items-center justify-center rounded-lg bg-gradient-to-br from-[#482323] to-[#2a1212] border border-white/10 shadow-inner sm:h-24">
                    <p className={`font-display text-3xl font-bold ${t.color} sm:text-5xl`}>{t.val}</p>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-widest text-white/60">{t.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full items-center justify-center gap-4 sm:flex-row">
            <button 
              onClick={() => onNavigate('categories')}
              className="flex min-w-[200px] cursor-pointer items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(236,19,19,0.4)] transition-all hover:scale-105 hover:bg-red-600 hover:shadow-[0_0_30px_rgba(236,19,19,0.6)]"
            >
              <span className="material-symbols-outlined">play_circle</span>
              Vedi Nomination
            </button>
          </div>
        </div>
      </section>

      {/* Featured Nominees Carousel */}
      <section className="w-full bg-background-dark py-12 lg:py-20 relative border-t border-white/5">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-[1px] w-8 bg-gold"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold">In primo piano</span>
              </div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">I Candidati Principali</h2>
            </div>
            <button 
              onClick={() => onNavigate('categories')}
              className="group flex items-center gap-1 text-sm font-bold text-white hover:text-primary transition-colors"
            >
              Vedi tutte le nomination
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {nominees.map((nominee) => (
              <div 
                key={nominee.id}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#2a1515] transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <div 
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                    style={{ backgroundImage: `url(${nominee.imageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <div className="mb-1 rounded bg-primary/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white w-fit">
                    {nominee.category}
                  </div>
                  <h3 className="text-base font-bold text-white truncate">{nominee.name}</h3>
                  <p className="text-xs text-slate-400 truncate">{nominee.work}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
