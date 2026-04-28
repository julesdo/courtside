export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: 'ATP' | 'WTA' | 'Grand Slam' | 'Analysis';
}
