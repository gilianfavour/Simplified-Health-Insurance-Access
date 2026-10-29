'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT, LANGS } from '@/lib/i18n';
import { IconLogo, IconGlobe, IconChevronDown, IconMenu } from '@/components/ui/Icons';

const NAV_LINKS = [
  { key: 'nav.home',    href: '/' },
  { key: 'nav.plans',   href: '/plans' },
  { key: 'nav.compare', href: '/compare' },
  { key: 'nav.guide',   href: '/guide' },
  { key: 'nav.enrol',   href: '/enrol' },
  { key: 'nav.insurers',href: '/insurers' },
  { key: 'nav.contact', href: '/contact' },
];

export function SiteHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  const { lang, compare, setLang } = useApp();
  const t = makeT(lang);

  return (
    <header className="header">
      <div className="header__inner">
        <Link className="logo" href="/" aria-label="HealthCover Uganda — home">
          <span className="logo__mark"><IconLogo /></span>
          <span className="logo__text">
            <span className="logo__name">HealthCover</span>
            <span className="logo__sub">Uganda</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          {NAV_LINKS.map(({ key, href }) => (
            <Link key={href} href={href}>
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="header__tools">
          <div className="lang">
            <span className="lang__icon"><IconGlobe /></span>
            <label className="sr-only" htmlFor="lang-sel">{t('lang.label')}</label>
            <select
              id="lang-sel"
              value={lang}
              onChange={e => setLang(e.target.value as typeof lang)}
              aria-label={t('lang.label')}
            >
              {LANGS.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <span className="lang__caret"><IconChevronDown /></span>
          </div>

          <Link className="cmp-pill" href="/compare">
            {t('nav.compare')}
            {compare.length > 0 && <span className="cmp-pill__count">{compare.length}</span>}
          </Link>

          <button
            className="icon-btn menu-btn"
            type="button"
            onClick={onMenuOpen}
            aria-label="Open menu"
            aria-expanded={false}
            aria-controls="drawer"
          >
            <IconMenu />
          </button>
        </div>
      </div>
    </header>
  );
}
