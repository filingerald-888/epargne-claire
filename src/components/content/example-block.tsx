import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface ExampleBlockProps {
  title?: string
  children: ReactNode
  className?: string
}

export function ExampleBlock({ title = 'Exemple concret', children, className }: ExampleBlockProps) {
  return (
    <figure aria-label={title} className={cn('bg-ep-surface rounded-lg p-4', className)}>
      <p className="font-sans text-sm font-semibold text-ep-text-primary mb-2">{title}</p>
      <div className="font-mono text-base leading-relaxed text-ep-text-primary">
        {children}
      </div>
    </figure>
  )
}
