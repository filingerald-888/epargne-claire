import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page non trouvée — EpargneClaire',
}

export default function NotFound() {
  const suggestions = [
    { label: 'Accueil', href: '/', description: 'Retourner à la page d\'accueil' },
    { label: 'Assurance-vie', href: '/produits/assurance-vie', description: 'Découvrir l\'assurance-vie' },
    { label: 'Glossaire', href: '/glossaire', description: 'Consulter le glossaire' },
  ]

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-bold text-ep-text-primary">
          Cette page n&apos;existe pas
        </h1>
        <p className="mt-4 text-ep-text-muted">
          La page que vous recherchez n&apos;est pas disponible.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          {suggestions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-lg border border-ep-primary/20 bg-white px-6 py-4 text-left transition-colors hover:border-ep-primary hover:bg-ep-surface sm:text-center"
            >
              <span className="font-semibold text-ep-primary">{s.label}</span>
              <span className="mt-1 block text-sm text-ep-text-muted">
                {s.description} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
