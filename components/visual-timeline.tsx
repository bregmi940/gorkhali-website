"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TimelinePhase {
  id: string
  phase: string
  title: string
  quarter: string
  icon: string
  subtitle: string
  color?: string
}

interface VisualTimelineProps {
  phases: TimelinePhase[]
  activePhase: string
  setActivePhase: (phase: string) => void
}

export function VisualTimeline({ phases, activePhase, setActivePhase }: VisualTimelineProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(new Audio("/sounds/click.mp3"))
    }
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
    <div className="w-full max-w-6xl mx-auto mb-16">
      {/* Desktop Timeline (hidden on mobile) */}
      <div className="hidden md:block relative">
        {/* Main timeline line */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-[#8B0000] via-[#D4AF37] to-[#8B0000] rounded-full transform -translate-y-1/2"></div>

        {/* Timeline nodes */}
        <div className="relative flex justify-between items-center py-16">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Phase node */}
              <motion.button
                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer border-4 transition-all duration-300 ${
                  activePhase === phase.id
                    ? "border-[#D4AF37] bg-[#8B0000] scale-110 shadow-lg shadow-[#D4AF37]/30"
                    : "border-[#D4AF37]/50 bg-[#1A0F00] hover:bg-[#3A1F00]"
                }`}
                onClick={() => handlePhaseClick(phase.id)}
                whileHover={{ scale: activePhase === phase.id ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">{phase.icon}</span>

                {/* Pulse effect for active phase */}
                {activePhase === phase.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                  />
                )}
              </motion.button>

              {/* Phase title - above for odd, below for even */}
              <motion.div
                className={`absolute ${index % 2 === 0 ? "bottom-full mb-4" : "top-full mt-4"} text-center w-32`}
                initial={{ opacity: 0 }}
                animate={{ opacity: activePhase === phase.id ? 1 : 0.7 }}
              >
                <h4
                  className={`font-bold text-lg ${activePhase === phase.id ? "text-[#D4AF37]" : "text-[#D4AF37]/70"}`}
                >
                  {phase.phase}
                </h4>
                <p className={`text-sm ${activePhase === phase.id ? "text-[#D4AF37]/90" : "text-[#D4AF37]/60"}`}>
                  {phase.quarter}
                </p>

                {/* Title only shows on active or hover */}
                <motion.p
                  className={`text-xs mt-1 ${activePhase === phase.id ? "text-white/80" : "text-white/50"}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: activePhase === phase.id ? 1 : 0,
                    height: activePhase === phase.id ? "auto" : 0,
                  }}
                >
                  {phase.title}
                </motion.p>
              </motion.div>

              {/* Connecting line to main timeline */}
              <div
                className={`absolute ${
                  index % 2 === 0 ? "top-1/2 bottom-0" : "top-0 bottom-1/2"
                } w-0.5 bg-[#D4AF37]/30`}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#8B0000]/10 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-y-1/2"></div>
      </div>

      {/* Mobile Timeline (vertical, hidden on desktop) */}
      <div className="md:hidden relative">
        {/* Vertical timeline line */}
        <div className="absolute top-0 bottom-0 left-4 w-1 bg-gradient-to-b from-[#8B0000] via-[#D4AF37] to-[#8B0000] rounded-full"></div>

        <div className="relative pl-12 space-y-12">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Phase node */}
              <motion.button
                className={`absolute left-0 -translate-x-8 top-0 z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-2 transition-all duration-300 ${
                  activePhase === phase.id
                    ? "border-[#D4AF37] bg-[#8B0000] scale-110 shadow-lg shadow-[#D4AF37]/30"
                    : "border-[#D4AF37]/50 bg-[#1A0F00] hover:bg-[#3A1F00]"
                }`}
                onClick={() => handlePhaseClick(phase.id)}
                whileHover={{ scale: activePhase === phase.id ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{phase.icon}</span>

                {/* Pulse effect for active phase */}
                {activePhase === phase.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                  />
                )}
              </motion.button>

              {/* Phase content */}
              <div
                className={`p-4 rounded-lg transition-all duration-300 ${
                  activePhase === phase.id
                    ? "bg-[#1A0F00]/80 border border-[#D4AF37]/30"
                    : "bg-[#1A0F00]/40 border border-[#D4AF37]/10"
                }`}
                onClick={() => handlePhaseClick(phase.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4
                    className={`font-bold text-lg ${activePhase === phase.id ? "text-[#D4AF37]" : "text-[#D4AF37]/70"}`}
                  >
                    {phase.phase}
                  </h4>
                  <p className={`text-sm ${activePhase === phase.id ? "text-[#D4AF37]/90" : "text-[#D4AF37]/60"}`}>
                    {phase.quarter}
                  </p>
                </div>

                <p className={`text-base font-medium ${activePhase === phase.id ? "text-white/80" : "text-white/50"}`}>
                  {phase.title}
                </p>

                {/* Subtitle only shows when active */}
                <motion.p
                  className="text-sm mt-2 text-white/70"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: activePhase === phase.id ? 1 : 0,
                    height: activePhase === phase.id ? "auto" : 0,
                  }}
                >
                  {phase.subtitle}
                </motion.p>
              </div>

              {/* Connecting line to main timeline */}
              <div className="absolute top-6 left-0 w-4 h-0.5 bg-[#D4AF37]/30 -translate-x-8"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current active phase visual indicator */}
      <div className="mt-12 text-center">
        <div className="inline-block px-6 py-2 bg-[#8B0000]/80 border border-[#D4AF37]/30 rounded-full">
          <p className="text-[#D4AF37] font-medium">
            Current Phase: <span className="font-bold">{phases.find((p) => p.id === activePhase)?.phase}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
