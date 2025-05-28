"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface EpicSectionProps {
  children: React.ReactNode
  className?: string
  backgroundEffect?: "none" | "gradient" | "particles" | "noise" | "glow"
  parallaxIntensity?: number // 1-10
  glowColor?: string
  glowIntensity?: number // 1-10
  id?: string
}

export function EpicSection({
  children,
  className = "",
  backgroundEffect = "none",
  parallaxIntensity = 5,
  glowColor = "#D4AF37",
  glowIntensity = 5,
  id,
}: EpicSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Efectos de parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${parallaxIntensity * 5}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  // Determinar el fondo según el efecto seleccionado
  const getBackgroundClasses = () => {
    switch (backgroundEffect) {
      case "gradient":
        return "bg-gradient-to-b from-[#121212] via-[#1A1A1A] to-[#121212]"
      case "particles":
        return "bg-[#121212] relative overflow-hidden"
      case "noise":
        return "bg-[#121212] bg-noise"
      case "glow":
        return "bg-[#121212] relative overflow-hidden"
      default:
        return "bg-[#121212]"
    }
  }

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className={cn("relative py-20 px-4 md:px-12 overflow-hidden", getBackgroundClasses(), className)}
      style={{
        y,
        opacity,
        scale,
      }}
    >
      {/* Efectos de fondo */}
      {backgroundEffect === "particles" && <ParticlesBackground glowColor={glowColor} intensity={glowIntensity} />}
      {backgroundEffect === "glow" && <GlowBackground glowColor={glowColor} intensity={glowIntensity} />}

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto">{children}</div>
    </motion.section>
  )
}

// Componente de fondo de partículas
function ParticlesBackground({ glowColor = "#D4AF37", intensity = 5 }) {
  const particleCount = Math.min(30, Math.floor(intensity * 3))

  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: particleCount }).map((_, i) => {
        const size = Math.random() * 4 + 2
        const initialX = Math.random() * 100
        const initialY = Math.random() * 100
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 5

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: glowColor,
              left: `${initialX}%`,
              top: `${initialY}%`,
              filter: `blur(${size / 2}px)`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        )
      })}
    </div>
  )
}

// Componente de fondo con resplandor
function GlowBackground({ glowColor = "#D4AF37", intensity = 5 }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Resplandor central */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: `${intensity * 20}%`,
          height: `${intensity * 20}%`,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${glowColor}${Math.round(intensity * 10)} 0%, transparent 70%)`,
          opacity: intensity * 0.05,
        }}
      />

      {/* Resplandores adicionales */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "30%",
          height: "30%",
          left: "20%",
          top: "30%",
          background: `radial-gradient(circle, ${glowColor}${Math.round(intensity * 8)} 0%, transparent 70%)`,
          opacity: intensity * 0.03,
        }}
      />

      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "25%",
          height: "25%",
          right: "15%",
          bottom: "20%",
          background: `radial-gradient(circle, ${glowColor}${Math.round(intensity * 8)} 0%, transparent 70%)`,
          opacity: intensity * 0.03,
        }}
      />
    </div>
  )
}
