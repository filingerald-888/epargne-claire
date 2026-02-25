import type { ComponentType } from 'react'

import type { RdvFrontmatter } from '@/types/rdv'

export interface RdvModule {
  Content: ComponentType
  frontmatter: RdvFrontmatter
}

const rdvModules: Record<
  string,
  () => Promise<{ default: ComponentType; frontmatter: RdvFrontmatter }>
> = {
  'questions-a-poser': () => import('@/content/rdv/questions-a-poser.mdx'),
  'points-attention': () => import('@/content/rdv/points-attention.mdx'),
  'reflexes-cles': () => import('@/content/rdv/reflexes-cles.mdx'),
}

const allSlugs = ['questions-a-poser', 'points-attention', 'reflexes-cles']

export const rdvPages = [
  {
    slug: 'questions-a-poser',
    title: 'Les bonnes questions à poser',
    shortTitle: 'Questions',
  },
  {
    slug: 'points-attention',
    title: "Les points d'attention",
    shortTitle: 'Attention',
  },
  {
    slug: 'reflexes-cles',
    title: 'Les réflexes clés',
    shortTitle: 'Réflexes',
  },
]

export async function getRdv(slug: string): Promise<RdvModule | null> {
  const loader = rdvModules[slug]
  if (!loader) return null
  const mod = await loader()
  return {
    Content: mod.default,
    frontmatter: mod.frontmatter,
  }
}

export function getAllRdvSlugs(): string[] {
  return allSlugs
}
