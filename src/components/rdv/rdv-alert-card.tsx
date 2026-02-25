'use client'

import { AlertTriangle, Info, ShieldAlert, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { fadeInVariants, reducedFadeInVariants } from '@/lib/motion'
import { cn, renderBold } from '@/lib/utils'

type Severity = 'info' | 'warning' | 'danger'

interface RdvAlertCardProps {
  title: string
  description: string
  severity?: Severity
  example?: string
  persona?: string
}

const severityConfig: Record<Severity, { icon: LucideIcon; iconBg: string; iconColor: string }> = {
  info: {
    icon: Info,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  danger: {
    icon: ShieldAlert,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
}

export function RdvAlertCard({
  title,
  description,
  severity = 'warning',
  example,
  persona,
}: RdvAlertCardProps) {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedFadeInVariants : fadeInVariants
  const config = severityConfig[severity]
  const Icon = config.icon

  return (
    <motion.div
      variants={variants}
      className={cn(
        'mt-4 rounded-xl border border-ep-separator bg-white shadow-[0_2px_8px_rgb(0,0,0,0.06)] transition-all duration-300',
        'hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
      )}
    >
      <div className="flex items-start gap-4 p-5">
        <div
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-full',
            config.iconBg
          )}
        >
          <Icon className={cn('size-4', config.iconColor)} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-ep-text-primary">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ep-text-muted">
            {renderBold(description)}
          </p>

          {example && (
            <div className="mt-3 rounded-lg border border-ep-primary/15 bg-ep-primary/5 p-3">
              {persona && (
                <div className="mb-1.5 flex items-center gap-2">
                  <User className="size-3.5 text-ep-primary" />
                  <span className="text-xs font-semibold text-ep-primary">
                    {persona}
                  </span>
                </div>
              )}
              <p className="text-sm leading-relaxed text-ep-text-muted">
                {renderBold(example)}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
