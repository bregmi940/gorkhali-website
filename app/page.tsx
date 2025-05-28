"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Shield, ChevronDown, Coins, Flame, ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { ImageGallery } from "@/components/image-gallery"
import { EpicHero } from "@/components/epic-hero"
import { EpicSection } from "@/components/epic-section"
import { EpicBackground } from "@/components/epic-background"
import { EpicCard } from "@/components/epic-card"
import { EpicTextEffect } from "@/components/epic-text-effect"
import { PartnersSection } from "@/components/partners-section"
import Image from "next/image"
import { Button } from "@/components/button"
import ParticleBackground from "@/components/particle-background"
import { useImmersiveContext } from "@/context/immersive-context"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const unificationRef = useRef<HTMLDivElement>(null)
  const digitalLegacyRef = useRef<HTMLDivElement>(null)
  const roadmapRef = useRef<HTMLDivElement>(null)
  const tokenomicsRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const communityRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const partnersRef = useRef<HTMLDivElement>(null)

  // Manejo seguro del contexto
  const context = useImmersiveContext()
  let isHighPerformance = false
  try {
    isHighPerformance = context?.isHighPerformance || false
  } catch (error) {
    // Si hay error con el contexto, usar valor por defecto
    isHighPerformance = false
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#121212] dark:bg-[#121212] light:bg-[#f8f5f0]">
      {/* Fondo épico global - solo uno de los dos efectos de fondo se muestra según el rendimiento */}
      {isHighPerformance ? (
        <EpicBackground intensity={7} />
      ) : (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticleBackground />
        </div>
      )}

      {/* Hero Section - Enhanced with Epic Hero */}
      <EpicHero
        title="GORKHALI (GKR)"
        subtitle="HE ONCE GAVE YOU A UNITED KINGDOM... NOW, HIS LEGACY RETURNS — TO UNIFY A DIVIDED DIGITAL WORLD."
        backgroundImage="/images/digital-king.png"
        glowIntensity={8}
        animationIntensity={7}
      >
        <div className="flex flex-col items-center space-y-6">
          <EpicTextEffect
            text="MINE IT. STAKE IT. MULTIPLY IT."
            tag="p"
            className="text-xl md:text-2xl font-serif text-[#D4AF37]"
            effect="fire"
            glowIntensity={7}
          />

          <Button
            href="https://t.me/+zv4TWbi36ehjZjg0"
            size="xl"
            variant="gold"
            target="_blank"
            rel="noopener noreferrer"
            epic={true}
            interactive={true}
          >
            JOIN THE GORKHALI ARMY
          </Button>

          <div className="mt-12">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <ChevronDown
                className="h-10 w-10 text-[#D4AF37] cursor-pointer"
                onClick={() => scrollToSection("unification")}
              />
            </motion.div>
          </div>
        </div>
      </EpicHero>

      {/* The Spirit of Unification Section */}
      <EpicSection
        id="unification"
        ref={unificationRef}
        backgroundEffect="glow"
        glowColor="#D4AF37"
        glowIntensity={6}
        parallaxIntensity={6}
        className="py-24 px-4 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <EpicTextEffect
                text="The Spirit of Unification"
                tag="h2"
                className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] mb-4"
                effect="gold"
                glowIntensity={7}
              />

              <EpicTextEffect
                text="The legacy of King Prithvi Narayan Shah continues in the digital realm."
                tag="p"
                className="text-xl text-gray-300 mb-6"
                effect="reveal"
                delay={0.3}
              />

              <EpicTextEffect
                text='"In the 18th century, Prithvi Narayan Shah, the brave king of Gorkha, dreamed of a united Nepal — not just by land, but by heart, culture, and identity. Against all odds, he led a campaign of courage, strategy, and unity…"'
                tag="p"
                className="text-lg md:text-xl text-gray-200 dark:text-gray-200 light:text-gray-700 mb-6"
                effect="word"
                delay={0.5}
                staggerChildren={0.03}
              />

              <EpicTextEffect
                text='"…Today, that same unifying spirit returns — through code, community, and crypto."'
                tag="p"
                className="text-lg md:text-xl text-gray-200"
                effect="word"
                delay={1.5}
                staggerChildren={0.05}
              />
            </div>

            <div className="order-1 md:order-2">
              {/* IMAGEN SIMPLIFICADA AL MÁXIMO */}
              <div className="rounded-lg overflow-hidden border-2 border-[#D4AF37] h-[400px] md:h-[500px] w-full md:w-[500px] mx-auto relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-05-20_20-42-32.jpg-w0WMRZEuQkt6SfB1KUJ9dtW10cItYp.jpeg"
                  alt="Gorkhali King - From Uniting a Nation to Conquering the Digital World"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </EpicSection>

      {/* GKR: A Digital Legacy Section */}
      <EpicSection
        id="digital-legacy"
        ref={digitalLegacyRef}
        backgroundEffect="particles"
        parallaxIntensity={5}
        className="py-24 px-4 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              {/* IMAGEN SIMPLIFICADA AL MÁXIMO */}
              <div className="rounded-lg overflow-hidden border-2 border-[#D4AF37] h-[400px] w-full max-w-[400px] mx-auto relative bg-gradient-to-b from-[#8B0000]/30 to-[#8B0000]/10 p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rajah_Prithvi_Narayan_Shah.jpg-B03xtGrgJTRekTtFfmNMxpVGe1vZog.jpeg"
                  alt="Historical Stamp of King Prithvi Narayan Shah"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute bottom-2 right-2 text-xs text-[#D4AF37] bg-black/50 px-2 py-1 rounded z-10">
                  Historical Stamp
                </div>
              </div>
            </div>

            <div>
              <EpicTextEffect
                text="GKR: A Digital Legacy"
                tag="h2"
                className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] mb-4"
                effect="gold"
                glowIntensity={7}
              />

              <EpicTextEffect
                text="More than a cryptocurrency - a movement with purpose and vision."
                tag="p"
                className="text-xl text-gray-300 mb-6"
                effect="reveal"
                delay={0.3}
              />

              <ul className="space-y-6">
                {[
                  { text: "Not just a meme coin, but a movement.", highlight: "movement" },
                  { text: "A global community with deep cultural roots." },
                  { text: "Mining, staking, referrals, NFTs, and community governance." },
                  { text: "Not with armies, but with community. Not for territory, but for freedom." },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-8 w-8 rounded-full bg-[#8B0000] flex items-center justify-center mt-1 mr-3 animate-pulse-slow flex-shrink-0">
                      <span className="text-[#D4AF37] font-bold">✓</span>
                    </div>
                    <p className="text-lg text-gray-200 dark:text-gray-200 light:text-gray-700">
                      {item.highlight ? (
                        <>
                          Not just a meme coin, but a{" "}
                          <EpicTextEffect
                            text="movement"
                            tag="span"
                            className="font-bold"
                            effect="fire"
                            glowIntensity={8}
                          />
                          .
                        </>
                      ) : (
                        item.text
                      )}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </EpicSection>

      {/* Gallery Section */}
      <EpicSection
        id="gallery"
        ref={galleryRef}
        backgroundEffect="glow"
        glowColor="#8B0000"
        glowIntensity={5}
        className="py-24 px-4 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <EpicTextEffect
            text="The King's Legacy"
            tag="h2"
            className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] mb-4 text-center"
            effect="gold"
            glowIntensity={7}
          />

          <EpicTextEffect
            text="Explore the visual journey from historical legacy to digital future."
            tag="p"
            className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
            effect="reveal"
            delay={0.3}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <ImageGallery />
          </motion.div>
        </div>
      </EpicSection>

      {/* Tokenomics Preview Section */}
      <EpicSection
        id="tokenomics"
        ref={tokenomicsRef}
        backgroundEffect="particles"
        parallaxIntensity={4}
        className="py-24 px-4 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <EpicTextEffect
            text="The King's Treasury"
            tag="h2"
            className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] mb-4 text-center"
            effect="gold"
            glowIntensity={7}
          />

          <EpicTextEffect
            text="GKR's economic model is designed for sustainability, fairness, and long-term growth. The distribution reflects our commitment to community ownership and ecosystem development."
            tag="p"
            className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
            effect="reveal"
            delay={0.3}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Fixed Supply",
                icon: <Coins className="h-6 w-6 text-[#D4AF37]" />,
                description: "100 million GKR tokens, no additional minting",
              },
              {
                title: "Community Focused",
                icon: <Shield className="h-6 w-6 text-[#D4AF37]" />,
                description: "60% of tokens allocated to community and rewards",
              },
              {
                title: "Fixed Emission",
                icon: <Flame className="h-6 w-6 text-[#D4AF37]" />,
                description: "Controlled token emission with no additional minting",
              },
            ].map((item, index) => (
              <EpicCard key={index} glowIntensity={6} depth={5} className="p-6">
                <div className="h-12 w-12 bg-[#8B0000] rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <EpicTextEffect
                  text={item.title}
                  tag="h3"
                  className="text-xl font-bold text-[#D4AF37] mb-2"
                  effect="gold"
                  glowIntensity={5}
                  delay={0.2 + index * 0.1}
                />
                <p className="text-gray-300">{item.description}</p>
              </EpicCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              href="/tokenomics"
              icon={<ArrowRight size={16} className="ml-2" />}
              variant="gold"
              epic={true}
              interactive={true}
            >
              View Full Tokenomics
            </Button>
          </div>
        </div>
      </EpicSection>

      {/* Roadmap Section - CORREGIDO EL ESPACIADO */}
      <EpicSection
        id="roadmap"
        ref={roadmapRef}
        backgroundEffect="glow"
        glowColor="#D4AF37"
        glowIntensity={5}
        className="py-24 px-4 md:px-12 mb-20 md:mb-0"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <EpicTextEffect
            text="Roadmap – Marching Orders 🎖️"
            tag="h2"
            className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] mb-4 text-center"
            effect="gold"
            glowIntensity={7}
          />

          <EpicTextEffect
            text="The path to digital unification is clear. From community building to a self-sustaining digital empire, the Gorkhali legacy will unfold in strategic phases."
            tag="p"
            className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
            effect="reveal"
            delay={0.3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                quarter: "Q1 2025",
                icon: "🛡️",
                title: "The Rise of the Banner",
                details: "Community strongholds, token creation, initial DEX listing",
              },
              {
                quarter: "Q2 2025",
                icon: "🚀",
                title: "The March Begins",
                details: "Mining app, referral system, staking with 35% APY",
              },
              {
                quarter: "Q3 2025",
                icon: "🧬",
                title: "The Rise of Legacy",
                details: "NFT warriors, utility expansion, strategic alliances",
              },
              {
                quarter: "Q4 2025",
                icon: "👑",
                title: "The Digital Empire",
                details: "DAO governance, real-world integration, ecosystem growth",
              },
            ].map((item, index) => (
              <EpicCard key={index} glowIntensity={6} depth={5} className="p-6">
                <div className="text-4xl mb-4 animate-float">{item.icon}</div>
                <EpicTextEffect
                  text={item.title}
                  tag="h3"
                  className="text-xl font-bold text-[#D4AF37] mb-2"
                  effect="gold"
                  glowIntensity={5}
                  delay={0.2 + index * 0.1}
                />
                <p className="text-gray-300 mb-3">{item.details}</p>
                <p className="text-sm text-[#D4AF37]/80">{item.quarter}</p>
              </EpicCard>
            ))}
          </div>

          <div className="mt-12 text-center relative z-20">
            <Button
              href="/roadmap"
              icon={<ArrowRight size={16} className="ml-2" />}
              variant="gold"
              epic={true}
              interactive={true}
            >
              View Full Roadmap
            </Button>
          </div>
        </div>
      </EpicSection>

      {/* Visual Banner Section - ALTURA REDUCIDA EN MÓVIL */}
      <section id="banner" ref={bannerRef} className="relative h-[300px] md:h-[500px] overflow-hidden mt-20 md:mt-0">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/80 to-[#121212]/80 z-10 pointer-events-none"></div>
          <div className="w-full h-full">
            <Image src="/images/king-with-temples.png" alt="King Prithvi Narayan Shah" fill className="object-cover" />
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-4 py-8 md:py-16">
          <div className="max-w-4xl text-center">
            <EpicTextEffect
              text='"Nepal is a garden of all kinds of flowers. Today, crypto is that garden. GKR is the root of unity growing within it."'
              tag="blockquote"
              className="text-xl md:text-2xl lg:text-4xl font-serif text-[#D4AF37] italic"
              effect="gold"
              glowIntensity={8}
            />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <div id="partners" ref={partnersRef}>
        <PartnersSection />
      </div>

      {/* Community Call-to-Action Section */}
      <EpicSection
        id="community"
        ref={communityRef}
        backgroundEffect="glow"
        glowColor="#8B0000"
        glowIntensity={6}
        className="py-24 px-4 md:px-12"
      >
        <div className="max-w-3xl mx-auto text-center">
          <EpicTextEffect
            text="🔗 Join the Army. March with purpose."
            tag="h2"
            className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] mb-4"
            effect="gold"
            glowIntensity={7}
          />

          <EpicTextEffect
            text="Together, we will reshape crypto — the Gorkhali way."
            tag="p"
            className="text-xl text-gray-300 mb-12"
            effect="reveal"
            delay={0.3}
          />

          <div className="mb-12 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="https://t.me/+zv4TWbi36ehjZjg0"
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              variant="gold"
              epic={true}
              interactive={true}
            >
              Join the Army Telegram
            </Button>

            <Button href="/community" size="xl" variant="outline" epic={true} interactive={true}>
              Explore Community
            </Button>
          </div>

          <div className="mt-12 flex justify-center space-x-6">
            {[
              {
                name: "telegram",
                icon: (
                  <svg className="h-6 w-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
                  </svg>
                ),
                href: "https://t.me/gorkhali",
              },
              {
                name: "twitter",
                icon: (
                  <svg className="h-6 w-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                ),
                href: "https://twitter.com/gorkhali_gkr",
              },
              {
                name: "discord",
                icon: (
                  <svg className="h-6 w-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25-1.845-.277-3.68-.277-5.487 0-.163-.393-.406-.874-.617-1.25a.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.36.63.873 1.295 1.226 1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 00-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                ),
                href: "https://discord.gg/gorkhali",
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white p-3 rounded-full cursor-pointer inline-flex items-center justify-center hover:bg-[#8B0000] transition-colors duration-300 btn-glow"
                whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(212, 175, 55, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </EpicSection>

      <footer className="relative z-10 w-full">
        <Footer />
      </footer>
    </main>
  )
}
