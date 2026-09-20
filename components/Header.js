'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  RiMenuLine,
  RiCloseLine,
  RiSunLine,
  RiMoonLine,
} from '@remixicon/react';
import { personalInfo, navigations } from '@/website.config';

/** Trailing slashes differ between dev and the exported build. */
function normalise(path) {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  const current = normalise(pathname);
  const isHome = current === '/';

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isDark = resolvedTheme === 'dark';

  const isActive = (route) => {
    const target = normalise(route.split('#')[0]);
    if (target === '/') return isHome;
    return current === target || current.startsWith(`${target}/`);
  };

  return (
    <>
      <header className="header-shell">
        <nav
          className="header-bar glass glass-sheen pointer-events-auto"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="header-brand"
            aria-current={isHome ? 'page' : undefined}
          >
            {personalInfo.name}
          </Link>

          <div className="header-actions">
            <div className="hidden sm:flex items-center gap-1">
              {navigations.map((item) => {
                const active = isActive(item.route);
                return (
                  <Link
                    key={item.name}
                    href={item.route}
                    className="nav-link"
                    data-active={active ? 'true' : undefined}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="nav-link nav-icon"
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
              className="nav-link nav-icon sm:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <RiCloseLine size={16} /> : <RiMenuLine size={16} />}
            </button>
          </div>
        </nav>
      </header>

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
                data-active={isActive(item.route) ? 'true' : undefined}
                style={
                  isActive(item.route) ? { color: 'var(--accent)' } : undefined
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
