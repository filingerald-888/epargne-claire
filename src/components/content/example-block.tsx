import type { ReactNode } from 'react'

import { Lightbulb } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ExampleBlockProps {
  title?: string
  children: ReactNode
  className?: string
}

export function ExampleBlock({ title = 'Exemple concret', children, className }: ExampleBlockProps) {
  return (
    <figure
      aria-label={title}
      className={cn(
        'mt-8 rounded-2xl border border-ep-separator bg-white p-6 shadow-sm md:p-8',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ep-primary/10">
          <Lightbulb className="size-4 text-ep-primary" />
        </div>
        <p className="font-sans text-sm font-semibold text-ep-text-primary">{title}</p>
      </div>
      <div className="prose prose-sm max-w-none font-sans text-base leading-relaxed text-ep-text-primary">
        {children}
      </div>
    </figure>
  )
}
