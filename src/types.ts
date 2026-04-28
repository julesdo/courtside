export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: 'Actualités' | 'Tournois' | 'Classement' | 'Équipement' | 'Analyse' | 'Lifestyle' | 'Innovation' | 'Environnement' | 'Mental' | 'Société' | 'Portrait';
}
