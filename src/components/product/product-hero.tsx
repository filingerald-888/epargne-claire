'use client'

import type { ProductFrontmatter } from '@/types/product'

import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { useHeroVisibility } from '@/lib/hero-context'
import { cn } from '@/lib/utils'

const objectifColors: Record<string, { bg: string; text: string }> = {
  securiser: { bg: 'bg-securiser-bg', text: 'text-securiser-text' },
  'projets-de-vie': { bg: 'bg-projets-bg', text: 'text-projets-text' },
  retraite: { bg: 'bg-retraite-bg', text: 'text-retraite-text' },
  transmission: { bg: 'bg-transmission-bg', text: 'text-transmission-text' },
}

function formatDateFR(isoDate: string): string {
  const date = new Date(isoDate + 'T12:00:00')
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface ProductHeroProps {
  frontmatter: ProductFrontmatter
}

export function ProductHero({ frontmatter }: ProductHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { setHeroVisible } = useHeroVisibility()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

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
      className="relative mx-[calc(-50vw+50%)] flex h-[70vh] w-screen items-center overflow-hidden"
    >
      {/* Parallax background — photo + dark overlay */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? undefined : { y: bgY }}
        aria-hidden
      >
        <Image
          src={frontmatter.heroImage ?? `/images/hero-${frontmatter.slug}.jpg`}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-20 text-center md:px-8 md:py-32">
        {/* Objective badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.4, delay: 0.1 }}
        >
          {frontmatter.objectifs.map((objectif, index) => {
            const colors = objectifColors[objectif]
            if (!colors) return null
            return (
              <span
                key={objectif}
                className={cn(
                  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                  colors.bg,
                  colors.text
                )}
              >
                {frontmatter.labelCouleur[index]}
              </span>
            )
          })}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mt-6 font-sans text-4xl font-bold text-white md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.2 }}
        >
          {frontmatter.title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-lg text-white/80 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.3 }}
        >
          {frontmatter.subtitle}
        </motion.p>

        {/* Meta */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.4, delay: 0.5 }}
        >
          <span>{frontmatter.readingTime} min de lecture</span>
          <span aria-hidden>|</span>
          <span>Mis à jour le {formatDateFR(frontmatter.lastUpdated)}</span>
        </motion.div>

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
            <ChevronDown className="mx-auto size-8 text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
