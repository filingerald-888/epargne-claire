'use client'

import { motion, useReducedMotion } from 'motion/react'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'

export function AProposHistoire() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.section
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <motion.p
          variants={itemVariants}
          className="text-xl leading-relaxed text-ep-text-primary md:text-2xl"
        >
          Je m&apos;appelle Gérald.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-xl leading-relaxed text-ep-text-primary md:text-2xl"
        >
          J&apos;ai créé EpargneClaire pour traduire ce jargon en français courant.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-2xl font-bold text-ep-primary md:text-3xl"
        >
          Gratuitement. Sans promotion. Sans affiliation.
        </motion.p>
      </div>
    </motion.section>
  )
}
