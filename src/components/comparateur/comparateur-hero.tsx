'use client'

import { motion, useReducedMotion } from 'motion/react'

import { products, suggestions } from '@/lib/comparateur-data'
import { cn } from '@/lib/utils'

interface ComparateurHeroProps {
  selectedA: string
  selectedB: string
  onSelectA: (slug: string) => void
  onSelectB: (slug: string) => void
  onCompare: () => void
  onSuggestion: (a: string, b: string) => void
}

export function ComparateurHero({
  selectedA,
  selectedB,
  onSelectA,
  onSelectB,
  onCompare,
  onSuggestion,
}: ComparateurHeroProps) {
  const prefersReduced = useReducedMotion()
  const dur = prefersReduced ? 0 : 0.5

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        {/* Disclaimer */}
        <motion.span
          className="inline-block rounded-full bg-ep-bg-blue-subtle px-4 py-1.5 text-xs font-medium text-ep-text-muted"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.1 }}
        >
          Comparaison factuelle uniquement. Ne constitue pas une aide à la décision personnalisée.
        </motion.span>

        {/* Title */}
        <motion.h1
          className="mt-6 text-3xl font-bold text-ep-text-primary md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.2 }}
        >
          Comparer pour mieux choisir.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-base text-ep-text-muted md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.3 }}
        >
          Sélectionnez deux produits et voyez les différences en un coup d&apos;œil.
        </motion.p>

        {/* Selects */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.4 }}
        >
          {/* Produit A */}
          <div className="w-full max-w-[220px]">
            <label
              htmlFor="product-a"
              className="mb-1.5 block text-xs font-medium text-ep-text-muted"
            >
              Produit A
            </label>
            <select
              id="product-a"
              value={selectedA}
              onChange={(e) => onSelectA(e.target.value)}
              className="h-11 w-full rounded-lg border border-ep-separator bg-white px-3 text-sm font-medium text-ep-text-primary shadow-sm transition-colors focus:border-ep-primary focus:outline-none focus:ring-2 focus:ring-ep-primary/20"
            >
              {products.map((p) => (
                <option key={p.slug} value={p.slug} disabled={p.slug === selectedB}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* VS */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ep-primary text-sm font-bold text-white">
            VS
          </div>

          {/* Produit B */}
          <div className="w-full max-w-[220px]">
            <label
              htmlFor="product-b"
              className="mb-1.5 block text-xs font-medium text-ep-text-muted"
            >
              Produit B
            </label>
            <select
              id="product-b"
              value={selectedB}
              onChange={(e) => onSelectB(e.target.value)}
              className="h-11 w-full rounded-lg border border-ep-separator bg-white px-3 text-sm font-medium text-ep-text-primary shadow-sm transition-colors focus:border-ep-primary focus:outline-none focus:ring-2 focus:ring-ep-primary/20"
            >
              {products.map((p) => (
                <option key={p.slug} value={p.slug} disabled={p.slug === selectedA}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Compare button */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.5 }}
        >
          <button
            type="button"
            onClick={onCompare}
            className="inline-flex min-h-[44px] items-center rounded-full bg-ep-primary px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-ep-primary-hover hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
          >
            Comparer&ensp;&rarr;
          </button>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur, delay: 0.6 }}
        >
          <p className="mb-3 text-xs text-ep-text-muted">ou choisissez parmi :</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {suggestions.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => onSuggestion(s.a, s.b)}
                className={cn(
                  'inline-flex min-h-[36px] items-center rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200',
                  selectedA === s.a && selectedB === s.b
                    ? 'border-ep-primary bg-ep-primary/10 text-ep-primary'
                    : 'border-ep-separator bg-white text-ep-text-muted hover:border-ep-primary/30 hover:text-ep-text-primary'
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
