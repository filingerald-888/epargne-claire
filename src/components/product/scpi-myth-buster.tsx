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
    myth: "Les SCPI, c\u2019est réservé aux riches.",
    reality: (
      <>
        De nombreuses SCPI sont accessibles <strong className="text-ep-text-primary">à partir de 200{'\u00A0'}€</strong>. Certaines proposent même des versements programmés mensuels. Pas besoin d'être propriétaire pour investir dans l'immobilier.
      </>
    ),
  },
  {
    myth: "C\u2019est comme acheter un appartement.",
    reality: (
      <>
        Pas du tout. Vous n'êtes pas propriétaire d'un bien, mais <strong className="text-ep-text-primary">d'une part d'une société</strong> qui possède des dizaines d'immeubles. Pas de gestion locative, pas de travaux, pas de locataires à trouver.
      </>
    ),
  },
  {
    myth: "Le rendement est garanti.",
    reality: (
      <>
        Non. Le rendement dépend des loyers effectivement perçus. En cas de <strong className="text-ep-text-primary">vacance locative ou de baisse du marché</strong>, les revenus distribués peuvent diminuer. Il n'y a aucune garantie de rendement.
      </>
    ),
  },
  {
    myth: "On peut revendre ses parts facilement.",
    reality: (
      <>
        La revente est possible mais <strong className="text-ep-text-primary">pas immédiate</strong>. Contrairement aux actions en Bourse, il n'y a pas de marché instantané. Le délai de revente peut aller de quelques semaines à plusieurs mois.
      </>
    ),
  },
  {
    myth: "Les frais sont les mêmes partout.",
    reality: (
      <>
        Les frais varient fortement : <strong className="text-ep-text-primary">de 0{'\u00A0'}% à 12{'\u00A0'}%</strong> de frais de souscription selon les SCPI. Les nouvelles SCPI sans frais d'entrée se développent, mais attention aux frais de gestion qui peuvent être plus élevés.
      </>
    ),
  },
]

export function ScpiMythBuster() {
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
          <div className="flex items-start gap-3 border-b border-ep-separator bg-red-50 p-4">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-red-100">
              <UserRound className="size-4 text-red-500" />
            </div>
            <p className="mt-1 text-sm font-bold text-ep-text-primary">
              « {item.myth} »
            </p>
          </div>
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
