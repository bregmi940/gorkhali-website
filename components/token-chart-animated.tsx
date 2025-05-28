"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

Chart.register(ArcElement, Tooltip, Legend)

interface TokenChartAnimatedProps {
  className?: string
}

export function TokenChartAnimated({ className = "" }: TokenChartAnimatedProps) {
  const chartRef = useRef<any>(null)
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [animationComplete, setAnimationComplete] = useState(false)

  // Initial data with zero values for animation
  const [chartData, setChartData] = useState({
    labels: [
      "Community Treasury",
      "Staking Rewards",
      "Team & Development",
      "Marketing & Partnerships",
      "Liquidity Pool",
      "Airdrops & Community Rewards",
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "#D4AF37", // Gold
          "#8B0000", // Imperial Red
          "#4B5320", // Military Green
          "#A52A2A", // Brown
          "#6B0000", // Dark Red
          "#B8860B", // Dark Gold
        ],
        borderColor: ["#121212", "#121212", "#121212", "#121212", "#121212", "#121212"],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  })

  // Final data values
  const finalData = [30, 25, 15, 15, 10, 5]

  useEffect(() => {
    if (inView && !animationComplete) {
      controls.start("visible")

      // Animate chart data
      const animateChart = async () => {
        // Delay to sync with other animations
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Animate each segment
        for (let i = 0; i <= 100; i++) {
          const progress = i / 100
          const currentData = finalData.map((value) => value * progress)

          setChartData((prevData) => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: currentData,
              },
            ],
          }))

          await new Promise((resolve) => setTimeout(resolve, 10))
        }

        setAnimationComplete(true)
      }

      animateChart()
    }
  }, [inView, controls, animationComplete])

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || ""
            const value = context.formattedValue || ""
            return `${label}: ${value}%`
          },
        },
        titleFont: {
          size: 14,
          family: "Inter, sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "Inter, sans-serif",
        },
        backgroundColor: "#1A1A1A",
        titleColor: "#D4AF37",
        bodyColor: "#FFFFFF",
        borderColor: "#D4AF37",
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
      },
    },
    cutout: "65%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8 },
        },
      }}
    >
      <Doughnut data={chartData} options={options as any} ref={chartRef} />
      <motion.div
        className="absolute inset-0 flex items-center justify-center flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h3 className="text-[#D4AF37] text-xl font-bold">GKR</h3>
        <p className="text-white dark:text-white light:text-[#121212] text-sm">Distribution</p>
      </motion.div>
    </motion.div>
  )
}
