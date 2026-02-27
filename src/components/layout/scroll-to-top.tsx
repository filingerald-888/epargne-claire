'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Force un scroll-to-top instantané lors d'un changement de route,
 * tout en préservant le smooth scroll pour les ancres et
 * la restauration native du scroll au bouton retour.
 */
export function ScrollToTop() {
  const pathname = usePathname()
  const prev = useRef(pathname)

  useEffect(() => {
    if (pathname !== prev.current) {
      prev.current = pathname
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname])

  return null
}
