'use client'

import { Shield, TrendingUp, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

export function PlacementExample() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="mx-auto max-w-3xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-ep-text-muted">
          Exemple concret
        </p>
        <p className="mt-1 text-xl font-bold text-ep-text-primary md:text-2xl">
          Je place 10 000 &euro; en assurance-vie
        </p>
      </motion.div>

      {/* Split visualization */}
      <motion.div variants={itemVariants} className="mb-6">
        {/* Total bar */}
        <div className="mb-2 flex items-center justify-between text-sm text-ep-text-muted">
          <span>Montant total</span>
          <span className="font-semibold text-ep-text-primary">10 000 &euro;</span>
        </div>
        <div className="flex h-4 overflow-hidden rounded-full">
          <motion.div
            className="bg-emerald-400"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '60%' } : { width: '0%' }}
            transition={{ duration: prefersReduced ? 0 : 0.8, ease: 'easeOut', delay: 0.3 }}
          />
          <motion.div
            className="bg-blue-400"
            initial={{ width: '0%' }}
            animate={isInView ? { width: '40%' } : { width: '0%' }}
            transition={{ duration: prefersReduced ? 0 : 0.8, ease: 'easeOut', delay: 0.5 }}
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-ep-text-muted">
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-emerald-400" />
            6 000 &euro; en fonds euros
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-blue-400" />
            4 000 &euro; en UC
          </span>
        </div>
      </motion.div>

      {/* Two outcome cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div
          variants={itemVariants}
          className={cn(
            'rounded-xl border border-emerald-200 bg-emerald-50/50 p-5',
            'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
          )}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100">
              <Shield className="size-4 text-emerald-600" />
            </div>
            <p className="text-sm font-semibold text-ep-text-primary">Fonds euros &mdash; 6 000 &euro;</p>
          </div>
          <p className="text-sm leading-relaxed text-ep-text-muted">
            Capital <strong className="text-ep-text-primary">garanti</strong>.
            Chaque ann&eacute;e, les int&eacute;r&ecirc;ts sont d&eacute;finitivement acquis.
            Avec un rendement de 2,5&nbsp;%/an, vos 6 000 &euro; deviennent
            environ <strong className="text-emerald-600">6 900 &euro;</strong> apr&egrave;s 5 ans.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            'rounded-xl border border-blue-200 bg-blue-50/50 p-5',
            'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
          )}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
              <TrendingUp className="size-4 text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-ep-text-primary">Unit&eacute;s de compte &mdash; 4 000 &euro;</p>
          </div>
          <p className="text-sm leading-relaxed text-ep-text-muted">
            Capital <strong className="text-ep-text-primary">non garanti</strong>, investi en actions et obligations.
            Historiquement, elles rapportent plus que les fonds euros sur le long terme, mais avec des hauts et des bas.
            Avec un rendement de 6&nbsp;%/an, vos 4 000 &euro; pourraient valoir
            environ <strong className="text-blue-600">5 350 &euro;</strong> apr&egrave;s 5 ans
            &mdash; mais aussi moins si les march&eacute;s baissent.
          </p>
        </motion.div>
      </div>

      {/* Result */}
      <motion.div
        variants={itemVariants}
        className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-white p-4 text-center shadow-sm"
      >
        <ArrowRight className="size-4 shrink-0 text-ep-primary" />
        <p className="text-sm text-ep-text-muted">
          <strong className="text-ep-text-primary">R&eacute;sultat apr&egrave;s 5 ans :</strong> vos 10 000 &euro; pourraient valoir autour de{' '}
          <strong className="text-ep-primary">12 250 &euro;</strong>, dont une partie s&eacute;curis&eacute;e et une partie expos&eacute;e aux march&eacute;s.
        </p>
      </motion.div>
    </motion.div>
  )
}
