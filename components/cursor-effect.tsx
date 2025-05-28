"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMousePosition } from "@/hooks/use-mouse-position"

export function CursorEffect() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const mousePosition = useMousePosition()

  useEffect(() => {
    // Detectar si es un dispositivo móvil
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || ""
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
      return mobileRegex.test(userAgent.toLowerCase())
    }

    const mobile = checkMobile()
    setIsMobile(mobile)

    // Solo mostrar cursor personalizado en desktop
    if (!mobile) {
      setIsVisible(true)

      // Eventos para mostrar/ocultar el cursor
      const handleMouseEnter = () => setIsVisible(true)
      const handleMouseLeave = () => setIsVisible(false)

      document.addEventListener("mouseenter", handleMouseEnter)
      document.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        document.removeEventListener("mouseenter", handleMouseEnter)
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // No renderizar nada en dispositivos móviles
  if (isMobile || !isVisible) return null

  // Asegurar que tenemos coordenadas válidas
  const x = mousePosition?.x ?? 0
  const y = mousePosition?.y ?? 0

  return (
    <>
      {/* Cursor principal */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#D4AF37] pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: x - 12,
          y: y - 12,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />

      {/* Rastro del cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D4AF37] pointer-events-none z-[9998] opacity-70 mix-blend-difference"
        animate={{
          x: x - 4,
          y: y - 4,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 200,
          mass: 0.8,
        }}
      />
    </>
  )
}
