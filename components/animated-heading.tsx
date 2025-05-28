"use client"

import type React from "react"
import { useRef, useEffect, useState, type ReactNode } from "react"
import { useEpicEffects } from "./epic-effects-provider"

interface AnimatedHeadingProps {
  children: ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  delay?: number
  withGlow?: boolean
  withSplitText?: boolean
  withStagger?: boolean
  staggerDelay?: number
  withUnderline?: boolean
  withBackground?: boolean
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  className = "",
  as = "h2",
  delay = 0,
  withGlow = true,
  withSplitText = false,
  withStagger = false,
  staggerDelay = 0.05,
  withUnderline = false,
  withBackground = false,
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [letters, setLetters] = useState<string[]>([])
  const { effectTheme, animationSpeed, glowIntensity, isReducedMotion } = useEpicEffects()

  // Theme-based colors
  const getThemeColor = () => {
    switch (effectTheme) {
      case "history":
        return "text-amber-500"
      case "roadmap":
        return "text-emerald-500"
      case "tokenomics":
        return "text-orange-500"
      case "community":
        return "text-purple-500"
      default:
        return "text-indigo-500"
    }
  }

  const getGlowColor = () => {
    switch (effectTheme) {
      case "history":
        return "text-shadow-gold"
      case "roadmap":
        return "text-shadow-green"
      case "tokenomics":
        return "text-shadow-orange"
      case "community":
        return "text-shadow-purple"
      default:
        return "text-shadow-indigo"
    }
  }

  const getBackgroundColor = () => {
    switch (effectTheme) {
      case "history":
        return "bg-amber-900/10"
      case "roadmap":
        return "bg-emerald-900/10"
      case "tokenomics":
        return "bg-orange-900/10"
      case "community":
        return "bg-purple-900/10"
      default:
        return "bg-indigo-900/10"
    }
  }

  const getUnderlineColor = () => {
    switch (effectTheme) {
      case "history":
        return "border-amber-500"
      case "roadmap":
        return "border-emerald-500"
      case "tokenomics":
        return "border-orange-500"
      case "community":
        return "border-purple-500"
      default:
        return "border-indigo-500"
    }
  }

  // Split text into letters for animation
  useEffect(() => {
    if (typeof children === "string" && withSplitText) {
      setLetters(children.split(""))
    }
  }, [children, withSplitText])

  // Intersection Observer for reveal animation
  useEffect(() => {
    if (isReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      },
    )

    const currentRef = headingRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isReducedMotion])

  // Render split text animation
  const renderSplitText = () => {
    return letters.map((letter, index) => (
      <span
        key={index}
        className="inline-block"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: isReducedMotion
            ? "none"
            : `opacity ${0.5 * animationSpeed}s ease-out ${delay + (withStagger ? index * staggerDelay : 0)}s, 
               transform ${0.5 * animationSpeed}s ease-out ${delay + (withStagger ? index * staggerDelay : 0)}s`,
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ))
  }

  // Combine classes
  const headingClasses = [
    className,
    withGlow && !isReducedMotion ? getGlowColor() : "",
    getThemeColor(),
    withUnderline ? `border-b-2 pb-2 ${getUnderlineColor()}` : "",
    withBackground ? `${getBackgroundColor()} px-4 py-2 rounded-md` : "",
  ]
    .filter(Boolean)
    .join(" ")

  // Render heading with appropriate tag
  const HeadingTag = as

  return (
    <HeadingTag
      ref={headingRef}
      className={headingClasses}
      style={{
        opacity: withSplitText ? 1 : isVisible ? 1 : 0,
        transform: withSplitText ? "none" : isVisible ? "translateY(0)" : "translateY(20px)",
        transition:
          isReducedMotion || withSplitText
            ? "none"
            : `opacity ${0.5 * animationSpeed}s ease-out ${delay}s, transform ${0.5 * animationSpeed}s ease-out ${delay}s`,
      }}
    >
      {withSplitText ? renderSplitText() : children}
    </HeadingTag>
  )
}

export default AnimatedHeading
