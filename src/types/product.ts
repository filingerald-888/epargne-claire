export interface ProductFrontmatter {
  title: string
  slug: string
  subtitle: string
  readingTime: number
  lastUpdated: string
  objectifs: string[]
  labelCouleur: string[]
  disclaimer: string
  heroImage?: string
  seo: { title: string; description: string; ogImage?: string }
}

export interface Product extends ProductFrontmatter {
  content: string
}
