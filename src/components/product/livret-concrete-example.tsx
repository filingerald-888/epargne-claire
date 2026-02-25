'use client'

import { useEffect, useRef, useState } from 'react'

import { Banknote, Percent, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { animate, motion, useInView, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

interface ZeroCard {
  icon: LucideIcon
  value: string
  label: string
}

const zeroCards: ZeroCard[] = [
  {
    icon: Shield,
    value: '0 % de risque',
    label: "Capital garanti par l'État français",
  },
  {
    icon: Percent,
    value: "0 € d'impôts",
    label: 'Vous gardez 100 % de vos intérêts',
  },
  {
    icon: Banknote,
    value: '0 € de frais',
    label: "Pas de frais d'entrée, de gestion ni de sortie",
  },
]

function AnimatedAmount({
  target,
  isInView,
  prefersReduced,
}: {
  target: number
  isInView: boolean
  prefersReduced: boolean | null
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
      delay: 0.3,
      onUpdate(latest) {
        setDisplay(`${Math.round(latest).toLocaleString('fr-FR')} €`)
      },
      onComplete() {
        setDisplay(`${target.toLocaleString('fr-FR')} €`)
      },
    })

    return () => controls.stop()
  }, [isInView, target, prefersReduced])

  return <span>{display}</span>
}

export function LivretConcreteExample() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="mx-auto max-w-3xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-ep-text-muted">
          Exemple concret
        </p>
        <p className="mt-1 text-xl font-bold text-ep-text-primary md:text-2xl">
          {"Je place 10\u00A0000\u00A0€ sur un Livret\u00A0A"}
        </p>
      </motion.div>

      {/* Interest bar */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-ep-text-muted">
          <span>Capital initial</span>
          <span className="font-semibold text-ep-text-primary">{"10\u00A0000\u00A0€"}</span>
        </div>
        <div className="relative h-4 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className="absolute inset-y-0 left-0 bg-ep-primary"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '97%' } : { width: '0%' }}
            transition={{ duration: prefersReduced ? 0 : 0.8, ease: 'easeOut', delay: 0.3 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-emerald-400"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '3%' } : { width: '0%' }}
            transition={{ duration: prefersReduced ? 0 : 0.6, ease: 'easeOut', delay: 0.8 }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-ep-text-muted">
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-ep-primary" />
            {"Capital : 10\u00A0000\u00A0€"}
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-emerald-400" />
            {"Intérêts : +"}
            <AnimatedAmount target={300} isInView={isInView} prefersReduced={prefersReduced} />
          </span>
        </div>
      </motion.div>

      {/* Three zero cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {zeroCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className={cn(
                'rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 text-center',
                'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
              )}
            >
              <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-emerald-100">
                <Icon className="size-5 text-emerald-600" />
              </div>
              <p className="text-sm font-bold text-emerald-700">{card.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-ep-text-muted">{card.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Result */}
      <motion.div
        variants={itemVariants}
        className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-white p-4 text-center shadow-sm"
      >
        <p className="text-sm text-ep-text-muted">
          {"Après 1 an : "}
          <strong className="text-emerald-600">{"10\u00A0300\u00A0€"}</strong>
          {" sur votre compte. "}
          <strong className="text-ep-text-primary">{"300\u00A0€ d\u2019intérêts, tout pour vous"}</strong>
          {", sans rien faire."}
        </p>
      </motion.div>
    </motion.div>
  )
}
