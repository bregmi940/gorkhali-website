"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useImmersiveContext } from "@/context/immersive-context"
import { useAudio } from "@/hooks/use-audio"

interface ScrollRevealSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  threshold?: number
  withSound?: boolean
}

export function ScrollRevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  threshold = 0.2,
  withSound = true,
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const { isAudioEnabled } = useImmersiveContext()
  const [hasPlayed, setHasPlayed] = useState(false)

  // Usar el hook useAudio para el sonido de revelación
  const { play: playReveal } = useAudio({
    src: "/beep.mp3",
    volume: 0.3,
    preload: true,
  })

  // Play sound when section comes into view
  useEffect(() => {
    if (isInView && isAudioEnabled && withSound && !hasPlayed) {
      setHasPlayed(true)
      playReveal()
    }
  }, [isInView, isAudioEnabled, withSound, hasPlayed, playReveal])

  // Set initial and animate values based on direction
  let initial = {}

  switch (direction) {
    case "up":
      initial = { opacity: 0, y: 50 }
      break
    case "down":
      initial = { opacity: 0, y: -50 }
      break
    case "left":
      initial = { opacity: 0, x: 50 }
      break
    case "right":
      initial = { opacity: 0, x: -50 }
      break
    case "none":
      initial = { opacity: 0 }
      break
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
