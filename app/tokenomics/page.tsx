"use client"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Coins, Lock, BarChart3, Gem, Repeat, Globe, Users } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Footer } from "@/components/footer"

export default function TokenomicsPage() {
  return (
    <main className="min-h-screen bg-[#121212] dark:bg-[#121212] light:bg-[#f8f5f0] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-[#D4AF37] hover:text-[#FFD700] transition-colors duration-300"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Kingdom
          </Link>
        </div>

        <div className="mb-16">
          <SectionHeading
            title="The King's Treasury"
            subtitle="The economics of GKR are designed with one purpose: to build a lasting digital empire through fair distribution, sustainable growth, and community governance."
            centered
          />

          {/* Token Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 bg-[#8B0000]/10 rounded-bl-full"></div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#8B0000] rounded-full flex items-center justify-center mr-3">
                  <Coins className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h3 className="text-[#D4AF37] font-bold">Total Supply</h3>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white dark:text-white light:text-[#121212]">
                  100,000,000 GKR
                </span>
              </div>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
                Fixed supply, no additional minting
              </p>
            </div>

            <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 bg-[#8B0000]/10 rounded-bl-full"></div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#8B0000] rounded-full flex items-center justify-center mr-3">
                  <Coins className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h3 className="text-[#D4AF37] font-bold">Gorkhali Treasury</h3>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white dark:text-white light:text-[#121212]">
                  35,000,000 GKR
                </span>
              </div>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
                Currently held tokens for distribution
              </p>
            </div>

            <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 bg-[#8B0000]/10 rounded-bl-full"></div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#8B0000] rounded-full flex items-center justify-center mr-3">
                  <Lock className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h3 className="text-[#D4AF37] font-bold">Staking APY</h3>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-white dark:text-white light:text-[#121212]">Up to 35%</span>
              </div>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
                Variable based on staking period
              </p>
            </div>
          </div>

          {/* PUF Platform Info */}
          <div className="mb-16">
            <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 md:p-10 relative">
              {/* World Logo en la esquina superior derecha */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-16 md:h-16">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/worldcoin-org-wld-logo-LJAPCeAMdTczHhflQnneuJFSLtlsvK.png"
                  alt="World Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center mb-6 pr-16 md:pr-20">
                <div className="h-12 w-12 bg-[#8B0000] rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wTl2_S3L_400x400.jpg-iFUFQEywgM1bxj8EfKydh0PrGHkH3j.jpeg"
                    alt="PUF Logo"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#D4AF37]">Created on PUF Platform</h3>
              </div>

              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6">
                GORKHALI (GKR) was created on PUF, a platform within WorldApp that enables real humans to create and
                launch their own memecoins on Worldchain, powered by Worldcoin's Proof of Personhood. The team has
                acquired 35,000,000 GKR tokens which are now held in the Gorkhali Treasury for strategic distribution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#121212]/50 dark:bg-[#121212]/50 light:bg-[#f1f1f1] p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Users className="h-5 w-5 text-[#D4AF37] mr-2" />
                    <h4 className="text-[#D4AF37] font-bold">Proof of Personhood</h4>
                  </div>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
                    Built on Worldcoin's technology ensuring that tokens are created by verified humans, adding an extra
                    layer of legitimacy and trust to the GKR ecosystem.
                  </p>
                </div>

                <div className="bg-[#121212]/50 dark:bg-[#121212]/50 light:bg-[#f1f1f1] p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Globe className="h-5 w-5 text-[#D4AF37] mr-2" />
                    <h4 className="text-[#D4AF37] font-bold">Worldchain Powered</h4>
                  </div>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
                    Leveraging the security and efficiency of Worldchain for fast transactions, low fees, and seamless
                    integration with the broader World ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Token Distribution */}
          <div className="mb-16">
            <SectionHeading
              title="Treasury Distribution"
              subtitle="The 35,000,000 GKR tokens currently held in the treasury will be strategically allocated to ensure sustainable growth and community rewards."
              centered
            />

            <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="mx-auto w-full max-w-[400px] flex flex-col items-center">
                  <div className="relative w-full aspect-square">
                    <Image src="/images/gorkhali-coin.png" alt="GORKHALI Coin" fill className="object-contain" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#D4AF37] mb-4">The King's Allocation</h3>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6">
                    The 35 million GKR tokens in our treasury will be distributed strategically to build a strong
                    ecosystem and reward our community. This allocation ensures the empire expands through the hands of
                    many, reflecting our commitment to decentralization and long-term sustainability.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { color: "#D4AF37", label: "Community Rewards", percentage: 35 },
                      { color: "#8B0000", label: "Staking Rewards", percentage: 25 },
                      { color: "#4B5320", label: "Team & Development", percentage: 15 },
                      { color: "#A52A2A", label: "Marketing & Partnerships", percentage: 15 },
                      { color: "#6B0000", label: "Liquidity Pool", percentage: 10 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="h-4 w-4 rounded-sm mr-3"
                          style={{
                            backgroundColor: item.color,
                          }}
                        ></div>
                        <div className="flex justify-between items-center w-full">
                          <span className="text-gray-300">{item.label}</span>
                          <span className="text-[#D4AF37] font-bold">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-[#121212]/50 dark:bg-[#121212]/50 light:bg-[#f1f1f1] rounded-lg border border-[#D4AF37]/10">
                    <h4 className="text-[#D4AF37] font-bold mb-2">Strategic Allocation</h4>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">
                      From our 35M treasury: Community Rewards (12.25M GKR) and Staking Rewards (8.75M GKR) form the
                      backbone of the Gorkhali ecosystem, ensuring that power and rewards flow to the community. Team &
                      Development (5.25M GKR) ensures continued innovation, while Marketing & Partnerships (5.25M GKR)
                      fuels growth, and 3.5M GKR is dedicated to providing liquidity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Digital King Image */}
          <div className="mb-16 flex justify-center">
            <div className="relative w-full max-w-2xl aspect-square">
              <Image src="/images/digital-king.png" alt="Digital King GKR" fill className="object-contain" />
            </div>
          </div>

          {/* Token Utility */}
          <div>
            <SectionHeading
              title="Token Utility"
              subtitle="GKR is not just a store of value, but a utility token with real-world applications within the Gorkhali ecosystem."
              centered
            />

            <div className="bg-[#1A1A1A] dark:bg-[#1A1A1A] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#121212] dark:bg-[#121212] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-[#8B0000]/10 rounded-bl-full"></div>
                  <div className="h-12 w-12 bg-[#8B0000] rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-2">Ecosystem Access</h3>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">
                    GKR serves as the key to all Gorkhali ecosystem products, including NFT marketplace, games, and DeFi
                    tools.
                  </p>
                </div>

                <div className="bg-[#121212] dark:bg-[#121212] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-[#8B0000]/10 rounded-bl-full"></div>
                  <div className="h-12 w-12 bg-[#8B0000] rounded-full flex items-center justify-center mb-4">
                    <Gem className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-2">Status & Privileges</h3>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">
                    Holding GKR grants special access to exclusive events, airdrops, and early feature access based on
                    tier level.
                  </p>
                </div>

                <div className="bg-[#121212] dark:bg-[#121212] light:bg-white border border-[#D4AF37]/20 rounded-lg p-6 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-[#8B0000]/10 rounded-bl-full"></div>
                  <div className="h-12 w-12 bg-[#8B0000] rounded-full flex items-center justify-center mb-4">
                    <Repeat className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-2">Payment & Exchange</h3>
                  <p className="text-gray-300 dark:text-gray-300 light:text-gray-700">
                    GKR functions as a medium of exchange within the ecosystem and with partner merchants in the real
                    world.
                  </p>
                </div>
              </div>

              <div className="mt-12 border-t border-[#D4AF37]/20 pt-8">
                <h3 className="text-2xl font-serif font-bold text-[#D4AF37] mb-4 text-center">The King's Decree</h3>
                <blockquote className="text-gray-300 dark:text-gray-300 light:text-gray-700 italic text-center max-w-3xl mx-auto">
                  "Just as I once unified lands through fair governance and shared prosperity, GKR unifies the digital
                  realm through balanced tokenomics and community ownership. The treasury belongs not to one, but to all
                  who believe in the vision."
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://worldcoin.org/mini-app?app_id=app_15daccf5b7d4ec9b7dbba044a8fdeab5&path=app/token/0xac334E828dB3BF768FD1DE94cF6d44E17E68ba6d"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#8B0000] hover:bg-[#6B0000] text-[#D4AF37] font-bold py-4 px-8 text-lg rounded-md transition-all duration-300 inline-block"
          >
            Buy GRK en Worldchain
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}
