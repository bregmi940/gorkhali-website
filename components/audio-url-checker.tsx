"use client"

import { useState, useEffect } from "react"

export function AudioUrlChecker() {
  const [urlStatus, setUrlStatus] = useState<string>("Verificando...")
  const [isDev, setIsDev] = useState(false)

  useEffect(() => {
    // Solo mostrar en desarrollo
    setIsDev(process.env.NODE_ENV === "development")

    // Verificar la URL del audio
    const checkAudioUrl = async () => {
      try {
        const response = await fetch("/sounds/gorkhali.mp3", { method: "HEAD" })

        console.log("🔍 VERIFICACIÓN DE URL DE AUDIO:")
        console.log("URL solicitada:", "/sounds/gorkhali.mp3")
        console.log("Status:", response.status)
        console.log("Status Text:", response.statusText)
        console.log("Headers:", Object.fromEntries(response.headers.entries()))

        if (response.ok) {
          const contentType = response.headers.get("content-type")
          const contentLength = response.headers.get("content-length")
          setUrlStatus(`✅ OK (${response.status}) - Tipo: ${contentType} - Tamaño: ${contentLength} bytes`)
        } else {
          setUrlStatus(`❌ Error ${response.status}: ${response.statusText}`)
        }
      } catch (error) {
        console.error("❌ Error al verificar URL:", error)
        setUrlStatus(`❌ Error de red: ${error}`)
      }
    }

    checkAudioUrl()
  }, [])

  // Solo mostrar en desarrollo
  if (!isDev) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-blue-900/80 backdrop-blur-md p-3 rounded-lg border border-blue-500/50 shadow-lg max-w-sm">
      <div className="text-blue-300 text-xs font-bold mb-1">DEBUG: Verificación de Audio</div>
      <div className="text-blue-100 text-xs">{urlStatus}</div>
      <div className="text-blue-200 text-xs mt-1">
        URL completa:{" "}
        <code className="text-green-300">
          {typeof window !== "undefined" ? window.location.origin : ""}/sounds/gorkhali.mp3
        </code>
      </div>
    </div>
  )
}
