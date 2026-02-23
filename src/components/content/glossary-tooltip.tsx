'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { findTerm, getTermSlug } from '@/lib/glossaire'

interface GlossaryTooltipProps {
  term: string
  children?: ReactNode
  className?: string
}

export function GlossaryTooltip({ term, children, className }: GlossaryTooltipProps) {
  const result = findTerm(term)

  if (!result) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[GlossaryTooltip] Terme introuvable dans termes.json : "${term}"`)
    }
    return <span className={className}>{children ?? term}</span>
  }

  const { key, term: termData } = result
  const slug = getTermSlug(key)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          className={cn(
            'underline decoration-dotted decoration-ep-primary/50 underline-offset-2 cursor-help inline-flex items-center',
            className
          )}
        >
          {children ?? term}
        </span>
      </TooltipTrigger>
      <TooltipContent
        sideOffset={4}
        className="bg-white text-ep-text-primary border border-ep-separator rounded-lg shadow-md p-3 max-w-xs [&>svg]:fill-white [&>svg]:bg-transparent"
      >
        <p className="text-sm leading-relaxed">{termData.definition}</p>
        <Link
          href={`/glossaire#${slug}`}
          className="mt-2 inline-block text-sm font-medium text-ep-primary hover:text-ep-primary-hover"
        >
          Voir dans le glossaire →
        </Link>
      </TooltipContent>
    </Tooltip>
  )
}
