"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface HeroVideoBackgroundProps {
  className?: string
}

export function HeroVideoBackground({ className = "" }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
      // Intentar reproducir el video solo después de la interacción del usuario
      const attemptAutoplay = () => {
        video.play().catch((error) => {
          console.warn("Video autoplay failed - this is expected in some browsers:", error)
          // No marcamos como error, ya que esto es esperado en muchos navegadores
        })
      }

      // Intentar reproducir inmediatamente (funcionará en algunos navegadores)
      attemptAutoplay()

      // También configurar event listeners para reproducir después de la interacción del usuario
      const playOnInteraction = () => {
        attemptAutoplay()
        // Limpiar event listeners después del primer intento
        document.removeEventListener("click", playOnInteraction)
        document.removeEventListener("touchstart", playOnInteraction)
      }

      document.addEventListener("click", playOnInteraction, { once: true })
      document.addEventListener("touchstart", playOnInteraction, { once: true })
    }

    const handleError = () => {
      console.error("Video failed to load")
      setVideoError(true)
    }

    video.addEventListener("canplaythrough", handleCanPlay)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay)
      video.removeEventListener("error", handleError)
      document.removeEventListener("click", handleCanPlay)
      document.removeEventListener("touchstart", handleCanPlay)
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded || videoError ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/digital-king.png" // Usar una imagen como fallback
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
            {/* Fallback para navegadores que no soportan video */}
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback a imagen estática si el video falla
          <div className="absolute inset-0">
            <Image src="/images/digital-king.png" alt="Hero Background" fill className="object-cover" priority />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/80 to-[#121212] dark:from-[#121212]/80 dark:to-[#121212] light:from-[#f8f5f0]/80 light:to-[#f8f5f0] z-10"></div>
      </motion.div>
    </div>
  )
}
