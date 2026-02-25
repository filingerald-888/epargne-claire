import type { ReactNode } from 'react'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ProductClosingProps {
  phrase: string
  nextSlug?: string
  nextTitle?: string
  compareHref?: string
  compareLabel?: string
  children?: ReactNode
}

export function ProductClosing({ phrase, nextSlug, nextTitle, compareHref, compareLabel, children }: ProductClosingProps) {
  return (
    <div className="space-y-10">
      {/* Closing phrase */}
      <p className="text-center text-2xl font-bold text-white md:text-3xl">
        {phrase}
      </p>

      {/* CTAs */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/produits"
          className="group inline-flex items-center gap-2 font-medium text-blue-200 transition-colors hover:text-white"
        >
          Voir tous les produits
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        {nextSlug && nextTitle && (
          <Link
            href={`/produits/${nextSlug}`}
            className="group inline-flex items-center gap-2 font-medium text-blue-200 transition-colors hover:text-white"
          >
            {`D\u00E9couvrir le ${nextTitle}`}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
        {compareHref && compareLabel && (
          <Link
            href={compareHref}
            className="group inline-flex items-center gap-2 font-medium text-blue-200 transition-colors hover:text-white"
          >
            {compareLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {/* Next product card */}
      {nextSlug && nextTitle && (
        <Link
          href={`/produits/${nextSlug}`}
          className="mx-auto block max-w-sm rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
        >
          <p className="text-sm text-blue-200">Fiche suivante</p>
          <p className="mt-1 text-lg font-semibold text-white">{nextTitle}</p>
          <ArrowRight className="mx-auto mt-2 size-5 text-blue-200" />
        </Link>
      )}

      {/* Sources */}
      {children && (
        <div className="rounded-2xl bg-white p-6 md:p-8">
          <p className="mb-3 text-sm font-semibold text-ep-text-primary">Sources</p>
          <div className="prose prose-sm max-w-none text-ep-text-muted prose-a:text-ep-primary prose-a:underline prose-a:hover:text-ep-primary/70">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
