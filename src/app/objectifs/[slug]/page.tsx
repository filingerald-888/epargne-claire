import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductSection } from '@/components/content/product-section'
import { ObjectifClosing } from '@/components/objectif/objectif-closing'
import { ObjectifHero } from '@/components/objectif/objectif-hero'
import { ObjectifLevers } from '@/components/objectif/objectif-levers'
import { ObjectifNav } from '@/components/objectif/objectif-nav'
import { ObjectifProducts } from '@/components/objectif/objectif-products'
import { StrongPhrase } from '@/components/product/strong-phrase'

/* ------------------------------------------------------------------ */
/*  Données statiques par objectif                                     */
/* ------------------------------------------------------------------ */

interface ObjectifData {
  emoji: string
  title: string
  colorKey: string
  subtitle: string
  body: string
  heroImage?: string
  questionTitle: string
  explanation: string
  explanationSecond: string
  leversSubtitle: string
  levers: { icon: string; title: string; description: string }[]
  productsSubtitle: string
  products: {
    title: string
    description: string
    image: string
    tags: { label: string; colorKey: string }[]
    href: string
  }[]
  nextObjectifSlug: string
  nextObjectifTitle: string
  seo: { title: string; description: string }
}

const objectifData: Record<string, ObjectifData> = {
  retraite: {
    emoji: '⏳',
    title: 'Préparer ma retraite',
    colorKey: 'retraite',
    heroImage: '/images/hero-objectif-retraite.jpg',
    subtitle: "Plus vous commencez tôt, plus c'est facile. Mais par quoi commencer ?",
    body: "PER, Assurance-vie, Immobilier : comparez selon votre situation.",
    questionTitle: "Concrètement, qu'est-ce que ça veut dire ?",
    explanation:
      'Anticiper la baisse de revenus à la retraite en construisant un capital sur le long terme.',
    explanationSecond:
      "Chaque euro placé aujourd'hui travaille pour votre avenir.",
    leversSubtitle: 'Ce qui caractérise cet objectif.',
    levers: [
      {
        icon: 'telescope',
        title: 'Horizon très long',
        description: 'Le temps démultiplie les rendements',
      },
      {
        icon: 'piggy-bank',
        title: 'Revenus futurs',
        description: 'Se constituer une rente complémentaire',
      },
      {
        icon: 'landmark',
        title: 'Fiscalité différée',
        description: "Déduire aujourd'hui, payer moins demain",
      },
      {
        icon: 'refresh-cw',
        title: 'Capitalisation',
        description: 'Les intérêts génèrent des intérêts',
      },
    ],
    productsSubtitle:
      'Explorer les solutions qui correspondent à cet objectif.',
    products: [
      {
        title: 'PER',
        description:
          "Dédié à la retraite. Versements déductibles du revenu imposable. Bloqué jusqu'à la retraite (sauf exceptions).",
        image: '/images/hero-per-v2.jpg',
        tags: [
          { label: 'Retraite', colorKey: 'retraite' },
          { label: 'Déductible', colorKey: 'deductible' },
        ],
        href: '/produits/per',
      },
      {
        title: 'Assurance-vie',
        description:
          'Enveloppe complémentaire au PER. Plus souple sur les retraits. Transmission avantageuse.',
        image: '/images/hero-assurance-vie-v2.jpg',
        tags: [
          { label: 'Flexible', colorKey: 'flexible' },
          { label: 'Transmission', colorKey: 'transmission' },
        ],
        href: '/produits/assurance-vie',
      },
      {
        title: 'PEA',
        description:
          'Investir en actions sur le long terme. Exonération après 5 ans. Idéal en complément.',
        image: '/images/hero-per-v2.jpg',
        tags: [
          { label: 'Actions', colorKey: 'actions' },
          { label: 'Long terme', colorKey: 'longterme' },
        ],
        href: '/produits/pea',
      },
    ],
    nextObjectifSlug: 'transmission',
    nextObjectifTitle: 'Transmettre mon patrimoine',
    seo: {
      title: 'Préparer ma retraite — EpargneClaire',
      description:
        'Comprendre comment préparer sa retraite : PER, assurance-vie, capitalisation. Guide neutre et gratuit.',
    },
  },
}

/* Placeholder pour les objectifs non encore remplis */
const placeholderObjectifs = [
  { slug: 'securiser', title: 'Sécuriser mon quotidien' },
  { slug: 'projets-de-vie', title: 'Préparer mes projets de vie' },
  { slug: 'transmission', title: 'Transmettre mon patrimoine' },
]

const allSlugs = ['securiser', 'projets-de-vie', 'retraite', 'transmission']

/* ------------------------------------------------------------------ */
/*  Next.js static generation                                          */
/* ------------------------------------------------------------------ */

export const dynamicParams = false

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = objectifData[slug]
  if (data) {
    return { title: data.seo.title, description: data.seo.description }
  }
  const placeholder = placeholderObjectifs.find((o) => o.slug === slug)
  return { title: `${placeholder?.title ?? 'Objectif'} — EpargneClaire` }
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function ObjectivePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  /* ---------- Objectif avec contenu complet ---------- */
  const data = objectifData[slug]
  if (data) {
    return (
      <>
        {/* O0 — Hero */}
        <ObjectifHero
          emoji={data.emoji}
          title={data.title}
          subtitle={data.subtitle}
          body={data.body}
          colorKey={data.colorKey}
          heroImage={data.heroImage}
        />

        {/* O1 — Compréhension */}
        <section className="py-16 md:py-24">
          <StrongPhrase title={data.questionTitle} />
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <p className="text-lg leading-relaxed text-ep-text-primary">
              {data.explanation}
            </p>
            <p className="text-base leading-relaxed text-ep-text-muted">
              {data.explanationSecond}
            </p>
          </div>
        </section>

        {/* O2 — Leviers clés */}
        <ProductSection background="primary-subtle">
          <StrongPhrase
            title="Les leviers clés"
            subtitle={data.leversSubtitle}
          />
          <ObjectifLevers levers={data.levers} />
        </ProductSection>

        {/* O3 — Produits adaptés */}
        <section className="py-16 md:py-24">
          <StrongPhrase
            title="Les produits adaptés"
            subtitle={data.productsSubtitle}
          />
          <ObjectifProducts products={data.products} />
        </section>

        {/* O4 — Closing */}
        <ObjectifClosing
          nextObjectifSlug={data.nextObjectifSlug}
          nextObjectifTitle={data.nextObjectifTitle}
        />

        {/* Navigation objectifs */}
        <ObjectifNav currentSlug={slug} />
      </>
    )
  }

  /* ---------- Placeholder pour les objectifs à venir ---------- */
  const placeholder = placeholderObjectifs.find((o) => o.slug === slug)
  if (!placeholder) notFound()

  return (
    <>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ep-text-primary">
            {placeholder.title}
          </h1>
          <p className="mt-4 text-ep-text-muted">Contenu à venir.</p>
        </div>
      </div>
      <ObjectifNav currentSlug={slug} />
    </>
  )
}
