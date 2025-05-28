"use client"
import { motion } from "framer-motion"

interface PhaseContentProps {
  title: string
  subtitle: string
  sections: {
    id: string
    title: string
    icon: string
    content: string[]
  }[]
}

export function PhaseContent({ title, subtitle, sections }: PhaseContentProps) {
  return (
    <motion.div
      className="bg-[#121212]/80 dark:bg-[#121212]/80 light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] mb-2">{title}</h2>
      <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 italic mb-8 border-b border-[#D4AF37]/20 pb-4">
        {subtitle}
      </p>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="mb-6">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 bg-[#8B0000] rounded-full flex items-center justify-center mr-3">
                <span className="text-[#D4AF37]">{section.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-[#D4AF37]">{section.title}</h3>
            </div>
            <div className="pl-11">
              {section.content.map((paragraph, idx) => (
                <p key={idx} className="text-gray-200 dark:text-gray-200 light:text-gray-700 mb-3">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-[#D4AF37]/20">
        <h4 className="text-xl font-serif font-bold text-[#D4AF37] mb-2">Vision</h4>
        <p className="text-gray-200 dark:text-gray-200 light:text-gray-700 italic">
          From a single token to a digital kingdom. From a forgotten crown to a future led by many. This is the Gorkhali
          Empire. Unstoppable. Unifying. Eternal.
        </p>
      </div>
    </motion.div>
  )
}
