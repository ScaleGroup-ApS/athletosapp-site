import { Link } from 'react-router';

const LINKS = {
  produkt: [
    { label: 'Funktioner', to: '/tjenester' },
    { label: 'Priser', to: '/#pricing' },
    { label: 'Download', to: '/#download' },
  ],
  selskab: [
    { label: 'Om os', to: '/om-os' },
    { label: 'Karriere', to: '/karriere' },
    { label: 'Kontakt', to: '/kontakt' },
  ],
  ressourcer: [
    { label: 'Vidensbase', to: '/support' },
    { label: 'Blog', to: '/blog' },
    { label: 'Privatlivspolitik', to: '/privatliv' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-surface-2)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '2.25rem', height: '2.25rem',
                borderRadius: '0.625rem',
                background: 'var(--gradient-main)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(124,75,242,0.35)',
                flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" fill="white"/>
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-text)' }}>
                AthletoS
              </span>
            </Link>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.75, maxWidth: '240px' }}>
              Fremtidens atletpræstation begynder med data, indsigt og de rigtige værktøjer.
            </p>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.8125rem', marginTop: '1rem' }}>
              SYNCRONET ApS · CVR: 12345678
            </p>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: 'var(--color-text)',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                marginBottom: '1.25rem',
              }}>
                {heading.charAt(0).toUpperCase() + heading.slice(1)}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {items.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="link-anim"
                      style={{ color: 'var(--color-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
            © {new Date().getFullYear()} SYNCRONET ApS. Alle rettigheder forbeholdes.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { href: 'https://www.instagram.com', label: 'Instagram' },
              { href: 'https://www.linkedin.com', label: 'LinkedIn' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-anim"
                style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
