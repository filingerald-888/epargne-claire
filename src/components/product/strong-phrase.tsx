'use client'

import { useRef } from 'react'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface StrongPhraseProps {
  title: string
  subtitle?: string
  gradient?: boolean
}

export function StrongPhrase({ title, subtitle, gradient }: StrongPhraseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97])

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mb-10 text-center md:mb-14"
      style={prefersReduced ? undefined : { scale }}
    >
      <div
        className="mx-auto mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-ep-primary to-ep-secondary"
        aria-hidden
      />
      <h2
        className={cn(
          'text-2xl font-bold md:text-4xl',
          gradient
            ? 'bg-gradient-to-r from-ep-primary to-ep-secondary bg-clip-text text-transparent'
            : 'text-ep-text-primary'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-ep-text-muted">{subtitle}</p>
      )}
    </motion.div>
  )
}
