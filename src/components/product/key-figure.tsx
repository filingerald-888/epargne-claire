'use client'

import { useEffect, useRef, useState } from 'react'

import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'

function parseValue(value: string) {
  const match = value.match(/^([^0-9]*)([0-9\s,.]+)(.*)$/)
  if (!match) return null
  const prefix = match[1]
  const rawNumber = match[2]
  const suffix = match[3]
  const hasSpace = rawNumber.includes(' ')
  const normalised = rawNumber.replace(/\s/g, '').replace(',', '.')
  const number = parseFloat(normalised)
  if (isNaN(number)) return null
  const decimalPart = normalised.split('.')[1]
  const decimals = decimalPart ? decimalPart.length : 0
  return { prefix, number, suffix, hasSpace, decimals }
}

function formatNumber(n: number, hasSpace: boolean, decimals: number): string {
  if (decimals === 0) {
    const rounded = Math.round(n)
    return hasSpace ? rounded.toLocaleString('fr-FR') : String(rounded)
  }
  return n.toFixed(decimals).replace('.', ',')
}

interface KeyFigureProps {
  value: string
  label?: string
  description?: React.ReactNode
}

export function KeyFigure({ value, label, description }: KeyFigureProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [displayValue, setDisplayValue] = useState(value)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const yOffset = useTransform(scrollYProgress, [0, 1], [15, -15])

  useEffect(() => {
    if (!isInView) return
    const parsed = parseValue(value)
    if (!parsed || prefersReduced) {
      setDisplayValue(value)
      return
    }

    const controls = animate(0, parsed.number, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplayValue(`${parsed.prefix}${formatNumber(latest, parsed.hasSpace, parsed.decimals)}${parsed.suffix}`)
      },
      onComplete() {
        setDisplayValue(value)
      },
    })

    return () => controls.stop()
  }, [isInView, value, prefersReduced])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: prefersReduced ? 0 : 0.4, ease: 'easeOut' }}
      className="text-center"
    >
      <motion.p
        className="text-4xl font-bold text-ep-primary transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(37,99,235,0.3)] md:text-6xl"
        style={prefersReduced ? undefined : { y: yOffset }}
      >
        {displayValue}
      </motion.p>
      {label && (
        <p className="mt-2 text-lg text-ep-text-primary">{label}</p>
      )}
      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm text-ep-text-muted">
          {description}
        </p>
      )}
    </motion.div>
  )
}
