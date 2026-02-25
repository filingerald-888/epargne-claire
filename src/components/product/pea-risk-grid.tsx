'use client'

import { AlertTriangle, Clock, Target, TrendingDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'

interface RiskItem {
  icon: LucideIcon
  title: string
  description: React.ReactNode
}

const risks: RiskItem[] = [
  {
    icon: TrendingDown,
    title: 'Volatilité',
    description: (
      <>
        La valeur de votre placement peut varier fortement d'un jour à l'autre, ou d'une année à l'autre. <strong className="text-ep-text-primary">Une baisse de 20 à 30{'\u00A0'}% est possible</strong>, même sur des fonds diversifiés.
      </>
    ),
  },
  {
    icon: AlertTriangle,
    title: 'Perte en capital',
    description: (
      <>
        Contrairement au Livret{'\u00A0'}A ou au fonds euros, <strong className="text-ep-text-primary">votre capital n'est pas garanti</strong>. Vous pouvez récupérer moins que ce que vous avez investi, surtout si vous retirez au mauvais moment.
      </>
    ),
  },
  {
    icon: Clock,
    title: 'Mauvais timing',
    description: (
      <>
        Investir juste avant une crise (2008, 2020) peut entraîner une perte temporaire importante. C'est pourquoi <strong className="text-ep-text-primary">un horizon long (5{'\u00A0'}ans minimum) est essentiel</strong> pour absorber les variations.
      </>
    ),
  },
  {
    icon: Target,
    title: 'Risque comportemental',
    description: (
      <>
        La plus grande menace, c'est la panique. Vendre quand les marchés baissent, c'est <strong className="text-ep-text-primary">transformer une perte temporaire en perte définitive</strong>. La discipline et la régularité sont la clé.
      </>
    ),
  },
]

export function PeaRiskGrid() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid gap-4 sm:grid-cols-2 md:gap-6"
    >
      {risks.map((risk, i) => {
        const Icon = risk.icon

        return (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex gap-4 rounded-xl border border-red-200 bg-red-50/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:p-6"
          >
            <div className="shrink-0">
              <Icon className="mt-0.5 size-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-semibold text-ep-text-primary">{risk.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ep-text-muted">
                {risk.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
