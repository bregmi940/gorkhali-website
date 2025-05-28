"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
  delay?: number
  hoverEffect?: boolean
}

export function FeatureCard({
  title,
  description,
  icon,
  className = "",
  delay = 0,
  hoverEffect = true,
}: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 relative overflow-hidden",
        hoverEffect && "group",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
    >
      <div className="absolute top-0 right-0 h-24 w-24 bg-[#8B0000]/10 rounded-bl-full"></div>

      <motion.div
        className={cn(
          "h-12 w-12 bg-[#8B0000] rounded-full flex items-center justify-center mb-4",
          hoverEffect && "group-hover:scale-110 transition-transform duration-300",
        )}
      >
        <span className="text-[#D4AF37]">{icon}</span>
      </motion.div>

      <h3 className="text-xl font-bold text-[#D4AF37] mb-2">{title}</h3>
      <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">{description}</p>

      {hoverEffect && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      )}
    </motion.div>
  )
}
