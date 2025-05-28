"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn("mb-12", centered && "text-center", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={cn("text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] mb-4", titleClassName)}>{title}</h2>

      {subtitle && (
        <p
          className={cn(
            "text-lg text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-3xl",
            centered && "mx-auto",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}

      <div className={cn("h-1 w-20 bg-[#8B0000] mt-4", centered && "mx-auto")}></div>
    </motion.div>
  )
}
