import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import { motion } from 'motion/react';
import { ArrowRight, Play, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const featured = articles[0];
  const others = articles.slice(1);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[700px] flex items-center overflow-hidden bg-brand-bg">
        <div className="absolute inset-0 z-0">
          <img 
            src={featured.imageUrl} 
            alt={featured.title}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="h-[2px] w-12 bg-brand-accent"></div>
               <span className="text-brand-accent text-xs font-black tracking-[0.3em] uppercase">
                À LA UNE • {featured.category}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-[10rem] font-black italic text-white leading-[0.8] tracking-tighter mb-10">
              {featured.title}
            </h1>
            
            <p className="text-2xl text-slate-300 mb-12 leading-relaxed max-w-2xl italic font-medium">
              "{featured.description}"
            </p>
            
            <div className="flex flex-wrap items-center gap-8">
              <Link 
                to={`/article/${featured.id}`}
                className="group flex items-center gap-6 bg-brand-accent text-black px-10 py-5 rounded-full font-black italic uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_40px_rgba(177,255,65,0.3)]"
              >
                Lire l'article
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="flex items-end justify-between border-b-4 border-slate-800 pb-8">
              <div>
                <p className="text-[#B1FF41] text-xs font-black tracking-widest uppercase mb-1">Dernières actus</p>
                <h2 className="text-5xl font-black italic text-white tracking-tighter">SUR LE COURT</h2>
              </div>
              <Link to="/news" className="text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-[#B1FF41] transition-all">
                VOIR TOUT +
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {others.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
              {others.map(article => (
                <ArticleCard key={article.id + '-extra'} article={{...article, id: article.id + '-extra'}} />
              ))}
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 flex flex-col gap-12">
             <div className="bg-brand-indigo rounded-[3rem] p-8 text-white shadow-2xl border-l-[12px] border-brand-accent relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black italic mb-10 flex items-center gap-3">
                    <TrendingUp size={28} className="text-brand-accent" />
                    Top Stories
                  </h3>
                  <div className="space-y-10">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-6 group/item cursor-pointer">
                        <span className="text-5xl font-black italic text-white opacity-10 group-hover/item:opacity-30 transition-all">
                          #{i}
                        </span>
                        <div>
                          <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-1 block">RANKINGS</span>
                          <h4 className="text-lg font-black italic group-hover/item:text-brand-accent transition-colors leading-none tracking-tight">
                            Record historique pour Novak Djokovic
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Trophy size={180} className="absolute -bottom-10 -right-10 text-white opacity-5 rotate-12" />
             </div>

             <div className="bg-brand-accent rounded-[3rem] p-10 text-black shadow-2xl transform rotate-1">
                <h3 className="text-4xl font-black italic tracking-tighter mb-4 leading-none">CLUB PRIVÉ</h3>
                <p className="font-bold text-sm mb-8 leading-tight">
                  Accédez aux analyses exclusives et aux interviews inédites de vos joueurs préférés.
                </p>
                <button className="w-full py-5 bg-black text-white rounded-2xl font-black italic uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-xl">
                  REJOINDRE LE CLUB
                </button>
             </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

import { Trophy } from 'lucide-react';
