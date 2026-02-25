'use client'

import { useCallback, useRef, useState } from 'react'

import { ComparateurHero } from './comparateur-hero'
import { ComparateurResult } from './comparateur-result'

export function ComparateurPageClient() {
  const [selectedA, setSelectedA] = useState('assurance-vie')
  const [selectedB, setSelectedB] = useState('pea')
  const resultRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)

  const scrollToResult = useCallback(() => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleSuggestion = useCallback((a: string, b: string) => {
    setSelectedA(a)
    setSelectedB(b)
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [])

  const handleSelectA = useCallback(
    (slug: string) => {
      if (slug === selectedB) return
      setSelectedA(slug)
    },
    [selectedB]
  )

  const handleSelectB = useCallback(
    (slug: string) => {
      if (slug === selectedA) return
      setSelectedB(slug)
    },
    [selectedA]
  )

  return (
    <>
      <div ref={topRef} className="scroll-mt-20" />
      <ComparateurHero
        selectedA={selectedA}
        selectedB={selectedB}
        onSelectA={handleSelectA}
        onSelectB={handleSelectB}
        onCompare={scrollToResult}
        onSuggestion={handleSuggestion}
      />
      <div ref={resultRef} className="scroll-mt-20" />
      <ComparateurResult
        slugA={selectedA}
        slugB={selectedB}
        onNewComparison={scrollToTop}
      />
    </>
  )
}
