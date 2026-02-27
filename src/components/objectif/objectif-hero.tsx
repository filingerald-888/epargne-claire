'use client'

import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { useHeroVisibility } from '@/lib/hero-context'
import { cn } from '@/lib/utils'

const colorGradients: Record<string, string> = {
  securiser: 'from-emerald-50 via-emerald-100/40 to-white',
  projets: 'from-blue-50 via-blue-100/40 to-white',
  retraite: 'from-amber-50 via-amber-100/40 to-white',
  transmission: 'from-purple-50 via-purple-100/40 to-white',
}

interface ObjectifHeroProps {
  emoji: string
  title: string
  subtitle: string
  body: string
  colorKey: string
  heroImage?: string
}

export function ObjectifHero({ emoji, title, subtitle, body, colorKey, heroImage }: ObjectifHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { setHeroVisible } = useHeroVisibility()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  useEffect(() => {
    if (!heroImage) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [heroImage, setHeroVisible])

  /* --- Variante avec image de fond --- */
  if (heroImage) {
    return (
      <div
        ref={ref}
        className="relative mx-[calc(-50vw+50%)] flex h-[70vh] w-screen items-center overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0"
          style={prefersReduced ? undefined : { y: bgY }}
          aria-hidden
        >
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-20 text-center md:px-8 md:py-32">
          {/* Title */}
          <motion.h1
            className="text-3xl font-bold text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.3 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-lg font-medium text-white/90 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          {/* Body */}
          <motion.p
            className="mx-auto mt-4 max-w-xl text-base text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.5 }}
          >
            {body}
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReduced ? 0 : 0.4, delay: 0.7 }}
          >
            <motion.div
              animate={prefersReduced ? undefined : { y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ChevronDown className="mx-auto size-7 text-white/40" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  /* --- Variante gradient coloré (fallback) --- */
  return (
    <div
      ref={ref}
      className={cn(
        'mx-[calc(-50vw+50%)] w-screen bg-gradient-to-b py-20 md:py-32',
        colorGradients[colorKey] ?? colorGradients.retraite
      )}
    >
      <div className="mx-auto max-w-[1200px] px-6 text-center md:px-8">
        <motion.span
          className="inline-block rounded-full bg-white/80 px-4 py-1.5 text-xs font-medium text-ep-text-muted shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.4, delay: 0.1 }}
        >
          Informations générales uniquement
        </motion.span>

        <motion.div
          className="mt-6 text-5xl md:text-6xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.2 }}
          role="img"
          aria-hidden
        >
          {emoji}
        </motion.div>

        <motion.h1
          className="mt-6 text-3xl font-bold text-ep-text-primary md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.3 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-2xl text-lg font-medium text-ep-text-primary md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-base text-ep-text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.5 }}
        >
          {body}
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.4, delay: 0.7 }}
        >
          <motion.div
            animate={prefersReduced ? undefined : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="mx-auto size-7 text-ep-text-muted/40" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
