'use client'

import { AlertTriangle, CheckCircle2, MessageCircleQuestion } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

interface Tab {
  slug: string
  label: string
  shortLabel: string
  icon: LucideIcon
}

const tabs: Tab[] = [
  { slug: 'questions-a-poser', label: 'Questions à poser', shortLabel: 'Questions', icon: MessageCircleQuestion },
  { slug: 'points-attention', label: "Points d'attention", shortLabel: 'Attention', icon: AlertTriangle },
  { slug: 'reflexes-cles', label: 'Réflexes clés', shortLabel: 'Réflexes', icon: CheckCircle2 },
]

export function RdvNavTabs({ currentSlug }: { currentSlug: string }) {
  return (
    <nav
      aria-label="Guides RDV"
      className="inline-flex gap-1 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm sm:gap-2"
    >
      {tabs.map((tab) => {
        const isActive = tab.slug === currentSlug
        const Icon = tab.icon
        const href = isActive ? `/rdv/${tab.slug}` : `/rdv/${tab.slug}#contenu`
        return (
          <Link
            key={tab.slug}
            href={href}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-white text-ep-primary shadow-sm'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            )}
          >
            <Icon className="hidden size-4 shrink-0 sm:block" />
            <span className="sm:hidden">{tab.shortLabel}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
