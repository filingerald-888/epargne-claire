'use client'

import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'

export function FounderSection() {
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
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
        {/* Photo */}
        <motion.div variants={itemVariants} className="shrink-0">
          <div className="relative size-28 overflow-hidden rounded-full border-4 border-ep-primary/20 md:size-32">
            <Image
              src="/images/fondateur-v2.jpg"
              alt="G\u00E9rald, fondateur d'EpargneClaire"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        </motion.div>

        {/* Quote */}
        <div>
          <motion.span
            variants={itemVariants}
            className="block font-serif text-6xl leading-none text-ep-primary/20"
            aria-hidden
          >
            &laquo;
          </motion.span>

          <motion.blockquote variants={itemVariants} className="-mt-4">
            <p className="text-lg leading-relaxed text-ep-text-primary md:text-xl">
              Comme certains d&rsquo;entre vous, j&rsquo;épargne depuis des
              années. Et comme{' '}
              <mark className="rounded bg-amber-100 px-1 font-semibold text-ep-text-primary">
                beaucoup
              </mark>{' '}
              d&rsquo;entre vous, j&rsquo;ai longtemps eu l&rsquo;impression de
              naviguer à l&rsquo;aveugle dans un océan de jargon financier.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ep-text-muted">
              J&rsquo;ai créé Épargne Claire pour avoir la ressource que
              j&rsquo;aurais aimé trouver&nbsp;: claire, neutre et qui explique
              vraiment comment ça marche… sans rien vous vendre.
            </p>
          </motion.blockquote>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-sm font-medium text-ep-text-muted"
          >
            — Gérald, 43 ans, Épargnant
          </motion.p>
        </div>
      </div>
    </motion.section>
  )
}
