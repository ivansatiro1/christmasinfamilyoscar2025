
import React, { useState, useEffect } from 'react';
import { Screen, Nominee } from '../types';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
  nominees: Nominee[];
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const calculateTimeLeft = () => {
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
      <section className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Cinematic background" 
            className="h-full w-full object-cover opacity-40 scale-110 blur-[2px]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIynJEMH6I_D0HlGTjirDX9wmK8DzlZ89Z2THpm2VxAFUzlLCf71F8GuFUVkTko4cmCnhdQY-U9yaDDJR96xcSAKY4LdquZPeM7QRi3-yvhfrSmUQFOSanmz7F3tvJejOezbHQhMlNCr_hMlNCr_hLy00JUzCEhW0aFMKy1t_H2jMBcX04bhH6IBynSW3dbJAqphDMPunWHad5FREcVZruRdKx2h4eeF_IsWGBTfLR-WB4KPHHh4uA7gSxK3J_TRInXExISYh0cYMpddrXf8" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
        </div>

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative inline-flex items-center gap-3 rounded-full border border-gold/60 bg-black/60 px-6 py-2.5 backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.3)] group cursor-default">
              <span className="flex h-2.5 w-2.5 rounded-full bg-gold animate-pulse"></span>
              <span className="text-sm font-black uppercase tracking-[0.4em] text-gold">1ª Edizione</span>
              <span className="material-symbols-outlined text-gold text-lg group-hover:rotate-12 transition-transform">stars</span>
            </div>
            <h1 className="font-display text-5xl font-black uppercase leading-tight tracking-tight text-white sm:text-7xl lg:text-8xl">
              La Notte <br/>
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent italic">Delle Stelle</span>
            </h1>
          </div>

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
              className="group relative flex min-w-[280px] cursor-pointer items-center justify-center gap-4 rounded-full bg-primary px-12 py-6 text-xl font-black uppercase tracking-widest text-white shadow-[0_0_40px_rgba(236,19,19,0.4)] transition-all hover:scale-105 hover:bg-red-600 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="material-symbols-outlined text-3xl">theaters</span>
              Inizia la Serata
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
