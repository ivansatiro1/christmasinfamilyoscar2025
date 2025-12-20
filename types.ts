
export type Screen = 'home' | 'presenter' | 'categories' | 'nominees' | 'winner' | 'speech' | 'credits';

export interface Nominee {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description?: string;
  // Added optional 'work' property to store the nominee's notable project or achievement
  work?: string;
}

export interface AwardCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  nominees: Nominee[];
}
export interface Winners {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  description?: string;
  // Added optional 'work' property for consistency with the Nominee interface
  work?: string;
}
