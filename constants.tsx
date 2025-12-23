
import { Nominee, AwardCategory } from './types';

// Immagini per gli sfondi delle categorie nella pagina "Categorie"
export const CATEGORY_IMAGES = [
  'img/MulinoBianco.jpg', // Best Parent
  'img/babysitter.jpg', // Best Babysitter
  'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=1000', // Best Christmas Tree
  '/img/atleti.jpg', // Athlete
  'img/bolle.jpg', // Choreographer
];

export const CATEGORY_CHRISTMAS_NOMINEES: Nominee[] = [
  { id: 'c3-1', name: 'Antonietta', category: 'Best Christmas Tree', imageUrl: 'img/Antonietta.jpg' },
  { id: 'c3-2', name: 'Federica', category: 'Best Christmas Tree', imageUrl: 'img/AlberoFede.jpg' },
  { id: 'c3-3', name: 'Marialuisa', category: 'Best Christmas Tree', imageUrl: 'img/MaryAlbero.jpg' },
  { id: 'c3-4', name: 'Valeria', category: 'Best Christmas Tree', imageUrl: 'img/ValeriaAlbero.jpg' }
];

export const CATEGORY_1_NOMINEES: Nominee[] = [
  { id: 'c1-1', name: 'La famiglia del Bosco', category: 'Best Parents', imageUrl: 'img/genitoriBosco.jpg' },
  { id: 'c1-2', name: 'Raffaella ed Emanuele', category: 'Best Parents', imageUrl: 'img/EmaRaffa.jpg' },
  { id: 'c1-3', name: 'I genitori di Mamma ho perso l\'aereo', category: 'Best Parents', imageUrl: 'img/MammaHoPersoAereo.jpg' },
  { id: 'c1-4', name: 'Luca e Federica', category: 'Best Parents', imageUrl: 'img/LucaFede.jpg' }
];

export const CATEGORY_2_NOMINEES: Nominee[] = [
  { id: 'c2-3', name: 'Mrs Doubtfire', category: 'Best Babysitter', imageUrl: 'img/mrs.-doubtfire.jpg' },
  { id: 'c2-2', name: 'Mary Poppins', category: 'Best Babysitter', imageUrl: 'img/Mary_Poppins_screen_2.jpg' },
  { id: 'c2-1', name: 'Nonni e affini', category: 'Best Babysitter', imageUrl: 'img/Nonni.jpg' },
  { id: 'c2-4', name: 'Tata Matilda', category: 'Best Babysitter', imageUrl: 'img/tatamatilda.jpg' }
];

export const CATEGORY_4_NOMINEES: Nominee[] = [
  { id: 'c4-1', name: 'Jannik Sinner', category: 'Athlete of the Year', imageUrl: 'img/SinnerWimbledon.jpg' },
  { id: 'c4-2', name: 'Scott McTominay', category: 'Athlete of the Year', imageUrl: 'img/Scott.jpg' },
  { id: 'c4-3', name: 'Lando Norris', category: 'Athlete of the Year', imageUrl: 'img/Norris.jpg' },
  { id: 'c4-4', name: 'Federica Annunziata', category: 'Athlete of the Year', imageUrl: 'img/LucaFede.jpg' }
];

export const CATEGORIES: AwardCategory[] = [
  {
    id: 'parent',
    title: 'Best Parent',
    description: 'Per la pazienza infinita e l\'amore incondizionato.',
    icon: 'family_restroom',
    nominees: CATEGORY_1_NOMINEES
  },
  {
    id: 'babysitter',
    title: 'Best Babysitter',
    description: 'Il riconoscimento per chi salva le serate (altrui) con creatività, gioco e affidabilità assoluta.',
    icon: 'child_care',
    nominees: CATEGORY_2_NOMINEES
  },
  {
    id: 'christmas',
    title: 'Best Christmas Tree',
    description: 'Per l\'albero più luminoso, creativo e magico delle festività.',
    icon: 'park',
    nominees: CATEGORY_CHRISTMAS_NOMINEES
  },
  {
    id: 'athlete',
    title: 'Athlete of the Year',
    description: 'Velocità, forza e spirito competitivo. Per chi non si ferma mai.',
    icon: 'sports_score',
    nominees: CATEGORY_4_NOMINEES
  },
  {
    id: 'choreographer',
    title: 'Best Choreography',
    description: 'Per chi porta il ritmo in ogni occasione, trasformando il salotto in una pista da ballo.',
    icon: 'music_note',
    nominees: []
  }
];

export const Winners: Nominee[] = [
  {
    id: 'w1',
    name: 'Emanuele e Raffaella',
    category: 'Best Parents',
    imageUrl: 'img/EmaRaffaWinner.jpg',
  },
  {
    id: 'w2',
    name: 'Mauuuuuiiiii',
    category: 'Best Babysitter',
    imageUrl: 'img/gianniAntonellaWinner.jpg',
  },
  {
    id: 'w3',
    name: 'Ivanoooooooo',
    category: 'Best Christmas Tree',
    imageUrl: 'img/ValeriaAlbero.jpg'
  },
  {
    id: 'w4',
    name: 'Federica Annunziata',
    category: 'Athlete of the Year',
    imageUrl: 'img/FedeWinner.jpg',
    work: 'Grinta e Determinazione'
  },
  {
    id: 'w5',
    name: 'Mbrellino',
    category: 'Best Choreography',
    imageUrl: 'img/Mbrellino.jpg',
    work: 'Il Ritmo nel Sangue'
  }
];
