"use client"

import type React from "react"
import { useState, useRef, useEffect, type ReactNode } from "react"
import { useEpicEffects } from "./epic-effects-provider"

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  withGlow?: boolean
  withRipple?: boolean
  withHoverSound?: boolean
  withClickSound?: boolean
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  withGlow = true,
  withRipple = true,
  withHoverSound = true,
  withClickSound = true,
  disabled = false,
  type = "button",
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const rippleIdRef = useRef(0)

  const { effectTheme, animationSpeed, glowIntensity, isReducedMotion } = useEpicEffects()

  // Theme-based styles
  const getThemeClasses = () => {
    const baseClasses = {
      primary: {
        history: "bg-amber-600 hover:bg-amber-500 text-white",
        roadmap: "bg-emerald-600 hover:bg-emerald-500 text-white",
        tokenomics: "bg-orange-600 hover:bg-orange-500 text-white",
        community: "bg-purple-600 hover:bg-purple-500 text-white",
        default: "bg-indigo-600 hover:bg-indigo-500 text-white",
      },
      secondary: {
        history: "bg-amber-200 hover:bg-amber-100 text-amber-900",
        roadmap: "bg-emerald-200 hover:bg-emerald-100 text-emerald-900",
        tokenomics: "bg-orange-200 hover:bg-orange-100 text-orange-900",
        community: "bg-purple-200 hover:bg-purple-100 text-purple-900",
        default: "bg-indigo-200 hover:bg-indigo-100 text-indigo-900",
      },
      outline: {
        history: "border-2 border-amber-500 text-amber-500 hover:bg-amber-500/10",
        roadmap: "border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10",
        tokenomics: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10",
        community: "border-2 border-purple-500 text-purple-500 hover:bg-purple-500/10",
        default: "border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500/10",
      },
      ghost: {
        history: "text-amber-500 hover:bg-amber-500/10",
        roadmap: "text-emerald-500 hover:bg-emerald-500/10",
        tokenomics: "text-orange-500 hover:bg-orange-500/10",
        community: "text-purple-500 hover:bg-purple-500/10",
        default: "text-indigo-500 hover:bg-indigo-500/10",
      },
    }

    return baseClasses[variant][effectTheme]
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1 text-sm"
      case "lg":
        return "px-6 py-3 text-lg"
      default:
        return "px-4 py-2"
    }
  }

  // Glow effect
  const getGlowStyle = () => {
    if (!withGlow || isReducedMotion || !isHovered) return {}

    const glowColors = {
      history: `0 0 15px ${Math.floor(glowIntensity * 5)}px rgba(245, 158, 11, 0.5)`,
      roadmap: `0 0 15px ${Math.floor(glowIntensity * 5)}px rgba(16, 185, 129, 0.5)`,
      tokenomics: `0 0 15px ${Math.floor(glowIntensity * 5)}px rgba(249, 115, 22, 0.5)`,
      community: `0 0 15px ${Math.floor(glowIntensity * 5)}px rgba(139, 92, 246, 0.5)`,
      default: `0 0 15px ${Math.floor(glowIntensity * 5)}px rgba(99, 102, 241, 0.5)`,
    }

    return {
      boxShadow: glowColors[effectTheme],
    }
  }

  // Initialize audio elements
  useEffect(() => {
    if (typeof window === "undefined") return

    if (withHoverSound) {
      hoverSoundRef.current = new Audio("/sounds/hover.mp3")
      hoverSoundRef.current.volume = 0.2
    }

    if (withClickSound) {
      clickSoundRef.current = new Audio("/sounds/click.mp3")
      clickSoundRef.current.volume = 0.3
    }

    return () => {
      hoverSoundRef.current = null
      clickSoundRef.current = null
    }
  }, [withHoverSound, withClickSound])

  // Handle mouse enter
  const handleMouseEnter = () => {
    if (disabled) return
    setIsHovered(true)

    if (withHoverSound && hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0
      hoverSoundRef.current.play().catch(() => {})
    }
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (disabled) return
    setIsHovered(false)
  }

  // Handle click with ripple effect
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (withClickSound && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch(() => {})
    }

    if (withRipple && !isReducedMotion) {
      const button = buttonRef.current
      if (!button) return

      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const id = rippleIdRef.current++
      setRipples((prev) => [...prev, { x, y, id }])

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
      }, 1000)
    }

    if (onClick) onClick()
  }

  // Combine all classes
  const buttonClasses = [
    "relative overflow-hidden transition-all rounded-md font-medium",
    getSizeClasses(),
    getThemeClasses(),
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      ref={buttonRef}
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      style={getGlowStyle()}
    >
      {children}

      {/* Ripple effects */}
      {withRipple &&
        !isReducedMotion &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
    </button>
  )
}

export default AnimatedButton
export { AnimatedButton }
