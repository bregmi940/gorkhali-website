"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: string
  phase: string
  title: string
  quarter: string
  icon: string
  content: string
}

interface RoadmapTimelineProps {
  items: TimelineItem[]
  className?: string
}

export function RoadmapTimeline({ items, className }: RoadmapTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)

  const nextPhase = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? prev : prev + 1))
  }

  const prevPhase = () => {
    setActiveIndex((prev) => (prev === 0 ? prev : prev - 1))
  }

  const activeItem = items[activeIndex]

  return (
    <div className={cn("relative", className)}>
      {/* Timeline */}
      <div ref={timelineRef} className="relative mb-12 overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#D4AF37]/20 -translate-y-1/2"></div>

        <div className="relative flex justify-between max-w-5xl mx-auto px-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className={cn("relative cursor-pointer flex flex-col items-center", "transition-all duration-300")}
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center z-10 mb-2",
                  "transition-all duration-300",
                  index === activeIndex
                    ? "bg-[#8B0000] scale-125"
                    : "bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-[#f1f1f1]",
                )}
              >
                <span className="text-[#D4AF37]">{item.icon}</span>
              </div>

              <motion.div
                className={cn(
                  "absolute top-12 text-center transition-all duration-300",
                  index === activeIndex ? "opacity-100" : "opacity-0 sm:opacity-50",
                )}
                animate={{
                  scale: index === activeIndex ? 1 : 0.8,
                }}
              >
                <p className="text-[#D4AF37] font-bold text-sm sm:text-base">{item.phase}</p>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs sm:text-sm">
                  {item.quarter}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative bg-[#1A1A1A]/50 dark:bg-[#1A1A1A]/50 light:bg-white/80 rounded-lg p-6 min-h-[300px]">
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={prevPhase}
            disabled={activeIndex === 0}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              activeIndex === 0 ? "text-[#D4AF37]/30 cursor-not-allowed" : "text-[#D4AF37] hover:bg-[#8B0000]/20",
            )}
            aria-label="Previous phase"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextPhase}
            disabled={activeIndex === items.length - 1}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              activeIndex === items.length - 1
                ? "text-[#D4AF37]/30 cursor-not-allowed"
                : "text-[#D4AF37] hover:bg-[#8B0000]/20",
            )}
            aria-label="Next phase"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] mb-2">{activeItem.title}</h3>
            <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6">{activeItem.content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
