import React from 'react';
import { motion } from 'framer-motion';

export function HeroSection({ title, subtitle, primaryCtaHref = '/kontakt', secondaryCtaHref = '/kontakt' }: { title?: string; subtitle?: string; primaryCtaHref?: string; secondaryCtaHref?: string }) {
  return (
    <section className="hero-viewport relative overflow-hidden flex items-center" style={{ minHeight: '80vh' }}>
      {/* animated gradient mesh background */}
      <div className="absolute inset-0 bg-animated-gradient" aria-hidden></div>

      {/* subtle decorative SVG nodes */}
      <svg className="absolute left-[-10%] top-0 opacity-30 animate-float" width="520" height="520" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="120" cy="120" r="200" fill="url(#g3)" />
        <defs>
          <radialGradient id="g3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 120) rotate(90) scale(200)">
            <stop offset="0" stopColor="#2563EB" stopOpacity="0.18" />
            <stop offset="1" stopColor="#0B1220" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-6 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="pt-12 md:pt-24">
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight font-extrabold tracking-tight text-white mb-6">
              {title ?? 'Synkroniser sportsdata. Gør det hurtigt. Gør det korrekt.'}
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mb-8 leading-relaxed">
              {subtitle ?? 'Athletos Starter fra SYNCRONET ApS er en produkt-først løsning til teams og apps der har brug for præcis, lav-latency data-synkronisering. Klar til produktion og bygget til skala.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href={primaryCtaHref} className="btn-primary inline-flex items-center px-5 py-3 rounded-md font-medium shadow-md hover:translate-y-[-2px] transition-transform duration-200">
                Kom i gang
              </a>
              <a href={secondaryCtaHref} className="inline-flex items-center px-5 py-3 rounded-md border border-white/10 text-white/90 hover:bg-white/5 transition">
                Kontakt os
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              <div className="card-glass p-4">
                <div className="text-2xl font-bold text-gradient">99.99%</div>
                <div className="text-sm text-muted">Oppetid</div>
              </div>
              <div className="card-glass p-4">
                <div className="text-2xl font-bold text-gradient"><span style={{ color: 'var(--color-accent)' }}>0.2s</span></div>
                <div className="text-sm text-muted">Median latens</div>
              </div>
              <div className="card-glass p-4">
                <div className="text-2xl font-bold text-gradient">Skalerbar</div>
                <div className="text-sm text-muted">Til vækst</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative hidden lg:flex items-center justify-center">
            {/* illustrative sync mesh (SVG) */}
            <div className="w-full max-w-md p-8 card-glass shadow-xl" style={{ borderRadius: '16px' }}>
              <svg viewBox="0 0 360 240" width="100%" height="160" aria-hidden>
                <defs>
                  <linearGradient id="lg1" x1="0" x2="1">
                    <stop offset="0" stopColor="#2563EB" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#22C55E" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="360" height="240" rx="12" fill="#0B1220" />
                <g stroke="url(#lg1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
                  <path d="M40 200 C80 140 140 160 180 120 C220 80 300 60 320 40" strokeOpacity="0.18" />
                  <circle cx="60" cy="180" r="6" fill="#22C55E" />
                  <circle cx="140" cy="150" r="6" fill="#2563EB" />
                  <circle cx="220" cy="110" r="6" fill="#22C55E" />
                </g>
              </svg>

              <div className="mt-4 text-sm text-muted">Illustration: real-time synkronisering, datapunkter og pulserende netværk.</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* overlay gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" aria-hidden></div>
    </section>
  );
}
