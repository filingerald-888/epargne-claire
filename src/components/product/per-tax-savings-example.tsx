'use client'

import { ArrowRight, Banknote, Percent } from 'lucide-react'
import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

export function PerTaxSavingsExample() {
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
          Je verse 3 000 &euro; sur mon PER
        </p>
      </motion.div>

      {/* Bar visualization */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-ep-text-muted">
          <span>Revenus déclarés</span>
          <span className="font-semibold text-ep-text-primary">40 000 &euro;</span>
        </div>
        <div className="relative h-4 overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className="absolute inset-y-0 left-0 bg-amber-400"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '100%' } : { width: '0%' }}
            transition={{ duration: prefersReduced ? 0 : 0.8, ease: 'easeOut', delay: 0.3 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 bg-emerald-400"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '7.5%' } : { width: '0%' }}
            transition={{ duration: prefersReduced ? 0 : 0.6, ease: 'easeOut', delay: 0.8 }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-ep-text-muted">
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-amber-400" />
            37 000 &euro; tax&eacute;s (au lieu de 40 000)
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-emerald-400" />
            3 000 &euro; d&eacute;duits
          </span>
        </div>
      </motion.div>

      {/* Two outcome cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div
          variants={itemVariants}
          className={cn(
            'rounded-xl border border-amber-200 bg-amber-50/50 p-5',
            'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
          )}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-amber-100">
              <Percent className="size-4 text-amber-600" />
            </div>
            <p className="text-sm font-semibold text-ep-text-primary">Si vous &ecirc;tes impos&eacute; &agrave; 30&nbsp;%</p>
          </div>
          <p className="text-sm leading-relaxed text-ep-text-muted">
            Vous payez <strong className="text-amber-600">900 &euro; d&rsquo;imp&ocirc;ts en moins</strong>.
            Votre versement de 3 000 &euro; ne vous co&ucirc;te en r&eacute;alit&eacute; que{' '}
            <strong className="text-ep-text-primary">2 100 &euro;</strong>.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            'rounded-xl border border-blue-200 bg-blue-50/50 p-5',
            'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
          )}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
              <Banknote className="size-4 text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-ep-text-primary">Si vous &ecirc;tes impos&eacute; &agrave; 11&nbsp;%</p>
          </div>
          <p className="text-sm leading-relaxed text-ep-text-muted">
            Vous payez <strong className="text-blue-600">330 &euro; d&rsquo;imp&ocirc;ts en moins</strong>.
            L&rsquo;avantage est plus modeste, mais votre &eacute;pargne{' '}
            <strong className="text-ep-text-primary">grossit quand m&ecirc;me</strong> sur le long terme.
          </p>
        </motion.div>
      </div>

      {/* Result */}
      <motion.div
        variants={itemVariants}
        className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-white p-4 text-center shadow-sm"
      >
        <ArrowRight className="size-4 shrink-0 text-ep-primary" />
        <p className="text-sm text-ep-text-muted">
          <strong className="text-ep-text-primary">Plus votre taux d&rsquo;imposition est &eacute;lev&eacute;</strong>,
          plus l&rsquo;avantage est important. C&rsquo;est comme si l&rsquo;&Eacute;tat payait une partie de votre &eacute;pargne retraite.
        </p>
      </motion.div>
    </motion.div>
  )
}
