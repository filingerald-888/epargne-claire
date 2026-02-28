'use client'

import { motion, useReducedMotion } from 'motion/react'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'

interface TimelinePhase {
  label: string
  description: React.ReactNode
}

interface FiscalTimelineProps {
  milestone: string
  before: TimelinePhase
  after: TimelinePhase
  detail?: React.ReactNode
}

export function FiscalTimeline({ milestone, before, after, detail }: FiscalTimelineProps) {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* ── Desktop : timeline horizontale ── */}
      <div className="hidden sm:block">
        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Ligne horizontale de connexion */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
            <motion.div
              className="h-0.5 w-full rounded-full bg-gradient-to-r from-red-300 via-ep-primary to-emerald-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReduced ? 0 : 0.8, ease: 'easeOut', delay: 0.2 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          {/* Avant */}
          <div className="relative z-10 mr-5 rounded-xl border border-red-200 bg-[#FEF2F2] p-5 text-right transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <p className="font-semibold text-red-600">{before.label}</p>
            <p className="mt-1 text-sm text-ep-text-muted">{before.description}</p>
          </div>

          {/* Marqueur jalon */}
          <div className="relative z-10 flex items-center justify-center px-2">
            {!prefersReduced && (
              <motion.div
                className="absolute inset-0 m-auto rounded-full bg-ep-primary/20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{ width: 56, height: 56 }}
              />
            )}
            <div className="relative flex size-14 items-center justify-center rounded-full bg-ep-primary text-center text-sm font-bold leading-tight text-white shadow-lg">
              {milestone}
            </div>
          </div>

          {/* Après */}
          <div className="relative z-10 ml-5 rounded-xl border border-emerald-200 bg-[#F0FDF4] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <p className="font-semibold text-emerald-600">{after.label}</p>
            <p className="mt-1 text-sm text-ep-text-muted">{after.description}</p>
          </div>
        </div>
      </div>

      {/* ── Mobile : timeline verticale ── */}
      <div className="relative sm:hidden">
        {/* Ligne verticale de connexion */}
        <div className="pointer-events-none absolute bottom-0 left-5 top-0 w-0.5 -translate-x-1/2 overflow-hidden">
          <motion.div
            className="h-full w-full bg-gradient-to-b from-red-300 via-ep-primary to-emerald-400"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0 : 0.8, ease: 'easeOut', delay: 0.2 }}
            style={{ transformOrigin: 'top' }}
          />
        </div>

        {/* Avant */}
        <div className="flex gap-3">
          <div className="flex w-10 shrink-0 items-center justify-center">
            <div className="relative z-10 size-3 rounded-full bg-red-400 ring-2 ring-white" />
          </div>
          <div className="flex-1 rounded-xl border border-red-200 bg-[#FEF2F2] p-4">
            <p className="font-semibold text-red-600">{before.label}</p>
            <p className="mt-1 text-sm text-ep-text-muted">{before.description}</p>
          </div>
        </div>

        {/* Marqueur jalon */}
        <div className="flex items-center gap-3 py-3">
          <div className="relative flex w-10 shrink-0 items-center justify-center">
            {!prefersReduced && (
              <motion.div
                className="absolute rounded-full bg-ep-primary/20"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{ width: 40, height: 40 }}
              />
            )}
            <div className="relative z-10 size-4 rounded-full bg-ep-primary shadow-lg ring-4 ring-ep-primary/20" />
          </div>
          <span className="rounded-full bg-ep-primary/10 px-3 py-1 text-sm font-bold text-ep-primary">
            {milestone}
          </span>
        </div>

        {/* Après */}
        <div className="flex gap-3">
          <div className="flex w-10 shrink-0 items-center justify-center">
            <div className="relative z-10 size-3 rounded-full bg-emerald-400 ring-2 ring-white" />
          </div>
          <div className="flex-1 rounded-xl border border-emerald-200 bg-[#F0FDF4] p-4">
            <p className="font-semibold text-emerald-600">{after.label}</p>
            <p className="mt-1 text-sm text-ep-text-muted">{after.description}</p>
          </div>
        </div>
      </div>

      {/* Détail */}
      {detail && (
        <p className="mt-6 text-center text-sm text-ep-text-muted">{detail}</p>
      )}
    </motion.div>
  )
}
