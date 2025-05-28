"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useEpicEffects } from "./epic-effects-provider"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { effectTheme, particleDensity, animationSpeed, isReducedMotion } = useEpicEffects()
  const animationFrameRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    if (isReducedMotion) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Determinar el color base según el tema
    let baseColor = "rgba(212, 175, 55, 0.5)" // Dorado por defecto

    switch (effectTheme) {
      case "history":
        baseColor = "rgba(212, 175, 55, 0.5)" // Dorado
        break
      case "roadmap":
        baseColor = "rgba(139, 0, 0, 0.5)" // Rojo
        break
      case "tokenomics":
        baseColor = "rgba(212, 175, 55, 0.5)" // Dorado
        break
      case "community":
        baseColor = "rgba(139, 0, 0, 0.5)" // Rojo
        break
      default:
        baseColor = "rgba(212, 175, 55, 0.5)" // Dorado
    }

    // Calcular número de partículas basado en la densidad y el tamaño de la pantalla
    const particleCount = Math.min(100, Math.floor((particleDensity / 100) * (window.innerWidth / 20)))

    // Definir la función initParticles ANTES de usarla en handleResize
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5 * animationSpeed,
          speedY: (Math.random() - 0.5) * 0.5 * animationSpeed,
          color: baseColor,
          alpha: Math.random() * 0.5 + 0.1,
        })
      }
    }

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      // Ahora podemos llamar a initParticles con seguridad
      initParticles()
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Inicializar partículas
    initParticles()

    // Función de animación
    const animate = () => {
      if (!canvas || !ctx) return

      // Limpiar canvas con un efecto de desvanecimiento
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Actualizar y dibujar partículas
      particlesRef.current.forEach((particle) => {
        // Actualizar posición
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Rebote en los bordes
        if (particle.x > window.innerWidth || particle.x < 0) {
          particle.speedX = -particle.speedX
        }

        if (particle.y > window.innerHeight || particle.y < 0) {
          particle.speedY = -particle.speedY
        }

        // Dibujar partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("0.5", particle.alpha.toString())
        ctx.fill()
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
            ctx.globalAlpha = 1
          }
        }
      }

      // Continuar animación
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Iniciar animación
    animationFrameRef.current = requestAnimationFrame(animate)

    // Limpieza
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [effectTheme, particleDensity, animationSpeed, isReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

export default ParticleBackground
