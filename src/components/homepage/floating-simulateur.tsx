'use client'

import { useState, useEffect, useRef } from 'react'

import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { Calculator, X } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { SimulateurFiscal } from '@/components/simulateur/simulateur-fiscal'

const HIDDEN_ROUTES = ['/a-propos']

export function FloatingSimulateur() {
  const prefersReduced = useReducedMotion()
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const isHidden = HIDDEN_ROUTES.some((route) => pathname.startsWith(route))

  // Close mobile expansion on outside tap
  useEffect(() => {
    if (!isExpanded) return
    const handler = (e: PointerEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsExpanded(false)
      }
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [isExpanded])

  if (isHidden) return null

  const handleClick = () => {
    if (isHovered) {
      // Desktop: hover already active → open dialog
      setIsHovered(false)
      setIsOpen(true)
    } else if (isExpanded) {
      // Mobile: text already visible → open dialog
      setIsExpanded(false)
      setIsOpen(true)
    } else {
      // Mobile: first tap → expand text
      setIsExpanded(true)
    }
  }

  const showText = isHovered || isExpanded

  return (
    <>
      {/* FAB — bottom right, fixed */}
      <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
        <motion.button
          ref={buttonRef}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={handleClick}
          className="group flex items-center gap-3 rounded-full bg-ep-primary px-4 py-3 text-white shadow-lg transition-shadow duration-300 hover:bg-ep-primary-hover hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
          aria-label="Ouvrir le simulateur fiscal"
          layout={!prefersReduced}
        >
          {/* Text — slides out to the left on hover (desktop) or tap (mobile) */}
          <AnimatePresence>
            {showText && (
              <motion.span
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, width: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden whitespace-nowrap text-sm font-medium"
              >
                Déjà épargnant ? Simulez votre retrait
              </motion.span>
            )}
          </AnimatePresence>

          {/* Calculator icon — always visible */}
          <Calculator className="size-6 shrink-0" aria-hidden />
        </motion.button>
      </div>

      {/* Dialog / Popup */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[85vh] max-h-[700px] max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ep-separator px-5 py-3">
            <DialogTitle className="text-sm font-semibold text-ep-primary">
              Simulateur fiscal
            </DialogTitle>
            <button
              onClick={() => setIsOpen(false)}
              className="flex size-8 items-center justify-center rounded-full text-ep-text-muted transition-colors hover:bg-ep-separator hover:text-ep-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary"
              aria-label="Fermer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Chatbot content */}
          <div className="flex-1 overflow-hidden">
            <SimulateurFiscal />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
