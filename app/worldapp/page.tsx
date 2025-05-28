"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Wallet, Coins, TrendingUp, Users, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function WorldappPage() {
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: howItWorksRef, inView: howItWorksInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: <Wallet className="h-10 w-10 text-[#D4AF37]" />,
      title: "Wallet Integration",
      description:
        "Connect your cryptocurrency wallet to access the full functionality of the platform with real-time balance management.",
    },
    {
      icon: <Coins className="h-10 w-10 text-[#D4AF37]" />,
      title: "Daily Mining",
      description: "Claim 2 GKR tokens every 24 hours with our fair distribution system and engaging visual feedback.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-[#D4AF37]" />,
      title: "Staking Mechanism",
      description: "Earn 35% Annual Percentage Yield on staked tokens with flexible deposits and withdrawals.",
    },
    {
      icon: <Users className="h-10 w-10 text-[#D4AF37]" />,
      title: "Referral Program",
      description: "Earn 5 GKR for each new referral with unique referral codes and easy-to-share links.",
    },
    {
      icon: <Info className="h-10 w-10 text-[#D4AF37]" />,
      title: "Token Information",
      description:
        "Access real-time price data, market metrics, and transparent display of the 35,000,000 GKR tokens in reserve.",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Connect Your Wallet",
      description: "Link your cryptocurrency wallet to access the Gorkhali mini-app securely.",
    },
    {
      number: "02",
      title: "Start Mining Daily",
      description: "Claim your 2 GKR tokens every 24 hours to start building your holdings.",
    },
    {
      number: "03",
      title: "Stake Your Tokens",
      description: "Deposit your GKR tokens to earn a 35% Annual Percentage Yield.",
    },
    {
      number: "04",
      title: "Invite Friends",
      description: "Share your unique referral code to earn 5 GKR for each new user you bring.",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/90 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                {/* World Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="flex justify-center mb-8"
                >
                  <div className="relative w-40 h-40 md:w-48 md:h-48">
                    <Image
                      src="/images/worldcoin-org-wld-logo.png"
                      alt="World Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/10 rounded-full blur-xl animate-pulse"></div>
                  </div>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5F5DC] to-[#D4AF37]">
                  GKR in Worldapp
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                  Experience the Gorkhali ecosystem in the World App with mining, staking, and rewards in a seamless
                  mini-app experience.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="https://worldapp.org/gorkhali" target="_blank" rel="noopener noreferrer">
                    <button className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-md hover:opacity-90 transition-all flex items-center gap-2">
                      Launch App <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                  <Link href="#learn-more">
                    <button className="px-8 py-3 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-medium rounded-md hover:bg-[#D4AF37]/10 transition-all">
                      Learn More
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/20 rounded-3xl blur-xl transform -rotate-6"></div>
                <img
                  src="/crypto-wallet-app.png"
                  alt="Gorkhali Mini-App Interface"
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl border border-[#D4AF37]/30"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full blur-xl opacity-60"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="learn-more" className="py-20 bg-black/95 relative">
        <div className="absolute inset-0 bg-[url('/abstract-digital-pattern.png')] bg-repeat opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5F5DC] to-[#D4AF37]">
              The Gorkhali Mini-App Experience
            </h2>
            <p className="text-lg text-gray-300">
              The Gorkhali (GKR) Mini-App is a progressive web application designed for the World ecosystem, providing
              users with a comprehensive platform for interacting with the Gorkhali cryptocurrency. Built with modern
              web technologies, this mini-app offers a seamless, mobile-friendly experience.
            </p>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all group"
              >
                <div className="mb-4 p-3 bg-black/50 rounded-lg inline-block group-hover:bg-[#D4AF37]/10 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-black/95 to-black/90 relative">
        <div className="absolute inset-0 bg-[url('/abstract-digital-pattern.png')] bg-repeat opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5F5DC] to-[#D4AF37]">
              How It Works
            </h2>
            <p className="text-lg text-gray-300">Get started with the Gorkhali mini-app in just a few simple steps</p>
          </div>

          <div ref={howItWorksRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-4 -top-4 text-6xl font-bold text-[#D4AF37]/10">{step.number}</div>
                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-[#D4AF37]/20 relative z-10 h-full">
                  <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-[#D4AF37]/30">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black p-10 rounded-2xl border border-[#D4AF37]/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5F5DC] to-[#D4AF37]">
                Ready to Join the Gorkhali Revolution?
              </h2>
              <p className="text-lg text-gray-300">
                Experience the future of digital currency with mining, staking, and rewards in the World ecosystem.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="https://worldapp.org/gorkhali" target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-medium rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2 w-full">
                  Launch Mini-App <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/community">
                <button className="px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-medium rounded-md hover:bg-[#D4AF37]/10 transition-all w-full">
                  Join Community
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
