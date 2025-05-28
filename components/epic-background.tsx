"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useImmersiveContext } from "@/context/immersive-context"

interface EpicBackgroundProps {
  className?: string
  intensity?: number // 1-10, controla la intensidad de los efectos
  colorPrimary?: string
  colorSecondary?: string
  colorAccent?: string
}

export function EpicBackground({
  className = "",
  intensity = 5,
  colorPrimary = "#D4AF37",
  colorSecondary = "#8B0000",
  colorAccent = "#4B5320",
}: EpicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isHighPerformance } = useImmersiveContext()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  // Ajustar la intensidad de los efectos
  const particleCount = Math.min(200, Math.floor(intensity * 20))
  const particleSpeed = intensity * 0.05
  const glowIntensity = intensity * 0.1
  const interactiveRadius = intensity * 50

  // Referencia para la animación
  const animationRef = useRef<number>()
  const particlesRef = useRef<any[]>([])
  const timeRef = useRef<number>(0)

  useEffect(() => {
    setIsVisible(true)

    // Si no está en modo de alto rendimiento, no inicializar el canvas
    if (!isHighPerformance) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clase de partícula avanzada
    class Particle {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      life: number
      maxLife: number
      rotation: number
      rotationSpeed: number
      amplitude: number
      frequency: number
      phase: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseSize = Math.random() * 4 + 1
        this.size = this.baseSize
        this.speedX = (Math.random() - 0.5) * particleSpeed
        this.speedY = (Math.random() - 0.5) * particleSpeed

        // Color aleatorio entre los tres colores principales
        const colors = [colorPrimary, colorSecondary, colorAccent]
        this.color = colors[Math.floor(Math.random() * colors.length)]

        this.opacity = Math.random() * 0.6 + 0.2
        this.life = 0
        this.maxLife = Math.random() * 100 + 100
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02

        // Parámetros para movimiento ondulatorio
        this.amplitude = Math.random() * 2
        this.frequency = Math.random() * 0.02
        this.phase = Math.random() * Math.PI * 2
      }

      update(time: number, mouseX: number, mouseY: number) {
        // Movimiento base
        this.x += this.speedX
        this.y += this.speedY

        // Movimiento ondulatorio adicional
        this.x += Math.sin(time * this.frequency + this.phase) * this.amplitude
        this.y += Math.cos(time * this.frequency + this.phase) * this.amplitude

        // Rotación
        this.rotation += this.rotationSpeed

        // Interacción con el mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < interactiveRadius) {
          const force = (interactiveRadius - distance) / interactiveRadius
          this.speedX -= dx * force * 0.02
          this.speedY -= dy * force * 0.02
          this.size = this.baseSize * (1 + force)
          this.opacity = Math.min(1, this.opacity + force * 0.5)
        } else {
          this.size = this.baseSize
        }

        // Límites de velocidad
        this.speedX = Math.max(-1, Math.min(1, this.speedX))
        this.speedY = Math.max(-1, Math.min(1, this.speedY))

        // Rebote en los bordes
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -0.8
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -0.8
        }

        // Ciclo de vida
        this.life++
        if (this.life > this.maxLife) {
          this.life = 0
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        // Dibujar partícula con resplandor
        ctx.shadowBlur = this.size * glowIntensity
        ctx.shadowColor = this.color
        ctx.fillStyle = this.color

        // Forma de la partícula (estrella)
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const outerRadius = this.size
          const innerRadius = this.size / 2

          const outerX = Math.cos(((i * 2) / 5) * Math.PI * 2) * outerRadius
          const outerY = Math.sin(((i * 2) / 5) * Math.PI * 2) * outerRadius
          const innerX = Math.cos(((i * 2 + 1) / 5) * Math.PI * 2) * innerRadius
          const innerY = Math.sin(((i * 2 + 1) / 5) * Math.PI * 2) * innerRadius

          if (i === 0) {
            ctx.moveTo(outerX, outerY)
          } else {
            ctx.lineTo(outerX, outerY)
          }

          ctx.lineTo(innerX, innerY)
        }
        ctx.closePath()
        ctx.fill()

        ctx.restore()
      }
    }

    // Inicializar partículas
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    // Configurar el canvas para que ocupe toda la pantalla
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      // Reiniciar partículas cuando cambia el tamaño
      initParticles()
    }

    window.addEventListener("resize", setCanvasDimensions)
    setCanvasDimensions()

    // Seguimiento del mouse
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Función de animación
    const animate = (timestamp: number) => {
      if (!canvas || !ctx) return

      // Limpiar canvas con un efecto de desvanecimiento
      ctx.fillStyle = "rgba(18, 18, 18, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Actualizar tiempo
      timeRef.current = timestamp * 0.001

      // Actualizar y dibujar partículas
      particlesRef.current.forEach((particle) => {
        particle.update(timeRef.current, mousePosition.x, mousePosition.y)
        particle.draw(ctx)
      })

      // Dibujar conexiones entre partículas cercanas
      ctx.strokeStyle = `rgba(212, 175, 55, 0.15)`
      ctx.lineWidth = 0.5

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.globalAlpha = 1 - distance / 100
            ctx.stroke()
          }
        }
      }

      // Continuar animación
      animationRef.current = requestAnimationFrame(animate)
    }

    // Iniciar animación
    animationRef.current = requestAnimationFrame(animate)

    // Limpieza
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [
    isHighPerformance,
    colorPrimary,
    colorSecondary,
    colorAccent,
    intensity,
    interactiveRadius,
    particleCount,
    particleSpeed,
    glowIntensity,
  ])

  return (
    <motion.div
      className={`fixed inset-0 z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1.5 }}
    >
      {isHighPerformance && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />
      )}

      {/* Gradientes de fondo */}
      <div className="absolute inset-0 bg-gradient-radial from-[#121212] via-[#121212] to-[#0A0A0A] opacity-80"></div>

      {/* Efecto de vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70"></div>

      {/* Efecto de ruido sutil */}
      <div className="absolute inset-0 bg-noise opacity-5"></div>
    </motion.div>
  )
}
