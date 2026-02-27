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
    image: '/images/personas/investisseur-v3.jpg',
    title: 'Investisseur patrimoine',
    description: (
      <>
        Vous cherchez à <strong className="text-ep-text-primary">diversifier votre patrimoine</strong> avec de l'immobilier, sans les contraintes de la gestion locative.
      </>
    ),
  },
  {
    image: '/images/personas/retraite-v2.jpg',
    title: 'Retraité en quête de revenus',
    description: (
      <>
        Vous souhaitez des <strong className="text-ep-text-primary">revenus complémentaires réguliers</strong> pour améliorer votre quotidien à la retraite.
      </>
    ),
  },
  {
    image: '/images/personas/prudent-v3.jpg',
    title: 'Épargnant long terme',
    description: (
      <>
        Vous avez un horizon de <strong className="text-ep-text-primary">8 à 10 ans minimum</strong> et acceptez un placement moins liquide en échange d'un rendement attractif.
      </>
    ),
  },
  {
    image: '/images/personas/transmission.jpg',
    title: 'Parent prévoyant',
    description: (
      <>
        Vous souhaitez <strong className="text-ep-text-primary">transmettre un patrimoine immobilier</strong> à vos enfants, avec des avantages fiscaux via le démembrement.
      </>
    ),
  },
]

export function ScpiPersonaCards() {
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
                className="object-cover transition-transform duration-500 hover:scale-105"
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
        <strong className="text-ep-text-primary">Aucun montant minimum obligatoire</strong> sur la plupart des SCPI.
        Investissement possible dès quelques centaines d'euros.
      </p>
    </motion.div>
  )
}
