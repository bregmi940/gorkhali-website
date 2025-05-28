"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface EpicCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  glowIntensity?: number // 1-10
  depth?: number // 1-10, controla el efecto 3D
  interactive?: boolean
}

export function EpicCard({
  children,
  className = "",
  glowColor = "#D4AF37",
  glowIntensity = 5,
  depth = 5,
  interactive = true,
}: EpicCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values para el efecto 3D
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Suavizar el movimiento
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [depth, -depth]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-depth, depth]), springConfig)

  // Valores para el brillo
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 50]), springConfig)
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-50, 50]), springConfig)

  // Manejar movimiento del mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Normalizar la posición del mouse entre -0.5 y 0.5
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  // Restablecer la posición cuando el mouse sale
  const handleMouseLeave = () => {
    if (!interactive) return

    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl bg-[#2A2A2A] border border-[#8A6D3B]/30",
        interactive && "cursor-pointer transition-all duration-300",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={
        interactive
          ? {
              perspective: 800,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : {}
      }
      whileHover={interactive ? { scale: 1.03 } : {}}
      whileTap={interactive ? { scale: 0.97 } : {}}
    >
      {/* Contenido dinámico con efecto de transición */}
      <div className="relative z-20 p-6 w-full h-full transition-all duration-300 ease-in-out">
        <div className={`${isHovered && interactive ? "scale-105 transform" : ""} transition-transform duration-300`}>
          {children}
        </div>
      </div>

      {/* Efecto de brillo */}
      {interactive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}${Math.round(glowIntensity * 10)} 0%, transparent 70%)`,
            opacity: isHovered ? 0.15 : 0,
          }}
        />
      )}

      {/* Efecto de borde brillante */}
      {interactive && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: `0 0 ${glowIntensity * 2}px ${glowIntensity / 2}px ${glowColor}${Math.round(glowIntensity * 5)}`,
            opacity: isHovered ? 0.5 : 0,
          }}
        />
      )}

      {/* Efecto de esquina */}
      <div className="absolute top-0 right-0 h-24 w-24 bg-[#8B0000]/10 rounded-bl-full"></div>

      {/* Efecto de borde inferior */}
      {interactive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      )}
    </motion.div>
  )
}
