import { useEffect, useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

/* ────────── Intersection Observer Hook ────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-scale');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ────────── MeshBlob ────────── */
function MeshBlob({ color, size, top, left, right, bottom, animClass, opacity = 0.18, style }: {
  color: string; size: string; opacity?: number;
  top?: string; left?: string; right?: string; bottom?: string; animClass?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`mesh-blob ${animClass ?? 'animate-blob'} animate-glow-pulse`}
      style={{
        width: size, height: size,
        background: color,
        top, left, right, bottom,
        opacity,
        ...style,
      }}
    />
  );
}

/* ────────── Icon SVGs ────────── */
const icons = {
  bolt: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/>
    </svg>
  ),
  chart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/>
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  users: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  star: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  apple: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  ),
  android: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 0 0-.1521-.5676.416.416 0 0 0-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4461a.4161.4161 0 0 0-.5677-.1521.4157.4157 0 0 0-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396"/>
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-7-7 7 7-7 7"/>
    </svg>
  ),
};

/* ────────── Feature cards data ────────── */
const features = [
  {
    icon: icons.bolt,
    title: 'Præcisionsanalyse',
    desc: 'Dybdegående indblik i din fysiologi og præstation med vores avancerede AI-analysesystem.',
  },
  {
    icon: icons.chart,
    title: 'Adaptive Træningsplaner',
    desc: 'AI-genererede planer, der tilpasser sig din udvikling, restitution og mål i realtid.',
  },
  {
    icon: icons.shield,
    title: 'Fremskridtssporing',
    desc: 'Visualiser din udvikling over tid med intuitive grafer og fejr hver milepæl.',
  },
  {
    icon: icons.users,
    title: 'Fællesskab & Coaches',
    desc: 'Samarbejd med professionelle coaches og engagér dig med et fællesskab af dedikerede atleter.',
  },
];

/* ────────── Testimonials data ────────── */
const testimonials = [
  {
    quote: 'AthletoS har fuldstændig transformeret min træning. De personlige analyser er på et niveau, jeg aldrig har set før – selv ikke fra professionelle trænere.',
    name: 'Mads Holmberg',
    role: 'Professionel Triatlet',
    initials: 'MH',
    color: '#7C4BF2',
  },
  {
    quote: 'Som coach er det utroligt at have realtidsdata på alle mine atleters fremskridt. Det sparer mig timer og forbedrer vores resultater markant.',
    name: 'Sara Lindberg',
    role: 'Elite Sportscoach',
    initials: 'SL',
    color: '#0F6AC6',
  },
  {
    quote: 'Appen er smuk, hurtig og utrolig intuitiv. Men det er analyserne og de adaptive planer, der virkelig adskiller AthletoS fra alt andet på markedet.',
    name: 'Christian Bæk',
    role: 'Elite Cyklist, U23 Landshold',
    initials: 'CB',
    color: '#4A2B8F',
  },
];

/* ────────── Hero Video placeholder ────────── */
function HeroBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Gradient background simulating video */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #0A0F1B 0%, #1A0F2E 40%, #0A1F3B 100%)',
      }}/>
      {/* Mesh blobs */}
      <MeshBlob color="#7C4BF2" size="600px" top="-100px" left="-150px" opacity={0.22} animClass="animate-blob"/>
      <MeshBlob color="#0F6AC6" size="500px" top="100px" right="-100px" opacity={0.18} animClass="animate-blob-2"/>
      <MeshBlob color="#4A2B8F" size="400px" bottom="-80px" left="30%" opacity={0.15} animClass="animate-blob"/>

      {/* Animated grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(124,75,242,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,75,242,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
      }}/>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(124,75,242,0.35) 0%, rgba(15,106,198,0.35) 100%)',
      }}/>
    </div>
  );
}

/* ════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════ */
export default function Forside() {
  useReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <Header />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <motion.div style={{ y: parallaxY, position: 'absolute', inset: 0 }}>
          <HeroBackground />
        </motion.div>

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '7rem 1.5rem 5rem' }}>
          <motion.div style={{ opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto' }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                style={{ marginBottom: '1.75rem' }}
              >
                <span className="badge-accent">Fremtidens Fitness-Tech</span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.5rem',
                  color: 'var(--color-text)',
                }}
              >
                OPTIMÉR DIN PRÆSTATION.{' '}
                <span className="text-gradient-main">Oplev AthletoS.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  color: 'var(--color-muted)',
                  fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
                  lineHeight: 1.7,
                  maxWidth: '600px',
                  margin: '0 auto 2.5rem',
                }}
              >
                Revolutionér din træning med avanceret dataanalyse og personlig indsigt.
                Fremtidens atlet begynder her.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.8 }}
                style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <a href="#download" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.25rem' }}>
                  Start din gratis prøveperiode {icons.arrow}
                </a>
                <a href="/tjenester" className="btn-secondary" style={{ fontSize: '1rem', padding: '1rem 2.25rem' }}>
                  Se tjenester
                </a>
              </motion.div>

              {/* App store badges */}
              <motion.div
                id="download"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}
              >
                {[
                  { icon: icons.apple, label: 'App Store', sub: 'Download på' },
                  { icon: icons.android, label: 'Google Play', sub: 'Hent på' },
                ].map(store => (
                  <div
                    key={store.label}
                    className="glass"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--glow-accent)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'none';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                    }}
                  >
                    <span style={{ color: 'var(--color-text)' }}>{store.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-muted)' }}>{store.sub}</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)' }}>{store.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Fade bottom */}
        <div className="section-fade-bottom"/>
      </section>

      {/* ══ USP / INTRO ══════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: '8rem 0', overflow: 'hidden' }}>
        <MeshBlob color="#7C4BF2" size="500px" top="0" right="-120px" opacity={0.1} animClass="animate-blob-2"/>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* Left: Visual */}
            <div className="reveal-scale" style={{ position: 'relative' }}>
              <div
                className="glass gradient-border"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, rgba(124,75,242,0.12) 0%, rgba(15,106,198,0.1) 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Stylized app interface mockup */}
                <div style={{ padding: '2rem', width: '100%' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Ugentlig Ydeevne</div>
                    <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'flex-end', height: '60px' }}>
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${h}%`,
                            borderRadius: '4px 4px 0 0',
                            background: i === 5
                              ? 'var(--gradient-main)'
                              : 'rgba(124,75,242,0.25)',
                            transition: 'height 0.3s ease',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {[
                    { label: 'VO2 Max', value: '68.4 ml/kg', pct: 82 },
                    { label: 'Restitution', value: '94%', pct: 94 },
                    { label: 'Søvnkvalitet', value: '8.2 timer', pct: 76 },
                  ].map(m => (
                    <div key={m.label} style={{ marginBottom: '0.875rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{m.label}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>{m.value}</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
                        <div style={{ height: '100%', width: `${m.pct}%`, background: 'var(--gradient-main)', borderRadius: '2px' }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating card */}
              <div
                className="glass animate-float"
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem', right: '-1.5rem',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-deep)',
                  minWidth: '160px',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>AI Anbefaling</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-text)' }}>Reducér intensitet</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-accent)', marginTop: '0.2rem' }}>Restitution nødvendig</div>
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <div className="reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                <span className="badge-accent" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>Din fordel</span>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  marginBottom: '1.25rem',
                }}>
                  Lås op for dit{' '}
                  <span className="text-gradient-main">fulde potentiale.</span>
                </h2>
                <p style={{ color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1.0625rem' }}>
                  AthletoS kombinerer avanceret maskinlæring med fysiologisk ekspertise for at give dig den mest præcise og personlige træningsindsigt på markedet.
                </p>
                <p style={{ color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.0625rem' }}>
                  Personlig indsigt, der forvandler rå data til handlingsvenlig viden – og optimerer din træning og restitution som aldrig før.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {[
                    'AI-drevet træningsoptimering',
                    'Realtidsdata & biofeedback',
                    'Avanceret fremskridtssporing',
                    'Fællesskabsfunktioner',
                  ].map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text)', fontSize: '0.9375rem' }}>
                      <span style={{ color: 'var(--color-accent)', flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/tjenester" className="btn-primary">
                  Udforsk tjenester {icons.arrow}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CORE FEATURES ════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: '8rem 0', background: 'rgba(26,31,46,0.4)', overflow: 'hidden' }}>
        <MeshBlob color="#0F6AC6" size="600px" bottom="-100px" left="-150px" opacity={0.1} animClass="animate-blob"/>
        <MeshBlob color="#7C4BF2" size="400px" top="-60px" right="10%" opacity={0.08} animClass="animate-blob-2"/>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem' }}>
            <span className="badge-accent" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>Kernefunktioner</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              marginBottom: '1rem',
            }}>
              Innovativ teknologi.{' '}
              <span className="text-gradient-main">Uovertrufne resultater.</span>
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '1.0625rem', lineHeight: 1.7 }}>
              Hver funktion er designet med ét mål: at bringe dig tættere på din absolut bedste præstation.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className="card-surface reveal gradient-border"
                style={{ '--delay': `${i * 0.1}s`, padding: '2rem' } as React.CSSProperties}
              >
                <div className="icon-box" style={{ marginBottom: '1.5rem' }}>
                  <span style={{ color: 'var(--color-accent)' }}>{f.icon}</span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '1.125rem',
                  marginBottom: '0.75rem',
                  color: 'var(--color-text)',
                }}>
                  {f.title}
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: '8rem 0', overflow: 'hidden' }}>
        <MeshBlob color="#4A2B8F" size="500px" top="50%" left="-120px" opacity={0.12} animClass="animate-blob-2"/>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 4rem' }}>
            <span className="badge-accent" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>Social Proof</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
            }}>
              Hvad atleter og{' '}
              <span className="text-gradient-main">trænere siger.</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="card-surface reveal"
                style={{ '--delay': `${i * 0.12}s`, padding: '2rem', position: 'relative' } as React.CSSProperties}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem', color: '#F59E0B' }}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <span key={si}>{icons.star}</span>
                  ))}
                </div>

                <blockquote style={{
                  color: 'var(--color-text)',
                  fontSize: '0.9375rem',
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  marginBottom: '1.75rem',
                  quotes: '"\u201C" "\u201D"',
                }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{
                    width: '3.25rem', height: '3.25rem',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${t.color}, var(--color-accent-2))`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'white',
                    flexShrink: 0,
                    border: '2px solid rgba(124,75,242,0.3)',
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9375rem' }}>{t.name}</div>
                    <div style={{ color: 'var(--color-muted)', fontSize: '0.8125rem', marginTop: '0.125rem' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ════════════════════════════════════════════════════════ */}
      <section
        id="cta"
        style={{
          position: 'relative',
          padding: '8rem 0',
          overflow: 'hidden',
          background: 'rgba(26,31,46,0.3)',
        }}
      >
        <MeshBlob color="#7C4BF2" size="700px" top="50%" left="50%" opacity={0.14} animClass="animate-blob"
          style={{ transform: 'translate(-50%, -50%)' } as CSSProperties}
        />
        <MeshBlob color="#0F6AC6" size="400px" bottom="0" right="5%" opacity={0.1} animClass="animate-blob-2"/>

        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="reveal">
            <span className="badge-accent" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Kom i gang i dag</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
            }}>
              <span className="text-gradient-main">Klar til at tage din træning</span>
              <br />
              til det næste niveau?
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '1.125rem', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '540px', margin: '0 auto 2.5rem' }}>
              Tilmeld dig i dag og oplev, hvordan AthletoS kan transformere din præstation og bringe dig tættere på dine mål.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#download" className="btn-primary" style={{ fontSize: '1.0625rem', padding: '1.125rem 2.5rem' }}>
                Kom i gang nu {icons.arrow}
              </a>
              <a href="/tjenester" className="btn-secondary" style={{ fontSize: '1.0625rem', padding: '1.125rem 2.5rem' }}>
                Se alle tjenester
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
