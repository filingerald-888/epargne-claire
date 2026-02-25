'use client'

import { motion, useReducedMotion } from 'motion/react'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface FeeRow {
  label: string
  online: string
  bank: string
}

interface FeeComparisonProps {
  rows: FeeRow[]
  onlineSubtitle?: string
  bankSubtitle?: string
}

export function FeeComparison({ rows, onlineSubtitle, bankSubtitle }: FeeComparisonProps) {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mt-8 grid gap-6 sm:grid-cols-2"
    >
      {/* Contrat en ligne */}
      <div className="rounded-2xl border border-ep-separator bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:p-8">
        <h3 className="text-lg font-bold text-ep-text-primary">Contrat en ligne</h3>
        <p className="mt-1 text-sm text-ep-text-muted">
          {onlineSubtitle || 'Courtiers sp&eacute;cialis&eacute;s'}
        </p>
        <div className="mt-6 space-y-4">
          {rows.map((row, i) => (
            <div
              key={i}
              className={cn(
                'flex items-baseline justify-between pb-3',
                i < rows.length - 1 && 'border-b border-ep-separator'
              )}
            >
              <span className="text-sm text-ep-text-muted">{row.label}</span>
              <span className="ml-4 shrink-0 text-sm font-semibold text-ep-text-primary">{row.online}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contrat bancaire */}
      <div className="rounded-2xl border border-ep-separator bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:p-8">
        <h3 className="text-lg font-bold text-ep-text-primary">Contrat bancaire</h3>
        <p className="mt-1 text-sm text-ep-text-muted">
          {bankSubtitle || 'Banques traditionnelles'}
        </p>
        <div className="mt-6 space-y-4">
          {rows.map((row, i) => (
            <div
              key={i}
              className={cn(
                'flex items-baseline justify-between pb-3',
                i < rows.length - 1 && 'border-b border-ep-separator'
              )}
            >
              <span className="text-sm text-ep-text-muted">{row.label}</span>
              <span className="ml-4 shrink-0 text-sm font-semibold text-ep-text-primary">{row.bank}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
