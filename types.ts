
export type Screen = 'home' | 'presenter' | 'categories' | 'nominees' | 'winner' | 'speech' | 'credits';

export interface Nominee {
  id: string;
  name: string;
  category: string;
  work: string;
  imageUrl: string;
  description?: string;
}

export interface AwardCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  nominees: Nominee[];
}
