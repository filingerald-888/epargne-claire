'use client'

import { useEffect } from 'react'

export function GlossaireHashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return

    // Wait for the page to be fully rendered
    const timer = setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  return null
}
