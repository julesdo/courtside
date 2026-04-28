import { Link } from 'react-router-dom';
import { Trophy, Menu, X, Search, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-11 h-11 bg-brand-accent rounded-full flex items-center justify-center text-black performance-glow group-hover:scale-110 transition-transform">
                <Trophy size={22} strokeWidth={2.5} />
              </div>
              <span className="text-3xl font-black italic tracking-tighter text-white">
                COURT<span className="text-brand-accent">SIDE</span>
              </span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-10">
              {[
                { label: 'Actualités', slug: 'actualites' },
                { label: 'Tournois', slug: 'tournois' },
                { label: 'Classement', slug: 'classement' },
                { label: 'Équipement', slug: 'equipement' }
              ].map((item) => (
                <Link
                  key={item.label}
                  to={`/category/${item.slug}`}
                  className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-accent transition-all relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-accent transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
                LIVE : ROLAND GARROS
              </span>
            </div>
            <button className="bg-brand-accent text-black px-6 py-2.5 rounded-full font-black italic text-[11px] uppercase tracking-widest hover:scale-105 transition-all performance-glow">
              S'ABONNER
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-brand-bg border-b border-brand-accent py-8 px-6 space-y-6">
          {[
            { label: 'Actualités', slug: 'actualites' },
            { label: 'Tournois', slug: 'tournois' },
            { label: 'Classement', slug: 'classement' },
            { label: 'Équipement', slug: 'equipement' }
          ].map((item) => (
            <Link
              key={item.label}
              to={`/category/${item.slug}`}
              className="block text-xl font-black italic text-[#B1FF41] hover:translate-x-2 transition-transform"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <button className="w-full py-4 bg-white text-black rounded-2xl font-black italic uppercase tracking-widest shadow-xl">
            S'abonner
          </button>
        </div>
      )}
    </nav>
  );
}
