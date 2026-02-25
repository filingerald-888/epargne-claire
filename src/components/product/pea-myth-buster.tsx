'use client'

import { Check, UserRound } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'

interface Myth {
  myth: string
  reality: React.ReactNode
}

const myths: Myth[] = [
  {
    myth: "Le PEA, c\u2019est trop risqué.",
    reality: (
      <>
        Le risque dépend de ce que vous achetez. <strong className="text-ep-text-primary">Un fonds indiciel qui regroupe 500{'\u00A0'}entreprises est bien moins risqué qu'une seule action.</strong> Sur longue période, les marchés actions ont historiquement affiché une performance positive, mais ils peuvent connaître des phases prolongées de baisse.
      </>
    ),
  },
  {
    myth: "Il faut être expert en Bourse.",
    reality: (
      <>
        Un fonds indiciel se choisit en 5{'\u00A0'}minutes. Vous investissez dans <strong className="text-ep-text-primary">des centaines d'entreprises en un seul achat</strong>, sans avoir besoin de suivre les marchés au quotidien.
      </>
    ),
  },
  {
    myth: "Mon argent est bloqué pendant 5 ans.",
    reality: (
      <>
        Vous pouvez <strong className="text-ep-text-primary">retirer votre argent à tout moment</strong>. Avant 5{'\u00A0'}ans, vous perdez l'avantage fiscal et le PEA est clôturé. Après 5{'\u00A0'}ans, vous pouvez <strong className="text-ep-text-primary">retirer librement sans fermer votre PEA</strong>.
      </>
    ),
  },
  {
    myth: "Il faut beaucoup d\u2019argent pour commencer.",
    reality: (
      <>
        Certains courtiers en ligne permettent d'investir <strong className="text-ep-text-primary">dès 1{'\u00A0'}€</strong>. Il n'y a <strong className="text-ep-text-primary">pas de montant minimum légal</strong> pour ouvrir un PEA.
      </>
    ),
  },
  {
    myth: "Le PEA ne permet d\u2019acheter que des actions françaises.",
    reality: (
      <>
        Faux. Vous pouvez acheter des actions de <strong className="text-ep-text-primary">toute l'Union européenne</strong>. Et grâce à certains fonds indiciels éligibles, vous pouvez <strong className="text-ep-text-primary">investir indirectement dans le monde entier</strong> — y compris les États-Unis et l'Asie.
      </>
    ),
  },
]

export function PeaMythBuster() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mx-auto max-w-3xl space-y-4"
    >
      {myths.map((item, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className="overflow-hidden rounded-xl border border-ep-separator transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        >
          {/* Myth */}
          <div className="flex items-start gap-3 border-b border-ep-separator bg-red-50 p-4">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-red-100">
              <UserRound className="size-4 text-red-500" />
            </div>
            <p className="mt-1 text-sm font-bold text-ep-text-primary">
              « {item.myth} »
            </p>
          </div>

          {/* Reality */}
          <div className="flex items-start gap-3 bg-white p-4">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <Check className="size-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                En réalité
              </p>
              <p className="mt-0.5 text-sm leading-relaxed text-ep-text-muted">
                {item.reality}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
