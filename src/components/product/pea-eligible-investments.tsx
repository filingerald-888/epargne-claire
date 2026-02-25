'use client'

import { Check, Lightbulb, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

interface EligibleItem {
  eligible: boolean
  title: string
  description: React.ReactNode
}

const items: EligibleItem[] = [
  {
    eligible: true,
    title: 'Actions françaises',
    description: (
      <>
        TotalEnergies, LVMH, Air Liquide, Schneider Electric… <strong className="text-ep-text-primary">Toutes les entreprises cotées en France.</strong>
      </>
    ),
  },
  {
    eligible: true,
    title: 'Actions européennes',
    description: (
      <>
        SAP, ASML, Nestlé, Siemens… Les entreprises cotées dans <strong className="text-ep-text-primary">l'Union européenne et l'Espace économique européen</strong>.
      </>
    ),
  },
  {
    eligible: true,
    title: 'Fonds indiciels éligibles',
    description: (
      <>
        Des paniers d'actions qui suivent un indice boursier (les 40{'\u00A0'}plus grandes entreprises françaises, les 500{'\u00A0'}plus grandes mondiales…). <strong className="text-ep-text-primary">Le moyen le plus simple d'investir.</strong>
      </>
    ),
  },
  {
    eligible: true,
    title: 'Fonds d\u2019investissement',
    description: (
      <>
        Des fonds gérés par des professionnels, investis à <strong className="text-ep-text-primary">75{'\u00A0'}% minimum en actions européennes</strong>. Vous déléguez les choix.
      </>
    ),
  },
  {
    eligible: false,
    title: 'Actions américaines directes',
    description: (
      <>
        Apple, Tesla, Amazon, Microsoft… <strong className="text-ep-text-primary">Pas directement éligibles.</strong> Mais accessibles via un fonds indiciel mondial éligible au PEA.
      </>
    ),
  },
  {
    eligible: false,
    title: 'Obligations, crypto, immobilier',
    description: (
      <>
        Les obligations d'État, les cryptomonnaies et l'immobilier direct <strong className="text-ep-text-primary">ne sont pas éligibles au PEA</strong>.
      </>
    ),
  },
]

export function PeaEligibleInvestments() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="mx-auto max-w-4xl"
    >
      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className={cn(
              'rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
              item.eligible
                ? 'border-emerald-200 bg-emerald-50/50'
                : 'border-red-200 bg-red-50/50'
            )}
          >
            <div className="mb-3 flex items-center gap-2">
              <div
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full',
                  item.eligible ? 'bg-emerald-100' : 'bg-red-100'
                )}
              >
                {item.eligible ? (
                  <Check className="size-4 text-emerald-600" />
                ) : (
                  <X className="size-4 text-red-500" />
                )}
              </div>
              <h3 className="text-sm font-bold text-ep-text-primary">
                {item.title}
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-ep-text-muted">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Astuce callout */}
      <motion.div
        variants={itemVariants}
        className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-4"
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <Lightbulb className="size-4 text-amber-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-ep-text-primary">Astuce</p>
          <p className="mt-0.5 text-sm leading-relaxed text-ep-text-muted">
            Un <strong className="text-ep-text-primary">fonds indiciel mondial éligible au PEA</strong> vous
            permet d'investir indirectement dans le monde entier (États-Unis, Japon, etc.)
            tout en profitant de la fiscalité avantageuse du PEA.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
