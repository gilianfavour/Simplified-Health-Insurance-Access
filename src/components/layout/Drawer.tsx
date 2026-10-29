'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import { IconLogo, IconClose, IconChevronRight } from '@/components/ui/Icons';

const NAV_LINKS = [
  { key: 'nav.home',     href: '/' },
  { key: 'nav.plans',    href: '/plans' },
  { key: 'nav.compare',  href: '/compare' },
  { key: 'nav.guide',    href: '/guide' },
  { key: 'nav.enrol',    href: '/enrol' },
  { key: 'nav.insurers', href: '/insurers' },
  { key: 'nav.about',    href: '/about' },
  { key: 'nav.contact',  href: '/contact' },
];

export function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useApp();
  const t = makeT(lang);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div
        className={`drawer-back${open ? ' is-open' : ''}`}
        id="drawerBack"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`drawer${open ? ' is-open' : ''}`}
        id="drawer"
        aria-label="Menu"
        aria-hidden={!open}
      >
        <div className="drawer__head">
          <span className="logo">
            <span className="logo__mark"><IconLogo /></span>
            <span className="logo__text">
              <span className="logo__name">HealthCover</span>
              <span className="logo__sub">Uganda</span>
            </span>
          </span>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Close menu">
            <IconClose />
          </button>
        </div>
        <nav>
          {NAV_LINKS.map(({ key, href }) => (
            <Link key={href} href={href} onClick={onClose}>
              {t(key)}<IconChevronRight />
            </Link>
          ))}
        </nav>
        <hr />
        <nav>
          <Link href="/privacy" onClick={onClose}>{t('privacy.title')}<IconChevronRight /></Link>
          <Link href="/disclaimer" onClick={onClose}>{t('disclaimer.title')}<IconChevronRight /></Link>
        </nav>
      </aside>
    </>
  );
}
