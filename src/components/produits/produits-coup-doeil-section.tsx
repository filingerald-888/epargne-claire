'use client'

import { Clock, Droplets, ShieldAlert, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { produitsListing } from '@/lib/produits-data'
import { cn } from '@/lib/utils'

import { ProductSection } from '@/components/content/product-section'
import { CarouselSection } from '@/components/homepage/carousel-section'
import { StrongPhrase } from '@/components/product/strong-phrase'

interface MetricRow {
  label: string
  icon: LucideIcon
  key: 'rendement' | 'risque' | 'horizon' | 'liquidite'
}

const metricRows: MetricRow[] = [
  { label: 'Rendement', icon: TrendingUp, key: 'rendement' },
  { label: 'Risque', icon: ShieldAlert, key: 'risque' },
  { label: 'Horizon', icon: Clock, key: 'horizon' },
  { label: 'Liquidité', icon: Droplets, key: 'liquidite' },
]

export function ProduitsCoupDoeilSection() {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <ProductSection background="primary-subtle">
      <StrongPhrase
        title="En un coup d'œil"
        subtitle="Comparez les caractéristiques clés de chaque produit."
      />

      <div className="mt-10">
        <CarouselSection itemCount={produitsListing.length} dataAttribute="data-metric-card">
          {produitsListing.map((produit) => (
            <motion.div
              key={produit.slug}
              variants={variants}
              data-metric-card
              className={cn(
                'flex w-[260px] shrink-0 snap-start flex-col rounded-2xl border border-ep-separator bg-white p-6',
                'shadow-[0_2px_8px_rgb(0,0,0,0.06)] transition-all duration-300',
                'hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]',
                'sm:w-[280px]'
              )}
            >
              {/* Product name */}
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-ep-text-primary">
                  {produit.title}
                </h3>
                {produit.comingSoon && (
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
                    Bientôt
                  </span>
                )}
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                {metricRows.map((metric) => {
                  const Icon = metric.icon
                  return (
                    <div key={metric.key} className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-ep-bg-blue-subtle">
                        <Icon className="size-4 text-ep-primary" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-ep-text-muted">
                          {metric.label}
                        </p>
                        <p className="text-sm font-bold text-ep-text-primary">
                          {produit.metrics[metric.key]}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </CarouselSection>
      </div>
    </ProductSection>
  )
}
