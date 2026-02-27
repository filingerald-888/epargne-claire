import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'

import { ProductSection } from '@/components/content/product-section'
import { ObjectifChecklist } from '@/components/objectif/objectif-checklist'
import { ObjectifClosing } from '@/components/objectif/objectif-closing'
import { ObjectifHero } from '@/components/objectif/objectif-hero'
import { ObjectifKeyFigure } from '@/components/objectif/objectif-key-figure'
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
  explanation: ReactNode
  explanationSecond: ReactNode
  /* Optionnel — chiffre clé impactant (entre compréhension et leviers) */
  keyFigure?: {
    figure: string
    label: string
    description: ReactNode
    source?: string
  }
  /* Optionnel — guide étape par étape (entre compréhension et leviers) */
  checklist?: {
    title: string
    subtitle?: string
    steps: { title: string; description: ReactNode }[]
  }
  leversSubtitle: string
  levers: { icon: string; title: string; description: string }[]
  productsSubtitle: string
  products: {
    title: string
    description: ReactNode
    image: string
    tags: { label: string; colorKey: string }[]
    href: string
  }[]
  nextObjectifSlug: string
  nextObjectifTitle: string
  seo: { title: string; description: string }
}

const objectifData: Record<string, ObjectifData> = {
  securiser: {
    emoji: '🛡️',
    title: 'Sécuriser mon quotidien',
    colorKey: 'securiser',
    heroImage: '/images/hero-objectif-securiser.jpg',
    subtitle:
      'L\u2019épargne de précaution est la première pierre de tout patrimoine.',
    body: 'Combien mettre de côté ? Où placer cet argent ? On vous explique tout.',
    questionTitle: 'Pourquoi une épargne de précaution ?',
    explanation:
      <>La vie réserve des imprévus : perte d{'\u2019'}emploi, réparation urgente, problème de santé. L{'\u2019'}épargne de précaution est <strong>un matelas financier disponible immédiatement, sans risque de perte</strong>, pour faire face sereinement à ces aléas.</>,
    explanationSecond:
      <>Sans ce filet de sécurité, un imprévu peut entraîner <strong>un crédit coûteux</strong> ou <strong>la vente précipitée d{'\u2019'}un placement à perte</strong>.</>,
    keyFigure: {
      figure: '3 à 6 mois',
      label: 'de dépenses courantes',
      description:
        <>C{'\u2019'}est le montant d{'\u2019'}épargne de précaution <strong>généralement recommandé</strong> pour faire face aux imprévus sans stress.</>,
      source: 'Recommandation courante — Banque de France',
    },
    checklist: {
      title: 'Les étapes essentielles',
      subtitle: 'Un plan simple pour constituer votre matelas de sécurité.',
      steps: [
        {
          title: 'Évaluez vos dépenses mensuelles',
          description:
            <>Additionnez loyer, charges, alimentation, transport, abonnements pour connaître <strong>votre budget mensuel</strong>.</>,
        },
        {
          title: 'Fixez votre objectif',
          description:
            <>Multipliez ce montant par <strong>3 (minimum) à 6 (confortable)</strong>. C{'\u2019'}est votre cible d{'\u2019'}épargne de précaution.</>,
        },
        {
          title: 'Automatisez l\u2019épargne',
          description:
            <>Mettez en place <strong>un virement automatique en début de mois</strong> vers votre livret. L{'\u2019'}effort devient invisible.</>,
        },
        {
          title: 'Choisissez le bon support',
          description:
            <><strong>Livret A en priorité</strong> (disponible, garanti, exonéré). Assurance-vie fonds euros en complément une fois le plafond atteint.</>,
        },
      ],
    },
    leversSubtitle: 'Ce qui caractérise cet objectif.',
    levers: [
      {
        icon: 'shield',
        title: 'Capital garanti',
        description: 'Votre argent ne peut pas perdre de valeur',
      },
      {
        icon: 'clock',
        title: 'Disponibilité immédiate',
        description: 'Retirez à tout moment sans pénalité',
      },
      {
        icon: 'banknote',
        title: 'Exonération fiscale',
        description:
          'Les intérêts du Livret A sont nets d\u2019impôts',
      },
      {
        icon: 'lock',
        title: 'Simplicité',
        description:
          'Pas de choix d\u2019investissement, pas de risque à gérer',
      },
    ],
    productsSubtitle:
      'Explorer les solutions qui correspondent à cet objectif.',
    products: [
      {
        title: 'Livret A (& LDDS)',
        description:
          <><strong>Capital garanti, disponible à tout moment.</strong> Taux fixé par l{'\u2019'}État. Exonéré d{'\u2019'}impôts. Idéal comme socle d{'\u2019'}épargne de précaution.</>,
        image: '/images/hero-livret-a.jpg',
        tags: [
          { label: 'Sécuriser', colorKey: 'securiser' },
          { label: 'Garanti', colorKey: 'securiser' },
        ],
        href: '/produits/livret-a-ldds',
      },
      {
        title: 'Assurance-vie (fonds euros)',
        description:
          <><strong>Capital garanti sur le fonds en euros.</strong> Rendement légèrement supérieur aux livrets. Complément idéal une fois les livrets au plafond.</>,
        image: '/images/hero-assurance-vie-v2.jpg',
        tags: [
          { label: 'Flexible', colorKey: 'flexible' },
          { label: 'Sécuriser', colorKey: 'securiser' },
        ],
        href: '/produits/assurance-vie',
      },
    ],
    nextObjectifSlug: 'projets-de-vie',
    nextObjectifTitle: 'Préparer mes projets de vie',
    seo: {
      title: 'Sécuriser mon quotidien — EpargneClaire',
      description:
        'Comment constituer son épargne de précaution : combien mettre de côté, où placer, quels produits. Guide neutre et gratuit.',
    },
  },
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
        <section className="pt-16 pb-8 md:pt-24 md:pb-10">
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

        {/* O1b — Chiffre clé (optionnel) */}
        {data.keyFigure && (
          <ObjectifKeyFigure
            figure={data.keyFigure.figure}
            label={data.keyFigure.label}
            description={data.keyFigure.description}
            source={data.keyFigure.source}
            colorKey={data.colorKey}
          />
        )}

        {/* O1c — Checklist étapes (optionnel) */}
        {data.checklist && (
          <ProductSection background="primary-subtle">
            <StrongPhrase
              title={data.checklist.title}
              subtitle={data.checklist.subtitle}
            />
            <ObjectifChecklist steps={data.checklist.steps} />
          </ProductSection>
        )}

        {/* O2 — Leviers clés */}
        <ProductSection background={data.checklist ? undefined : 'primary-subtle'} compact>
          <StrongPhrase
            title="Les leviers clés"
            subtitle={data.leversSubtitle}
          />
          <ObjectifLevers levers={data.levers} colorKey={data.colorKey} />
        </ProductSection>

        {/* O3 — Produits adaptés */}
        <section className="pt-8 pb-16 md:pt-12 md:pb-24">
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
