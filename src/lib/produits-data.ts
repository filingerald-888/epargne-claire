export interface ProduitObjectifTag {
  label: string
  colorKey: string
}

export interface ProduitMetrics {
  rendement: string
  risque: string
  horizon: string
  liquidite: string
}

export interface ProduitListing {
  slug: string
  title: string
  description: string
  image: string
  tags: ProduitObjectifTag[]
  href: string
  metrics: ProduitMetrics
  comingSoon: boolean
}

export type ObjectifFilterKey = 'tous' | 'securiser' | 'projets' | 'retraite' | 'transmission'

export interface ObjectifFilter {
  key: ObjectifFilterKey
  label: string
}

export const objectifFilters: ObjectifFilter[] = [
  { key: 'tous', label: 'Tous' },
  { key: 'securiser', label: 'Sécuriser' },
  { key: 'projets', label: 'Projets' },
  { key: 'retraite', label: 'Retraite' },
  { key: 'transmission', label: 'Transmission' },
]

export const produitsListing: ProduitListing[] = [
  {
    slug: 'assurance-vie',
    title: 'Assurance-vie',
    description:
      "L'enveloppe la plus populaire en France pour épargner et investir à votre rythme.",
    image: '/images/hero-assurance-vie-v2.jpg',
    tags: [
      { label: 'Sécuriser', colorKey: 'securiser' },
      { label: 'Projets', colorKey: 'projets' },
    ],
    href: '/produits/assurance-vie',
    metrics: {
      rendement: '2 à 8 %',
      risque: 'Variable',
      horizon: '8 ans+',
      liquidite: 'Disponible',
    },
    comingSoon: false,
  },
  {
    slug: 'pea',
    title: 'PEA',
    description:
      "Investissez en actions européennes sans impôt après 5 ans.",
    image: '/images/hero-pea.jpg',
    tags: [{ label: 'Projets', colorKey: 'projets' }],
    href: '/produits/pea',
    metrics: {
      rendement: '5 à 10 %',
      risque: 'Élevé',
      horizon: '5 ans+',
      liquidite: 'Sous conditions',
    },
    comingSoon: false,
  },
  {
    slug: 'per',
    title: 'PER',
    description:
      "Préparez votre retraite avec un avantage fiscal immédiat.",
    image: '/images/hero-per-v2.jpg',
    tags: [
      { label: 'Retraite', colorKey: 'retraite' },
      { label: 'Sécuriser', colorKey: 'securiser' },
    ],
    href: '/produits/per',
    metrics: {
      rendement: '2 à 8 %',
      risque: 'Variable',
      horizon: 'Retraite',
      liquidite: 'Bloqué',
    },
    comingSoon: false,
  },
  {
    slug: 'scpi',
    title: 'SCPI',
    description:
      "Investissez dans l'immobilier collectif sans acheter de bien.",
    image: '/images/hero-scpi.jpg',
    tags: [
      { label: 'Projets', colorKey: 'projets' },
      { label: 'Transmission', colorKey: 'transmission' },
    ],
    href: '/produits/scpi',
    metrics: {
      rendement: '4 à 6 %',
      risque: 'Moyen',
      horizon: '8-10 ans',
      liquidite: 'Faible',
    },
    comingSoon: false,
  },
  {
    slug: 'livret-a-ldds',
    title: 'Livret A / LDDS',
    description:
      "Épargne garantie et disponible à tout moment.",
    image: '/images/hero-livret-a.jpg',
    tags: [{ label: 'Sécuriser', colorKey: 'securiser' }],
    href: '/produits/livret-a-ldds',
    metrics: {
      rendement: '3 %',
      risque: 'Aucun',
      horizon: 'Court terme',
      liquidite: 'Immédiate',
    },
    comingSoon: false,
  },
]

export function filterProduitsByObjectif(
  produits: ProduitListing[],
  filterKey: ObjectifFilterKey
): ProduitListing[] {
  if (filterKey === 'tous') return produits
  return produits.filter((p) =>
    p.tags.some((tag) => tag.colorKey === filterKey)
  )
}
