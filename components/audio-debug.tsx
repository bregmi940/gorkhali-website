"use client"

import { useState, useEffect } from "react"

export function AudioDebug() {
  const [isVisible, setIsVisible] = useState(false)
  const [status, setStatus] = useState<Record<string, any>>({})

  useEffect(() => {
    // Solo ejecutar en desarrollo
    if (process.env.NODE_ENV !== "development") return

    const checkAudio = async () => {
      try {
        // Verificar si el archivo existe
        const response = await fetch("/sounds/gorkhali.mp3", { method: "HEAD" })

        setStatus({
          exists: response.ok,
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get("content-type"),
          contentLength: response.headers.get("content-length"),
          time: new Date().toLocaleTimeString(),
        })
      } catch (error) {
        setStatus({
          error: "Error al verificar el archivo",
          details: error instanceof Error ? error.message : String(error),
          time: new Date().toLocaleTimeString(),
        })
      }
    }

    checkAudio()
  }, [])

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-purple-700 text-white px-3 py-1 rounded-md text-xs"
      >
        {isVisible ? "Ocultar Debug" : "Debug Audio"}
      </button>

      {isVisible && (
        <div className="mt-2 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-purple-500/30 text-xs text-white max-w-xs">
          <h3 className="font-bold mb-2">Diagnóstico de Audio</h3>

          <div className="space-y-1">
            <div>
              <span className="font-semibold">Ruta:</span> /sounds/gorkhali.mp3
            </div>

            {status.exists !== undefined && (
              <div>
                <span className="font-semibold">Existe:</span>{" "}
                <span className={status.exists ? "text-green-400" : "text-red-400"}>{status.exists ? "Sí" : "No"}</span>
              </div>
            )}

            {status.status && (
              <div>
                <span className="font-semibold">Estado HTTP:</span>{" "}
                <span className={status.status === 200 ? "text-green-400" : "text-yellow-400"}>
                  {status.status} {status.statusText}
                </span>
              </div>
            )}

            {status.contentType && (
              <div>
                <span className="font-semibold">Tipo:</span> {status.contentType}
              </div>
            )}

            {status.contentLength && (
              <div>
                <span className="font-semibold">Tamaño:</span> {Math.round(Number(status.contentLength) / 1024)} KB
              </div>
            )}

            {status.error && (
              <div className="text-red-400">
                <span className="font-semibold">Error:</span> {status.error}
                <div className="mt-1 text-red-300">{status.details}</div>
              </div>
            )}

            <div className="mt-2 pt-2 border-t border-purple-500/30">
              <div className="font-semibold mb-1">Prueba directa:</div>
              <audio
                controls
                src="/sounds/gorkhali.mp3"
                className="w-full h-8"
                onError={(e) => console.error("Error en audio de prueba:", e)}
              >
                Tu navegador no soporta audio
              </audio>
            </div>
          </div>

          <div className="mt-2 text-gray-400 text-[10px]">Actualizado: {status.time || "cargando..."}</div>
        </div>
      )}
    </div>
  )
}
