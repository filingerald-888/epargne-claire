'use client'

import { Check, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'
import { amItems, notItems } from '@/lib/a-propos-data'

import { StrongPhrase } from '@/components/product/strong-phrase'

export function AProposPositionnement() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <section className="py-16 md:py-24">
      <StrongPhrase title="Ce que je suis et ce que je ne suis pas" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Ce que je suis */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="rounded-2xl border border-ep-separator bg-white p-6 shadow-[0_2px_8px_rgb(0,0,0,0.06)]"
        >
          <h3 className="mb-6 text-lg font-bold text-ep-text-primary">
            Ce que je <span className="text-green-600">suis</span>
          </h3>
          <div className="space-y-4">
            {amItems.map((item) => (
              <motion.div
                key={item}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-green-50">
                  <Check className="size-3.5 text-green-600" />
                </span>
                <p className="text-sm leading-relaxed text-ep-text-muted">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ce que je ne suis PAS */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="rounded-2xl border border-ep-separator bg-white p-6 shadow-[0_2px_8px_rgb(0,0,0,0.06)]"
        >
          <h3 className="mb-6 text-lg font-bold text-ep-text-primary">
            Ce que je ne suis <span className="text-red-500">pas</span>
          </h3>
          <div className="space-y-4">
            {notItems.map((item) => (
              <motion.div
                key={item}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-red-50">
                  <X className="size-3.5 text-red-500" />
                </span>
                <p className="text-sm leading-relaxed text-ep-text-muted">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
