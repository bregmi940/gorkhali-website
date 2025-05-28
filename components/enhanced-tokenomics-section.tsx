"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import EpicVisualEffects from "./epic-visual-effects"
import Image from "next/image"
import { Coins, Users, Lock, Rocket, BarChart3, Globe, Shield, Zap } from "lucide-react"

interface TokenDistribution {
  name: string
  percentage: number
  color: string
  icon: React.ReactNode
  description: string
}

const tokenDistribution: TokenDistribution[] = [
  {
    name: "Comunidad",
    percentage: 40,
    color: "#4CAF50",
    icon: <Users className="h-6 w-6" />,
    description: "Distribuido a la comunidad a través de eventos, airdrops y recompensas.",
  },
  {
    name: "Desarrollo",
    percentage: 25,
    color: "#2196F3",
    icon: <Rocket className="h-6 w-6" />,
    description: "Financiación para el desarrollo continuo de la plataforma y nuevas características.",
  },
  {
    name: "Reserva",
    percentage: 15,
    color: "#FFC107",
    icon: <Lock className="h-6 w-6" />,
    description: "Reserva estratégica para estabilidad del ecosistema y oportunidades futuras.",
  },
  {
    name: "Marketing",
    percentage: 10,
    color: "#9C27B0",
    icon: <Globe className="h-6 w-6" />,
    description: "Promoción global y campañas de concienciación sobre Gorkhali.",
  },
  {
    name: "Equipo",
    percentage: 10,
    color: "#FF5722",
    icon: <Coins className="h-6 w-6" />,
    description: "Asignación para el equipo fundador y colaboradores clave.",
  },
]

interface TokenStat {
  name: string
  value: string
  icon: React.ReactNode
  description: string
}

const tokenStats: TokenStat[] = [
  {
    name: "Suministro Total",
    value: "1,000,000,000",
    icon: <BarChart3 className="h-6 w-6 text-green-500" />,
    description: "Número máximo de tokens Gorkhali que existirán.",
  },
  {
    name: "Capitalización Inicial",
    value: "$10,000,000",
    icon: <Coins className="h-6 w-6 text-yellow-500" />,
    description: "Valoración inicial del proyecto en el lanzamiento.",
  },
  {
    name: "Seguridad",
    value: "Auditoría Completa",
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    description: "Contratos auditados por firmas de seguridad líderes.",
  },
  {
    name: "Velocidad",
    value: "3,000 TPS",
    icon: <Zap className="h-6 w-6 text-purple-500" />,
    description: "Transacciones por segundo que puede procesar la red.",
  },
]

export const EnhancedTokenomicsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.9, 1, 1, 0.9])

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio("/sounds/reveal.mp3")

    // Draw the pie chart
    const drawPieChart = () => {
      if (!chartRef.current) return

      const canvas = document.createElement("canvas")
      const size = Math.min(window.innerWidth * 0.8, 500)
      canvas.width = size
      canvas.height = size

      chartRef.current.innerHTML = ""
      chartRef.current.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      let startAngle = 0
      const centerX = size / 2
      const centerY = size / 2
      const radius = (size / 2) * 0.8

      // Draw segments
      tokenDistribution.forEach((segment, index) => {
        const segmentAngle = (segment.percentage / 100) * Math.PI * 2
        const endAngle = startAngle + segmentAngle

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle)
        ctx.closePath()

        // Fill with gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
        gradient.addColorStop(0, segment.color + "99")
        gradient.addColorStop(1, segment.color)

        ctx.fillStyle = gradient
        ctx.fill()

        // Add highlight effect for hovered segment
        if (hoveredSegment === index) {
          ctx.save()
          ctx.shadowColor = segment.color
          ctx.shadowBlur = 20
          ctx.lineWidth = 4
          ctx.strokeStyle = "#ffffff"
          ctx.stroke()
          ctx.restore()
        }

        // Add segment label
        const labelAngle = startAngle + segmentAngle / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + Math.cos(labelAngle) * labelRadius
        const labelY = centerY + Math.sin(labelAngle) * labelRadius

        ctx.font = "bold 14px Arial"
        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${segment.percentage}%`, labelX, labelY)

        startAngle = endAngle
      })

      // Add center circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fill()

      // Add Gorkhali logo in center
      const img = new Image()
      img.src = "/images/gorkhali-coin.png"
      img.onload = () => {
        const logoSize = radius * 0.6
        ctx.drawImage(img, centerX - logoSize / 2, centerY - logoSize / 2, logoSize, logoSize)
      }
      img.onerror = (e) => console.error("Image load error:", e)

      // Add event listeners for hover effects
      canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        // Calculate angle from center to mouse position
        const angle = Math.atan2(y - centerY, x - centerX)
        const mouseAngle = angle < 0 ? angle + Math.PI * 2 : angle

        // Calculate distance from center
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))

        // Only detect hover if within the chart radius
        if (distance < radius && distance > radius * 0.4) {
          let currentAngle = 0
          let found = false

          for (let i = 0; i < tokenDistribution.length; i++) {
            const segmentAngle = (tokenDistribution[i].percentage / 100) * Math.PI * 2
            currentAngle += segmentAngle

            if (mouseAngle < currentAngle) {
              if (hoveredSegment !== i) {
                setHoveredSegment(i)
                // Play hover sound
                if (audioRef.current && !isPlaying) {
                  setIsPlaying(true)
                  audioRef.current.volume = 0.1
                  audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
                  audioRef.current.onended = () => setIsPlaying(false)
                }
              }
              found = true
              break
            }
          }

          if (!found && hoveredSegment !== null) {
            setHoveredSegment(null)
          }
        } else if (hoveredSegment !== null) {
          setHoveredSegment(null)
        }
      })

      canvas.addEventListener("mouseleave", () => {
        setHoveredSegment(null)
      })
    }

    drawPieChart()
    window.addEventListener("resize", drawPieChart)

    return () => {
      window.removeEventListener("resize", drawPieChart)
    }
  }, [hoveredSegment, isPlaying])

  return (
    <motion.div ref={containerRef} style={{ opacity, scale }} className="relative min-h-screen py-20 overflow-hidden">
      <EpicVisualEffects type="particles" intensity="medium" theme="tokenomics">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-center mb-16 tokenomics-glow"
          >
            Tokenomics Gorkhali
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <EpicVisualEffects type="glow" intensity="high" theme="tokenomics">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div ref={chartRef} className="w-full aspect-square max-w-[500px] mx-auto"></div>
              </motion.div>
            </EpicVisualEffects>

            <EpicVisualEffects type="reveal" intensity="medium" theme="tokenomics">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6 tokenomics-glow">Distribución de Tokens</h2>

                {tokenDistribution.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg tokenomics-border flex items-center ${hoveredSegment === index ? "scale-105 bg-black/40" : "bg-black/20"} transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{ backgroundColor: item.color + "33" }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <span className="text-xl font-bold">{item.percentage}%</span>
                      </div>
                      <p className="text-sm opacity-80">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </EpicVisualEffects>
          </div>

          <EpicVisualEffects type="wave" intensity="medium" theme="tokenomics">
            <motion.div
              className="mt-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center tokenomics-glow">Estadísticas del Token</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tokenStats.map((stat, index) => (
                  <EpicVisualEffects key={index} type="earth" intensity="medium" theme="tokenomics">
                    <motion.div
                      className="p-6 rounded-lg tokenomics-border bg-black/30 backdrop-blur-sm text-center"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                        {stat.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{stat.name}</h3>
                      <p className="text-2xl font-bold mb-2 tokenomics-glow">{stat.value}</p>
                      <p className="text-sm opacity-80">{stat.description}</p>
                    </motion.div>
                  </EpicVisualEffects>
                ))}
              </div>
            </motion.div>
          </EpicVisualEffects>

          <EpicVisualEffects type="fire" intensity="medium" theme="tokenomics">
            <motion.div
              className="mt-20 p-8 rounded-lg tokenomics-border text-center bg-black/30 backdrop-blur-sm"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4 tokenomics-glow">Economía Sostenible</h2>
              <p className="text-xl">
                La tokenomics de Gorkhali está diseñada para crear un ecosistema sostenible y equilibrado. Con un
                enfoque en la comunidad y el desarrollo a largo plazo, nuestro modelo económico garantiza la estabilidad
                y el crecimiento continuo.
              </p>
            </motion.div>
          </EpicVisualEffects>
        </div>
      </EpicVisualEffects>
    </motion.div>
  )
}

export default EnhancedTokenomicsSection
