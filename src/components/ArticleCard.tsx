import { Link } from 'react-router-dom';
import { Article } from '../types';
import { Calendar, User, ArrowUpRight } from 'lucide-react';
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
      className="group flex flex-col bg-white overflow-hidden rounded-2xl border border-gray-100 hover:border-indigo-100 transition-all hover:shadow-xl hover:shadow-indigo-50/50"
    >
      <Link to={`/article/${article.id}`} className="relative h-64 overflow-hidden block">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm">
            {article.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {new Date(article.date).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} />
            {article.author}
          </span>
        </div>
        
        <Link to={`/article/${article.id}`} className="group-hover:text-indigo-600 transition-colors">
          <h3 className="text-xl font-display font-medium text-gray-900 leading-tight mb-3">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
          {article.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-50">
          <Link 
            to={`/article/${article.id}`} 
            className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all"
          >
            Read Article
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
