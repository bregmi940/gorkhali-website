"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  Music,
  Loader2,
  Shuffle,
  Repeat,
  Repeat1,
  Plus,
  Heart,
} from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  src: string
  duration?: number
  favorite?: boolean
  genre?: string
  album?: string
}

interface Playlist {
  id: string
  name: string
  tracks: Track[]
  created: Date
}

interface PlayerState {
  isPlaying: boolean
  isMuted: boolean
  isLoading: boolean
  hasError: boolean
  currentTime: number
  duration: number
  volume: number
  currentTrackIndex: number
  isReady: boolean
  buffered: number
  shuffle: boolean
  repeat: "off" | "all" | "one"
  currentPlaylistId: string
}

export function EnhancedMusicPlayer() {
  // Tracks definidos con rutas de audio que funcionan en el entorno v0
  const defaultTracks: Track[] = [
    {
      id: "gorkhali-theme",
      title: "Gorkhali Theme",
      artist: "Gorkhali Token",
      src: "/sounds/gorkhali.mp3", // Asumimos que este archivo existe
      genre: "Epic",
      album: "Gorkhali Chronicles",
    },
    {
      id: "epic-battle",
      title: "Epic Battle",
      artist: "Gorkhali Warriors",
      src: "/sounds/gorkhali.mp3", // Usamos el mismo archivo como fallback
      genre: "Battle",
      album: "Gorkhali Chronicles",
    },
    {
      id: "mountain-winds",
      title: "Mountain Winds",
      artist: "Himalayan Echoes",
      src: "/sounds/gorkhali.mp3", // Usamos el mismo archivo como fallback
      genre: "Ambient",
      album: "Gorkhali Chronicles",
    },
    {
      id: "kingdom-rise",
      title: "Kingdom Rise",
      artist: "Gorkhali Token",
      src: "/sounds/gorkhali.mp3", // Usamos el mismo archivo como fallback
      genre: "Epic",
      album: "Gorkhali Chronicles",
    },
    {
      id: "digital-conquest",
      title: "Digital Conquest",
      artist: "Crypto Warriors",
      src: "/sounds/gorkhali.mp3", // Usamos el mismo archivo como fallback
      genre: "Electronic",
      album: "Gorkhali Chronicles",
    },
    {
      id: "ancient-glory",
      title: "Ancient Glory",
      artist: "Gorkhali Legends",
      src: "/sounds/gorkhali.mp3", // Usamos el mismo archivo como fallback
      genre: "Traditional",
      album: "Gorkhali Chronicles",
    },
  ]

  const defaultPlaylist: Playlist = {
    id: "default",
    name: "Gorkhali Chronicles",
    tracks: defaultTracks,
    created: new Date(),
  }

  const [playlists, setPlaylists] = useState<Playlist[]>([defaultPlaylist])
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isMuted: false,
    isLoading: false,
    hasError: false,
    currentTime: 0,
    duration: 0,
    volume: 0.5,
    currentTrackIndex: 0,
    isReady: false,
    buffered: 0,
    shuffle: false,
    repeat: "off",
    currentPlaylistId: "default",
  })

  const [showPlayer, setShowPlayer] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showPlaylistManager, setShowPlaylistManager] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState("")
  const [shuffleHistory, setShuffleHistory] = useState<number[]>([])
  const [audioInitialized, setAudioInitialized] = useState(false)
  const [audioExists, setAudioExists] = useState(false)

  // Audio visualizer state
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(new Uint8Array(128))

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // Get current playlist and track
  const currentPlaylist = playlists.find((p) => p.id === playerState.currentPlaylistId) || defaultPlaylist
  const currentTrack = currentPlaylist.tracks[playerState.currentTrackIndex]

  // Show player immediately
  useEffect(() => {
    const timer = setTimeout(() => setShowPlayer(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Pre-initialize audio on component mount
  useEffect(() => {
    if (!audioInitialized) {
      console.log("🎵 Inicializando reproductor de audio...")

      const audio = new Audio()
      audio.preload = "auto"
      audio.volume = playerState.volume
      audio.crossOrigin = "anonymous"
      audio.src = "/sounds/gorkhali.mp3"

      // Event listeners simplificados
      const handleCanPlay = () => {
        console.log("✅ Audio listo para reproducir")
        setPlayerState((prev) => ({
          ...prev,
          isLoading: false,
          isReady: true,
          hasError: false,
          duration: audio.duration || 0,
        }))
      }

      const handleTimeUpdate = () => {
        setPlayerState((prev) => ({
          ...prev,
          currentTime: audio.currentTime,
        }))
      }

      const handlePlay = () => {
        console.log("▶️ Reproducción iniciada")
        setPlayerState((prev) => ({ ...prev, isPlaying: true, isLoading: false }))
      }

      const handlePause = () => {
        console.log("⏸️ Reproducción pausada")
        setPlayerState((prev) => ({ ...prev, isPlaying: false }))
      }

      const handleEnded = () => {
        console.log("🔄 Canción terminada, reiniciando")
        setPlayerState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }))
        audio.currentTime = 0
      }

      const handleError = (e: any) => {
        console.warn("❌ Error de audio:", e)
        setPlayerState((prev) => ({
          ...prev,
          hasError: true,
          isLoading: false,
          isPlaying: false,
        }))
      }

      const handleLoadStart = () => {
        console.log("⏳ Cargando audio...")
        setPlayerState((prev) => ({ ...prev, isLoading: true, hasError: false }))
      }

      // Agregar event listeners
      audio.addEventListener("canplay", handleCanPlay)
      audio.addEventListener("timeupdate", handleTimeUpdate)
      audio.addEventListener("play", handlePlay)
      audio.addEventListener("pause", handlePause)
      audio.addEventListener("ended", handleEnded)
      audio.addEventListener("error", handleError)
      audio.addEventListener("loadstart", handleLoadStart)

      audioRef.current = audio

      // Precargar el audio
      try {
        audio.load()
        console.log("🔄 Precargando gorkhali.mp3...")
      } catch (error) {
        console.warn("⚠️ Error al precargar:", error)
      }

      setAudioInitialized(true)

      // Cleanup
      return () => {
        console.log("🧹 Limpiando reproductor...")
        audio.removeEventListener("canplay", handleCanPlay)
        audio.removeEventListener("timeupdate", handleTimeUpdate)
        audio.removeEventListener("play", handlePlay)
        audio.removeEventListener("pause", handlePause)
        audio.removeEventListener("ended", handleEnded)
        audio.removeEventListener("error", handleError)
        audio.removeEventListener("loadstart", handleLoadStart)

        if (audio) {
          audio.pause()
          audio.src = ""
        }
      }
    }
  }, [audioInitialized, playerState.volume])

  // Audio visualizer setup
  const setupAudioContext = useCallback(() => {
    if (!audioRef.current || audioContext) return

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyserNode = ctx.createAnalyser()
      const source = ctx.createMediaElementSource(audioRef.current)

      analyserNode.fftSize = 256
      source.connect(analyserNode)
      analyserNode.connect(ctx.destination)

      setAudioContext(ctx)
      setAnalyser(analyserNode)
      setFrequencyData(new Uint8Array(analyserNode.frequencyBinCount))
    } catch (error) {
      console.warn("Audio context setup failed:", error)
    }
  }, [audioContext])

  // Visualizer animation
  const updateVisualizer = useCallback(() => {
    if (!analyser || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    analyser.getByteFrequencyData(frequencyData)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const barWidth = canvas.width / frequencyData.length
    let x = 0

    for (let i = 0; i < frequencyData.length; i++) {
      const barHeight = (frequencyData[i] / 255) * canvas.height * 0.8

      // Create gradient
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight)
      gradient.addColorStop(0, "#D4AF37")
      gradient.addColorStop(0.5, "#FFD700")
      gradient.addColorStop(1, "#8B0000")

      ctx.fillStyle = gradient
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight)

      x += barWidth
    }

    if (playerState.isPlaying && !playerState.hasError) {
      animationRef.current = requestAnimationFrame(updateVisualizer)
    }
  }, [analyser, frequencyData, playerState.isPlaying, playerState.hasError])

  // Start/stop visualizer
  useEffect(() => {
    if (playerState.isPlaying && !playerState.hasError && analyser) {
      updateVisualizer()
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [playerState.isPlaying, playerState.hasError, analyser, updateVisualizer])

  // Load current track
  const loadCurrentTrack = useCallback(() => {
    if (!audioRef.current || !currentTrack) return

    setPlayerState((prev) => ({
      ...prev,
      isLoading: true,
      hasError: false,
      currentTime: 0,
      duration: 0,
    }))

    try {
      audioRef.current.src = currentTrack.src
      audioRef.current.load()
    } catch (error) {
      console.warn("Failed to load track:", error)
      setPlayerState((prev) => ({
        ...prev,
        hasError: true,
        isLoading: false,
      }))
    }
  }, [currentTrack])

  // Shuffle logic
  const getNextShuffleIndex = useCallback(() => {
    const availableIndices = currentPlaylist.tracks
      .map((_, index) => index)
      .filter((index) => !shuffleHistory.includes(index))

    if (availableIndices.length === 0) {
      setShuffleHistory([])
      return Math.floor(Math.random() * currentPlaylist.tracks.length)
    }

    return availableIndices[Math.floor(Math.random() * availableIndices.length)]
  }, [currentPlaylist.tracks, shuffleHistory])

  // Next track logic
  const handleNext = useCallback(() => {
    let nextIndex: number

    if (playerState.repeat === "one") {
      nextIndex = playerState.currentTrackIndex
    } else if (playerState.shuffle) {
      nextIndex = getNextShuffleIndex()
      setShuffleHistory((prev) => [...prev, playerState.currentTrackIndex])
    } else {
      nextIndex = (playerState.currentTrackIndex + 1) % currentPlaylist.tracks.length
      if (nextIndex === 0 && playerState.repeat === "off") {
        setPlayerState((prev) => ({ ...prev, isPlaying: false }))
        return
      }
    }

    setPlayerState((prev) => ({ ...prev, currentTrackIndex: nextIndex }))

    setTimeout(() => {
      loadCurrentTrack()
      if (playerState.isPlaying && !playerState.hasError) {
        setTimeout(() => {
          if (audioRef.current) {
            const playPromise = audioRef.current.play()
            if (playPromise) {
              playPromise.catch(() => {
                setPlayerState((prev) => ({
                  ...prev,
                  hasError: true,
                  isPlaying: true, // Visual fallback
                }))
              })
            }
          }
        }, 100)
      }
    }, 100)
  }, [
    playerState.currentTrackIndex,
    playerState.isPlaying,
    playerState.hasError,
    playerState.shuffle,
    playerState.repeat,
    currentPlaylist.tracks.length,
    getNextShuffleIndex,
    loadCurrentTrack,
  ])

  // Previous track logic
  const handlePrevious = useCallback(() => {
    let prevIndex: number

    if (playerState.shuffle && shuffleHistory.length > 0) {
      prevIndex = shuffleHistory[shuffleHistory.length - 1]
      setShuffleHistory((prev) => prev.slice(0, -1))
    } else {
      prevIndex =
        playerState.currentTrackIndex === 0 ? currentPlaylist.tracks.length - 1 : playerState.currentTrackIndex - 1
    }

    setPlayerState((prev) => ({ ...prev, currentTrackIndex: prevIndex }))

    setTimeout(() => {
      loadCurrentTrack()
      if (playerState.isPlaying && !playerState.hasError) {
        setTimeout(() => {
          if (audioRef.current) {
            const playPromise = audioRef.current.play()
            if (playPromise) {
              playPromise.catch(() => {
                setPlayerState((prev) => ({
                  ...prev,
                  hasError: true,
                  isPlaying: true, // Visual fallback
                }))
              })
            }
          }
        }, 100)
      }
    }, 100)
  }, [
    playerState.currentTrackIndex,
    playerState.isPlaying,
    playerState.hasError,
    playerState.shuffle,
    shuffleHistory,
    currentPlaylist.tracks.length,
    loadCurrentTrack,
  ])

  // Play/Pause functionality - MEJORADO para un solo clic
  const togglePlay = useCallback(async () => {
    if (!audioRef.current) {
      console.warn("❌ Audio ref no disponible")
      return
    }

    const audio = audioRef.current

    try {
      if (playerState.isPlaying) {
        // Pausar
        console.log("⏸️ Pausando...")
        audio.pause()
      } else {
        // Reproducir
        console.log("▶️ Intentando reproducir...")

        // Si hay error, cambiar a modo visual
        if (playerState.hasError) {
          console.log("🎭 Modo visual activado")
          setPlayerState((prev) => ({ ...prev, isPlaying: true }))
          return
        }

        // Si no está listo, esperar un poco
        if (!playerState.isReady) {
          console.log("⏳ Esperando que el audio esté listo...")
          setPlayerState((prev) => ({ ...prev, isLoading: true }))

          // Intentar cargar de nuevo
          audio.load()

          // Esperar un momento y luego intentar reproducir
          setTimeout(async () => {
            try {
              await audio.play()
            } catch (error) {
              console.warn("❌ Error al reproducir después de cargar:", error)
              setPlayerState((prev) => ({
                ...prev,
                hasError: true,
                isLoading: false,
                isPlaying: true, // Modo visual
              }))
            }
          }, 500)
          return
        }

        // Intentar reproducir normalmente
        const playPromise = audio.play()

        if (playPromise !== undefined) {
          await playPromise
          console.log("✅ Reproducción exitosa")
        }
      }
    } catch (error) {
      console.warn("❌ Error en togglePlay:", error)
      // Activar modo visual como fallback
      setPlayerState((prev) => ({
        ...prev,
        hasError: true,
        isLoading: false,
        isPlaying: !prev.isPlaying, // Toggle visual
      }))
    }
  }, [playerState.isPlaying, playerState.isReady, playerState.hasError])

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, shuffle: !prev.shuffle }))
    setShuffleHistory([])
  }, [])

  // Toggle repeat
  const toggleRepeat = useCallback(() => {
    setPlayerState((prev) => ({
      ...prev,
      repeat: prev.repeat === "off" ? "all" : prev.repeat === "all" ? "one" : "off",
    }))
  }, [])

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (!audioRef.current) return

    try {
      audioRef.current.muted = !playerState.isMuted
      setPlayerState((prev) => ({ ...prev, isMuted: !prev.isMuted }))
      console.log(playerState.isMuted ? "🔊 Audio activado" : "🔇 Audio silenciado")
    } catch (error) {
      console.warn("❌ Error al cambiar mute:", error)
      setPlayerState((prev) => ({ ...prev, isMuted: !prev.isMuted }))
    }
  }, [playerState.isMuted])

  // Set volume
  const setVolume = useCallback(
    (newVolume: number) => {
      const volume = Math.max(0, Math.min(1, newVolume))

      if (audioRef.current && !playerState.hasError) {
        try {
          audioRef.current.volume = volume
        } catch (error) {
          setPlayerState((prev) => ({ ...prev, volume }))
        }
      } else {
        setPlayerState((prev) => ({ ...prev, volume }))
      }
    },
    [playerState.hasError],
  )

  // Seek to position
  const seekTo = useCallback(
    (position: number) => {
      if (!audioRef.current || !playerState.isReady || playerState.hasError) return

      try {
        const seekTime = (position / 100) * playerState.duration
        audioRef.current.currentTime = seekTime
      } catch (error) {
        console.warn("Seek failed:", error)
      }
    },
    [playerState.isReady, playerState.hasError, playerState.duration],
  )

  // Toggle favorite
  const toggleFavorite = useCallback((trackId: string) => {
    setPlaylists((prev) =>
      prev.map((playlist) => ({
        ...playlist,
        tracks: playlist.tracks.map((track) =>
          track.id === trackId ? { ...track, favorite: !track.favorite } : track,
        ),
      })),
    )
  }, [])

  // Create new playlist
  const createPlaylist = useCallback(() => {
    if (!newPlaylistName.trim()) return

    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: newPlaylistName.trim(),
      tracks: [],
      created: new Date(),
    }

    setPlaylists((prev) => [...prev, newPlaylist])
    setNewPlaylistName("")
    setShowPlaylistManager(false)
  }, [newPlaylistName])

  // Add track to playlist
  const addToPlaylist = useCallback((playlistId: string, track: Track) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId ? { ...playlist, tracks: [...playlist.tracks, track] } : playlist,
      ),
    )
  }, [])

  // Remove track from playlist
  const removeFromPlaylist = useCallback((playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, tracks: playlist.tracks.filter((track) => track.id !== trackId) }
          : playlist,
      ),
    )
  }, [])

  // Switch playlist
  const switchPlaylist = useCallback(
    (playlistId: string) => {
      setPlayerState((prev) => ({
        ...prev,
        currentPlaylistId: playlistId,
        currentTrackIndex: 0,
      }))
      setTimeout(() => loadCurrentTrack(), 100)
    },
    [loadCurrentTrack],
  )

  // Retry loading
  const retryLoading = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, hasError: false }))
    loadCurrentTrack()
  }, [loadCurrentTrack])

  // Format time
  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Verificar si el archivo de audio existe
  useEffect(() => {
    const checkAudioFile = async () => {
      try {
        const response = await fetch("/sounds/gorkhali.mp3", { method: "HEAD" })
        if (response.ok) {
          console.log("✅ Archivo de audio encontrado")
          setAudioExists(true)
        } else {
          console.warn("❌ Archivo de audio no encontrado (404)")
          setAudioExists(false)
          setPlayerState((prev) => ({ ...prev, hasError: true }))
        }
      } catch (error) {
        console.error("❌ Error al verificar archivo de audio:", error)
        setAudioExists(false)
        setPlayerState((prev) => ({ ...prev, hasError: true }))
      }
    }

    checkAudioFile()
  }, [])

  if (!showPlayer) return null

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Playlist Manager Modal */}
      <AnimatePresence>
        {showPlaylistManager && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60"
            onClick={() => setShowPlaylistManager(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/90 backdrop-blur-md rounded-lg border border-[#D4AF37]/30 p-6 w-96 max-h-96 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-[#D4AF37] font-semibold text-lg mb-4">Playlist Manager</h3>

              {/* Create New Playlist */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="New playlist name..."
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded border border-[#D4AF37]/30 focus:border-[#D4AF37] outline-none"
                  onKeyPress={(e) => e.key === "Enter" && createPlaylist()}
                />
                <button
                  onClick={createPlaylist}
                  className="mt-2 bg-[#D4AF37] text-black px-4 py-2 rounded hover:bg-[#B8860B] transition-colors"
                >
                  Create Playlist
                </button>
              </div>

              {/* Playlist List */}
              <div className="space-y-2">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      playlist.id === playerState.currentPlaylistId
                        ? "border-[#D4AF37] bg-[#D4AF37]/20"
                        : "border-[#D4AF37]/30 hover:border-[#D4AF37]/50"
                    }`}
                    onClick={() => switchPlaylist(playlist.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-[#D4AF37] font-medium">{playlist.name}</h4>
                        <p className="text-[#D4AF37]/70 text-sm">{playlist.tracks.length} tracks</p>
                      </div>
                      {playlist.id === playerState.currentPlaylistId && (
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Player */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-black/90 backdrop-blur-md rounded-lg border border-[#D4AF37]/30 p-4 w-80"
          >
            {/* Audio Visualizer */}
            <div className="mb-4">
              <canvas
                ref={canvasRef}
                width={288}
                height={60}
                className="w-full h-15 bg-black/50 rounded border border-[#D4AF37]/20"
              />
            </div>

            {/* Track Info */}
            <div className="text-center mb-4">
              <h3 className="text-[#D4AF37] font-semibold text-sm truncate">{currentTrack?.title || "No Track"}</h3>
              <p className="text-[#D4AF37]/70 text-xs truncate">{currentTrack?.artist || "Unknown Artist"}</p>
              <p className="text-[#D4AF37]/50 text-xs truncate">{currentTrack?.album || ""}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div
                ref={progressRef}
                className="w-full h-2 bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
                onClick={(e) => {
                  if (!progressRef.current) return
                  const rect = progressRef.current.getBoundingClientRect()
                  const position = ((e.clientX - rect.left) / rect.width) * 100
                  seekTo(position)
                }}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#D4AF37]/30 transition-all duration-300"
                  style={{
                    width: `${playerState.duration > 0 ? (playerState.buffered / playerState.duration) * 100 : 0}%`,
                  }}
                />
                <div
                  className="absolute top-0 left-0 h-full bg-[#D4AF37] transition-all duration-300"
                  style={{
                    width: `${playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#D4AF37]/70 mt-1">
                <span>{formatTime(playerState.currentTime)}</span>
                <span>{formatTime(playerState.duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center items-center space-x-4 mb-4">
              <button
                onClick={toggleShuffle}
                className={`p-2 rounded transition-colors ${
                  playerState.shuffle ? "bg-[#D4AF37] text-black" : "text-[#D4AF37] hover:text-white"
                }`}
                title="Shuffle"
              >
                <Shuffle size={16} />
              </button>

              <button
                onClick={toggleRepeat}
                className={`p-2 rounded transition-colors ${
                  playerState.repeat !== "off" ? "bg-[#D4AF37] text-black" : "text-[#D4AF37] hover:text-white"
                }`}
                title={`Repeat: ${playerState.repeat}`}
              >
                {playerState.repeat === "one" ? <Repeat1 size={16} /> : <Repeat size={16} />}
              </button>

              <button
                onClick={() => toggleFavorite(currentTrack?.id || "")}
                className={`p-2 rounded transition-colors ${
                  currentTrack?.favorite ? "text-red-500" : "text-[#D4AF37] hover:text-red-500"
                }`}
                title="Favorite"
              >
                <Heart size={16} fill={currentTrack?.favorite ? "currentColor" : "none"} />
              </button>

              <button
                onClick={() => setShowPlaylistManager(true)}
                className="p-2 rounded text-[#D4AF37] hover:text-white transition-colors"
                title="Playlists"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2 mb-4">
              <button onClick={toggleMute} className="text-[#D4AF37] hover:text-white transition-colors">
                {playerState.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <div
                className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const volume = (e.clientX - rect.left) / rect.width
                  setVolume(volume)
                }}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#D4AF37] rounded-full"
                  style={{ width: `${playerState.volume * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#D4AF37]/70 w-8">{Math.round(playerState.volume * 100)}</span>
            </div>

            {/* Current Playlist */}
            <div className="max-h-32 overflow-y-auto">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-[#D4AF37] text-xs font-semibold">{currentPlaylist.name}</h4>
                <span className="text-[#D4AF37]/50 text-xs">{currentPlaylist.tracks.length} tracks</span>
              </div>
              {currentPlaylist.tracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center space-x-2 p-1 rounded cursor-pointer transition-colors ${
                    index === playerState.currentTrackIndex ? "bg-[#D4AF37]/20" : "hover:bg-[#D4AF37]/10"
                  }`}
                  onClick={() => {
                    setPlayerState((prev) => ({ ...prev, currentTrackIndex: index }))
                    setTimeout(() => {
                      loadCurrentTrack()
                      if (playerState.isPlaying && !playerState.hasError) {
                        setTimeout(() => {
                          if (audioRef.current) {
                            const playPromise = audioRef.current.play()
                            if (playPromise) {
                              playPromise.catch(() => {
                                setPlayerState((prev) => ({
                                  ...prev,
                                  hasError: true,
                                  isPlaying: true, // Visual fallback
                                }))
                              })
                            }
                          }
                        }, 100)
                      }
                    }, 100)
                  }}
                >
                  <Music size={12} className="text-[#D4AF37]/70" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#D4AF37] truncate">{track.title}</p>
                    <p className="text-xs text-[#D4AF37]/50 truncate">{track.artist}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {track.favorite && <Heart size={10} className="text-red-500" fill="currentColor" />}
                    {index === playerState.currentTrackIndex && (
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Player Controls */}
      <div className="flex items-center bg-black/90 backdrop-blur-md rounded-full border border-[#D4AF37]/30 shadow-lg overflow-hidden">
        {/* Shuffle Button */}
        <button
          onClick={toggleShuffle}
          className={`w-10 h-10 flex items-center justify-center transition-colors ${
            playerState.shuffle ? "bg-[#D4AF37] text-black" : "text-[#D4AF37] hover:text-white"
          }`}
          title="Shuffle"
        >
          <Shuffle size={14} />
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="w-10 h-10 flex items-center justify-center text-[#D4AF37] hover:text-white transition-colors"
          title="Previous Track"
        >
          <SkipBack size={16} />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={playerState.isLoading && !playerState.hasError}
          className={`relative w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 ${
            playerState.isPlaying
              ? "bg-[#8B0000] text-[#D4AF37] shadow-lg shadow-[#8B0000]/50"
              : "bg-[#D4AF37] text-[#8B0000] hover:bg-[#FFD700] shadow-lg shadow-[#D4AF37]/50"
          }`}
          title={
            playerState.hasError
              ? "Modo Visual (Audio no disponible)"
              : playerState.isLoading
                ? "Cargando..."
                : playerState.isPlaying
                  ? "Pausar Gorkhali Theme"
                  : "Reproducir Gorkhali Theme"
          }
        >
          <AnimatePresence mode="wait">
            {playerState.isLoading ? (
              <motion.div
                key="loading"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Loader2 size={24} className="animate-spin" />
              </motion.div>
            ) : playerState.hasError ? (
              <motion.div
                key="error"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Music size={24} className={playerState.isPlaying ? "animate-pulse" : ""} />
              </motion.div>
            ) : playerState.isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Pause size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Play size={24} className="ml-1" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Efecto de pulso cuando está reproduciendo */}
          {playerState.isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full bg-[#D4AF37]/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 0.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          )}
        </button>

        {/* Información de la canción */}
        <AnimatePresence>
          {(playerState.isPlaying || playerState.hasError) && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <div className="px-4 py-2">
                <div className="text-[#D4AF37] font-semibold text-sm">
                  {playerState.hasError ? "🎭 Modo Visual" : "🎵 Gorkhali Theme"}
                </div>
                <div className="text-[#D4AF37]/70 text-xs">
                  {playerState.hasError ? "Audio no disponible" : "Gorkhali Token"}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón de Volumen */}
        <button
          onClick={toggleMute}
          className="w-12 h-12 flex items-center justify-center text-[#D4AF37] hover:text-[#FFD700] transition-colors"
          title={playerState.isMuted ? "Activar sonido" : "Silenciar"}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            {playerState.isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.div>
        </button>

        {/* Indicador de tiempo (solo si está reproduciendo) */}
        <AnimatePresence>
          {playerState.isPlaying && !playerState.hasError && playerState.duration > 0 && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="px-3 text-[#D4AF37]/70 text-xs font-mono"
            >
              {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Barra de progreso (solo si está reproduciendo) */}
      <AnimatePresence>
        {playerState.isPlaying && !playerState.hasError && playerState.duration > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-2 w-full h-1 bg-black/50 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
              style={{
                width: `${playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mensaje de estado (solo para debugging) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-2 text-xs text-[#D4AF37]/50 text-center">
          {playerState.hasError
            ? "❌ Error"
            : playerState.isLoading
              ? "⏳ Cargando"
              : playerState.isReady
                ? "✅ Listo"
                : "⏸️ Esperando"}
        </div>
      )}

      {/* Mensaje de estado (solo si hay error) */}
      {playerState.hasError && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-[#D4AF37]/80 text-center bg-black/50 backdrop-blur-sm p-1 rounded"
        >
          Audio no disponible - Modo visual activado
        </motion.div>
      )}
    </motion.div>
  )
}
