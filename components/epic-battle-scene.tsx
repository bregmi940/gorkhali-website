"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface EpicBattleSceneProps {
  imageSrc: string
  title: string
  quote: string
  className?: string
}

export function EpicBattleScene({ imageSrc, title, quote, className }: EpicBattleSceneProps) {
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  // Efectos de parallax
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

  // Efecto de resplandor para la espada
  const glowOpacity = useMotionValue(0)
  const smoothGlowOpacity = useSpring(glowOpacity, { stiffness: 100, damping: 20 })

  useEffect(() => {
    if (inView) {
      glowOpacity.set(1)
    } else {
      glowOpacity.set(0)
    }
  }, [inView, glowOpacity])

  // Efecto de partículas de polvo/humo
  const particleCount = 20
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }))

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-xl", "h-[400px] md:h-[500px] mb-16", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {/* Capa base de la imagen con efecto parallax */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y, scale }}>
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover object-center" priority />
      </motion.div>

      {/* Partículas de polvo/humo */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#D4AF37]/20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              filter: `blur(${particle.size}px)`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * -30 - 10],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Efecto de resplandor para la espada - posicionado aproximadamente donde estaría la espada */}
      <motion.div
        className="absolute w-[15%] h-[30%] left-[42%] top-[25%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,215,0,0) 70%)",
          filter: "blur(10px)",
          opacity: smoothGlowOpacity,
        }}
        animate={{
          opacity: isHovering ? [0.4, 0.7, 0.4] : 0.4,
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Gradiente de superposición mejorado */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/50 via-transparent to-[#000000]/80 z-10"></div>

      {/* Efecto de viñeta */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 z-10 pointer-events-none"></div>

      {/* Efecto de líneas de batalla */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-[#D4AF37]/30"
            style={{
              width: `${Math.random() * 30 + 20}%`,
              left: `${Math.random() * 70}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              opacity: inView ? [0, 0.7, 0] : 0,
              x: inView ? [0, 100] : 0,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        ))}
      </div>

      {/* Contenido de texto */}
      <div ref={ref} className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] mb-4 text-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-xl text-white max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {quote}
        </motion.p>
      </div>

      {/* Efecto de destello en los bordes al hacer hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 rounded-xl"
        style={{
          boxShadow: "inset 0 0 30px rgba(212, 175, 55, 0)",
        }}
        animate={{
          boxShadow: isHovering ? "inset 0 0 30px rgba(212, 175, 55, 0.3)" : "inset 0 0 30px rgba(212, 175, 55, 0)",
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}
