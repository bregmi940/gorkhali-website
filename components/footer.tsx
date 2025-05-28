import Link from "next/link"
import { Github, Twitter, DiscIcon as Discord, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/60 backdrop-blur-md border-t border-red-900/30 text-white py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-500">Gorkhali</h3>
            <p className="text-gray-300 text-sm">
              The digital kingdom expanding across the blockchain realm, preserving the legacy of ancient warriors in
              the modern age.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/gorkhali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://discord.gg/gorkhali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Discord size={20} />
              </a>
              <a
                href="https://github.com/gorkhali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://instagram.com/gorkhali"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-500 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tokenomics" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-500 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://docs.gorkhali.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-yellow-300 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/gorkhali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-yellow-300 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/gorkhali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-yellow-300 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://gorkhali.com/whitepaper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-yellow-300 transition-colors"
                >
                  Whitepaper
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-500 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-300 hover:text-yellow-300 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-900/30 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Gorkhali. All rights reserved.</p>
          <p className="mt-2">
            Gorkhali is not affiliated with any government entity. The Gorkhali token is a digital asset with no claim
            to sovereign status.
          </p>
        </div>

        {/* Golden Otter Ecosystem Labs Banner */}
        <div className="mt-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-yellow-600/10 to-red-900/10 animate-pulse-slow"></div>
          <div className="relative py-3 px-3 border border-yellow-600/30 rounded-md bg-gradient-to-r from-red-900/30 to-black/30 backdrop-blur-sm">
            <div className="text-center">
              <span className="text-sm md:text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.3)]">
                Powered by{" "}
                <a
                  href="https://t.me/Buhonegro4000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-200 transition-colors underline decoration-yellow-500/30 hover:decoration-yellow-500"
                >
                  Owl Black
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
