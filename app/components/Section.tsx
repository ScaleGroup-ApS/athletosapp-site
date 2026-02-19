import React from 'react';
import clsx from 'clsx';

export function Section({ children, className = '', variant = 'light' }: { children: React.ReactNode; className?: string; variant?: 'light' | 'dark' | 'gradient' | 'accent' }) {
  const base = 'py-24 md:py-32';
  const variantClass = {
    light: 'bg-[transparent] text-white',
    dark: 'bg-[var(--color-secondary)] text-white',
    gradient: 'bg-animated-gradient text-white',
    accent: 'bg-[linear-gradient(90deg,var(--color-secondary),rgba(37,99,235,0.06))] text-white'
  }[variant];

  return (
    <section className={clsx(base, variantClass, className)}>
      <div className="max-w-7xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
