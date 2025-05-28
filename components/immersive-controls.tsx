"use client"

import { useImmersive } from "@/context/immersive-context"
import { Cpu, Sparkles } from "lucide-react"

export function ImmersiveControls() {
  const { isHighPerformance, setHighPerformance, isImmersiveMode, setImmersiveMode } = useImmersive()

  return (
    <div className="fixed bottom-4 left-4 z-50 flex space-x-2">
      <button
        onClick={() => setHighPerformance(!isHighPerformance)}
        className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
          isHighPerformance ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white" : "bg-gray-800 text-gray-400"
        }`}
        title={isHighPerformance ? "Cambiar a modo de rendimiento bajo" : "Cambiar a modo de rendimiento alto"}
      >
        <Cpu size={20} />
      </button>

      <button
        onClick={() => setImmersiveMode(!isImmersiveMode)}
        className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
          isImmersiveMode ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white" : "bg-gray-800 text-gray-400"
        }`}
        title={isImmersiveMode ? "Desactivar modo inmersivo" : "Activar modo inmersivo"}
      >
        <Sparkles size={20} />
      </button>
    </div>
  )
}
