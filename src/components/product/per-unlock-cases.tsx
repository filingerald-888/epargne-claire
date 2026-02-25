'use client'

import {
  AlertTriangle,
  Banknote,
  Heart,
  Home,
  Scale,
  Shield,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  staggerContainerVariants,
  fadeInVariants,
  reducedFadeInVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

interface UnlockCase {
  icon: LucideIcon
  title: string
  description: string
  highlighted?: boolean
}

const cases: UnlockCase[] = [
  {
    icon: Home,
    title: 'Achat de votre r\u00E9sidence principale',
    description:
      'Vous pouvez utiliser votre PER pour acheter la maison ou l\u2019appartement dans lequel vous vivrez. C\u2019est le cas de d\u00E9blocage le plus utilis\u00E9.',
    highlighted: true,
  },
  {
    icon: Shield,
    title: 'Invalidit\u00E9',
    description:
      'En cas d\u2019invalidit\u00E9 reconnue (vous, votre conjoint ou vos enfants), votre \u00E9pargne est d\u00E9blocable imm\u00E9diatement.',
  },
  {
    icon: Heart,
    title: 'D\u00E9c\u00E8s du conjoint',
    description:
      'Si votre \u00E9poux, \u00E9pouse ou partenaire de PACS d\u00E9c\u00E8de, vous pouvez r\u00E9cup\u00E9rer votre \u00E9pargne.',
  },
  {
    icon: AlertTriangle,
    title: 'Fin de droits au ch\u00F4mage',
    description:
      'Si vous arrivez en fin de droits aux allocations ch\u00F4mage, votre PER peut \u00EAtre d\u00E9bloqu\u00E9.',
  },
  {
    icon: Scale,
    title: 'Surendettement',
    description:
      'En cas de situation de surendettement reconnue par une commission officielle.',
  },
  {
    icon: Banknote,
    title: 'Fin d\u2019activit\u00E9 non salari\u00E9e',
    description:
      'Si vous \u00E9tiez ind\u00E9pendant et que votre activit\u00E9 prend fin suite \u00E0 une fermeture forc\u00E9e de votre entreprise.',
  },
]

export function PerUnlockCases() {
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
      <div className="grid gap-4 sm:grid-cols-2">
        {cases.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className={cn(
                'rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
                c.highlighted
                  ? 'border-emerald-300 bg-emerald-50/50'
                  : 'border-ep-separator bg-white'
              )}
            >
              <div className="mb-3 flex items-start gap-3">
                <div
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full',
                    c.highlighted ? 'bg-emerald-100' : 'bg-ep-primary/10'
                  )}
                >
                  <Icon
                    className={cn(
                      'size-4',
                      c.highlighted ? 'text-emerald-600' : 'text-ep-primary'
                    )}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-ep-text-primary">{c.title}</h3>
                    {c.highlighted && (
                      <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        Le plus utilis&eacute;
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ep-text-muted">
                    {c.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Callout */}
      <motion.p
        variants={itemVariants}
        className="mt-6 text-center text-sm text-ep-text-muted"
      >
        Dans ces situations, le d&eacute;blocage est{' '}
        <strong className="text-ep-text-primary">sans imp&ocirc;t sur le revenu</strong>{' '}
        (sauf l&rsquo;achat de r&eacute;sidence principale, qui suit des r&egrave;gles sp&eacute;cifiques).
      </motion.p>
    </motion.div>
  )
}
