'use client'

import { useEffect, useRef, useState } from 'react'

import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

import { products, getProduct } from '@/lib/comparateur-data'
import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

const shortLabels: Record<string, string> = {
  'assurance-vie': 'AV',
  'pea': 'PEA',
  'per': 'PER',
  'scpi': 'SCPI',
  'livret-a-ldds': 'LA',
}


function ProductSelector({
  selected,
  otherSelected,
  onSelect,
  side,
}: {
  selected: string
  otherSelected: string
  onSelect: (slug: string) => void
  side: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const product = getProduct(selected)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div ref={ref} className="relative flex w-[160px] flex-col items-center sm:w-[200px] md:w-[240px]">
      <div className="flex size-12 items-center justify-center rounded-full bg-ep-bg-blue-subtle">
        <span className="text-lg font-bold text-ep-primary">
          {shortLabels[selected] ?? '?'}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'mt-3 flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-bold transition-all duration-200',
          'hover:border-ep-primary hover:shadow-sm',
          open
            ? 'border-ep-primary bg-ep-primary/5 text-ep-primary'
            : 'border-ep-separator bg-white text-ep-text-primary'
        )}
      >
        <span className="max-w-[120px] truncate sm:max-w-none">{product?.label}</span>
        <ChevronDown className={cn(
          'size-3.5 shrink-0 transition-transform duration-200',
          open && 'rotate-180'
        )} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute top-[calc(100%+8px)] z-30 w-[200px] overflow-hidden rounded-xl border border-ep-separator bg-white shadow-lg',
              side === 'right' ? 'right-0 sm:right-auto' : 'left-0 sm:left-auto'
            )}
          >
            {products.map((p) => {
              const isSelected = p.slug === selected
              const isOther = p.slug === otherSelected
              return (
                <button
                  key={p.slug}
                  type="button"
                  disabled={isOther}
                  onClick={() => {
                    onSelect(p.slug)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors',
                    isSelected && 'bg-ep-primary/5 font-semibold text-ep-primary',
                    isOther && 'cursor-not-allowed opacity-40',
                    !isSelected && !isOther && 'hover:bg-gray-50 text-ep-text-primary'
                  )}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ep-bg-blue-subtle text-xs font-bold text-ep-primary">
                    {shortLabels[p.slug]}
                  </span>
                  <span>{p.label}</span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-1.5 text-center text-xs text-ep-text-muted">
        {product?.summary.split('.')[0]}.
      </p>
    </div>
  )
}

export function ComparerSection() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants
  const [leftSlug, setLeftSlug] = useState('assurance-vie')
  const [rightSlug, setRightSlug] = useState('pea')

  return (
    <motion.section
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="py-16 md:py-24"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-3xl font-bold text-ep-text-primary md:text-4xl">
          {"Hésiter, c\u2019est normal."}
        </h2>
        <p className="mt-3 text-base text-ep-text-muted md:text-lg">
          {"Comparez deux produits côte à côte pour y voir plus clair."}
        </p>
      </motion.div>

      {/* Product selectors */}
      <motion.div
        variants={itemVariants}
        className="mt-10 flex items-start justify-center gap-3 md:gap-8"
      >
        <ProductSelector
          selected={leftSlug}
          otherSelected={rightSlug}
          onSelect={setLeftSlug}
          side="left"
        />

        <div className="mt-3 flex size-10 shrink-0 items-center justify-center rounded-full bg-ep-primary text-sm font-bold text-white">
          VS
        </div>

        <ProductSelector
          selected={rightSlug}
          otherSelected={leftSlug}
          onSelect={setRightSlug}
          side="right"
        />
      </motion.div>

      {/* CTA */}
      <motion.div variants={itemVariants} className="mt-10 text-center">
        <Link
          href={`/comparer?a=${leftSlug}&b=${rightSlug}`}
          className="inline-flex min-h-[44px] items-center rounded-full bg-ep-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-ep-primary-hover hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
        >
          {"Voir la comparaison complète\u2003\u2192"}
        </Link>
      </motion.div>
    </motion.section>
  )
}
