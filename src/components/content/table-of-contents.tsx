import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

interface TocSection {
  id: string
  label: string
}

interface TableOfContentsProps {
  sections: TocSection[]
  className?: string
}

export function TableOfContents({ sections, className }: TableOfContentsProps) {
  if (sections.length === 0) return null

  return (
    <nav role="navigation" aria-label="Sommaire" className={cn(className)}>
      {/* Mobile: collapsible natif */}
      <details className="group lg:hidden rounded-lg border border-ep-separator bg-ep-surface">
        <summary className="flex min-h-[44px] cursor-pointer items-center justify-between px-4 py-3 font-sans text-sm font-semibold text-ep-text-primary list-none [&::-webkit-details-marker]:hidden">
          Sommaire
          <ChevronDown className="h-4 w-4 text-ep-text-muted transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
        </summary>
        <ul className="border-t border-ep-separator px-4 pb-4 pt-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block min-h-[44px] py-2 text-sm text-ep-text-primary hover:text-ep-primary"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </details>

      {/* Desktop: liste toujours visible */}
      <div className="hidden lg:block">
        <p className="mb-3 font-sans text-sm font-semibold text-ep-text-primary">Sommaire</p>
        <ul className="space-y-1 border-l-2 border-ep-separator">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ep-text-primary hover:border-ep-primary hover:text-ep-primary"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
