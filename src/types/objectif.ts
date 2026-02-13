export interface ObjectifFrontmatter {
  title: string
  slug: string
  subtitle: string
  couleur: string
  leviers: string[]
  produitsAssocies: string[]
  seo: { title: string; description: string }
}

export interface Objectif extends ObjectifFrontmatter {
  content: string
}
