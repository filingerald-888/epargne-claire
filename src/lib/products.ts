import type { ComponentType } from 'react'

import type { ProductFrontmatter } from '@/types/product'

export interface ProductModule {
  Content: ComponentType
  frontmatter: ProductFrontmatter
}

const productModules: Record<string, () => Promise<{ default: ComponentType; frontmatter: ProductFrontmatter }>> = {
  'assurance-vie': () => import('@/content/produits/assurance-vie.mdx'),
  'pea': () => import('@/content/produits/pea.mdx'),
  'per': () => import('@/content/produits/per.mdx'),
  'scpi': () => import('@/content/produits/scpi.mdx'),
  'livret-a-ldds': () => import('@/content/produits/livret-a-ldds.mdx'),
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
