"use client"

import { useState, useEffect } from "react"

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition(): MousePosition {
  // Inicializar con valores por defecto seguros
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Verificar si estamos en el cliente
    setIsClient(true)

    if (typeof window === "undefined") return

    // Función segura para actualizar la posición del mouse
    const updateMousePosition = (event: MouseEvent) => {
      try {
        // Extraer coordenadas de forma segura
        const clientX = event?.clientX ?? 0
        const clientY = event?.clientY ?? 0

        setMousePosition({ x: clientX, y: clientY })
      } catch (error) {
        // Fallback al centro de la pantalla si hay un error
        console.warn("Error updating mouse position:", error)

        if (typeof window !== "undefined") {
          setMousePosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          })
        }
      }
    }

    // Optimizar rendimiento con throttling
    let ticking = false
    const handleMouseMove = (event: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateMousePosition(event)
          ticking = false
        })
        ticking = true
      }
    }

    // Manejar caso donde el mouse sale de la ventana
    const handleMouseLeave = () => {
      if (typeof window !== "undefined") {
        // Mantener la última posición conocida
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Si no estamos en el cliente, devolver posición por defecto
  if (!isClient) {
    return { x: 0, y: 0 }
  }

  return mousePosition
}
