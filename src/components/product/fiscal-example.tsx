'use client'

import { useRef } from 'react'

import { Calculator, Gift } from 'lucide-react'
import { motion, useReducedMotion, useInView } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

interface Step {
  label: string
  value: string
  color: string
  barWidth: string
}

const steps: Step[] = [
  { label: 'Gains totaux de Marie', value: '10 000 \u20AC', color: 'bg-ep-primary', barWidth: '100%' },
  { label: 'Partie exon\u00E9r\u00E9e (bonus des 8 ans)', value: '\u2212 4 600 \u20AC', color: 'bg-emerald-500', barWidth: '46%' },
  { label: 'Reste soumis \u00E0 l\u2019imp\u00F4t', value: '5 400 \u20AC', color: 'bg-amber-500', barWidth: '54%' },
]

export function FiscalExample() {
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
      className="mx-auto mt-12 max-w-3xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-10 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-ep-primary/10">
          <Calculator className="size-6 text-ep-primary" />
        </div>
        <p className="text-xl font-bold text-ep-text-primary">
          Exemple : Marie retire son contrat
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ep-text-muted">
          Marie a plac&eacute; de l&rsquo;argent pendant 8 ans. Son contrat vaut aujourd&rsquo;hui
          {' '}<strong className="text-ep-text-primary">50 000 &euro;</strong> : 40 000 &euro;
          de versements et 10 000 &euro; de gains. Elle d&eacute;cide de tout retirer.
        </p>
      </motion.div>

      {/* Visual waterfall */}
      <motion.div variants={itemVariants} className="mb-10 space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-40 shrink-0 text-right sm:w-48">
              <p className="text-xs text-ep-text-muted">{step.label}</p>
              <p className={cn(
                'text-sm font-bold',
                i === 1 ? 'text-emerald-600' : i === 2 ? 'text-amber-600' : 'text-ep-primary'
              )}>
                {step.value}
              </p>
            </div>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className={cn('h-full rounded-full', step.color)}
                initial={{ width: '0%' }}
                animate={isInView ? { width: step.barWidth } : { width: '0%' }}
                transition={{
                  duration: prefersReduced ? 0 : 0.8,
                  ease: 'easeOut',
                  delay: prefersReduced ? 0 : 0.3 + i * 0.2,
                }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tax breakdown cards — plain language, no acronyms */}
      <motion.div variants={itemVariants} className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-ep-separator bg-white p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <p className="text-xs text-ep-text-muted">Imp&ocirc;t sur le revenu</p>
          <p className="text-xl font-bold text-ep-text-primary">405 &euro;</p>
          <p className="text-[11px] leading-snug text-ep-text-muted">
            7,5&nbsp;% sur les 5 400 &euro; restants
            (taux r&eacute;duit apr&egrave;s 8 ans)
          </p>
        </div>
        <div className="rounded-xl border border-ep-separator bg-white p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <p className="text-xs text-ep-text-muted">Cotisations sociales</p>
          <p className="text-xl font-bold text-ep-text-primary">1 720 &euro;</p>
          <p className="text-[11px] leading-snug text-ep-text-muted">
            17,2&nbsp;% pr&eacute;lev&eacute;s automatiquement
            sur la totalit&eacute; des 10 000 &euro; de gains
          </p>
        </div>
        <div className="rounded-xl border-2 border-ep-primary bg-ep-primary/5 p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          <p className="text-xs text-ep-primary">Total pr&eacute;lev&eacute;</p>
          <p className="text-xl font-bold text-ep-primary">2 125 &euro;</p>
          <p className="text-[11px] leading-snug text-ep-text-muted">
            Marie r&eacute;cup&egrave;re <strong className="text-ep-primary">47 875 &euro; net</strong>
          </p>
        </div>
      </motion.div>

      {/* Before / After comparison — plain language */}
      <motion.div
        variants={itemVariants}
        className="flex items-stretch gap-4 rounded-xl bg-white p-4 shadow-sm"
      >
        <div className="flex-1 rounded-lg bg-red-50 p-3 text-center">
          <p className="text-xs font-medium text-red-500">Si elle avait retir&eacute; avant 8 ans</p>
          <p className="mt-1 text-lg font-bold text-red-600">3 000 &euro; d&rsquo;imp&ocirc;ts</p>
          <p className="text-[11px] text-ep-text-muted">Taux unique de 30&nbsp;%</p>
        </div>
        <div className="flex items-center">
          <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100">
            <Gift className="size-4 text-emerald-600" />
          </div>
        </div>
        <div className="flex-1 rounded-lg bg-emerald-50 p-3 text-center">
          <p className="text-xs font-medium text-emerald-600">En retirant apr&egrave;s 8 ans</p>
          <p className="mt-1 text-lg font-bold text-emerald-600">2 125 &euro; d&rsquo;imp&ocirc;ts</p>
          <p className="text-[11px] text-ep-text-muted">Gr&acirc;ce &agrave; la partie exon&eacute;r&eacute;e</p>
        </div>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="mt-4 text-center text-sm font-medium text-emerald-600"
      >
        R&eacute;sultat : Marie <strong>&eacute;conomise 875 &euro;</strong> en ayant attendu 8 ans.
      </motion.p>
    </motion.div>
  )
}
