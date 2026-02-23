'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

interface StickyHeaderProps {
  className?: string
}

const navLinks = [
  { label: 'Produits', href: '/produits/assurance-vie', activePrefix: '/produits' },
  { label: 'Comparer', href: '/comparer', activePrefix: '/comparer' },
  { label: 'Glossaire', href: '/glossaire', activePrefix: '/glossaire' },
  { label: 'À propos', href: '/a-propos', activePrefix: '/a-propos' },
]

export function StickyHeader({ className }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 80)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Focus trap for mobile overlay
  const handleOverlayKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (e.key !== 'Tab') return

      const overlay = overlayRef.current
      if (!overlay) return

      const focusableElements = overlay.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    },
    []
  )

  // Focus close button when overlay opens
  useEffect(() => {
    if (isMenuOpen && overlayRef.current) {
      const closeButton = overlayRef.current.querySelector<HTMLElement>('button')
      closeButton?.focus()
    }
  }, [isMenuOpen])

  function isActive(link: (typeof navLinks)[number]) {
    return pathname.startsWith(link.activePrefix)
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-colors duration-300 ${
        isScrolled ? 'bg-ep-primary' : 'bg-transparent'
      } ${className ?? ''}`}
    >
      <nav aria-label="Navigation principale" className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="min-h-[44px] min-w-[44px] flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ep-primary"
        >
          {/* Desktop: logo + texte */}
          <Image
            src={isScrolled ? '/logo-blanc.svg' : '/logo-bleu.svg'}
            alt="Épargne Claire"
            width={32}
            height={34}
            className="hidden lg:block"
          />
          <span className={`hidden lg:inline text-xl font-bold ${isScrolled ? 'text-white' : 'text-ep-primary'}`}>
            Épargne Claire
          </span>

          {/* Mobile: logo + texte */}
          <Image
            src={isScrolled ? '/logo-blanc.svg' : '/logo-bleu.svg'}
            alt="Épargne Claire"
            width={28}
            height={30}
            className="lg:hidden"
          />
          <span className={`lg:hidden text-lg font-bold ${isScrolled ? 'text-white' : 'text-ep-primary'}`}>
            Épargne Claire
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link) ? 'page' : undefined}
                className={`inline-flex min-h-[44px] min-w-[44px] items-center px-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ep-primary ${
                  isScrolled ? 'text-white' : 'text-ep-text-primary'
                } ${
                  isActive(link)
                    ? 'font-bold underline underline-offset-4 decoration-2'
                    : 'hover:underline hover:underline-offset-4 hover:decoration-2'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex lg:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ep-primary ${
            isScrolled ? 'text-white' : 'text-ep-text-primary'
          }`}
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          ref={overlayRef}
          onKeyDown={handleOverlayKeyDown}
          className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          {/* Top bar: logo bleu à gauche, croix à droite */}
          <div className="flex h-16 items-center justify-between px-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 min-h-[44px] rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
            >
              <Image
                src="/logo-bleu.svg"
                alt="Épargne Claire"
                width={28}
                height={30}
              />
              <span className="text-lg font-bold text-ep-primary">
                Épargne Claire
              </span>
            </Link>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => {
                setIsMenuOpen(false)
                menuButtonRef.current?.focus()
              }}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-ep-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile nav links */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActive(link) ? 'page' : undefined}
                className={`min-h-[44px] inline-flex items-center text-xl rounded px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2 ${
                  isActive(link)
                    ? 'font-bold text-ep-primary underline underline-offset-4 decoration-2'
                    : 'text-ep-text-primary hover:text-ep-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
