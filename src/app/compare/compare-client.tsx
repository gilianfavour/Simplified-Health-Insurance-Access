'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import {
  planById, insurerById, money, frequencyLabel, categoryLabel,
  BENEFIT_GROUPS, type Plan,
} from '@/lib/data';
import { StatusPill } from '@/components/ui/StatusPill';
import { DemoBanner, DemoPill } from '@/components/ui/DemoBanner';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactList } from '@/components/ui/ContactList';
import { IconCompare, IconPrinter, IconArrow } from '@/components/ui/Icons';

export function CompareClient() {
  const { lang, compare, clearCompare, toggleCompare } = useApp();
  const t = makeT(lang);
  const plans = compare.map((id) => planById(id)).filter((p): p is Plan => !!p);

  if (plans.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.compare') }]} />
          <div style={{ margin: '22px 0 26px', maxWidth: 640 }}>
            <h1 style={{ fontSize: 'clamp(1.8rem,4.4vw,2.5rem)' }}>{t('compare.title')}</h1>
            <p className="muted" style={{ marginTop: 10 }}>{t('compare.sub')}</p>
          </div>
          <div className="empty">
            <div className="empty__icon"><IconCompare /></div>
            <h3>{t('compare.emptyTitle')}</h3>
            <p>{t('compare.emptyBody')}</p>
            <Link className="btn" href="/plans">{t('compare.browse')}</Link>
          </div>
        </div>
      </section>
    );
  }

  const rows = [
    { label: t('compare.insurer'),   value: (p: Plan) => p.insurer },
    { label: t('compare.premium'),   value: (p: Plan) => money(p.premium) ?? t('compare.unavailable') },
    { label: t('compare.frequency'), value: (p: Plan) => p.premium ? frequencyLabel(p.premium, t('common.perMonth'), t('common.perYear'), t('common.perWeek')) : '—' },
    { label: t('compare.category'),  value: (p: Plan) => categoryLabel(p.category) },
    ...BENEFIT_GROUPS.map((g) => ({
      label: g.label,
      value: (p: Plan) => {
        const items = p.benefits.filter((b) => b.group === g.id);
        if (!items.length) return t('compare.unavailable');
        return items.map((b) => `${b.name} (${b.status})`).join(', ');
      },
    })),
    { label: t('compare.limits'),      value: (p: Plan) => p.limits.map((l) => `${l.label}: ${l.value}`).join('\n') },
    { label: t('compare.exclusions'),  value: (p: Plan) => p.exclusions.map((e) => e.name).join(', ') || '—' },
    { label: t('compare.waiting'),     value: (p: Plan) => p.waiting.map((w) => `${w.label}: ${w.value}`).join(', ') },
    { label: t('compare.eligibility'), value: (p: Plan) => p.eligibility.join(' ') },
    { label: t('compare.documents'),   value: (p: Plan) => p.documents.join(' ') },
  ];

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.compare') }]} />

        <div style={{ margin: '22px 0 18px', display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ maxWidth: 620 }}>
            <h1 style={{ fontSize: 'clamp(1.8rem,4.4vw,2.5rem)' }}>{t('compare.title')}</h1>
            <p className="muted" style={{ marginTop: 10 }}>{t('compare.sub')}</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn btn--secondary btn--sm" type="button" onClick={() => window.print()}>
              <IconPrinter />{t('common.print')}
            </button>
            <button className="btn btn--ghost btn--sm" type="button" onClick={clearCompare}>
              {t('plans.clearAll')}
            </button>
          </div>
        </div>

        <div className="cmp-scroll">
          <table className="cmp">
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Field</span></th>
                {plans.map((p) => (
                  <th key={p.id} scope="col">
                    <DemoPill />
                    <Link className="cmp-name" href={`/plans/${p.id}`}>{p.planName}</Link>
                    <span className="cmp-ins">{p.insurer}</span><br />
                    <button className="remove" type="button" onClick={() => toggleCompare(p.id)}>
                      {t('compare.remove')}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <th scope="row">{row.label}</th>
                  {plans.map((p) => (
                    <td key={p.id} style={{ whiteSpace: 'pre-wrap' }}>{row.value(p)}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">{t('compare.contact')}</th>
                {plans.map((p) => (
                  <td key={p.id}><ContactList insurer={insurerById(p.insurerId)} /></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="small muted" style={{ marginTop: 14 }}>{t('compare.printHint')}</p>
        <DemoBanner />
        <p style={{ marginTop: 16 }}>
          <Link className="linkish" href="/plans"><IconArrow />{t('compare.addMore')}</Link>
        </p>
      </div>
    </section>
  );
}
