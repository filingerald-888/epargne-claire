import type { Metadata } from 'next'

import { ProductHero } from '@/components/product/product-hero'
import { JsonLd } from '@/components/seo/json-ld'
import { getProduct, getAllProductSlugs, getPlaceholderTitle } from '@/lib/products'

const siteUrl = 'https://www.epargne-claire.fr'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) {
    const title = getPlaceholderTitle(slug)
    return { title: `${title} — EpargneClaire` }
  }
  const { seo } = product.frontmatter
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `/produits/${slug}` },
    openGraph: {
      type: 'article',
      title: seo.title,
      description: seo.description,
      locale: 'fr_FR',
      siteName: 'EpargneClaire',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    const title = getPlaceholderTitle(slug)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ep-text-primary">{title}</h1>
          <p className="mt-4 text-ep-text-muted">Contenu à venir.</p>
        </div>
      </div>
    )
  }

  const { Content, frontmatter } = product

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Produits', item: `${siteUrl}/produits` },
      { '@type': 'ListItem', position: 3, name: frontmatter.title, item: `${siteUrl}/produits/${slug}` },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.seo.title,
    description: frontmatter.seo.description,
    dateModified: frontmatter.lastUpdated,
    url: `${siteUrl}/produits/${slug}`,
    inLanguage: 'fr-FR',
    publisher: {
      '@type': 'Organization',
      name: 'EpargneClaire',
      url: siteUrl,
    },
  }

  return (
    <article>
      <JsonLd schema={[breadcrumb, articleSchema]} />
      <ProductHero frontmatter={frontmatter} />
      <div className="h-6 md:h-10" aria-hidden="true" />
      <Content />
    </article>
  )
}
