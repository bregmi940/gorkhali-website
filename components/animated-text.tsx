"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  duration?: number
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}

export function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
  duration = 0.05,
  tag = "p",
}: AnimatedTextProps) {
  // Split text into words safely
  const words = text ? text.split(" ") : []

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const Tag = tag

  return (
    <motion.div
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="mr-1 mb-1" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
