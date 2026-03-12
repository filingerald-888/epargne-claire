'use client'

import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

import { CarouselSection } from './carousel-section'

const objectifColors: Record<string, { bg: string; text: string }> = {
  securiser: { bg: 'bg-securiser-bg', text: 'text-securiser-text' },
  projets: { bg: 'bg-projets-bg', text: 'text-projets-text' },
  retraite: { bg: 'bg-retraite-bg', text: 'text-retraite-text' },
  transmission: { bg: 'bg-transmission-bg', text: 'text-transmission-text' },
}

interface Produit {
  title: string
  description: string
  image: string
  tags: { label: string; colorKey: string }[]
  href: string
}

const produits: Produit[] = [
  {
    title: 'Assurance-vie',
    description:
      "L'enveloppe la plus populaire en France pour \u00E9pargner et investir \u00E0 votre rythme.",
    image: '/images/hero-assurance-vie-v2.jpg',
    tags: [
      { label: 'S\u00E9curiser', colorKey: 'securiser' },
      { label: 'Projets', colorKey: 'projets' },
    ],
    href: '/produits/assurance-vie',
  },
  {
    title: 'PEA',
    description:
      "Investissez en actions europ\u00E9ennes sans imp\u00F4t sur les gains apr\u00E8s 5 ans.",
    image: '/images/hero-pea.jpg',
    tags: [{ label: 'Projets', colorKey: 'projets' }],
    href: '/produits/pea',
  },
  {
    title: 'PER',
    description:
      "Pr\u00E9parez votre retraite avec un avantage fiscal imm\u00E9diat.",
    image: '/images/hero-per-v2.jpg',
    tags: [
      { label: 'Retraite', colorKey: 'retraite' },
      { label: 'S\u00E9curiser', colorKey: 'securiser' },
    ],
    href: '/produits/per',
  },
  {
    title: 'SCPI',
    description:
      "Investissez dans l'immobilier collectif sans acheter de bien.",
    image: '/images/hero-scpi.jpg',
    tags: [
      { label: 'Projets', colorKey: 'projets' },
      { label: 'Transmission', colorKey: 'transmission' },
    ],
    href: '/produits/scpi',
  },
  {
    title: 'Livret A / LDDS',
    description:
      '\u00C9pargne garantie et disponible \u00E0 tout moment.',
    image: '/images/hero-livret-a.jpg',
    tags: [{ label: 'S\u00E9curiser', colorKey: 'securiser' }],
    href: '/produits/livret-a-ldds',
  },
]

export function ProduitsSection() {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <section id="produits" className="scroll-mt-20 py-16 md:py-24">
      {/* Header */}
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-bold text-ep-text-primary md:text-4xl">
          5 produits, expliqués simplement.
        </h2>
        <p className="mt-3 text-base text-ep-text-muted md:text-lg">
          Pas de jargon. Pas de recommandation. Juste de la clarté.
        </p>
      </motion.div>

      {/* Cards carousel */}
      <CarouselSection itemCount={produits.length} dataAttribute="data-produit">
        {produits.map((produit) => (
          <Link
            key={produit.href}
            href={produit.href}
            data-produit
            className={cn(
              'group flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ep-separator bg-white',
              'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]',
              'sm:w-[300px]'
            )}
          >
            {/* Image */}
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={produit.image}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="300px"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              {/* Title */}
              <h3 className="text-lg font-bold text-ep-text-primary">
                {produit.title}
              </h3>

              {/* Description */}
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ep-text-muted">
                {produit.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {produit.tags.map((tag) => {
                  const tc = objectifColors[tag.colorKey]
                  return (
                    <span
                      key={tag.label}
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        tc?.bg,
                        tc?.text
                      )}
                    >
                      {tag.label}
                    </span>
                  )
                })}
              </div>

              {/* Arrow */}
              <div className="mt-4 flex justify-end">
                <span className="inline-flex size-8 items-center justify-center rounded-full text-gray-700 transition-all duration-200 group-hover:bg-gray-700 group-hover:text-white">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </CarouselSection>
    </section>
  )
}
