'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface HeroContextType {
  isHeroVisible: boolean
  setHeroVisible: (visible: boolean) => void
}

const HeroContext = createContext<HeroContextType>({
  isHeroVisible: false,
  setHeroVisible: () => {},
})

export function HeroProvider({ children }: { children: ReactNode }) {
  const [isHeroVisible, setHeroVisible] = useState(false)
  return (
    <HeroContext.Provider value={{ isHeroVisible, setHeroVisible }}>
      {children}
    </HeroContext.Provider>
  )
}

export function useHeroVisibility() {
  return useContext(HeroContext)
}
