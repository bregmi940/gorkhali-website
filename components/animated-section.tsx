"use client"

import type React from "react"
import { useRef, useEffect, useState, type ReactNode, useCallback } from "react"
import { useEpicEffects } from "./epic-effects-provider"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  threshold?: number
  withGlow?: boolean
  withParallax?: boolean
  parallaxFactor?: number
  id?: string
  isTimelineItem?: boolean
  timelinePosition?: "left" | "right"
  timelineConnector?: boolean
  timelineDate?: string
  contentType?: "image" | "text" // Nueva propiedad para especificar el tipo de contenido
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  threshold = 0.1,
  withGlow = false,
  withParallax = false,
  parallaxFactor,
  id,
  isTimelineItem,
  timelinePosition,
  timelineConnector,
  timelineDate,
  contentType,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { effectTheme, animationSpeed, glowIntensity, parallaxStrength, isReducedMotion } = useEpicEffects()

  // Theme-based glow colors
  const getGlowColor = () => {
    switch (effectTheme) {
      case "history":
        return "rgba(255, 215, 0, 0.3)" // Gold
      case "roadmap":
        return "rgba(76, 175, 80, 0.3)" // Green
      case "tokenomics":
        return "rgba(255, 152, 0, 0.3)" // Orange
      case "community":
        return "rgba(156, 39, 176, 0.3)" // Purple
      default:
        return "rgba(138, 43, 226, 0.3)" // BlueViolet
    }
  }

  // Memoize the getGlowColor function to prevent unnecessary re-renders
  const memoizedGetGlowColor = useCallback(getGlowColor, [effectTheme])

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
        threshold,
        rootMargin: "0px",
      },
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, isReducedMotion])

  // Mouse move handler for parallax effect
  useEffect(() => {
    if (!withParallax || isReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [withParallax, isReducedMotion])

  // Calculate transform values based on direction
  const getInitialTransform = () => {
    if (isReducedMotion) return "translate3d(0, 0, 0)"

    const distance = 50
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`
      case "down":
        return `translate3d(0, -${distance}px, 0)`
      case "left":
        return `translate3d(${distance}px, 0, 0)`
      case "right":
        return `translate3d(-${distance}px, 0, 0)`
      default:
        return `translate3d(0, ${distance}px, 0)`
    }
  }

  // Calculate parallax transform
  const getParallaxTransform = () => {
    if (!withParallax || isReducedMotion) return ""

    const factor = parallaxFactor || parallaxStrength
    const rect = sectionRef.current?.getBoundingClientRect()

    if (!rect) return ""

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const moveX = (mousePosition.x - centerX) * factor * -0.02
    const moveY = (mousePosition.y - centerY) * factor * -0.02

    return `translate3d(${moveX}px, ${moveY}px, 0)`
  }

  // Combine styles
  const sectionStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? getParallaxTransform() : getInitialTransform(),
    transition: isReducedMotion
      ? "none"
      : `opacity ${duration * animationSpeed}s ease-out ${delay}s, transform ${duration * animationSpeed}s ease-out ${delay}s`,
    boxShadow:
      withGlow && isVisible && !isReducedMotion
        ? `0 0 30px ${Math.floor(glowIntensity * 10)}px ${memoizedGetGlowColor()}`
        : "none",
  }

  // Añadir estilos globales para las animaciones
  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style")
      style.innerHTML = `
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes pulse-light {
      0% { opacity: 0.1; }
      100% { opacity: 0.4; }
    }
    @keyframes float-particle {
      0% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-20px) translateX(10px); }
      100% { transform: translateY(20px) translateX(-10px); }
    }
    @keyframes animate-border {
      0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
      100% { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
    }
    .animate-pulse-subtle {
      animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .animated-border {
      position: relative;
      box-shadow: 0 0 15px 0 ${memoizedGetGlowColor().replace("0.3", "0.6")};
      animation: animate-border 2s infinite;
    }
    .animated-border::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 1px solid ${memoizedGetGlowColor().replace("0.3", "0.2")};
      border-radius: inherit;
      animation: gradient-shift 8s ease infinite;
      pointer-events: none;
    }
  `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [effectTheme, glowIntensity, memoizedGetGlowColor])

  return (
    <div
      ref={sectionRef}
      className={`
    relative overflow-hidden rounded-lg transition-all 
    ${isVisible ? "animate-pulse-subtle" : ""} 
    ${withGlow ? "animated-border" : ""}
    ${isTimelineItem ? `timeline-item timeline-${timelinePosition || "left"}` : ""}
    ${contentType === "image" ? "md:order-1" : contentType === "text" ? "md:order-2" : ""}
    ${className}
  `}
      style={{
        ...sectionStyle,
        backgroundImage: withGlow ? `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,35,0.9) 100%)` : "none",
        backdropFilter: "blur(8px)",
      }}
      id={id}
    >
      {isTimelineItem && timelineDate && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d4af37] text-black px-4 py-1 rounded-full font-bold z-20">
          {timelineDate}
        </div>
      )}
      {isTimelineItem && timelineConnector && (
        <>
          <div className="absolute top-1/2 left-0 w-4 h-0.5 bg-[#d4af37] -translate-x-4"></div>
          <div className="absolute top-1/2 right-0 w-4 h-0.5 bg-[#d4af37] translate-x-4"></div>
          <div
            className={`absolute top-1/2 ${timelinePosition === "right" ? "left-0 -translate-x-6" : "right-0 translate-x-6"} w-2 h-2 rounded-full bg-[#d4af37] -translate-y-1/2`}
          ></div>
        </>
      )}
      <div className="relative z-10 p-4">
        <div
          className={`relative overflow-hidden rounded-md border-l-4 border-r-4 border-[#8b0000] bg-gradient-to-b from-black/40 to-black/60 p-4 shadow-lg ${contentType === "image" ? "h-full flex items-center justify-center" : ""}`}
        >
          {/* Decoración superior - Kukri (cuchillo tradicional Gorkhali) */}
          <div className="absolute -top-1 left-1/2 h-2 w-24 -translate-x-1/2 transform bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
          <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 transform rounded-full border-2 border-[#d4af37] bg-[#8b0000]"></div>

          {/* Efecto de textura de batalla */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4YjAwMDAiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10"></div>

          {/* Esquinas estilo Gorkhali */}
          <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#d4af37]"></div>
          <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#d4af37]"></div>
          <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#d4af37]"></div>
          <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#d4af37]"></div>

          {/* Efecto de resplandor de batalla */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#8b0000]/10 via-transparent to-[#d4af37]/10 opacity-50"></div>

          {/* Contenido con estilo mejorado - Ahora con soporte para layout flexible */}
          <div className="relative z-10 font-garamond">
            {contentType === "image" ? (
              <div className="flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden rounded-md border-2 border-[#d4af37]/50">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#8b0000]/20 to-black/40 mix-blend-overlay"></div>
                  {children}
                </div>
              </div>
            ) : contentType === "text" ? (
              <div
                className="[&>h1]:mb-4 [&>h1]:font-bold [&>h1]:text-2xl [&>h1]:uppercase [&>h1]:tracking-wider [&>h1]:text-[#d4af37] [&>h1]:drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
          [&>h2]:mb-3 [&>h2]:font-bold [&>h2]:text-xl [&>h2]:uppercase [&>h2]:tracking-wide [&>h2]:text-[#d4af37] [&>h2]:drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]
          [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:text-lg [&>h3]:uppercase [&>h3]:tracking-wide [&>h3]:text-[#d4af37] [&>h3]:drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]
          [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-white/90 [&>p]:drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]
          [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-2 [&>ul>li]:text-white/90
          [&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol>li]:mb-2 [&>ol>li]:text-white/90
          [&>blockquote]:border-l-4 [&>blockquote]:border-[#8b0000] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-white/80"
              >
                {children}
              </div>
            ) : (
              <div className="w-full">{children}</div>
            )}
          </div>

          {/* Decoración inferior - Línea de batalla */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>
        </div>

        {/* Efecto de sombra de batalla */}
        <div className="pointer-events-none absolute -bottom-4 left-1/2 h-4 w-[90%] -translate-x-1/2 transform bg-black/40 blur-md"></div>
      </div>
      {withGlow && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      )}
    </div>
  )
}

export default AnimatedSection
