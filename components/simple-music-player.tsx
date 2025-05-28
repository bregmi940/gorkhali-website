"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"

// Lista de posibles rutas para el archivo de audio
const AUDIO_PATHS = [
  "/sounds/gorkhali.mp3",
  "./sounds/gorkhali.mp3",
  "../sounds/gorkhali.mp3",
  "/public/sounds/gorkhali.mp3",
  "https://raw.githubusercontent.com/user-attachments/files/main/gorkhali.mp3", // URL de respaldo en GitHub
]

export function SimpleMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [audioPath, setAudioPath] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Encontrar la ruta correcta del archivo de audio
  useEffect(() => {
    const findAudioFile = async () => {
      console.log("🔍 Buscando archivo de audio...")

      // Probar cada ruta posible
      for (const path of AUDIO_PATHS) {
        try {
          console.log(`🔍 Probando ruta: ${path}`)
          const response = await fetch(path, { method: "HEAD" })

          if (response.ok) {
            console.log(`✅ Archivo encontrado en: ${path}`)
            setAudioPath(path)
            setIsLoading(false)
            return
          }
        } catch (error) {
          console.log(`❌ Error al probar ${path}:`, error)
        }
      }

      // Si llegamos aquí, no se encontró el archivo
      console.error("❌ No se encontró el archivo de audio en ninguna ruta")
      setIsLoading(false)

      // Usar la URL de respaldo como último recurso
      setAudioPath(AUDIO_PATHS[AUDIO_PATHS.length - 1])
    }

    findAudioFile()
  }, [])

  // Inicializar el reproductor cuando se encuentra la ruta
  useEffect(() => {
    if (!audioPath) return

    try {
      const audio = new Audio(audioPath)
      audio.loop = true
      audio.volume = 0.5
      audio.preload = "auto"

      // Eventos básicos
      audio.addEventListener("play", () => setIsPlaying(true))
      audio.addEventListener("pause", () => setIsPlaying(false))

      audioRef.current = audio

      return () => {
        audio.pause()
        audio.src = ""
      }
    } catch (error) {
      console.error("❌ Error al inicializar audio:", error)
    }
  }, [audioPath])

  // Función simple para reproducir/pausar
  const togglePlay = () => {
    if (!audioRef.current) {
      console.log("⚠️ Audio no disponible, activando modo visual")
      setIsPlaying(!isPlaying) // Modo visual
      return
    }

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("❌ Error al reproducir:", error)
            setIsPlaying(true) // Activar modo visual
          })
        }
      }
    } catch (error) {
      console.error("❌ Error en togglePlay:", error)
      setIsPlaying(!isPlaying) // Modo visual
    }
  }

  // Función simple para silenciar
  const toggleMute = () => {
    if (!audioRef.current) return

    try {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    } catch (error) {
      console.error("❌ Error al cambiar volumen:", error)
    }
  }

  // Si está cargando, mostrar indicador
  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-black/70 backdrop-blur-md rounded-full p-2 shadow-lg border border-[#D4AF37]/20">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-[#D4AF37] animate-pulse">
          <Music size={18} />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/70 backdrop-blur-md rounded-full p-2 shadow-lg border border-[#D4AF37]/20">
      <div className="flex items-center space-x-2">
        <button
          onClick={togglePlay}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            isPlaying ? "bg-[#8B0000] text-[#D4AF37]" : "bg-[#D4AF37] text-[#8B0000] hover:bg-[#FFD700]"
          } transition-colors duration-300`}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}

          {/* Efecto de pulso cuando está reproduciendo */}
          {isPlaying && <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-[#D4AF37]" />}
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-[#D4AF37] hover:bg-black/70 transition-colors duration-300"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
      </div>
    </div>
  )
}
