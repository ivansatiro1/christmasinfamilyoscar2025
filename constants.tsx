
import { Nominee, AwardCategory } from './types';

export const NOMINEES: Nominee[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    category: 'Miglior Attore',
    work: 'Il Segreto del Lago',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFyiqhM7knswRHr_EulttR3nm8_GrM2oBDmjSFQ6M08gZtWtmY958tVsM-QOHUCizzNYhpRjlVCyCGjI9kqczIbT0-0JJcDALF0vG1qC3Sezkx4tAhxX_Ocxyon2rMQLzabrMz5x5Zty0XS60oSf-V6zZ8Q5M8GgUjmrwSuHABgGB70Os07Y3c_943sDnujCsHewODPZhYleoBx3DYS7t2bbVqxj3fb0CxjEZc_HwG2PiBcdwcrjYkrxhv8osC4evZKR_j_CGrPfI'
  },
  {
    id: '2',
    name: 'Giulia Bianchi',
    category: 'Miglior Attrice',
    work: 'L\'Ultima Alba',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRy2pWSfOtsKNebvS9Vn4Dpoi8W1p2umUbX6up7vvH2ME85y-DRvSJT_Y00fBp_kmOGEUdeMPZGFMbBrKwUOTnI2z6Q1OAi91-2eeCXYSwNpHqGQ0YJR4SNw0mVUOD2ogkz13Ny2vcf7KfaThLiK28Wn6iJB05TgWik3D2DNpyBLaDowrYqLDK1qlLDb1I8G9ZRmDJLu7-uSc89K_iRIRQnJtU8G_2hRVYWGtFKx4fYURrAyd6d2sWMV7R0k4IhPm44MPr_4T407w'
  },
  {
    id: '3',
    name: 'Luca Verdi',
    category: 'Miglior Regia',
    work: 'Oltre il Confine',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw0qNrCYIO1HiqtZcnzQH4EN38VUGNmLppviLjrZf6K_2eBAJ3zmNfaqi-Ey4-zvqDfw9RoUO32s_jdVY0EhZQkJPfGZEcxmwhw9TVTGFHY5GgOXn6yqtf2R_x9n1LKaRTiSF0B4u76sMvupVcb6Fk_mK8GAhIdjmnv0HYE3hf-WLsjDUhmfZFvAkZkjM7LfJwZoHShjOODGiBYaFfMiCmd7HnIfI-49uwoThmrGcwWCrkflg6vOvgFdhi_DsZeJVYfThi6AWbXPU'
  },
  {
    id: '4',
    name: 'Anna Neri',
    category: 'Miglior Fotografia',
    work: 'Luci della Città',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY8sF-M4ryzv4b_0W_2CV8FhPz3p239KAlbLkCDJtfbaVEfIsVAh3Lw-8W0zkzXw8YW5-i57kUXUd_GoBocNnvqX4rcYZJ_JsLAyjVkGvnMolKHVuCqVpfTp6NB1LAqcWAFqjG_jOMa0J1DoALMjp8ASYxAM0HfCufwtWPMGkbPf9aBNxnryu_EpI-3VqboYQhgchVE9lyVo6aiDDIG2XLn1VoOoqEDZnch98CE9mJ3O5KZx0LQox8VipQYRY1WAHeiAlD_hCWMbc'
  },
  {
    id: '5',
    name: 'Cillian Murphy',
    category: 'Best Actor',
    work: 'Oppenheimer',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkNBam5OG8kZQpzOhJ52I79XK6zm2wgW8gldak8rZ9S6bhBxah9bjfLKAz2f7eMXaMpsSz-Nr46dPhEm5CtfJwZM5M3-nVoa2FzIRRH-s8WwBcp9Lx0zWy46LYqbjzJBqces6d7EB7H3Vctbt70OGLmLqiIZjFK54MZGK877dKyaWgGctQyZNE86thdBRvofmghGXPdR5VNa4wApgcZKaEFMBf3S1Fo8BCNNxdFo63GPF-G5TYLIGcmS7McCVVN_BuGlZa3vMFVGY'
  }
];

// Correzione path Categoria 1: Mappatura delle immagini caricate nella cartella img/
export const CATEGORY_1_NOMINEES: Nominee[] = [
  {
    id: 'c1-1',
    name: 'Raffa e Manu',
    category: 'Best Parents',
    work: 'I Pilastri della Famiglia',
    imageUrl: 'blob:https://aistudio.google.com/fa24a99d-d5c0-45fc-8e09-42005f9bfb9a'
  },
  {
    id: 'c1-2',
    name: 'Famiglia Rossi',
    category: 'Best Parents',
    work: 'Insieme nel Bosco',
    imageUrl: 'img/genitoriBosco.jpeg'
  },
  {
    id: 'c1-3',
    name: 'Mamma e Papà',
    category: 'Best Parents',
    work: 'Home Alone Spirit',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIBELazyP6-CBEAfnVawrzH5aIN8vgcWL2HQ&s'
  },
  {
    id: 'c1-4',
    name: 'Luca e Fede',
    category: 'Best Parents',
    work: 'Cuore e Coraggio',
    imageUrl: 'img/LucaFede.jpg'
  }
];

// Categoria 4 (Athlete of the Year), folder 'img'
const CATEGORY_4_NOMINEES: Nominee[] = [
  { ...NOMINEES[0], id: 'c4-1', name: 'Atleta 1', imageUrl: 'img/atleta_1.jpg' },
  { ...NOMINEES[1], id: 'c4-2', name: 'Atleta 2', imageUrl: 'img/atleta_2.jpg' },
  { ...NOMINEES[2], id: 'c4-3', name: 'Atleta 3', imageUrl: 'img/atleta_3.jpg' },
  { ...NOMINEES[3], id: 'c4-4', name: 'Atleta 4', imageUrl: 'img/atleta_4.jpg' }
];

export const CATEGORIES: AwardCategory[] = [
  {
    id: 'parent',
    title: 'Best Parent',
    description: 'Per la pazienza infinita, l\'amore incondizionato e la capacità di risolvere ogni problema con un sorriso.',
    icon: 'family_restroom',
    nominees: CATEGORY_1_NOMINEES
  },
  {
    id: 'babysitter',
    title: 'Best Babysitter',
    description: 'Il riconoscimento per chi salva le serate con creatività, gioco e affidabilità assoluta.',
    icon: 'child_care',
    nominees: NOMINEES.slice(1, 5)
  },
  {
    id: 'revelation',
    title: 'Revelation of the Year',
    description: 'Per chi ha sorpreso tutti con talenti nascosti e progressi incredibili.',
    icon: 'auto_awesome',
    nominees: NOMINEES.slice(0, 4)
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
    title: 'Best Choreographer',
    description: 'Per chi porta il ritmo in ogni occasione, trasformando il salotto in una pista da ballo.',
    icon: 'music_note',
    nominees: NOMINEES.slice(0, 3)
  }
];
