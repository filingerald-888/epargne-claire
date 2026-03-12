export interface Pillar {
  icon: string
  title: string
  description: string
}

export interface ExperienceEntry {
  period: string
  role: string
  company: string
}

export interface SkillCategory {
  title: string
  content: string
}

export const topSkills: string[] = [
  'Pilotage de programmes stratégiques en environnement réglementé',
  'Leadership transverse auprès d\u2019équipes pluridisciplinaires (IT, Métiers, Legal, Produit)',
  'Création de valeur business durable et mesurable',
]

export interface Diploma {
  year: string
  title: string
  institution: string
}

export interface Certification {
  year: string
  title: string
  issuer: string
}

export interface Language {
  name: string
  level: string
  code: string
}

export const pillars: Pillar[] = [
  {
    icon: '📖',
    title: 'Sources publiques',
    description:
      'Tout le contenu provient de sources officielles : AMF, Service-Public, Legifrance.',
  },
  {
    icon: '🚫',
    title: 'Zéro recommandation',
    description:
      "Aucun conseil d'investissement. Aucune recommandation. Juste des faits.",
  },
  {
    icon: '🔓',
    title: 'Open source',
    description:
      'Le code est public. La méthodologie est documentée. Tout est vérifiable.',
  },
  {
    icon: '🤖',
    title: "Construit avec l'IA",
    description:
      'Ce site a été développé entièrement avec des outils de vibe coding IA et la méthode BMAD.',
  },
]

export const notItems = [
  'Un conseiller financier habilité',
  'Un militant anti-finance',
  'Un vendeur de produits',
  'Un expert fiscal ou juridique',
]

export const amItems = [
  'Un épargnant comme vous',
  'Un traducteur du jargon financier',
  "Une personne qui partage ce qu'elle a compris",
]

export const experiences: ExperienceEntry[] = [
  {
    period: 'Depuis avril 2022',
    role: 'Product Manager Senior – Plateforme Santé Digitale',
    company: 'AXA Group',
  },
  {
    period: 'Oct. 2019 – Mars 2022',
    role: 'Product Manager Senior – Plateforme selfcare B2BC',
    company: 'AXA Partners',
  },
  {
    period: 'Avril 2017 – Oct. 2019',
    role: 'Product Manager – Transformation digitale sinistres',
    company: 'Allianz France',
  },
  {
    period: 'Avril 2012 – Mars 2017',
    role: 'Product Manager – Appli mobile / Engagement client',
    company: 'Allianz France',
  },
]

export const skills: SkillCategory[] = [
  {
    title: 'Transformation digitale et programme delivery',
    content: '',
  },
  {
    title: 'Leadership exécutif et gouvernance',
    content: '',
  },
  {
    title: 'Excellence opérationnelle et impact',
    content: '',
  },
  {
    title: 'Expertise secteur et réglementaire',
    content: '',
  },
]

export const diplomas: Diploma[] = [
  {
    year: '2006 – 2007',
    title: "Master 2 Technologies de l'Information et de la Communication",
    institution: 'Université de Cergy-Pontoise',
  },
  {
    year: '2003 – 2006',
    title: 'Master e-Business',
    institution: 'École Sup. de Commerce IDRAC Paris',
  },
  {
    year: '2001 – 2003',
    title: 'IUT Techniques de Commercialisation',
    institution: 'Université de Versailles-Saint-Quentin',
  },
]

export const certifications: Certification[] = [
  {
    year: '2026',
    title: 'PM – Noé Product School',
    issuer: 'Product Management',
  },
  {
    year: '2025',
    title: 'AI for Business – ESCP Business School',
    issuer: 'Intelligence Artificielle – IA',
  },
  {
    year: '',
    title: 'SAFe PO/PM',
    issuer: 'Gestion de projets agile',
  },
]

export const languages: Language[] = [
  { name: 'Français', level: 'Natif (C2)', code: 'fr' },
  { name: 'Anglais', level: 'Courant (C1)', code: 'en' },
  { name: 'Espagnol', level: 'Intermédiaire (B1)', code: 'es' },
]
