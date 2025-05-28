"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Download, ExternalLink } from "lucide-react"

export function VisualMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorDetails, setErrorDetails] = useState("")
  const [volume, setVolume] = useState(0.5)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioSource, setAudioSource] = useState("")
  const [currentSourceIndex, setCurrentSourceIndex] = useState(1) // Comenzar con la fuente externa
  const [isVisible, setIsVisible] = useState(false)

  // Referencia al elemento de audio DOM
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Múltiples fuentes de audio (local y externa)
  const audioSources = [
    { url: "/sounds/gorkhali.mp3", type: "audio/mpeg", label: "Local MP3" },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gorkhali.mp3-IPbjFwUfuO5s7ipn05pE31pTgMSAaz.mp3",
      type: "audio/mpeg",
      label: "External MP3",
    },
    // Puedes añadir más fuentes aquí
  ]

  // Función para manejar errores y probar la siguiente fuente
  const handleError = (e: Event) => {
    console.error(`❌ Error con fuente ${currentSourceIndex + 1}:`, audioSources[currentSourceIndex])

    // Si estamos en la fuente local, cambiar inmediatamente a la externa
    if (currentSourceIndex === 0) {
      console.log("🔄 Cambiando a fuente externa:", audioSources[1])
      setCurrentSourceIndex(1)

      if (audioRef.current) {
        audioRef.current.src = audioSources[1].url
        audioRef.current.load()
      }
    } else {
      // Si ya estamos en la fuente externa y falla, mostrar error
      console.error("❌ Todas las fuentes de audio fallaron")
      setHasError(true)
      setErrorDetails("No se pudo cargar el audio desde ninguna fuente disponible.")
    }
  }

  // Efecto para crear y configurar el elemento de audio
  useEffect(() => {
    // Crear elemento de audio
    const audioElement = document.createElement("audio")
    audioElement.src = audioSources[currentSourceIndex].url
    audioElement.preload = "metadata"
    audioElement.id = "gorkhali-audio"
    audioElement.crossOrigin = "anonymous"
    audioElement.autoplay = false // Evitar reproducción automática

    // Añadir al DOM para mejor compatibilidad
    document.body.appendChild(audioElement)
    audioRef.current = audioElement

    // EVENTOS PARA DEBUGGING COMPLETO
    const handleCanPlay = () => {
      console.log(`✅ Audio cargado desde fuente ${currentSourceIndex + 1}:`, audioSources[currentSourceIndex])
      setIsLoaded(true)
      setHasError(false)
      setAudioSource(audioSources[currentSourceIndex].label)

      // Si estaba reproduciendo antes del cambio de fuente, reanudar
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.error("❌ Error al reanudar reproducción:", err)
        })
      }
    }

    const handleLoadedMetadata = () => {
      console.log("✅ Audio metadata loaded")
    }

    const handleEnded = () => {
      setIsPlaying(false)
      console.log("🏁 Audio playback ended")
    }

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
      }
    }

    // Añadir event listeners
    audioElement.addEventListener("error", handleError)
    audioElement.addEventListener("canplay", handleCanPlay)
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    audioElement.addEventListener("ended", handleEnded)
    audioElement.addEventListener("timeupdate", handleTimeUpdate)

    // Log inicial para debugging
    console.log(`🎵 Intentando cargar audio desde fuente ${currentSourceIndex + 1}:`, audioSources[currentSourceIndex])

    // Cleanup
    return () => {
      audioElement.removeEventListener("error", handleError)
      audioElement.removeEventListener("canplay", handleCanPlay)
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audioElement.removeEventListener("ended", handleEnded)
      audioElement.removeEventListener("timeupdate", handleTimeUpdate)
      audioElement.pause()
      if (document.body.contains(audioElement)) {
        document.body.removeChild(audioElement)
      }
    }
  }, [currentSourceIndex])

  // Función para alternar reproducción
  const togglePlay = () => {
    if (!audioRef.current || !isLoaded) {
      console.warn("⚠️ No se puede reproducir: audio no cargado o elemento no disponible")
      return
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      console.log("⏸️ Audio pausado")
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setHasError(false)
          console.log("▶️ Audio reproduciéndose")
        })
        .catch((err) => {
          console.error("❌ Error al reproducir:", err)
          setHasError(true)
          setErrorDetails("El navegador bloqueó la reproducción. Intenta de nuevo.")
        })
    }
  }

  // Función para alternar silencio
  const toggleMute = () => {
    if (!audioRef.current) return

    const newMuted = !isMuted
    audioRef.current.muted = newMuted
    setIsMuted(newMuted)
    console.log(newMuted ? "🔇 Audio silenciado" : "🔊 Audio activado")
  }

  // Función para cambiar el volumen
  const handleVolumeChange = (newVolume: number) => {
    if (!audioRef.current) return

    setVolume(newVolume)
    audioRef.current.volume = newVolume

    if (newVolume === 0) {
      setIsMuted(true)
      audioRef.current.muted = true
    } else if (isMuted) {
      setIsMuted(false)
      audioRef.current.muted = false
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  // Si hay error, mostrar información de diagnóstico y opciones
  if (hasError) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-black/90 backdrop-blur-md p-4 rounded-lg border border-red-500/50 shadow-lg max-w-sm">
        <div className="text-red-400 text-sm mb-2">
          <strong>Error de Audio:</strong>
        </div>
        <div className="text-red-300 text-xs mb-3">{errorDetails}</div>

        <div className="text-gray-300 text-xs mb-3">
          <strong>Problema identificado:</strong> El archivo no existe en el servidor de Vercel.
        </div>

        <div className="space-y-2 mb-3">
          <a
            href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gorkhali.mp3-IPbjFwUfuO5s7ipn05pE31pTgMSAaz.mp3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-xs"
          >
            <ExternalLink size={12} />
            <span>Escuchar audio externo</span>
          </a>

          <a
            href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gorkhali.mp3-IPbjFwUfuO5s7ipn05pE31pTgMSAaz.mp3"
            download="gorkhali.mp3"
            className="flex items-center space-x-2 text-green-400 hover:text-green-300 text-xs"
          >
            <Download size={12} />
            <span>Descargar archivo MP3</span>
          </a>
        </div>

        <div className="text-xs text-gray-400">
          <p>
            <strong>Solución:</strong>
          </p>
          <p>
            1. Verifica que el archivo esté en <code className="text-green-400">public/sounds/gorkhali.mp3</code>
          </p>
          <p>2. Haz commit y push del archivo</p>
          <p>3. Redespliega en Vercel</p>
        </div>
      </div>
    )
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button - Always visible */}
      <button
        onClick={toggleVisibility}
        className="w-12 h-12 bg-[#D4AF37] hover:bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
      >
        <Volume2 size={20} className="text-black" />
      </button>

      {/* Music Player - Collapsible */}
      {isVisible && (
        <div className="absolute bottom-16 right-0 bg-black/70 backdrop-blur-md rounded-lg p-3 shadow-lg border border-[#D4AF37]/20 w-64">
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              disabled={!isLoaded}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${isLoaded ? "bg-[#D4AF37] hover:bg-[#FFD700] text-[#121212]" : "bg-gray-700 text-gray-500 cursor-wait"}
              `}
              title={isLoaded ? (isPlaying ? "Pausar" : "Reproducir") : "Cargando audio..."}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
            </button>

            {isLoaded && (
              <button
                onClick={toggleMute}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-[#D4AF37] hover:bg-black/70 transition-colors duration-300"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            )}

            <div className="text-[#D4AF37] text-sm">
              {isLoaded ? (isPlaying ? "♪ Gorkhali Theme" : "Gorkhali Theme") : "Cargando audio..."}
            </div>
          </div>

          {isLoaded && (
            <div className="mt-2">
              {/* Progress Bar */}
              <div className="relative w-full h-1 bg-gray-700 rounded-full mb-2">
                <div
                  className="absolute top-0 left-0 h-full bg-[#D4AF37] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Time Display */}
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          )}

          {!isLoaded && !hasError && (
            <div className="mt-1 flex justify-center">
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37]/50 w-1/3 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}

          {isLoaded && (
            <div className="mt-2 flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          )}

          {/* Mostrar la fuente que funcionó */}
          {audioSource && <div className="mt-1 text-xs text-gray-500">Fuente: {audioSource}</div>}
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #D4AF37;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #D4AF37;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}
