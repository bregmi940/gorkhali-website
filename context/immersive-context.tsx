"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ImmersiveContextType = {
  isHighPerformance: boolean
  togglePerformance: () => void
  isCinematicMode?: boolean
  toggleCinematicMode?: () => void
  hasUserInteracted?: boolean
  setHasUserInteracted?: (value: boolean) => void
}

const ImmersiveContext = createContext<ImmersiveContextType | undefined>(undefined)

export function ImmersiveProvider({ children }: { children: React.ReactNode }) {
  const [isHighPerformance, setHighPerformance] = useState(true)
  const [isImmersiveMode, setImmersiveMode] = useState(true)

  // Detectar automáticamente dispositivos de bajo rendimiento
  useEffect(() => {
    const detectPerformance = () => {
      // Dispositivos móviles generalmente tienen menor rendimiento
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

      // Navegadores más antiguos pueden tener problemas con efectos avanzados
      const isOldBrowser = !("GPU" in navigator)

      // Si es móvil o navegador antiguo, establecer rendimiento bajo
      if (isMobile || isOldBrowser) {
        setHighPerformance(false)
      }
    }

    detectPerformance()

    // Cargar preferencias guardadas
    const savedPerformance = localStorage.getItem("gorkhali-performance")
    if (savedPerformance) {
      setHighPerformance(savedPerformance === "high")
    }

    const savedImmersive = localStorage.getItem("gorkhali-immersive")
    if (savedImmersive) {
      setImmersiveMode(savedImmersive === "true")
    }
  }, [])

  // Guardar preferencias cuando cambien
  useEffect(() => {
    localStorage.setItem("gorkhali-performance", isHighPerformance ? "high" : "low")
  }, [isHighPerformance])

  useEffect(() => {
    localStorage.setItem("gorkhali-immersive", isImmersiveMode ? "true" : "false")
  }, [isImmersiveMode])

  // Función para alternar el modo de alto rendimiento
  const togglePerformance = () => {
    setHighPerformance((prev) => !prev)
  }

  return (
    <ImmersiveContext.Provider
      value={{
        isHighPerformance,
        togglePerformance,
        isCinematicMode: isImmersiveMode,
        toggleCinematicMode: () => setImmersiveMode((prev) => !prev),
        hasUserInteracted: true,
        setHasUserInteracted: () => {},
      }}
    >
      {children}
    </ImmersiveContext.Provider>
  )
}

export function useImmersiveContext() {
  const context = useContext(ImmersiveContext)
  if (context === undefined) {
    throw new Error("useImmersiveContext must be used within an ImmersiveProvider")
  }
  return context
}

// Mantener useImmersive como alias para compatibilidad
export const useImmersive = useImmersiveContext
