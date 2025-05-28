"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

interface EpicTextEffectProps {
  text: string
  className?: string
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  effect?: "char" | "word" | "line" | "reveal" | "glitch" | "fire" | "gold"
  delay?: number
  duration?: number
  staggerChildren?: number
  glowIntensity?: number // 1-10
  once?: boolean
}

export function EpicTextEffect({
  text,
  className = "",
  tag = "p",
  effect = "char",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.05,
  glowIntensity = 5,
  once = true,
}: EpicTextEffectProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const [content, setContent] = useState<string[]>([])
  const Tag = tag as keyof JSX.IntrinsicElements

  // Dividir el texto según el efecto seleccionado
  useEffect(() => {
    switch (effect) {
      case "char":
        setContent(text.split(""))
        break
      case "word":
        setContent(text.split(" "))
        break
      case "line":
        setContent(text.split("\n"))
        break
      default:
        setContent([text])
        break
    }
  }, [text, effect])

  // Animar cuando está en vista
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Variantes de animación según el efecto
  const getVariants = () => {
    switch (effect) {
      case "char":
      case "word":
      case "line":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
              delay: delay + i * staggerChildren,
              duration,
              ease: [0.22, 1, 0.36, 1],
            },
          }),
        }
      case "reveal":
        return {
          hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          visible: {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            transition: {
              delay,
              duration: duration * 1.5,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }
      case "glitch":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              delay,
              duration,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
            },
          },
        }
      case "fire":
      case "gold":
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delay,
              duration,
            },
          },
        }
    }
  }

  // Estilos específicos según el efecto
  const getStyles = () => {
    switch (effect) {
      case "glitch":
        return {
          position: "relative",
          display: "inline-block",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            clipPath: "inset(0 0 0 0)",
          },
          "&::before": {
            left: "2px",
            textShadow: "-2px 0 #ff00c1",
            animation: "glitch-anim-1 2s infinite linear alternate-reverse",
          },
          "&::after": {
            left: "-2px",
            textShadow: "2px 0 #00fff9",
            animation: "glitch-anim-2 3s infinite linear alternate-reverse",
          },
        }
      case "fire":
        return {
          background: "linear-gradient(0deg, #ff8a00, #ffc107, #ffeb3b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: `0 0 ${glowIntensity * 5}px rgba(255, 138, 0, ${glowIntensity * 0.1})`,
        }
      case "gold":
        return {
          background: "linear-gradient(0deg, #b8860b, #d4af37, #f0e68c)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: `0 0 ${glowIntensity * 5}px rgba(212, 175, 55, ${glowIntensity * 0.1})`,
        }
      default:
        return {}
    }
  }

  // Renderizar según el efecto
  if (effect === "char" || effect === "word" || effect === "line") {
    return (
      <Tag ref={ref} className={className}>
        <motion.span
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren,
              },
            },
          }}
          aria-label={text}
        >
          {content.map((item, i) => (
            <motion.span
              key={`${effect}-${i}`}
              custom={i}
              variants={getVariants()}
              style={getStyles()}
              className={effect === "char" ? "inline-block" : "inline-block mr-1"}
            >
              {item === " " ? "\u00A0" : item}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    )
  }

  if (effect === "glitch") {
    return (
      <Tag ref={ref} className={className}>
        <motion.span
          initial="hidden"
          animate={controls}
          variants={getVariants()}
          className="relative inline-block"
          data-text={text}
          aria-label={text}
        >
          {/* Capas de glitch */}
          <span className="absolute top-0 left-0 -ml-[2px] text-[#ff00c1] opacity-70 animate-glitch-1">{text}</span>
          <span className="absolute top-0 left-0 ml-[2px] text-[#00fff9] opacity-70 animate-glitch-2">{text}</span>
          <span className="relative">{text}</span>
        </motion.span>
      </Tag>
    )
  }

  if (effect === "fire") {
    return (
      <Tag ref={ref} className={className}>
        <motion.span
          initial="hidden"
          animate={controls}
          variants={getVariants()}
          className="relative inline-block bg-gradient-to-t from-[#ff8a00] via-[#ffc107] to-[#ffeb3b] text-transparent bg-clip-text animate-pulse-slow"
          style={{
            textShadow: `0 0 ${glowIntensity * 5}px rgba(255, 138, 0, ${glowIntensity * 0.1})`,
          }}
          aria-label={text}
        >
          {text}
        </motion.span>
      </Tag>
    )
  }

  if (effect === "gold") {
    return (
      <Tag ref={ref} className={className}>
        <motion.span
          initial="hidden"
          animate={controls}
          variants={getVariants()}
          className="relative inline-block bg-gradient-to-t from-[#b8860b] via-[#d4af37] to-[#f0e68c] text-transparent bg-clip-text animate-shimmer"
          style={{
            textShadow: `0 0 ${glowIntensity * 5}px rgba(212, 175, 55, ${glowIntensity * 0.1})`,
            backgroundSize: "200% auto",
          }}
          aria-label={text}
        >
          {text}
        </motion.span>
      </Tag>
    )
  }

  // Efecto reveal por defecto
  return (
    <Tag ref={ref} className={`${className} overflow-hidden`}>
      <motion.span
        initial="hidden"
        animate={controls}
        variants={getVariants()}
        className="inline-block"
        aria-label={text}
      >
        {text}
      </motion.span>
    </Tag>
  )
}
