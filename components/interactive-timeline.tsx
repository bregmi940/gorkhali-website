"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  image?: string
  icon?: string
}

interface InteractiveTimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function InteractiveTimeline({ events, className }: InteractiveTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const nextEvent = () => {
    setActiveIndex((prev) => (prev === events.length - 1 ? prev : prev + 1))
  }

  const prevEvent = () => {
    setActiveIndex((prev) => (prev === 0 ? prev : prev - 1))
  }

  const activeEvent = events[activeIndex]

  const handleScroll = (index: number) => {
    setActiveIndex(index)
    if (timelineRef.current) {
      const scrollPosition = index * (isMobile ? 80 : 150) - timelineRef.current.clientWidth / 2 + (isMobile ? 40 : 75)
      timelineRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* Timeline Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-serif font-bold text-[#D4AF37]">Historical Timeline</h3>
        <div className="flex space-x-2">
          <button
            onClick={prevEvent}
            disabled={activeIndex === 0}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              activeIndex === 0 ? "text-[#D4AF37]/30 cursor-not-allowed" : "text-[#D4AF37] hover:bg-[#8B0000]/20",
            )}
            aria-label="Previous event"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextEvent}
            disabled={activeIndex === events.length - 1}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              activeIndex === events.length - 1
                ? "text-[#D4AF37]/30 cursor-not-allowed"
                : "text-[#D4AF37] hover:bg-[#8B0000]/20",
            )}
            aria-label="Next event"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Timeline Scroll */}
      <div
        ref={timelineRef}
        className="relative mb-8 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#D4AF37]/20 -translate-y-1/2"></div>

        <div className="relative flex items-center min-w-max py-6 px-4">
          {events.map((event, index) => {
            const isActive = index === activeIndex
            const isPast = index < activeIndex

            return (
              <div
                key={event.id}
                className="flex flex-col items-center mx-10 first:ml-4 last:mr-4"
                style={{ minWidth: isMobile ? "60px" : "120px" }}
              >
                <button
                  onClick={() => handleScroll(index)}
                  className={cn(
                    "relative h-10 w-10 rounded-full flex items-center justify-center z-10 mb-3",
                    "transition-all duration-500",
                    isActive
                      ? "bg-[#8B0000] scale-125"
                      : isPast
                        ? "bg-[#8B0000]/70"
                        : "bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-[#f1f1f1]",
                  )}
                  aria-label={`View event: ${event.title}`}
                >
                  {event.icon ? (
                    <span className="text-[#D4AF37]">{event.icon}</span>
                  ) : (
                    <span className="text-[#D4AF37] font-bold">{index + 1}</span>
                  )}

                  {isActive && (
                    <motion.div
                      className="absolute -inset-1 rounded-full border-2 border-[#D4AF37]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  )}
                </button>

                <div className={cn("text-center transition-all duration-300", isActive ? "opacity-100" : "opacity-50")}>
                  <p
                    className={cn(
                      "font-bold transition-all duration-300",
                      isActive ? "text-[#D4AF37]" : "text-gray-400",
                    )}
                  >
                    {event.year}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Event Content */}
      <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-[#D4AF37]/20 rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {activeEvent.image && (
              <div className="relative h-48 md:h-64 lg:h-80 w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1A1A] z-10"></div>
                <Image
                  src={activeEvent.image || "/placeholder.svg"}
                  alt={activeEvent.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#8B0000] rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#D4AF37] font-bold">{activeEvent.year.split(" ")[0]}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37]">{activeEvent.title}</h3>
              </div>

              <div
                className={cn(
                  "text-gray-300 dark:text-gray-300 light:text-gray-700 space-y-4 transition-all duration-500",
                  isExpanded ? "" : "line-clamp-3 md:line-clamp-4",
                )}
              >
                {activeEvent.description.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {activeEvent.description.split("\n\n").length > 2 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 flex items-center text-[#D4AF37] hover:text-[#FFD700] transition-colors"
                >
                  <span>{isExpanded ? "Read Less" : "Read More"}</span>
                  <Plus
                    size={16}
                    className={cn("ml-1 transition-transform duration-300", isExpanded ? "rotate-45" : "")}
                  />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
