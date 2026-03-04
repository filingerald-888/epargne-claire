import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.epargne-claire.fr'

const produits = [
  'livret-a-ldds',
  'assurance-vie',
  'pea',
  'per',
  'scpi',
]

const objectifs = [
  'securiser',
  'projets-de-vie',
  'retraite',
  'transmission',
]

const rdv = [
  'questions-a-poser',
  'points-attention',
  'reflexes-cles',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/produits`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/comparer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/glossaire`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/simulateur-fiscal`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const produitPages: MetadataRoute.Sitemap = produits.map((slug) => ({
    url: `${siteUrl}/produits/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const objectifPages: MetadataRoute.Sitemap = objectifs.map((slug) => ({
    url: `${siteUrl}/objectifs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const rdvPages: MetadataRoute.Sitemap = rdv.map((slug) => ({
    url: `${siteUrl}/rdv/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...produitPages, ...objectifPages, ...rdvPages]
}
