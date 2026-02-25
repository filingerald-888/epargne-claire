'use client'

import type { ReactNode } from 'react'

import { motion, useReducedMotion } from 'motion/react'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Background = 'primary-subtle' | 'dark'

interface ProductSectionProps {
  children: ReactNode
  background?: Background
  compact?: boolean
  className?: string
}

const bgClasses: Record<Background, string> = {
  'primary-subtle': 'bg-ep-bg-blue-subtle',
  dark: 'bg-gradient-to-br from-blue-900 to-blue-800',
}

export function ProductSection({ children, background, compact, className }: ProductSectionProps) {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants
  const py = compact ? 'py-8 md:py-12' : 'py-16 md:py-24'

  if (background) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className={cn('mx-[calc(-50vw+50%)] w-screen', bgClasses[background], className)}
      >
        <div
          className={cn(
            'mx-auto max-w-[1200px] px-6 md:px-8 [&>:first-child]:mt-0',
            background === 'dark' && 'text-white',
            py
          )}
        >
          {children}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn('[&>:first-child]:mt-0', py, className)}
    >
      {children}
    </motion.div>
  )
}
