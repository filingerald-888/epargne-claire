'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

interface CarouselSectionProps {
  children: React.ReactNode
  itemCount: number
  dataAttribute?: string
  className?: string
}

export function CarouselSection({
  children,
  itemCount,
  dataAttribute = 'data-card',
  className,
}: CarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)

    // Calculate active card index based on scroll position
    const firstCard = el.querySelector<HTMLElement>(`[${dataAttribute}]`)
    if (!firstCard) return
    const cardWidth = firstCard.offsetWidth
    const gap = 24
    const idx = Math.round(el.scrollLeft / (cardWidth + gap))
    setActiveIndex(Math.max(0, Math.min(idx, itemCount - 1)))
  }, [dataAttribute, itemCount])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    const cardWidth =
      el.querySelector<HTMLElement>(`[${dataAttribute}]`)?.offsetWidth ?? 300
    const gap = 24
    el.scrollBy({
      left: direction === 'right' ? cardWidth + gap : -(cardWidth + gap),
      behavior: prefersReduced ? 'instant' : 'smooth',
    })
  }

  return (
    <div className={cn('relative', className)}>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="scrollbar-hide -mr-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:-mr-8"
      >
        {children}
        {/* Spacer to add right padding after the last card */}
        <div className="shrink-0 w-px" aria-hidden="true" />
      </div>

      {/* Arrow buttons — desktop only */}
      <button
        type="button"
        onClick={() => scroll('left')}
        aria-label="Pr\u00E9c\u00E9dent"
        className={cn(
          'absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center md:flex',
          'size-10 rounded-full border border-ep-separator bg-white shadow-md',
          'transition-all duration-200 hover:scale-110 hover:shadow-lg',
          canScrollLeft ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <ArrowLeft className="size-4 text-ep-text-primary" />
      </button>

      <button
        type="button"
        onClick={() => scroll('right')}
        aria-label="Suivant"
        className={cn(
          'absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center md:flex',
          'size-10 rounded-full border border-ep-separator bg-white shadow-md',
          'transition-all duration-200 hover:scale-110 hover:shadow-lg',
          canScrollRight ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <ArrowRight className="size-4 text-ep-text-primary" />
      </button>

      {/* Progress dots — mobile only */}
      <div className="mt-4 flex items-center justify-center gap-1.5 md:hidden">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'size-1.5 rounded-full transition-colors duration-200',
              i === activeIndex ? 'bg-ep-primary' : 'bg-ep-primary/30'
            )}
          />
        ))}
      </div>
    </div>
  )
}
