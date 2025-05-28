"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useProgressiveLoading } from "@/hooks/use-progressive-loading"

interface InitialLoaderProps {
  onComplete: () => void
  minDisplayTime?: number
}

export function InitialLoader({ onComplete, minDisplayTime = 2000 }: InitialLoaderProps) {
  const [showLoader, setShowLoader] = useState(true)
  const [startTime] = useState(Date.now())

  // Critical resources to preload
  const criticalResources = ["/images/digital-king.png", "/images/gorkhali-coin.png"]

  const { progress, isComplete } = useProgressiveLoading({
    resources: criticalResources,
    onComplete: () => {
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, minDisplayTime - elapsed)

      setTimeout(() => {
        setShowLoader(false)
        setTimeout(onComplete, 300) // Allow exit animation to complete
      }, remainingTime)
    },
  })

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#121212] flex items-center justify-center"
        >
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#D4AF37] to-[#8B0000] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">GKR</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-serif font-bold text-[#D4AF37] mb-4"
            >
              GORKHALI
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-300 mb-8"
            >
              Loading the Digital Kingdom...
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-64 mx-auto"
            >
              <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#8B0000] h-full rounded-full"
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">{Math.round(progress)}%</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
