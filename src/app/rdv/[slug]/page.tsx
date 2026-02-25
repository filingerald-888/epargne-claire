import type { Metadata } from 'next'

import { RdvHero } from '@/components/rdv/rdv-hero'
import { getRdv, getAllRdvSlugs } from '@/lib/rdv'

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
  return {
    title: rdv.frontmatter.seo.title,
    description: rdv.frontmatter.seo.description,
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

  return (
    <article>
      <RdvHero frontmatter={frontmatter} currentSlug={slug} />
      <div id="contenu" className="scroll-mt-24" />
      <Content />
    </article>
  )
}
