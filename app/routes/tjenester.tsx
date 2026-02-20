import { useEffect, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

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

function MeshBlob({ color, size, top, left, right, bottom, animClass, opacity = 0.15, style }: {
  color: string; size: string; opacity?: number;
  top?: string; left?: string; right?: string; bottom?: string; animClass?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`mesh-blob ${animClass ?? 'animate-blob'} animate-glow-pulse`}
      style={{ width: size, height: size, background: color, top, left, right, bottom, opacity, ...style }}
    />
  );
}

const arrowIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14m-7-7 7 7-7 7"/>
  </svg>
);

/* Service blocks */
const services = [
  {
    id: 'ai-analyse',
    tag: 'AI & Maskinlæring',
    title: 'AI-drevet Præstationsanalyse',
    desc: 'Vores avancerede AI analyserer dine biometriske data — puls, kadence, VO2 max, søvn og restitution — for at give hyper-personlige og handlingsvenlige anbefalinger. Jo mere du bruger AthletoS, jo klogere bliver systemet om dig.',
    bullets: [
      'Realtidsanalyse af +40 biometriske parametre',
      'VO2 max estimering og tracking',
      'Søvn- og restitutionsvurdering',
      'Overtraining-detektion og advarsler',
    ],
    cta: 'Læs mere om Præstationsanalyse',
    visual: 'chart',
  },
  {
    id: 'traening',
    tag: 'Personalisering',
    title: 'Adaptive & Personlige Træningsplaner',
    desc: 'Træningsplaner, der kontinuerligt tilpasses i realtid baseret på dine fremskridt, dagsform og specifikke mål. Integrerer med eksterne træningsplatforme og dine foretrukne wearables for et komplet billede af din præstation.',
    bullets: [
      'Dynamisk planjustering baseret på din form',
      'Integration med Garmin, Apple Watch, Polar',
      'Periodisering og peak-performance timing',
      'Ernærings- og hydrationsanbefalinger',
    ],
    cta: 'Udforsk Personlige Planer',
    visual: 'plan',
  },
  {
    id: 'realtime',
    tag: 'Data & Sensorer',
    title: 'Realtidsdata & Udstyrs-Tracking',
    desc: 'Problemfri integration med dine sensorer og wearables giver live feedback under træning. AthletoS sporer desuden dine udstyrspecifikke data — fra slid på løbesko til cykelkomponenters ydeevne og vedligehold.',
    bullets: [
      'Live datafeed fra 200+ sensorer og wearables',
      'Udstyrssporing og vedligeholdelsespåmindelser',
      'GPS rute-analyse og miljøkorrigering',
      'Post-træning gennemgang og rapporter',
    ],
    cta: 'Se Datafunktioner',
    visual: 'sensors',
  },
  {
    id: 'faellesskab',
    tag: 'Fællesskab',
    title: 'Fællesskab & Professionelt Coach-Samarbejde',
    desc: 'Engagér dig med et globalt fællesskab af dedikerede atleter. Trænere kan nemt overvåge, analysere og vejlede alle deres atleter i realtid via en dedikeret coach-portal med avancerede analyseredskaber.',
    bullets: [
      'Globale udfordringer og ranglister',
      'Dedikeret coach-dashboard med live data',
      'Team-koordination og planlægning',
      'Privat messaging og videoanalyse',
    ],
    cta: 'Læs om Fællesskabsfunktioner',
    visual: 'community',
  },
];

/* Visual mockup per service */
function ServiceVisual({ type }: { type: string }) {
  const base: React.CSSProperties = {
    width: '100%',
    aspectRatio: '4/3',
    borderRadius: 'var(--radius-lg)',
    background: 'linear-gradient(135deg, rgba(124,75,242,0.1) 0%, rgba(15,106,198,0.08) 100%)',
    border: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  };

  if (type === 'chart') return (
    <div style={base}>
      <div style={{ width: '85%' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>AI Performance Score</div>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '100px', marginBottom: '1.5rem' }}>
          {[30,48,42,70,55,82,68,90,75,95].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`,
              borderRadius: '4px 4px 0 0',
              background: i >= 7 ? 'var(--gradient-main)' : `rgba(124,75,242,${0.15 + i * 0.03})`,
            }}/>
          ))}
        </div>
        {[
          { label: 'VO2 Max', val: '68.4', unit: 'ml/kg/min', pct: 84 },
          { label: 'HRV Score', val: '72', unit: 'ms', pct: 72 },
          { label: 'Træningsbelastning', val: '340', unit: 'ATL', pct: 60 },
        ].map(m => (
          <div key={m.label} style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{m.label}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>{m.val} <span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>{m.unit}</span></span>
            </div>
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
              <div style={{ height: '100%', width: `${m.pct}%`, background: 'var(--gradient-main)', borderRadius: '2px' }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === 'plan') return (
    <div style={base}>
      <div style={{ width: '85%' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Ugentlig Træningsplan</div>
        {['Mandag','Onsdag','Fredag','Lørdag'].map((day, i) => {
          const types = ['Zone 2 Løb','Styrketræning','Interval','Langtur'];
          const intensities = [65, 80, 95, 70];
          const colors = ['#7C4BF2','#0F6AC6','#E53E3E','#7C4BF2'];
          return (
            <div key={day} style={{ marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{ width: '70px', fontSize: '0.75rem', color: 'var(--color-muted)', flexShrink: 0 }}>{day}</div>
              <div style={{ flex: 1, height: '28px', background: `${colors[i]}22`, borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, width: `${intensities[i]}%`, background: `${colors[i]}44`, borderRadius: '4px' }}/>
                <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text)' }}>{types[i]}</span>
                </div>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, width: '35px', textAlign: 'right', flexShrink: 0 }}>{intensities[i]}%</div>
            </div>
          );
        })}
        <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(124,75,242,0.08)', borderRadius: '0.5rem', border: '1px solid rgba(124,75,242,0.2)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600 }}>AI Tilpasning aktiv</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>Planen justeres baseret på din HRV</div>
        </div>
      </div>
    </div>
  );

  if (type === 'sensors') return (
    <div style={base}>
      <div style={{ width: '85%' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Live Data Feed</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {[
            { label: 'Puls', val: '147', unit: 'bpm', color: '#E53E3E' },
            { label: 'Kadence', val: '184', unit: 'spm', color: '#7C4BF2' },
            { label: 'Effekt', val: '280', unit: 'W', color: '#0F6AC6' },
            { label: 'Pace', val: '4:12', unit: '/km', color: '#10B981' },
          ].map(m => (
            <div key={m.label} style={{
              background: `${m.color}14`,
              border: `1px solid ${m.color}33`,
              borderRadius: '0.5rem',
              padding: '0.625rem',
            }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-muted)', marginBottom: '0.2rem' }}>{m.label}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: m.color }}>
                {m.val}<span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--color-muted)', marginLeft: '0.2rem' }}>{m.unit}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '0.375rem' }}>Løbesko — Slid</div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px', marginBottom: '0.75rem' }}>
          <div style={{ height: '100%', width: '68%', background: 'linear-gradient(90deg, #10B981, #F59E0B)', borderRadius: '3px' }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--color-muted)' }}>342 km brugt</span>
          <span style={{ color: '#F59E0B', fontWeight: 500 }}>Skift anbefalet inden 158 km</span>
        </div>
      </div>
    </div>
  );

  // community
  return (
    <div style={base}>
      <div style={{ width: '85%' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Coach Dashboard</div>
        <div style={{ marginBottom: '1rem' }}>
          {['Emma K.','Marcus P.','Sofia R.'].map((name, i) => {
            const scores = [94, 78, 86];
            return (
              <div key={name} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.625rem 0.75rem', marginBottom: '0.5rem',
                background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem',
                border: '1px solid var(--color-border)',
              }}>
                <div style={{
                  width: '2rem', height: '2rem', borderRadius: '50%',
                  background: 'var(--gradient-main)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, color: 'white', flexShrink: 0,
                }}>
                  {name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text)' }}>{name}</div>
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', marginTop: '0.3rem' }}>
                    <div style={{ height: '100%', width: `${scores[i]}%`, background: 'var(--gradient-main)', borderRadius: '2px' }}/>
                  </div>
                </div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-accent)' }}>{scores[i]}</div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '0.75rem', background: 'rgba(15,106,198,0.1)', borderRadius: '0.5rem', border: '1px solid rgba(15,106,198,0.2)' }}>
          <div style={{ fontSize: '0.75rem', color: '#0F6AC6', fontWeight: 600 }}>🏆 Ugentlig Udfordring</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>127 deltagere · 3 dage tilbage</div>
        </div>
      </div>
    </div>
  );
}

/* Support bullets */
const supportBullets = [
  { icon: '⚡', label: '24/7 Premium Support', desc: 'Altid adgang til ekspert-support, uanset tidspunkt.' },
  { icon: '📚', label: 'Eksklusiv Vidensbase', desc: 'Dybtgående artikler, guider og videoer fra topatleter.' },
  { icon: '🎓', label: 'Personlige Webinars', desc: 'Live sessions med sportsforskere og elitecoaches.' },
  { icon: '👤', label: 'Dedikeret Account Manager', desc: 'En personlig kontaktperson til hold og organisationer.' },
];

/* ════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════ */
export default function Tjenester() {
  useReveal();

  return (
    <>
      <Header />

      {/* ══ SERVICES HERO ════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '9rem', paddingBottom: '6rem', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0A0F1B 0%, #0F0820 50%, #0A1528 100%)' }}/>
        <MeshBlob color="#7C4BF2" size="600px" top="-120px" left="-180px" opacity={0.18} animClass="animate-blob"/>
        <MeshBlob color="#0F6AC6" size="450px" bottom="-80px" right="-100px" opacity={0.15} animClass="animate-blob-2"/>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124,75,242,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,75,242,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)',
        }}/>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="badge-accent" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>Platform & Løsninger</span>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
            }}>
              <span className="text-gradient-main">Vores Tjenester:</span>
              <br/>Optimér Din Præstation
            </h1>
            <p style={{ color: 'var(--color-muted)', fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
              Oplev hele spektret af AthletoS' avancerede løsninger designet til at give dig en uovertruffen fordel og maksimere dit potentiale.
            </p>
          </motion.div>
        </div>
        <div className="section-fade-bottom"/>
      </section>

      {/* ══ SERVICE BLOCKS ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          {services.map((service, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={service.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '3.5rem',
                  alignItems: 'center',
                  marginBottom: '8rem',
                  position: 'relative',
                }}
              >
                {/* Visual — alternating side */}
                <div
                  className="reveal-scale"
                  style={{
                    order: isEven ? 0 : 1,
                    position: 'relative',
                    '--delay': `0s`,
                  } as React.CSSProperties}
                >
                  <ServiceVisual type={service.visual} />
                  {/* Subtle glow behind */}
                  <div style={{
                    position: 'absolute',
                    inset: '-20px',
                    background: 'radial-gradient(ellipse at center, rgba(124,75,242,0.12) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: -1,
                    pointerEvents: 'none',
                  }}/>
                </div>

                {/* Text */}
                <div
                  className="reveal"
                  style={{
                    order: isEven ? 1 : 0,
                    '--delay': '0.15s',
                  } as React.CSSProperties}
                >
                  <span className="badge-accent" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>{service.tag}</span>
                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.625rem, 3vw, 2.25rem)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.025em',
                    marginBottom: '1.25rem',
                    color: 'var(--color-text)',
                  }}>
                    <span className="text-gradient-main">{service.title.split(' ')[0]}</span>{' '}
                    {service.title.split(' ').slice(1).join(' ')}
                  </h2>
                  <p style={{ color: 'var(--color-muted)', fontSize: '1.0625rem', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                    {service.desc}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {service.bullets.map(b => (
                      <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--color-text)', fontSize: '0.9375rem' }}>
                        <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a href={`#${service.id}`} className="btn-outline-small">
                    {service.cta} {arrowIcon}
                  </a>
                </div>

                {/* Subtle section separator */}
                {i < services.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-4rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '1px',
                    height: '2rem',
                    background: 'linear-gradient(to bottom, var(--color-border), transparent)',
                  }}/>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ SUPPORT & RESSOURCER ═════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: '7rem 0', background: 'rgba(26,31,46,0.35)', overflow: 'hidden' }}>
        <MeshBlob color="#7C4BF2" size="500px" top="30%" left="-120px" opacity={0.1} animClass="animate-blob-2"/>
        <MeshBlob color="#0F6AC6" size="400px" bottom="0" right="-80px" opacity={0.09} animClass="animate-blob"/>

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem' }}>
            <span className="badge-accent" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>Din partner i succes</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              marginBottom: '1rem',
            }}>
              Mere end blot en app.{' '}
              <span className="text-gradient-main">Din partner i succes.</span>
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '1.0625rem', lineHeight: 1.75 }}>
              Adgang til premium support, en omfattende vidensbase, interaktive tutorials og eksklusive webinars. Vi er med dig hvert trin af vejen.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}>
            {supportBullets.map((b, i) => (
              <div
                key={b.label}
                className="card-surface reveal"
                style={{ '--delay': `${i * 0.1}s`, padding: '2rem' } as React.CSSProperties}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{b.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '1.0625rem',
                  color: 'var(--color-text)',
                  marginBottom: '0.625rem',
                }}>
                  {b.label}
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: 'center' }}>
            <a href="mailto:kontakt@syncronet.dk" className="btn-primary" style={{ marginRight: '1rem', marginBottom: '1rem' }}>
              Kontakt Salgsteamet {arrowIcon}
            </a>
            <a href="/support" className="btn-secondary">
              Se Support Center
            </a>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ═══════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: '8rem 0', overflow: 'hidden' }}>
        <MeshBlob color="#7C4BF2" size="600px" top="50%" left="50%" opacity={0.13} animClass="animate-blob"
          style={{ transform: 'translate(-50%,-50%)' } as CSSProperties}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <div className="reveal">
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.875rem, 3.5vw, 3rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
            }}>
              <span className="text-gradient-main">Klar til at starte?</span>
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '1.125rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              Download AthletoS i dag og oplev, hvorfor verdens bedste atleter vælger os.
            </p>
            <a href="/" className="btn-primary" style={{ fontSize: '1.0625rem', padding: '1.125rem 2.5rem' }}>
              Kom i gang gratis {arrowIcon}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
