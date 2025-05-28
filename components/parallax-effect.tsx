"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface ParallaxEffectProps {
  children: React.ReactNode
  depth?: number
  className?: string
  disabled?: boolean
}

export function ParallaxEffect({ children, depth = 30, className = "", disabled = false }: ParallaxEffectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const mousePosition = useMousePosition()
  const springConfig = { damping: 15, stiffness: 150 }

  // Usar valores por defecto seguros
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  // Efecto de paralaje basado en la posición del mouse
  useEffect(() => {
    if (disabled || !ref.current || !mousePosition) return

    // Usar requestAnimationFrame para mejor rendimiento
    let animationFrameId: number

    const updateParallax = () => {
      if (!ref.current) return

      try {
        const rect = ref.current.getBoundingClientRect()

        // Verificar si el elemento está en el viewport
        const isInView =
          rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth

        if (!isInView) return

        // Calcular posición relativa del mouse
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        // Calcular distancia desde el centro con valores seguros
        const mouseX = mousePosition.x || 0
        const mouseY = mousePosition.y || 0
        const distanceX = (mouseX - centerX) / 20
        const distanceY = (mouseY - centerY) / 20

        // Aplicar efecto de paralaje basado en la profundidad
        const parallaxX = (distanceX / (100 / depth)) * -1
        const parallaxY = (distanceY / (100 / depth)) * -1

        // Actualizar valores con límites
        x.set(Math.max(-50, Math.min(50, parallaxX)))
        y.set(Math.max(-50, Math.min(50, parallaxY)))
      } catch (error) {
        console.warn("Error in parallax effect:", error)
      }

      // Continuar la animación
      animationFrameId = requestAnimationFrame(updateParallax)
    }

    // Iniciar la animación
    animationFrameId = requestAnimationFrame(updateParallax)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [mousePosition, depth, x, y, disabled])

  // Efecto de paralaje basado en el scroll
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, depth * 2])

  // Si está deshabilitado, simplemente renderizar los children
  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x,
        y,
        translateY: yParallax,
      }}
    >
      {children}
    </motion.div>
  )
}
