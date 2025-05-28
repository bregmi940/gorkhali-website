"use client"

import { useState, useEffect, useRef } from "react"
import { Film, VideoOffIcon as FilmOff } from "lucide-react"
import { motion } from "framer-motion"
import { useImmersiveContext } from "@/context/immersive-context"

interface CinematicModeToggleProps {
  className?: string
}

export function CinematicModeToggle({ className = "" }: CinematicModeToggleProps) {
  const { isCinematicMode, toggleCinematicMode, isAudioEnabled } = useImmersiveContext()
  const [isHovered, setIsHovered] = useState(false)
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const cinematicMusicRef = useRef<HTMLAudioElement | null>(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  // Inicializar efectos de sonido
  useEffect(() => {
    if (typeof window === "undefined") return

    // Crear elementos de audio con rutas correctas
    hoverSoundRef.current = new Audio("/beep.mp3")
    clickSoundRef.current = new Audio("/click.mp3")

    // Configurar audio
    if (hoverSoundRef.current) {
      hoverSoundRef.current.volume = 0.2
      hoverSoundRef.current.load()
    }

    if (clickSoundRef.current) {
      clickSoundRef.current.volume = 0.3
      clickSoundRef.current.load()
    }

    // Inicializar música cinemática pero NO cargarla todavía
    // para evitar reproducción automática no deseada
    return () => {
      stopCinematicMusic()
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

  // Función para inicializar la música cinemática bajo demanda
  const initCinematicMusic = () => {
    if (!cinematicMusicRef.current) {
      cinematicMusicRef.current = new Audio("/sounds/cinematic-toggle.mp3")
      if (cinematicMusicRef.current) {
        cinematicMusicRef.current.volume = 0.15 // Volumen reducido
        cinematicMusicRef.current.loop = false // Sin bucle
        cinematicMusicRef.current.load()

        // Manejar el final de la reproducción
        cinematicMusicRef.current.addEventListener("ended", () => {
          setIsMusicPlaying(false)
        })
      }
    }
  }

  // Función para reproducir la música cinemática
  const playCinematicMusic = () => {
    if (!isAudioEnabled || isMusicPlaying) return

    initCinematicMusic()

    if (cinematicMusicRef.current) {
      cinematicMusicRef.current.currentTime = 0
      setIsMusicPlaying(true)

      cinematicMusicRef.current.play().catch((error) => {
        console.warn("Cinematic music failed to play:", error)
        setIsMusicPlaying(false)
      })
    }
  }

  // Función para detener la música cinemática
  const stopCinematicMusic = () => {
    if (cinematicMusicRef.current) {
      cinematicMusicRef.current.pause()
      cinematicMusicRef.current.currentTime = 0
      setIsMusicPlaying(false)
    }
  }

  // Handle toggle
  const handleToggle = () => {
    if (isAudioEnabled && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch((error) => {
        console.warn("Click sound failed to play:", error)
      })
    }

    // Reproducir efecto de sonido al cambiar de modo
    if (isAudioEnabled) {
      playCinematicMusic()
    }

    // Toggle cinematic mode
    toggleCinematicMode()
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
      aria-label={isCinematicMode ? "Desactivar modo cinemático" : "Activar modo cinemático"}
      title={isCinematicMode ? "Desactivar modo cinemático" : "Activar modo cinemático"}
      disabled={isMusicPlaying}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#D4AF37] filter blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: isCinematicMode ? 0.6 : isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon */}
      <motion.div
        className="relative z-10"
        animate={{ rotate: isCinematicMode ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isCinematicMode ? <Film className="h-5 w-5 text-[#D4AF37]" /> : <FilmOff className="h-5 w-5 text-[#D4AF37]" />}
      </motion.div>
    </motion.button>
  )
}
