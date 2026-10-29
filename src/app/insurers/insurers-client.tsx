'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import { INSURERS, PLANS, money, categoryLabel } from '@/lib/data';
import { DemoBanner, DemoPill } from '@/components/ui/DemoBanner';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactList } from '@/components/ui/ContactList';
import { IconSearch, IconQuestion } from '@/components/ui/Icons';

export function InsurersClient() {
  const { lang } = useApp();
  const t = makeT(lang);
  const [q, setQ] = useState('');

  const filtered = q.trim()
    ? INSURERS.filter((i) =>
        (i.name + ' ' + i.description).toLowerCase().includes(q.toLowerCase()),
      )
    : INSURERS;

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.insurers') }]} />
        <div style={{ margin: '22px 0 20px', maxWidth: 680 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4.4vw,2.5rem)' }}>{t('insurers.title')}</h1>
          <p className="muted" style={{ marginTop: 10 }}>{t('insurers.sub')}</p>
        </div>

        <div className="searchbar" style={{ maxWidth: 420, marginBottom: 18 }}>
          <IconSearch />
          <label className="sr-only" htmlFor="iq">{t('insurers.search')}</label>
          <input
            id="iq"
            type="search"
            value={q}
            placeholder={t('insurers.search')}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <DemoBanner />

        {filtered.length > 0 ? (
          <div className="ins-grid" style={{ marginTop: 20 }}>
            {filtered.map((ins) => {
              const products = PLANS.filter((p) => p.insurerId === ins.id);
              return (
                <article key={ins.id} className="ins-card">
                  <div className="ins-card__head">
                    <span className="ins-card__mark">{ins.initials}</span>
                    <div>
                      <h3>{ins.name}</h3>
                      <span className="ins-card__meta">
                        {t('insurers.lastVerified')}: {t('insurers.notVerified')}
                      </span>
                    </div>
                    <DemoPill />
                  </div>
                  <p className="ins-card__desc">{ins.description}</p>
                  <div>
                    <span className="field__label">
                      {t('insurers.products')} ({products.length})
                    </span>
                    <ul style={{ display: 'grid', gap: 6, marginTop: 6 }}>
                      {products.map((p) => (
                        <li key={p.id}>
                          <Link href={`/plans/${p.id}`} style={{ fontWeight: 600, fontSize: '.88rem' }}>
                            {p.planName}
                          </Link>
                          <span className="small muted">
                            {' '}— {categoryLabel(p.category)}
                            {p.premium
                              ? ` · ${money(p.premium)}/${p.premium.frequency}`
                              : ` · ${t('common.premiumNotProvided')}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ContactList insurer={ins} />
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty">
            <h3>{t('insurers.emptyTitle')}</h3>
          </div>
        )}

        <div className="card card--pad" style={{ marginTop: 24, maxWidth: 760 }}>
          <h2 style={{ fontSize: '1rem', marginBottom: 8 }}>Before you contact an insurer</h2>
          <ul className="doclist">
            <li><IconQuestion /><span>Ask for the agent&apos;s licence, and confirm it with the insurer.</span></li>
            <li><IconQuestion /><span>Never pay a premium into a personal mobile money number.</span></li>
            <li><IconQuestion /><span>Get the exclusion list and benefit schedule in writing.</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
