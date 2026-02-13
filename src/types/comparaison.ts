export interface Critere {
  label: string
  description?: string
}

export interface ComparisonData {
  criteres: string[]
  produits: Record<string, Record<string, string>>
}
