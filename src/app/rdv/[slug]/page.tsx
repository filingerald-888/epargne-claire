import type { Metadata } from 'next'

const rdvPages = [
  { slug: 'questions-a-poser', title: 'Questions à poser' },
  { slug: 'points-attention', title: "Points d'attention" },
  { slug: 'reflexes-cles', title: 'Réflexes clés' },
]

export const dynamicParams = false

export function generateStaticParams() {
  return rdvPages.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const rdvPage = rdvPages.find((r) => r.slug === slug)
  return {
    title: `${rdvPage?.title ?? 'RDV Conseiller'} — EpargneClaire`,
  }
}

export default async function RdvPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const rdvPage = rdvPages.find((r) => r.slug === slug)

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ep-text-primary">
          {rdvPage?.title ?? 'RDV Conseiller'}
        </h1>
        <p className="mt-4 text-ep-text-muted">Contenu à venir.</p>
      </div>
    </div>
  )
}
