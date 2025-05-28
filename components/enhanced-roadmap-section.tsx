"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import EpicVisualEffects from "./epic-visual-effects"
import { Play, Check, Clock, ArrowRight } from "lucide-react"

interface RoadmapPhase {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "upcoming"
  items: string[]
  year: string
}

const roadmapData: RoadmapPhase[] = [
  {
    id: "phase1",
    title: "Fase 1: Fundación",
    description: "Establecimiento de la infraestructura básica y el ecosistema inicial.",
    status: "completed",
    items: [
      "Lanzamiento del sitio web",
      "Creación del token Gorkhali",
      "Establecimiento de la comunidad inicial",
      "Auditoría de seguridad",
    ],
    year: "2023",
  },
  {
    id: "phase2",
    title: "Fase 2: Expansión",
    description: "Crecimiento del ecosistema y ampliación de funcionalidades.",
    status: "in-progress",
    items: [
      "Lanzamiento de la plataforma de intercambio",
      "Integración con DeFi",
      "Programa de embajadores",
      "Expansión internacional",
    ],
    year: "2024",
  },
  {
    id: "phase3",
    title: "Fase 3: Innovación",
    description: "Desarrollo de tecnologías avanzadas y casos de uso innovadores.",
    status: "upcoming",
    items: [
      "Lanzamiento de la cadena Gorkhali",
      "Implementación de soluciones de capa 2",
      "Integración con metaverso",
      "Desarrollo de aplicaciones descentralizadas",
    ],
    year: "2025",
  },
  {
    id: "phase4",
    title: "Fase 4: Dominio Global",
    description: "Consolidación como líder en el espacio blockchain y expansión global.",
    status: "upcoming",
    items: [
      "Integración con sistemas financieros tradicionales",
      "Desarrollo de IA descentralizada",
      "Expansión a mercados emergentes",
      "Establecimiento de fundación Gorkhali",
    ],
    year: "2026",
  },
]

export const EnhancedRoadmapSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePhase, setActivePhase] = useState(0)
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
    audioRef.current = new Audio("/sounds/click.mp3")

    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const containerTop = container.getBoundingClientRect().top
      const containerHeight = container.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate which phase is in view
      const scrollPosition = (windowHeight - containerTop) / containerHeight
      const newPhase = Math.min(roadmapData.length - 1, Math.max(0, Math.floor(scrollPosition * roadmapData.length)))

      if (newPhase !== activePhase) {
        setActivePhase(newPhase)

        // Play sound effect when changing phases
        if (audioRef.current && !isPlaying) {
          setIsPlaying(true)
          audioRef.current.volume = 0.2
          audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
          audioRef.current.onended = () => setIsPlaying(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activePhase, isPlaying])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="text-green-500" />
      case "in-progress":
        return <Play className="text-blue-500" />
      case "upcoming":
        return <Clock className="text-gray-500" />
      default:
        return null
    }
  }

  return (
    <motion.div ref={containerRef} style={{ opacity, y }} className="relative min-h-screen py-20 overflow-hidden">
      <EpicVisualEffects type="particles" intensity="medium" theme="roadmap">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-center mb-16 roadmap-glow"
          >
            Roadmap Gorkhali
          </motion.h1>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500/30 rounded-full"></div>

            {roadmapData.map((phase, index) => (
              <EpicVisualEffects
                key={phase.id}
                type={index % 2 === 0 ? "reveal" : "glow"}
                intensity={activePhase === index ? "high" : "low"}
                theme="roadmap"
              >
                <motion.div
                  className={`relative mb-20 ${index % 2 === 0 ? "md:ml-auto md:mr-[50%]" : "md:mr-auto md:ml-[50%]"} md:w-[45%] transition-all duration-500 ${activePhase === index ? "scale-105 z-10" : "scale-100 opacity-80"}`}
                  initial={{
                    x: index % 2 === 0 ? -100 : 100,
                    opacity: 0,
                  }}
                  whileInView={{
                    x: 0,
                    opacity: 1,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.8,
                  }}
                >
                  {/* Timeline dot */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:left-auto md:right-0 md:translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center z-10">
                    {getStatusIcon(phase.status)}
                  </div>

                  {/* Year badge */}
                  <div className="absolute top-0 right-full mr-4 md:left-full md:right-auto md:mr-0 md:ml-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {phase.year}
                  </div>

                  <div className="p-6 rounded-lg roadmap-border bg-black/30 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-2 roadmap-glow flex items-center">{phase.title}</h3>
                    <p className="text-lg mb-4">{phase.description}</p>

                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * itemIndex + 0.3 }}
                        >
                          <ArrowRight className="mr-2 text-blue-400 h-4 w-4" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div
                      className={`mt-4 text-sm font-semibold rounded-full px-3 py-1 inline-block
                      ${
                        phase.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : phase.status === "in-progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {phase.status === "completed"
                        ? "Completado"
                        : phase.status === "in-progress"
                          ? "En Progreso"
                          : "Próximamente"}
                    </div>
                  </div>
                </motion.div>
              </EpicVisualEffects>
            ))}
          </div>

          <EpicVisualEffects type="wave" intensity="medium" theme="roadmap">
            <motion.div
              className="mt-20 p-8 rounded-lg roadmap-border text-center bg-black/30 backdrop-blur-sm"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4 roadmap-glow">Visión de Futuro</h2>
              <p className="text-xl">
                Nuestro roadmap es un testimonio de nuestro compromiso con la innovación y el crecimiento. Cada fase nos
                acerca más a nuestra visión de un ecosistema Gorkhali global y descentralizado. Únete a nosotros en este
                viaje épico hacia el futuro.
              </p>
            </motion.div>
          </EpicVisualEffects>
        </div>
      </EpicVisualEffects>
    </motion.div>
  )
}

export default EnhancedRoadmapSection
