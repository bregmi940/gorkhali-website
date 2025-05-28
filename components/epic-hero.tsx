"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useImmersiveContext } from "@/context/immersive-context"

interface EpicHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  overlayOpacity?: number
  children?: React.ReactNode
  glowIntensity?: number // 1-10
  animationIntensity?: number // 1-10
}

export function EpicHero({
  title,
  subtitle,
  backgroundImage = "/images/king-with-temples.png",
  overlayOpacity = 0.7,
  children,
  glowIntensity = 5,
  animationIntensity = 5,
}: EpicHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const { isHighPerformance } = useImmersiveContext()
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax effect values con mayor intensidad
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${30 * animationIntensity}%`])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.2 * animationIntensity])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 5 * animationIntensity])

  // Handle visibility
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Efecto de seguimiento del mouse para el título
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHighPerformance) return

      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHighPerformance])

  // Calcular el efecto 3D basado en la posición del mouse
  const calculateMouseEffect = () => {
    if (!titleRef.current || !isHighPerformance) return { x: 0, y: 0 }

    const rect = titleRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const moveX = (mousePosition.x - centerX) / 50
    const moveY = (mousePosition.y - centerY) / 50

    return { x: moveX * animationIntensity * 0.2, y: moveY * animationIntensity * 0.2 }
  }

  const mouseEffect = calculateMouseEffect()

  return (
    <motion.div
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background with enhanced parallax effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y,
          scale,
          rotateZ: rotation,
        }}
      >
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt="Epic Hero Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay gradiente mejorado */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#121212]/30 via-[#121212]/60 to-[#121212]"
          style={{ opacity: overlayOpacity }}
        />

        {/* Efecto de viñeta */}
        <div className="absolute inset-0 bg-radial-vignette opacity-50"></div>

        {/* Efecto de ruido sutil */}
        <div className="absolute inset-0 bg-noise opacity-5"></div>
      </motion.div>

      {/* Partículas flotantes */}
      {isHighPerformance && <FloatingParticles intensity={animationIntensity} />}

      {/* Content with enhanced animations */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
        style={{ opacity }}
      >
        {/* TÍTULO CORREGIDO PARA NO SEPARARSE EN MÓVIL */}
        <motion.h1
          ref={titleRef}
          className="relative text-4xl sm:text-5xl md:text-7xl font-bold mb-6 whitespace-nowrap"
          style={{
            textShadow: `0 0 ${glowIntensity * 5}px rgba(212, 175, 55, ${glowIntensity * 0.1})`,
            transform: `perspective(1000px) rotateX(${mouseEffect.y}deg) rotateY(${mouseEffect.x}deg)`,
          }}
        >
          <span className="text-[#D4AF37] inline-block">GORKHALI&nbsp;(GKR)</span>
        </motion.h1>

        {/* Subtítulo con animación por palabra */}
        {subtitle && (
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-[#D4AF37]/90 max-w-3xl mb-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Contenido adicional con animación de aparición */}
        {children && (
          <motion.div
            className="mt-8 relative z-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 2,
            }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Componente de partículas flotantes
function FloatingParticles({ intensity = 5 }) {
  const particlesRef = useRef<HTMLDivElement>(null)
  const particleCount = Math.min(20, Math.floor(intensity * 2))

  useEffect(() => {
    const particles = particlesRef.current
    if (!particles) return

    // Limpiar partículas existentes
    particles.innerHTML = ""

    // Crear nuevas partículas
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")

      // Estilos base
      particle.className = "absolute rounded-full bg-[#D4AF37] blur-sm"

      // Tamaño aleatorio
      const size = Math.random() * 10 + 5
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Posición inicial aleatoria
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Opacidad aleatoria
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`

      // Animación personalizada
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5

      particle.animate(
        [
          {
            transform: `translate(0, 0) scale(1)`,
            opacity: Math.random() * 0.5 + 0.1,
          },
          {
            transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.5 + 0.8})`,
            opacity: Math.random() * 0.7 + 0.3,
          },
          {
            transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1)`,
            opacity: Math.random() * 0.5 + 0.1,
          },
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          iterations: Number.POSITIVE_INFINITY,
          direction: "alternate",
          easing: "ease-in-out",
        },
      )

      particles.appendChild(particle)
    }
  }, [particleCount, intensity])

  return <div ref={particlesRef} className="absolute inset-0 z-5 pointer-events-none"></div>
}
