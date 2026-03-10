import { ImageResponse } from 'next/og'

import { getProduct, getAllProductSlugs } from '@/lib/products'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  const title = product?.frontmatter.seo.title ?? 'EpargneClaire'
  const description = product?.frontmatter.seo.description ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 20,
          }}
        >
          EpargneClaire — Fiche produit
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 26,
            color: 'rgba(255,255,255,0.7)',
            marginTop: 28,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    ),
    { ...size }
  )
}
