"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useImmersiveContext } from "@/context/immersive-context"
import { HeroVideoBackground } from "./hero-video-background"
import { AnimatedButton } from "./animated-button"
import { Coin3D } from "./3d-coin"
import { useInView } from "react-intersection-observer"

export function ImmersiveHero() {
  const { isCinematicMode, isHighPerformance } = useImmersiveContext()
  const [isLoaded, setIsLoaded] = useState(false)
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Referencia para el título
  const titleContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video de fondo */}
      <HeroVideoBackground isHighPerformance={isHighPerformance} />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Contenido del héroe */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Título principal con espacio adicional en móvil */}
        <div ref={titleContainerRef} className="mb-6 md:mb-8 pt-16 sm:pt-0">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gold-gradient epic-text-shadow whitespace-nowrap"
          >
            GORKHALI&nbsp;(GRK)
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl mt-4 text-[#D4AF37] font-medium max-w-2xl mx-auto"
          >
            The Digital Empire
          </motion.p>
        </div>

        {/* Modelo 3D de la moneda */}
        <div className="w-full max-w-md h-48 md:h-64 lg:h-72 mb-8 perspective-1000">
          {isHighPerformance && <Coin3D />}
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-8">
          <AnimatedButton
            href="https://t.me/+zv4TWbi36ehjZjg0"
            external
            className="bg-[#8B0000] hover:bg-[#6B0000] text-[#D4AF37] px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 epic-glow"
          >
            Join Army
          </AnimatedButton>
          <AnimatedButton
            href="https://world.org/es-la/ecosystem/app_15daccf5b7d4ec9b7dbba044a8fdeab5"
            external
            className="bg-gradient-to-r from-[#4B0082] to-[#8A2BE2] hover:from-[#3B0062] hover:to-[#7A1BD2] text-[#D4AF37] px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 epic-glow"
          >
            Buy GRK
          </AnimatedButton>
        </div>
      </div>

      {/* Flecha de desplazamiento */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
