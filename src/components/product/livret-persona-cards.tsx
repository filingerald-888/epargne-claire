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
    image: '/images/personas/livret-etudiant.jpg',
    title: 'Étudiant qui commence',
    description: (
      <>
        Votre premier réflexe d'épargnant. Même{' '}
        <strong className="text-ep-text-primary">20{'\u00A0'}€ par mois</strong>
        , c'est un début — et c'est garanti.
      </>
    ),
  },
  {
    image: '/images/personas/livret-jeune-actif.jpg',
    title: 'Jeune actif',
    description: (
      <>
        Avant d'investir, construisez votre{' '}
        <strong className="text-ep-text-primary">matelas de sécurité</strong>
        . Le Livret{'\u00A0'}A est la première brique de votre épargne.
      </>
    ),
  },
  {
    image: '/images/personas/livret-parent.jpg',
    title: 'Parent prévoyant',
    description: (
      <>
        Ouvrez un Livret{'\u00A0'}A dès la{' '}
        <strong className="text-ep-text-primary">naissance</strong>
        {' '}de votre enfant. Une épargne simple, sûre, et pédagogique.
      </>
    ),
  },
  {
    image: '/images/personas/livret-famille.jpg',
    title: 'Famille avec projet',
    description: (
      <>
        Mettez votre argent de côté en attendant le bon moment pour acheter.{' '}
        <strong className="text-ep-text-primary">Disponible immédiatement</strong>
        , sans pénalité.
      </>
    ),
  },
  {
    image: '/images/personas/livret-retraite.jpg',
    title: 'Retraité prudent',
    description: (
      <>
        Gardez de{' '}
        <strong className="text-ep-text-primary">l'argent disponible au quotidien</strong>
        {' '}pour les dépenses imprévues, sans risquer votre capital.
      </>
    ),
  },
]

export function LivretPersonaCards() {
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
        Ouvert à tous dès la naissance.{' '}
        <strong className="text-ep-text-primary">Un seul Livret{'\u00A0'}A et un seul LDDS par personne.</strong>
      </p>
    </motion.div>
  )
}
