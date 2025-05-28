"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface ImageGalleryProps {
  className?: string
}

export function ImageGallery({ className = "" }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const images = [
    {
      src: "/images/gorkhali-coin.png",
      alt: "GORKHALI Coin",
      caption: "The official GORKHALI (GKR) coin featuring King Prithvi Narayan Shah",
    },
    {
      src: "/images/king-illustration.png",
      alt: "King Prithvi Narayan Shah Illustration",
      caption: "Artistic representation of the unifier of Nepal",
    },
    {
      src: "/images/king-with-temples.png",
      alt: "King with Traditional Temples",
      caption: "King Prithvi Narayan Shah with traditional Nepalese architecture",
    },
    {
      src: "/images/digital-king.png",
      alt: "Digital King GKR",
      caption: "The digital legacy of the King reimagined for the blockchain era",
    },
  ]

  // Inicializar el estado de carga de imágenes
  useEffect(() => {
    setImagesLoaded(new Array(images.length).fill(false))
  }, [images.length])

  // Marcar una imagen como cargada
  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const selectImage = (index: number) => {
    setActiveIndex(index)
  }

  // Manejo de gestos táctiles para deslizar
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }

    // Resetear valores
    setTouchStart(null)
    setTouchEnd(null)
  }

  // Configurar navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "ArrowRight") {
        nextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 ${className}`}
    >
      <div
        className="relative aspect-square overflow-hidden rounded-lg mb-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Imagen actual */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === activeIndex ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Placeholder mientras carga */}
              {!imagesLoaded[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#121212]/50">
                  <div className="w-10 h-10 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
                </div>
              )}

              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-contain"
                priority={index === 0}
                onLoad={() => handleImageLoad(index)}
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </motion.div>
          ))}
        </div>

        {/* Controles de navegación superpuestos */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            prevImage()
          }}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#121212]/70 hover:bg-[#8B0000] text-[#D4AF37] p-2 rounded-full z-20 transition-colors duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            nextImage()
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#121212]/70 hover:bg-[#8B0000] text-[#D4AF37] p-2 rounded-full z-20 transition-colors duration-300"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="text-center text-[#D4AF37] mb-6">{images[activeIndex].caption}</p>

      <div className="flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              index === activeIndex ? "bg-[#D4AF37]" : "bg-[#D4AF37]/30"
            }`}
            aria-label={`Go to image ${index + 1}`}
            aria-current={index === activeIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}
