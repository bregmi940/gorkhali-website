"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface ResourceLoaderProps {
  src: string
  fallback: string
  type: "image" | "audio" | "script" | "style"
  onLoad?: () => void
  onError?: () => void
  children: (props: { src: string; isLoading: boolean; hasError: boolean }) => React.ReactNode
}

export function ResourceLoader({ src, fallback, type, onLoad, onError, children }: ResourceLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  useEffect(() => {
    const checkResource = async () => {
      try {
        setIsLoading(true)

        // Verificar si el recurso existe
        const response = await fetch(src, { method: "HEAD" })

        if (!response.ok) {
          console.warn(`Recurso no encontrado: ${src}, usando fallback`)
          setCurrentSrc(fallback)
          setHasError(true)
          onError?.()
        } else {
          setCurrentSrc(src)
          setHasError(false)
          onLoad?.()
        }
      } catch (error) {
        console.warn(`Error al cargar recurso: ${src}, usando fallback`)
        setCurrentSrc(fallback)
        setHasError(true)
        onError?.()
      } finally {
        setIsLoading(false)
      }
    }

    checkResource()
  }, [src, fallback, onLoad, onError])

  return children({ src: currentSrc, isLoading, hasError })
}
