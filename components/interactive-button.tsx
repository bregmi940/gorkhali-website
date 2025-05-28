"use client"

import { Button } from "@/components/button"
import type React from "react"

interface InteractiveButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline" | "ghost" | "link" | "epic"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function InteractiveButton({
  children,
  onClick,
  className,
  variant = "default",
  size = "default",
  disabled = false,
  type = "button",
  ...rest
}: InteractiveButtonProps) {
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      isInteractive={true}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </Button>
  )
}
