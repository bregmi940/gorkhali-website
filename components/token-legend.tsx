"use client"

import { motion } from "framer-motion"

interface TokenLegendProps {
  items: {
    color: string
    label: string
    percentage: number
  }[]
}

export function TokenLegend({ items }: TokenLegendProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div
            className="h-4 w-4 rounded-sm mr-3"
            style={{
              backgroundColor: item.color,
            }}
          ></div>
          <div className="flex justify-between items-center w-full">
            <span className="text-gray-300">{item.label}</span>
            <span className="text-[#D4AF37] font-bold">{item.percentage}%</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
