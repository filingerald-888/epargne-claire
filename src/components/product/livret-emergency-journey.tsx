'use client'

import { useEffect, useRef, useState } from 'react'

import {
  Banknote,
  ClipboardCheck,
  Landmark,
  Shield,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'

import { staggerContainerVariants, fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  ClipboardCheck,
  Banknote,
  Shield,
  TrendingUp,
  Landmark,
}

interface MilestoneData {
  label: string
  capital: number
  event: string
  insight: React.ReactNode
  icon: string
}

const milestones: MilestoneData[] = [
  {
    label: 'Mois 1',
    capital: 200,
    event: 'Sophie ouvre son Livret A',
    insight: (
      <>
        {"Premier versement de "}
        <strong className="text-ep-text-primary">{"200\u00A0€"}</strong>
        {". Simple, gratuit, immédiat. Le compteur démarre."}
      </>
    ),
    icon: 'ClipboardCheck',
  },
  {
    label: 'Mois 3',
    capital: 1000,
    event: "Les premiers 1\u00A0000\u00A0€",
    insight: (
      <>
        {"200\u00A0€/mois + un petit bonus. "}
        <strong className="text-ep-text-primary">Le cap symbolique</strong>
        {" est franchi, la discipline s\u2019installe."}
      </>
    ),
    icon: 'Banknote',
  },
  {
    label: 'Mois 6',
    capital: 3000,
    event: '1 mois de dépenses couvert',
    insight: (
      <>
        {"Sophie dépense environ "}
        <strong className="text-ep-text-primary">{"3\u00A0000\u00A0€/mois"}</strong>
        {". Elle a maintenant un premier filet de sécurité."}
      </>
    ),
    icon: 'Shield',
  },
  {
    label: 'Mois 12',
    capital: 6500,
    event: '2 mois de sécurité',
    insight: (
      <>
        {"Les intérêts s\u2019ajoutent automatiquement. "}
        <strong className="text-ep-text-primary">{"6\u00A0500\u00A0€"}</strong>
        {" sans y penser chaque jour."}
      </>
    ),
    icon: 'TrendingUp',
  },
  {
    label: 'Mois 18',
    capital: 9300,
    event: '3 mois — matelas complet',
    insight: (
      <>
        {"Sophie a "}
        <strong className="text-ep-text-primary">{"9\u00A0300\u00A0€"}</strong>
        {" : elle est sereine. Le matelas est en place, elle peut penser à placer le reste ailleurs."}
      </>
    ),
    icon: 'Landmark',
  },
]

const MAX_CAPITAL = 9300
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

export function LivretEmergencyJourney() {
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

        <div className="relative mx-2 h-1 overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-ep-primary to-ep-secondary"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : { width: '0%' }}
            transition={{ duration: prefersReduced ? 0 : 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </div>

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
                <p className="text-xs font-bold text-ep-text-primary">{m.label}</p>
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
          <div className="absolute bottom-0 left-3 top-0 w-0.5 bg-gray-200">
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
                  <div className="absolute -left-8 top-3 z-10 flex size-6 items-center justify-center rounded-full border border-ep-primary/30 bg-white shadow-sm">
                    {Icon && <Icon className="size-3 text-ep-primary" />}
                  </div>

                  <div className={cn(
                    'rounded-xl border border-ep-separator bg-white p-4 transition-all duration-300',
                    'hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
                  )}>
                    <div className="flex items-baseline justify-between">
                      <p className="text-xs font-medium text-ep-text-muted">{m.label}</p>
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

      <motion.p
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 text-center text-xs text-ep-text-muted"
      >
        {"L\u2019objectif classique : "}
        <strong className="text-ep-text-primary">3 à 6 mois de dépenses courantes</strong>
        {" en réserve. Sophie a choisi 3 mois — à vous de définir votre objectif personnel."}
      </motion.p>
    </div>
  )
}
