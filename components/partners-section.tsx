"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function PartnersSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const partners = [
    {
      name: "World",
      logo: "/images/partners/worldcoin-logo.png",
      url: "https://worldcoin.org/",
    },
    {
      name: "PUF",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GifYAmzXEAEnkyp-removebg-preview-gcbmpkYYEmBsJ3Uwiy4If8nuMWJOB4.png",
      url: "https://x.com/puflaunch",
    },
    {
      name: "DexScreener",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dexscreener-removebg-preview-Iyknpeh0Tu6bQoXDBb3LlqDX09zN1F.png",
      url: "https://dexscreener.com/",
    },
    {
      name: "Uniswap",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uniswap-uni-logo-png_seeklogo-444502-removebg-preview-5QU9dtR7lbsCblcVutEqsBRYL9CFG7.png",
      url: "https://uniswap.org/",
    },
  ]

  return (
    <section className="py-20 px-4 md:px-12 relative overflow-hidden border-t border-b border-[#D4AF37]/20">
      {/* Fondo con patrón sutil */}
      <div className="absolute inset-0 circuit-bg opacity-10"></div>

      {/* Efecto de luz superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent blur-sm"></div>

      {/* Efecto de luz inferior */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent blur-sm"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5F5DC] to-[#D4AF37] animate-shimmer">
              Our Partners
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Strategic alliances forging the path to digital unification
          </motion.p>
        </div>

        {/* LOGOS MUCHO MÁS GRANDES CON MEJOR ILUMINACIÓN */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-center">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              {/* CONTENEDOR GRANDE CON FONDO BLANCO BRILLANTE */}
              <div className="bg-white rounded-xl p-6 w-full h-40 flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                {/* EFECTO DE LUZ ADICIONAL */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-100"></div>

                {/* LOGO MUCHO MÁS GRANDE */}
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  className="relative z-10 max-h-full max-w-[80%] object-contain transform transition-transform duration-300 group-hover:scale-110"
                />

                {/* RESPLANDOR ADICIONAL */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/30 pointer-events-none"></div>
              </div>

              {/* NOMBRE DEL PARTNER */}
              <div className="mt-4 text-center">
                <span className="text-lg font-medium text-[#D4AF37]">{partner.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
