'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import { insurerById, money, frequencyLabel, categoryLabel, type Plan, type Benefit } from '@/lib/data';
import { StatusPill } from '@/components/ui/StatusPill';
import { DemoBanner, DemoPill } from '@/components/ui/DemoBanner';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactList } from '@/components/ui/ContactList';
import { IconCheck, IconDoc, IconQuestion, IconArrow } from '@/components/ui/Icons';

function BenefitItem({ b, t }: { b: Benefit; t: (k: string) => string }) {
  const statusLabel =
    b.status === 'covered'
      ? t('common.covered')
      : b.status === 'not-covered'
      ? t('common.notCovered')
      : t('common.checkFirst');

  return (
    <li
      className={`status-item status-item--${
        b.status === 'covered' ? 'covered' : b.status === 'not-covered' ? 'not' : 'check'
      }`}
    >
      <div className="status-item__body">
        <div className="status-item__top">
          <b>{b.name}</b>
          <StatusPill status={b.status} label={statusLabel} />
        </div>
        <p>{b.detail}</p>
        {b.limit && (
          <span className="status-item__limit">
            {t('detail.limitValue')}: {b.limit}
          </span>
        )}
      </div>
    </li>
  );
}

export function PlanDetailClient({ plan }: { plan: Plan }) {
  const { lang, compare, toggleCompare } = useApp();
  const t = makeT(lang);
  const ins = insurerById(plan.insurerId);
  const selected = compare.includes(plan.id);
  const price = money(plan.premium);
  const freqLabel = frequencyLabel(
    plan.premium,
    t('common.perMonth'),
    t('common.perYear'),
    t('common.perWeek'),
  );

  const covered = plan.benefits.filter((b) => b.status === 'covered');
  const notCov = plan.benefits.filter((b) => b.status === 'not-covered');
  const checkB = plan.benefits.filter((b) => b.status === 'check-first');

  return (
    <div className="container">
      <Breadcrumbs
        items={[
          { label: t('nav.home'), href: '/' },
          { label: t('nav.plans'), href: '/plans' },
          { label: plan.planName },
        ]}
      />

      {/* Header */}
      <div className="detail-head">
        <div className="detail-head__insurer">{plan.insurer}</div>
        <h1>{plan.planName}</h1>
        <p className="detail-head__desc">{plan.description}</p>
        <div className="detail-badges">
          <DemoPill />
          <span className="pill pill--neutral">{categoryLabel(plan.category)}</span>
          {price && (
            <span className="pill pill--neutral">
              {price} {freqLabel}
            </span>
          )}
        </div>
      </div>

      <DemoBanner />

      {/* Fact bar */}
      <div className="factbar" style={{ marginTop: 20 }}>
        <div className="factbar__cell">
          <dt>{t('detail.premium')}</dt>
          <dd className={price ? '' : 'is-missing'}>{price ?? t('common.premiumNotProvided')}</dd>
        </div>
        <div className="factbar__cell">
          <dt>{t('compare.frequency')}</dt>
          <dd className={plan.premium ? '' : 'is-missing'}>
            {plan.premium ? freqLabel : t('common.notProvided')}
          </dd>
        </div>
        <div className="factbar__cell">
          <dt>{t('detail.category')}</dt>
          <dd>{categoryLabel(plan.category)}</dd>
        </div>
        <div className="factbar__cell">
          <dt>{t('detail.lastVerified')}</dt>
          <dd className="is-missing">{plan.lastVerified ?? 'Not verified'}</dd>
        </div>
      </div>

      <div className="detail-layout">
        {/* Main column */}
        <div>
          {/* Covered */}
          <section className="block">
            <div className="block__head">
              <h2>{t('detail.coveredTitle')}</h2>
              <StatusPill status="covered" label={t('common.covered')} />
            </div>
            <p className="block__sub">{t('detail.coveredSub')}</p>
            {covered.length > 0 ? (
              <ul className="status-group">
                {covered.map((b, i) => (
                  <BenefitItem key={i} b={b} t={t} />
                ))}
              </ul>
            ) : (
              <p className="small muted">{t('detail.missingBenefits')}</p>
            )}
          </section>

          {/* Exclusions */}
          <section className="block">
            <div className="block__head">
              <h2>{t('detail.exclusionsTitle')}</h2>
              <StatusPill status="not-covered" label={t('common.notCovered')} />
            </div>
            <p className="block__sub">{t('detail.exclusionsSub')}</p>
            {plan.exclusions.length > 0 ? (
              <ul className="status-group">
                {plan.exclusions.map((e, i) => (
                  <li key={i} className="status-item status-item--not">
                    <div className="status-item__body">
                      <div className="status-item__top">
                        <b>{e.name}</b>
                        <StatusPill status="not-covered" label={t('common.notCovered')} />
                      </div>
                      <p>{e.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="demo-banner">
                <p>{t('detail.missingExclusions')}</p>
              </div>
            )}
            {notCov.length > 0 && (
              <ul className="status-group" style={{ marginTop: 16 }}>
                {notCov.map((b, i) => (
                  <BenefitItem key={i} b={b} t={t} />
                ))}
              </ul>
            )}
          </section>

          {/* Limits */}
          <section className="block">
            <div className="block__head">
              <h2>{t('detail.limitsTitle')}</h2>
            </div>
            <p className="block__sub">{t('detail.limitsSub')}</p>
            <div className="table-card">
              <table className="limit-table">
                <thead>
                  <tr>
                    <th scope="col">Benefit</th>
                    <th scope="col">Amount</th>
                    <th scope="col">{t('detail.limitPeriod')}</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.limits.map((l, i) => (
                    <tr key={i}>
                      <td>{l.label}</td>
                      <td>
                        <b>{l.value}</b>
                      </td>
                      <td className="muted">{l.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Check first */}
          {(checkB.length > 0 || plan.checkFirst.length > 0) && (
            <section className="block">
              <div className="block__head">
                <h2>{t('detail.checkTitle')}</h2>
                <StatusPill status="check-first" label={t('common.checkFirst')} />
              </div>
              <p className="block__sub">{t('detail.checkSub')}</p>
              <ul className="status-group">
                {checkB.map((b, i) => (
                  <BenefitItem key={`b${i}`} b={b} t={t} />
                ))}
                {plan.checkFirst.map((c, i) => (
                  <li key={`c${i}`} className="status-item status-item--check">
                    <div className="status-item__body">
                      <div className="status-item__top">
                        <b>{c.name}</b>
                        <StatusPill status="check-first" label={t('common.checkFirst')} />
                      </div>
                      <p>{c.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Waiting */}
          <section className="block">
            <div className="block__head">
              <h2>{t('detail.waitingTitle')}</h2>
            </div>
            <p className="block__sub">{t('detail.waitingSub')}</p>
            <div className="table-card">
              <table className="limit-table">
                <tbody>
                  {plan.waiting.map((w, i) => (
                    <tr key={i}>
                      <td>{w.label}</td>
                      <td>
                        <b>{w.value}</b>
                      </td>
                      <td className="muted">{w.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Eligibility */}
          <section className="block">
            <div className="block__head">
              <h2>{t('detail.eligibilityTitle')}</h2>
            </div>
            <ul className="doclist" style={{ marginTop: 12 }}>
              {plan.eligibility.map((e, i) => (
                <li key={i}>
                  <IconCheck />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Documents */}
          <section className="block">
            <div className="block__head">
              <h2>{t('detail.documentsTitle')}</h2>
            </div>
            <ul className="doclist" style={{ marginTop: 12 }}>
              {plan.documents.map((d, i) => (
                <li key={i}>
                  <IconDoc />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Enrolment */}
          <section className="block">
            <div className="block__head">
              <h2>{t('detail.enrolmentTitle')}</h2>
            </div>
            <ul className="filelist">
              {plan.enrolment.map((s, i) => (
                <li key={i}>
                  <span className="filelist__n">{i + 1}</span>
                  <span>
                    <b>{s.title}</b>
                    <p>{s.detail}</p>
                  </span>
                </li>
              ))}
            </ul>
            <Link className="btn btn--secondary" href="/enrol" style={{ marginTop: 16 }}>
              {t('detail.enrolCta')} <IconArrow />
            </Link>
          </section>

          {/* Contact */}
          <section className="block">
            <div className="block__head">
              <h2>{t('detail.contactTitle')}</h2>
            </div>
            <p className="block__sub">{t('insurers.demoNote')}</p>
            <ContactList insurer={ins} />
          </section>

          {/* Confirm before enrolling */}
          <section className="block">
            <div className="block__head">
              <h2>{t('detail.confirmTitle')}</h2>
            </div>
            <ul className="doclist" style={{ marginTop: 12 }}>
              {[
                ...plan.checkFirst.map((c) => c.name),
                'The exclusion list, in writing',
                'The benefit schedule for your age',
              ].map((x, i) => (
                <li key={i}>
                  <IconQuestion />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="side-card">
            <h2>{plan.planName}</h2>
            <p className="small muted">{plan.insurer}</p>
            <div style={{ margin: '14px 0' }}>
              {price ? (
                <>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-.02em' }}>
                    {price}
                  </div>
                  <div className="small muted">{freqLabel}</div>
                  <p className="small muted" style={{ marginTop: 6 }}>
                    {plan.premium?.note}
                  </p>
                </>
              ) : (
                <>
                  <StatusPill status="check-first" label={t('common.premiumNotProvided')} />
                  <p className="small muted" style={{ marginTop: 8 }}>
                    Ask the insurer for a written quote before comparing on price.
                  </p>
                </>
              )}
            </div>
            <button
              className={`btn btn--block${selected ? ' btn--secondary' : ''}`}
              type="button"
              onClick={() => toggleCompare(plan.id)}
              aria-pressed={selected}
            >
              {selected ? t('detail.inCompare') : t('detail.addCompare')}
            </button>
            <Link
              className="btn btn--block btn--secondary"
              href="/compare"
              style={{ marginTop: 8 }}
            >
              {t('nav.compare')}
            </Link>
            <hr />
            <h3 style={{ fontSize: '.85rem', marginBottom: 8 }}>{t('detail.confirmTitle')}</h3>
            <p className="small muted">
              {plan.checkFirst.length} items need confirming with the insurer.
            </p>
            <hr />
            <Link className="linkish" href="/guide">
              {t('nav.guide')} <IconArrow />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
