import type { Metadata } from 'next'

import { ProductHero } from '@/components/product/product-hero'
import { getProduct, getAllProductSlugs, getPlaceholderTitle } from '@/lib/products'

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
    <article>
      <ProductHero frontmatter={frontmatter} />
      <Content />
    </article>
  )
}
