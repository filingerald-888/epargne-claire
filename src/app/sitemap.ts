import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.epargne-claire.fr'

const produits: { slug: string; lastUpdated: string }[] = [
  { slug: 'livret-a-ldds', lastUpdated: '2026-03-02' },
  { slug: 'assurance-vie', lastUpdated: '2026-03-02' },
  { slug: 'pea', lastUpdated: '2026-03-02' },
  { slug: 'per', lastUpdated: '2026-03-02' },
  { slug: 'scpi', lastUpdated: '2026-03-10' },
]

const objectifs = [
  'securiser',
  'projets-de-vie',
  'retraite',
  'transmission',
]

const rdv: { slug: string; lastUpdated: string }[] = [
  { slug: 'questions-a-poser', lastUpdated: '2026-03-02' },
  { slug: 'points-attention', lastUpdated: '2026-03-02' },
  { slug: 'reflexes-cles', lastUpdated: '2026-03-02' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date('2026-03-10'), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/produits`, lastModified: new Date('2026-03-10'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/comparer`, lastModified: new Date('2026-03-10'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/glossaire`, lastModified: new Date('2026-03-10'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/simulateur-fiscal`, lastModified: new Date('2026-03-10'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/a-propos`, lastModified: new Date('2026-03-10'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/mentions-legales`, lastModified: new Date('2026-03-02'), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const produitPages: MetadataRoute.Sitemap = produits.map((p) => ({
    url: `${siteUrl}/produits/${p.slug}`,
    lastModified: new Date(p.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const objectifPages: MetadataRoute.Sitemap = objectifs.map((slug) => ({
    url: `${siteUrl}/objectifs/${slug}`,
    lastModified: new Date('2026-03-02'),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const rdvPages: MetadataRoute.Sitemap = rdv.map((r) => ({
    url: `${siteUrl}/rdv/${r.slug}`,
    lastModified: new Date(r.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...produitPages, ...objectifPages, ...rdvPages]
}
