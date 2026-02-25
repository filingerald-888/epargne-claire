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
    myth: "Mon argent est bloqué jusqu\u2019à 65 ans.",
    reality: (
      <>
        La loi prévoit <strong className="text-ep-text-primary">6 cas de déblocage anticipé</strong> : achat de votre résidence principale, invalidité, surendettement, fin de droits au chômage, cessation d'activité non salariée, décès du conjoint.
      </>
    ),
  },
  {
    myth: "Le PER, c\u2019est pour les vieux.",
    reality: (
      <>
        Commencer à 30{'\u00A0'}ans, c'est profiter de <strong className="text-ep-text-primary">35{'\u00A0'}ans d'effet boule de neige</strong>. Plus vous commencez tôt, plus votre épargne a le temps de croître — et plus vos économies d'impôts s'accumulent.
      </>
    ),
  },
  {
    myth: "Je paierai plus d\u2019impôts à la retraite qu\u2019aujourd\u2019hui.",
    reality: (
      <>
        À la retraite, vos revenus baissent. Votre <strong className="text-ep-text-primary">taux d'imposition est souvent plus bas</strong> qu'en activité. Vous déduisez à 30{'\u00A0'}% aujourd'hui et payez à 11{'\u00A0'}% demain — c'est tout l'intérêt du mécanisme.
      </>
    ),
  },
  {
    myth: "C\u2019est compliqué à gérer.",
    reality: (
      <>
        La plupart des PER proposent une <strong className="text-ep-text-primary">gestion automatique (pilotée)</strong> : un professionnel gère pour vous et sécurise progressivement votre épargne à l'approche de la retraite. Vous n'avez rien à faire.
      </>
    ),
  },
  {
    myth: "Tous les PER se valent.",
    reality: (
      <>
        Les frais varient énormément : <strong className="text-ep-text-primary">de 0,5{'\u00A0'}% à 1,2{'\u00A0'}% par an</strong> selon les contrats. Sur 25{'\u00A0'}ans, cette différence peut représenter <strong className="text-ep-text-primary">plusieurs milliers d'euros</strong> en moins sur votre capital retraite.
      </>
    ),
  },
]

export function PerMythBuster() {
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
