"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useImmersive } from "@/context/immersive-context"
import { cn } from "@/lib/utils"

interface ButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost" | "link" | "gold" | "fire" | "epic"
  size?: "default" | "sm" | "lg" | "xl" | "icon"
  epic?: boolean
  interactive?: boolean
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  href?: string
  target?: string
  rel?: string
  icon?: React.ReactNode
}

export function Button({
  className,
  variant = "default",
  size = "default",
  epic = false,
  interactive = false,
  children,
  onClick,
  disabled = false,
  type = "button",
  href,
  target,
  rel,
  icon,
  ...props
}: ButtonProps) {
  const { isImmersiveMode } = useImmersive()
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
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
      "bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10": variant === "outline",
      "bg-transparent hover:bg-accent hover:text-accent-foreground": variant === "ghost",
      "bg-transparent underline-offset-4 hover:underline text-primary": variant === "link",
      "bg-[#8B0000] hover:bg-[#6B0000] text-[#D4AF37] border border-[#D4AF37]/30 shadow-lg": variant === "fire",
      "bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] text-black border border-[#D4AF37] shadow-lg hover:from-[#E5C04D] hover:to-[#BFA042]":
        variant === "gold",
      "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border border-purple-700 shadow-lg hover:from-purple-700 hover:to-indigo-700":
        variant === "epic",
      "h-10 py-2 px-4": size === "default",
      "h-9 px-3": size === "sm",
      "h-11 px-8": size === "lg",
      "h-12 px-10 text-base": size === "xl",
      "h-10 w-10": size === "icon",
      "transform hover:scale-105 active:scale-95": interactive && isImmersiveMode,
      "animate-pulse": isHovered && epic && isImmersiveMode,
    },
    className,
  )

  const content = (
    <>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </>
  )

  const commonProps = {
    className: baseStyles,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    disabled,
  }

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} {...commonProps}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} {...commonProps} {...props}>
      {content}
    </button>
  )
}
