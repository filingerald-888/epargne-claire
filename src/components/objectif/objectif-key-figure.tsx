'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface ObjectifKeyFigureProps {
  figure: string
  label: string
  description: ReactNode
  source?: string
  colorKey?: string
}

const accentColors: Record<string, string> = {
  securiser: 'text-emerald-600',
  projets: 'text-blue-600',
  retraite: 'text-amber-600',
  transmission: 'text-purple-600',
}

const bgColors: Record<string, string> = {
  securiser: 'from-emerald-50/80 to-emerald-100/30',
  projets: 'from-blue-50/80 to-blue-100/30',
  retraite: 'from-amber-50/80 to-amber-100/30',
  transmission: 'from-purple-50/80 to-purple-100/30',
}

export function ObjectifKeyFigure({
  figure,
  label,
  description,
  source,
  colorKey = 'securiser',
}: ObjectifKeyFigureProps) {
  const prefersReduced = useReducedMotion()

  return (
    <section className="pb-2 md:pb-4">
      <motion.div
        initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className={`mx-auto max-w-2xl rounded-2xl bg-gradient-to-br ${bgColors[colorKey] ?? bgColors.securiser} px-8 py-10 text-center md:px-12 md:py-14`}
      >
        {/* Big figure */}
        <motion.p
          initial={prefersReduced ? undefined : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className={`text-4xl font-extrabold tracking-tight md:text-5xl ${accentColors[colorKey] ?? accentColors.securiser}`}
        >
          {figure}
        </motion.p>

        {/* Label */}
        <p className="mt-2 text-lg font-semibold text-ep-text-primary md:text-xl">
          {label}
        </p>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ep-text-muted">
          {description}
        </p>

        {/* Source */}
        {source && (
          <p className="mt-4 text-[11px] text-ep-text-muted/60">
            {source}
          </p>
        )}
      </motion.div>
    </section>
  )
}
