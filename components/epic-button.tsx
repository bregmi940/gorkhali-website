"use client"

import type React from "react"

import { useState } from "react"
import { useImmersive } from "@/context/immersive-context"
import { cn } from "@/lib/utils"

interface EpicButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost" | "link" | "epic"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  // Otras props estándar de botón que podrían ser necesarias
}

export function EpicButton({
  className,
  variant = "epic",
  size = "default",
  children,
  onClick,
  disabled = false,
  type = "button",
  ...props
}: EpicButtonProps) {
  const { isImmersiveMode, isHighPerformance } = useImmersive()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const baseStyles = cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background relative overflow-hidden",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
      "bg-transparent border border-input hover:bg-accent hover:text-accent-foreground": variant === "outline",
      "bg-transparent hover:bg-accent hover:text-accent-foreground": variant === "ghost",
      "bg-transparent underline-offset-4 hover:underline text-primary": variant === "link",
      "bg-gradient-to-r from-[#4B0082] to-[#8A2BE2] text-[#D4AF37] border border-[#D4AF37] shadow-lg hover:from-[#3B0062] hover:to-[#7A1BD2]":
        variant === "epic",
      "h-10 py-2 px-4": size === "default",
      "h-9 px-3": size === "sm",
      "h-11 px-8": size === "lg",
      "h-10 w-10": size === "icon",
      "transform hover:scale-105 active:scale-95": isImmersiveMode,
    },
    className,
  )

  // Solo pasamos las props HTML válidas al elemento button
  const buttonProps = {
    className: baseStyles,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    disabled,
    type,
  }

  return (
    <button {...buttonProps}>
      {isImmersiveMode && isHighPerformance && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-full bg-gradient-to-r from-[#4B0082]/20 to-[#8A2BE2]/20 animate-pulse"></div>
          <div className="absolute w-10 h-10 bg-[#D4AF37]/10 rounded-full animate-ping"></div>
        </div>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
