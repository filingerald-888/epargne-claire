'use client'

import { Building2, Heart, Home, Layers, Store } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

interface ScpiType {
  icon: LucideIcon
  iconColor: string
  bgColor: string
  title: string
  yield: string
  description: string
}

const types: ScpiType[] = [
  {
    icon: Building2,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
    title: 'Bureaux',
    yield: '4 à 5 %',
    description: 'Immeubles de bureaux loués à des entreprises. Le segment historique des SCPI, avec des baux longs.',
  },
  {
    icon: Store,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-100',
    title: 'Commerces',
    yield: '4 à 5,5 %',
    description: 'Locaux commerciaux, galeries marchandes, retail parks. Des loyers souvent indexés sur le chiffre d\u2019affaires.',
  },
  {
    icon: Home,
    iconColor: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    title: 'Résidentiel',
    yield: '3 à 4 %',
    description: 'Logements loués à des particuliers. Rendement plus faible mais demande locative stable.',
  },
  {
    icon: Heart,
    iconColor: 'text-rose-600',
    bgColor: 'bg-rose-100',
    title: 'Santé & Éducation',
    yield: '4 à 5 %',
    description: 'Cliniques, EHPAD, crèches, universités. Des locataires institutionnels avec des baux très longs.',
  },
  {
    icon: Layers,
    iconColor: 'text-violet-600',
    bgColor: 'bg-violet-100',
    title: 'Diversifiées',
    yield: '4 à 6 %',
    description: 'Un mix de plusieurs types d\u2019actifs. La diversification réduit le risque lié à un seul secteur.',
  },
]

export function ScpiTypeCards() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="mx-auto max-w-4xl"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {types.map((type, i) => {
          const Icon = type.icon
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className={cn(
                'rounded-xl border border-ep-separator bg-white p-5 transition-all duration-300',
                'hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
              )}
            >
              <div className="mb-3 flex items-center gap-3">
                <div className={cn('flex size-10 items-center justify-center rounded-full', type.bgColor)}>
                  <Icon className={cn('size-5', type.iconColor)} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ep-text-primary">{type.title}</h3>
                  <p className="text-xs font-semibold text-ep-primary">{type.yield} /an</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-ep-text-muted">{type.description}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.p
        variants={itemVariants}
        className="mt-6 text-center text-sm text-ep-text-muted"
      >
        Les rendements indiqués sont des <strong className="text-ep-text-primary">moyennes historiques</strong> et ne sont pas garantis.
        La performance passée ne préjuge pas de la performance future.
      </motion.p>
    </motion.div>
  )
}
