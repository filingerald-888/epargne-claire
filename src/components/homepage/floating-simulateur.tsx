'use client'

import { useState } from 'react'

import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { UserRound, X } from 'lucide-react'

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
  const [isOpen, setIsOpen] = useState(false)

  // Hide on excluded pages
  if (HIDDEN_ROUTES.some((route) => pathname.startsWith(route))) {
    return null
  }

  return (
    <>
      {/* FAB — bottom right, fixed */}
      <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8">
        <motion.button
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => {
            setIsHovered(false)
            setIsOpen(true)
          }}
          className="group flex items-center gap-3 rounded-full bg-ep-primary px-4 py-3 text-white shadow-lg transition-shadow duration-300 hover:bg-ep-primary-hover hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ep-primary focus-visible:ring-offset-2"
          aria-label="Ouvrir le simulateur fiscal"
          layout={!prefersReduced}
        >
          {/* Persona icon — always visible */}
          <UserRound className="size-6 shrink-0" aria-hidden />

          {/* Expanded text — on hover */}
          <AnimatePresence>
            {isHovered && (
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
        </motion.button>
      </div>

      {/* Dialog / Popup */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton={false}
          className="mx-4 flex h-[85vh] max-h-[700px] w-[calc(100%-2rem)] max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:mx-auto sm:w-full"
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
