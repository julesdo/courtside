import { Link } from 'react-router-dom';
import { Trophy, Menu, X, Search, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1E293B] border-b-4 border-[#B1FF41] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#B1FF41] rounded-full flex items-center justify-center text-black">
                <Trophy size={20} />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-white">
                COURT<span className="text-[#B1FF41]">SIDE</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              {['Actualités', 'Tournois', 'Classement', 'Équipement'].map((item) => (
                <Link
                  key={item}
                  to={`/category/${item.toLowerCase()}`}
                  className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-[#B1FF41] transition-all"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="bg-[#B1FF41] text-black px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest">
              LIVE : Roland Garros
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1E293B] border-b-4 border-brand-accent py-6 px-4 space-y-4">
          {['Actualités', 'Tournois', 'Classement', 'Équipement'].map((item) => (
            <Link
              key={item}
              to={`/category/${item.toLowerCase()}`}
              className="block text-xl font-black italic text-[#B1FF41] hover:translate-x-2 transition-transform"
              onClick={() => setIsOpen(false)}
            >
              {item}
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
