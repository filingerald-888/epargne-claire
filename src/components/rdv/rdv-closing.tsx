'use client'

import { ArrowRight, BarChart3, Package } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'

import { rdvPages } from '@/lib/rdv'
import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'

interface RdvClosingProps {
  phrase: string
  subtitle?: string
  currentSlug: string
}

export function RdvClosing({
  phrase,
  subtitle = "L'information est votre meilleur allié pour un échange constructif.",
  currentSlug,
}: RdvClosingProps) {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants
  const otherPages = rdvPages.filter((p) => p.slug !== currentSlug)

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="space-y-8"
    >
      {/* Closing phrase */}
      <motion.div variants={itemVariants} className="text-center">
        <p className="text-2xl font-bold text-white md:text-3xl">{phrase}</p>
        <p className="mt-2 text-base text-blue-200">{subtitle}</p>
      </motion.div>

      {/* Other RDV pages */}
      <motion.div variants={itemVariants}>
        <p className="mb-4 text-center text-sm font-medium text-blue-200">
          Voir aussi
        </p>
        <div className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
          {otherPages.map((page) => (
            <Link
              key={page.slug}
              href={`/rdv/${page.slug}`}
              className="group flex flex-1 items-center justify-between rounded-xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {page.title}
                </p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-blue-200 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* External links */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      >
        <Link
          href="/produits"
          className="group inline-flex items-center gap-2 font-medium text-blue-200 transition-colors hover:text-white"
        >
          <Package className="size-4" />
          Voir les produits
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/comparer"
          className="group inline-flex items-center gap-2 font-medium text-blue-200 transition-colors hover:text-white"
        >
          <BarChart3 className="size-4" />
          Comparer deux produits
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
