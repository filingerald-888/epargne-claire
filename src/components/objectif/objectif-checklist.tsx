'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'

interface ChecklistStep {
  title: string
  description: ReactNode
}

interface ObjectifChecklistProps {
  steps: ChecklistStep[]
}

export function ObjectifChecklist({ steps }: ObjectifChecklistProps) {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.ol
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative mx-auto max-w-xl space-y-0"
    >
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        return (
          <motion.li
            key={step.title}
            variants={itemVariants}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {/* Vertical line */}
            {!isLast && (
              <div
                className="absolute left-[17px] top-10 h-[calc(100%-2rem)] w-px bg-ep-separator"
                aria-hidden
              />
            )}

            {/* Step number circle */}
            <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-ep-primary text-sm font-bold text-white shadow-sm">
              {i + 1}
            </div>

            {/* Content */}
            <div className="pt-1">
              <h3 className="text-sm font-bold text-ep-text-primary">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ep-text-muted">
                {step.description}
              </p>
            </div>
          </motion.li>
        )
      })}
    </motion.ol>
  )
}
