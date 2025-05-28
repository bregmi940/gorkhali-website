"use client"

import type React from "react"

import { type ComponentType, useState, useEffect } from "react"
import { useLazyLoad } from "@/hooks/use-lazy-load"

interface DeferredComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
  props?: Record<string, any>
  loadingDelay?: number
}

export function DeferredComponent({ component, fallback, props = {}, loadingDelay = 200 }: DeferredComponentProps) {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null)
  const { ref, isVisible } = useLazyLoad({ rootMargin: "300px" })
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      // Pequeño retraso para evitar bloquear el hilo principal
      const timer = setTimeout(() => {
        // Cargar el componente dinámicamente
        component().then((module) => {
          setComponent(() => module.default)
          setShouldRender(true)
        })
      }, loadingDelay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, component, loadingDelay])

  return (
    <div ref={ref}>
      {shouldRender && Component ? (
        <Component {...props} />
      ) : (
        fallback || (
          <div className="w-full h-64 flex items-center justify-center bg-black/10 animate-pulse">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          </div>
        )
      )}
    </div>
  )
}
