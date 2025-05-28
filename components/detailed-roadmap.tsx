"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const phases = [
  {
    id: "phase1",
    phase: "Phase 1",
    title: "The Rise of the Banner",
    quarter: "Q1 2025",
    icon: "🛡️",
    subtitle: "Before a battle is fought, the flag must rise.",
    description:
      "Phase 1 is the formation of the Gorkhali digital force — laying the groundwork for a movement destined to shake the crypto world.",
    sections: [
      {
        id: "community",
        title: "Building the Community Strongholds",
        icon: "🛡️",
        content: [
          "To spread the call of the King, we claim digital territory:",
          "• Telegram Command Post – Where loyal warriors gather for strategy and updates.",
          "• Twitter (X) War Drums – Loud, fast, viral — where momentum begins.",
          "• Facebook Campfire – A place for stories, memes, and movement-building.",
          "These are not just social channels — they are outposts of a rising army.",
        ],
      },
      {
        id: "token",
        title: "Forging the Token: $GKR",
        icon: "⚔️",
        content: [
          "The King's digital gift is born.",
          "In Phase 1, we:",
          "• Finalize $GKR token architecture",
          "• Establish total supply and core tokenomics",
          "• Ready smart contracts for staking, mining, and rewards (to launch in Phase 2)",
          "The sword is being sharpened — the battle will soon begin.",
        ],
      },
      {
        id: "dex",
        title: "The First Deployment: Listing on DEX",
        icon: "🔥",
        content: [
          "GKR steps onto its first battlefield — the Decentralized Exchange (DEX).",
          "We begin with:",
          "• Initial liquidity provisioning",
          "• Fair trading access for early believers",
          "• Public visibility for the GKR movement",
          "This is where the legend becomes real. This is where the value begins.",
        ],
      },
    ],
  },
  {
    id: "phase2",
    phase: "Phase 2",
    title: "The March Begins",
    quarter: "Q2 2025",
    icon: "🚀",
    subtitle:
      "With the banner raised and the call heard far and wide, we now enter the second chapter of our mission — action, reward, and expansion.",
    description: "",
    sections: [
      {
        id: "mining",
        title: "Launch of the GKR Mining App",
        icon: "⛏️",
        content: [
          "The King's gift is now in your hands — daily rewards for those who believe early.",
          "• ⛏️ Mine 2 GKR per day just by being active.",
          "• 📲 Mobile-friendly mining app (no heavy hardware needed).",
          "• 💠 Light, fair, and designed for everyday warriors.",
          "Your journey begins one GKR at a time — start mining and earn your place.",
        ],
      },
      {
        id: "referrals",
        title: "Invite and Earn – Grow the Army",
        icon: "🤝",
        content: [
          "The army grows by word of mouth and brotherhood.",
          "• 💥 Earn 5 GKR for every new recruit you bring into the movement.",
          "• 🛡️ Track referrals in your dashboard.",
          "• 🔗 Invite with your custom link — watch your army grow.",
          "The bigger your battalion, the greater your legacy.",
        ],
      },
      {
        id: "staking",
        title: "Staking is Live — Earn up to 35% APY",
        icon: "💰",
        content: [
          "Now, the loyal are rewarded.",
          "• 💎 Stake your GKR to earn up to 35% annual yield.",
          "• 🕐 Flexible staking periods — loyalty pays better.",
          "• 🔒 Your tokens, your control.",
          "The longer you stay, the stronger you grow.",
        ],
      },
    ],
  },
  {
    id: "phase3",
    phase: "Phase 3",
    title: "The Rise of Legacy",
    quarter: "Q3 2025",
    icon: "🧬",
    subtitle:
      "The army stands strong. The tokens are in motion. The spirit of the King now moves toward his final vision — a unified digital world, where honor, utility, and value live side by side.",
    description: "",
    sections: [
      {
        id: "nfts",
        title: "The Gorkhali NFT Warriors",
        icon: "🎖️",
        content: [
          "The past is now collectible. The warrior spirit, immortalized.",
          "• ⚔️ Launch of the Gorkhali NFT Collection — each representing courage, culture, and code",
          "• 🔥 NFTs unlock elite staking tiers, access to drops, and identity in the GKR ecosystem",
          "• 📜 Special editions tied to historical ranks and achievements",
          "These NFTs are your armor in the digital realm — wear them with pride.",
        ],
      },
      {
        id: "utility",
        title: "Utility Forged — Power with Purpose",
        icon: "🔧",
        content: [
          "We give $GKR real power in the digital world:",
          "• Use in future dApps and tools",
          "• Priority in NFT minting, voting rights, and ecosystem perks",
          "• Smart contract-based rewards and governance",
          "• Token burn & deflation mechanisms",
          "GKR becomes more than a token — it becomes a tool of influence.",
        ],
      },
      {
        id: "partnerships",
        title: "Making Allies — Collaborating with Titans",
        icon: "🤝",
        content: [
          "The king knew when to conquer and when to ally.",
          "• Strategic partnerships with major Web3 projects and meme coins",
          "• Cross-brand campaigns with other culturally powerful tokens",
          "• Co-launch NFTs, joint events, dual-staking pools",
          "• Strengthen liquidity, exposure, and community bridges",
          "This is not about competition — it's about unifying forces across chains and tribes.",
        ],
      },
    ],
  },
  {
    id: "phase4",
    phase: "Phase 4",
    title: "The Digital Empire",
    quarter: "Q4 2025",
    icon: "👑",
    subtitle:
      "With allies made, assets forged, and warriors empowered, we now ascend into a new era — where the Gorkhali vision becomes a living, breathing digital empire.",
    description: "This is no longer a project. This is a movement with its own economy, culture, and leadership.",
    sections: [
      {
        id: "dao",
        title: "Gorkhali DAO — Power to the People",
        icon: "🧠",
        content: [
          "The King gives the crown to the community.",
          "• Launch of the GKR DAO (Decentralized Autonomous Organization)",
          "• Token holders vote on key decisions:",
          "• New features",
          "• Treasury usage",
          "• Listing priorities",
          "• Future airdrops",
          "True power is no longer centralized — it flows through the hands of the army.",
        ],
      },
      {
        id: "commerce",
        title: "Real-World Integration & GKR Commerce",
        icon: "🛒",
        content: [
          "What good is gold if it can't be used?",
          "• Build or partner with a GKR Marketplace",
          "• Enable payments for digital goods, NFTs, merch, and more using GKR",
          "• Bridge with select real-world vendors and e-commerce platforms",
          "$GKR becomes usable — not just tradeable.",
        ],
      },
      {
        id: "ecosystem",
        title: "Expansion into Gorkhali Ecosystem Projects",
        icon: "🧱",
        content: [
          "The Empire doesn't end with one app.",
          "• Launch of side projects under the Gorkhali brand (games, tools, metaverse, DeFi mini-tools)",
          "• Plug-and-play support for GKR utility across all child projects",
          "• Ecosystem grants and dev support for builders",
          "The legacy multiplies — one chain, many frontiers.",
        ],
      },
    ],
  },
  {
    id: "phase5",
    phase: "Phase 5",
    title: "Immortality of the Crown",
    quarter: "Q1 2026",
    icon: "🔥",
    subtitle:
      "The King's legacy is no longer a dream — it is destiny fulfilled. Now begins the era where GKR thrives without a throne, driven by its people, purpose, and power.",
    description: "",
    sections: [
      {
        id: "economy",
        title: "Gorkhali Nation — A Sovereign Digital Economy",
        icon: "🏛️",
        content: [
          "GKR transforms into a full digital economy:",
          "• Earn",
          "• Spend",
          "• Trade",
          "• Build",
          "• Powered by decentralized apps, NFT tools, real-world partners, and self-funded growth",
          "• DAO manages the treasury, partnerships, and grants — no central control",
          "It's not a token anymore. It's a sovereign system.",
        ],
      },
      {
        id: "reserve",
        title: "GKR as a Cultural Reserve Asset",
        icon: "🪙",
        content: [
          "GKR becomes a symbol of honor and digital strength, with use cases beyond trading:",
          "• Held as a store of value within digital communities",
          "• Used for tipping, rewards, on-chain bounties",
          "• Integrated into DeFi platforms, staking protocols, and Web3 games",
          "As Bitcoin is digital gold — GKR is digital honor.",
        ],
      },
    ],
  },
]

// Variantes de animación para diferentes elementos
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
}

const buttonVariants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  tap: { scale: 0.95 },
  active: {
    scale: 1.1,
    backgroundColor: "#8B0000",
    color: "#D4AF37",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  hover: {
    scale: 1.2,
    rotate: 15,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
}

const backgroundVariants = {
  initial: { scale: 1 },
  animate: {
    scale: 1.05,
    transition: {
      duration: 20,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
      ease: "linear",
    },
  },
}

export function DetailedRoadmap() {
  const [activePhase, setActivePhase] = useState(phases[0].id)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Efecto para detectar cuando el componente está en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  const handlePhaseClick = (phase: string) => {
    setActivePhase(phase)
  }

  const currentPhase = phases.find((phase) => phase.id === activePhase) || phases[0]

  return (
    <div className="w-full max-w-6xl mx-auto" ref={containerRef}>
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {phases.map((phase) => (
          <motion.button
            key={phase.id}
            onClick={() => handlePhaseClick(phase.id)}
            className={`px-6 py-3 rounded-lg text-lg font-bold transition-all duration-300 ${
              activePhase === phase.id ? "" : "bg-[#3A1F00] text-[#D4AF37]/70 hover:bg-[#4A2F00]"
            }`}
            variants={buttonVariants}
            initial="idle"
            animate={activePhase === phase.id ? "active" : "idle"}
            whileHover="hover"
            whileTap="tap"
          >
            {phase.phase}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase}
          className="bg-black/40 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3
            className="text-3xl font-bold mb-3 text-[#D4AF37]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentPhase.title}
          </motion.h3>
          <motion.p
            className="text-xl mb-8 text-[#D4AF37]/90"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentPhase.subtitle}
          </motion.p>

          <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
            {currentPhase.sections.map((section, index) => (
              <motion.div
                key={section.id}
                className="bg-[#1A0F00]/80 border border-[#D4AF37]/20 rounded-lg p-6 overflow-hidden"
                variants={itemVariants}
                custom={index}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "rgba(212, 175, 55, 0.4)",
                }}
              >
                <div className="flex items-center mb-4">
                  <motion.span className="text-3xl mr-3" variants={iconVariants} whileHover="hover">
                    {section.icon}
                  </motion.span>
                  <motion.h4
                    className="text-2xl font-bold text-[#D4AF37]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {section.title}
                  </motion.h4>
                </div>

                <motion.div className="space-y-4 pl-12" variants={containerVariants} initial="hidden" animate="visible">
                  {section.content.map((paragraph, pIndex) => (
                    <motion.p
                      key={pIndex}
                      className="text-lg text-[#D4AF37]/80"
                      variants={itemVariants}
                      custom={pIndex}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="mt-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10"></div>
          <motion.div className="w-full h-full" variants={backgroundVariants} initial="initial" animate="animate">
            <Image
              src="/images/gorkhali-battle-map.png"
              alt="Gorkhali King overlooking his army at dawn"
              fill
              className="object-cover object-center"
              priority
              unoptimized
            />
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-[#D4AF37] font-serif italic text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            "The journey of a thousand miles begins with a single step."
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
