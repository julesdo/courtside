import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-bg py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-[11px] font-black text-slate-500 tracking-[0.3em] uppercase">
          <div className="flex items-center group">
            <p className="text-white text-2xl font-black italic tracking-tighter">COURT<span className="text-brand-accent">SIDE</span> MEDIA</p>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            <a href="#" className="hover:text-brand-accent transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Publicité</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-[10px] text-slate-600 font-black tracking-[0.5em] uppercase">
            © 2026 COURTSIDE MEDIA GROUP - PERFORMANCE & ELEGANCE
          </p>
        </div>
      </div>
    </footer>
  );
}
