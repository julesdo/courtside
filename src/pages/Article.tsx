import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import { Share2, ArrowLeft, TrendingUp, Trophy } from 'lucide-react';

export default function Article() {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6">
        <h1 className="text-4xl font-bold">Article not found</h1>
        <Link to="/" className="text-indigo-600 font-bold flex items-center gap-2">
          <ArrowLeft size={20} /> Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* Article Header */}
      <section className="bg-brand-card pt-12 pb-24 border-b-4 border-brand-accent shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black text-brand-accent hover:translate-x-[-4px] transition-all uppercase tracking-widest mb-12">
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
          
          <div className="flex gap-2 mb-6 justify-center">
            <span className="bg-brand-indigo text-white text-[10px] font-bold px-3 py-1 rounded">
              {article.category}
            </span>
            <span className="text-slate-400 text-[10px] font-bold py-1 uppercase tracking-widest">
              Lecture : 6 min
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black italic text-white leading-[0.85] tracking-tighter mb-8">
            {article.title}
          </h1>
          
          <p className="text-xl font-medium text-slate-400 italic leading-relaxed max-w-2xl mx-auto">
            "{article.description}"
          </p>
        </div>
      </section>

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Side (Styled as a large card) */}
          <main className="lg:col-span-2 flex-[2] bg-white text-slate-900 rounded-[3rem] p-8 md:p-16 shadow-2xl">
             <div className="flex items-center justify-between gap-4 mb-12 border-b border-slate-100 pb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center font-black text-indigo-600 text-xl border-2 border-white shadow-lg">
                    {article.author[0]}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-0.5">Auteur</p>
                    <p className="text-lg font-black italic text-slate-900">{article.author}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="p-3 bg-slate-50 rounded-2xl hover:bg-brand-indigo hover:text-white transition-all text-slate-400">
                     <Share2 size={20} />
                   </button>
                </div>
             </div>

             <div className="rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl border-4 border-white">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full object-cover"
                />
             </div>

             <article className="prose prose-slate prose-xl max-w-none prose-headings:font-black prose-headings:italic prose-headings:tracking-tighter prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed prose-blockquote:border-l-8 prose-blockquote:border-brand-accent prose-blockquote:bg-slate-50 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-img:rounded-[2rem]">
               <ReactMarkdown>{article.content}</ReactMarkdown>
             </article>

             {/* Voting & Comments Area (Playseed) */}
             <div className="mt-20 pt-12 border-t-4 border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Communauté & Votes</h3>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Powered by Playseed</span>
                </div>
                <div id="playseed-comments-root" className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2rem] min-h-[300px] flex items-center justify-center text-slate-400 font-bold italic">
                   L'espace dynamique se recharge...
                </div>
             </div>
          </main>

          {/* Sidebar Area */}
          <aside className="flex-1 flex flex-col gap-8">
             <div className="bg-brand-indigo rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <h3 className="text-2xl font-black italic mb-8 relative z-10 flex items-center gap-3">
                  <TrendingUp size={24} className="text-brand-accent" />
                  Top Stories
                </h3>
                <div className="space-y-6 relative z-10">
                   {articles.filter(a => a.id !== id).map(a => (
                     <Link to={`/article/${a.id}`} key={a.id} className="block group/item">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#B1FF41] mb-1">{a.category}</p>
                        <h4 className="font-black text-sm group-hover/item:underline underline-offset-4 leading-tight">{a.title}</h4>
                     </Link>
                   ))}
                </div>
                <Trophy size={140} className="absolute -bottom-10 -right-10 text-white opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
             </div>

             <div className="bg-brand-accent rounded-[2.5rem] p-8 text-black shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest mb-2">Prochain Direct</p>
                <h4 className="text-3xl font-black italic tracking-tighter leading-none mb-2">ALCARAZ vs SINNER</h4>
                <p className="font-bold text-sm mb-6">Demi-Finale • Aujourd'hui 18:00</p>
                <button className="w-full py-4 bg-black text-white rounded-2xl font-black italic uppercase tracking-widest hover:scale-105 transition-transform">
                   Alerte Match
                </button>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
