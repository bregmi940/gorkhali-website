"use client"

import type React from "react"

import { useEffect } from "react"
import { useAnimation, useInView } from "framer-motion"

export function useScrollReveal(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, threshold })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return { controls, inView }
}
