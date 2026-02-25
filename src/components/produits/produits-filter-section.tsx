'use client'

import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'
import {
  type ObjectifFilterKey,
  filterProduitsByObjectif,
  objectifFilters,
  produitsListing,
} from '@/lib/produits-data'
import { cn } from '@/lib/utils'

import { StrongPhrase } from '@/components/product/strong-phrase'

const objectifColors: Record<string, { bg: string; text: string }> = {
  securiser: { bg: 'bg-securiser-bg', text: 'text-securiser-text' },
  projets: { bg: 'bg-projets-bg', text: 'text-projets-text' },
  retraite: { bg: 'bg-retraite-bg', text: 'text-retraite-text' },
  transmission: { bg: 'bg-transmission-bg', text: 'text-transmission-text' },
}

const pillColors: Record<string, { active: string; inactive: string }> = {
  tous: {
    active: 'bg-ep-primary text-white',
    inactive: 'bg-white text-ep-text-muted border-ep-separator',
  },
  securiser: {
    active: 'bg-securiser-text text-white',
    inactive: 'bg-securiser-bg text-securiser-text border-securiser-bg',
  },
  projets: {
    active: 'bg-projets-text text-white',
    inactive: 'bg-projets-bg text-projets-text border-projets-bg',
  },
  retraite: {
    active: 'bg-retraite-text text-white',
    inactive: 'bg-retraite-bg text-retraite-text border-retraite-bg',
  },
  transmission: {
    active: 'bg-transmission-text text-white',
    inactive: 'bg-transmission-bg text-transmission-text border-transmission-bg',
  },
}

export function ProduitsFilterSection() {
  const [activeFilter, setActiveFilter] = useState<ObjectifFilterKey>('tous')
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants
  const filtered = filterProduitsByObjectif(produitsListing, activeFilter)

  return (
    <section className="py-16 md:py-24">
      <StrongPhrase
        title="Filtrer par objectif"
        subtitle="Trouvez les produits qui correspondent à votre besoin."
      />

      {/* Filter pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {objectifFilters.map((filter) => {
          const isActive = filter.key === activeFilter
          const colors = pillColors[filter.key]
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
                isActive ? colors.active : colors.inactive,
                !isActive && 'hover:shadow-sm'
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {/* Product card grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((produit) => (
            <motion.div key={produit.slug} variants={itemVariants}>
              <Link
                href={produit.href}
                className={cn(
                  'group flex flex-col overflow-hidden rounded-2xl border border-ep-separator bg-white',
                  'shadow-[0_2px_8px_rgb(0,0,0,0.06)] transition-all duration-300',
                  'hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]'
                )}
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={produit.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {produit.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ep-text-primary">
                        Bientôt disponible
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-ep-text-primary">
                    {produit.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ep-text-muted">
                    {produit.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {produit.tags.map((tag) => {
                      const tc = objectifColors[tag.colorKey]
                      return (
                        <span
                          key={tag.label}
                          className={cn(
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            tc?.bg,
                            tc?.text
                          )}
                        >
                          {tag.label}
                        </span>
                      )
                    })}
                  </div>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center justify-end">
                    <span className="inline-flex size-8 items-center justify-center rounded-full text-gray-700 transition-all duration-200 group-hover:bg-gray-700 group-hover:text-white">
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
