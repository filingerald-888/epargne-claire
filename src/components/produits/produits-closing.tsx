'use client'

import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'

export function ProduitsClosing() {
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
        {/* Disclaimer */}
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-white/60"
        >
          Les informations présentées sont à vocation éducative. Elles ne constituent pas une recommandation d&apos;investissement.
        </motion.p>

        {/* Closing message */}
        <motion.p
          variants={itemVariants}
          className="text-center text-2xl font-bold md:text-3xl"
        >
          Pas encore sûr ? Comparez ou préparez votre rendez-vous.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/comparer"
            className="group inline-flex items-center gap-2 font-medium text-blue-200 transition-colors hover:text-white"
          >
            Comparer les produits
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/rdv/questions-a-poser"
            className="group inline-flex items-center gap-2 font-medium text-blue-200 transition-colors hover:text-white"
          >
            Préparer un rendez-vous
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
