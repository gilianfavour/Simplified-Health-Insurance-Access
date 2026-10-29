'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import { IconLogo } from '@/components/ui/Icons';

export function SiteFooter() {
  const { lang } = useApp();
  const t = makeT(lang);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <IconLogo />
              <span className="logo__text">
                <span className="logo__name">HealthCover</span>
                <span className="logo__sub">Uganda</span>
              </span>
            </div>
            <p className="footer__note">{t('footer.disclaimer')}</p>
          </div>
          <div>
            <h3>{t('footer.platform')}</h3>
            <ul>
              <li><Link href="/plans">{t('nav.plans')}</Link></li>
              <li><Link href="/compare">{t('nav.compare')}</Link></li>
              <li><Link href="/enrol">{t('nav.enrol')}</Link></li>
              <li><Link href="/insurers">{t('nav.insurers')}</Link></li>
            </ul>
          </div>
          <div>
            <h3>{t('footer.information')}</h3>
            <ul>
              <li><Link href="/guide">{t('nav.guide')}</Link></li>
              <li><Link href="/about">{t('nav.about')}</Link></li>
              <li><Link href="/contact">{t('nav.contact')}</Link></li>
              <li><Link href="/privacy">{t('privacy.title')}</Link></li>
              <li><Link href="/disclaimer">{t('disclaimer.title')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 HealthCover Uganda — {t('footer.built')}</span>
          <span>{t('footer.noAccount')}</span>
        </div>
      </div>
    </footer>
  );
}
