import React from 'react';
import { Header } from '~/components/Header';
import { Footer } from '~/components/Footer';
import { HeroSection } from '~/components/HeroSection';
import { Section } from '~/components/Section';
import { getFrontPage, getSiteInfo } from '~/lib/wp-api';
import { generateMeta } from '~/lib/seo';

export async function loader() {
  try {
    const [frontPage, siteInfo] = await Promise.all([getFrontPage(), getSiteInfo()]);
    return { frontPage, siteInfo };
  } catch (err) {
    // Return nulls to allow graceful fallback
    return { frontPage: null, siteInfo: null };
  }
}

export function meta({ data }: any) {
  // If ~/lib/seo isn't available, this will gracefully fail in SSR — expecting implementation in project
  try {
    return generateMeta(data?.frontPage, data?.siteInfo);
  } catch (e) {
    return {
      title: 'SYNCRONET ApS — Athletos Starter',
      description: 'Hurtig og præcis synkronisering af sportsdata. Kom i gang med Athletos Starter.'
    };
  }
}

export default function IndexRoute() {
  // In framework-mode React Router will inject loader data via hooks — for clarity, fallback to placeholders
  // We'll render a robust one-page layout with dansk tekst

  const siteName = 'SYNCRONET ApS';
  const siteDescription = 'Athletos Starter — hurtig, præcis og skalerbar sportsdata-synkronisering.';
  const menu = [
    { title: 'Om os', url: '/om-os' },
    { title: 'Ydelser', url: '/ydelser' },
    { title: 'Kontakt', url: '/kontakt' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header siteName={siteName} menuItems={menu} />

      <main className="flex-1">
        <HeroSection />

        <Section className="mt-12" variant="dark">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glass p-8 shadow-xl">
              <h3 className="text-xl font-semibold mb-2">Hvorfor Athletos?</h3>
              <p className="text-muted">Vi leverer pålidelig real-time synkronisering, nem integration og værktøjer til at skalere uden at ofre latenstid.</p>
            </div>
            <div className="card-glass p-8 shadow-xl">
              <h3 className="text-xl font-semibold mb-2">Starter-pakken</h3>
              <p className="text-muted">En hurtig indgang til produktionsklar synkronisering med overvågning, SLA og support til sport- og event-data.</p>
            </div>
            <div className="card-glass p-8 shadow-xl">
              <h3 className="text-xl font-semibold mb-2">Sikkerhed & drift</h3>
              <p className="text-muted">Kryptering, rollebaseret adgang og døgnovervågning sikrer kontinuerlig drift og dataintegritet.</p>
            </div>
          </div>
        </Section>

        <Section variant="gradient">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vores ydelser</h2>
            <p className="text-muted mb-10">Starter-pakken er målrettet teams der vil integrere sportsdata hurtigt med minimal overhead.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 card-glass">
                <div className="mb-4">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 3v18" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M3 12h18" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Real-time API</h4>
                <p className="text-sm text-muted">Lav-latency endpoints, webhook support og batch-synk.</p>
              </div>

              <div className="p-6 card-glass">
                <div className="mb-4">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="#2563EB" strokeWidth="1.6" />
                    <path d="M8 12h8" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Monitoring</h4>
                <p className="text-sm text-muted">Dashboards, alerts og SLA-rapporter for driftsteams.</p>
              </div>

              <div className="p-6 card-glass">
                <div className="mb-4">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 21h18" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M6 3v12" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Support & onboarding</h4>
                <p className="text-sm text-muted">Guidet integration og teknisk onboarding — vi hjælper med at komme hurtigt i gang.</p>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Om SYNCRONET ApS</h3>
              <p className="text-muted mb-4">SYNCRONET ApS bygger på års erfaring med realtime-synkronisering til sportsindustrien. Vi kombinerer robust backend, sikre integrationsmønstre og produktfokus i hver udgivelse.</p>
              <ul className="text-sm text-muted space-y-2">
                <li>• Specialiseret i sportsdata</li>
                <li>• Produkt-først udviklingsproces</li>
                <li>• Fokus på drift og support</li>
              </ul>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/2">
              <div className="p-6 card-glass">
                <h4 className="font-semibold mb-2">Kontakt os</h4>
                <form onSubmit={(e) => { e.preventDefault(); alert('Tak! Vi kontakter dig hurtigst muligt.'); }} className="space-y-3">
                  <input aria-label="Navn" placeholder="Navn" className="w-full p-3 rounded-md bg-black/20 border border-white/6" />
                  <input aria-label="Email" placeholder="Email" className="w-full p-3 rounded-md bg-black/20 border border-white/6" />
                  <textarea aria-label="Besked" placeholder="Besked" rows={4} className="w-full p-3 rounded-md bg-black/20 border border-white/6" />
                  <div className="flex items-center gap-3">
                    <button type="submit" className="btn-primary px-4 py-2 rounded-md">Send besked</button>
                    <a href="mailto:jonas.kerwin.hansen@gmail.com" className="text-sm text-muted">Eller skriv direkte</a>
                  </div>
                </form>

                <div className="mt-4 text-sm text-muted">
                  <div><strong>Telefon:</strong> +45 50 10 69 17</div>
                  <div><strong>Adresse:</strong> Servicevej 6, 4220 Korsør</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section variant="accent">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">Klar til at starte?</h3>
            <p className="text-muted mb-6">Kom i gang med Athletos Starter i dag — få demo og teknisk gennemgang.</p>
            <a href="/kontakt" className="btn-primary px-6 py-3 rounded-md">Book demo</a>
          </div>
        </Section>
      </main>

      <Footer siteName={siteName} siteDescription={siteDescription} />
    </div>
  );
}
