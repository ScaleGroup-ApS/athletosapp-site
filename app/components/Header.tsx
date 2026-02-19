import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export type MenuItem = { title: string; url: string };

export function Header({ siteName, menuItems = [] }: { siteName: string; menuItems?: MenuItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm" style={{ background: 'linear-gradient(180deg, rgba(11,18,32,0.7), rgba(11,18,32,0.55))', borderBottom: '1px solid var(--color-divider)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect width="48" height="48" rx="10" fill="url(#g)" />
              <path d="M12 30L20 18L32 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#2DD4BF" />
                  <stop offset="1" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-semibold text-lg md:text-xl tracking-tight" style={{ color: 'var(--color-text)' }}>{siteName}</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link key={item.title} to={item.url} className="text-sm font-medium text-muted hover:text-white transition-colors">
              {item.title}
            </Link>
          ))}

          <Link to="/kontakt" className="btn-primary inline-flex items-center px-4 py-2 text-sm rounded-md shadow-sm hover:scale-[1.02] transition-transform duration-200">
            Kom i gang
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden">
          <button onClick={() => setOpen((s) => !s)} aria-label="Menu" className="p-2 rounded-md border border-transparent hover:border-white/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M4 7H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="md:hidden border-t border-divider">
            <div className="px-6 pt-4 pb-6 flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link key={item.title} to={item.url} onClick={() => setOpen(false)} className="py-2 px-3 rounded-md text-white/90 hover:bg-white/5 transition">
                  {item.title}
                </Link>
              ))}
              <Link to="/kontakt" onClick={() => setOpen(false)} className="btn-primary block text-center py-2 px-3 rounded-md">
                Kom i gang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
