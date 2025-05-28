"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      {/* Botón de menú elegante */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-[#D4AF37] hover:text-[#FFD700] transition-colors duration-300"
        aria-label="Abrir menú"
      >
        <Menu size={24} />
      </button>

      {/* Menú desplegable elegante */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999]" onClick={() => setIsOpen(false)}>
          {/* Panel del menú - NUEVO COLOR DE FONDO */}
          <div
            className="absolute top-0 right-0 h-full w-64 bg-[#0A0A0A] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera del menú */}
            <div className="flex justify-between items-center p-4 border-b border-[#D4AF37]/30">
              <div className="flex items-center">
                <Image src="/images/gorkhali-coin.png" alt="Gorkhali Coin" width={24} height={24} className="mr-2" />
                <span className="text-[#FFD700] font-medium">Menu</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#FFD700] hover:text-white"
                aria-label="Cerrar menú"
              >
                <X size={20} />
              </button>
            </div>

            {/* Enlaces de navegación - COLORES MEJORADOS */}
            <nav className="py-2">
              {[
                { name: "Home", href: "/" },
                { name: "History", href: "/history" },
                { name: "Roadmap", href: "/roadmap" },
                { name: "Tokenomics", href: "/tokenomics" },
                { name: "Community", href: "/community" },
                { name: "GRK in Worldapp", href: "/worldapp" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-sm font-medium ${
                    pathname === item.href
                      ? "bg-[#D4AF37] text-black border-l-2 border-white"
                      : "text-[#FFD700] hover:bg-[#1A1A1A]"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Separador */}
            <div className="mx-4 my-2 border-t border-[#D4AF37]/30"></div>

            {/* Botones de acción - COLORES MÁS BRILLANTES */}
            <div className="p-4 space-y-2">
              <a
                href="https://t.me/+zv4TWbi36ehjZjg0"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#B00000] text-white px-3 py-2 rounded text-sm font-medium text-center"
              >
                Join Army
              </a>
              <a
                href="https://world.org/es-la/ecosystem/app_15daccf5b7d4ec9b7dbba044a8fdeab5"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#6A0DAD] text-white px-3 py-2 rounded text-sm font-medium text-center"
              >
                Buy GRK
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
