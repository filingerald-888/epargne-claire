'use client'

import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

import { useHeroVisibility } from '@/lib/hero-context'

interface GlossaireHeroProps {
  termCount: number
}

export function GlossaireHero({ termCount }: GlossaireHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const dur = prefersReduced ? 0 : 0.4
  const { setHeroVisible } = useHeroVisibility()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [setHeroVisible])

  return (
    <div
      ref={ref}
      className="relative mx-[calc(-50vw+50%)] flex min-h-[60vh] w-screen items-center overflow-hidden bg-ep-primary"
    >
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-20 text-center md:px-8 md:py-32">
        <motion.h1
          className="font-sans text-3xl font-bold text-white md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.1 }}
        >
          Le jargon financier,<br />traduit en français.
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.2 }}
        >
          Chaque terme expliqué simplement, avec des exemples concrets quand c&apos;est utile.
        </motion.p>

        <motion.p
          className="mt-4 text-sm font-medium text-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.3 }}
        >
          {termCount} termes expliqués
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
            <ChevronDown className="mx-auto size-8 text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
