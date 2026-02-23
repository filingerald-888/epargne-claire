import type { ComponentType } from 'react'

import type { ProductFrontmatter } from '@/types/product'

export interface ProductModule {
  Content: ComponentType
  frontmatter: ProductFrontmatter
}

const productModules: Record<string, () => Promise<{ default: ComponentType; frontmatter: ProductFrontmatter }>> = {
  'assurance-vie': () => import('@/content/produits/assurance-vie.mdx'),
}

/** All product slugs (including those without MDX content yet) */
const allSlugs = [
  'assurance-vie',
  'pea',
  'per',
  'scpi',
  'livret-a-ldds',
]

/** Placeholder titles for products without MDX content */
const placeholderTitles: Record<string, string> = {
  pea: "PEA (Plan d'Épargne en Actions)",
  per: "PER (Plan d'Épargne Retraite)",
  scpi: 'SCPI',
  'livret-a-ldds': 'Livret A / LDDS',
}

export async function getProduct(slug: string): Promise<ProductModule | null> {
  const loader = productModules[slug]
  if (!loader) return null
  const mod = await loader()
  return {
    Content: mod.default,
    frontmatter: mod.frontmatter,
  }
}

export function getAllProductSlugs(): string[] {
  return allSlugs
}

export function getPlaceholderTitle(slug: string): string {
  return placeholderTitles[slug] ?? 'Produit'
}
