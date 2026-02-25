'use client'

import { useRef } from 'react'

import { Home, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
  slideInLeftVariants,
  slideInRightVariants,
  reducedSlideInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

interface ImpactCard {
  icon: LucideIcon
  iconColor: string
  bgColor: string
  barColor: string
  title: string
  subtitle: string
  percentage: number
  description: string
}

const cards: ImpactCard[] = [
  {
    icon: Home,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
    barColor: 'bg-gradient-to-r from-blue-500 to-blue-400',
    title: 'Logement social',
    subtitle: '~60 % de votre épargne Livret A',
    percentage: 60,
    description:
      'Votre argent finance la construction et la rénovation de logements sociaux, via un organisme public (la Caisse des Dépôts).',
  },
  {
    icon: Leaf,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    barColor: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    title: 'Transition écologique & petites entreprises',
    subtitle: 'Votre épargne LDDS',
    percentage: 80,
    description:
      'Votre argent contribue au financement de projets durables et au soutien des petites entreprises françaises.',
  },
]

export function LivretSocialImpact() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  const slideVariants = [
    prefersReduced ? reducedSlideInVariants : slideInLeftVariants,
    prefersReduced ? reducedSlideInVariants : slideInRightVariants,
  ]

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="mx-auto mt-10 max-w-4xl"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={i}
              variants={slideVariants[i]}
              className={cn(
                'rounded-xl border border-ep-separator bg-white p-6 transition-all duration-300',
                'hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
              )}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={cn('flex size-10 items-center justify-center rounded-full', card.bgColor)}>
                  <Icon className={cn('size-5', card.iconColor)} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ep-text-primary">{card.title}</h3>
                  <p className="text-xs text-ep-text-muted">{card.subtitle}</p>
                </div>
              </div>

              <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className={cn('h-full rounded-full', card.barColor)}
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: `${card.percentage}%` } : { width: '0%' }}
                  transition={{
                    duration: prefersReduced ? 0 : 0.8,
                    ease: 'easeOut',
                    delay: prefersReduced ? 0 : 0.4 + i * 0.2,
                  }}
                />
              </div>

              <p className="text-sm leading-relaxed text-ep-text-muted">{card.description}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.p
        variants={itemVariants}
        className="mt-6 text-center text-sm text-ep-text-muted"
      >
        {"Votre épargne ne dort pas — elle "}
        <strong className="text-ep-text-primary">construit des logements</strong>
        {" et "}
        <strong className="text-ep-text-primary">finance la transition écologique</strong>
        {"."}
      </motion.p>
    </motion.div>
  )
}
