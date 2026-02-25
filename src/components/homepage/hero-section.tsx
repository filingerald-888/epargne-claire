'use client'

import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { useHeroVisibility } from '@/lib/hero-context'

export function HeroSection() {
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
      className="relative mx-[calc(-50vw+50%)] flex min-h-[100vh] w-screen items-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? undefined : { y: bgY }}
        aria-hidden
      >
        <Image
          src="/images/hero-homepage-v2.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_70%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-20 text-center md:px-8 md:py-32">
        {/* Title */}
        <motion.h1
          className="font-sans text-4xl font-bold text-white md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.2 }}
        >
          Comprendre votre &eacute;pargne, simplement.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.3 }}
        >
          L&rsquo;outil gratuit et neutre pour comprendre les produits
          patrimoniaux avant d&rsquo;agir.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.5 }}
        >
          <Link
            href="#objectifs"
            className="inline-flex min-h-[44px] items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ep-primary transition-all duration-200 hover:bg-white/90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
          >
            D&eacute;couvrir les objectifs&ensp;&rarr;
          </Link>
          <Link
            href="#produits"
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
          >
            Voir les produits&ensp;&rarr;
          </Link>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="mt-16"
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
