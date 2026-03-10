import type { Metadata } from 'next'

import { RdvHero } from '@/components/rdv/rdv-hero'
import { JsonLd } from '@/components/seo/json-ld'
import { getRdv, getAllRdvSlugs } from '@/lib/rdv'

const siteUrl = 'https://www.epargne-claire.fr'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllRdvSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const rdv = await getRdv(slug)
  if (!rdv) return { title: 'RDV Conseiller — EpargneClaire' }
  const { seo } = rdv.frontmatter
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `/rdv/${slug}` },
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

export default async function RdvPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const rdv = await getRdv(slug)

  if (!rdv) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ep-text-primary">
            RDV Conseiller
          </h1>
          <p className="mt-4 text-ep-text-muted">Contenu à venir.</p>
        </div>
      </div>
    )
  }

  const { Content, frontmatter } = rdv

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Préparer un rendez-vous', item: `${siteUrl}/rdv/questions-a-poser` },
      { '@type': 'ListItem', position: 3, name: frontmatter.title, item: `${siteUrl}/rdv/${slug}` },
    ],
  }

  return (
    <article>
      <JsonLd schema={breadcrumb} />
      <RdvHero frontmatter={frontmatter} currentSlug={slug} />
      <div id="contenu" className="scroll-mt-24" />
      <Content />
    </article>
  )
}
