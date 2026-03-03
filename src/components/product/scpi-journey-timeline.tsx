'use client'

import { useEffect, useRef, useState } from 'react'

import {
  Banknote,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  ClipboardCheck,
  Banknote,
  Building2,
  ShieldCheck,
  TrendingUp,
}

interface MilestoneData {
  year: number
  capital: number
  event: string
  insight: React.ReactNode
  icon: string
}

const milestones: MilestoneData[] = [
  {
    year: 0,
    capital: 20000,
    event: 'Nadia investit en SCPI',
    insight: (
      <>
        Premier investissement de <strong className="text-ep-text-primary">20{'\u00A0'}000{'\u00A0'}€</strong> réparti sur 2 SCPI diversifiées. Elle commence à percevoir des loyers trimestriels.
      </>
    ),
    icon: 'ClipboardCheck',
  },
  {
    year: 2,
    capital: 22000,
    event: 'Revenus réguliers',
    insight: (
      <>
        Nadia reçoit environ <strong className="text-ep-text-primary">80{'\u00A0'}€/mois</strong> de revenus. Elle réinvestit ses loyers en achetant de nouvelles parts chaque trimestre.
      </>
    ),
    icon: 'Banknote',
  },
  {
    year: 5,
    capital: 19000,
    event: 'Baisse du marché immobilier',
    insight: (
      <>
        Les taux d'intérêt montent. La valeur de ses parts <strong className="text-ep-text-primary">baisse de 8{'\u00A0'}%</strong>. Mais les loyers continuent d'être versés — à un rythme légèrement réduit.
      </>
    ),
    icon: 'Building2',
  },
  {
    year: 8,
    capital: 28000,
    event: 'Reprise progressive',
    insight: (
      <>
        Le marché se stabilise. Grâce au réinvestissement des loyers, son capital atteint <strong className="text-ep-text-primary">28{'\u00A0'}000{'\u00A0'}€</strong>. Les frais de souscription sont amortis.
      </>
    ),
    icon: 'ShieldCheck',
  },
  {
    year: 10,
    capital: 32000,
    event: 'Bilan (scénario favorable)',
    insight: (
      <>
        20{'\u00A0'}000{'\u00A0'}€ investis. Capital : <strong className="text-ep-text-primary">32{'\u00A0'}000{'\u00A0'}€</strong> (parts + loyers réinvestis). Un scénario positif — mais le résultat aurait pu être différent.
      </>
    ),
    icon: 'TrendingUp',
  },
]

const MAX_CAPITAL = 32000
const MAX_BAR_HEIGHT = 120

function AnimatedCapital({
  target,
  isInView,
  prefersReduced,
  delay,
}: {
  target: number
  isInView: boolean
  prefersReduced: boolean | null
  delay: number
}) {
  const [display, setDisplay] = useState('0 €')

  useEffect(() => {
    if (!isInView) return
    if (prefersReduced) {
      setDisplay(`${target.toLocaleString('fr-FR')} €`)
      return
    }

    const controls = animate(0, target, {
      duration: 1.2,
      ease: 'easeOut',
      delay,
      onUpdate(latest) {
        setDisplay(`${Math.round(latest).toLocaleString('fr-FR')} €`)
      },
      onComplete() {
        setDisplay(`${target.toLocaleString('fr-FR')} €`)
      },
    })

    return () => controls.stop()
  }, [isInView, target, prefersReduced, delay])

  return <span>{display}</span>
}

export function ScpiJourneyTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <div ref={ref} className="mx-auto max-w-4xl">
      {/* Desktop — horizontal */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="hidden md:block"
      >
        {/* Capital bars */}
        <div className="mb-4 flex items-end justify-between px-2">
          {milestones.map((m, i) => {
            const barHeight = (m.capital / MAX_CAPITAL) * MAX_BAR_HEIGHT

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex w-[18%] flex-col items-center"
              >
                <p className="mb-2 text-sm font-bold text-ep-primary">
                  <AnimatedCapital
                    target={m.capital}
                    isInView={isInView}
                    prefersReduced={prefersReduced}
                    delay={i * 0.15}
                  />
                </p>
                <motion.div
                  className="w-12 rounded-t-lg bg-gradient-to-t from-ep-primary to-ep-secondary"
                  initial={{ height: 0 }}
                  animate={isInView ? { height: barHeight } : { height: 0 }}
                  transition={{
                    duration: prefersReduced ? 0 : 0.8,
                    ease: 'easeOut',
                    delay: prefersReduced ? 0 : 0.2 + i * 0.15,
                  }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Timeline line */}
        <div className="relative mx-2 h-1 overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-ep-primary to-ep-secondary"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : { width: '0%' }}
            transition={{
              duration: prefersReduced ? 0 : 1.2,
              ease: 'easeOut',
              delay: 0.3,
            }}
          />
        </div>

        {/* Year circles + events */}
        <div className="mt-4 flex justify-between px-2">
          {milestones.map((m, i) => {
            const Icon = iconMap[m.icon]

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group flex w-[18%] flex-col items-center text-center"
              >
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-ep-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-ep-primary/20">
                  {Icon && <Icon className="size-4 text-ep-primary" />}
                </div>
                <p className="text-xs font-bold text-ep-text-primary">
                  {m.year === 0 ? 'Départ' : `Année ${m.year}`}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-ep-primary">
                  {m.event}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-ep-text-muted">
                  {m.insight}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Mobile — vertical */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="md:hidden"
      >
        {milestones.map((m, i) => {
          const Icon = iconMap[m.icon]
          const isLast = i === milestones.length - 1

          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex gap-3"
            >
              {/* Icon + line segments */}
              <div className="flex flex-col items-center">
                {i === 0 ? (
                  <div className="h-3 shrink-0" />
                ) : (
                  <div className="h-3 w-0.5 shrink-0 bg-gray-200" />
                )}
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-ep-primary/30 bg-white shadow-sm">
                  {Icon && <Icon className="size-3 text-ep-primary" />}
                </div>
                {!isLast && <div className="w-0.5 flex-1 bg-gray-200" />}
              </div>

              {/* Card */}
              <div className={cn(
                'mb-3 flex-1 rounded-xl border border-ep-separator bg-white p-4 transition-all duration-300',
                'hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
              )}>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-medium text-ep-text-muted">
                    {m.year === 0 ? 'Départ' : `Année ${m.year}`}
                  </p>
                  <p className="text-lg font-bold text-ep-primary">
                    <AnimatedCapital
                      target={m.capital}
                      isInView={isInView}
                      prefersReduced={prefersReduced}
                      delay={i * 0.15}
                    />
                  </p>
                </div>
                <p className="mt-1 text-sm font-semibold text-ep-text-primary">
                  {m.event}
                </p>
                <p className="mt-0.5 text-xs text-ep-text-muted">
                  {m.insight}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Disclaimer */}
      <motion.p
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 text-center text-xs text-ep-text-muted"
      >
        Simulation à titre indicatif basée sur un rendement moyen de 4,5{'\u00A0'}%/an. Les marchés immobiliers peuvent
        connaître des baisses prolongées. Les rendements passés ne garantissent pas les résultats futurs.
        Le capital investi en SCPI n'est pas garanti.
      </motion.p>
    </div>
  )
}
