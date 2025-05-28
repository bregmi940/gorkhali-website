"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import EpicVisualEffects from "./epic-visual-effects"
import Image from "next/image"
import { Users, MessageCircle, Globe, Award, Heart } from "lucide-react"

interface CommunityMember {
  name: string
  role: string
  image: string
  contribution: string
}

const communityMembers: CommunityMember[] = [
  {
    name: "Alex Warrior",
    role: "Embajador Principal",
    image: "/diverse-group.png",
    contribution: "Líder de la comunidad desde 2023, ha organizado más de 50 eventos virtuales.",
  },
  {
    name: "Maria Blockchain",
    role: "Desarrolladora Comunitaria",
    image: "/diverse-woman-portrait.png",
    contribution: "Contribuyó con 20+ mejoras al código y creó herramientas para la comunidad.",
  },
  {
    name: "John Crypto",
    role: "Educador",
    image: "/thoughtful-man.png",
    contribution: "Ha creado más de 100 tutoriales y recursos educativos sobre Gorkhali.",
  },
  {
    name: "Sophia DeFi",
    role: "Moderadora",
    image: "/woman-profile.png",
    contribution: "Gestiona los canales de la comunidad y organiza eventos semanales.",
  },
]

interface CommunityEvent {
  title: string
  date: string
  description: string
  location: string
  image: string
}

const upcomingEvents: CommunityEvent[] = [
  {
    title: "Gorkhali Global Summit",
    date: "15 Junio 2025",
    description: "Conferencia anual que reúne a entusiastas de Gorkhali de todo el mundo.",
    location: "Virtual & Presencial",
    image: "/business-conference.png",
  },
  {
    title: "Hackathon Gorkhali",
    date: "22-24 Julio 2025",
    description: "Construye aplicaciones innovadoras en el ecosistema Gorkhali y gana premios.",
    location: "Virtual",
    image: "/hackathon-event.png",
  },
  {
    title: "AMA con Fundadores",
    date: "5 Agosto 2025",
    description: "Sesión de preguntas y respuestas con el equipo fundador de Gorkhali.",
    location: "Discord & Telegram",
    image: "/ama-session.png",
  },
]

export const EnhancedCommunitySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, 50])

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio("/sounds/hover.mp3")

    // Auto-rotate featured members
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % communityMembers.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleMemberClick = (index: number) => {
    setActiveIndex(index)

    // Play sound effect
    if (audioRef.current && !isPlaying) {
      setIsPlaying(true)
      audioRef.current.volume = 0.2
      audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
      audioRef.current.onended = () => setIsPlaying(false)
    }
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, y }}
      className="relative min-h-screen py-20 overflow-hidden bg-black"
    >
      <EpicVisualEffects type="particles" intensity="medium" theme="community">
        <div className="container mx-auto px-4">
          {/* Título en dos líneas explícitas */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h1 className="text-5xl font-bold" style={{ color: "#d4af37", lineHeight: "1.2" }}>
                Join Our
              </h1>
              <h1 className="text-5xl font-bold" style={{ color: "#d4af37", lineHeight: "1.2" }}>
                Community
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
            <EpicVisualEffects type="glow" intensity="high" theme="community">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div
                  className="relative h-[400px] w-full rounded-lg overflow-hidden"
                  style={{ border: "2px solid #d4af37", boxShadow: "0 0 10px #8b0000" }}
                >
                  <Image
                    src="/vibrant-community-gathering.png"
                    alt="Comunidad Gorkhali"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center mb-4">
                      <Users className="h-8 w-8 text-[#d4af37]/80 mr-3" />
                      <h2 className="text-3xl font-bold" style={{ color: "#d4af37" }}>
                        +50,000 Miembros
                      </h2>
                    </div>
                    <p className="text-lg">
                      Una comunidad global unida por la visión de Gorkhali, construyendo juntos el futuro de las
                      finanzas descentralizadas.
                    </p>
                  </div>
                </div>
              </motion.div>
            </EpicVisualEffects>

            <EpicVisualEffects type="reveal" intensity="medium" theme="community">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6" style={{ color: "#d4af37" }}>
                  Únete a la Revolución
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      icon: <MessageCircle className="h-6 w-6 text-[#d4af37]/80" />,
                      title: "Canales Activos",
                      description: "Telegram, Discord, Twitter y más - mantente conectado con la comunidad Gorkhali.",
                    },
                    {
                      icon: <Globe className="h-6 w-6 text-[#d4af37]/80" />,
                      title: "Comunidad Global",
                      description: "Miembros de más de 50 países, unidos por una visión común.",
                    },
                    {
                      icon: <Award className="h-6 w-6 text-[#d4af37]/80" />,
                      title: "Programa de Recompensas",
                      description: "Contribuye y gana tokens GKR por tu participación activa.",
                    },
                    {
                      icon: <Heart className="h-6 w-6 text-[#d4af37]/80" />,
                      title: "Gobernanza Comunitaria",
                      description: "Tu voz importa - vota en decisiones clave que afectan al ecosistema.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-lg bg-black backdrop-blur-sm flex items-start"
                      style={{ border: "1px solid #d4af37" }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#8b0000]/20 flex items-center justify-center mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1 text-[#d4af37]">{item.title}</h3>
                        <p className="text-sm text-white">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </EpicVisualEffects>
          </div>

          <EpicVisualEffects type="wave" intensity="medium" theme="community">
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "#d4af37" }}>
                Miembros Destacados
              </h2>

              <div className="relative">
                <div className="flex justify-center mb-8">
                  <motion.div
                    className="relative w-[300px] h-[300px] rounded-lg overflow-hidden"
                    style={{ border: "2px solid #d4af37", boxShadow: "0 0 10px #8b0000" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    key={activeIndex}
                  >
                    <Image
                      src={communityMembers[activeIndex].image || "/placeholder.svg"}
                      alt={communityMembers[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold" style={{ color: "#d4af37" }}>
                        {communityMembers[activeIndex].name}
                      </h3>
                      <p className="text-[#d4af37] mb-2">{communityMembers[activeIndex].role}</p>
                      <p className="text-sm text-white">{communityMembers[activeIndex].contribution}</p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex justify-center gap-4">
                  {communityMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      className={`w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                        activeIndex === index ? "border-[#d4af37] scale-110" : "border-transparent opacity-70"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleMemberClick(index)}
                    >
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </EpicVisualEffects>

          <EpicVisualEffects type="fire" intensity="medium" theme="community">
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "#d4af37" }}>
                Próximos Eventos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg overflow-hidden bg-black"
                    style={{ border: "1px solid #d4af37" }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative h-[150px]">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-[#d4af37] mb-1">{event.date}</div>
                      <h3 className="text-xl font-bold mb-2 text-[#d4af37]">{event.title}</h3>
                      <p className="text-sm mb-3 text-white">{event.description}</p>
                      <div className="text-xs bg-[#8b0000]/30 text-[#d4af37] inline-block px-3 py-1 rounded-full">
                        {event.location}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </EpicVisualEffects>

          <EpicVisualEffects type="glow" intensity="medium" theme="community">
            <motion.div
              className="p-8 rounded-lg text-center bg-black"
              style={{ border: "1px solid #d4af37" }}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#d4af37" }}>
                Únete Hoy
              </h2>
              <p className="text-xl mb-6 text-white">
                Sé parte de una comunidad vibrante y en crecimiento. Juntos, estamos construyendo el futuro de las
                finanzas descentralizadas con el espíritu Gorkhali.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://t.me/+zv4TWbi36ehjZjg0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#8b0000] hover:bg-[#8b0000]/80 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                >
                  Unirse a Telegram
                </a>
                <a
                  href="#"
                  className="bg-[#8b0000] hover:bg-[#8b0000]/80 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 border border-[#d4af37]"
                >
                  Unirse a Discord
                </a>
                <a
                  href="#"
                  className="bg-[#8b0000] hover:bg-[#8b0000]/80 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 border border-[#d4af37]"
                >
                  Seguir en Twitter
                </a>
              </div>
            </motion.div>
          </EpicVisualEffects>
        </div>
      </EpicVisualEffects>
    </motion.div>
  )
}

export default EnhancedCommunitySection
