import type { Metadata } from 'next'

import { ReadingTime } from '@/components/content/reading-time'
import { TableOfContents } from '@/components/content/table-of-contents'
import { getProduct, getAllProductSlugs, getPlaceholderTitle } from '@/lib/products'
import { cn } from '@/lib/utils'

const PRODUCT_SECTIONS = [
  { id: 'c-est-quoi', label: "C'est quoi ?" },
  { id: 'comment-ca-marche', label: 'Comment ça marche ?' },
  { id: 'pour-qui', label: 'Pour qui ?' },
  { id: 'avantages', label: 'Avantages' },
  { id: 'inconvenients', label: 'Inconvénients' },
  { id: 'frais', label: 'Frais' },
  { id: 'fiscalite', label: 'Fiscalité' },
  { id: 'exemple-concret', label: 'Exemple concret' },
  { id: 'objectifs-associes', label: 'Objectifs associés' },
  { id: 'faq', label: 'FAQ' },
  { id: 'sources', label: 'Sources' },
]

const objectifColors: Record<string, { bg: string; text: string; label: string }> = {
  securiser: { bg: 'bg-securiser-bg', text: 'text-securiser-text', label: 'Sécuriser' },
  'projets-de-vie': { bg: 'bg-projets-bg', text: 'text-projets-text', label: 'Projets de vie' },
  retraite: { bg: 'bg-retraite-bg', text: 'text-retraite-text', label: 'Retraite' },
  transmission: { bg: 'bg-transmission-bg', text: 'text-transmission-text', label: 'Transmission' },
}

function formatDateFR(isoDate: string): string {
  const date = new Date(isoDate + 'T12:00:00')
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

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
  return {
    title: product.frontmatter.seo.title,
    description: product.frontmatter.seo.description,
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

  return (
    <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
      {/* Sidebar TOC — desktop sticky */}
      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <TableOfContents sections={PRODUCT_SECTIONS} />
        </div>
      </aside>

      {/* Contenu principal */}
      <article>
        {/* Mobile TOC */}
        <TableOfContents sections={PRODUCT_SECTIONS} className="mb-8 lg:hidden" />

        {/* En-tête fiche */}
        <header className="mb-8">
          <h1 className="font-sans text-3xl font-bold text-ep-text-primary sm:text-4xl">
            {frontmatter.title}
          </h1>
          <p className="mt-2 font-sans text-lg text-ep-text-muted">
            {frontmatter.subtitle}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <ReadingTime minutes={frontmatter.readingTime} />
            <span className="text-sm text-ep-text-muted">
              Mis à jour le {formatDateFR(frontmatter.lastUpdated)}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {frontmatter.objectifs.map((objectif, index) => {
              const colors = objectifColors[objectif]
              if (!colors) return null
              return (
                <span
                  key={objectif}
                  className={cn(
                    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                    colors.bg,
                    colors.text
                  )}
                >
                  {frontmatter.labelCouleur[index] ?? colors.label}
                </span>
              )
            })}
          </div>
        </header>

        {/* Contenu MDX */}
        <div className="prose prose-slate max-w-none prose-headings:font-sans prose-headings:text-ep-text-primary prose-a:text-ep-primary prose-a:hover:text-ep-primary-hover prose-strong:text-ep-text-primary">
          <Content />
        </div>
      </article>
    </div>
  )
}
