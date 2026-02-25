'use client'

import { ArrowRight, RefreshCw } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'
import {
  comparisonAttributes,
  getProduct,
  type ProductComparison,
} from '@/lib/comparateur-data'
import { cn } from '@/lib/utils'

interface ComparateurResultProps {
  slugA: string
  slugB: string
  onNewComparison: () => void
}

export function ComparateurResult({
  slugA,
  slugB,
  onNewComparison,
}: ComparateurResultProps) {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants
  const productA = getProduct(slugA)
  const productB = getProduct(slugB)

  if (!productA || !productB) return null

  return (
    <>
      {/* C1 — Tableau comparatif */}
      <div className="mx-[calc(-50vw+50%)] w-screen bg-ep-bg-blue-subtle py-16 md:py-24">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mx-auto max-w-[1200px] px-6 md:px-8"
        >
          {/* Header: Product A VS Product B */}
          <motion.div
            variants={itemVariants}
            className="mb-10 flex items-center justify-center gap-4"
          >
            <span className="text-xl font-bold text-ep-text-primary md:text-2xl">
              {productA.label}
            </span>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ep-primary text-sm font-bold text-white">
              VS
            </span>
            <span className="text-xl font-bold text-ep-text-primary md:text-2xl">
              {productB.label}
            </span>
          </motion.div>

          {/* Desktop table */}
          <motion.div variants={itemVariants} className="hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-ep-separator bg-white shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ep-separator bg-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ep-text-muted">
                      Critère
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ep-primary">
                      {productA.label}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-ep-primary">
                      {productB.label}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonAttributes.map((attr, i) => (
                    <tr
                      key={attr.key}
                      className={cn(
                        'border-b border-ep-separator last:border-b-0',
                        i % 2 === 0 ? 'bg-white' : 'bg-ep-bg-blue-subtle/30'
                      )}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-ep-text-primary">
                        {attr.label}
                      </td>
                      <td className="px-6 py-4 text-sm leading-relaxed text-ep-text-muted">
                        {productA[attr.key]}
                      </td>
                      <td className="px-6 py-4 text-sm leading-relaxed text-ep-text-muted">
                        {productB[attr.key]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {comparisonAttributes.map((attr) => (
              <motion.div
                key={attr.key}
                variants={itemVariants}
                className="rounded-xl border border-ep-separator bg-white p-4"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ep-text-muted">
                  {attr.label}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="mb-1 text-xs font-medium text-ep-primary">
                      {productA.label}
                    </p>
                    <p className="text-sm leading-relaxed text-ep-text-primary">
                      {productA[attr.key]}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium text-ep-primary">
                      {productB.label}
                    </p>
                    <p className="text-sm leading-relaxed text-ep-text-primary">
                      {productB[attr.key]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* C2 — Synthèse + Actions */}
      <motion.section
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="py-16 md:py-24"
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-10 text-center">
          <div
            className="mx-auto mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-ep-primary to-ep-secondary"
            aria-hidden
          />
          <p className="text-2xl font-bold text-ep-text-primary md:text-4xl">
            En résumé
          </p>
        </motion.div>

        {/* Summary cards */}
        <motion.div
          variants={itemVariants}
          className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2"
        >
          <SummaryCard product={productA} />
          <SummaryCard product={productB} />
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-8 max-w-2xl text-center text-sm text-ep-text-muted"
        >
          Ce résumé ne constitue pas un conseil. Consultez un professionnel.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center"
        >
          <Link
            href={productA.href}
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ep-separator bg-white px-5 py-2.5 text-sm font-semibold text-ep-text-primary shadow-sm transition-all duration-200 hover:border-ep-primary/30 hover:shadow-md"
          >
            Fiche {productA.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={productB.href}
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ep-separator bg-white px-5 py-2.5 text-sm font-semibold text-ep-text-primary shadow-sm transition-all duration-200 hover:border-ep-primary/30 hover:shadow-md"
          >
            Fiche {productB.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={onNewComparison}
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ep-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-ep-primary-hover hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
          >
            <RefreshCw className="size-4" />
            Nouvelle comparaison
          </button>
          <Link
            href="/rdv/questions-a-poser"
            className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ep-text-muted transition-colors hover:text-ep-primary"
          >
            Préparer votre RDV conseiller
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.section>
    </>
  )
}

function SummaryCard({ product }: { product: ProductComparison }) {
  return (
    <div className="rounded-xl border border-ep-separator bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      <h3 className="text-lg font-bold text-ep-text-primary">
        {product.label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ep-text-muted">
        {product.summary}
      </p>
    </div>
  )
}
