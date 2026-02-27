'use client'

import { AlertTriangle, Clock, TrendingDown, Building2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

interface Risk {
  icon: LucideIcon
  title: string
  description: React.ReactNode
  severity: 'high' | 'medium'
}

const risks: Risk[] = [
  {
    icon: TrendingDown,
    title: 'Baisse de la valeur des parts',
    description: (
      <>
        Le prix de la part peut <strong className="text-ep-text-primary">baisser</strong> si le marché immobilier se dégrade. Votre capital n'est pas garanti.
      </>
    ),
    severity: 'high',
  },
  {
    icon: Clock,
    title: 'Liquidité limitée',
    description: (
      <>
        Revendre vos parts peut prendre <strong className="text-ep-text-primary">plusieurs semaines à plusieurs mois</strong>. Ce n'est pas un placement liquide.
      </>
    ),
    severity: 'high',
  },
  {
    icon: Building2,
    title: 'Vacance locative',
    description: (
      <>
        Si des immeubles restent <strong className="text-ep-text-primary">sans locataire</strong>, les loyers distribués diminuent. Le taux d'occupation est un indicateur clé.
      </>
    ),
    severity: 'medium',
  },
  {
    icon: AlertTriangle,
    title: 'Risque de taux d\u2019intérêt',
    description: (
      <>
        Une hausse des taux d'intérêt peut <strong className="text-ep-text-primary">rendre l'immobilier moins attractif</strong> et peser sur la valorisation des parts.
      </>
    ),
    severity: 'medium',
  },
]

export function ScpiRiskGrid() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mx-auto max-w-3xl"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {risks.map((risk, i) => {
          const Icon = risk.icon
          const isHigh = risk.severity === 'high'
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className={cn(
                'rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
                isHigh ? 'border-red-200 bg-red-50/50' : 'border-amber-200 bg-amber-50/50'
              )}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className={cn(
                  'flex size-8 items-center justify-center rounded-full',
                  isHigh ? 'bg-red-100' : 'bg-amber-100'
                )}>
                  <Icon className={cn('size-4', isHigh ? 'text-red-500' : 'text-amber-500')} />
                </div>
                <h3 className="text-sm font-bold text-ep-text-primary">{risk.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-ep-text-muted">{risk.description}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
