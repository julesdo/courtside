import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { articles } from '../data/articles';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { Share2, ArrowLeft, TrendingUp, Trophy } from 'lucide-react';

export default function Article() {
  const { id } = useParams();
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const article = articles.find(a => a.id === id);

  useEffect(() => {
    // Reset state on article change
    setIsWidgetLoaded(false);

    const container = document.querySelector('.article-vote');
    
    const checkStatus = () => {
      const container = document.querySelector('.article-vote');
      if (container && (container.querySelector('iframe') || container.querySelector('[data-seed-magic]'))) {
        setIsWidgetLoaded(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkStatus()) return;

    // Re-inject the script to trigger initialization on route change
    const scriptId = 'playseed-script-id';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = "https://www.playseed.io/magic-script.js?clientId=sw_l9hiolulvvxe";
    script.async = true;
    document.body.appendChild(script);

    const observer = new MutationObserver(() => {
      if (checkStatus()) {
        observer.disconnect();
      }
    });

    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }

    // Safety timeout to hide loader if script fails or takes too long
    const timeout = setTimeout(() => {
      setIsWidgetLoaded(true);
    }, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center flex-col gap-10 p-4">
        <div className="w-24 h-24 bg-brand-accent rounded-full flex items-center justify-center text-black shadow-[0_0_50px_rgba(177,255,65,0.3)] animate-pulse">
           <Trophy size={48} strokeWidth={2.5} />
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter mb-4">
            MATCH <span className="text-brand-accent">INTERROMPU</span>
          </h1>
          <p className="text-slate-400 font-bold italic text-lg mb-10 tracking-tight">
            Cet article n'est pas disponible ou a été déplacé.
          </p>
          <Link to="/" className="inline-flex items-center gap-4 bg-brand-accent text-black px-10 py-5 rounded-full font-black italic uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(177,255,65,0.2)]">
            <ArrowLeft size={20} /> RETOUR AU COURT
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* Article Header */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover blur-[2px] scale-110 opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-brand-bg/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-black text-brand-accent hover:gap-4 transition-all uppercase tracking-[0.3em] mb-12 py-2 px-4 rounded-full border border-brand-accent/20 bg-brand-accent/5">
              <ArrowLeft size={16} /> RETOUR À L'ACCUEIL
            </Link>
            
            <div className="flex gap-4 mb-8 justify-center">
              <span className="bg-brand-accent text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(177,255,65,0.4)]">
                {article.category}
              </span>
              <span className="text-white/40 text-[10px] font-black py-1.5 uppercase tracking-[0.2em] px-4 border border-white/10 rounded-full">
                LECTURE • 6 MIN
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black italic text-white leading-[1] tracking-tighter mb-8 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] performance-glow-text">
              {article.title}
            </h1>
            
            <p className="text-lg md:text-xl font-bold text-white/90 italic leading-relaxed max-w-3xl mx-auto border-l-4 border-brand-accent pl-6 py-2 bg-white/5 rounded-r-xl">
              "{article.description}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Side */}
          <main className="lg:col-span-2 flex-[2] bg-brand-card text-slate-200 rounded-[3rem] p-8 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/5">
             <div className="flex flex-wrap items-center justify-between gap-8 mb-16 border-b border-white/5 pb-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center font-black text-black text-2xl border-4 border-brand-bg shadow-xl performance-glow">
                    {article.author[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent mb-1">Rédacteur Expert</p>
                    <p className="text-2xl font-black italic text-white tracking-tight">{article.author}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                   <button className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full hover:bg-brand-accent hover:text-black transition-all text-white/70 font-black text-[10px] uppercase tracking-widest border border-white/10 group">
                     PARTAGER
                     <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
                   </button>
                </div>
             </div>

             <div className="rounded-[3rem] overflow-hidden mb-20 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 group">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-[5s]"
                />
              </div>

             <article className="prose prose-invert prose-xl max-w-none prose-headings:font-black prose-headings:italic prose-headings:tracking-tighter prose-headings:text-white prose-p:text-slate-300 prose-p:font-medium prose-p:leading-relaxed prose-blockquote:border-l-[12px] prose-blockquote:border-brand-accent prose-blockquote:bg-white/5 prose-blockquote:py-10 prose-blockquote:px-12 prose-blockquote:rounded-[2rem] prose-blockquote:italic prose-blockquote:text-white prose-strong:text-brand-accent prose-img:rounded-[3rem] prose-img:border prose-img:border-white/10">
               <ReactMarkdown>{article.content}</ReactMarkdown>
             </article>

             {/* Voting & Comments Area (Playseed) */}
             <div className="mt-24 pt-16 border-t border-white/5">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                    VOTEZ SUR <span className="text-brand-accent">CE MATCH</span>
                  </h3>
                  <span className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase">Powered by Playseed</span>
                </div>
                <div className="article-vote glass-panel rounded-[2.5rem] min-h-[350px] relative overflow-hidden border border-white/10 performance-glow">
                   <div id="playseed-comments-root" className="w-full min-h-[350px]"></div>
                   {!isWidgetLoaded && (
                     <div className="flex flex-col items-center gap-4 bg-brand-card/80 backdrop-blur-sm absolute inset-0 z-10 justify-center">
                       <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
                       <p className="text-slate-400 font-black tracking-widest text-[10px]">INITIALISATION DU COURT...</p>
                     </div>
                   )}
                </div>
             </div>
          </main>

          {/* Sidebar Area */}
          <aside className="flex-1 flex flex-col gap-8">
             <div className="bg-brand-card rounded-[2.5rem] p-8 text-white shadow-2xl border border-white/5 relative overflow-hidden group">
                <h3 className="text-2xl font-black italic mb-10 relative z-10 flex items-center gap-3 tracking-tighter">
                  <TrendingUp size={24} className="text-brand-accent animate-pulse" />
                  À LIRE AUSSI
                </h3>
                <div className="space-y-10 relative z-10">
                   {articles.filter(a => a.id !== id).slice(0, 3).map(a => (
                     <Link to={`/article/${a.id}`} key={a.id} className="block group/item">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent mb-2">{a.category}</p>
                        <h4 className="font-black text-lg italic group-hover/item:text-brand-accent transition-colors leading-tight tracking-tight">{a.title}</h4>
                     </Link>
                   ))}
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <Trophy size={140} />
                </div>
             </div>

             <div className="bg-brand-accent rounded-[2.5rem] p-10 text-black shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">Prochain Direct</p>
                  <h4 className="text-3xl font-black italic tracking-tighter leading-none mb-2">NADAL vs ALCARAZ</h4>
                  <p className="font-black text-xs uppercase tracking-widest mb-10 opacity-60">MASTERS MADRID • DEMAIN 16:00</p>
                  <button className="w-full py-4 bg-black text-white rounded-2xl font-black italic uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-xl">
                    ALERTE MATCH
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
