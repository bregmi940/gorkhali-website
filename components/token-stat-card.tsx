"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TokenStatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  description?: string
  className?: string
  delay?: number
}

export function TokenStatCard({ title, value, icon, description, className, delay = 0 }: TokenStatCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 relative overflow-hidden",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="absolute top-0 right-0 h-20 w-20 bg-[#8B0000]/10 rounded-bl-full"></div>
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 bg-[#8B0000] rounded-full flex items-center justify-center mr-3">{icon}</div>
        <h3 className="text-[#D4AF37] font-bold">{title}</h3>
      </div>
      <div className="mb-2">
        <span className="text-3xl font-bold text-white dark:text-white light:text-[#121212]">{value}</span>
      </div>
      {description && <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">{description}</p>}
    </motion.div>
  )
}
