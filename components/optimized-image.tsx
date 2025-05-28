"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { motion } from "framer-motion"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  blurEffect?: boolean
  fallbackSrc?: string
}

export function OptimizedImage({
  blurEffect = false,
  fallbackSrc = "/placeholder.svg?height=400&width=400&text=Loading",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse" />}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isLoaded ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <Image
          {...props}
          src={hasError ? fallbackSrc : props.src}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            filter: blurEffect && !isLoaded ? "blur(10px)" : "none",
            transition: "filter 0.3s ease",
            ...props.style,
          }}
        />
      </motion.div>
    </div>
  )
}
