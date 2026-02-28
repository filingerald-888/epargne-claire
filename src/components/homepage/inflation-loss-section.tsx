'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react'
import { TrendingDown, TrendingUp } from 'lucide-react'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'

// --- Constantes éducatives (placements sûrs uniquement) ---
const INFLATION_RATE = 0.02 // 2 %/an (cible BCE)

interface ProductDef {
  slug: string
  name: string
  subtitle: string
  rate: number
}

const LIVRET_A_PLAFOND = 22_950

const PRODUCTS: ProductDef[] = [
  {
    slug: 'livret-a-ldds',
    name: 'Livret A',
    subtitle: "Taux fixé par l\u2019État",
    rate: 0.03,
  },
  {
    slug: 'assurance-vie',
    name: 'Assurance-vie',
    subtitle: 'Fonds euros',
    rate: 0.03,
  },
  {
    slug: 'per',
    name: 'PER',
    subtitle: 'Profil sécurisé',
    rate: 0.03,
  },
]

const SLIDER_MIN = 1_000
const SLIDER_MAX = 150_000
const SLIDER_STEP = 1_000
const SLIDER_DEFAULT = 10_000

// --- Helpers ---
function dailyLoss(amount: number): number {
  return amount * INFLATION_RATE / 365
}

function dailyGain(amount: number, rate: number): number {
  return amount * rate / 365
}

function annualAmount(amount: number, rate: number): number {
  return amount * rate
}

function formatEuro(value: number, decimals: number = 2): string {
  return value.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function formatEuroInt(value: number): string {
  return Math.round(value).toLocaleString('fr-FR')
}

// --- Animated number (initial scroll-in only) ---
function AnimatedLoss({
  target,
  isInView,
  prefersReduced,
  hasAnimated,
}: {
  target: number
  isInView: boolean
  prefersReduced: boolean | null
  hasAnimated: boolean
}) {
  const [display, setDisplay] = useState('0,00')

  useEffect(() => {
    // After initial animation, update directly on slider change
    if (hasAnimated) {
      setDisplay(formatEuro(target))
      return
    }
    if (!isInView) return

    if (prefersReduced) {
      setDisplay(formatEuro(target))
      return
    }

    const controls = animate(0, target, {
      duration: 1.2,
      ease: 'easeOut',
      delay: 0.3,
      onUpdate(latest) {
        setDisplay(formatEuro(latest))
      },
      onComplete() {
        setDisplay(formatEuro(target))
      },
    })

    return () => controls.stop()
  }, [isInView, target, prefersReduced, hasAnimated])

  return <>{display}</>
}

// --- Product card (tous au même niveau, pas de mise en avant) ---
function ProductCard({
  name,
  subtitle,
  dailyValue,
  annualValue,
  isCapped,
  cappedAt,
  isInView,
  prefersReduced,
  hasAnimated,
}: {
  name: string
  subtitle: string
  dailyValue: number
  annualValue: number
  isCapped?: boolean
  cappedAt?: number
  isInView: boolean
  prefersReduced: boolean | null
  hasAnimated: boolean
}) {
  const [displayDaily, setDisplayDaily] = useState('0,00')
  const [displayAnnual, setDisplayAnnual] = useState('0')

  useEffect(() => {
    if (hasAnimated) {
      setDisplayDaily(formatEuro(dailyValue))
      setDisplayAnnual(formatEuroInt(annualValue))
      return
    }
    if (!isInView) return

    if (prefersReduced) {
      setDisplayDaily(formatEuro(dailyValue))
      setDisplayAnnual(formatEuroInt(annualValue))
      return
    }

    const c1 = animate(0, dailyValue, {
      duration: 1,
      ease: 'easeOut',
      delay: 0.6,
      onUpdate(v) { setDisplayDaily(formatEuro(v)) },
      onComplete() { setDisplayDaily(formatEuro(dailyValue)) },
    })

    const c2 = animate(0, annualValue, {
      duration: 1,
      ease: 'easeOut',
      delay: 0.8,
      onUpdate(v) { setDisplayAnnual(formatEuroInt(v)) },
      onComplete() { setDisplayAnnual(formatEuroInt(annualValue)) },
    })

    return () => { c1.stop(); c2.stop() }
  }, [isInView, dailyValue, annualValue, prefersReduced, hasAnimated])

  return (
    <div className="rounded-xl border border-ep-separator bg-white p-5 text-center transition-all duration-300">
      <p className="text-sm font-bold text-ep-text-primary">{name}</p>
      <p className="text-xs text-ep-text-muted">{subtitle}</p>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        <TrendingUp className="size-4 text-emerald-600" aria-hidden />
        <p className="text-2xl font-bold text-emerald-600">
          +{displayDaily}{'\u00A0'}€
        </p>
      </div>
      <p className="text-xs text-ep-text-muted">par jour</p>

      <p className="mt-2 text-sm font-semibold text-emerald-600/80">
        +{displayAnnual}{'\u00A0'}€/an
      </p>

      {isCapped && cappedAt && (
        <p className="mt-2 text-[10px] leading-tight text-ep-text-muted">
          Plafonné à {cappedAt.toLocaleString('fr-FR')}{'\u00A0'}€
        </p>
      )}
    </div>
  )
}

// --- Section principale ---
export function InflationLossSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [amount, setAmount] = useState(SLIDER_DEFAULT)

  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  // Mark initial animation as done after first scroll-in
  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 1800)
      return () => clearTimeout(timer)
    }
  }, [isInView, hasAnimated])

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(Number(e.target.value))
    },
    []
  )

  // Computed values
  const loss = dailyLoss(amount)
  const annualLoss = annualAmount(amount, INFLATION_RATE)
  // Le gain le plus élevé parmi les placements sûrs (en tenant compte du plafond Livret A)
  const bestSafeAnnualGain = PRODUCTS.reduce((best, p) => {
    const effective = p.slug === 'livret-a-ldds' ? Math.min(amount, LIVRET_A_PLAFOND) : amount
    const gain = annualAmount(effective, p.rate)
    return gain > best ? gain : best
  }, 0)

  // Slider fill percentage for styling
  const sliderPercent =
    ((amount - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100

  return (
    <motion.section
      ref={sectionRef}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="pt-4 pb-16 md:pt-6 md:pb-24"
      aria-label="Le saviez-vous : impact de l'inflation sur votre épargne"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-ep-primary">
            Le saviez-vous ?
          </p>
        </motion.div>

        {/* Loss card */}
        <motion.div
          variants={itemVariants}
          className="mt-8 rounded-2xl bg-ep-bg-warm-subtle px-6 py-8 md:px-10 md:py-10"
        >
          <p className="text-center text-lg text-ep-text-primary md:text-xl">
            Chaque jour, vous perdez
          </p>

          {/* Big loss number */}
          <div
            className="mt-4 flex items-center justify-center gap-2"
            aria-live="polite"
          >
            <TrendingDown
              className="size-8 text-red-500 md:size-10"
              aria-hidden
            />
            <p className="text-4xl font-bold text-red-500 md:text-6xl">
              <AnimatedLoss
                target={loss}
                isInView={isInView}
                prefersReduced={prefersReduced}
                hasAnimated={hasAnimated}
              />
              {'\u00A0'}€
            </p>
          </div>

          <p className="mt-2 text-center text-base text-ep-text-muted md:text-lg">
            de pouvoir d'achat sur{' '}
            <strong className="text-ep-text-primary">
              {amount.toLocaleString('fr-FR')}{'\u00A0'}€
            </strong>{' '}
            laissés sur un compte courant
          </p>

          {/* Slider */}
          <div className="mx-auto mt-6 max-w-md">
            <label
              htmlFor="inflation-amount"
              className="sr-only"
            >
              Montant sur votre compte courant
            </label>
            <input
              id="inflation-amount"
              type="range"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={SLIDER_STEP}
              value={amount}
              onChange={handleSliderChange}
              className="inflation-slider w-full cursor-pointer"
              aria-valuetext={`${amount.toLocaleString('fr-FR')} euros`}
              style={{
                // Dynamic fill via CSS custom property
                '--slider-percent': `${sliderPercent}%`,
              } as React.CSSProperties}
            />
            <div className="mt-1 flex justify-between text-xs text-ep-text-muted">
              <span>{SLIDER_MIN.toLocaleString('fr-FR')}{'\u00A0'}€</span>
              <span className="font-semibold text-ep-text-primary">
                {amount.toLocaleString('fr-FR')}{'\u00A0'}€
              </span>
              <span>{SLIDER_MAX.toLocaleString('fr-FR')}{'\u00A0'}€</span>
            </div>
          </div>

          {/* Annual loss */}
          <p className="mt-4 text-center text-sm text-red-500/80">
            Soit{' '}
            <strong>{formatEuroInt(annualLoss)}{'\u00A0'}€ perdus par an</strong>
            {' '}en pouvoir d'achat
          </p>
        </motion.div>

        {/* Comparison products */}
        <motion.div variants={itemVariants} className="mt-10">
          <p className="text-center text-base font-medium text-ep-text-primary md:text-lg">
            Même les placements les plus sûrs protègent votre épargne :
          </p>

          <div
            className="mt-6 grid gap-4 sm:grid-cols-3"
            aria-live="polite"
          >
            {PRODUCTS.map((product) => {
              const isLivretA = product.slug === 'livret-a-ldds'
              const effectiveAmount = isLivretA ? Math.min(amount, LIVRET_A_PLAFOND) : amount
              const isCapped = isLivretA && amount > LIVRET_A_PLAFOND

              return (
                <ProductCard
                  key={product.slug}
                  name={product.name}
                  subtitle={product.subtitle}
                  dailyValue={dailyGain(effectiveAmount, product.rate)}
                  annualValue={annualAmount(effectiveAmount, product.rate)}
                  isCapped={isCapped}
                  cappedAt={isCapped ? LIVRET_A_PLAFOND : undefined}
                  isInView={isInView}
                  prefersReduced={prefersReduced}
                  hasAnimated={hasAnimated}
                />
              )
            })}
          </div>
        </motion.div>

        {/* Gap summary + CTA */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-base text-ep-text-muted md:text-lg">
            Sans prendre aucun risque, un placement sûr peut rapporter jusqu'à{' '}
            <strong className="text-ep-text-primary">
              {formatEuroInt(bestSafeAnnualGain)}{'\u00A0'}€/an
            </strong>
            .{' '}L'inaction a un coût réel.
          </p>

          {/* Disclaimer */}
          <p className="mx-auto mt-6 max-w-lg text-xs leading-relaxed text-ep-text-muted/70">
            Taux indicatifs à visée éducative (inflation 2{'\u00A0'}%,
            rendements moyens historiques). Les performances passées ne
            préjugent pas des performances futures. Ceci ne constitue pas un
            conseil en investissement.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
