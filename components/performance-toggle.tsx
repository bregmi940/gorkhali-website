"use client"

import { useState, useEffect, useRef } from "react"
import { Zap, ZapOff } from "lucide-react"
import { motion } from "framer-motion"
import { useImmersiveContext } from "@/context/immersive-context"

interface PerformanceToggleProps {
  className?: string
}

export function PerformanceToggle({ className = "" }: PerformanceToggleProps) {
  const { isHighPerformance, togglePerformance, isAudioEnabled } = useImmersiveContext()
  const [isHovered, setIsHovered] = useState(false)
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)

  // Inicializar efectos de sonido
  useEffect(() => {
    if (typeof window === "undefined") return

    // Crear elementos de audio con rutas correctas
    hoverSoundRef.current = new Audio("/beep.mp3")
    clickSoundRef.current = new Audio("/click.mp3")

    // Configurar audio
    if (hoverSoundRef.current) {
      hoverSoundRef.current.volume = 0.3
      hoverSoundRef.current.load()
    }

    if (clickSoundRef.current) {
      clickSoundRef.current.volume = 0.4
      clickSoundRef.current.load()
    }

    return () => {
      if (hoverSoundRef.current) {
        hoverSoundRef.current.pause()
        hoverSoundRef.current = null
      }
      if (clickSoundRef.current) {
        clickSoundRef.current.pause()
        clickSoundRef.current = null
      }
    }
  }, [])

  // Handle toggle
  const handleToggle = () => {
    if (isAudioEnabled && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch((error) => {
        console.warn("Click sound failed to play:", error)
      })
    }
    togglePerformance()
  }

  // Handle hover
  const handleMouseEnter = () => {
    setIsHovered(true)
    if (isAudioEnabled && hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0
      hoverSoundRef.current.play().catch((error) => {
        console.warn("Hover sound failed to play:", error)
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <motion.button
      className={`relative h-10 w-10 rounded-full bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-[#f1f1f1] border border-[#D4AF37]/20 flex items-center justify-center ${className}`}
      onClick={handleToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isHighPerformance ? "Switch to low performance mode" : "Switch to high performance mode"}
      title={isHighPerformance ? "Switch to low performance mode" : "Switch to high performance mode"}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#D4AF37] filter blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHighPerformance ? 0.4 : isHovered ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon */}
      <motion.div
        className="relative z-10"
        animate={{ scale: [1, isHighPerformance ? 1.2 : 1, 1] }}
        transition={{ duration: 0.5, repeat: isHighPerformance ? Number.POSITIVE_INFINITY : 0, repeatDelay: 2 }}
      >
        {isHighPerformance ? <Zap className="h-5 w-5 text-[#D4AF37]" /> : <ZapOff className="h-5 w-5 text-[#D4AF37]" />}
      </motion.div>
    </motion.button>
  )
}
