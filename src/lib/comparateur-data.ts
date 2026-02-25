export interface ProductComparison {
  slug: string
  label: string
  rendement: string
  risque: string
  horizon: string
  fiscalite: string
  liquidite: string
  plafond: string
  transmission: string
  summary: string
  href: string
}

export const products: ProductComparison[] = [
  {
    slug: 'assurance-vie',
    label: 'Assurance-vie',
    rendement: '2 à 8 %',
    risque: 'Variable (fonds euros = garanti, UC = variable)',
    horizon: 'Long (8 ans pour la fiscalité)',
    fiscalite: 'Abattement après 8 ans (4 600 €/an seul, 9 200 €/an couple)',
    liquidite: 'Retrait possible à tout moment (quelques jours de délai)',
    plafond: 'Aucun plafond de versement',
    transmission: '152 500 € exonérés par bénéficiaire (clause bénéficiaire)',
    summary:
      'Plus de souplesse et un cadre fiscal avantageux pour la transmission. Pas de plafond.',
    href: '/produits/assurance-vie',
  },
  {
    slug: 'pea',
    label: 'PEA',
    rendement: '5 à 10 %',
    risque: 'Variable (actions européennes)',
    horizon: 'Moyen/Long (5 ans pour exonération)',
    fiscalite: "Exonéré d'impôt sur les gains après 5 ans (hors prélèvements sociaux)",
    liquidite: 'Retrait possible mais clôture avant 5 ans = perte avantage fiscal',
    plafond: '150 000 € de versements',
    transmission: "Droits de succession classiques (pas d'avantage spécifique)",
    summary:
      'Plus performant pour investir en actions avec exonération fiscale dès 5 ans.',
    href: '/produits/pea',
  },
  {
    slug: 'per',
    label: 'PER',
    rendement: '2 à 8 %',
    risque: 'Variable (fonds euros ou UC selon les supports)',
    horizon: "Très long (bloqué jusqu'à la retraite)",
    fiscalite: 'Versements déductibles du revenu imposable',
    liquidite: "Bloqué jusqu'à la retraite (sauf cas de déblocage anticipé)",
    plafond: 'Aucun plafond de versement',
    transmission: 'Droits de succession classiques',
    summary:
      'Idéal pour préparer la retraite avec un avantage fiscal immédiat sur vos versements.',
    href: '/produits/per',
  },
  {
    slug: 'scpi',
    label: 'SCPI',
    rendement: '4 à 6 %',
    risque: 'Moyen (immobilier)',
    horizon: 'Long (8-10 ans recommandé)',
    fiscalite: 'Revenus fonciers imposables au barème + prélèvements sociaux',
    liquidite: 'Faible (délai de cession de parts)',
    plafond: 'Aucun plafond',
    transmission: 'Droits de succession classiques',
    summary:
      'Investissement immobilier accessible avec rendements réguliers, sans gestion directe.',
    href: '/produits/scpi',
  },
  {
    slug: 'livret-a-ldds',
    label: 'Livret A / LDDS',
    rendement: "3 % (taux fixé par l'État)",
    risque: "Aucun (capital garanti par l'État)",
    horizon: 'Court (disponible à tout moment)',
    fiscalite: "Intérêts totalement exonérés d'impôt et de prélèvements sociaux",
    liquidite: 'Immédiate',
    plafond: '22 950 € (Livret A) + 12 000 € (LDDS)',
    transmission: 'Droits de succession classiques',
    summary:
      'Épargne sécurisée et disponible, idéale pour une réserve de précaution.',
    href: '/produits/livret-a-ldds',
  },
]

export const comparisonAttributes = [
  { key: 'rendement' as const, label: 'Rendement' },
  { key: 'risque' as const, label: 'Risque' },
  { key: 'horizon' as const, label: 'Horizon recommandé' },
  { key: 'fiscalite' as const, label: 'Fiscalité' },
  { key: 'liquidite' as const, label: 'Liquidité' },
  { key: 'plafond' as const, label: 'Plafond' },
  { key: 'transmission' as const, label: 'Transmission' },
]

export const suggestions = [
  { a: 'assurance-vie', b: 'pea', label: 'Ass. vie vs PEA' },
  { a: 'assurance-vie', b: 'per', label: 'Ass. vie vs PER' },
  { a: 'pea', b: 'per', label: 'PEA vs PER' },
  { a: 'per', b: 'scpi', label: 'PER vs SCPI' },
]

export function getProduct(slug: string): ProductComparison | undefined {
  return products.find((p) => p.slug === slug)
}
