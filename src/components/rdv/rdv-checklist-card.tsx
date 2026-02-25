'use client'

import { User } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn, renderBold } from '@/lib/utils'

type Phase = 'before' | 'during' | 'after'

interface RdvChecklistCardProps {
  number: number
  title: string
  description: string
  phase?: Phase
  example?: string
  persona?: string
}

const phaseConfig: Record<Phase, { numBg: string; numText: string }> = {
  before: {
    numBg: 'bg-emerald-100',
    numText: 'text-emerald-700',
  },
  during: {
    numBg: 'bg-blue-100',
    numText: 'text-blue-700',
  },
  after: {
    numBg: 'bg-violet-100',
    numText: 'text-violet-700',
  },
}

export function RdvChecklistCard({
  number,
  title,
  description,
  phase = 'before',
  example,
  persona,
}: RdvChecklistCardProps) {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants
  const config = phaseConfig[phase]

  return (
    <motion.div
      variants={variants}
      className={cn(
        'mt-4 rounded-xl border border-ep-separator bg-white shadow-[0_2px_8px_rgb(0,0,0,0.06)] transition-all duration-300',
        'hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
      )}
    >
      <div className="flex items-start gap-4 p-5">
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold',
            config.numBg,
            config.numText
          )}
        >
          {number}
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-ep-text-primary md:text-base">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ep-text-muted">
            {renderBold(description)}
          </p>

          {example && (
            <div className="mt-3 rounded-lg border border-ep-primary/15 bg-ep-primary/5 p-3">
              {persona && (
                <div className="mb-1.5 flex items-center gap-2">
                  <User className="size-3.5 text-ep-primary" />
                  <span className="text-xs font-semibold text-ep-primary">
                    {persona}
                  </span>
                </div>
              )}
              <p className="text-sm leading-relaxed text-ep-text-muted">
                {renderBold(example)}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
