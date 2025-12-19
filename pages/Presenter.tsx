
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';
import { gemini } from '../geminiService';

interface PresenterProps {
  onNavigate: (screen: Screen) => void;
}

const Presenter: React.FC<PresenterProps> = ({ onNavigate }) => {
  const [intro, setIntro] = useState<string>("Caricamento presentazione...");

  useEffect(() => {
    gemini.generatePresenterIntro().then(setIntro);
  }, []);

  return (
    <div className="animate-fade-in-up">
      <section className="w-full bg-background-dark bg-[radial-gradient(circle_at_50%_0%,_#4a2020_0%,_#221010_60%)] px-6 py-12 md:px-10 lg:px-40 flex justify-center">
        <div className="max-w-[960px] w-full flex flex-col gap-10 lg:flex-row items-center">
          <div className="flex flex-col gap-6 flex-1 text-center lg:text-left z-10 order-2 lg:order-1">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="material-symbols-outlined text-sm">live_tv</span>
                Diretta Esclusiva
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-400">
                Benvenuti alla Serata di Gala
              </h1>
              <h2 className="text-gray-300 text-base font-normal leading-relaxed md:text-lg pt-2 max-w-2xl mx-auto lg:mx-0 italic">
                "{intro}"
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button className="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary hover:bg-red-700 text-white text-base font-bold transition-all shadow-lg hover:shadow-primary/50">
                <span className="material-symbols-outlined">play_circle</span>
                Guarda il Discorso
              </button>
              <button 
                onClick={() => onNavigate('categories')}
                className="flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-transparent border border-gray-600 hover:bg-white/10 text-white text-base font-bold transition-all"
              >
                <span className="material-symbols-outlined">description</span>
                Leggi Programma
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2 relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full transform scale-75"></div>
            <div className="relative w-full aspect-[4/5] max-w-md overflow-hidden rounded-2xl border border-[#482323] shadow-2xl">
              <div 
                className="w-full h-full bg-center bg-no-repeat bg-cover transform transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5D_YuQjIpLKdL2XtZGendQbAwoc4KnYKxzlibc4_5nNLZQBt0zxpObDUOh_Zt9Vcyn4Lh7meRnPtO_oZ8vXFDSCHGOpMjSTt2B46oOIKGvOGaU9Qhe61pBjp2vk0uzvffDH_ZPV5f92cunm-fgBjFsueHik0_HyhktUat3yuKrgqWNyQEZfoKgHxRK-pnbos69tbnTl9Co_TJz5J6DASbKyV5DB1bDIQQzP3XNof3sKSWeFWIZu47U4bBb4qBQwZ-MrBDEfRrLJg")' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-background-dark/80 backdrop-blur-md border border-white/10 p-3 rounded-lg flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Status Sistema</span>
                  <span className="text-sm font-bold text-white">Online • Voce Sintetizzata Attiva</span>
                </div>
                <span className="material-symbols-outlined ml-auto text-white/50">graphic_eq</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 md:px-10 lg:px-40 py-12 flex flex-col items-center">
        <div className="max-w-[960px] w-full border-b border-[#482323] pb-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">Dietro le Quinte</h2>
          <p className="text-[#c99292] mt-2">Come abbiamo creato l'esperienza del Presentatore Virtuale</p>
        </div>
        <div className="max-w-[960px] w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'smart_toy', title: 'Intelligenza Artificiale', desc: 'Il copione è generato in tempo reale da modelli linguistici avanzati per adattarsi alle reazioni del pubblico.' },
            { icon: 'motion_sensor_active', title: 'Animazione Realistica', desc: 'Tecnologia Motion Capture utilizzata per catturare la micro-espressività di attori teatrali professionisti.' },
            { icon: 'record_voice_over', title: 'Voce Sintetizzata', desc: 'Un timbro vocale unico, calibrato per avere la gravitas e l\'enfasi degne di un vero presentatore di gala.' }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col gap-4 rounded-xl border border-[#673232] bg-[#331919] p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-[#c99292] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Presenter;
