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
    myth: "L\u2019assurance-vie, c\u2019est pour les vieux.",
    reality: (
      <>
        L'assurance-vie s'ouvre <strong className="text-ep-text-primary">dès 18 ans</strong> et s'adapte à tous les âges. Plus vous commencez tôt, plus le temps travaille pour vous. Un jeune de 25 ans qui place 100{'\u00A0'}€ par mois peut se constituer un <strong className="text-ep-text-primary">capital significatif en 10 ans</strong>.
      </>
    ),
  },
  {
    myth: "Mon argent est bloqu\u00E9.",
    reality: (
      <>
        Vous pouvez retirer votre argent <strong className="text-ep-text-primary">à tout moment</strong>, sans aucun blocage. Avant 8 ans, vous payez un peu plus d'impôts sur vos gains. Après 8 ans, vous bénéficiez d'un avantage fiscal — mais <strong className="text-ep-text-primary">l'argent reste toujours disponible</strong>.
      </>
    ),
  },
  {
    myth: "C\u2019est compliqu\u00E9 \u00E0 g\u00E9rer.",
    reality: (
      <>
        Ouvrir un contrat en ligne prend <strong className="text-ep-text-primary">moins de 15 minutes</strong>. Vous pouvez choisir un fonds euros (capital garanti, rien à faire) ou une <strong className="text-ep-text-primary">gestion pilotée</strong> (un professionnel gère pour vous). Pas besoin d'être expert.
      </>
    ),
  },
  {
    myth: "Le fonds euros rapporte beaucoup.",
    reality: (
      <>
        Le fonds euros rapporte entre <strong className="text-ep-text-primary">2 et 3{'\u00A0'}% par an</strong> en moyenne. C'est mieux qu'un Livret{'\u00A0'}A, mais ce n'est pas un placement à fort rendement. Son atout principal, c'est la <strong className="text-ep-text-primary">sécurité : votre capital est garanti</strong>.
      </>
    ),
  },
  {
    myth: "Toutes les assurances-vie se valent.",
    reality: (
      <>
        Les frais varient énormément d'un contrat à l'autre : <strong className="text-ep-text-primary">de 0,5{'\u00A0'}% à 1,2{'\u00A0'}% par an</strong> sur les unités de compte. Sur 20{'\u00A0'}ans, cette différence peut représenter <strong className="text-ep-text-primary">plusieurs milliers d'euros</strong>. Comparer les contrats avant de souscrire est essentiel.
      </>
    ),
  },
  {
    myth: "Il faut beaucoup d\u2019argent pour ouvrir.",
    reality: (
      <>
        Certains contrats en ligne acceptent une ouverture <strong className="text-ep-text-primary">dès 100{'\u00A0'}€</strong>. Vous pouvez ensuite alimenter votre contrat à votre rythme, <strong className="text-ep-text-primary">sans montant minimum de versement</strong> chez la plupart des assureurs en ligne.
      </>
    ),
  },
]

export function AvMythBuster() {
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
