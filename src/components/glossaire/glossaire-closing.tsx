'use client'

import { ArrowRight, ArrowUp } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'

export function GlossaireClosing() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mx-[calc(-50vw+50%)] w-screen bg-gradient-to-br from-blue-900 to-blue-800 py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-[1200px] space-y-10 px-6 md:px-8">
        <motion.p
          variants={itemVariants}
          className="text-center text-2xl font-bold md:text-3xl"
        >
          Vous savez désormais lire entre les lignes.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 font-medium text-blue-200 transition-colors hover:text-white"
          >
            <ArrowUp className="size-4 transition-transform group-hover:-translate-y-1" />
            Retour en haut
          </button>
          <Link
            href="/produits"
            className="group inline-flex items-center gap-2 font-medium text-blue-200 transition-colors hover:text-white"
          >
            Voir les produits
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/comparer"
            className="group inline-flex items-center gap-2 font-medium text-blue-200 transition-colors hover:text-white"
          >
            Comparer deux produits
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
