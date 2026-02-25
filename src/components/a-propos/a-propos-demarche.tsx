'use client'

import { motion, useReducedMotion } from 'motion/react'

import { fadeInVariants, reducedFadeInVariants, staggerContainerVariants } from '@/lib/motion'
import { pillars } from '@/lib/a-propos-data'

import { ProductSection } from '@/components/content/product-section'
import { StrongPhrase } from '@/components/product/strong-phrase'

export function AProposDemarche() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <ProductSection background="primary-subtle">
      <StrongPhrase title="La démarche" />

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {pillars.map((pillar) => (
          <motion.div
            key={pillar.title}
            variants={itemVariants}
            className="rounded-2xl border border-ep-separator bg-white p-6 shadow-[0_2px_8px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
          >
            <span className="text-4xl" role="img" aria-hidden>
              {pillar.icon}
            </span>
            <h3 className="mt-4 text-lg font-bold text-ep-text-primary">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ep-text-muted">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </ProductSection>
  )
}
