'use client'

import { Landmark, PiggyBank, RefreshCw, Telescope, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'

const iconMap: Record<string, LucideIcon> = {
  telescope: Telescope,
  'piggy-bank': PiggyBank,
  landmark: Landmark,
  'refresh-cw': RefreshCw,
}

interface Lever {
  icon: string
  title: string
  description: string
}

interface ObjectifLeversProps {
  levers: Lever[]
}

export function ObjectifLevers({ levers }: ObjectifLeversProps) {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {levers.map((lever) => {
        const Icon = iconMap[lever.icon]
        return (
          <motion.div
            key={lever.title}
            variants={itemVariants}
            className="rounded-xl border border-ep-separator bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
          >
            {Icon && (
              <Icon
                className="size-7 text-amber-500"
                strokeWidth={1.5}
                aria-hidden
              />
            )}
            <h3 className="mt-2 text-sm font-bold text-ep-text-primary">
              {lever.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ep-text-muted">
              {lever.description}
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
