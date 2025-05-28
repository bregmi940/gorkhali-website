"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

// Componente de fallback que simula una moneda 3D con CSS
function CoinFallback({ className = "", height = 300, autoRotate = true }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`relative rounded-lg overflow-hidden bg-[#1A1A1A]/30 ${className}`}
      style={{ height }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-[200px] h-[200px] rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg ${
            autoRotate ? "animate-spin-slow" : ""
          }`}
          style={{
            boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
            animation: autoRotate ? "spin 8s linear infinite" : "none",
          }}
        >
          <div className="w-[180px] h-[180px] rounded-full bg-[#8B0000] flex items-center justify-center text-[#D4AF37] font-bold text-3xl">
            GKR
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 text-xs text-[#D4AF37]/60">Interactive 3D Model</div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </motion.div>
  )
}

export function Coin3D({ className = "", height = 300, autoRotate = true }) {
  const [isClient, setIsClient] = useState(false)
  const [isThreejsSupported, setIsThreejsSupported] = useState(true)
  const [ThreeComponents, setThreeComponents] = useState<any>(null)

  // Verificar si estamos en el cliente y si Three.js es compatible
  useEffect(() => {
    setIsClient(true)

    // Intentar cargar dinámicamente los componentes de Three.js
    const loadThreeComponents = async () => {
      try {
        // Importaciones dinámicas para evitar errores en SSR
        const [{ Canvas, useFrame }, { Environment, PresentationControls }] = await Promise.all([
          import("@react-three/fiber"),
          import("@react-three/drei"),
        ])

        setThreeComponents({ Canvas, useFrame, Environment, PresentationControls })
      } catch (error) {
        console.warn("Could not load Three.js components:", error)
        setIsThreejsSupported(false)
      }
    }

    loadThreeComponents()
  }, [])

  // Si no estamos en el cliente o Three.js no es compatible, mostrar fallback
  if (!isClient || !isThreejsSupported || !ThreeComponents) {
    return <CoinFallback className={className} height={height} autoRotate={autoRotate} />
  }

  // Si Three.js está disponible, renderizar el componente real
  const { Canvas, useFrame, Environment, PresentationControls } = ThreeComponents

  // Definir el modelo 3D dentro de este scope para acceder a los componentes importados
  function CoinModel({ autoRotate = true }) {
    const modelRef = useRef<any>()

    useFrame((state, delta) => {
      if (autoRotate && modelRef.current) {
        modelRef.current.rotation.y += delta * 0.5
      }
    })

    return (
      <group ref={modelRef}>
        {/* Simulación de una moneda */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[2, 2, 0.2, 64]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Detalles de la moneda */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 0.01, 64]} />
          <meshStandardMaterial color="#8B0000" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Texto GKR */}
        <mesh position={[0, 0.12, 0]}>
          <torusGeometry args={[0.8, 0.2, 16, 32]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.1} />
        </mesh>
      </group>
    )
  }

  function CoinScene({ autoRotate = true }) {
    return (
      <>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <CoinModel autoRotate={autoRotate} />
          <Environment preset="city" />
        </PresentationControls>
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`relative rounded-lg overflow-hidden ${className}`}
      style={{ height }}
    >
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }}>
        <CoinScene autoRotate={autoRotate} />
      </Canvas>
      <div className="absolute bottom-2 right-2 text-xs text-[#D4AF37]/60">Interactive 3D Model</div>
    </motion.div>
  )
}
