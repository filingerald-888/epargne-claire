'use client'

import { useRef } from 'react'

import { motion, useInView, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

interface TaxColumn {
  title: string
  grossAmount: string
  taxLabel: string
  netAmount: string
  netValue: number
  highlighted?: boolean
  badge?: string
  dimmed?: boolean
}

const columns: TaxColumn[] = [
  {
    title: 'Livret A',
    grossAmount: '150 € brut',
    taxLabel: 'Aucun impôt ni cotisation',
    netAmount: '150 € net',
    netValue: 150,
    highlighted: true,
    badge: 'Vous gardez tout',
  },
  {
    title: 'Livret bancaire ordinaire',
    grossAmount: '150 € brut',
    taxLabel: '\u221247 € de prélèvement forfaitaire (31,4 %)',
    netAmount: '103 € net',
    netValue: 103,
  },
  {
    title: 'Compte courant',
    grossAmount: '0 €',
    taxLabel: 'Aucune rémunération',
    netAmount: '0 €',
    netValue: 0,
    dimmed: true,
  },
]

const MAX_NET = 150
const MAX_BAR_HEIGHT = 80

export function LivretTaxComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="mx-auto mt-10 max-w-3xl"
    >
      <motion.div variants={itemVariants} className="mb-6 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-ep-text-muted">
          {"Comparaison sur 10\u00A0000\u00A0€ placés à 1,5\u00A0% pendant 1 an"}
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        {columns.map((col, i) => {
          const barHeight = col.netValue === 0 ? 4 : (col.netValue / MAX_NET) * MAX_BAR_HEIGHT

          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className={cn(
                'rounded-xl border p-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
                col.highlighted
                  ? 'border-2 border-emerald-300 bg-emerald-50/50'
                  : col.dimmed
                    ? 'border-ep-separator bg-gray-50'
                    : 'border-ep-separator bg-white'
              )}
            >
              <h3 className={cn(
                'text-sm font-bold',
                col.dimmed ? 'text-ep-text-muted' : 'text-ep-text-primary'
              )}>
                {col.title}
              </h3>

              <div className="mx-auto my-4 flex items-end justify-center" style={{ height: MAX_BAR_HEIGHT + 8 }}>
                <motion.div
                  className={cn(
                    'w-12 rounded-t-lg',
                    col.highlighted
                      ? 'bg-gradient-to-t from-emerald-500 to-emerald-400'
                      : col.dimmed
                        ? 'bg-gray-200'
                        : 'bg-amber-400'
                  )}
                  initial={{ height: 0 }}
                  animate={isInView ? { height: barHeight } : { height: 0 }}
                  transition={{
                    duration: prefersReduced ? 0 : 0.8,
                    ease: 'easeOut',
                    delay: prefersReduced ? 0 : 0.3 + i * 0.15,
                  }}
                />
              </div>

              <p className={cn(
                'text-xl font-bold',
                col.highlighted ? 'text-emerald-600' : col.dimmed ? 'text-gray-400' : 'text-ep-text-primary'
              )}>
                {col.netAmount}
              </p>

              {col.badge && (
                <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  {col.badge}
                </span>
              )}

              <p className={cn(
                'mt-2 text-xs leading-relaxed',
                col.dimmed ? 'text-gray-400' : 'text-ep-text-muted'
              )}>
                {col.taxLabel}
              </p>
            </motion.div>
          )
        })}
      </div>

      <motion.p
        variants={itemVariants}
        className="mt-6 text-center text-sm text-ep-text-muted"
      >
        {"Sur un Livret\u00A0A, chaque euro d\u2019intérêt est un euro dans votre poche. "}
        <strong className="text-ep-text-primary">Pas d'impôt, pas de charges sociales.</strong>
      </motion.p>
    </motion.div>
  )
}
