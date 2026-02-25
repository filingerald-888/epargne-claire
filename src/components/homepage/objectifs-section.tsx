'use client'

import { ArrowRight, PersonStanding, Route, Shield, Target } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

import type { LucideIcon } from 'lucide-react'

interface Objectif {
  icon: LucideIcon
  iconColor: string
  title: string
  colorKey: string
  description: string
  tags: { label: string; colorKey: string }[]
  href: string
}

const objectifColors: Record<string, { bg: string; text: string }> = {
  securiser: { bg: 'bg-securiser-bg', text: 'text-securiser-text' },
  projets: { bg: 'bg-projets-bg', text: 'text-projets-text' },
  retraite: { bg: 'bg-retraite-bg', text: 'text-retraite-text' },
  transmission: { bg: 'bg-transmission-bg', text: 'text-transmission-text' },
}

const objectifs: Objectif[] = [
  {
    icon: Shield,
    iconColor: 'text-emerald-500',
    title: 'S\u00E9curiser mon quotidien',
    colorKey: 'securiser',
    description:
      'Prot\u00E9ger votre argent avec des produits \u00E0 capital garanti et une disponibilit\u00E9 imm\u00E9diate de vos fonds.',
    tags: [
      { label: 'Livret A', colorKey: 'securiser' },
      { label: 'Assurance-vie', colorKey: 'securiser' },
    ],
    href: '/objectifs/securiser',
  },
  {
    icon: Target,
    iconColor: 'text-blue-500',
    title: 'Pr\u00E9parer mes projets',
    colorKey: 'projets',
    description:
      'Financer vos projets de vie \u2014 immobilier, \u00E9tudes, voyages \u2014 avec une \u00E9pargne qui grandit.',
    tags: [
      { label: 'Assurance-vie', colorKey: 'projets' },
      { label: 'PEA', colorKey: 'projets' },
    ],
    href: '/objectifs/projets-de-vie',
  },
  {
    icon: PersonStanding,
    iconColor: 'text-amber-500',
    title: 'Pr\u00E9parer ma retraite',
    colorKey: 'retraite',
    description:
      "Pr\u00E9parer votre retraite en payant moins d'imp\u00F4ts aujourd'hui.",
    tags: [
      { label: 'PER', colorKey: 'retraite' },
      { label: 'Assurance-vie', colorKey: 'retraite' },
    ],
    href: '/objectifs/retraite',
  },
  {
    icon: Route,
    iconColor: 'text-violet-500',
    title: 'Transmettre mon patrimoine',
    colorKey: 'transmission',
    description:
      'Transmettre votre patrimoine \u00E0 vos proches dans les meilleures conditions fiscales.',
    tags: [
      { label: 'Assurance-vie', colorKey: 'transmission' },
      { label: 'SCPI', colorKey: 'transmission' },
    ],
    href: '/objectifs/transmission',
  },
]

export function ObjectifsSection() {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <section
      id="objectifs"
      className="mx-[calc(-50vw+50%)] w-screen scroll-mt-20 bg-ep-bg-blue-subtle py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        {/* Header */}
        <motion.div
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold text-ep-text-primary md:text-4xl">
            Quel est votre objectif&nbsp;?
          </h2>
          <p className="mt-3 text-base text-ep-text-muted md:text-lg">
            4 raisons d&rsquo;épargner. Trouvez la vôtre.
          </p>
        </motion.div>

        {/* Cards grid — 4 cards side by side on desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {objectifs.map((obj) => {
            const Icon = obj.icon
            return (
              <motion.div
                key={obj.href}
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                <Link
                  href={obj.href}
                  className={cn(
                    'group flex h-full flex-col rounded-2xl border border-ep-separator bg-white p-5',
                    'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]'
                  )}
                >
                  {/* Icon */}
                  <Icon
                    className={cn('size-8', obj.iconColor)}
                    strokeWidth={1.5}
                    aria-hidden
                  />

                  {/* Title */}
                  <h3 className="mt-3 text-base font-bold text-ep-text-primary">
                    {obj.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ep-text-muted">
                    {obj.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {obj.tags.map((tag) => {
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
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
