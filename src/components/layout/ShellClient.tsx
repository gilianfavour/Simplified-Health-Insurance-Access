'use client';

import { useState } from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { Drawer } from './Drawer';
import { GlossarySheet } from './GlossarySheet';
import { CompareTray } from './CompareTray';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';

export function ShellClient({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { lang } = useApp();
  const t = makeT(lang);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader onMenuOpen={() => setDrawerOpen(true)} />
      {lang !== 'en' && (
        <div className="container">
          <div className="lang-notice">
            <span>{t('lang.notice')}</span>
          </div>
        </div>
      )}
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <GlossarySheet />
      <CompareTray />
    </>
  );
}
