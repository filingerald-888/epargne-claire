'use client'

import { useEffect, useRef, useState } from 'react'

import { animate, motion, useInView, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

// 10 000 € investis pendant 8 ans à 7 %/an
const INITIAL = 10_000
const GROSS = 17_182 // 10000 * 1.07^8
const GAINS = GROSS - INITIAL // 7 182 €
const PEA_TAX_RATE = 0.186 // prélèvements sociaux uniquement (après 5 ans)
const CTO_TAX_RATE = 0.314 // PFU 31,4 % (12,8 % IR + 18,6 % PS)
const PEA_TAX = Math.round(GAINS * PEA_TAX_RATE) // 1 336 €
const CTO_TAX = Math.round(GAINS * CTO_TAX_RATE) // 2 255 €
const PEA_NET = GROSS - PEA_TAX // 15 846 €
const CTO_NET = GROSS - CTO_TAX // 14 927 €
const SAVINGS = PEA_NET - CTO_NET // 919 €

function AnimatedAmount({
  target,
  isInView,
  prefersReduced,
  delay = 0.3,
}: {
  target: number
  isInView: boolean
  prefersReduced: boolean | null
  delay?: number
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

interface ColumnProps {
  title: string
  taxLabel: string
  taxRate: string
  taxAmount: number
  netAmount: number
  isInView: boolean
  prefersReduced: boolean | null
  highlighted?: boolean
  barDelay: number
}

function ComparisonColumn({
  title,
  taxLabel,
  taxRate,
  taxAmount,
  netAmount,
  isInView,
  prefersReduced,
  highlighted,
  barDelay,
}: ColumnProps) {
  const barPercent = (netAmount / GROSS) * 100

  return (
    <div
      className={cn(
        'flex-1 rounded-xl border p-5 text-center transition-all duration-300',
        highlighted
          ? 'border-2 border-ep-primary bg-ep-primary/5'
          : 'border-ep-separator bg-white'
      )}
    >
      <h3
        className={cn(
          'text-sm font-bold',
          highlighted ? 'text-ep-primary' : 'text-ep-text-primary'
        )}
      >
        {title}
      </h3>

      {/* Gross */}
      <p className="mt-3 text-xs text-ep-text-muted">Capital brut</p>
      <p className="text-lg font-bold text-ep-text-primary">
        <AnimatedAmount
          target={GROSS}
          isInView={isInView}
          prefersReduced={prefersReduced}
          delay={barDelay}
        />
      </p>

      {/* Tax */}
      <p className="mt-3 text-xs text-ep-text-muted">{taxLabel}</p>
      <p className="text-sm font-semibold text-red-500">
        −<AnimatedAmount
          target={taxAmount}
          isInView={isInView}
          prefersReduced={prefersReduced}
          delay={barDelay + 0.3}
        />
        <span className="ml-1 text-xs font-normal text-ep-text-muted">
          ({taxRate})
        </span>
      </p>

      {/* Bar */}
      <div className="mx-auto mt-4 h-3 max-w-[180px] overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className={cn(
            'h-full rounded-full',
            highlighted
              ? 'bg-gradient-to-r from-ep-primary to-ep-secondary'
              : 'bg-gray-300'
          )}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${barPercent}%` } : { width: '0%' }}
          transition={{
            duration: prefersReduced ? 0 : 0.8,
            ease: 'easeOut',
            delay: prefersReduced ? 0 : barDelay + 0.5,
          }}
        />
      </div>

      {/* Net */}
      <p className="mt-3 text-xs text-ep-text-muted">Vous récupérez</p>
      <p
        className={cn(
          'text-xl font-bold',
          highlighted ? 'text-ep-primary' : 'text-ep-text-primary'
        )}
      >
        <AnimatedAmount
          target={netAmount}
          isInView={isInView}
          prefersReduced={prefersReduced}
          delay={barDelay + 0.6}
        />
      </p>
    </div>
  )
}

export function PeaGrowthSimulator() {
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
          10{'\u00A0'}000{'\u00A0'}€ investis pendant 8 ans
        </p>
        <p className="mt-1 text-sm text-ep-text-muted">
          Rendement moyen de 7{'\u00A0'}% par an
        </p>
      </motion.div>

      {/* Two columns */}
      <motion.div
        variants={itemVariants}
        className="grid gap-4 sm:grid-cols-2"
      >
        <ComparisonColumn
          title="Avec un PEA"
          taxLabel="Cotisations sociales uniquement"
          taxRate="18,6 %"
          taxAmount={PEA_TAX}
          netAmount={PEA_NET}
          isInView={isInView}
          prefersReduced={prefersReduced}
          highlighted
          barDelay={0.3}
        />
        <ComparisonColumn
          title="Avec un compte-titres classique"
          taxLabel="Impôt forfaitaire"
          taxRate="31,4 %"
          taxAmount={CTO_TAX}
          netAmount={CTO_NET}
          isInView={isInView}
          prefersReduced={prefersReduced}
          barDelay={0.5}
        />
      </motion.div>

      {/* Result */}
      <motion.div
        variants={itemVariants}
        className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-white p-4 text-center shadow-sm"
      >
        <p className="text-sm text-ep-text-muted">
          Avec le PEA, vous gardez{' '}
          <strong className="text-ep-primary">
            <AnimatedAmount
              target={SAVINGS}
              isInView={isInView}
              prefersReduced={prefersReduced}
              delay={1}
            />
            {' '}de plus
          </strong>{' '}
          dans votre poche.
        </p>
      </motion.div>
    </motion.div>
  )
}
