'use client'

import { CircleCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'

const items = [
  'Les bonnes questions \u00E0 poser',
  "Les points d'attention cl\u00E9s",
  'Les r\u00E9flexes avant de signer',
]

export function RdvSection() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <section className="mx-[calc(-50vw+50%)] w-screen bg-ep-bg-blue-subtle py-16 md:py-24">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-2 md:items-center md:gap-16 md:px-8"
      >
        {/* Illustration */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center"
        >
          <div className="relative size-56 overflow-hidden rounded-full border-4 border-ep-primary/20 md:size-72">
            <Image
              src="/images/rdv-illustration-v2.jpg"
              alt="Préparer un rendez-vous avec un conseiller"
              fill
              className="object-cover"
              sizes="288px"
            />
          </div>
        </motion.div>

        {/* Content */}
        <div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-ep-text-primary md:text-4xl"
          >
            Vous avez un RDV avec un conseiller&nbsp;?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-3 text-base text-ep-text-muted md:text-lg"
          >
            Arrivez préparé. Des éléments factuels
            pour un échange éclairé.
          </motion.p>

          {/* Checklist */}
          <motion.ul variants={itemVariants} className="mt-8 space-y-4">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CircleCheck className="size-5 shrink-0 text-ep-secondary" />
                <span className="text-base font-medium text-ep-text-primary">
                  {item}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-8">
            <Link
              href="/rdv/questions-a-poser"
              className="inline-flex min-h-[44px] items-center rounded-full bg-ep-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-ep-primary-hover hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
            >
              Préparer mon RDV&ensp;&rarr;
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
