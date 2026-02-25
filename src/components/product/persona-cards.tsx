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
    image: '/images/personas/prudent-v3.jpg',
    title: 'Épargnant prudent',
    description: (
      <>
        Vous voulez un <strong className="text-ep-text-primary">rendement supérieur aux livrets</strong>,
        avec un capital <strong className="text-ep-text-primary">garanti</strong>. Le fonds euros est fait pour vous.
      </>
    ),
  },
  {
    image: '/images/personas/investisseur-v3.jpg',
    title: 'Investisseur moyen-long terme',
    description: (
      <>
        Vous visez un rendement plus élevé en acceptant une part de risque,
        sur un horizon de <strong className="text-ep-text-primary">5 à 10 ans</strong> et plus.
      </>
    ),
  },
  {
    image: '/images/personas/parent.jpg',
    title: 'Parent prévoyant',
    description: (
      <>
        Vous préparez un <strong className="text-ep-text-primary">capital pour vos enfants</strong>&nbsp;:
        études, premier achat, premier appartement.
      </>
    ),
  },
  {
    image: '/images/personas/transmission.jpg',
    title: 'Transmettre un patrimoine',
    description: (
      <>
        Un cadre fiscal <strong className="text-ep-text-primary">très avantageux</strong>&nbsp;:
        jusqu&rsquo;à <strong className="text-ep-text-primary">152 500 &euro;</strong> par
        bénéficiaire, hors succession classique.
      </>
    ),
  },
  {
    image: '/images/personas/retraite-v2.jpg',
    title: 'Futur retraité',
    description: (
      <>
        En complément d&rsquo;un PER, une épargne{' '}
        <strong className="text-ep-text-primary">disponible à tout moment</strong>, sans blocage.
      </>
    ),
  },
]

export function PersonaCards() {
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
        <strong className="text-ep-text-primary">Pas de condition d&rsquo;âge ni de revenus</strong> pour ouvrir un contrat.
      </p>
    </motion.div>
  )
}
