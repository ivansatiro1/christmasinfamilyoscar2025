
import { Nominee, AwardCategory } from './types';

// Immagini per gli sfondi delle categorie nella pagina "Categorie"
export const CATEGORY_IMAGES = [
  'img/MulinoBianco.jpg', // Best Parent
  'img/babysitter.jpg', // Best Babysitter
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000', // Revelation
  '/img/atleti.jpg', // Athlete
  'img/CoreografiaBG.jpg', // Choreographer
];

export const NOMINEES: Nominee[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    category: 'Miglior Attore',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFyiqhM7knswRHr_EulttR3nm8_GrM2oBDmjSFQ6M08gZtWtmY958tVsM-QOHUCizzNYhpRjlVCyCGjI9kqczIbT0-0JJcDALF0vG1qC3Sezkx4tAhxX_Ocxyon2rMQLzabrMz5x5Zty0XS60oSf-V6zZ8Q5M8GgUjmrwSuHABgGB70Os07Y3c_943sDnujCsHewODPZhYleoBx3DYS7t2bbVqxj3fb0CxjEZc_HwG2PiBcdwcrjYkrxhv8osC4evZKR_j_CGrPfI'
  },
  {
    id: '2',
    name: 'Giulia Bianchi',
    category: 'Miglior Attrice',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRy2pWSfOtsKNebvS9Vn4Dpoi8W1p2umUbX6up7vvH2ME85y-DRvSJT_Y00fBp_kmOGEUdeMPZGFMbBrKwUOTnI2z6Q1OAi91-2eeCXYSwNpHqGQ0YJR4SNw0mVUOD2ogkz13Ny2vcf7KfaThLiK28Wn6iJB05TgWik3D2DNpyBLaDowrYqLDK1qlLDb1I8G9ZRmDJLu7-uSc89K_iRIRQnJtU8G_2hRVYWGtFKx4fYURrAyd6d2sWMV7R0k4IhPm44MPr_4T407w'
  }
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
    id: 'revelation',
    title: 'Revelation of the Year',
    description: 'Per chi ha sorpreso tutti con talenti nascosti e progressi incredibili.',
    icon: 'auto_awesome',
    nominees: NOMINEES
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
    title: 'Best Coreografia',
    description: 'Per chi porta il ritmo in ogni occasione, trasformando il salotto in una pista da ballo.',
    icon: 'music_note',
    nominees: [] // Vuoto come richiesto
  }
];

export const Winners: Nominee[] = [
  {
    id: 'w1',
    name: 'Emanuele e Raffaella',
    category: 'Best Parent',
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
    name: 'Luca Verdi',
    category: 'Revelation of the Year',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw0qNrCYIO1HiqtZcnzQH4EN38VUGNmLppviLjrZf6K_2eBAJ3zmNfaqi-Ey4-zvqDfw9RoUO32s_jdVY0EhZQkJPfGZEcxmwhw9TVTGFHY5GgOXn6yqtf2R_x9n1LKaRTiSF0B4u76sMvupVcb6Fk_mK8GAhIdjmnv0HYE3hf-WLsjDUhmfZFvAkZkjM7LfJwZoHShjOODGiBYaFfMiCmd7HnIfI-49uwoThmrGcwWCrkflg6vOvgFdhi_DsZeJVYfThi6AWbXPU',
    work: 'Oltre il Confine'
  },
  {
    id: 'w4',
    name: 'Federica Annunziata',
    category: 'Athlete of the Year',
    imageUrl: 'img/FedeWinner.png',
    work: 'Grinta e Determinazione'
  },
  {
    id: 'w5',
    name: 'Mbrellino',
    category: 'Best Coreografia',
    imageUrl: 'img/Mbrellino.jpg',
    work: 'Il Ritmo nel Sangue'
  }
];
