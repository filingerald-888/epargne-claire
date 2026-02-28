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
      'Dormir sans angoisse financière, ça s\u2019organise.',
    body: 'On vous montre comment constituer le filet de sécurité à tisser.',
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
    subtitle: "Dans 20 ans, votre retraite sera ce que vous en faites aujourd'hui.",
    body: "Spoiler : le régime général ne suffira probablement pas.",
    questionTitle: "Concrètement, qu'est-ce que ça veut dire ?",
    explanation:
      <>Anticiper la baisse de revenus à la retraite en construisant <strong>un capital sur le long terme</strong>.</>,
    explanationSecond:
      <><strong>Chaque euro placé aujourd{'\u2019'}hui travaille pour votre avenir.</strong></>,
    keyFigure: {
      figure: '1 000 € → 1 800 €',
      label: 'en 20 ans à 3 % par an',
      description:
        <>Grâce aux <strong>intérêts composés</strong>, votre capital grossit de manière exponentielle avec le temps. Commencer tôt change tout.</>,
      source: 'Simulation à taux constant, hors inflation',
    },
    checklist: {
      title: 'Les étapes essentielles',
      subtitle: 'Un plan progressif pour préparer sereinement votre retraite.',
      steps: [
        {
          title: 'Estimez votre besoin futur',
          description:
            <>Évaluez <strong>l{'\u2019'}écart entre vos revenus actuels et votre pension estimée</strong>. Le site info-retraite.fr vous donne une projection.</>,
        },
        {
          title: 'Commencez le plus tôt possible',
          description:
            <>Même 50 € par mois à 30 ans font une vraie différence. <strong>Le temps est votre meilleur allié.</strong></>,
        },
        {
          title: 'Profitez de l\u2019avantage fiscal du PER',
          description:
            <><strong>Les versements sont déductibles de votre revenu imposable.</strong> Plus votre tranche est élevée, plus l{'\u2019'}économie est importante.</>,
        },
        {
          title: 'Diversifiez vos supports',
          description:
            <>Ne misez pas tout sur un seul produit. <strong>PER + Assurance-vie + PEA</strong> forment un trio complémentaire et flexible.</>,
        },
      ],
    },
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
          <><strong>Dédié à la retraite. Versements déductibles du revenu imposable.</strong> Bloqué jusqu{'\u2019'}à la retraite (sauf exceptions).</>,
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
          <>Enveloppe complémentaire au PER. <strong>Plus souple sur les retraits.</strong> Transmission avantageuse.</>,
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
          <>Investir en actions sur le long terme. <strong>Exonération après 5 ans.</strong> Idéal en complément.</>,
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
  'projets-de-vie': {
    emoji: '🎯',
    title: 'Préparer mes projets de vie',
    colorKey: 'projets',
    heroImage: '/images/hero-objectif-projets.jpg',
    subtitle:
      'Achat immobilier, études des enfants, voyage… chaque projet mérite une stratégie.',
    body: 'Quel horizon ? Quel niveau de risque ? On vous aide à y voir clair.',
    questionTitle: 'Pourquoi anticiper ses projets ?',
    explanation:
      <>Un projet de vie se prépare <strong>plusieurs années à l{'\u2019'}avance</strong>. Épargner régulièrement sur le bon support permet de constituer un capital sans effort brutal, tout en faisant travailler son argent.</>,
    explanationSecond:
      <>Sans anticipation, le recours au crédit devient souvent la seule option — avec <strong>un coût total bien plus élevé</strong> que l{'\u2019'}effort d{'\u2019'}épargne initial.</>,
    keyFigure: {
      figure: '2 à 10 ans',
      label: 'd\u2019horizon selon le projet',
      description:
        <>L{'\u2019'}horizon de placement est <strong>la clé du choix</strong> : plus il est long, plus vous pouvez accepter de risque pour viser un meilleur rendement.</>,
      source: 'Principe fondamental de la gestion patrimoniale',
    },
    checklist: {
      title: 'Les étapes essentielles',
      subtitle: 'Un plan simple pour financer vos projets.',
      steps: [
        {
          title: 'Définissez votre projet',
          description:
            <>Estimez <strong>le montant nécessaire</strong> et la date cible. Plus le projet est précis, plus la stratégie sera efficace.</>,
        },
        {
          title: 'Déterminez votre horizon',
          description:
            <>Moins de 3 ans ? Privilégiez la sécurité. <strong>Plus de 5 ans ? Vous pouvez diversifier</strong> pour viser un meilleur rendement.</>,
        },
        {
          title: 'Choisissez le bon support',
          description:
            <><strong>Assurance-vie pour la souplesse</strong>, PEA pour le long terme en actions, livrets pour la poche sécurisée.</>,
        },
        {
          title: 'Épargnez régulièrement',
          description:
            <>Mettez en place <strong>un versement programmé</strong> : même modeste, la régularité fait la différence grâce aux intérêts composés.</>,
        },
      ],
    },
    leversSubtitle: 'Ce qui caractérise cet objectif.',
    levers: [
      {
        icon: 'target',
        title: 'Objectif daté',
        description: 'Un montant cible et une échéance claire',
      },
      {
        icon: 'trending-up',
        title: 'Rendement adapté',
        description: 'Dosez risque et performance selon l\u2019horizon',
      },
      {
        icon: 'calendar',
        title: 'Épargne programmée',
        description: 'Des versements réguliers pour lisser l\u2019effort',
      },
      {
        icon: 'refresh-cw',
        title: 'Souplesse',
        description: 'Ajustez votre stratégie au fil du temps',
      },
    ],
    productsSubtitle:
      'Explorer les solutions qui correspondent à cet objectif.',
    products: [
      {
        title: 'Assurance-vie',
        description:
          <><strong>Enveloppe polyvalente par excellence.</strong> Fonds euros sécurisé + unités de compte pour dynamiser. Retraits possibles à tout moment.</>,
        image: '/images/hero-assurance-vie-v2.jpg',
        tags: [
          { label: 'Flexible', colorKey: 'flexible' },
          { label: 'Projets', colorKey: 'projets' },
        ],
        href: '/produits/assurance-vie',
      },
      {
        title: 'PEA',
        description:
          <><strong>Idéal pour un horizon de 5 ans ou plus.</strong> Investir en actions européennes avec une fiscalité allégée après 5 ans.</>,
        image: '/images/hero-pea.jpg',
        tags: [
          { label: 'Actions', colorKey: 'actions' },
          { label: 'Long terme', colorKey: 'longterme' },
        ],
        href: '/produits/pea',
      },
      {
        title: 'Livret A (& LDDS)',
        description:
          <><strong>Poche sécurisée de votre projet.</strong> Capital garanti et disponible. Idéal pour la part à court terme ou l{'\u2019'}apport immobilier en attente.</>,
        image: '/images/hero-livret-a.jpg',
        tags: [
          { label: 'Sécuriser', colorKey: 'securiser' },
          { label: 'Garanti', colorKey: 'securiser' },
        ],
        href: '/produits/livret-a-ldds',
      },
    ],
    nextObjectifSlug: 'retraite',
    nextObjectifTitle: 'Préparer ma retraite',
    seo: {
      title: 'Préparer mes projets de vie — EpargneClaire',
      description:
        'Comment épargner pour ses projets de vie : immobilier, études, voyages. Horizon, supports, stratégie. Guide neutre et gratuit.',
    },
  },
  transmission: {
    emoji: '🤝',
    title: 'Transmettre mon patrimoine',
    colorKey: 'transmission',
    heroImage: '/images/hero-objectif-transmission.jpg',
    subtitle:
      'Ce que vous avez mis une vie à construire mérite qu\u2019on y réfléchisse avant le dernier moment.',
    body: 'On vous aide à transmettre sereinement — et sans mauvaise surprise pour vos proches.',
    questionTitle: 'Pourquoi anticiper sa transmission ?',
    explanation:
      <>En France, <strong>les droits de succession peuvent atteindre 45 % en ligne directe</strong>. Anticiper la transmission permet de réduire cette charge et de protéger ses proches selon ses volontés.</>,
    explanationSecond:
      <>Sans préparation, c{'\u2019'}est <strong>la loi qui décide de la répartition</strong> — et la fiscalité peut amputer fortement le patrimoine transmis.</>,
    keyFigure: {
      figure: '152 500 €',
      label: 'exonérés par bénéficiaire',
      description:
        <>L{'\u2019'}assurance-vie permet de transmettre <strong>jusqu{'\u2019'}à 152 500 € par bénéficiaire sans droits de succession</strong> (versements avant 70 ans).</>,
      source: 'Article 990 I du Code général des impôts',
    },
    checklist: {
      title: 'Les étapes essentielles',
      subtitle: 'Un plan clair pour organiser la transmission de votre patrimoine.',
      steps: [
        {
          title: 'Faites le point sur votre patrimoine',
          description:
            <>Listez <strong>tous vos actifs</strong> : immobilier, épargne, assurance-vie, comptes bancaires. C{'\u2019'}est la base de toute stratégie.</>,
        },
        {
          title: 'Rédigez ou mettez à jour vos clauses bénéficiaires',
          description:
            <>La clause bénéficiaire de l{'\u2019'}assurance-vie est <strong>le levier le plus puissant</strong> : elle permet de transmettre hors succession, avec une fiscalité allégée.</>,
        },
        {
          title: 'Utilisez les abattements de donation',
          description:
            <><strong>Chaque parent peut donner 100 000 € par enfant tous les 15 ans</strong> sans droits. Anticiper permet de transmettre progressivement.</>,
        },
        {
          title: 'Consultez un notaire ou un CGP',
          description:
            <>La transmission touche au droit civil et fiscal. <strong>Un professionnel vous aide à optimiser</strong> tout en respectant la réserve héréditaire.</>,
        },
      ],
    },
    leversSubtitle: 'Ce qui caractérise cet objectif.',
    levers: [
      {
        icon: 'heart',
        title: 'Protéger ses proches',
        description: 'Organiser la répartition selon ses volontés',
      },
      {
        icon: 'scale',
        title: 'Fiscalité optimisée',
        description: 'Réduire les droits de succession légalement',
      },
      {
        icon: 'users',
        title: 'Choix des bénéficiaires',
        description: 'Désigner librement qui reçoit quoi',
      },
      {
        icon: 'file-text',
        title: 'Anticipation',
        description: 'Donations et clauses préparées de son vivant',
      },
    ],
    productsSubtitle:
      'Explorer les solutions qui correspondent à cet objectif.',
    products: [
      {
        title: 'Assurance-vie',
        description:
          <><strong>Outil de transmission par excellence.</strong> Abattement de 152 500 € par bénéficiaire. Clause bénéficiaire libre et modifiable à tout moment.</>,
        image: '/images/hero-assurance-vie-v2.jpg',
        tags: [
          { label: 'Transmission', colorKey: 'transmission' },
          { label: 'Flexible', colorKey: 'flexible' },
        ],
        href: '/produits/assurance-vie',
      },
      {
        title: 'PER',
        description:
          <>En cas de décès, le PER est transmis aux bénéficiaires désignés. <strong>Fiscalité avantageuse similaire à l{'\u2019'}assurance-vie</strong> pour les versements avant 70 ans.</>,
        image: '/images/hero-per-v2.jpg',
        tags: [
          { label: 'Retraite', colorKey: 'retraite' },
          { label: 'Transmission', colorKey: 'transmission' },
        ],
        href: '/produits/per',
      },
    ],
    nextObjectifSlug: 'securiser',
    nextObjectifTitle: 'Sécuriser mon quotidien',
    seo: {
      title: 'Transmettre mon patrimoine — EpargneClaire',
      description:
        'Comment organiser la transmission de son patrimoine : assurance-vie, donation, clause bénéficiaire, fiscalité. Guide neutre et gratuit.',
    },
  },
}

/* Placeholder pour les objectifs non encore remplis */
const placeholderObjectifs: { slug: string; title: string }[] = []

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
