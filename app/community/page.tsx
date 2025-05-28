"use client"

import { useEffect } from "react"
import { useEpicEffects } from "@/components/epic-effects-provider"
import AnimatedHeading from "@/components/animated-heading"
import AnimatedButton from "@/components/animated-button"
import ParticleBackground from "@/components/particle-background"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Image from "next/image"

export default function CommunityPage() {
  const { setEffectTheme } = useEpicEffects()

  // Set theme when component mounts
  useEffect(() => {
    if (setEffectTheme) {
      setEffectTheme("community")
    }
  }, [setEffectTheme])

  return (
    <main className="min-h-screen bg-black text-white">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-[#8b0000]/20 to-black/80">
        <AnimatedHeading
          as="h1"
          className="text-5xl md:text-7xl font-bold mb-6 text-[#d4af37]"
          withGlow
          withSplitText
          withStagger
        >
          Join Our Community
        </AnimatedHeading>

        <div className="max-w-3xl mx-auto text-xl mb-10">
          <p className="mb-6 text-white">
            Become part of the Gorkhali movement and help shape the future of our digital kingdom.
          </p>
        </div>

        <div className="rounded-lg shadow-2xl mb-10 max-w-full overflow-hidden">
          <Image
            src="/gorkhali-digital-community.png"
            alt="Gorkhali Digital Community"
            width={800}
            height={500}
            className="w-full h-auto"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* Community Values Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto bg-black">
        <AnimatedHeading as="h2" className="text-4xl font-bold mb-12 text-center text-[#d4af37]" withUnderline>
          Our Community Values
        </AnimatedHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Unity",
              description:
                "Just as King Prithvi Narayan Shah united the kingdoms, we unite crypto enthusiasts from all backgrounds.",
              icon: "🤝",
            },
            {
              title: "Courage",
              description:
                "We face challenges head-on, embracing innovation and pushing the boundaries of what's possible.",
              icon: "⚔️",
            },
            {
              title: "Legacy",
              description:
                "We honor our history while building for the future, creating something that will stand the test of time.",
              icon: "👑",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-[#8b0000]/20 border border-[#d4af37]/30 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-[#d4af37]">{value.title}</h3>
              <p className="text-white">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Channels Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#8b0000]/20 to-black/40">
        <div className="max-w-6xl mx-auto">
          <AnimatedHeading as="h2" className="text-4xl font-bold mb-12 text-center text-[#d4af37]" withGlow>
            Connect With Us
          </AnimatedHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="rounded-lg shadow-2xl overflow-hidden">
                <Image
                  src="/gorkhali-mountain-kingdom.png"
                  alt="Gorkhali Kingdom in the Himalayas"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>

            <div>
              <div className="space-y-6">
                {[
                  {
                    name: "Telegram",
                    description: "Join our main community hub for updates, discussions, and direct communication.",
                    icon: (
                      <svg className="h-8 w-8 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
                      </svg>
                    ),
                    link: "https://t.me/+zv4TWbi36ehjZjg0",
                  },
                  {
                    name: "Twitter",
                    description: "Follow us for the latest news, announcements, and community highlights.",
                    icon: (
                      <svg className="h-8 w-8 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    ),
                    link: "https://twitter.com/gorkhali_gkr",
                  },
                  {
                    name: "Discord",
                    description: "Join our Discord server for deeper community engagement and special events.",
                    icon: (
                      <svg className="h-8 w-8 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25-1.845-.277-3.68-.277-5.487 0-.163-.393-.406-.874-.617-1.25a.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03a.078.078 0 00.084-.028c.36.63.873 1.295 1.226 1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    ),
                    link: "https://discord.gg/gorkhali",
                  },
                ].map((channel, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-[#8b0000]/50 p-3 rounded-full">{channel.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-[#d4af37]">{channel.name}</h3>
                      <p className="text-white mb-2">{channel.description}</p>
                      <a
                        href={channel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#d4af37] hover:text-white transition-colors"
                      >
                        Join Now
                        <svg
                          className="ml-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Events Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <AnimatedHeading as="h2" className="text-4xl font-bold mb-12 text-center text-[#d4af37]" withUnderline>
            Community Events
          </AnimatedHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AMA Sessions",
                description: "Regular Ask Me Anything sessions with the Gorkhali team to answer all your questions.",
                image: "/ama-session.png",
                date: "Every Friday",
              },
              {
                title: "Trading Competitions",
                description: "Participate in trading competitions with prizes for the most successful warriors.",
                image: "/business-conference.png",
                date: "Monthly",
              },
              {
                title: "Hackathons",
                description: "Join our hackathons to build innovative solutions on the Gorkhali ecosystem.",
                image: "/hackathon-event.png",
                date: "Quarterly",
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                className="bg-[#8b0000]/20 border border-[#d4af37]/30 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="h-48 relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="p-6 bg-black">
                  <h3 className="text-xl font-bold mb-2 text-[#d4af37]">{event.title}</h3>
                  <p className="text-white mb-4">{event.description}</p>
                  <div className="flex items-center text-[#d4af37]/80">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {event.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Leaders Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#8b0000]/20 to-black/40">
        <div className="max-w-6xl mx-auto">
          <AnimatedHeading as="h2" className="text-4xl font-bold mb-12 text-center text-[#d4af37]" withGlow>
            Community Leaders
          </AnimatedHeading>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Regmi Bishal",
                role: "Community Manager",
                image: "/regmi-bishal-portrait.jpeg",
              },
              {
                name: "Priya Sharma",
                role: "Events Coordinator",
                image: "/woman-profile.png",
              },
              {
                name: "Ankit Singh",
                role: "Technical Support",
                image: "/diverse-group.png",
              },
              {
                name: "Maya Patel",
                role: "Content Creator",
                image: "/diverse-woman-portrait.png",
              },
            ].map((leader, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-40 w-40 mx-auto relative mb-4 overflow-hidden rounded-full border-2 border-[#d4af37]">
                  <Image
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    fill
                    className={`object-cover ${leader.name === "Regmi Bishal" ? "object-top" : ""}`}
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-bold text-[#d4af37]">{leader.name}</h3>
                <p className="text-[#d4af37]/80">{leader.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedHeading as="h2" className="text-4xl font-bold mb-6 text-[#d4af37]" withGlow>
            Ready to Join the Movement?
          </AnimatedHeading>

          <p className="text-xl text-white mb-10">
            Become part of the Gorkhali community today and help shape the future of our digital kingdom.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <AnimatedButton
              href="https://t.me/+zv4TWbi36ehjZjg0"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="bg-[#8b0000] hover:bg-[#8b0000]/80 text-white px-8 py-3 rounded-md font-bold"
            >
              Join Telegram
            </AnimatedButton>

            <AnimatedButton
              href="https://twitter.com/gorkhali_gkr"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              className="border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#8b0000]/30 px-8 py-3 rounded-md font-bold"
            >
              Follow on Twitter
            </AnimatedButton>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
