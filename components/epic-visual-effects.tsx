"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"

type EffectType = "particles" | "glow" | "parallax" | "reveal" | "wave" | "fire" | "water" | "earth" | "wind"

interface EpicVisualEffectsProps {
  type: EffectType
  intensity?: "low" | "medium" | "high" | "extreme"
  color?: string
  children?: React.ReactNode
  className?: string
  theme?: "history" | "roadmap" | "tokenomics" | "community"
}

export const EpicVisualEffects: React.FC<EpicVisualEffectsProps> = ({
  type,
  intensity = "medium",
  color,
  children,
  className = "",
  theme = "history",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const { theme: currentTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Intensity multiplier based on the selected intensity
  const intensityMultiplier = {
    low: 0.5,
    medium: 1,
    high: 2,
    extreme: 4,
  }[intensity]

  // Theme-based colors
  const themeColors = {
    history: {
      primary: "#8B4513",
      secondary: "#D2B48C",
      accent: "#F5DEB3",
      dark: "#3E2723",
      light: "#FFF8E1",
    },
    roadmap: {
      primary: "#1E88E5",
      secondary: "#64B5F6",
      accent: "#BBDEFB",
      dark: "#0D47A1",
      light: "#E3F2FD",
    },
    tokenomics: {
      primary: "#4CAF50",
      secondary: "#81C784",
      accent: "#C8E6C9",
      dark: "#2E7D32",
      light: "#E8F5E9",
    },
    community: {
      primary: "#9C27B0",
      secondary: "#BA68C8",
      accent: "#E1BEE7",
      dark: "#6A1B9A",
      light: "#F3E5F5",
    },
  }

  const selectedColor = color || themeColors[theme].primary
  const isDark = currentTheme === "dark"

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * intensityMultiplier])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95])

  useEffect(() => {
    setMounted(true)

    if (type === "particles" && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const particles: {
        x: number
        y: number
        size: number
        speedX: number
        speedY: number
        color: string
        opacity: number
      }[] = []

      const particleCount = Math.floor(50 * intensityMultiplier)

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: selectedColor,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle) => {
          ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
            .toString(16)
            .padStart(2, "0")}`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()

          particle.x += particle.speedX
          particle.y += particle.speedY

          if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX *= -1
          }

          if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY *= -1
          }
        })

        requestAnimationFrame(animate)
      }

      animate()

      const handleResize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [type, intensityMultiplier, selectedColor])

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  // Render different effects based on type
  const renderEffect = () => {
    switch (type) {
      case "particles":
        return (
          <div className="relative w-full h-full">
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
            <div className="relative z-10">{children}</div>
          </div>
        )

      case "glow":
        return (
          <div className={`relative overflow-hidden ${isDark ? "glow-effect-dark" : "glow-effect-light"}`}>
            <div
              className="absolute inset-0 blur-[50px] opacity-30"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${selectedColor}, transparent 70%)`,
                transform: `scale(${1 + intensityMultiplier * 0.5})`,
              }}
            />
            <div className="relative z-10">{children}</div>
          </div>
        )

      case "parallax":
        return (
          <motion.div style={{ y, opacity }} className="relative">
            {children}
          </motion.div>
        )

      case "reveal":
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 * intensityMultiplier, ease: "easeOut" }}
            className="relative"
          >
            {children}
          </motion.div>
        )

      case "wave":
        return (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <div
                className="wave-animation"
                style={{
                  animationDuration: `${8 / intensityMultiplier}s`,
                  background: `linear-gradient(180deg, transparent, ${selectedColor})`,
                }}
              ></div>
              <div
                className="wave-animation delay-1"
                style={{
                  animationDuration: `${12 / intensityMultiplier}s`,
                  background: `linear-gradient(180deg, transparent, ${selectedColor})`,
                }}
              ></div>
              <div
                className="wave-animation delay-2"
                style={{
                  animationDuration: `${16 / intensityMultiplier}s`,
                  background: `linear-gradient(180deg, transparent, ${selectedColor})`,
                }}
              ></div>
            </div>
            <div className="relative z-10">{children}</div>
          </div>
        )

      case "fire":
        return (
          <div className="relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-1/3 z-0">
              <div
                className="fire-effect"
                style={{
                  animationDuration: `${2 / intensityMultiplier}s`,
                  background: `linear-gradient(to top, ${selectedColor}, transparent)`,
                }}
              ></div>
            </div>
            <div className="relative z-10">{children}</div>
          </div>
        )

      case "water":
        return (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-30">
              <div
                className="water-ripple"
                style={{
                  animationDuration: `${5 / intensityMultiplier}s`,
                  borderColor: selectedColor,
                }}
              ></div>
              <div
                className="water-ripple delay-1"
                style={{
                  animationDuration: `${5 / intensityMultiplier}s`,
                  borderColor: selectedColor,
                }}
              ></div>
              <div
                className="water-ripple delay-2"
                style={{
                  animationDuration: `${5 / intensityMultiplier}s`,
                  borderColor: selectedColor,
                }}
              ></div>
            </div>
            <div className="relative z-10">{children}</div>
          </div>
        )

      case "earth":
        return (
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 100 * intensityMultiplier,
              damping: 20,
            }}
          >
            <div className="absolute inset-0 z-0 opacity-20 bg-texture"></div>
            <div className="relative z-10">{children}</div>
          </motion.div>
        )

      case "wind":
        return (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <div
                className="wind-lines"
                style={{
                  animationDuration: `${3 / intensityMultiplier}s`,
                  background: `linear-gradient(90deg, transparent 50%, ${selectedColor} 50%)`,
                  backgroundSize: `${20 * intensityMultiplier}px 100%`,
                }}
              ></div>
            </div>
            <div className="relative z-10">{children}</div>
          </div>
        )

      default:
        return <div className="relative">{children}</div>
    }
  }

  return (
    <div ref={containerRef} className={`epic-visual-effects ${className}`}>
      {renderEffect()}
    </div>
  )
}

export default EpicVisualEffects
