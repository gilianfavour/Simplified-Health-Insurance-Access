'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import { PLANS, FAQS } from '@/lib/data';
import { PlanCard } from '@/components/ui/PlanCard';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { Accordion } from '@/components/ui/Accordion';
import {
  IconArrow, IconEye, IconBan, IconAlert,
  IconUser, IconFamily, IconBriefcase, IconChevronRight,
} from '@/components/ui/Icons';

export default function HomeClient() {
  const { lang } = useApp();
  const t = makeT(lang);
  const router = useRouter();
  const featured = PLANS.slice(0, 3);

  const cats = [
    { id: 'individual',   icon: <IconUser />,      label: t('home.catIndividual'),   sub: 'One adult buying cover directly' },
    { id: 'family',       icon: <IconFamily />,    label: t('home.catFamily'),       sub: 'Two adults and children' },
    { id: 'self-employed',icon: <IconBriefcase />, label: t('home.catSelfEmployed'), sub: 'Market traders, riders, artisans' },
  ];

  const why = [
    { icon: <IconEye />,   title: t('home.why1Title'), body: t('home.why1Body') },
    { icon: <IconBan />,   title: t('home.why2Title'), body: t('home.why2Body') },
    { icon: <IconAlert />, title: t('home.why3Title'), body: t('home.why3Body') },
  ];

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = (new FormData(e.currentTarget).get('q') as string) ?? '';
    router.push(`/plans?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div>
              <span className="eyebrow">{t('home.eyebrow')}</span>
              <h1>{t('home.titleA')} <em>{t('home.titleB')}</em></h1>
              <p className="hero__lead">{t('home.lead')}</p>
              <div className="hero__ctas">
                <Link className="btn btn--lg" href="/plans">{t('home.ctaExplore')} <IconArrow /></Link>
                <Link className="btn btn--lg btn--secondary" href="/compare">{t('home.ctaCompare')}</Link>
              </div>
              <form className="searchbar" onSubmit={handleSearch} role="search">
                <label className="sr-only" htmlFor="hero-q">{t('home.searchLabel')}</label>
                <input id="hero-q" type="search" name="q" placeholder={t('common.searchPlans')} autoComplete="off" />
                <button className="btn btn--sm" type="submit">{t('common.search')}</button>
              </form>
            </div>
            <div className="hero__card">
              <div className="hero__card-top">
                <div className="t">{t('common.demo')}</div>
                <div className="n">NileCare Essential</div>
              </div>
              <div className="hero__card-body">
                <div className="hero__row">
                  <span className="hero__row-icon hero__row-icon--yes" />
                  <span><b>{t('common.covered')}</b><span>Hospital admission, surgery, emergency transport</span></span>
                </div>
                <div className="hero__row">
                  <span className="hero__row-icon hero__row-icon--no" />
                  <span><b>{t('common.notCovered')}</b><span>Maternity, optical care, treatment abroad</span></span>
                </div>
                <div className="hero__row">
                  <span className="hero__row-icon hero__row-icon--check" />
                  <span><b>{t('common.checkFirst')}</b><span>Dental limit — not stated anywhere</span></span>
                </div>
              </div>
              <div className="hero__card-foot">{t('home.catalogueNote')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <h2>{t('home.categoryTitle')}</h2>
            <p>{t('home.categorySub')}</p>
          </div>
          <div className="cats">
            {cats.map((c) => (
              <Link key={c.id} className="cat" href={`/plans?category=${c.id}`}>
                <span className="cat__icon">{c.icon}</span>
                <span>
                  <span className="cat__t">{c.label}</span>
                  <span className="cat__s">{c.sub}</span>
                </span>
                <span className="cat__arrow"><IconChevronRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured plans */}
      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <h2>{t('home.featuredTitle')}</h2>
              <p>{t('home.featuredSub')}</p>
            </div>
            <Link className="linkish" href="/plans">{t('home.viewAll')} <IconArrow /></Link>
          </div>
          <div className="plan-grid">
            {featured.map((p) => <PlanCard key={p.id} plan={p} />)}
          </div>
          <DemoBanner />
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{t('home.stepsTitle')}</h2>
            <p>{t('home.stepsSub')}</p>
          </div>
          <ol className="steps">
            {[1, 2, 3].map((n) => (
              <li key={n} className="step-card">
                <div className="step-card__n">{n}</div>
                <h3>{t(`home.step${n}Title`)}</h3>
                <p>{t(`home.step${n}Body`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why */}
      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div className="section-head"><h2>{t('home.whyTitle')}</h2></div>
          <div className="cats">
            {why.map((w, i) => (
              <div key={i} className="card card--pad">
                <span className="cat__icon" style={{ marginBottom: 14 }}>{w.icon}</span>
                <h3 style={{ marginBottom: 6 }}>{w.title}</h3>
                <p className="small muted">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 32 }}>
          <div className="section-head">
            <h2>{t('home.faqTitle')}</h2>
            <p>{t('home.faqSub')}</p>
          </div>
          <Accordion items={FAQS} />
          <p>
            <Link className="linkish" href="/guide">{t('home.guideCta')} <IconArrow /></Link>
          </p>
        </div>
      </section>
    </>
  );
}
