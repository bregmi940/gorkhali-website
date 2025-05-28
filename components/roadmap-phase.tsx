"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface RoadmapSection {
  icon: string
  title: string
  content: string[]
}

interface RoadmapPhase {
  title: string
  subtitle: string
  sections: RoadmapSection[]
}

interface RoadmapPhaseProps {
  phases: Record<string, RoadmapPhase>
  activePhase: string
  setActivePhase: (phase: string) => void
}

export function RoadmapPhase({ phases, activePhase, setActivePhase }: RoadmapPhaseProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    setAudio(new Audio("/sounds/click.mp3"))
    return () => {
      if (audio) {
        audio.pause()
        audio.src = ""
      }
    }
  }, [])

  const handlePhaseClick = (phase: string) => {
    setActivePhase(phase)
    if (audio && !isPlaying) {
      setIsPlaying(true)
      audio.volume = 0.2
      audio.currentTime = 0
      audio.play().catch((e) => console.error("Audio play failed:", e))
      audio.onended = () => setIsPlaying(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600/50 rounded-full ml-6 md:ml-8"></div>

        <div className="space-y-16">
          {Object.keys(phases).map((phaseKey, index) => (
            <motion.div
              key={phaseKey}
              className={`relative pl-16 md:pl-20 ${activePhase === phaseKey ? "opacity-100" : "opacity-70"}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: activePhase === phaseKey ? 1 : 0.7, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  activePhase === phaseKey
                    ? "bg-amber-600 text-white scale-110 shadow-lg shadow-amber-600/30"
                    : "bg-amber-900/60 text-amber-300 hover:bg-amber-800"
                }`}
                onClick={() => handlePhaseClick(phaseKey)}
              >
                <span className="text-lg font-bold">{index + 1}</span>
              </div>

              <div
                className={`p-6 rounded-lg transition-all duration-500 ${
                  activePhase === phaseKey
                    ? "bg-amber-900/30 border border-amber-600/50 shadow-lg"
                    : "bg-black/30 border border-amber-800/20 hover:bg-amber-950/40"
                }`}
                onClick={() => handlePhaseClick(phaseKey)}
              >
                <h3 className="text-2xl font-bold mb-2 text-amber-300">{phases[phaseKey].title}</h3>
                <p className="text-lg mb-4 text-amber-100">{phases[phaseKey].subtitle}</p>

                {activePhase === phaseKey && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 space-y-4"
                  >
                    {phases[phaseKey].sections.map((section, sectionIndex) => (
                      <motion.div
                        key={sectionIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: sectionIndex * 0.1 }}
                        className="bg-black/30 border border-amber-700/30 rounded-lg p-4"
                      >
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">{section.icon}</span>
                          <h4 className="text-xl font-semibold text-amber-200">{section.title}</h4>
                        </div>
                        <div className="pl-9 space-y-2">
                          {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-amber-100">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activePhase !== phaseKey && (
                  <div className="flex justify-end">
                    <button
                      className="flex items-center text-amber-400 hover:text-amber-300 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePhaseClick(phaseKey)
                      }}
                    >
                      <span className="mr-1">Ver detalles</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
