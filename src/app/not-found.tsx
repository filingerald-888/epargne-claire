import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Compass, Home, BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page non trouvée — EpargneClaire',
  description: 'La page que vous cherchez est introuvable. Retrouvez les fiches produits, le glossaire et les outils pédagogiques sur EpargneClaire.',
  robots: { index: false, follow: true },
}

const suggestions = [
  {
    label: 'Accueil',
    href: '/',
    description: "Retourner au point de départ",
    icon: Home,
  },
  {
    label: 'Produits',
    href: '/produits',
    description: 'Explorer les fiches produits',
    icon: ArrowRight,
  },
  {
    label: 'Glossaire',
    href: '/glossaire',
    description: 'Consulter le glossaire',
    icon: BookOpen,
  },
]

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/404-bg.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        quality={85}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        {/* Compass icon */}
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
          <Compass className="size-10 text-white" strokeWidth={1.5} />
        </div>

        {/* 404 */}
        <p className="text-6xl font-bold tracking-tight text-white md:text-8xl">
          404
        </p>

        {/* Message */}
        <h1 className="mt-4 text-xl font-semibold text-white md:text-2xl">
          Cette page s'est égarée dans les marchés financiers.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Pas de panique — contrairement à un mauvais placement, cette erreur
          est sans conséquence. Retrouvez votre chemin ci-dessous.
        </p>

        {/* Navigation links */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <s.icon className="size-4 text-white/70 transition-colors group-hover:text-white" />
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
