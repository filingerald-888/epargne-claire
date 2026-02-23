import type { Metadata } from 'next'

const objectives = [
  { slug: 'securiser', title: 'Sécuriser mon quotidien' },
  { slug: 'projets-de-vie', title: 'Préparer mes projets de vie' },
  { slug: 'retraite', title: 'Préparer ma retraite' },
  { slug: 'transmission', title: 'Transmettre mon patrimoine' },
]

export const dynamicParams = false

export function generateStaticParams() {
  return objectives.map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const objective = objectives.find((o) => o.slug === slug)
  return {
    title: `${objective?.title ?? 'Objectif'} — EpargneClaire`,
  }
}

export default async function ObjectivePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const objective = objectives.find((o) => o.slug === slug)

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ep-text-primary">
          {objective?.title ?? 'Objectif'}
        </h1>
        <p className="mt-4 text-ep-text-muted">Contenu à venir.</p>
      </div>
    </div>
  )
}
