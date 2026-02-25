'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

import { ChevronDown, User } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'
import { renderBold } from '@/lib/utils'

interface RdvQuestionCardProps {
  number: number
  question: string
  example?: string
  persona?: string
  children: ReactNode
}

export function RdvQuestionCard({
  number,
  question,
  example,
  persona,
  children,
}: RdvQuestionCardProps) {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className={cn(
        'mt-4 overflow-hidden rounded-xl border bg-white transition-all duration-300',
        open
          ? 'border-ep-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
          : 'border-ep-separator shadow-[0_2px_8px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 p-5 text-left"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ep-primary text-sm font-bold text-white">
          {number}
        </span>
        <span className="flex-1 text-sm font-bold text-ep-text-primary md:text-base">
          {question}
        </span>
        <ChevronDown
          className={cn(
            'size-5 shrink-0 text-ep-text-muted transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25, ease: 'easeOut' }}
          >
            <div className="border-t border-ep-separator px-5 pb-5 pt-4">
              <div className="pl-12 text-sm leading-relaxed text-ep-text-muted">
                {renderBold(children)}
              </div>

              {example && (
                <div className="ml-12 mt-4 rounded-lg border border-ep-primary/15 bg-ep-primary/5 p-4">
                  {persona && (
                    <div className="mb-2 flex items-center gap-2">
                      <User className="size-4 text-ep-primary" />
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
