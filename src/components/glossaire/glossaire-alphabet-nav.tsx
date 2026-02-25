'use client'

import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface GlossaireAlphabetNavProps {
  letters: string[]
}

export function GlossaireAlphabetNav({ letters }: GlossaireAlphabetNavProps) {
  const [activeLetter, setActiveLetter] = useState(letters[0] ?? '')

  const updateActiveLetter = useCallback(() => {
    for (const letter of letters) {
      const el = document.getElementById(`lettre-${letter}`)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top <= 150 && rect.bottom > 150) {
        setActiveLetter(letter)
        return
      }
    }
  }, [letters])

  useEffect(() => {
    window.addEventListener('scroll', updateActiveLetter, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveLetter)
  }, [updateActiveLetter])

  return (
    <nav
      aria-label="Navigation alphabétique"
      className="sticky top-16 z-30 border-b border-ep-separator bg-white/95 backdrop-blur-sm"
    >
      <div className="scrollbar-hide mx-auto flex max-w-[1200px] items-center gap-1 overflow-x-auto px-6 py-3 md:justify-center md:px-8">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#lettre-${letter}`}
            className={cn(
              'inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200',
              letter === activeLetter
                ? 'bg-ep-primary text-white'
                : 'text-ep-text-muted hover:bg-ep-bg-blue-subtle hover:text-ep-primary'
            )}
          >
            {letter}
          </a>
        ))}
      </div>
    </nav>
  )
}
