'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';

export function CompareTray() {
  const { lang, compare, clearCompare } = useApp();
  const t = makeT(lang);
  const n = compare.length;

  return (
    <div className={`cmp-tray${n > 0 ? ' is-open' : ''}`} aria-hidden={n === 0}>
      <span className="cmp-tray__text">
        <b>{n} {n === 1 ? 'plan' : 'plans'} in comparison</b>
        {t('plans.compareHint')}
      </span>
      <button className="btn btn--sm btn--secondary" type="button" onClick={clearCompare}>
        {t('plans.clearAll')}
      </button>
      <Link className="btn btn--sm" href="/compare">{t('nav.compare')}</Link>
    </div>
  );
}
