'use client'

import type { ReactNode } from 'react'
import { Children, isValidElement } from 'react'

import {
  AlertTriangle,
  Banknote,
  CircleCheck,
  Leaf,
  Shield,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import {
  slideInLeftVariants,
  slideInRightVariants,
  reducedSlideInVariants,
  staggerContainerVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  Shield,
  TrendingUp,
  CircleCheck,
  AlertTriangle,
  Leaf,
  Banknote,
}

interface SplitItemProps {
  icon: string
  title: string
  variant?: 'green' | 'red' | 'neutral'
  children?: ReactNode
}

export function SplitItem(_props: SplitItemProps) {
  return null
}
SplitItem.displayName = 'SplitItem'

const variantStyles = {
  green: {
    card: 'border-emerald-200 bg-[#F0FDF4]',
    hoverBorder: 'hover:border-emerald-300',
    icon: 'text-emerald-600',
  },
  red: {
    card: 'border-red-200 bg-[#FEF2F2]',
    hoverBorder: 'hover:border-red-300',
    icon: 'text-red-500',
  },
  neutral: {
    card: 'border-ep-separator bg-white',
    hoverBorder: 'hover:border-ep-primary/30',
    icon: 'text-ep-primary',
  },
}

interface ExtractedSplitItem {
  icon: string
  title: string
  variant: 'green' | 'red' | 'neutral'
  content: ReactNode
}

export function SplitComparison({ children }: { children?: ReactNode }) {
  const prefersReduced = useReducedMotion()
  const slideVariants = [
    prefersReduced ? reducedSlideInVariants : slideInLeftVariants,
    prefersReduced ? reducedSlideInVariants : slideInRightVariants,
  ]

  const items: ExtractedSplitItem[] = []
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    const props = child.props as Record<string, unknown>
    if (typeof props.icon === 'string' && typeof props.title === 'string') {
      items.push({
        icon: props.icon as string,
        title: props.title as string,
        variant: (props.variant as 'green' | 'red' | 'neutral') ?? 'neutral',
        content: props.children as ReactNode,
      })
    }
  })

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid gap-6 sm:grid-cols-2"
    >
      {items.map((item, i) => {
        const Icon = iconMap[item.icon]
        const styles = variantStyles[item.variant]

        return (
          <motion.div
            key={i}
            variants={slideVariants[i] ?? slideVariants[1]}
            className={cn(
              'rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] md:p-8',
              styles.card,
              styles.hoverBorder
            )}
          >
            <div className="mb-4 flex items-center gap-3">
              {Icon && <Icon className={cn('size-6 shrink-0', styles.icon)} />}
              <h3 className="text-lg font-semibold text-ep-text-primary">
                {item.title}
              </h3>
            </div>
            <div className="prose prose-sm max-w-none text-ep-text-muted prose-li:my-1">
              {item.content}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
