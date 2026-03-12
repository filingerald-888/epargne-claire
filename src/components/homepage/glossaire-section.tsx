'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'

const termsPreview = [
  { term: 'PFU', definition: 'Impôt forfaitaire de 30 % sur vos gains' },
  { term: 'Fonds euros', definition: 'Capital garanti, ne peut pas baisser' },
  { term: 'Unités de compte', definition: 'Supports dont la valeur peut varier' },
  { term: 'Liquidité', definition: 'Facilité à récupérer votre argent' },
]

export function GlossaireSection() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <section className="mx-[calc(-50vw+50%)] w-screen bg-ep-primary py-16 text-white md:py-24">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1200px] px-6 md:px-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Un mot vous échappe&nbsp;?
          </h2>
          <p className="mt-3 text-base text-white/70 md:text-lg">
            Notre glossaire traduit le jargon financier en langage clair.
          </p>
        </motion.div>

        {/* Terms grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {termsPreview.map((t) => (
            <motion.div
              key={t.term}
              variants={itemVariants}
              className="rounded-xl bg-white/10 p-5"
            >
              <p className="text-base font-bold">{t.term}</p>
              <p className="mt-1 text-sm text-white/70">{t.definition}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="mt-10 text-center">
          <Link
            href="/glossaire"
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ep-primary"
          >
            Voir le glossaire complet&ensp;&rarr;
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
