'use client'

import { AlertTriangle, Clock, Lock, TrendingDown } from 'lucide-react'
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
    title: 'Risque de marché',
    description: (
      <>
        Si vous investissez en actions via votre PER, <strong className="text-ep-text-primary">le capital n'est pas garanti</strong>. Sa valeur peut baisser, parfois fortement. La gestion pilotée réduit ce risque à l'approche de la retraite, mais ne l'élimine pas.
      </>
    ),
  },
  {
    icon: Lock,
    title: 'Risque de liquidité',
    description: (
      <>
        Votre épargne est <strong className="text-ep-text-primary">bloquée jusqu'à la retraite</strong>, sauf 6 cas légaux de déblocage anticipé. Si vous avez besoin de cet argent pour un projet imprévu, il ne sera pas disponible.
      </>
    ),
  },
  {
    icon: AlertTriangle,
    title: 'Risque fiscal au retrait',
    description: (
      <>
        L'avantage fiscal à l'entrée a une contrepartie : à la sortie, <strong className="text-ep-text-primary">le capital est soumis à l'impôt sur le revenu</strong>. Si votre taux d'imposition ne baisse pas à la retraite, le gain fiscal peut être faible, voire nul.
      </>
    ),
  },
  {
    icon: Clock,
    title: 'Risque de perte d\u2019opportunité',
    description: (
      <>
        L'argent placé sur un PER <strong className="text-ep-text-primary">ne peut pas financer d'autres projets</strong> (achat immobilier locatif, création d'entreprise…). Avant de verser, assurez-vous que votre épargne de précaution et vos projets à moyen terme sont couverts.
      </>
    ),
  },
]

export function PerRiskGrid() {
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
