'use client'

import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

export function AProposHero() {
  const prefersReduced = useReducedMotion()
  const dur = prefersReduced ? 0 : 0.4

  return (
    <div className="mx-[calc(-50vw+50%)] flex min-h-[60vh] w-screen items-center overflow-hidden bg-blue-100">
      {/* Content */}
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 text-center md:px-8 md:py-32">
        <motion.h1
          className="font-sans text-3xl font-bold text-ep-primary md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.1 }}
        >
          Pourquoi EpargneClaire existe.
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-2xl text-base text-ep-primary/70 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.2 }}
        >
          Un projet personnel né d&apos;une frustration simple : pourquoi l&apos;épargne est-elle si compliquée à comprendre ?
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur, delay: 0.5 }}
        >
          <motion.div
            animate={prefersReduced ? undefined : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="mx-auto size-8 text-blue-900/30" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
