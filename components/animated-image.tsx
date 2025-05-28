"use client"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEpicEffects } from "./epic-effects-provider"

interface AnimatedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  delay?: number
  effect?: "reveal" | "fade" | "zoom" | "float" | "parallax" | "glitch" | "3d" | "none"
  withParallax?: boolean
  parallaxFactor?: number
  withGlow?: boolean
  glowIntensity?: number
  withZoom?: boolean
  withReveal?: boolean
  revealDirection?: "left" | "right" | "top" | "bottom"
  priority?: boolean
  animationIntensity?: number
  sizes?: string
}

export function AnimatedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  delay = 0,
  effect = "reveal",
  withParallax = false,
  parallaxFactor,
  withGlow = false,
  glowIntensity: propGlowIntensity,
  withZoom = false,
  withReveal = false,
  revealDirection = "left",
  priority = false,
  animationIntensity = 5,
  sizes,
}: AnimatedImageProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const {
    effectTheme,
    animationSpeed,
    glowIntensity: contextGlowIntensity,
    parallaxStrength,
    isReducedMotion,
  } = useEpicEffects()

  // Usar el valor de glowIntensity de las props o del contexto
  const glowIntensity = (propGlowIntensity !== undefined ? propGlowIntensity : contextGlowIntensity) * 1.5

  // Theme-based glow colors
  const getGlowColor = () => {
    switch (effectTheme) {
      case "history":
        return "rgba(255, 215, 0, 0.6)"
      case "roadmap":
        return "rgba(76, 175, 80, 0.6)"
      case "tokenomics":
        return "rgba(255, 152, 0, 0.6)"
      case "community":
        return "rgba(156, 39, 176, 0.6)"
      default:
        return "rgba(138, 43, 226, 0.6)"
    }
  }

  // Intersection Observer for reveal animation and visibility detection
  useEffect(() => {
    if (isReducedMotion) {
      setIsVisible(true)
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    const currentRef = imageRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isReducedMotion])

  // Mouse move handler for parallax effect
  useEffect(() => {
    if (!withParallax && effect !== "parallax" && effect !== "3d") return
    if (isReducedMotion) return

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
  }, [withParallax, effect, isReducedMotion])

  // Calculate parallax transform
  const getParallaxTransform = () => {
    if ((!withParallax && effect !== "parallax") || isReducedMotion) return ""

    const factor = parallaxFactor || parallaxStrength
    const rect = imageRef.current?.getBoundingClientRect()

    if (!rect) return ""

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const moveX = (mousePosition.x - centerX) * factor * -0.04
    const moveY = (mousePosition.y - centerY) * factor * -0.04

    return `translate3d(${moveX}px, ${moveY}px, 0)`
  }

  // Get reveal initial position
  const getRevealInitialPosition = () => {
    if ((!withReveal && effect !== "reveal") || isReducedMotion) return ""

    const distance = 60
    switch (revealDirection) {
      case "left":
        return `translateX(-${distance}px)`
      case "right":
        return `translateX(${distance}px)`
      case "top":
        return `translateY(-${distance}px)`
      case "bottom":
        return `translateY(${distance}px)`
      default:
        return `translateX(-${distance}px)`
    }
  }

  // Variantes de animación según el efecto
  const getVariants = () => {
    const intensityFactor = animationIntensity / 5
    switch (effect) {
      case "reveal":
        return {
          hidden: { clipPath: "inset(100% 0 0 0)" },
          visible: {
            clipPath: "inset(0% 0 0 0)",
            transition: { duration: 0.9 * intensityFactor, delay, ease: [0.22, 1, 0.36, 1] },
          },
        }
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.9 * intensityFactor, delay },
          },
        }
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 1.3 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.9 * intensityFactor, delay },
          },
        }
      case "float":
        return {
          hidden: { opacity: 0, y: 60 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9 * intensityFactor, delay },
          },
        }
      case "parallax":
        return {
          hidden: { opacity: 0, y: 120 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.1 * intensityFactor, delay },
          },
        }
      case "glitch":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.5 * intensityFactor, delay },
          },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.6, delay },
          },
        }
    }
  }

  // Configuración de tamaños responsivos para imágenes
  const defaultSizes = sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

  // Renderizar según el efecto seleccionado
  if (effect === "glitch") {
    return (
      <motion.div
        ref={imageRef}
        className={`relative overflow-hidden ${className}`}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={getVariants()}
      >
        {/* Capa principal */}
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          sizes={defaultSizes}
          loading={priority ? "eager" : "lazy"}
          unoptimized
        />

        {/* Capas de glitch */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            clipPath: "inset(10% 0 85% 0)",
            filter: "hue-rotate(90deg)",
            mixBlendMode: "hard-light",
            transform: "translateX(-2%)",
          }}
          animate={{
            clipPath: ["inset(10% 0 85% 0)", "inset(30% 0 55% 0)", "inset(80% 0 5% 0)", "inset(10% 0 85% 0)"],
            x: ["-3%", "1.5%", "-1.5%", "-3%"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt=""
            width={width}
            height={height}
            className="w-full h-full object-cover"
            aria-hidden="true"
            sizes={defaultSizes}
            unoptimized
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10"
          style={{
            clipPath: "inset(25% 0 65% 0)",
            filter: "hue-rotate(-90deg)",
            mixBlendMode: "hard-light",
            transform: "translateX(2%)",
          }}
          animate={{
            clipPath: ["inset(25% 0 65% 0)", "inset(45% 0 35% 0)", "inset(75% 0 15% 0)", "inset(25% 0 65% 0)"],
            x: ["3%", "-1.5%", "1.5%", "3%"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            duration: 0.4,
            ease: "easeInOut",
          }}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt=""
            width={width}
            height={height}
            className="w-full h-full object-cover"
            aria-hidden="true"
            sizes={defaultSizes}
            unoptimized
          />
        </motion.div>
      </motion.div>
    )
  }

  // Efecto de revelación con overlay
  if (effect === "reveal" || withReveal) {
    return (
      <motion.div
        ref={imageRef}
        className={`relative overflow-hidden ${className}`}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={getVariants()}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          sizes={defaultSizes}
          loading={priority ? "eager" : "lazy"}
          unoptimized
        />

        {/* Overlay para efecto reveal */}
        <motion.div
          className="absolute inset-0 bg-[#D4AF37]"
          initial={{ y: 0 }}
          animate={isInView ? { y: "-100%" } : { y: 0 }}
          transition={{ duration: 0.7 * (animationIntensity / 5), delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Resplandor */}
        {(withGlow || glowIntensity > 0) && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: `0 0 ${glowIntensity * 6}px ${glowIntensity / 1.5}px ${getGlowColor()}`,
              opacity: isLoaded && isInView ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
          />
        )}
      </motion.div>
    )
  }

  // Enfoque legacy para compatibilidad con código existente
  return (
    <div ref={imageRef} className={`relative ${className}`} style={{ ...containerStyle, overflow: "visible" }}>
      <div style={{ ...imageStyle, overflow: "visible" }} className="w-full h-full flex items-center justify-center">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-contain"
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          sizes={defaultSizes}
          loading={priority ? "eager" : "lazy"}
          unoptimized
        />
      </div>
    </div>
  )
}

// Combine styles for legacy approach
const containerStyle = {
  opacity: 1,
  transform: "",
  transition: "none",
  boxShadow: "none",
}

// Image style for zoom effect
const imageStyle = {
  transform: "scale(1)",
  transition: "none",
}

export default AnimatedImage
