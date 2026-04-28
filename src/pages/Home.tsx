import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';
import { motion } from 'motion/react';
import { ArrowRight, Play, TrendingUp, Trophy } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
  const { cat } = useParams<{ cat: string }>();
  
  // Mapping of slug to friendly category name
  const catMap: Record<string, string> = {
    'actualites': 'Actualités',
    'tournois': 'Tournois',
    'classement': 'Classement',
    'equipement': 'Équipement',
    'analyse': 'Analyse'
  };

  const currentCat = cat ? catMap[cat.toLowerCase()] : null;

  const filteredArticles = currentCat 
    ? articles.filter(a => a.category === currentCat)
    : articles;

  const featured = filteredArticles[0] || articles[0]; // Fallback to first ever article if none in cat
  const others = filteredArticles.length > 0 ? filteredArticles.slice(1) : [];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      {featured && (
        <section className="relative h-[85vh] min-h-[700px] flex items-center overflow-hidden bg-brand-bg">
          <div className="absolute inset-0 z-0">
            <img 
              src={featured.imageUrl} 
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110"
              referrerPolicy="no-referrer"
            />
            {/* Sophisticated Overlay for Premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent" />
            <div className="absolute inset-0 bg-brand-bg/20 backdrop-brightness-75" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-[2px] w-12 bg-brand-accent shadow-[0_0_15px_rgba(177,255,65,0.8)]"></div>
                 <span className="text-brand-accent text-sm font-black tracking-[0.4em] uppercase drop-shadow-md">
                  {currentCat ? `SÉLECTION • ${currentCat}` : `À LA UNE • ${featured.category}`}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black italic text-white leading-[0.9] tracking-tighter mb-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {featured.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-200 mb-12 leading-relaxed max-w-2xl italic font-medium drop-shadow-md">
                "{featured.description}"
              </p>
              
              <div className="flex flex-wrap items-center gap-8">
                <Link 
                  to={`/article/${featured.id}`}
                  className="group relative flex items-center gap-6 bg-brand-accent text-black px-12 py-6 rounded-full font-black italic uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(177,255,65,0.4)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-4">
                    Lire l'article
                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Subtle bottom accent line */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent opacity-50"></div>
        </section>
      )}

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div className="flex items-end justify-between border-b border-white/10 pb-10">
              <div>
                <p className="text-brand-accent text-[11px] font-black tracking-[0.3em] uppercase mb-3">
                  {currentCat ? `SÉLECTION • ${currentCat}` : "FLUX PRINCIPAL"}
                </p>
                <h2 className="text-6xl font-black italic text-white tracking-tight leading-none text-outline-solid">
                  {currentCat === 'Équipement' ? "LE MATÉRIEL" : "SUR LE COURT"}
                </h2>
              </div>
              <Link to="/" className="group flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-brand-accent transition-all">
                VOIR TOUT
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-accent group-hover:text-brand-accent transition-all">
                  <ArrowRight size={14} />
                </div>
              </Link>
            </div>
            
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {others.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-[3rem]">
                <p className="text-slate-500 font-bold italic">Aucun article trouvé dans cette catégorie pour le moment.</p>
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 flex flex-col gap-12">
             <div className="bg-brand-card rounded-[3rem] p-10 text-white shadow-2xl border border-white/5 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-4xl font-black italic mb-12 flex items-center gap-4 tracking-tighter">
                    <TrendingUp size={32} className="text-brand-accent animate-bounce" />
                    TRENDING
                  </h3>
                  <div className="space-y-12">
                    {articles.slice(0, 4).map((a, i) => (
                      <Link to={`/article/${a.id}`} key={a.id} className="flex gap-8 group/item cursor-pointer">
                        <span className="text-6xl font-black italic text-white opacity-5 group-hover/item:opacity-20 transition-all font-display">
                          {i + 1}
                        </span>
                        <div className="pt-2">
                          <span className="text-[10px] font-black text-brand-accent/50 uppercase tracking-[0.2em] mb-2 block group-hover/item:text-brand-accent transition-colors">{a.category}</span>
                          <h4 className="text-xl font-black italic group-hover/item:text-brand-accent transition-colors leading-tight tracking-tight">
                            {a.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12 pointer-events-none transition-transform group-hover:scale-110 duration-1000">
                  <Trophy size={280} />
                </div>
             </div>

             <div className="bg-brand-accent rounded-[3rem] p-12 text-black shadow-[0_30px_60px_rgba(177,255,65,0.25)] transform rotate-1 hover:rotate-0 transition-transform duration-500 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-5xl font-black italic tracking-tighter mb-6 leading-none">VIP COURT</h3>
                  <p className="font-black text-sm mb-10 leading-tight opacity-80 uppercase tracking-tighter">
                    ACCÉDEZ AUX ANALYSES DES EXPERTS ET AUX INTERVIEWS EXCLUSIVES.
                  </p>
                  <button className="w-full py-6 bg-black text-white rounded-2xl font-black italic uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] transition-transform shadow-2xl performance-glow">
                    REJOINDRE LE CLUB
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
             </div>
          </aside>
        </div>
      </section>
    </div>
  );
}


