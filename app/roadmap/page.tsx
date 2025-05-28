"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { useEpicEffects } from "@/components/epic-effects-provider"
import ParticleBackground from "@/components/particle-background"
import { DetailedRoadmap } from "@/components/detailed-roadmap"
import { VisualTimeline } from "@/components/visual-timeline"

// Timeline data
const timelinePhases = [
  {
    id: "phase1",
    phase: "Phase 1",
    title: "The Rise of the Banner",
    quarter: "Q1 2025",
    icon: "🛡️",
    subtitle: "Before a battle is fought, the flag must rise.",
  },
  {
    id: "phase2",
    phase: "Phase 2",
    title: "The March Begins",
    quarter: "Q2 2025",
    icon: "🚀",
    subtitle: "With the banner raised, we now enter the second chapter — action, reward, and expansion.",
  },
  {
    id: "phase3",
    phase: "Phase 3",
    title: "The Rise of Legacy",
    quarter: "Q3 2025",
    icon: "🧬",
    subtitle: "The army stands strong. The tokens are in motion. The King's vision moves forward.",
  },
  {
    id: "phase4",
    phase: "Phase 4",
    title: "The Digital Empire",
    quarter: "Q4 2025",
    icon: "👑",
    subtitle: "With allies made and warriors empowered, we ascend into a new era.",
  },
  {
    id: "phase5",
    phase: "Phase 5",
    title: "Immortality of the Crown",
    quarter: "Q1 2026",
    icon: "🔥",
    subtitle: "The King's legacy is fulfilled. GKR thrives without a throne.",
  },
]

export default function RoadmapPage() {
  const { setEffectTheme } = useEpicEffects()
  const router = useRouter()
  const [activePhase, setActivePhase] = useState("phase1")

  // Set theme when component mounts
  useEffect(() => {
    if (setEffectTheme) {
      setEffectTheme("roadmap")
    }
  }, [setEffectTheme])

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A0F00] to-[#0A0A0A] text-white">
      <div className="absolute inset-0 bg-[url('/images/subtle-pattern.png')] opacity-10 z-0"></div>
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#8B0000]/20 via-transparent to-transparent z-0"></div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#D4AF37] relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          The Gorkhali Battle Plan
        </h1>

        <h2 className="text-2xl md:text-3xl font-serif italic mb-12 text-[#D4AF37]/90 max-w-4xl relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          From raising the banner to establishing a digital empire, the path of GKR is clear. Follow the King's vision
          as it unfolds across time.
        </h2>

        <div className="relative w-full max-w-4xl h-[400px] mb-16 overflow-hidden rounded-lg border-2 border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.2)] z-10">
          <Image
            src="/images/gorkhali-battle-map.png"
            alt="Gorkhali Battle Plan Strategic Map"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60 pointer-events-none"></div>
        </div>

        <h3 className="text-2xl md:text-3xl font-serif italic mb-8 text-[#D4AF37]/80 relative z-10">
          "A journey of a thousand victories begins with a single battle plan."
        </h3>

        <button
          onClick={() => router.push("/")}
          className="bg-[#8B0000] hover:bg-[#6B0000] text-[#D4AF37] font-bold py-4 px-8 text-lg rounded-md transition-all duration-300 inline-block border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(139,0,0,0.5)] relative z-10"
        >
          Back to Kingdom
        </button>
      </section>

      {/* Visual Timeline Section */}
      <section id="roadmap" className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] mb-4 text-center">
          The Path to Empire
        </h2>

        <p className="text-xl md:text-2xl font-serif italic mb-16 text-[#D4AF37]/80 text-center max-w-4xl mx-auto">
          The Gorkhali roadmap outlines our strategic journey from community building to digital sovereignty.
        </p>

        {/* New Visual Timeline Component */}
        <div className="bg-black/40 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl p-6 md:p-8 shadow-xl mb-16">
          <VisualTimeline phases={timelinePhases} activePhase={activePhase} setActivePhase={setActivePhase} />
        </div>
      </section>

      {/* Detailed Roadmap Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-16 bg-gradient-to-b from-transparent to-[#0A0A0A]/80">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] mb-4 text-center">
          Detailed Battle Strategy
        </h2>

        <p className="text-xl md:text-2xl font-serif italic mb-16 text-[#D4AF37]/80 text-center max-w-4xl mx-auto">
          Explore the comprehensive details of each phase in our roadmap.
        </p>

        <div className="bg-black/40 backdrop-blur-sm border border-[#D4AF37]/20 rounded-xl p-6 md:p-8 shadow-xl mb-16">
          <DetailedRoadmap />
        </div>
      </section>

      {/* King Illustration */}
      <section className="relative z-10 flex justify-center my-20">
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src="/images/king-illustration.png"
            alt="King Prithvi Narayan Shah Illustration"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-radial from-[#8B0000]/20 via-transparent to-transparent mix-blend-overlay"></div>
        </div>
      </section>

      {/* Join Button */}
      <section className="relative z-10 text-center py-16">
        <a
          href="https://t.me/+zv4TWbi36ehjZjg0"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#8B0000] hover:bg-[#6B0000] text-[#D4AF37] font-bold py-4 px-8 text-lg rounded-md transition-all duration-300 inline-block border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(139,0,0,0.5)]"
        >
          Join the Gorkhali Army
        </a>
      </section>

      <Footer />
    </main>
  )
}
