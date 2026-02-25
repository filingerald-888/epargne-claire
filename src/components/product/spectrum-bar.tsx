'use client'

import { Shield, Scale, TrendingUp } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'

interface SpectrumBarProps {
  leftLabel: string
  rightLabel: string
  markers: string[]
  caption?: React.ReactNode
}

export function SpectrumBar({ leftLabel, rightLabel, markers, caption }: SpectrumBarProps) {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mx-auto mb-12 max-w-xl"
    >
      {/* Visual illustration */}
      <div className="mb-8 flex items-end justify-center gap-6 sm:gap-8" aria-hidden>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-14 items-center justify-center rounded-lg border border-emerald-300 bg-emerald-100 sm:w-16">
            <Shield className="size-5 text-emerald-600" />
          </div>
          <span className="text-[11px] text-ep-text-muted sm:text-xs">S&eacute;curis&eacute;</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-14 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 sm:w-16">
            <Scale className="size-5 text-blue-600" />
          </div>
          <span className="text-[11px] text-ep-text-muted sm:text-xs">&Eacute;quilibr&eacute;</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-20 w-14 items-center justify-center rounded-lg border border-amber-300 bg-amber-100 sm:w-16">
            <TrendingUp className="size-5 text-amber-600" />
          </div>
          <span className="text-[11px] text-ep-text-muted sm:text-xs">Dynamique</span>
        </div>
      </div>

      {/* Labels */}
      <div className="mb-3 flex justify-between text-xs font-medium text-ep-text-primary sm:text-sm">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>

      {/* Bar */}
      <div className="relative h-3 overflow-hidden rounded-full bg-gradient-to-r from-emerald-200 via-blue-200 to-amber-200">
        {markers.map((_, i) => {
          const position = markers.length === 1 ? 50 : (i / (markers.length - 1)) * 100
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ep-primary shadow-md"
              style={{ left: `${position}%` }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReduced ? 0 : 0.3,
                delay: prefersReduced ? 0 : 0.2 + i * 0.15,
              }}
            />
          )
        })}
      </div>

      {/* Marker labels — flex layout, text wraps naturally */}
      <div className="mt-2 flex justify-between">
        {markers.map((label, i) => (
          <span
            key={i}
            className="text-center text-[11px] leading-tight text-ep-text-muted sm:text-xs"
            style={{ width: `${100 / markers.length}%` }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Caption */}
      {caption && (
        <p className="mt-6 text-center text-sm text-ep-text-muted">{caption}</p>
      )}
    </motion.div>
  )
}
