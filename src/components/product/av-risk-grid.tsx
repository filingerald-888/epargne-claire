'use client'

import { AlertTriangle, BadgePercent, Clock, FileWarning, TrendingDown } from 'lucide-react'
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
    icon: AlertTriangle,
    title: 'Perte en capital (unités de compte)',
    description: (
      <>
        Si vous investissez en unités de compte, <strong className="text-ep-text-primary">votre capital n'est pas garanti</strong>. Sa valeur peut baisser en fonction des marchés. Vous pouvez récupérer moins que ce que vous avez versé.
      </>
    ),
  },
  {
    icon: BadgePercent,
    title: 'Frais élevés',
    description: (
      <>
        Frais sur versement, frais de gestion, frais des fonds… Mal choisis, les frais peuvent <strong className="text-ep-text-primary">grignoter une part importante de vos gains</strong>. Sur 20{'\u00A0'}ans, l'écart entre un bon et un mauvais contrat se chiffre en milliers d'euros.
      </>
    ),
  },
  {
    icon: TrendingDown,
    title: 'Inflation sur le fonds euros',
    description: (
      <>
        Le fonds euros rapporte entre 2 et 3{'\u00A0'}% par an. Si l'inflation est supérieure, <strong className="text-ep-text-primary">votre épargne perd du pouvoir d'achat</strong> malgré un capital garanti en valeur absolue.
      </>
    ),
  },
  {
    icon: FileWarning,
    title: 'Clause bénéficiaire mal rédigée',
    description: (
      <>
        L'avantage transmission de l'assurance-vie repose sur la clause bénéficiaire. <strong className="text-ep-text-primary">Si elle est mal rédigée ou pas mise à jour</strong>, le capital peut ne pas revenir aux personnes souhaitées.
      </>
    ),
  },
  {
    icon: Clock,
    title: 'Mauvaise allocation dans le temps',
    description: (
      <>
        Investir 100{'\u00A0'}% en unités de compte à 60{'\u00A0'}ans, ou 100{'\u00A0'}% en fonds euros à 25{'\u00A0'}ans, c'est <strong className="text-ep-text-primary">ne pas adapter votre risque à votre horizon</strong>. L'allocation doit évoluer avec votre situation.
      </>
    ),
  },
]

export function AvRiskGrid() {
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
