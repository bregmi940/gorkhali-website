"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Asegurar que el componente está montado para evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  // Función para reproducir sonido al cambiar el tema
  const playToggleSound = () => {
    try {
      const audio = new Audio("/sounds/click.mp3")
      audio.volume = 0.3
      audio.play().catch((err) => console.error("Error playing sound:", err))
    } catch (error) {
      console.error("Error with audio:", error)
    }
  }

  // Mejorar la función toggleTheme para asegurar que las clases se apliquen correctamente
  const toggleTheme = () => {
    playToggleSound()
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Forzar la actualización de las clases en el documento
    if (newTheme === "light") {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    }

    // Guardar el tema en localStorage
    localStorage.setItem("theme", newTheme)
  }

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/20 flex items-center justify-center">
        <span className="sr-only">Loading theme</span>
      </div>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="h-9 w-9 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/20 flex items-center justify-center hover:scale-110 transition-transform duration-200"
      aria-label="Toggle theme"
    >
      {theme === "dark" || document.documentElement.classList.contains("dark") ? (
        <Sun className="h-5 w-5 text-[#D4AF37]" />
      ) : (
        <Moon className="h-5 w-5 text-[#D4AF37]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
