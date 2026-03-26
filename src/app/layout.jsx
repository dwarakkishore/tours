import "./globals.css";
import { Poppins, Great_Vibes } from "next/font/google";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import ScrollReset from "@/components/ScrollReset";
import { Suspense } from "react";

import Metrics from "@/components/Metrics";
import ClientProviders from "@/components/ClientProviders";
import { DEFAULT_URL } from "@/config";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import LayoutWrapper from "@/components/LayoutWrapper";
import FooterWrapper from "@/components/layouts/FooterWrapper";
import TaboolaPixel from "@/components/TaboolaPixel";
import { Analytics } from '@vercel/analytics/next';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Bayard Vacations | Customized Travel Packages for Every Explorer",
    template: "%s | Bayard Vacations",
  },
  description:
    "Discover tailored travel experiences with Bayard Vacations. From romantic getaways and group adventures to family trips and solo expeditions, we craft journeys that cater to your unique interests.",
  keywords:
    "Customized travel packages, romantic getaways, group adventures, family vacations, solo expeditions, cultural tours, adventure travel, travel agency, vacation packages",
  authors: [{ name: "Bayard Vacations" }],
  creator: "Bayard Vacations",
  publisher: "Bayard Vacations",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(DEFAULT_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: DEFAULT_URL,
    title: "Bayard Vacations | Customized Travel Packages for Every Explorer",
    description:
      "Discover tailored travel experiences with Bayard Vacations. From romantic getaways and group adventures to family trips and solo expeditions.",
    siteName: "Bayard Vacations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayard Vacations | Customized Travel Packages for Every Explorer",
    description:
      "Discover tailored travel experiences with Bayard Vacations. From romantic getaways and group adventures to family trips and solo expeditions.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="128x128" />
        
        {/* Performance: Preconnect to critical origins */}
        <link rel="preconnect" href="https://cdn.bayardvacations.com" />
        <link rel="preconnect" href="https://bayard-43e94.firebaseapp.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://o4509820841295872.ingest.de.sentry.io" />

        {/* DNS Prefetch fallbacks */}
        <link rel="dns-prefetch" href="https://cdn.bayardvacations.com" />
        <link rel="dns-prefetch" href="https://bayard-43e94.firebaseapp.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <Metrics />
      <body
        className={`${poppins.variable} ${greatVibes.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* Instant CSS-only Splash Screen */}
        <div id="bayard-splash-screen" suppressHydrationWarning style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: 'linear-gradient(135deg, #ffffff 0%, #fffbf2 25%, #fff7ed 50%, #fffbf2 75%, #ffffff 100%)',
          backgroundSize: '400% 400%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out, visibility 0.8s',
          fontFamily: 'var(--font-poppins), sans-serif',
          animation: 'splash-gradientShift 15s ease infinite',
        }}>
          <style dangerouslySetInnerHTML={{ __html: `
            :root {
              --primary-blue: #1e40af;
              --secondary-blue: #3b82f6;
              --accent-cyan: #06b6d4;
              --accent-gold: #fbbf24;
            }
            #bayard-splash-screen.fade-out {
              opacity: 0 !important;
              transform: scale(1.1);
              visibility: hidden;
            }
            @keyframes splash-gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            
            /* Background Elements */
            .splash-bg-waves { position: absolute; width: 100%; height: 100%; overflow: hidden; inset: 0; pointer-events: none; }
            .splash-wave { position: absolute; width: 200%; height: 200%; opacity: 0.15; }
            .splash-wave-1 { background: linear-gradient(135deg, transparent 40%, var(--primary-blue) 60%); top: -50%; left: -50%; animation: splash-waveRotate 20s linear infinite; }
            .splash-wave-2 { background: linear-gradient(225deg, transparent 40%, var(--accent-cyan) 60%); bottom: -50%; right: -50%; animation: splash-waveRotate 25s linear infinite reverse; }
            @keyframes splash-waveRotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

            /* Floating Shapes */
            .splash-shape { position: absolute; opacity: 0.25; animation: splash-float 20s ease-in-out infinite; filter: saturate(1.2); }
            .splash-circle { width: 150px; height: 150px; border-radius: 50%; background: linear-gradient(135deg, #1e40af, #0891b2); top: 10%; right: 15%; animation: splash-float 15s ease-in-out infinite; }
            .splash-square { width: 120px; height: 120px; background: linear-gradient(135deg, #1e3a8a, #1d4ed8); bottom: 15%; left: 10%; transform: rotate(45deg); animation: splash-float 18s ease-in-out infinite 2s; }
            .splash-triangle { width: 0; height: 0; border-left: 80px solid transparent; border-right: 80px solid transparent; border-bottom: 140px solid rgba(29, 78, 216, 0.3); top: 60%; right: 20%; animation: splash-float 22s ease-in-out infinite 4s; }
            @keyframes splash-float {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              25% { transform: translateY(-30px) rotate(5deg); }
              50% { transform: translateY(-15px) rotate(-5deg); }
              75% { transform: translateY(-40px) rotate(3deg); }
            }

            /* Corner Frames */
            .splash-corner-frame { position: absolute; width: 100px; height: 100px; z-index: 5; animation: splash-cornerGlow 2s ease-in-out infinite; }
            .splash-corner-frame::before, .splash-corner-frame::after { content: ''; position: absolute; background: linear-gradient(135deg, var(--secondary-blue), var(--accent-cyan)); opacity: 0.3; }
            .splash-corner-tl { top: 2rem; left: 2rem; }
            .splash-corner-tl::before { top: 0; left: 0; width: 4px; height: 50px; }
            .splash-corner-tl::after { top: 0; left: 0; width: 50px; height: 4px; }
            .splash-corner-tr { top: 2rem; right: 2rem; }
            .splash-corner-tr::before { top: 0; right: 0; width: 4px; height: 50px; }
            .splash-corner-tr::after { top: 0; right: 0; width: 50px; height: 4px; }
            .splash-corner-bl { bottom: 2rem; left: 2rem; }
            .splash-corner-bl::before { bottom: 0; left: 0; width: 4px; height: 50px; }
            .splash-corner-bl::after { bottom: 0; left: 0; width: 50px; height: 4px; }
            .splash-corner-br { bottom: 2rem; right: 2rem; }
            .splash-corner-br::before { bottom: 0; right: 0; width: 4px; height: 50px; }
            .splash-corner-br::after { bottom: 0; right: 0; width: 50px; height: 4px; }
            @keyframes splash-cornerGlow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

            /* Content */
            .splash-logo-container { margin-bottom: 3rem; animation: splash-logoEntrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative; text-align: center; }
            @keyframes splash-logoEntrance { 0% { opacity: 0; transform: translateY(40px) scale(0.8); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
            
            .splash-logo-decoration { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; }
            .splash-deco-circle { position: absolute; border-radius: 50%; border: 2px solid rgba(30, 64, 175, 0.2); animation: splash-pulse 3s ease-in-out infinite; left: 50%; top: 50%; transform: translate(-50%, -50%); }
            .splash-deco-circle-1 { width: 200px; height: 200px; animation-delay: 0s; }
            .splash-deco-circle-2 { width: 250px; height: 250px; animation-delay: 0.5s; }
            .splash-deco-circle-3 { width: 300px; height: 300px; animation-delay: 1s; }
            @keyframes splash-pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; } 50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.4; } }

            .splash-logo-icon { width: 140px; height: 140px; margin: 0 auto 2rem; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%); border-radius: 30px; display: flex; align-items: center; justify-content: center; box-shadow: 0 20px 60px rgba(30, 64, 175, 0.3), 0 0 0 10px rgba(255, 255, 255, 0.1), 0 0 0 20px rgba(255, 255, 255, 0.05); position: relative; animation: splash-iconFloat 4s ease-in-out infinite; z-index: 10; }
            .splash-logo-icon::before { content: ''; position: absolute; inset: -3px; background: linear-gradient(135deg, #3b82f6, #06b6d4, #fbbf24); border-radius: 30px; opacity: 0.3; filter: blur(10px); animation: splash-glowPulse 2s ease-in-out infinite; z-index: -1; }
            @keyframes splash-iconFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
            @keyframes splash-glowPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }

            .splash-brand-name { font-family: var(--font-poppins), sans-serif; font-size: clamp(3rem, 8vw, 5.5rem); font-weight: 700; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: 0.02em; margin-bottom: 0.5rem; line-height: 1.1; text-shadow: 0 4px 20px rgba(30, 64, 175, 0.2); animation: splash-textShimmer 3s linear infinite; background-size: 200% auto; }
            @keyframes splash-textShimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
            
            .splash-tagline { font-family: var(--font-poppins), sans-serif; font-size: clamp(1rem, 1.5vw, 1.25rem); font-weight: 500; color: #1e293b; letter-spacing: 0.05em; margin-bottom: 4rem; animation: splash-taglineEntrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both; }
            @keyframes splash-taglineEntrance { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }

            .splash-loading-section { animation: splash-loadingEntrance 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both; }
            @keyframes splash-loadingEntrance { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
            .splash-loading-text { font-family: var(--font-poppins), sans-serif; font-size: 1rem; font-weight: 600; color: #1e293b; letter-spacing: 0.05em; margin-bottom: 1.5rem; }
            
            .splash-progress-container { width: 350px; height: 6px; background: rgba(30, 64, 175, 0.1); margin: 0 auto; border-radius: 10px; overflow: hidden; position: relative; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); }
            .splash-progress-bar { height: 100%; background: linear-gradient(90deg, #1e40af 0%, #3b82f6 25%, #06b6d4 50%, #fbbf24 75%, #3b82f6 100%); background-size: 300% 100%; border-radius: 10px; animation: splash-progressFill 2.5s cubic-bezier(0.65, 0, 0.35, 1) forwards, splash-progressShimmer 2s linear infinite; box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(6, 182, 212, 0.3); position: relative; width: 0%; }
            .splash-progress-bar::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 50%; background: linear-gradient(180deg, rgba(255,255,255,0.3), transparent); border-radius: 10px 10px 0 0; }
            @keyframes splash-progressFill { 0% { width: 0%; } 100% { width: 100%; } }
            @keyframes splash-progressShimmer { 0% { background-position: 300% center; } 100% { background-position: -300% center; } }
            
            .splash-journey-text { margin-top: 2.5rem; font-family: var(--font-poppins), sans-serif; font-size: clamp(1rem, 2vw, 1.125rem); font-weight: 400; color: #64748b; font-style: italic; letter-spacing: 0.03em; animation: splash-journeyPulse 3s ease-in-out infinite; }
            @keyframes splash-journeyPulse { 0%, 100% { opacity: 0.6; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-3px); } }

            .splash-particle { position: absolute; background: white; border-radius: 50%; opacity: 0.6; pointer-events: none; animation: splash-particleRise 12s linear infinite; }
            @keyframes splash-particleRise { 0% { transform: translateY(100vh) scale(0); opacity: 0; } 100% { transform: translateY(-100px) scale(1); opacity: 0; } }

            @media (max-width: 768px) {
              .splash-corner-frame, .splash-shape, .splash-deco-circle { display: none; }
              .splash-progress-container { width: 280px; }
              .splash-logo-icon { width: 110px; height: 110px; }
            }
          `}} />

          {/* Background Elements */}
          <div className="splash-bg-waves">
            <div className="splash-wave splash-wave-1"></div>
            <div className="splash-wave splash-wave-2"></div>
          </div>
          
          <div className="splash-shape splash-circle"></div>
          <div className="splash-shape splash-square"></div>
          <div className="splash-shape splash-triangle"></div>
          
          <div id="splash-particles" className="splash-particles-container" aria-hidden="true">
            {[...Array(20)].map((_, i) => {
              const width = Math.random() * 4 + 2;
              const left = Math.random() * 100;
              const delay = Math.random() * 12;
              const duration = Math.random() * 8 + 10;
              return (
                <div
                  key={i}
                  className="splash-particle"
                  style={{
                    width: `${width}px`,
                    height: `${width}px`,
                    left: `${left}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`
                  }}
                />
              );
            })}
          </div>

          <div className="splash-corner-frame splash-corner-tl"></div>
          <div className="splash-corner-frame splash-corner-tr"></div>
          <div className="splash-corner-frame splash-corner-bl"></div>
          <div className="splash-corner-frame splash-corner-br"></div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '750px', padding: '3rem' }}>
            <div className="splash-logo-container">
              <div className="splash-logo-decoration">
                <div className="splash-deco-circle splash-deco-circle-1"></div>
                <div className="splash-deco-circle splash-deco-circle-2"></div>
                <div className="splash-deco-circle splash-deco-circle-3"></div>
              </div>

              <div className="splash-logo-icon">
                <img src="/flashscreenlogo.png" alt="Bayard Vacations" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
              </div>
              
              <div className="splash-brand-name">
                <span style={{ display: 'block', fontWeight: 800 }}>Bayard</span>
                <span style={{ fontSize: '0.55em', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Vacations</span>
              </div>
            </div>
            
            <p className="splash-tagline">Curating Unforgettable Journeys</p>

            <div className="splash-loading-section">
              <p className="splash-loading-text">Initialising Journeys...</p>
              <div className="splash-progress-container">
                <div className="splash-progress-bar"></div>
              </div>
              <p className="splash-journey-text">Every journey deserves to feel personal</p>
            </div>
          </div>

          <script dangerouslySetInnerHTML={{ __html: `
            // Remove splash screen
            setTimeout(function() {
              var s = document.getElementById("bayard-splash-screen");
              if (s) {
                s.classList.add('fade-out');
                setTimeout(function() {
                  s.style.display = 'none';
                }, 800);
              }
            }, 3500);
          `}} />
        </div>

        <ClientProviders>
          <ScrollReset />
          <LayoutWrapper 
            footer={
              <Suspense fallback={<div className="h-64 bg-slate-900 animate-pulse" />}>
                <FooterWrapper />
              </Suspense>
            }
          >
            {children}
          </LayoutWrapper>
          <SonnerToaster />
          <RadixToaster />
        </ClientProviders>
        <TaboolaPixel />
        <TailwindIndicator />
        <Analytics />
      </body>
    </html>
  );
}
