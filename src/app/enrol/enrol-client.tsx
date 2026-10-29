'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import { PLANS, ENROL_STEPS, categoryLabel } from '@/lib/data';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IconDoc, IconArrow } from '@/components/ui/Icons';

export function EnrolClient() {
  const { lang, enrol, toggleEnrol, resetEnrol } = useApp();
  const t = makeT(lang);
  const total = ENROL_STEPS.length;
  const pct = total > 0 ? Math.round((enrol.length / total) * 100) : 0;

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.enrol') }]} />
        <div style={{ margin: '22px 0 24px', maxWidth: 700 }}>
          <span className="eyebrow">{t('nav.enrol')}</span>
          <h1 style={{ fontSize: 'clamp(1.8rem,4.4vw,2.5rem)' }}>{t('enrol.title')}</h1>
          <p className="muted" style={{ marginTop: 10 }}>{t('enrol.sub')}</p>
        </div>

        <div className="detail-layout">
          <div>
            <div className="progress">
              <div className="progress__top">
                <b>{enrol.length} / {total} {t('enrol.progress')}</b>
                <span className="muted">{pct}%</span>
              </div>
              <div
                className="progress__bar"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t('enrol.checklistTitle')}
              >
                <div className="progress__fill" style={{ width: `${pct}%` }} />
              </div>
            </div>

            {enrol.length === total && (
              <div className="success" style={{ marginBottom: 16 }}>
                <b>{t('enrol.doneTitle')}</b>{t('enrol.doneBody')}
              </div>
            )}

            <div className="checklist">
              {ENROL_STEPS.map((s, i) => (
                <label key={i} className="check-item">
                  <input
                    type="checkbox"
                    checked={enrol.includes(i)}
                    onChange={() => toggleEnrol(i)}
                  />
                  <span className="check-item__body">
                    <span className="check-item__t">{i + 1}. {s.title}</span>
                    <span className="check-item__d">{s.detail}</span>
                  </span>
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn btn--secondary btn--sm" type="button" onClick={resetEnrol}>
                {t('enrol.reset')}
              </button>
            </div>

            <div className="card card--pad" style={{ marginTop: 22 }}>
              <p className="small muted">{t('enrol.note')}</p>
            </div>
          </div>

          <aside>
            <div className="side-card">
              <h2 style={{ fontSize: '.95rem' }}>{t('enrol.planLinks')}</h2>
              <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
                {PLANS.map((p) => (
                  <Link key={p.id} className="contact-row" href={`/plans/${p.id}`}>
                    <span className="contact-row__icon"><IconDoc /></span>
                    <span>
                      <span className="contact-row__k">{categoryLabel(p.category)}</span>
                      <span className="contact-row__v">{p.planName}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <hr />
              <Link className="linkish" href="/guide">{t('nav.guide')} <IconArrow /></Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
