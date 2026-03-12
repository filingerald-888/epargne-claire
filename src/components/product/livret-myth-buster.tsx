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
    myth: "Le Livret A, c'est pour les pauvres.",
    reality: (
      <>
        Le Livret A est détenu par <strong className="text-ep-text-primary">plus de 55 millions de Français</strong>, tous revenus confondus. C'est la base de toute épargne : un matelas de sécurité accessible, garanti et sans impôt. Même les épargnants fortunés en possèdent un.
      </>
    ),
  },
  {
    myth: "Ça ne rapporte rien.",
    reality: (
      <>
        Le taux du Livret A (actuellement <strong className="text-ep-text-primary">1,5{'\u00A0'}%</strong>) est certes modeste, mais il est <strong className="text-ep-text-primary">net d'impôt et de charges sociales</strong>. Un placement à 2{'\u00A0'}% brut soumis au PFU (30{'\u00A0'}%) ne rapporte que 1,4{'\u00A0'}% net. Le Livret A fait donc mieux dans ce cas.
      </>
    ),
  },
  {
    myth: "Mon argent dort sur le compte.",
    reality: (
      <>
        Votre épargne finance concrètement le <strong className="text-ep-text-primary">logement social</strong> en France (Livret A) et la <strong className="text-ep-text-primary">transition écologique</strong> (LDDS). C'est l'un des rares placements dont vous connaissez l'utilisation réelle.
      </>
    ),
  },
  {
    myth: "Il faut remplir son Livret A avant tout.",
    reality: (
      <>
        Non. L'objectif est de constituer une <strong className="text-ep-text-primary">épargne de précaution</strong> suffisante (3 à 6 mois de dépenses), pas de remplir le livret au plafond. Au-delà de ce matelas, d'autres placements sont <strong className="text-ep-text-primary">plus adaptés</strong> pour faire fructifier votre argent.
      </>
    ),
  },
  {
    myth: "Le LDDS ne sert à rien si j'ai déjà un Livret A.",
    reality: (
      <>
        Même taux, même garantie, même fiscalité. Le LDDS offre <strong className="text-ep-text-primary">12{'\u00A0'}000{'\u00A0'}€ de plafond supplémentaire</strong>. Si votre Livret A est au maximum, le LDDS est le prolongement naturel de votre épargne de précaution.
      </>
    ),
  },
]

export function LivretMythBuster() {
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
