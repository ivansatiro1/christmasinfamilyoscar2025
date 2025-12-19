
import React from 'react';
import { Screen } from '../types';

interface FooterProps {
  onNavigate: (screen: Screen) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/10 bg-[#1a0c0c] px-6 py-12 text-center text-slate-400">
      <div className="mb-8 flex justify-center gap-6">
        {['share', 'mail', 'language'].map((icon) => (
          <a key={icon} className="rounded-full bg-white/5 p-3 transition-colors hover:bg-white/10 hover:text-white" href="#">
            <span className="material-symbols-outlined text-xl">{icon}</span>
          </a>
        ))}
      </div>
      <p className="text-sm">© 2024 La Notte delle Stelle. Tutti i diritti riservati.</p>
      <div className="mt-4 flex justify-center gap-4 text-xs">
        <a className="hover:text-white hover:underline" href="#">Privacy Policy</a>
        <a className="hover:text-white hover:underline" href="#">Termini di Servizio</a>
        <a className="hover:text-white hover:underline" href="#">Accrediti Stampa</a>
      </div>
    </footer>
  );
};

export default Footer;
