'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { RiMenuLine, RiCloseLine, RiSunLine, RiMoonLine } from '@remixicon/react';
import { personalInfo, navigations } from '@/website.config';

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // Lock the page while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className="header-pill glass glass-sheen pointer-events-auto relative flex items-center gap-1 rounded-full p-[7px] pl-2 overflow-hidden"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="nav-link !px-3 font-semibold tracking-[-0.02em] text-[13.5px]"
            style={{ color: 'var(--text)' }}
          >
            {initials(personalInfo.name)}
          </Link>

          {/* Slides in once the hero has receded */}
          <span
            className="pill-name text-[13.5px] font-semibold tracking-[-0.022em]"
            style={{ color: 'var(--text)' }}
            aria-hidden="true"
          >
            {personalInfo.name}
          </span>

          <div className="hidden sm:flex items-center gap-[2px]">
            {navigations.map((item) => (
              <Link key={item.name} href={item.route} className="nav-link">
                {item.name}
              </Link>
            ))}
            <a
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              CV
            </a>
          </div>

          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="nav-link !px-0 grid h-[30px] w-[30px] place-items-center rounded-full"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {mounted && isDark ? (
              <RiMoonLine size={15} />
            ) : (
              <RiSunLine size={15} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="nav-link !px-0 grid h-[30px] w-[30px] place-items-center rounded-full sm:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <RiCloseLine size={16} /> : <RiMenuLine size={16} />}
          </button>

          <span className="pill-progress" aria-hidden="true" />
        </nav>
      </header>

      {/* Mobile sheet */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(26px) saturate(180%)',
              WebkitBackdropFilter: 'blur(26px) saturate(180%)',
            }}
          />
          <div className="relative flex h-full flex-col items-center justify-center gap-3">
            {navigations.map((item) => (
              <Link
                key={item.name}
                href={item.route}
                className="text-2xl font-medium tracking-[-0.03em]"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-medium tracking-[-0.03em]"
            >
              CV
            </a>
          </div>
        </div>
      )}
    </>
  );
}
