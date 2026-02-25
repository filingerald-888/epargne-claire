'use client'

import type { ReactNode } from 'react'
import { Children, isValidElement } from 'react'

import {
  AlertTriangle,
  Banknote,
  BarChart3,
  CircleCheck,
  ClipboardCheck,
  Clock,
  Gift,
  Landmark,
  Scale,
  Shield,
  Target,
  TrendingDown,
  TrendingUp,
  Unlock,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { fadeInVariants, reducedFadeInVariants, staggerContainerVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  Shield,
  TrendingUp,
  Landmark,
  Unlock,
  Gift,
  Target,
  ClipboardCheck,
  Banknote,
  Scale,
  BarChart3,
  AlertTriangle,
  TrendingDown,
  Clock,
  CircleCheck,
}

interface FeatureProps {
  icon: string
  title: string
  children?: ReactNode
}

export function Feature(_props: FeatureProps) {
  return null
}

interface FeatureGridProps {
  variant?: 'steps' | 'advantages' | 'warnings'
  columns?: 1 | 2
  children?: ReactNode
}

interface ExtractedFeature {
  icon: string
  title: string
  content: ReactNode
}

export function FeatureGrid({ variant = 'advantages', columns = 2, children }: FeatureGridProps) {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  const items: ExtractedFeature[] = []
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Feature) {
      const props = child.props as FeatureProps
      items.push({
        icon: props.icon,
        title: props.title,
        content: props.children,
      })
    }
  })

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn(
        'grid gap-4 md:gap-6',
        columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'
      )}
    >
      {items.map((item, i) => {
        const Icon = iconMap[item.icon]

        return (
          <motion.div
            key={i}
            variants={itemVariants}
            className={cn(
              'flex gap-4 rounded-xl border p-5 md:p-6',
              variant === 'steps' &&
                'border-ep-separator bg-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-ep-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
              variant === 'advantages' &&
                'border-ep-separator bg-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-emerald-300/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
              variant === 'warnings' &&
                'border-l-4 border-ep-warning border-l-ep-warning bg-[#FEF2F2] transition-all duration-300 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)]'
            )}
          >
            {/* Icon / Step number */}
            <div className="shrink-0">
              {variant === 'steps' ? (
                <div className="flex size-8 items-center justify-center rounded-full bg-ep-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
              ) : (
                Icon && (
                  <Icon
                    className={cn(
                      'mt-0.5 size-5',
                      variant === 'advantages' && 'text-emerald-600',
                      variant === 'warnings' && 'text-red-500'
                    )}
                  />
                )
              )}
            </div>

            {/* Content */}
            <div>
              <h3 className="font-semibold text-ep-text-primary">{item.title}</h3>
              <div className="mt-1 text-sm leading-relaxed text-ep-text-muted">
                {item.content}
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
