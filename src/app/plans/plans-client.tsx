'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import {
  PLANS, INSURERS, BENEFIT_GROUPS,
  selectPlans, activeFilterCount,
  type PlanFilters,
} from '@/lib/data';
import { PlanCard } from '@/components/ui/PlanCard';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IconArrow } from '@/components/ui/Icons';

export function PlansClient() {
  const { lang } = useApp();
  const t = makeT(lang);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<PlanFilters>({
    q: '',
    insurer: 'all',
    category: 'all',
    benefits: [],
    premiumOnly: false,
    sort: 'recommended',
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync URL params on mount
  useEffect(() => {
    setFilters((f) => ({
      ...f,
      q: searchParams.get('q') ?? f.q,
      category: searchParams.get('category') ?? f.category,
    }));
  }, [searchParams]);

  const list = selectPlans(filters);
  const count = activeFilterCount(filters);

  const catOptions: [string, string][] = [
    ['all', t('plans.allCategories')],
    ['individual', 'Individual'],
    ['family', 'Family'],
    ['self-employed', 'Self-employed'],
    ['group', 'Group'],
    ['senior', 'Senior'],
  ];

  function reset() {
    setFilters({ q: '', insurer: 'all', category: 'all', benefits: [], premiumOnly: false, sort: 'recommended' });
  }

  function toggleBenefit(g: string) {
    setFilters((f) => ({
      ...f,
      benefits: f.benefits.includes(g) ? f.benefits.filter((b) => b !== g) : [...f.benefits, g],
    }));
  }

  return (
    <section className="section" style={{ paddingBottom: 24 }}>
      <div className="container">
        <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.plans') }]} />
        <div style={{ marginTop: 18, maxWidth: 660 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4.4vw,2.6rem)' }}>{t('plans.title')}</h1>
          <p className="muted" style={{ marginTop: 10 }}>{t('plans.sub')}</p>
        </div>

        <div className="plans-layout" style={{ marginTop: 26 }}>
          {/* Filters */}
          <div className="filters">
            <button
              className="filters__summary"
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              aria-expanded={filtersOpen}
            >
              {t('common.filters')}{count > 0 ? ` · ${count}` : ''}
              <span className="filters__chev">▾</span>
            </button>

            <div className={`filters__body${filtersOpen ? ' is-open' : ''}`}>
              <div className="field">
                <label htmlFor="f-q">{t('common.search')}</label>
                <input
                  id="f-q"
                  type="search"
                  value={filters.q}
                  placeholder={t('common.searchPlans')}
                  onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
                />
              </div>

              <div className="field">
                <label htmlFor="f-insurer">{t('plans.filterInsurer')}</label>
                <select
                  id="f-insurer"
                  value={filters.insurer}
                  onChange={(e) => setFilters((f) => ({ ...f, insurer: e.target.value }))}
                >
                  <option value="all">{t('plans.allInsurers')}</option>
                  {INSURERS.map((i) => (
                    <option key={i.id} value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="f-cat">{t('plans.filterCategory')}</label>
                <select
                  id="f-cat"
                  value={filters.category}
                  onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
                >
                  {catOptions.map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <span className="field__label">{t('plans.filterBenefits')}</span>
                {BENEFIT_GROUPS.map((g) => (
                  <label key={g.id} className="checkrow">
                    <input
                      type="checkbox"
                      value={g.id}
                      checked={filters.benefits.includes(g.id)}
                      onChange={() => toggleBenefit(g.id)}
                    />
                    <span>{g.label}</span>
                  </label>
                ))}
              </div>

              <label className="checkrow" style={{ borderTop: '1px solid var(--line)', paddingTop: 12 }}>
                <input
                  type="checkbox"
                  checked={filters.premiumOnly}
                  onChange={(e) => setFilters((f) => ({ ...f, premiumOnly: e.target.checked }))}
                />
                <span>{t('plans.filterPremiumOnly')}</span>
              </label>

              <button
                className="btn btn--secondary btn--block"
                type="button"
                onClick={reset}
                disabled={count === 0}
              >
                {t('common.reset')}{count > 0 ? ` (${count})` : ''}
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="results-bar">
              <span className="results-bar__count">
                {t('plans.showing')} <b>{list.length}</b> {t('plans.of')} {PLANS.length} {t('common.results')}
              </span>
              <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="muted">{t('plans.sortBy')}</span>
                <select
                  className="select-sm"
                  value={filters.sort}
                  onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as PlanFilters['sort'] }))}
                >
                  <option value="recommended">{t('plans.sortRecommended')}</option>
                  <option value="price-low">{t('plans.sortPriceLow')}</option>
                  <option value="price-high">{t('plans.sortPriceHigh')}</option>
                  <option value="name">{t('plans.sortName')}</option>
                </select>
              </label>
            </div>

            {list.length > 0 ? (
              <div className="plan-grid">
                {list.map((p) => <PlanCard key={p.id} plan={p} />)}
              </div>
            ) : (
              <div className="empty">
                <h3>{t('plans.emptyTitle')}</h3>
                <p>{t('plans.emptyBody')}</p>
                <button className="btn btn--secondary" type="button" onClick={reset}>
                  {t('common.reset')}
                </button>
              </div>
            )}

            <DemoBanner />

            <div className="card card--pad" style={{ marginTop: 24 }}>
              <h2 style={{ fontSize: '1.05rem', marginBottom: 6 }}>{t('guide.title')}</h2>
              <p className="small muted" style={{ marginBottom: 12 }}>{t('guide.sub')}</p>
              <Link className="linkish" href="/guide">{t('common.learnMore')} <IconArrow /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
