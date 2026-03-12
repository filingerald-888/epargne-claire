'use client'

import { AlertTriangle, BadgePercent, Clock, TrendingDown } from 'lucide-react'
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
    title: "L'inflation peut grignoter vos gains",
    description: (
      <>
        Si l'inflation dépasse le taux du Livret A, <strong className="text-ep-text-primary">votre épargne perd du pouvoir d'achat</strong> malgré un capital garanti en valeur absolue. À 1,5{'\u00A0'}% de taux et 2{'\u00A0'}% d'inflation, vous perdez 0,5{'\u00A0'}% par an en termes réels.
      </>
    ),
  },
  {
    icon: BadgePercent,
    title: 'Rendement limité sur le long terme',
    description: (
      <>
        Le Livret A est conçu pour l'épargne de précaution, <strong className="text-ep-text-primary">pas pour faire fructifier un patrimoine</strong>. Sur 10 ou 20 ans, des placements comme l'assurance-vie ou le PEA offrent un potentiel de rendement bien supérieur.
      </>
    ),
  },
  {
    icon: AlertTriangle,
    title: 'Le plafond peut créer un faux sentiment de sécurité',
    description: (
      <>
        Remplir son Livret A au plafond (22{'\u00A0'}950{'\u00A0'}€) peut sembler rassurant, mais <strong className="text-ep-text-primary">garder trop d'argent sur un livret</strong>, c'est renoncer à des gains potentiels. Au-delà de 3 à 6 mois de dépenses, diversifiez.
      </>
    ),
  },
  {
    icon: Clock,
    title: 'Le calcul des intérêts par quinzaine',
    description: (
      <>
        Les intérêts du Livret A sont calculés <strong className="text-ep-text-primary">par quinzaine</strong>. Un versement le 14 du mois ne produit des intérêts qu'à partir du 16. Un retrait le 17 fait perdre les intérêts de la quinzaine en cours. Pensez à <strong className="text-ep-text-primary">verser en début de quinzaine</strong> et retirer en fin.
      </>
    ),
  },
]

export function LivretRiskGrid() {
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
