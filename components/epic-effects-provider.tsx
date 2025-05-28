"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"

type EffectTheme = "default" | "history" | "roadmap" | "tokenomics" | "community" | "worldapp"

interface EpicEffectsContextType {
  effectTheme: EffectTheme
  setEffectTheme: (theme: EffectTheme) => void
  animationSpeed: number
  setAnimationSpeed: (speed: number) => void
  glowIntensity: number
  setGlowIntensity: (intensity: number) => void
  parallaxStrength: number
  setParallaxStrength: (strength: number) => void
  isReducedMotion: boolean
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

const EpicEffectsContext = createContext<EpicEffectsContextType>({
  effectTheme: "default",
  setEffectTheme: () => {},
  animationSpeed: 1,
  setAnimationSpeed: () => {},
  glowIntensity: 1,
  setGlowIntensity: () => {},
  parallaxStrength: 1,
  setParallaxStrength: () => {},
  isReducedMotion: false,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
})

export const useEpicEffects = () => useContext(EpicEffectsContext)

interface EpicEffectsProviderProps {
  children: React.ReactNode
  initialTheme?: EffectTheme
}

export const EpicEffectsProvider: React.FC<EpicEffectsProviderProps> = ({ children, initialTheme = "default" }) => {
  const [effectTheme, setEffectTheme] = useState<EffectTheme>(initialTheme)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [glowIntensity, setGlowIntensity] = useState(1.5) // Aumentado de 1 a 1.5 para más intensidad
  const [parallaxStrength, setParallaxStrength] = useState(1.2) // Aumentado de 1 a 1.2 para más efecto

  // Responsive breakpoints
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
  const isDesktop = useMediaQuery({ minWidth: 1024 })

  // Detect reduced motion preference
  const prefersReducedMotion = useMediaQuery({ query: "(prefers-reduced-motion: reduce)" })
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Set reduced motion after initial render to avoid hydration mismatch
  useEffect(() => {
    setIsReducedMotion(prefersReducedMotion)
  }, [prefersReducedMotion])

  // Adjust effects based on device capabilities
  useEffect(() => {
    if (isMobile) {
      // Reduce effects on mobile for better performance
      setAnimationSpeed(0.9) // Slightly slower animations
      setGlowIntensity(1.2) // Less glow
      setParallaxStrength(0.8) // Less parallax
    } else if (isTablet) {
      // Moderate effects on tablets
      setAnimationSpeed(1)
      setGlowIntensity(1.4)
      setParallaxStrength(1)
    } else {
      // Full effects on desktop
      setAnimationSpeed(1.1) // Slightly faster animations
      setGlowIntensity(1.5) // Full glow
      setParallaxStrength(1.2) // Full parallax
    }
  }, [isMobile, isTablet, isDesktop])

  // Set theme based on current path
  useEffect(() => {
    const path = window.location.pathname
    if (path.includes("/history")) {
      setEffectTheme("history")
    } else if (path.includes("/roadmap")) {
      setEffectTheme("roadmap")
    } else if (path.includes("/tokenomics")) {
      setEffectTheme("tokenomics")
    } else if (path.includes("/community")) {
      setEffectTheme("community")
    } else if (path.includes("/worldapp")) {
      setEffectTheme("worldapp")
    } else {
      setEffectTheme("default")
    }
  }, [])

  return (
    <EpicEffectsContext.Provider
      value={{
        effectTheme,
        setEffectTheme,
        animationSpeed,
        setAnimationSpeed,
        glowIntensity,
        setGlowIntensity,
        parallaxStrength,
        setParallaxStrength,
        isReducedMotion,
        isMobile,
        isTablet,
        isDesktop,
      }}
    >
      {children}
    </EpicEffectsContext.Provider>
  )
}
