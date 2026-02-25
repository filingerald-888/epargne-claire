'use client'

import { Banknote, Landmark, Shuffle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

interface ExitOption {
  icon: LucideIcon
  title: string
  amount: string
  subtitle: string
  description: string
  recommended?: boolean
}

const options: ExitOption[] = [
  {
    icon: Banknote,
    title: 'Tout en capital',
    amount: '142 000 \u20AC avant imp\u00F4ts',
    subtitle: 'Somme vers\u00E9e en une fois',
    description:
      'Vous r\u00E9cup\u00E9rez tout d\u2019un coup. Vous payez des imp\u00F4ts sur cette somme l\u2019ann\u00E9e o\u00F9 vous la r\u00E9cup\u00E9rez. Id\u00E9al pour un projet important.',
  },
  {
    icon: Landmark,
    title: 'Rente mensuelle',
    amount: '\u2248 450 \u20AC/mois \u00E0 vie',
    subtitle: 'Revenu vers\u00E9 \u00E0 vie',
    description:
      'Vous recevez un revenu r\u00E9gulier chaque mois, impos\u00E9 comme une pension de retraite. Id\u00E9al pour vivre sereinement.',
  },
  {
    icon: Shuffle,
    title: 'Mix capital + rente',
    amount: '50 000 \u20AC + \u2248 290 \u20AC/mois',
    subtitle: 'Le plus courant',
    description:
      'Vous prenez une partie en capital pour vos projets imm\u00E9diats, et le reste en rente mensuelle pour le confort au quotidien.',
    recommended: true,
  },
]

export function PerExitOptions() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="mx-auto mt-12 max-w-4xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-ep-text-muted">
          &Agrave; la retraite
        </p>
        <p className="mt-1 text-xl font-bold text-ep-text-primary md:text-2xl">
          Trois fa&ccedil;ons de r&eacute;cup&eacute;rer votre &eacute;pargne
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ep-text-muted">
          Thomas a 60 ans. Son PER vaut <strong className="text-ep-text-primary">142 000 &euro;</strong>{' '}
          (78 000 &euro; vers&eacute;s + 64 000 &euro; de gains).
        </p>
      </motion.div>

      {/* Three cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {options.map((opt, i) => {
          const Icon = opt.icon
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className={cn(
                'rounded-xl border p-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
                opt.recommended
                  ? 'border-2 border-ep-primary bg-ep-primary/5'
                  : 'border-ep-separator bg-white'
              )}
            >
              <div
                className={cn(
                  'mx-auto mb-3 flex size-10 items-center justify-center rounded-full',
                  opt.recommended ? 'bg-ep-primary/10' : 'bg-gray-100'
                )}
              >
                <Icon
                  className={cn(
                    'size-5',
                    opt.recommended ? 'text-ep-primary' : 'text-ep-text-muted'
                  )}
                />
              </div>
              <h3 className="text-sm font-bold text-ep-text-primary">{opt.title}</h3>
              <p className={cn(
                'mt-2 text-xl font-bold',
                opt.recommended ? 'text-ep-primary' : 'text-ep-text-primary'
              )}>
                {opt.amount}
              </p>
              {opt.recommended && (
                <span className="mt-1 inline-block rounded-full bg-ep-primary/10 px-2 py-0.5 text-[10px] font-semibold text-ep-primary">
                  {opt.subtitle}
                </span>
              )}
              {!opt.recommended && (
                <p className="mt-1 text-xs text-ep-text-muted">{opt.subtitle}</p>
              )}
              <p className="mt-3 text-xs leading-relaxed text-ep-text-muted">
                {opt.description}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Summary */}
      <motion.p
        variants={itemVariants}
        className="mt-6 text-center text-sm text-ep-text-muted"
      >
        La plupart des &eacute;pargnants choisissent le <strong className="text-ep-text-primary">mix capital + rente</strong>{' '}
        : un capital pour les projets imm&eacute;diats, et une rente pour le confort mensuel.
      </motion.p>
    </motion.div>
  )
}
