"use client"

import { useEffect } from "react"
import { useEpicEffects } from "@/components/epic-effects-provider"
import { Footer } from "@/components/footer"
import { MessageSquare, Twitter, DiscIcon, Shield, Fingerprint, Wallet, Zap } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { PartnersSection } from "@/components/partners-section"

export default function CommunityPage() {
  const { setEffectTheme } = useEpicEffects()

  // Set theme when component mounts
  useEffect(() => {
    setEffectTheme("community")
  }, [setEffectTheme])

  const socialNetworks = [
    {
      name: "Telegram",
      icon: <MessageSquare className="h-8 w-8" />,
      url: "https://t.me/+zv4TWbi36ehjZjg0",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      members: "5,000+",
      description: "Join our main channel for daily updates and community discussions.",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-8 w-8" />,
      url: "https://twitter.com/gorkhalitoken",
      color: "bg-sky-500",
      hoverColor: "hover:bg-sky-600",
      members: "10,000+",
      description: "Follow our latest news, announcements and participate in our exclusive giveaways.",
    },
    {
      name: "Discord",
      icon: <DiscIcon className="h-8 w-8" />,
      url: "https://discord.gg/gorkhali",
      color: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-700",
      members: "3,500+",
      description: "Community for developers, artists and technical enthusiasts of Gorkhali.",
    },
    {
      name: "World App",
      icon: (
        <div className="h-8 w-8 relative">
          <Image src="/images/world-logo.png" alt="World Logo" width={32} height={32} className="object-contain" />
        </div>
      ),
      url: "https://world.org/",
      color: "bg-emerald-600",
      hoverColor: "hover:bg-emerald-700",
      members: "15,000+",
      description: "Connect with the Gorkhali community on World, the true human network.",
    },
  ]

  const worldFeatures = [
    {
      title: "Digital Identity",
      description:
        "Verify your unique identity on the blockchain through World ID to access exclusive Gorkhali benefits.",
      icon: <Fingerprint className="h-8 w-8" />,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    },
    {
      title: "Global Community",
      description: "Be part of the world's largest human network, connecting Gorkhali enthusiasts from all continents.",
      icon: (
        <div className="h-8 w-8 relative">
          <Image src="/images/world-logo.png" alt="World Logo" width={32} height={32} className="object-contain" />
        </div>
      ),
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
    },
    {
      title: "Secure Verification",
      description:
        "Protect your Gorkhali assets with the most advanced biometric verification technology on the market.",
      icon: <Shield className="h-8 w-8" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
    },
    {
      title: "Universal Payments",
      description: "Send and receive Gorkhali tokens instantly to anyone on the World network.",
      icon: <Wallet className="h-8 w-8" />,
      color: "bg-gradient-to-br from-amber-500 to-amber-700",
    },
  ]

  const stats = [
    { label: "Verified Members", value: "25,000+", icon: "👤" },
    { label: "Countries", value: "75+", icon: "🌍" },
    { label: "Daily Transactions", value: "10,000+", icon: "⚡" },
    { label: "World Orbs", value: "50+", icon: "🔮" },
  ]

  // Animation variants for Framer Motion
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  }

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950/30 to-black/80 text-white">
      {/* Hero Section */}
      <motion.section className="pt-24 pb-16 px-4 text-center" initial="hidden" animate="visible" variants={fadeIn}>
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-purple-300 text-shadow-purple"
            variants={slideUp}
          >
            Gorkhali Community × World
          </motion.h1>
          <motion.p className="text-xl mb-10 max-w-3xl mx-auto text-purple-200" variants={slideUp}>
            Join the first blockchain community with humanity verification through World ID. Connecting digital warriors
            in the true human network.
          </motion.p>
          <motion.div
            className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl"
            variants={slideUp}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/gorkhali-digital-community.png"
              alt="Gorkhali Digital Community"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
              <div className="bg-black/60 px-4 py-2 rounded-full flex items-center">
                <Image src="/images/world-logo.png" alt="World Logo" width={20} height={20} className="mr-2" />
                <span className="text-emerald-400 font-medium">Powered by World ID</span>
              </div>
              <div className="bg-purple-900/60 px-4 py-2 rounded-full">
                <span className="text-purple-200 font-medium">Humanity verification</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* World Integration Section */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-b from-emerald-900/20 to-purple-900/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" variants={slideUp}>
            <motion.div
              className="inline-block mb-4 w-16 h-16"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Image src="/images/world-logo.png" alt="World Logo" width={64} height={64} className="object-contain" />
            </motion.div>
            <h2 className="text-4xl font-bold text-emerald-400 mb-4">The True Human Network</h2>
            <p className="text-xl max-w-3xl mx-auto text-emerald-100">
              Gorkhali integrates with World to offer a unique, verified, and secure community experience for all our
              members.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" variants={staggerContainer}>
            {worldFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${feature.color} text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                variants={slideUp}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-2xl font-bold ml-3">{feature.title}</h3>
                </div>
                <p className="text-white/90">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center" variants={slideUp}>
            <a
              href="https://world.org/download"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 inline-flex items-center hover:shadow-lg"
            >
              <Image src="/images/world-logo.png" alt="World Logo" width={20} height={20} className="mr-2" />
              Download World App
            </a>
            <p className="mt-4 text-sm text-emerald-200">
              You'll need the World app to verify your identity and access all benefits
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Social Networks Section */}
      <motion.section
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-purple-300 border-b-2 pb-2 border-purple-500 inline-block mx-auto"
            variants={slideUp}
          >
            Our Social Networks
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6" variants={staggerContainer}>
            {socialNetworks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 rounded-lg ${social.color} text-white transition-all duration-300 transform ${social.hoverColor} hover:scale-105 hover:shadow-lg flex flex-col h-full`}
                variants={slideUp}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-4">
                  {social.icon}
                  <h3 className="text-2xl font-bold ml-3">{social.name}</h3>
                </div>
                <p className="text-sm mb-3 opacity-90">{social.description}</p>
                <div className="mt-auto pt-4 flex items-center">
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{social.members} members</span>
                  <span className="ml-auto text-sm font-bold">Join →</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* World ID Verification */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-b from-purple-900/20 to-black/40"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideUp}>
              <h2 className="text-4xl font-bold mb-6 text-purple-300 text-shadow-purple">World ID Verification</h2>
              <p className="text-lg mb-6 text-purple-100">
                World ID technology uses iris scanning to verify that you are a unique human, protecting the Gorkhali
                community against bots and fake accounts.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Protection against Sybil attacks",
                  "Fair token distributions",
                  "Secure community voting",
                  "Access to exclusive events",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Zap className="h-5 w-5 text-emerald-400 mr-2" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="https://worldcoin.org/world-id"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 inline-flex items-center hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Fingerprint className="h-5 w-5 mr-2" />
                Learn More About World ID
              </motion.a>
            </motion.div>
            <motion.div
              className="relative"
              variants={slideUp}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="aspect-square max-w-md mx-auto relative rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl shadow-emerald-500/20">
                <Image
                  src="/images/world-orb.jpeg"
                  alt="World Orb"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <span className="bg-black/60 px-4 py-2 rounded-full text-emerald-400 font-medium inline-block">
                    Orb Technology
                  </span>
                </div>
              </div>
              <motion.div
                className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0.7)",
                    "0 0 0 10px rgba(16, 185, 129, 0)",
                    "0 0 0 0 rgba(16, 185, 129, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <Image
                  src="/images/world-logo.png"
                  alt="World Logo"
                  width={48}
                  height={48}
                  className="object-contain w-14 h-14"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Community Stats */}
      <motion.section
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center text-purple-300 text-shadow-purple"
            variants={slideUp}
          >
            Community Statistics
          </motion.h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-6 text-center transition-transform hover:scale-105"
                variants={slideUp}
                whileHover={{
                  boxShadow: "0 0 15px rgba(156, 39, 176, 0.3)",
                  y: -5,
                }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 2,
                      delay: index * 0.2,
                    },
                  }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl font-bold text-purple-300 mb-2">{stat.value}</div>
                <div className="text-purple-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Join CTA */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-b from-emerald-900/20 to-black/40"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 className="text-4xl font-bold mb-6 text-emerald-400 text-shadow-glow" variants={slideUp}>
            Join the Gorkhali Human Network
          </motion.h2>
          <motion.p className="text-xl mb-10 text-emerald-100" variants={slideUp}>
            Be part of the first blockchain community verified by World ID. Together, we are building a fairer, more
            secure, and accessible financial ecosystem for all humans.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://world.org/download"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all duration-300 inline-flex items-center justify-center hover:shadow-lg"
              variants={slideUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Image src="/images/world-logo.png" alt="World Logo" width={24} height={24} className="mr-2" />
              Download World App
            </motion.a>
            <motion.a
              href="https://t.me/+zv4TWbi36ehjZjg0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-lg font-bold text-xl transition-all duration-300 inline-flex items-center justify-center hover:shadow-lg"
              variants={slideUp}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(156, 39, 176, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageSquare className="h-6 w-6 mr-2" />
              Join Telegram
            </motion.a>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
