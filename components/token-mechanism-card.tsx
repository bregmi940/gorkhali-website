"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TokenMechanismCardProps {
  title: string
  icon: React.ReactNode
  description: string
  features: string[]
  className?: string
  delay?: number
}

export function TokenMechanismCard({
  title,
  icon,
  description,
  features,
  className,
  delay = 0,
}: TokenMechanismCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-[#121212] dark:bg-[#121212] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 h-full relative overflow-hidden",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="absolute top-0 right-0 h-24 w-24 bg-[#8B0000]/10 rounded-bl-full"></div>
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 bg-[#8B0000] rounded-full flex items-center justify-center mr-3 text-[#D4AF37]">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-[#D4AF37]">{title}</h3>
      </div>
      <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-[#D4AF37] mr-2">✓</span>
            <span className="text-gray-300 dark:text-gray-300 light:text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
