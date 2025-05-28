"use client"

import { useEffect, useRef } from "react"
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

Chart.register(ArcElement, Tooltip, Legend)

interface TokenDistributionChartProps {
  className?: string
}

export function TokenDistributionChart({ className }: TokenDistributionChartProps) {
  const chartRef = useRef<any>(null)

  const data = {
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
        data: [30, 25, 15, 15, 10, 5],
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
  }

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

  useEffect(() => {
    // Add any chart customization here if needed
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <Doughnut data={data} options={options as any} ref={chartRef} />
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <h3 className="text-[#D4AF37] text-xl font-bold">GKR</h3>
        <p className="text-white text-sm">Distribution</p>
      </div>
    </div>
  )
}
