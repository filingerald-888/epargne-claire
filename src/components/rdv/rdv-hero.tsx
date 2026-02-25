'use client'

import { ChevronDown, Clock } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import type { RdvFrontmatter } from '@/types/rdv'

import { DisclaimerBanner } from '@/components/content/disclaimer-banner'
import { RdvNavTabs } from '@/components/rdv/rdv-nav-tabs'
import { useHeroVisibility } from '@/lib/hero-context'

interface RdvHeroProps {
  frontmatter: RdvFrontmatter
  currentSlug: string
}

export function RdvHero({ frontmatter, currentSlug }: RdvHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const dur = prefersReduced ? 0 : 0.4
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
      className="relative mx-[calc(-50vw+50%)] flex min-h-[80vh] w-screen items-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? undefined : { y: bgY }}
        aria-hidden
      >
        <Image
          src="/images/hero-rdv.jpg"
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
        {/* Title */}
        <motion.h1
          className="text-3xl font-bold text-white md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.1 }}
        >
          {frontmatter.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.2 }}
        >
          {frontmatter.subtitle}
        </motion.p>

        {/* Meta */}
        <motion.div
          className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur, delay: 0.3 }}
        >
          <Clock className="size-4" />
          <span>~{frontmatter.readingTime} min de lecture</span>
        </motion.div>

        {/* Nav tabs */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.4 }}
        >
          <RdvNavTabs currentSlug={currentSlug} />
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur, delay: 0.5 }}
        >
          <DisclaimerBanner variant="rdv" />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur, delay: 0.7 }}
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
