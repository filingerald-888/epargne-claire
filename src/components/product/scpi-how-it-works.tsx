'use client'

import { ArrowDown, ArrowRight, Building2, Coins, Users, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: Wallet,
    title: 'Vous investissez',
    description: 'Vous achetez des parts de SCPI à partir de quelques centaines d\u2019euros.',
  },
  {
    icon: Building2,
    title: 'La société achète',
    description: 'La SCPI acquiert et gère un parc immobilier (bureaux, commerces, logements\u2026).',
  },
  {
    icon: Users,
    title: 'Les locataires paient',
    description: 'Les locataires versent des loyers chaque mois à la SCPI.',
  },
  {
    icon: Coins,
    title: 'Vous recevez',
    description: 'Vous touchez votre part des loyers, proportionnelle à votre investissement.',
  },
]

export function ScpiHowItWorks() {
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
      {/* Desktop — horizontal */}
      <div className="hidden md:flex md:items-start md:justify-between md:gap-2">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div key={i} variants={itemVariants} className="flex items-start">
              <div className="flex w-40 flex-col items-center text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-ep-primary/10">
                  <Icon className="size-7 text-ep-primary" strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-sm font-bold text-ep-text-primary">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ep-text-muted">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="mt-4 size-5 shrink-0 text-ep-primary/40" />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Mobile — vertical */}
      <div className="flex flex-col items-center gap-1 md:hidden">
        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div key={i} variants={itemVariants} className="flex flex-col items-center">
              <div className="flex w-64 flex-col items-center rounded-xl border border-ep-separator bg-white p-4 text-center shadow-[0_2px_8px_rgb(0,0,0,0.06)]">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-ep-primary/10">
                  <Icon className="size-6 text-ep-primary" strokeWidth={1.5} />
                </div>
                <p className="mt-2 text-sm font-bold text-ep-text-primary">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ep-text-muted">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowDown className="my-1 size-5 text-ep-primary/40" />
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
