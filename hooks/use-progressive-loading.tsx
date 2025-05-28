"use client"

import { useState, useEffect } from "react"

interface ProgressiveLoadingOptions {
  resources: string[]
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

export function useProgressiveLoading({ resources, onProgress, onComplete }: ProgressiveLoadingOptions) {
  const [loadedCount, setLoadedCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (resources.length === 0) {
      setIsComplete(true)
      onComplete?.()
      return
    }

    let completed = 0

    const loadResource = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => resolve() // Continue even if resource fails
        img.src = src
      })
    }

    const loadResources = async () => {
      for (const resource of resources) {
        try {
          await loadResource(resource)
        } catch (error) {
          console.warn(`Failed to load resource: ${resource}`)
        }

        completed++
        setLoadedCount(completed)

        const currentProgress = (completed / resources.length) * 100
        setProgress(currentProgress)
        onProgress?.(currentProgress)
      }

      setIsComplete(true)
      onComplete?.()
    }

    loadResources()
  }, [resources, onProgress, onComplete])

  return { loadedCount, isComplete, progress }
}
