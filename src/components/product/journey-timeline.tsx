'use client'

import { useEffect, useRef, useState } from 'react'

import {
  Banknote,
  ClipboardCheck,
  Landmark,
  Scale,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'

import { staggerContainerVariants, fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  ClipboardCheck,
  Banknote,
  Scale,
  Landmark,
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
    capital: 10000,
    event: 'Marie ouvre son contrat',
    insight: (
      <>
        Versement initial de <strong className="text-ep-text-primary">10{'\u00A0'}000{'\u00A0'}€</strong> réparti entre fonds euros et marchés financiers.
      </>
    ),
    icon: 'ClipboardCheck',
  },
  {
    year: 3,
    capital: 20000,
    event: 'Versements réguliers',
    insight: (
      <>
        Marie verse <strong className="text-ep-text-primary">200{'\u00A0'}€/mois</strong>. 17{'\u00A0'}200{'\u00A0'}€ versés au total. Son contrat progresse modestement grâce au fonds euros.
      </>
    ),
    icon: 'Banknote',
  },
  {
    year: 4,
    capital: 18500,
    event: 'Correction des marchés',
    insight: (
      <>
        Les unités de compte baissent de 15{'\u00A0'}%. Son capital <strong className="text-ep-text-primary">passe sous le montant versé</strong>. Le fonds euros amortit une partie de la baisse.
      </>
    ),
    icon: 'Scale',
  },
  {
    year: 8,
    capital: 40000,
    event: 'Le cap des 8 ans',
    insight: (
      <>
        Les marchés ont fini par remonter. Bonus fiscal activé : <strong className="text-ep-text-primary">4{'\u00A0'}600{'\u00A0'}€ de gains retirés par an sans impôt</strong> sur le revenu.
      </>
    ),
    icon: 'Landmark',
  },
  {
    year: 10,
    capital: 50000,
    event: 'Bilan (scénario favorable)',
    insight: (
      <>
        34{'\u00A0'}000{'\u00A0'}€ versés au total. Capital : <strong className="text-ep-text-primary">50{'\u00A0'}000{'\u00A0'}€</strong>. Un scénario positif — mais le résultat aurait pu être différent.
      </>
    ),
    icon: 'TrendingUp',
  },
]

const MAX_CAPITAL = 50000
const MAX_BAR_HEIGHT = 120

function AnimatedCapital({ target, isInView, prefersReduced, delay }: {
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

export function JourneyTimeline() {
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
            transition={{ duration: prefersReduced ? 0 : 1.2, ease: 'easeOut', delay: 0.3 }}
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
                <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-ep-primary/10 transition-all duration-300 group-hover:bg-ep-primary/20 group-hover:scale-110">
                  {Icon && <Icon className="size-4 text-ep-primary" />}
                </div>
                <p className="text-xs font-bold text-ep-text-primary">
                  {m.year === 0 ? 'Départ' : `Année ${m.year}`}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-ep-primary">{m.event}</p>
                <p className="mt-1 text-[11px] leading-snug text-ep-text-muted">{m.insight}</p>
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
        <div className="relative pl-8">
          {/* Vertical line — starts at first icon, ends at last icon */}
          <div className="absolute left-3 top-[15px] bottom-[15px] w-0.5 bg-gray-200">
            <motion.div
              className="w-full rounded-full bg-gradient-to-b from-ep-primary to-ep-secondary"
              initial={{ height: '0%' }}
              animate={isInView ? { height: '100%' } : { height: '0%' }}
              transition={{ duration: prefersReduced ? 0 : 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </div>

          <div className="space-y-6">
            {milestones.map((m, i) => {
              const Icon = iconMap[m.icon]

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Dot on line */}
                  <div className="absolute -left-8 top-3 z-10 flex size-6 items-center justify-center rounded-full border border-ep-primary/30 bg-white shadow-sm">
                    {Icon && <Icon className="size-3 text-ep-primary" />}
                  </div>

                  {/* Card */}
                  <div className={cn(
                    'rounded-xl border border-ep-separator bg-white p-4 transition-all duration-300',
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
                    <p className="mt-1 text-sm font-semibold text-ep-text-primary">{m.event}</p>
                    <p className="mt-0.5 text-xs text-ep-text-muted">{m.insight}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.p
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 text-center text-xs text-ep-text-muted"
      >
        Simulation à titre indicatif basée sur un rendement moyen de 4 %/an (profil mixte fonds euros + UC). Les marchés peuvent
        connaître des baisses prolongées. Les rendements passés ne garantissent pas les résultats futurs.
        Le capital investi en unités de compte n'est pas garanti.
      </motion.p>
    </div>
  )
}
