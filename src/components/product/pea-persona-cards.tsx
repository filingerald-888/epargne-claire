'use client'

import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'

import { CarouselSection } from '@/components/homepage/carousel-section'
import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface Persona {
  image: string
  title: string
  description: React.ReactNode
}

const personas: Persona[] = [
  {
    image: '/images/personas/livret-jeune-actif.jpg',
    title: 'Jeune actif curieux',
    description: (
      <>
        Votre premier pas en Bourse. Même{' '}
        <strong className="text-ep-text-primary">50{'\u00A0'}€ par mois</strong>
        {' '}dans un fonds diversifié, c'est un début — et le temps joue pour vous.
      </>
    ),
  },
  {
    image: '/images/personas/investisseur-v3.jpg',
    title: 'Épargnant qui veut aller plus loin',
    description: (
      <>
        Votre Livret{'\u00A0'}A est au plafond. Vous cherchez un{' '}
        <strong className="text-ep-text-primary">rendement plus élevé</strong>
        {' '}en acceptant une part de risque.
      </>
    ),
  },
  {
    image: '/images/personas/prudent-v3.jpg',
    title: 'Investisseur régulier',
    description: (
      <>
        Une stratégie simple :{' '}
        <strong className="text-ep-text-primary">un fonds diversifié, un virement automatique</strong>
        . Pas besoin de suivre les marchés chaque jour.
      </>
    ),
  },
  {
    image: '/images/personas/per-cadre.jpg',
    title: 'Cadre ou indépendant',
    description: (
      <>
        Vous voulez{' '}
        <strong className="text-ep-text-primary">diversifier</strong>
        {' '}au-delà de l'immobilier et de l'assurance-vie. Le PEA complète votre patrimoine.
      </>
    ),
  },
  {
    image: '/images/personas/livret-parent.jpg',
    title: 'Parent qui anticipe',
    description: (
      <>
        Ouvrir un PEA{' '}
        <strong className="text-ep-text-primary">le plus tôt possible</strong>
        {' '}pour faire courir le compteur fiscal des 5 ans — même avec un petit montant.
      </>
    ),
  },
]

export function PeaPersonaCards() {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <CarouselSection itemCount={personas.length} dataAttribute="data-persona">
        {personas.map((persona, i) => (
          <div
            key={i}
            data-persona
            className={cn(
              'w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-ep-separator bg-white',
              'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)]',
              'sm:w-[300px]'
            )}
          >
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={persona.image}
                alt=""
                fill
                className={cn(
                  'object-cover transition-transform duration-500 hover:scale-105',
                  persona.image.includes('per-cadre') && 'object-[center_20%]'
                )}
                sizes="300px"
              />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-ep-text-primary">{persona.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ep-text-muted">
                {persona.description}
              </p>
            </div>
          </div>
        ))}
      </CarouselSection>

      <p className="mt-6 text-center text-sm text-ep-text-muted">
        <strong className="text-ep-text-primary">Un seul PEA par personne.</strong>
        {' '}Ouvert dès 18 ans.
      </p>
    </motion.div>
  )
}
