import type { Metadata } from 'next'

const products = [
  { slug: 'assurance-vie', title: 'Assurance-vie' },
  { slug: 'pea', title: "PEA (Plan d'Épargne en Actions)" },
  { slug: 'per', title: "PER (Plan d'Épargne Retraite)" },
  { slug: 'scpi', title: 'SCPI' },
  { slug: 'livret-a-ldds', title: 'Livret A / LDDS' },
]

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  return {
    title: `${product?.title ?? 'Produit'} — EpargneClaire`,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ep-text-primary">
          {product?.title ?? 'Produit'}
        </h1>
        <p className="mt-4 text-ep-text-muted">Contenu à venir.</p>
      </div>
    </div>
  )
}
