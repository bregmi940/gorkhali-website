"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import EpicVisualEffects from "./epic-visual-effects"

interface HistoryEvent {
  year: string
  title: string
  description: string
  image?: string
}

const historyEvents: HistoryEvent[] = [
  {
    year: "Ancient",
    title: "Origins of Gorkhali",
    description: "The first settlements and the formation of Gorkhali culture in the Himalayan mountains.",
    image: "/images/king-illustration.png",
  },
  {
    year: "1559",
    title: "Kingdom Unification",
    description: "The legendary king Drabya Shah unifies the tribes and establishes the first Gorkhali kingdom.",
    image: "/images/king-with-temples.png",
  },
  {
    year: "1768",
    title: "The Great Expansion",
    description:
      "The Gorkhali kingdom reaches its maximum territorial extent under the leadership of Prithvi Narayan Shah.",
    image: "/images/king-battle.png",
  },
  {
    year: "2023",
    title: "Digital Renaissance",
    description: "Gorkhali culture is reborn in the digital era with the creation of Gorkhali Coin.",
    image: "/images/digital-king.png",
  },
]

export const EnhancedHistorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  useEffect(() => {
    // Preload audio with error handling
    audioRef.current = new Audio("/sounds/gong.mp3")
    audioRef.current.addEventListener("error", (e) => {
      console.error("Audio loading error:", e)
      // Provide fallback behavior or disable audio
      setIsPlaying(false)
    })

    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top
      const containerHeight = containerRect.height
      const windowHeight = window.innerHeight

      // Only process if the container is visible in the viewport
      if (containerTop > windowHeight || containerTop + containerHeight < 0) {
        return
      }

      // Calculate which section is in view
      const visibleRatio = Math.min((windowHeight - containerTop) / containerHeight, 1)

      // Ensure visibleRatio is between 0 and 1
      const normalizedRatio = Math.max(0, Math.min(1, visibleRatio))

      // Calculate the index based on the visible ratio
      const newIndex = Math.min(historyEvents.length - 1, Math.floor(normalizedRatio * historyEvents.length))

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)

        // Play sound effect when changing sections
        if (audioRef.current && !isPlaying) {
          setIsPlaying(true)
          audioRef.current.volume = 0.3
          audioRef.current.play().catch((e) => {
            console.error("Audio play failed:", e)
            setIsPlaying(false) // Reset playing state if audio fails
          })
          audioRef.current.onended = () => setIsPlaying(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      // Clean up audio element
      if (audioRef.current) {
        audioRef.current.onended = null
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [activeIndex, isPlaying])

  return (
    <motion.div ref={containerRef} style={{ opacity, scale }} className="relative min-h-screen py-20 overflow-hidden">
      <style jsx>{`
        .history-title {
          color: #d4af37;
          font-size: 3.75rem;
          font-weight: bold;
          text-align: center;
          line-height: 1.2;
          margin-bottom: 4rem;
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }
        
        @media (max-width: 640px) {
          .history-title {
            font-size: 2.5rem;
          }
          .history-title::after {
            content: "The History of\\AGorkhali";
            white-space: pre-line;
          }
        }
        
        @media (min-width: 641px) {
          .history-title::after {
            content: "The History of Gorkhali";
          }
        }
      `}</style>

      <EpicVisualEffects type="particles" intensity="medium" theme="history">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="history-title"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {historyEvents.map((event, index) => (
              <React.Fragment key={index}>
                <EpicVisualEffects
                  type={index % 2 === 0 ? "reveal" : "parallax"}
                  intensity={activeIndex === index ? "high" : "low"}
                  theme="history"
                >
                  <motion.div
                    className={`p-8 rounded-lg history-border ${activeIndex === index ? "scale-105 z-10" : "scale-100 opacity-70"} transition-all duration-500`}
                    initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                  >
                    <div className="text-3xl font-bold mb-2 history-glow">{event.year}</div>
                    <h3 className="text-2xl font-semibold mb-4">{event.title}</h3>
                    <p className="text-lg">{event.description}</p>
                  </motion.div>
                </EpicVisualEffects>

                <EpicVisualEffects
                  type={index % 2 === 0 ? "glow" : "fire"}
                  intensity={activeIndex === index ? "high" : "low"}
                  theme="history"
                >
                  <motion.div
                    className={`perspective-3d ${activeIndex === index ? "scale-105 z-10" : "scale-95 opacity-70"} transition-all duration-500`}
                    initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                  >
                    {event.image && (
                      <div className="rotate-3d rounded-lg overflow-hidden">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </motion.div>
                </EpicVisualEffects>
              </React.Fragment>
            ))}
          </div>

          <EpicVisualEffects type="wave" intensity="medium" theme="history">
            <motion.div
              className="mt-20 p-8 rounded-lg history-border text-center"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4 history-glow">Eternal Legacy</h2>
              <p className="text-xl">
                The history of Gorkhali is a story of bravery, honor, and tradition. From its humble beginnings to its
                digital rebirth, the Gorkhali spirit continues to inspire generations.
              </p>
            </motion.div>
          </EpicVisualEffects>
        </div>
        <style jsx global>{`
          @media (max-width: 768px) {
            .history-glow {
              text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
            }
            .history-border {
              border: 2px solid #d4af37;
              box-shadow: 0 0 15px rgba(139, 0, 0, 0.3);
            }
          }
        `}</style>
      </EpicVisualEffects>
    </motion.div>
  )
}

export default EnhancedHistorySection
