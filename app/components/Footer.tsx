import React from 'react';

export function Footer({ siteName, siteDescription }: { siteName: string; siteDescription?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-divider py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="48" height="48" rx="10" fill="url(#g2)" />
              <path d="M12 30L20 18L32 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#2DD4BF" />
                  <stop offset="1" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <div className="font-semibold">{siteName}</div>
              <div className="text-sm text-muted">{siteDescription ?? 'Digital produkt - Athletos Starter'}</div>
            </div>
          </div>
          <p className="text-sm text-muted max-w-sm">SYNCRONET ApS bygger hurtige, præcise og betroede løsninger til sportsdata og synkronisering. Vi prioriterer performance, sikkerhed og skalerbarhed.</p>
        </div>

        <div className="text-sm text-muted">
          <h4 className="text-sm font-semibold mb-3">Kontakt</h4>
          <ul className="space-y-2">
            <li>jonas.kerwin.hansen@gmail.com</li>
            <li>+45 50 10 69 17</li>
            <li>Servicevej 6, 4220 Korsør</li>
          </ul>
        </div>

        <div className="text-sm text-muted">
          <h4 className="text-sm font-semibold mb-3">Hurtige links</h4>
          <ul className="space-y-2">
            <li><a href="/ydelser" className="hover:underline">Vores ydelser</a></li>
            <li><a href="/om-os" className="hover:underline">Om os</a></li>
            <li><a href="/kontakt" className="hover:underline">Kontakt</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-divider pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted">
          <div>© {year} {siteName}. CVR: 00000000</div>
          <div className="mt-3 md:mt-0">Designet & udviklet for præcision og hastighed — Athletos Starter</div>
        </div>
      </div>
    </footer>
  );
}
