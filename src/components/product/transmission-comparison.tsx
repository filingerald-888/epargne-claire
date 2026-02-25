'use client'

import { Gift, Landmark } from 'lucide-react'
import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'

import {
  slideInLeftVariants,
  slideInRightVariants,
  reducedSlideInVariants,
  staggerContainerVariants,
  scaleInVariants,
  reducedScaleInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

const successionBrackets = [
  { label: "Jusqu'\u00E0 8 072 \u20AC", rate: '5 %' },
  { label: '8 072 \u2192 12 109 \u20AC', rate: '10 %' },
  { label: '12 109 \u2192 15 932 \u20AC', rate: '15 %' },
  { label: '15 932 \u2192 552 324 \u20AC', rate: '20 %' },
  { label: '552 324 \u2192 902 838 \u20AC', rate: '30 %' },
  { label: "Au-del\u00E0", rate: '40\u201345 %' },
]

const avBrackets = [
  { label: "Jusqu'\u00E0 152 500 \u20AC", rate: '0 %' },
  { label: '152 500 \u2192 852 500 \u20AC', rate: '20 %' },
  { label: "Au-del\u00E0 de 852 500 \u20AC", rate: '31,25 %' },
]

export function TransmissionComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const leftVariants = prefersReduced ? reducedSlideInVariants : slideInLeftVariants
  const rightVariants = prefersReduced ? reducedSlideInVariants : slideInRightVariants
  const centerVariants = prefersReduced ? reducedScaleInVariants : scaleInVariants

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mx-auto max-w-4xl space-y-8"
    >
      {/* Two cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Succession classique */}
        <motion.div
          variants={leftVariants}
          className="rounded-2xl border border-red-200 bg-[#FEF2F2] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-red-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:p-8"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-red-100">
              <Landmark className="size-5 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-ep-text-primary">Succession classique</h3>
          </div>

          <div className="mb-4 rounded-lg bg-white/60 p-3">
            <p className="text-sm font-medium text-ep-text-primary">Partie non tax&eacute;e</p>
            <p className="text-2xl font-bold text-red-600">100 000 &euro;</p>
            <p className="text-xs text-ep-text-muted">par enfant (ligne directe)</p>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ep-text-muted">
            Barème progressif
          </p>
          <div className="space-y-2">
            {successionBrackets.map((bracket, i) => (
              <div key={i} className="flex items-baseline justify-between text-sm">
                <span className="text-ep-text-muted">{bracket.label}</span>
                <span className="ml-2 shrink-0 font-semibold text-red-600">{bracket.rate}</span>
              </div>
            ))}
          </div>

          {/* Visual bar */}
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-red-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-600"
                initial={{ width: '0%' }}
                animate={isInView ? { width: '65%' } : { width: '0%' }}
                transition={{ duration: prefersReduced ? 0 : 1, ease: 'easeOut', delay: 0.5 }}
              />
            </div>
            <p className="mt-1 text-right text-xs text-red-500">Charge fiscale élevée</p>
          </div>
        </motion.div>

        {/* Via assurance-vie */}
        <motion.div
          variants={rightVariants}
          className="rounded-2xl border-2 border-emerald-300 bg-[#F0FDF4] p-6 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-emerald-400 hover:shadow-[0_12px_40px_rgb(16,185,129,0.15)] md:p-8"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
              <Gift className="size-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ep-text-primary">Via assurance-vie</h3>
              <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Optimisé
              </span>
            </div>
          </div>

          <div className="mb-4 rounded-lg bg-white/60 p-3">
            <p className="text-sm font-medium text-ep-text-primary">Partie non tax&eacute;e</p>
            <p className="text-2xl font-bold text-emerald-600">152 500 &euro;</p>
            <p className="text-xs text-ep-text-muted">par b&eacute;n&eacute;ficiaire (versements avant 70 ans)</p>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ep-text-muted">
            Taux forfaitaires
          </p>
          <div className="space-y-2">
            {avBrackets.map((bracket, i) => (
              <div key={i} className="flex items-baseline justify-between text-sm">
                <span className="text-ep-text-muted">{bracket.label}</span>
                <span className={cn(
                  'ml-2 shrink-0 font-semibold',
                  bracket.rate === '0 %' ? 'text-emerald-600' : 'text-ep-text-primary'
                )}>
                  {bracket.rate}
                </span>
              </div>
            ))}
          </div>

          {/* Visual bar */}
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-emerald-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                initial={{ width: '0%' }}
                animate={isInView ? { width: '15%' } : { width: '0%' }}
                transition={{ duration: prefersReduced ? 0 : 1, ease: 'easeOut', delay: 0.5 }}
              />
            </div>
            <p className="mt-1 text-right text-xs text-emerald-600">Charge fiscale réduite</p>
          </div>
        </motion.div>
      </div>

      {/* Savings callout */}
      <motion.div
        variants={centerVariants}
        className="rounded-2xl border border-ep-separator bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:p-8"
      >
        <p className="mb-2 text-sm font-medium text-ep-text-muted">
          Exemple concret : transmission de 300 000 € à 2 enfants
        </p>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
          <div>
            <p className="text-sm text-ep-text-muted">Succession classique</p>
            <p className="text-2xl font-bold text-red-600">≈ 38 194 €</p>
            <p className="text-xs text-ep-text-muted">d'impôt total</p>
          </div>
          <div className="hidden h-12 w-px bg-ep-separator sm:block" />
          <div>
            <p className="text-sm text-ep-text-muted">Via assurance-vie</p>
            <p className="text-2xl font-bold text-emerald-600">0 €</p>
            <p className="text-xs text-ep-text-muted">sous le seuil d&rsquo;exon&eacute;ration</p>
          </div>
        </div>
        <div className="mt-4 inline-block rounded-full bg-emerald-50 px-4 py-2">
          <p className="text-sm font-semibold text-emerald-700">
            Économie : 38 194 € grâce à l'assurance-vie
          </p>
        </div>
      </motion.div>

      {/* Nuances importantes */}
      <motion.div
        variants={centerVariants}
        className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 md:p-6"
      >
        <p className="mb-3 text-sm font-semibold text-ep-text-primary">
          Conditions et limites à connaître
        </p>
        <ul className="space-y-2 text-sm leading-relaxed text-ep-text-muted">
          <li>
            <strong className="text-ep-text-primary">Versements avant 70 ans :</strong> abattement de 152 500 € par bénéficiaire. C'est le cas le plus avantageux — et celui présenté dans l'exemple ci-dessus.
          </li>
          <li>
            <strong className="text-ep-text-primary">Versements après 70 ans :</strong> règles différentes. L'abattement tombe à 30 500 € au total (tous bénéficiaires confondus). Seules les primes versées sont taxées — les intérêts générés restent exonérés.
          </li>
          <li>
            <strong className="text-ep-text-primary">Clause bénéficiaire :</strong> l'avantage fiscal ne fonctionne que si la clause est correctement rédigée et à jour. Pensez à la vérifier régulièrement.
          </li>
        </ul>
      </motion.div>

      <p className="text-center text-xs text-ep-text-muted">
        Calcul simplifi&eacute;, hors frais et cotisations sociales. Chaque situation est unique &mdash; consultez un professionnel pour un conseil adapt&eacute;.
      </p>
    </motion.div>
  )
}
