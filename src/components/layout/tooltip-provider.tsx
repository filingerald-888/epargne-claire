'use client'

import { TooltipProvider as RadixTooltipProvider } from '@/components/ui/tooltip'

interface AppTooltipProviderProps {
  children: React.ReactNode
}

export function AppTooltipProvider({ children }: AppTooltipProviderProps) {
  return (
    <RadixTooltipProvider delayDuration={200}>
      {children}
    </RadixTooltipProvider>
  )
}
