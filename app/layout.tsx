import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { MobileMenu } from "@/components/mobile-menu"
import { ScrollProgress } from "@/components/scroll-progress"
import { ImmersiveProvider } from "@/context/immersive-context"
import Image from "next/image"
import { EpicEffectsProvider } from "@/components/epic-effects-provider"
import { AnimatedBackground } from "@/components/animated-background"
import { VisualMusicPlayer } from "@/components/visual-music-player"
import { AudioUrlChecker } from "@/components/audio-url-checker"

export const metadata: Metadata = {
  title: "Gorkhali Token",
  description: "The official website for Gorkhali Token",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23D4AF37' /%3E%3Ctext x='50' y='60' fontFamily='Arial' fontSize='40' textAnchor='middle' fill='%238B0000'%3EG%3C/text%3E%3C/svg%3E",
    apple:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23D4AF37' /%3E%3Ctext x='50' y='60' fontFamily='Arial' fontSize='40' textAnchor='middle' fill='%238B0000'%3EG%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "Gorkhali Token",
    description: "The official website for Gorkhali Token",
    images: [{ url: "/images/gorkhali-coin.png" }],
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* FAVICON INLINE - NO MÁS ERRORES 404 */}
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23D4AF37' /%3E%3Ctext x='50' y='60' fontFamily='Arial' fontSize='40' textAnchor='middle' fill='%238B0000'%3EG%3C/text%3E%3C/svg%3E"
        />

        {/* ELIMINAR TODAS LAS PRECARGAS DE FUENTES */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* FUENTES BÁSICAS SIN PRECARGA */
            body { font-family: system-ui, -apple-system, sans-serif; }
            .font-garamond { font-family: Georgia, serif; }
            .font-inter { font-family: system-ui, -apple-system, sans-serif; }
            
            /* ANIMACIÓN PARA FADE OUT */
            @keyframes fadeOut {
              0% { opacity: 1; }
              70% { opacity: 1; }
              100% { opacity: 0; }
            }
            .animate-fade-out {
              animation: fadeOut 3s forwards;
            }
          `,
          }}
        />

        {/* SCRIPT MEJORADO - NO SUPRIMIR ERRORES DE AUDIO */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // SUPRIMIR ERRORES ESPECÍFICOS PERO PERMITIR ERRORES DE AUDIO PARA DEBUG
            const originalError = console.error;
            const originalWarn = console.warn;
            
            // Lista de errores a suprimir (SIN incluir errores de audio)
            const suppressedErrors = [
              'favicon', 'Failed to load', 'CORS', 'Service Worker',
              'ERR_BLOCKED_BY_CLIENT', 'Vercel', 'stripe.com', 'MetaMask',
              'web3', 'Monaco', 'getWorkerUrl', 'getWorker', 'third-party cookies',
              'Chrome Platform', 'preloaded', 'font', 'SES_UNCAUGHT_EXCEPTION',
              'FetchError', 'ethyca.com', 'fides.js', 'lockdown-install',
              'Unsupported prop change', 'web worker', 'preload'
            ];
            
            function shouldSuppress(message) {
              if (typeof message !== 'string') return false;
              // NO suprimir errores que contengan 'audio' o 'sound' o 'mp3'
              if (message.toLowerCase().includes('audio') || 
                  message.toLowerCase().includes('sound') || 
                  message.toLowerCase().includes('mp3') ||
                  message.toLowerCase().includes('media')) {
                return false;
              }
              return suppressedErrors.some(error => message.includes(error));
            }
            
            console.error = function(...args) {
              const message = args[0];
              if (shouldSuppress(message)) return;
              return originalError.apply(console, args);
            };
            
            console.warn = function(...args) {
              const message = args[0];
              if (shouldSuppress(message)) return;
              return originalWarn.apply(console, args);
            };

            // INTERCEPTAR ERRORES DE RECURSOS GLOBALMENTE (EXCEPTO AUDIO)
            window.addEventListener('error', function(e) {
              if (e.target && (
                e.target.tagName === 'LINK' || 
                e.target.tagName === 'IMG' || 
                e.target.tagName === 'SCRIPT'
              )) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
              // NO interceptar errores de AUDIO para permitir debug
            }, true);
          `,
          }}
        />

        {/* META VIEWPORT SEPARADO PARA EVITAR ADVERTENCIAS */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </head>
      <body className="font-sans overflow-x-hidden">
        <EpicEffectsProvider>
          <AnimatedBackground glowIntensity={2} />
          <ImmersiveProvider>
            <ScrollProgress />
            <Header />
            <main className="relative z-10 pt-16 md:pt-16">{children}</main>
            {/* Reproductor de música con debugging completo */}
            <VisualMusicPlayer />
            {/* Verificador de URL (solo en desarrollo) */}
            <AudioUrlChecker />
          </ImmersiveProvider>
        </EpicEffectsProvider>
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#121212]/80 backdrop-blur-md border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden mr-2 relative">
                {/* Eliminado el onError handler y usando una imagen de respaldo directamente */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#121212] text-[#D4AF37]">G</div>
                <Image
                  src="/images/gorkhali-coin.png"
                  alt="Gorkhali Coin"
                  width={32}
                  height={32}
                  className="object-cover relative z-10"
                  priority
                  unoptimized
                />
              </div>
              <span className="text-[#D4AF37] font-bold text-xl whitespace-nowrap">GORKHALI&nbsp;(GRK)</span>
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            {[
              { name: "Home", href: "/" },
              { name: "History", href: "/history" },
              { name: "Roadmap", href: "/roadmap" },
              { name: "Tokenomics", href: "/tokenomics" },
              { name: "Community", href: "/community" },
              { name: "GRK in Worldapp", href: "/worldapp" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#D4AF37] hover:text-[#FFD700] px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://t.me/+zv4TWbi36ehjZjg0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#8B0000] hover:bg-[#6B0000] text-[#D4AF37] px-4 py-2 rounded text-sm font-medium transition-colors duration-300"
              >
                Join Army
              </a>
              <a
                href="https://world.org/es-la/ecosystem/app_15daccf5b7d4ec9b7dbba044a8fdeab5"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#4B0082] to-[#8A2BE2] hover:from-[#3B0062] hover:to-[#7A1BD2] text-[#D4AF37] px-4 py-2 rounded text-sm font-medium transition-colors duration-300 flex items-center"
              >
                <span className="mr-1">Buy GRK</span>
                {/* Eliminado el onError handler y usando un div con texto como respaldo */}
                <div className="inline-block w-4 h-4 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[8px] text-[#D4AF37]">W</div>
                  <Image
                    src="/images/world-logo.png"
                    alt="World Logo"
                    width={16}
                    height={16}
                    className="inline-block relative z-10"
                    unoptimized
                  />
                </div>
              </a>
            </div>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
