"use client"

import { useEffect, useState } from "react"
import { useEpicEffects } from "@/components/epic-effects-provider"
import AnimatedHeading from "@/components/animated-heading"
import AnimatedButton from "@/components/animated-button"
import ParticleBackground from "@/components/particle-background"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"

export default function HistoryPage() {
  const { setEffectTheme } = useEpicEffects()
  const router = useRouter()
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setEffectTheme("history")
  }, [setEffectTheme])

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("History page error:", error)
      setError(new Error("An error occurred while loading the history page"))
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-3xl font-bold text-[#d4af37] mb-4">Something went wrong</h1>
          <p className="text-white mb-6">We're having trouble loading the history section. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#8b0000] hover:bg-[#8b0000]/80 text-white px-6 py-2 rounded-md font-bold"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#d4af37] text-lg">Loading Gorkhali History...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <AnimatedHeading
          as="h1"
          className="text-5xl md:text-7xl font-bold mb-6 text-[#d4af37]"
          withGlow
          withSplitText
          withStagger
        >
          The History of Gorkhali
        </AnimatedHeading>

        <div className="max-w-3xl mx-auto text-xl mb-10">
          <p className="mb-6 text-white">An epic journey through time, from ancient kingdoms to the digital era.</p>
        </div>

        <div className="rounded-lg shadow-2xl mb-10 max-w-full overflow-hidden">
          <Image
            src="/images/king-with-temples.png"
            alt="Gorkhali King with temples"
            width={800}
            height={500}
            className="w-full h-auto"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <AnimatedHeading as="h2" className="text-4xl font-bold mb-12 text-center text-[#d4af37]" withUnderline>
          Historical Timeline
        </AnimatedHeading>

        <div className="space-y-20">
          {/* Era 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="relative overflow-hidden rounded-md border-2 border-[#d4af37]/50 shadow-lg">
                <Image
                  src="/ancient-king-himalayas.png"
                  alt="Gorkhali King - Ancient Era"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-md border-l-4 border-r-4 border-[#8b0000] bg-gradient-to-b from-black/40 to-black/60 p-6 shadow-lg">
                <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#d4af37]"></div>
                <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#d4af37]"></div>
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#d4af37]"></div>
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#d4af37]"></div>

                <h3 className="text-3xl font-bold mb-4 text-[#d4af37] uppercase tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  Ancient Era (1559-1768)
                </h3>
                <p className="text-lg mb-4 text-white leading-relaxed">
                  The origins of the Gorkhali kingdom date back to the 16th century, when small principalities fought
                  for control of trade routes in the Himalayan region.
                </p>
                <p className="text-lg text-white leading-relaxed">
                  Under the leadership of visionary rulers, the small kingdom began its expansion, establishing the
                  foundations of a future regional power. King Drabya Shah unified the first tribes and established the
                  dynasty that would lead the kingdom to its maximum splendor.
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>
              </div>
            </div>
          </div>

          {/* Era 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-1 md:order-1">
              <div className="relative overflow-hidden rounded-md border-l-4 border-r-4 border-[#8b0000] bg-gradient-to-b from-black/40 to-black/60 p-6 shadow-lg">
                <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#d4af37]"></div>
                <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#d4af37]"></div>
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#d4af37]"></div>
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#d4af37]"></div>

                <h3 className="text-3xl font-bold mb-4 text-[#d4af37] uppercase tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  Expansion Era (1768-1846)
                </h3>
                <p className="text-lg mb-4 text-white leading-relaxed">
                  The period of greatest territorial expansion marked the transformation of Gorkhali into an empire. Its
                  armies, known for their bravery and strategy, conquered neighboring territories under the leadership
                  of the great king Prithvi Narayan Shah.
                </p>
                <p className="text-lg text-white leading-relaxed">
                  The cultural and economic influence of Gorkhali spread throughout the region, establishing a legacy
                  that would last for centuries. Gorkhali warriors were feared and respected for their courage and skill
                  in battle, becoming living legends.
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>
              </div>
            </div>

            <div className="order-2 md:order-2">
              <div className="relative overflow-hidden rounded-md border-2 border-[#d4af37]/50 shadow-lg">
                <Image
                  src="/images/king-battle.png"
                  alt="Gorkhali Battle - Expansion Era"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Era 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="relative overflow-hidden rounded-md border-2 border-[#d4af37]/50 shadow-lg">
                <Image
                  src="/images/digital-king.png"
                  alt="Digital Gorkhali King - Modern Era"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-md border-l-4 border-r-4 border-[#8b0000] bg-gradient-to-b from-black/40 to-black/60 p-6 shadow-lg">
                <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#d4af37]"></div>
                <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#d4af37]"></div>
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#d4af37]"></div>
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#d4af37]"></div>

                <h3 className="text-3xl font-bold mb-4 text-[#d4af37] uppercase tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  Digital Era (2023-2025)
                </h3>
                <p className="text-lg mb-4 text-white leading-relaxed">
                  The legacy of Gorkhali is reborn in the blockchain era. The spirit of innovation and conquest that
                  characterized the ancient kingdom now manifests in the digital world through the Gorkhali Token
                  project.
                </p>
                <p className="text-lg text-white leading-relaxed">
                  Gorkhali Token represents the perfect fusion between the rich history of the past and the infinite
                  possibilities of the technological future. Just as the ancient kings unified territories, Gorkhali
                  Token seeks to unify communities in the digital space.
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>
              </div>
            </div>
          </div>

          {/* Era 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-1 md:order-1">
              <div className="relative overflow-hidden rounded-md border-l-4 border-r-4 border-[#8b0000] bg-gradient-to-b from-black/40 to-black/60 p-6 shadow-lg">
                <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#d4af37]"></div>
                <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#d4af37]"></div>
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#d4af37]"></div>
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#d4af37]"></div>

                <h3 className="text-3xl font-bold mb-4 text-[#d4af37] uppercase tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  Innovation Era (2025-Future)
                </h3>
                <p className="text-lg mb-4 text-white leading-relaxed">
                  With an eye on the future, Gorkhali Token positions itself as a pioneer in integrating blockchain
                  technologies with real-world applications, always maintaining the warrior spirit of its ancestors.
                </p>
                <p className="text-lg text-white leading-relaxed">
                  The Gorkhali community grows day by day, uniting people from all over the world under the values of
                  courage, honor, and determination that characterized the ancient kingdom. The future is built on the
                  foundations of a glorious past.
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>
              </div>
            </div>

            <div className="order-2 md:order-2">
              <div className="relative overflow-hidden rounded-md border-2 border-[#d4af37]/50 shadow-lg">
                <Image
                  src="/images/future-innovation-temple.png"
                  alt="Gorkhali Temple and futuristic technology"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Objectives and Values */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <AnimatedHeading as="h2" className="text-4xl font-bold mb-12 text-center text-[#d4af37]" withGlow>
            Our Essence
          </AnimatedHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {/* Vision */}
            <div className="relative overflow-hidden rounded-md border-l-4 border-r-4 border-[#8b0000] bg-gradient-to-b from-black/40 to-black/60 p-6 shadow-lg">
              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#d4af37]"></div>
              <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#d4af37]"></div>
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#d4af37]"></div>

              <h3 className="text-2xl font-bold mb-4 text-[#d4af37] uppercase tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                Vision
              </h3>
              <p className="text-lg text-white leading-relaxed">
                To become the bridge that connects the rich history of Gorkhali with the digital future, creating a
                blockchain ecosystem that honors the values of courage, honor, and community that characterized the
                ancient kingdom.
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>
            </div>

            {/* Mission */}
            <div className="relative overflow-hidden rounded-md border-l-4 border-r-4 border-[#8b0000] bg-gradient-to-b from-black/40 to-black/60 p-6 shadow-lg">
              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#d4af37]"></div>
              <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#d4af37]"></div>
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#d4af37]"></div>

              <h3 className="text-2xl font-bold mb-4 text-[#d4af37] uppercase tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                Mission
              </h3>
              <p className="text-lg text-white leading-relaxed">
                To develop an innovative blockchain platform that empowers our global community, fostering mass adoption
                of decentralized technologies while preserving and spreading the cultural legacy of Gorkhali.
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>
            </div>

            {/* Objectives */}
            <motion.div
              className="relative overflow-hidden rounded-md border-l-4 border-r-4 border-[#8b0000] bg-gradient-to-b from-black/40 to-black/60 p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 0 25px 5px rgba(212, 175, 55, 0.3)",
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#d4af37]"></div>
              <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#d4af37]"></div>
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#d4af37]"></div>

              {/* Golden floating particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[#d4af37]/70"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                      opacity: 0,
                    }}
                    animate={{
                      y: [null, Math.random() * -50 - 20],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <motion.h3
                className="text-2xl font-bold mb-4 text-[#d4af37] uppercase tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Objectives
              </motion.h3>

              <ul className="text-lg text-white space-y-2 list-disc pl-5">
                {[
                  "Build a global community of 100,000+ members by the end of 2026",
                  "Develop decentralized applications that solve real-world problems",
                  "Establish strategic alliances with leading blockchain projects",
                  "Create a development fund to support community initiatives",
                  "Achieve mass adoption of the GKR token across multiple ecosystems",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{
                      color: "#fcd34d",
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>
            </motion.div>

            {/* Values */}
            <motion.div
              className="relative overflow-hidden rounded-md border-l-4 border-r-4 border-[#8b0000] bg-gradient-to-b from-black/40 to-black/60 p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 0 25px 5px rgba(212, 175, 55, 0.3)",
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#d4af37]"></div>
              <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#d4af37]"></div>
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#d4af37]"></div>
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#d4af37]"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute rounded-full blur-3xl"
                  style={{
                    width: "50%",
                    height: "50%",
                    left: "25%",
                    top: "25%",
                    background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
                    opacity: 0.5,
                  }}
                />
              </div>

              <motion.h3
                className="text-2xl font-bold mb-4 text-[#d4af37] uppercase tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Values
              </motion.h3>

              <ul className="text-lg text-white space-y-2 list-disc pl-5">
                {[
                  { title: "Courage", desc: "We face challenges with determination and bravery" },
                  { title: "Honor", desc: "We act with integrity and transparency at all times" },
                  { title: "Community", desc: "We value and empower every member of our ecosystem" },
                  { title: "Innovation", desc: "We constantly seek new ways to improve and evolve" },
                  { title: "Respect", desc: "We honor our history while building the future" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.span
                      className="font-bold text-[#d4af37]/80"
                      whileHover={{
                        textShadow: "0 0 8px rgba(212, 175, 55, 0.7)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {item.title}:
                    </motion.span>{" "}
                    {item.desc}
                  </motion.li>
                ))}
              </ul>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b0000] via-[#d4af37] to-[#8b0000]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <AnimatedHeading as="h2" className="text-4xl font-bold mb-12 text-center text-[#d4af37]" withGlow>
            The Legacy Continues
          </AnimatedHeading>

          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-xl text-white mb-6">
              The story of Gorkhali is a story of resilience, innovation, and vision. From the Himalayan mountains to
              the digital world, the Gorkhali spirit continues to inspire new generations.
            </p>
            <p className="text-xl text-white">
              With Gorkhali Token, we not only honor our past but build a future where traditional values of courage,
              honor, and community merge with blockchain technology.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <AnimatedButton
              onClick={() => router.push("/tokenomics")}
              size="lg"
              className="bg-[#8b0000] hover:bg-[#8b0000]/80 text-white px-8 py-3 rounded-md font-bold"
            >
              Explore Tokenomics
            </AnimatedButton>

            <AnimatedButton
              onClick={() => router.push("/roadmap")}
              variant="outline"
              size="lg"
              className="border-2 border-[#d4af37] text-[#d4af37] hover:bg-amber-900/30 px-8 py-3 rounded-md font-bold"
            >
              View Roadmap
            </AnimatedButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
