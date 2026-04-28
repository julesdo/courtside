import { Trophy, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A1A2F] py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold text-slate-500 tracking-widest uppercase">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 bg-[#B1FF41] rounded-full flex items-center justify-center text-black">
                <Trophy size={14} />
              </div>
            <p>© 2026 COURTSIDE MEDIA - TOUS DROITS RÉSERVÉS</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
