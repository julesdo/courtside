import { Link } from 'react-router-dom';
import { Article } from '../types';
import { Calendar, User, ArrowUpRight, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col bg-brand-card overflow-hidden rounded-[2rem] border border-white/5 hover:border-brand-accent/20 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <Link to={`/article/${article.id}`} className="relative h-72 overflow-hidden block">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-80" />
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-brand-accent text-black text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg">
            {article.category}
          </span>
        </div>
      </Link>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-6 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black mb-6">
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-brand-accent" />
            {new Date(article.date).toLocaleDateString('fr-FR')}
          </span>
          <span className="flex items-center gap-2">
            <User size={14} className="text-brand-accent" />
            {article.author}
          </span>
        </div>
        
        <Link to={`/article/${article.id}`}>
          <h3 className="text-2xl font-black italic text-white leading-tight mb-4 group-hover:text-brand-accent transition-colors tracking-tight">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-8 font-medium">
          {article.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <Link 
            to={`/article/${article.id}`} 
            className="flex items-center gap-2 text-brand-accent font-black italic text-xs uppercase tracking-widest group/btn"
          >
            Découvrir
            <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </Link>
          <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-slate-500 group-hover:border-brand-accent/30 group-hover:text-brand-accent transition-all">
            <Trophy size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
