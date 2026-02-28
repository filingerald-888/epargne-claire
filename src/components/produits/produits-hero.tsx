'use client'

import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { useHeroVisibility } from '@/lib/hero-context'

export function ProduitsHero() {
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
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? undefined : { y: bgY }}
        aria-hidden
      >
        <Image
          src="/images/hero-produits.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-20 pt-28 text-center md:px-8 md:pb-32 md:pt-40">
        <motion.h1
          className="font-sans text-3xl font-bold text-white md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.1 }}
        >
          Arrêtez de hocher la tête<br />quand votre banquier parle.
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, delay: 0.2 }}
        >
          Assurance-vie, PEA, PER, SCPI, Livret A : enfin expliqués sans jargon.
        </motion.p>

        {/* Disclaimer */}
        <motion.p
          className="mx-auto mt-6 max-w-xl text-center text-[11px] text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur, delay: 0.4 }}
        >
          Cette page est à vocation informative. Elle ne constitue pas une recommandation d'investissement.
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
