'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import { money, frequencyLabel, type Plan } from '@/lib/data';
import { IconCheck, IconPlus } from './Icons';
import { DemoPill } from './DemoBanner';

export function PlanCard({ plan }: { plan: Plan }) {
  const { lang, compare, toggleCompare } = useApp();
  const t = makeT(lang);
  const selected = compare.includes(plan.id);
  const price = money(plan.premium);
  const topBenefits = plan.benefits.filter(b => b.status === 'covered').slice(0, 3);

  return (
    <article className={`plan${selected ? ' is-selected' : ''}`}>
      <div className="plan__body">
        <div className="plan__insurer">{plan.insurer}</div>
        <h3 className="plan__name">
          <Link href={`/plans/${plan.id}`}>{plan.planName}</Link>
        </h3>
        <p className="plan__desc">{plan.description}</p>
        {price ? (
          <p className="plan__price">
            <b>{price}</b>
            <span>{frequencyLabel(plan.premium, t('common.perMonth'), t('common.perYear'), t('common.perWeek'))}</span>
          </p>
        ) : (
          <p className="plan__price plan__price--none">{t('common.premiumNotProvided')}</p>
        )}
        <div className="plan__benefits">
          {topBenefits.map(b => (
            <span key={b.name} className="benefit-chip">{b.name}</span>
          ))}
        </div>
      </div>
      <div className="plan__foot">
        <button
          type="button"
          className="cmp-toggle"
          onClick={() => toggleCompare(plan.id)}
          aria-pressed={selected}
        >
          <span className="cmp-toggle__box"><IconCheck /></span>
          {selected ? t('common.inCompare') : t('common.addToCompare')}
        </button>
        <Link className="btn btn--sm btn--secondary" href={`/plans/${plan.id}`}>
          {t('common.viewPlan')}
        </Link>
      </div>
    </article>
  );
}
