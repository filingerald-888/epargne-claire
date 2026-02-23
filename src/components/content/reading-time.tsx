import { Clock } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ReadingTimeProps {
  minutes: number
  className?: string
}

export function ReadingTime({ minutes, className }: ReadingTimeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-sm text-ep-text-muted', className)}>
      <Clock className="h-4 w-4" aria-hidden="true" />
      <span>~{minutes} min de lecture</span>
    </span>
  )
}
