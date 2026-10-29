'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import { GLOSSARY, FAQS } from '@/lib/data';
import { Accordion } from '@/components/ui/Accordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IconPlus } from '@/components/ui/Icons';

export function GuideClient() {
  const { lang, openTerm } = useApp();
  const t = makeT(lang);
  const [q, setQ] = useState('');

  const filtered = q.trim()
    ? GLOSSARY.filter((g) =>
        (g.term + ' ' + g.definition + ' ' + g.example).toLowerCase().includes(q.toLowerCase()),
      )
    : GLOSSARY;

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.guide') }]} />
        <div style={{ margin: '22px 0 26px', maxWidth: 680 }}>
          <span className="eyebrow">{t('nav.guide')}</span>
          <h1 style={{ fontSize: 'clamp(1.8rem,4.4vw,2.5rem)' }}>{t('guide.title')}</h1>
          <p className="muted" style={{ marginTop: 10 }}>{t('guide.sub')}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: '1.3rem' }}>{t('guide.glossaryTitle')}</h2>
            <p>{t('guide.glossarySub')}</p>
          </div>
          <div className="field" style={{ minWidth: 260, flex: '1', maxWidth: 320 }}>
            <label className="sr-only" htmlFor="gq">{t('guide.searchGlossary')}</label>
            <input
              id="gq"
              type="search"
              placeholder={t('guide.searchGlossary')}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <div className="glossary-grid">
          {filtered.length > 0 ? (
            filtered.map((g) => (
              <button
                key={g.id}
                className="gloss"
                type="button"
                onClick={() => openTerm(g.id)}
                style={{ textAlign: 'left' }}
              >
                <span className="gloss__t">{g.term}<IconPlus /></span>
                <span className="gloss__d" style={{ display: 'block' }}>{g.definition}</span>
                <span className="gloss__e" style={{ display: 'block' }}>
                  <b>{t('guide.example')}:</b> {g.example}
                </span>
              </button>
            ))
          ) : (
            <p className="muted">{t('guide.noTerms')}</p>
          )}
        </div>

        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: '1.3rem' }}>{t('guide.faqTitle')}</h2>
        </div>
        <Accordion items={FAQS} />

        <div className="card card--pad" style={{ marginTop: 24, maxWidth: 760 }}>
          <p className="small muted">{t('guide.disclaimer')}</p>
        </div>
      </div>
    </section>
  );
}
