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
      {/* Desktop */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-4">
          {/* Before */}
          <div className="rounded-xl border border-red-200 bg-[#FEF2F2] p-5 text-right transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <p className="font-semibold text-red-600">{before.label}</p>
            <p className="mt-1 text-sm text-ep-text-muted">{before.description}</p>
          </div>

          {/* Milestone */}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              {!prefersReduced && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-ep-primary/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                  style={{ width: 56, height: 56 }}
                />
              )}
              <div className="relative flex size-14 items-center justify-center rounded-full bg-ep-primary text-sm font-bold text-white shadow-lg">
                {milestone}
              </div>
            </div>
          </div>

          {/* After */}
          <div className="rounded-xl border border-emerald-200 bg-[#F0FDF4] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <p className="font-semibold text-emerald-600">{after.label}</p>
            <p className="mt-1 text-sm text-ep-text-muted">{after.description}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mx-auto mt-4 h-2 max-w-md overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-300 via-ep-primary to-emerald-400"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0 : 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      </div>

      {/* Mobile — stacked */}
      <div className="flex flex-col gap-4 sm:hidden">
        <div className="rounded-xl border border-red-200 bg-[#FEF2F2] p-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)]">
          <p className="font-semibold text-red-600">{before.label}</p>
          <p className="mt-1 text-sm text-ep-text-muted">{before.description}</p>
        </div>

        <div className="flex justify-center">
          <div className="relative flex items-center justify-center">
            {!prefersReduced && (
              <motion.div
                className="absolute inset-0 rounded-full bg-ep-primary/20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                }}
                style={{ width: 48, height: 48 }}
              />
            )}
            <div className="relative flex size-12 items-center justify-center rounded-full bg-ep-primary text-sm font-bold text-white shadow-lg">
              {milestone}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-[#F0FDF4] p-4 transition-all duration-300 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)]">
          <p className="font-semibold text-emerald-600">{after.label}</p>
          <p className="mt-1 text-sm text-ep-text-muted">{after.description}</p>
        </div>
      </div>

      {/* Detail */}
      {detail && (
        <p className="mt-4 text-center text-sm text-ep-text-muted">{detail}</p>
      )}
    </motion.div>
  )
}
