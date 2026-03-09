'use client'

import { useRef } from 'react'

import { ArrowRight, BarChart3, Landmark, Scale } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: BarChart3,
    title: 'Inflation + taux du marché',
    description: "La formule combine le niveau d\u2019inflation et les taux pratiqués entre les banques.",
  },
  {
    icon: Landmark,
    title: 'La Banque de France calcule',
    description: 'Elle applique la formule officielle et transmet sa recommandation au gouvernement.',
  },
  {
    icon: Scale,
    title: 'Le ministre décide',
    description: "Le ministre de l\u2019Économie fixe le taux final. Il peut s\u2019écarter de la recommandation.",
  },
]

interface RateDataPoint {
  year: string
  rate: number
}

const rateHistory: RateDataPoint[] = [
  { year: '2021', rate: 0.5 },
  { year: '2022', rate: 1.0 },
  { year: '2023', rate: 3.0 },
  { year: '2024', rate: 3.0 },
  { year: '2025', rate: 2.4 },
  { year: '2026', rate: 1.5 },
]

const MAX_RATE = 3.5

export function LivretRateExplainer() {
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
      className="mx-auto max-w-4xl"
    >
      <motion.div variants={itemVariants} className="mb-4 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-ep-text-muted">
          Le mécanisme
        </p>
      </motion.div>

      {/* Desktop: horizontal flow */}
      <div className="hidden md:block">
        <motion.div variants={itemVariants} className="flex items-center justify-between gap-2">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="flex w-[200px] flex-col items-center text-center">
                  <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-ep-primary/10">
                    <Icon className="size-5 text-ep-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-ep-text-primary">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ep-text-muted">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="mb-12 size-5 shrink-0 text-ep-primary/40" />
                )}
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Mobile: vertical flow */}
      <div className="md:hidden">
        <motion.div variants={itemVariants} className="space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i}>
                <div className={cn(
                  'flex items-start gap-3 rounded-xl border border-ep-separator bg-white p-4',
                  'transition-all duration-300 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)]'
                )}>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ep-primary/10">
                    <Icon className="size-4 text-ep-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ep-text-primary">{step.title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-ep-text-muted">{step.description}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowRight className="size-4 rotate-90 text-ep-primary/30" />
                  </div>
                )}
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Historical rates chart */}
      <motion.div variants={itemVariants} className="mt-10">
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-ep-text-muted">
          Évolution du taux
        </p>

        <div className="mx-auto flex max-w-lg items-end justify-between gap-3 px-4" style={{ height: 140 }}>
          {rateHistory.map((point, i) => {
            const barHeight = (point.rate / MAX_RATE) * 110
            const isHighest = point.rate === Math.max(...rateHistory.map((p) => p.rate))

            return (
              <div key={i} className="flex flex-1 flex-col items-center">
                <p className={cn(
                  'mb-1 text-sm font-bold',
                  isHighest ? 'text-ep-primary' : 'text-ep-text-primary'
                )}>
                  {`${point.rate.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}\u00A0%`}
                </p>

                <motion.div
                  className={cn(
                    'w-full max-w-[48px] rounded-t-lg',
                    isHighest
                      ? 'bg-gradient-to-t from-ep-primary to-ep-secondary'
                      : 'bg-ep-primary/20'
                  )}
                  initial={{ height: 0 }}
                  animate={isInView ? { height: barHeight } : { height: 0 }}
                  transition={{
                    duration: prefersReduced ? 0 : 0.8,
                    ease: 'easeOut',
                    delay: prefersReduced ? 0 : 0.2 + i * 0.1,
                  }}
                />

                <p className="mt-2 text-xs text-ep-text-muted">{point.year}</p>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Callout */}
      <motion.p
        variants={itemVariants}
        className="mt-8 text-center text-sm text-ep-text-muted"
      >
        {"Le taux est révisé "}
        <strong className="text-ep-text-primary">deux fois par an</strong>
        {" (1"}
        <sup>er</sup>
        {" février et 1"}
        <sup>er</sup>
        {" août). Quand l\u2019inflation monte, le taux du Livret\u00A0A suit généralement — c\u2019est un mécanisme de "}
        <strong className="text-ep-text-primary">{"protection de votre pouvoir d\u2019achat"}</strong>
        {"."}
      </motion.p>
    </motion.div>
  )
}
