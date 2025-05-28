"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface AnimatedBackgroundProps {
  className?: string
  particleCount?: number
  particleSize?: number
  particleSpeed?: number
  connectDistance?: number
  glowIntensity?: number
}

export function AnimatedBackground({
  className = "",
  particleCount,
  particleSize,
  particleSpeed,
  connectDistance = 150,
  glowIntensity = 2, // Aumentado de 1 a 2 para más intensidad
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Determinar el número de partículas basado en el tamaño de la pantalla
    // Aumentamos la densidad de partículas para pantallas más grandes
    const isMobile = window.innerWidth < 768
    const autoParticleCount = isMobile
      ? Math.min(30, Math.floor(window.innerWidth / 40))
      : Math.min(80, Math.floor(window.innerWidth / 25))
    const finalParticleCount = particleCount || autoParticleCount

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string) {
        this.x = x
        this.y = y
        this.size = size
        this.speedX = speedX
        this.speedY = speedY
        this.color = color
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX *= -1
        }

        if (this.y > canvas.height || this.y < 0) {
          this.speedY *= -1
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []

    const createParticles = () => {
      particles.length = 0
      const isDark = theme === "dark"

      for (let i = 0; i < finalParticleCount; i++) {
        const size = particleSize || Math.random() * 3 + 1.5 // Ligeramente más grandes
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const speed = particleSpeed || 0.6 // Aumentado de 0.5 a 0.6
        const speedX = (Math.random() - 0.5) * speed
        const speedY = (Math.random() - 0.5) * speed

        // Gold particles with varying opacity - increased opacity
        const opacity = Math.random() * 0.6 + 0.2 // Aumentado para más visibilidad
        const color = isDark
          ? `rgba(212, 175, 55, ${opacity * glowIntensity})` // Gold in dark mode
          : `rgba(184, 134, 11, ${opacity * glowIntensity})` // Darker gold in light mode

        particles.push(new Particle(x, y, size, speedX, speedY, color))
      }
    }

    createParticles()

    // Connect particles with lines
    const connectParticles = () => {
      if (!ctx) return

      const maxDistance = connectDistance

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            const isDark = theme === "dark"

            ctx.beginPath()
            ctx.strokeStyle = isDark
              ? `rgba(212, 175, 55, ${opacity * 0.25 * glowIntensity})` // Aumentado de 0.15 a 0.25
              : `rgba(184, 134, 11, ${opacity * 0.15 * glowIntensity})` // Aumentado de 0.1 a 0.15
            ctx.lineWidth = 1.2 // Aumentado de 1 a 1.2
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      connectParticles()
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    // Update particles when theme changes
    const observer = new MutationObserver(() => {
      createParticles()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      observer.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [theme, particleCount, particleSize, particleSpeed, connectDistance, glowIntensity])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
