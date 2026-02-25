'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

const objectives = [
  { slug: 'securiser', label: 'S\u00E9curiser', colorKey: 'securiser' },
  { slug: 'projets-de-vie', label: 'Projets', colorKey: 'projets' },
  { slug: 'retraite', label: 'Retraite', colorKey: 'retraite' },
  { slug: 'transmission', label: 'Transmettre', colorKey: 'transmission' },
]

const colorStyles: Record<string, { active: string; inactive: string }> = {
  securiser: {
    active: 'bg-securiser-bg text-securiser-text font-semibold shadow-sm',
    inactive: 'text-securiser-text hover:bg-securiser-bg/50',
  },
  projets: {
    active: 'bg-projets-bg text-projets-text font-semibold shadow-sm',
    inactive: 'text-projets-text hover:bg-projets-bg/50',
  },
  retraite: {
    active: 'bg-retraite-bg text-retraite-text font-semibold shadow-sm',
    inactive: 'text-retraite-text hover:bg-retraite-bg/50',
  },
  transmission: {
    active: 'bg-transmission-bg text-transmission-text font-semibold shadow-sm',
    inactive: 'text-transmission-text hover:bg-transmission-bg/50',
  },
}

interface ObjectifNavProps {
  currentSlug: string
}

export function ObjectifNav({ currentSlug }: ObjectifNavProps) {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.nav
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      aria-label="Navigation entre les objectifs"
      className="py-10"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        {objectives.map((obj) => {
          const isActive = obj.slug === currentSlug
          const styles = colorStyles[obj.colorKey]
          return (
            <Link
              key={obj.slug}
              href={`/objectifs/${obj.slug}`}
              className={cn(
                'inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                isActive ? styles.active : styles.inactive
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {obj.label}
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
