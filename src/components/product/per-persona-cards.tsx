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
    image: '/images/personas/per-cadre.jpg',
    title: 'Cadre en milieu de carrière',
    description: (
      <>
        Vous payez{' '}
        <strong className="text-ep-text-primary">plus de 2{'\u00A0'}000{'\u00A0'}€ d'impôts par an</strong>
        {' '}et vous cherchez à réduire la facture tout en préparant l'avenir.
      </>
    ),
  },
  {
    image: '/images/personas/per-liberal.jpg',
    title: 'Indépendant ou profession libérale',
    description: (
      <>
        Vos revenus varient d'une année à l'autre. Le PER vous permet d'
        <strong className="text-ep-text-primary">adapter vos versements</strong>
        {' '}et de mieux répartir vos impôts.
      </>
    ),
  },
  {
    image: '/images/personas/per-couple.jpg',
    title: 'Couple avec des revenus confortables',
    description: (
      <>
        Chacun peut ouvrir un PER. Avec{' '}
        <strong className="text-ep-text-primary">deux réductions d'impôts</strong>
        , l'économie est doublée.
      </>
    ),
  },
  {
    image: '/images/personas/per-retraite.jpg',
    title: 'Salarié approchant la retraite',
    description: (
      <>
        À 15 ans de la retraite, il est encore temps. Vos versements réduisent l'impôt{' '}
        <strong className="text-ep-text-primary">maintenant</strong>
        , et votre capital grossit jusqu'au départ.
      </>
    ),
  },
  {
    image: '/images/personas/per-jeune-actif.jpg',
    title: 'Jeune actif qui anticipe',
    description: (
      <>
        Même avec un taux d'imposition modeste, commencer tôt donne à votre épargne{' '}
        <strong className="text-ep-text-primary">plus de temps pour grandir</strong>
        {' '}grâce à l'effet boule de neige.
      </>
    ),
  },
]

export function PerPersonaCards() {
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
                  (persona.image.includes('per-cadre') || persona.image.includes('per-retraite')) && 'object-[center_20%]'
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
        Le PER est ouvert à tous,{' '}
        <strong className="text-ep-text-primary">sans condition d'âge</strong>
        . Mais il est surtout utile si vous êtes imposable.
      </p>
    </motion.div>
  )
}
