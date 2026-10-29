import { PLANS, INSURERS, GLOSSARY, FAQS, ENROL_STEPS, BENEFIT_GROUPS, SOURCES_NOTE } from './data.js';
import {
  ICONS, icon, esc, money, frequencyLabel, statusPill, demoBanner, demoPill, term,
  planCard, emptyState, legend, contactList, accordion, sectionHead, breadcrumbs,
} from './ui.js';

/* ---------------- helpers ---------------- */

export const insurerById = (id) => INSURERS.find((i) => i.id === id) || null;
export const planById = (id) => PLANS.find((p) => p.id === id) || null;

export const categoryLabel = (id, t) => {
  const map = {
    individual: t('home.catIndividual') || 'Individual',
    family: t('home.catFamily') || 'Family',
    'self-employed': t('home.catSelfEmployed') || 'Self-employed',
    group: t('home.catGroup') || 'Group',
    senior: t('home.catSenior') || 'Senior',
  };
  return map[id] || id;
};

const defaultFilters = () => ({
  q: '', insurer: 'all', category: 'all', benefits: [], premiumOnly: false,
  sort: 'recommended', finder: null,
});

export function selectPlans(filters) {
  const f = { ...defaultFilters(), ...filters };
  const q = f.q.trim().toLowerCase();

  let list = PLANS.filter((p) => {
    if (f.insurer !== 'all' && p.insurerId !== f.insurer) return false;
    if (f.category !== 'all' && p.category !== f.category) return false;
    if (f.premiumOnly && !p.premium) return false;
    if (
      f.benefits.length &&
      !f.benefits.every((g) => p.benefits.some((b) => b.group === g && b.status === 'covered'))
    )
      return false;
    if (q) {
      const hay = [
        p.planName, p.insurer, p.description,
        ...p.benefits.map((b) => b.name),
        ...p.exclusions.map((e) => e.name),
      ].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (f.sort === 'price-low') {
    list = list.slice().sort((a, b) => (a.premium ? a.premium.amount : Infinity) - (b.premium ? b.premium.amount : Infinity));
  } else if (f.sort === 'price-high') {
    list = list.slice().sort((a, b) => (b.premium ? b.premium.amount : -1) - (a.premium ? a.premium.amount : -1));
  } else if (f.sort === 'name') {
    list = list.slice().sort((a, b) => a.planName.localeCompare(b.planName));
  }
  return list;
}

export function activeFilterCount(f) {
  let n = 0;
  if (f.insurer !== 'all') n++;
  if (f.category !== 'all') n++;
  if (f.premiumOnly) n++;
  n += f.benefits.length;
  if (f.q.trim()) n++;
  return n;
}

/* ---------------- shell fragments ---------------- */

export function header(t, state) {
  const links = [
    ['home', '#/'], ['plans', '#/plans'], ['compare', '#/compare'],
    ['guide', '#/guide'], ['enrol', '#/enrol'], ['insurers', '#/insurers'],
    ['contact', '#/contact'],
  ];
  const nav = links
    .map(([key, href]) => {
      const active = state.route === href.replace('#', '') || (href === '#/' && state.route === '/');
      return `<a href="${href}" ${active ? 'aria-current="page"' : ''}>${esc(t(`nav.${key}`))}</a>`;
    })
    .join('');

  const langs = [
    ['en', 'English'], ['lg', 'Luganda'], ['nyn', 'Runyankole'], ['teo', 'Rutooro'],
  ];
  const options = langs
    .map(([code, label]) => `<option value="${code}" ${state.lang === code ? 'selected' : ''}>${label}</option>`)
    .join('');

  const count = state.compare.length;

  return `<header class="header">
    <div class="header__inner">
      <a class="logo" href="#/" aria-label="HealthCover Uganda — home">
        <span class="logo__mark">${ICONS.logo}</span>
        <span class="logo__text">
          <span class="logo__name">HealthCover</span>
          <span class="logo__sub">Uganda</span>
        </span>
      </a>
      <nav class="nav" aria-label="Main">${nav}</nav>
      <div class="header__tools">
        <div class="lang">
          <span class="lang__icon">${ICONS.globe}</span>
          <label class="sr-only" for="lang">${esc(t('lang.label'))}</label>
          <select id="lang" data-action="lang" aria-label="${esc(t('lang.label'))}">${options}</select>
          <span class="lang__caret">${ICONS.chevronDown}</span>
        </div>
        <a class="cmp-pill" href="#/compare">
          ${esc(t('nav.compare'))}
          ${count ? `<span class="cmp-pill__count">${count}</span>` : ''}
        </a>
        <button class="icon-btn menu-btn" type="button" data-action="open-menu"
          aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${ICONS.menu}</button>
      </div>
    </div>
  </header>`;
}

export function drawer(t, state) {
  const links = [
    ['home', '#/'], ['plans', '#/plans'], ['compare', '#/compare'],
    ['guide', '#/guide'], ['enrol', '#/enrol'], ['insurers', '#/insurers'],
    ['about', '#/about'], ['contact', '#/contact'],
  ];
  return `<div class="drawer-back" id="drawerBack" hidden></div>
  <aside class="drawer" id="drawer" aria-label="Menu" aria-hidden="true">
    <div class="drawer__head">
      <span class="logo">
        <span class="logo__mark">${ICONS.logo}</span>
        <span class="logo__text"><span class="logo__name">HealthCover</span><span class="logo__sub">Uganda</span></span>
      </span>
      <button class="icon-btn" type="button" data-action="close-menu" aria-label="Close menu">${ICONS.close}</button>
    </div>
    <nav>${links
      .map(([key, href]) => `<a href="${href}">${esc(t(`nav.${key}`))}${ICONS.chevronRight}</a>`)
      .join('')}</nav>
    <hr>
    <nav>
      <a href="#/privacy">${esc(t('privacy.title'))}${ICONS.chevronRight}</a>
      <a href="#/disclaimer">${esc(t('disclaimer.title'))}${ICONS.chevronRight}</a>
    </nav>
  </aside>`;
}

export function footer(t) {
  return `<footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand">
            <span class="logo__mark">${ICONS.logo}</span>
            <span class="logo__text"><span class="logo__name">HealthCover</span><span class="logo__sub">Uganda</span></span>
          </div>
          <p class="footer__note">${esc(t('footer.disclaimer'))}</p>
        </div>
        <div>
          <h3>${esc(t('footer.platform'))}</h3>
          <ul>
            <li><a href="#/plans">${esc(t('nav.plans'))}</a></li>
            <li><a href="#/compare">${esc(t('nav.compare'))}</a></li>
            <li><a href="#/enrol">${esc(t('nav.enrol'))}</a></li>
            <li><a href="#/insurers">${esc(t('nav.insurers'))}</a></li>
          </ul>
        </div>
        <div>
          <h3>${esc(t('footer.information'))}</h3>
          <ul>
            <li><a href="#/guide">${esc(t('nav.guide'))}</a></li>
            <li><a href="#/about">${esc(t('nav.about'))}</a></li>
            <li><a href="#/contact">${esc(t('nav.contact'))}</a></li>
            <li><a href="#/privacy">${esc(t('privacy.title'))}</a></li>
            <li><a href="#/disclaimer">${esc(t('disclaimer.title'))}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} HealthCover Uganda — ${esc(t('footer.built'))}</span>
        <span>${esc(t('footer.noAccount'))}</span>
      </div>
    </div>
  </footer>`;
}

export function compareTray(t, state) {
  const n = state.compare.length;
  return `<div class="cmp-tray ${n ? 'is-open' : ''}" aria-hidden="${n ? 'false' : 'true'}">
    <span class="cmp-tray__text"><b>${n} ${n === 1 ? 'plan' : 'plans'} ${esc(t('common.inCompare').toLowerCase())}</b>${esc(t('plans.compareHint'))}</span>
    <button class="btn btn--sm btn--secondary" type="button" data-action="clear-compare">${esc(t('plans.clearAll'))}</button>
    <a class="btn btn--sm" href="#/compare">${esc(t('nav.compare'))}</a>
  </div>`;
}

/* ---------------- home ---------------- */

export function homePage(ctx) {
  const { t, state } = ctx;
  const featured = PLANS.slice(0, 3);

  const cats = [
    ['individual', 'user', t('home.catIndividual'), 'One adult buying cover directly'],
    ['family', 'family', t('home.catFamily'), 'Two adults and children'],
    ['self-employed', 'briefcase', t('home.catSelfEmployed'), 'Market traders, riders, artisans'],
  ];

  const why = [
    ['eye', t('home.why1Title'), t('home.why1Body')],
    ['ban', t('home.why2Title'), t('home.why2Body')],
    ['alert', t('home.why3Title'), t('home.why3Body')],
  ];

  return `
  <section class="hero">
    <div class="container">
      <div class="hero__grid">
        <div>
          <span class="eyebrow">${esc(t('home.eyebrow'))}</span>
          <h1>${esc(t('home.titleA'))} <em>${esc(t('home.titleB'))}</em></h1>
          <p class="hero__lead">${esc(t('home.lead'))}</p>
          <div class="hero__ctas">
            <a class="btn btn--lg" href="#/plans">${esc(t('home.ctaExplore'))} ${ICONS.arrow}</a>
            <a class="btn btn--lg btn--secondary" href="#/compare">${esc(t('home.ctaCompare'))}</a>
          </div>
          <form class="searchbar" data-action="hero-search" role="search">
            ${ICONS.search}
            <label class="sr-only" for="hero-q">${esc(t('home.searchLabel'))}</label>
            <input id="hero-q" type="search" name="q" placeholder="${esc(t('common.searchPlans'))}" autocomplete="off">
            <button class="btn btn--sm" type="submit">${esc(t('common.search'))}</button>
          </form>
        </div>

        <div class="hero__card">
          <div class="hero__card-top">
            <div class="t">${esc(t('common.demo'))}</div>
            <div class="n">NileCare Essential</div>
          </div>
          <div class="hero__card-body">
            <div class="hero__row">
              <span class="hero__row-icon hero__row-icon--yes">${ICONS.check}</span>
              <span><b>${esc(t('common.covered'))}</b><span>Hospital admission, surgery, emergency transport</span></span>
            </div>
            <div class="hero__row">
              <span class="hero__row-icon hero__row-icon--no">${ICONS.cross}</span>
              <span><b>${esc(t('common.notCovered'))}</b><span>Maternity, optical care, treatment abroad</span></span>
            </div>
            <div class="hero__row">
              <span class="hero__row-icon hero__row-icon--check">${ICONS.question}</span>
              <span><b>${esc(t('common.checkFirst'))}</b><span>Dental limit — not stated anywhere</span></span>
            </div>
          </div>
          <div class="hero__card-foot">${esc(t('home.catalogueNote'))}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      ${sectionHead({ title: t('home.categoryTitle'), sub: t('home.categorySub') })}
      <div class="cats">
        ${cats
          .map(
            ([id, ic, label, sub]) => `<a class="cat" href="#/plans?category=${id}" data-action="cat-link" data-cat="${id}">
              <span class="cat__icon">${ICONS[ic]}</span>
              <span><span class="cat__t">${esc(label)}</span><span class="cat__s">${esc(sub)}</span></span>
              <span class="cat__arrow">${ICONS.chevronRight}</span>
            </a>`
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="section" style="background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
    <div class="container">
      <div class="section-head" style="display:flex;justify-content:space-between;align-items:flex-end;max-width:none;gap:16px;flex-wrap:wrap">
        <div>
          <h2>${esc(t('home.featuredTitle'))}</h2>
          <p>${esc(t('home.featuredSub'))}</p>
        </div>
        <a class="linkish" href="#/plans">${esc(t('home.viewAll'))} ${ICONS.arrow}</a>
      </div>
      <div class="plan-grid">
        ${featured.map((p) => planCard(p, { selected: state.compare.includes(p.id), t })).join('')}
      </div>
      <div class="demo-banner" style="margin-top:18px">${ICONS.alert}<div><b>DEMONSTRATION DATA — NOT A REAL INSURANCE OFFER.</b> ${esc(SOURCES_NOTE)}</div></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead({ title: t('home.stepsTitle'), sub: t('home.stepsSub') })}
      <ol class="steps">
        ${[1, 2, 3]
          .map(
            (n) => `<li class="step-card">
              <div class="step-card__n">${n}</div>
              <h3>${esc(t(`home.step${n}Title`))}</h3>
              <p>${esc(t(`home.step${n}Body`))}</p>
            </li>`
          )
          .join('')}
      </ol>
    </div>
  </section>

  <section class="section" style="background:#fff;border-top:1px solid var(--line)">
    <div class="container">
      ${sectionHead({ title: t('home.whyTitle') })}
      <div class="cats">
        ${why
          .map(
            ([ic, title, body]) => `<div class="card card--pad">
              <span class="cat__icon" style="margin-bottom:14px">${ICONS[ic]}</span>
              <h3 style="margin-bottom:6px">${esc(title)}</h3>
              <p class="small muted">${esc(body)}</p>
            </div>`
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container" style="display:grid;gap:32px">
      ${sectionHead({ title: t('home.faqTitle'), sub: t('home.faqSub') })}
      <div style="display:grid;gap:12px">${accordion(FAQS)}</div>
      <p><a class="linkish" href="#/guide">${esc(t('home.guideCta'))} ${ICONS.arrow}</a></p>
    </div>
  </section>`;
}

/* ---------------- plans catalogue ---------------- */

export function plansPage(ctx) {
  const { t, state } = ctx;
  const f = state.filters;
  const list = selectPlans(f);
  const count = activeFilterCount(f);

  const catOptions = [
    ['all', t('plans.allCategories')],
    ['individual', 'Individual'],
    ['family', 'Family'],
    ['self-employed', 'Self-employed'],
    ['group', 'Group'],
    ['senior', 'Senior'],
  ];

  const filterBody = `
    <div class="field">
      <label for="f-q">${esc(t('common.search'))}</label>
      <input id="f-q" type="search" value="${esc(f.q)}" placeholder="${esc(t('common.searchPlans'))}" data-action="filter-q">
    </div>

    <div class="field">
      <label for="f-insurer">${esc(t('plans.filterInsurer'))}</label>
      <select id="f-insurer" data-action="filter-insurer">
        <option value="all">${esc(t('plans.allInsurers'))}</option>
        ${INSURERS.map((i) => `<option value="${i.id}" ${f.insurer === i.id ? 'selected' : ''}>${esc(i.name)}</option>`).join('')}
      </select>
    </div>

    <div class="field">
      <label for="f-cat">${esc(t('plans.filterCategory'))}</label>
      <select id="f-cat" data-action="filter-cat">
        ${catOptions.map(([v, l]) => `<option value="${v}" ${f.category === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}
      </select>
    </div>

    <div class="field">
      <span class="field__label">${esc(t('plans.filterBenefits'))}</span>
      ${BENEFIT_GROUPS.map(
        (g) => `<label class="checkrow">
          <input type="checkbox" value="${g.id}" data-action="filter-benefit" ${f.benefits.includes(g.id) ? 'checked' : ''}>
          <span>${esc(g.label)}</span>
        </label>`
      ).join('')}
    </div>

    <label class="checkrow" style="border-top:1px solid var(--line);padding-top:12px">
      <input type="checkbox" data-action="filter-premium" ${f.premiumOnly ? 'checked' : ''}>
      <span>${esc(t('plans.filterPremiumOnly'))}</span>
    </label>

    <button class="btn btn--secondary btn--block" type="button" data-action="reset-filters" data-role="filter-reset" ${count ? '' : 'disabled'}>
      ${esc(t('common.reset'))}${count ? ` (${count})` : ''}
    </button>`;

  const activeChips = [];
  if (f.q.trim()) activeChips.push(['q', `“${f.q.trim()}”`]);
  if (f.insurer !== 'all') activeChips.push(['insurer', (insurerById(f.insurer) || {}).name || f.insurer]);
  if (f.category !== 'all') activeChips.push(['category', catOptions.find((c) => c[0] === f.category)[1]]);
  if (f.premiumOnly) activeChips.push(['premium', t('plans.filterPremiumOnly')]);
  f.benefits.forEach((b) => activeChips.push([`benefit:${b}`, (BENEFIT_GROUPS.find((g) => g.id === b) || {}).label || b]));

  return `
  <section class="section" style="padding-bottom:24px">
    <div class="container">
      ${breadcrumbs([{ label: t('nav.home'), href: '#/' }, { label: t('nav.plans') }])}
      <div style="margin-top:18px;max-width:660px">
        <h1 style="font-size:clamp(1.8rem,4.4vw,2.6rem)">${esc(t('plans.title'))}</h1>
        <p class="muted" style="margin-top:10px">${esc(t('plans.sub'))}</p>
      </div>

      <details class="finder no-print" ${state.finder ? 'open' : ''}>
        <summary class="finder__summary">
          <span class="finder__icon">${ICONS.question}</span>
          <span>
            <b>${esc(t('finder.title'))}</b>
            <span class="small muted">${esc(t('finder.lead'))}</span>
          </span>
          <span class="finder__chev">${ICONS.chevronDown}</span>
        </summary>
        <div class="finder__body">
          <div class="finder__grid">
            <div class="field">
              <label for="finder-who">${esc(t('finder.who'))}</label>
              <select id="finder-who" data-action="finder-who">
                <option value="all">${esc(t('finder.anyWho'))}</option>
                ${catOptions.slice(1).map(([v, l]) => `<option value="${v}" ${f.category === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}
              </select>
            </div>
            <div class="field">
              <label for="finder-benefit">${esc(t('finder.benefit'))}</label>
              <select id="finder-benefit" data-action="finder-benefit">
                <option value="any">${esc(t('finder.anyBenefit'))}</option>
                ${BENEFIT_GROUPS.map((g) => `<option value="${g.id}" ${f.benefits.length === 1 && f.benefits[0] === g.id ? 'selected' : ''}>${esc(g.label)}</option>`).join('')}
              </select>
            </div>
            <label class="checkrow finder__premium">
              <input type="checkbox" data-action="finder-premium" ${f.premiumOnly ? 'checked' : ''}>
              <span>${esc(t('finder.premium'))}</span>
            </label>
          </div>
          <button class="btn btn--sm" type="button" data-action="finder-apply">${esc(t('finder.apply'))} ${ICONS.arrow}</button>
          <p class="small muted">${esc(t('finder.note'))}</p>
        </div>
      </details>

      <div class="plans-layout" style="margin-top:26px">
        <div class="filters">
          <button class="filters__summary" type="button" data-action="toggle-filters" aria-expanded="${state.filtersOpen}">
            ${esc(t('common.filters'))}${count ? ` · ${count}` : ''}
            <span class="filters__chev">${ICONS.chevronDown}</span>
          </button>
          <div class="filters__body ${state.filtersOpen ? 'is-open' : ''}">${filterBody}</div>
        </div>

        <div id="plans-results">
          <div class="results-bar">
            <span class="results-bar__count" data-role="count">${esc(t('plans.showing'))} <b>${list.length}</b> ${esc(t('plans.of'))} ${PLANS.length} ${esc(t('common.results'))}</span>
            <label class="small" style="display:flex;align-items:center;gap:8px">
              <span class="muted">${esc(t('plans.sortBy'))}</span>
              <select class="select-sm" data-action="sort">
                <option value="recommended" ${f.sort === 'recommended' ? 'selected' : ''}>${esc(t('plans.sortRecommended'))}</option>
                <option value="price-low" ${f.sort === 'price-low' ? 'selected' : ''}>${esc(t('plans.sortPriceLow'))}</option>
                <option value="price-high" ${f.sort === 'price-high' ? 'selected' : ''}>${esc(t('plans.sortPriceHigh'))}</option>
                <option value="name" ${f.sort === 'name' ? 'selected' : ''}>${esc(t('plans.sortName'))}</option>
              </select>
            </label>
          </div>

          <div class="active-chips" data-role="chips">${activeChips
            .map(([k, label]) => `<button class="active-chip" type="button" data-action="remove-chip" data-key="${esc(k)}">
              ${esc(label)} ${ICONS.cross}</button>`)
            .join('')}</div>

          <div data-role="grid">
            ${
              list.length
                ? `<div class="plan-grid">${list
                    .map((p) => planCard(p, { selected: state.compare.includes(p.id), t }))
                    .join('')}</div>`
                : emptyState({
                    title: t('plans.emptyTitle'),
                    body: t('plans.emptyBody'),
                    action: `<button class="btn btn--secondary" type="button" data-action="reset-filters">${esc(t('common.reset'))}</button>`,
                  })
            }
          </div>

          <div class="demo-banner" style="margin-top:20px">
            ${ICONS.alert}<div><b>DEMONSTRATION DATA — NOT A REAL INSURANCE OFFER.</b> ${esc(SOURCES_NOTE)}</div>
          </div>

          <div class="card card--pad" style="margin-top:24px">
            <h2 style="font-size:1.05rem;margin-bottom:6px">${esc(t('guide.title'))}</h2>
            <p class="small muted" style="margin-bottom:12px">${esc(t('guide.sub'))}</p>
            <a class="linkish" href="#/guide">${esc(t('common.learnMore'))} ${ICONS.arrow}</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* ---------------- plan detail ---------------- */

export function planPage(ctx, id) {
  const { t, state } = ctx;
  const plan = planById(id);
  if (!plan) return notFound(ctx);

  const ins = insurerById(plan.insurerId);
  const selected = state.compare.includes(plan.id);
  const covered = plan.benefits.filter((b) => b.status === 'covered');
  const notCovered = plan.benefits.filter((b) => b.status === 'not-covered');
  const check = plan.benefits.filter((b) => b.status === 'check-first');
  const price = money(plan.premium);

  const item = (b, status) => `<li class="status-item status-item--${
    status === 'covered' ? 'covered' : status === 'not-covered' ? 'not' : 'check'
  }">
    <div class="status-item__body">
      <div class="status-item__top">
        <b>${esc(b.name)}</b>
        ${statusPill(status, t)}
      </div>
      <p>${esc(b.detail)}</p>
      ${b.limit ? `<span class="status-item__limit">${esc(t('detail.limitValue'))}: ${esc(b.limit)}</span>` : ''}
    </div>
  </li>`;

  return `
  <div class="container">
    ${breadcrumbs([
      { label: t('nav.home'), href: '#/' },
      { label: t('nav.plans'), href: '#/plans' },
      { label: plan.planName },
    ])}

    <div class="detail-head">
      <div class="detail-head__insurer">${esc(plan.insurer)}</div>
      <h1>${esc(plan.planName)}</h1>
      <p class="detail-head__desc">${esc(plan.description)}</p>
      <div class="detail-badges">
        ${demoPill(t)}
        <span class="pill pill--neutral">${esc(categoryLabel(plan.category, t))}</span>
        ${price ? `<span class="pill pill--neutral">${esc(price)} ${esc(frequencyLabel(plan.premium, t))}</span>` : ''}
      </div>
    </div>

    ${demoBanner(t)}

    <div class="factbar" style="margin-top:20px">
      <div class="factbar__cell">
        <dt>${esc(t('detail.premium'))}</dt>
        <dd class="${price ? '' : 'is-missing'}">${price ? esc(price) : esc(t('common.premiumNotProvided'))}</dd>
      </div>
      <div class="factbar__cell">
        <dt>${esc(t('compare.frequency'))}</dt>
        <dd class="${plan.premium ? '' : 'is-missing'}">${plan.premium ? esc(frequencyLabel(plan.premium, t)) : esc(t('common.notProvided'))}</dd>
      </div>
      <div class="factbar__cell">
        <dt>${esc(t('detail.category'))}</dt>
        <dd>${esc(categoryLabel(plan.category, t))}</dd>
      </div>
      <div class="factbar__cell">
        <dt>${esc(t('detail.lastVerified'))}</dt>
        <dd class="is-missing">${plan.lastVerified ? esc(plan.lastVerified) : esc(t('insurers.notVerified'))}</dd>
      </div>
    </div>

    <div class="detail-layout">
      <div>
        <section class="block">
          <div class="block__head"><h2>${esc(t('detail.coveredTitle'))}</h2>${statusPill('covered', t)}</div>
          <p class="block__sub">${esc(t('detail.coveredSub'))}</p>
          ${covered.length ? `<ul class="status-group">${covered.map((b) => item(b, 'covered')).join('')}</ul>` : `<p class="small muted">${esc(t('detail.missingBenefits'))}</p>`}
        </section>

        <section class="block">
          <div class="block__head"><h2>${esc(t('detail.exclusionsTitle'))}</h2>${statusPill('not-covered', t)}</div>
          <p class="block__sub">${esc(t('detail.exclusionsSub'))}</p>
          ${
            plan.exclusions.length
              ? `<ul class="status-group">${plan.exclusions
                  .map(
                    (e) => `<li class="status-item status-item--not">
                      <div class="status-item__body">
                        <div class="status-item__top"><b>${esc(e.name)}</b>${statusPill('not-covered', t)}</div>
                        <p>${esc(e.detail)}</p>
                      </div>
                    </li>`
                  )
                  .join('')}</ul>`
              : `<div class="demo-banner">${ICONS.alert}<div>${esc(t('detail.missingExclusions'))}</div></div>`
          }
          ${notCovered.length ? `<h4 class="mt8" style="margin:16px 0 8px">Also excluded at benefit level</h4>
            <ul class="status-group">${notCovered.map((b) => item(b, 'not-covered')).join('')}</ul>` : ''}
        </section>

        <section class="block">
          <div class="block__head"><h2>${esc(t('detail.limitsTitle'))}</h2></div>
          <p class="block__sub">${esc(t('detail.limitsSub'))}</p>
          <div class="table-card">
            <table class="limit-table">
              <thead><tr>
                <th scope="col">Benefit</th>
                <th scope="col">Amount</th>
                <th scope="col">${esc(t('detail.limitPeriod'))}</th>
              </tr></thead>
              <tbody>
                ${plan.limits
                  .map(
                    (l) => `<tr><td>${esc(l.label)}</td><td><b>${esc(l.value)}</b></td><td class="muted">${esc(l.period)}</td></tr>`
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </section>

        ${
          check.length || plan.checkFirst.length
            ? `<section class="block">
                <div class="block__head"><h2>${esc(t('detail.checkTitle'))}</h2>${statusPill('check-first', t)}</div>
                <p class="block__sub">${esc(t('detail.checkSub'))}</p>
                <ul class="status-group">
                  ${check.map((b) => item(b, 'check-first')).join('')}
                  ${plan.checkFirst
                    .map(
                      (c) => `<li class="status-item status-item--check">
                        <div class="status-item__body">
                          <div class="status-item__top"><b>${esc(c.name)}</b>${statusPill('check-first', t)}</div>
                          <p>${esc(c.detail)}</p>
                        </div>
                      </li>`
                    )
                    .join('')}
                </ul>
              </section>`
            : ''
        }

        <section class="block">
          <div class="block__head"><h2>${esc(t('detail.waitingTitle'))}</h2></div>
          <p class="block__sub">${esc(t('detail.waitingSub'))}</p>
          <div class="table-card">
            <table class="limit-table">
              <tbody>
                ${plan.waiting
                  .map(
                    (w) => `<tr><td>${esc(w.label)}</td><td><b>${esc(w.value)}</b></td><td class="muted">${esc(w.note || '')}</td></tr>`
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </section>

        <section class="block">
          <div class="block__head"><h2>${esc(t('detail.eligibilityTitle'))}</h2></div>
          <ul class="doclist" style="margin-top:12px">
            ${plan.eligibility.map((e) => `<li>${ICONS.check}<span>${esc(e)}</span></li>`).join('')}
          </ul>
        </section>

        <section class="block">
          <div class="block__head"><h2>${esc(t('detail.documentsTitle'))}</h2></div>
          <ul class="doclist" style="margin-top:12px">
            ${plan.documents.map((d) => `<li>${ICONS.doc}<span>${esc(d)}</span></li>`).join('')}
          </ul>
        </section>

        <section class="block">
          <div class="block__head"><h2>${esc(t('detail.enrolmentTitle'))}</h2></div>
          <ul class="filelist">
            ${plan.enrolment
              .map(
                (s, i) => `<li>
                  <span class="filelist__n">${i + 1}</span>
                  <span><b>${esc(s.title)}</b><p>${esc(s.detail)}</p></span>
                </li>`
              )
              .join('')}
          </ul>
          <a class="btn btn--secondary" href="#/enrol" style="margin-top:16px">${esc(t('detail.enrolCta'))} ${ICONS.arrow}</a>
        </section>

        <section class="block">
          <div class="block__head"><h2>${esc(t('detail.contactTitle'))}</h2></div>
          <p class="block__sub">${esc(t('insurers.demoNote'))}</p>
          ${contactList({ insurer: ins, plan, t })}
        </section>

        <section class="block">
          <div class="block__head"><h2>${esc(t('detail.confirmTitle'))}</h2></div>
          <ul class="doclist" style="margin-top:12px">
            ${[...plan.checkFirst.map((c) => c.name), 'The exclusion list, in writing', 'The benefit schedule for your age']
              .map((x) => `<li>${ICONS.question}<span>${esc(x)}</span></li>`)
              .join('')}
          </ul>
        </section>
      </div>

      <aside>
        <div class="side-card">
          <h2>${esc(plan.planName)}</h2>
          <p class="small muted">${esc(plan.insurer)}</p>
          <div style="margin:14px 0">
            ${price
              ? `<div style="font-size:1.5rem;font-weight:700;letter-spacing:-.02em">${esc(price)}</div>
                 <div class="small muted">${esc(frequencyLabel(plan.premium, t))}</div>
                 <p class="small muted" style="margin-top:6px">${esc(plan.premium.note || '')}</p>`
              : `<div class="pill pill--check">${ICONS.question}${esc(t('common.premiumNotProvided'))}</div>
                 <p class="small muted" style="margin-top:8px">Ask the insurer for a written quote before comparing on price.</p>`}
          </div>
          <button class="btn btn--block ${selected ? 'btn--secondary' : ''}" type="button" data-action="toggle-compare" data-id="${plan.id}" aria-pressed="${selected}">
            ${ICONS.plus}${selected ? esc(t('detail.inCompare')) : esc(t('detail.addCompare'))}
          </button>
          <a class="btn btn--block btn--secondary" href="#/compare">${esc(t('nav.compare'))}</a>
          <hr>
          <h3 style="font-size:.85rem;margin-bottom:8px">${esc(t('detail.confirmTitle'))}</h3>
          <p class="small muted">${esc(plan.checkFirst.length)} items need confirming with the insurer.</p>
          <hr>
          <a class="linkish" href="#/guide">${esc(t('nav.guide'))} ${ICONS.arrow}</a>
        </div>
      </aside>
    </div>
  </div>`;
}

/* ---------------- compare ---------------- */

export function comparePage(ctx) {
  const { t, state } = ctx;
  const items = state.compare.map(planById).filter(Boolean);

  if (!items.length) {
    return `<section class="section">
      <div class="container">
        ${breadcrumbs([{ label: t('nav.home'), href: '#/' }, { label: t('nav.compare') }])}
        <div style="margin:22px 0 26px;max-width:640px">
          <h1 style="font-size:clamp(1.8rem,4.4vw,2.5rem)">${esc(t('compare.title'))}</h1>
          <p class="muted" style="margin-top:10px">${esc(t('compare.sub'))}</p>
        </div>
        ${emptyState({
          title: t('compare.emptyTitle'),
          body: t('compare.emptyBody'),
          iconName: 'compare',
          action: `<a class="btn" href="#/plans">${esc(t('compare.browse'))}</a>`,
        })}
      </div>
    </section>`;
  }

  const rows = buildCompareRows(items, t);
  const visible = state.diffOnly && items.length > 1
    ? rows.filter((r) => r.group || new Set(items.map((p) => r.value(p))).size > 1)
    : rows;

  let body = '';
  visible.forEach((r, i) => {
    if (r.group) {
      const next = visible[i + 1];
      if (!next || next.group) return;
      body += `<tr class="rowgroup"><th scope="colgroup" colspan="${items.length + 1}">${esc(r.group)}</th></tr>`;
      return;
    }
    body += `<tr><th scope="row">${esc(r.label)}</th>${items.map((p) => `<td>${r.value(p)}</td>`).join('')}</tr>`;
  });

  return `<section class="section">
    <div class="container">
      ${breadcrumbs([{ label: t('nav.home'), href: '#/' }, { label: t('nav.compare') }])}
      <div style="margin:22px 0 18px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;align-items:flex-end">
        <div style="max-width:620px">
          <h1 style="font-size:clamp(1.8rem,4.4vw,2.5rem)">${esc(t('compare.title'))}</h1>
          <p class="muted" style="margin-top:10px">${esc(t('compare.sub'))}</p>
        </div>
        <div class="no-print" style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn--secondary btn--sm" type="button" data-action="print">${ICONS.printer}${esc(t('common.print'))}</button>
          <button class="btn btn--ghost btn--sm" type="button" data-action="clear-compare">${esc(t('plans.clearAll'))}</button>
        </div>
      </div>

      <div class="print-header">
        <strong>HealthCover Uganda</strong> — ${esc(t('compare.title'))} — all records are demonstration data.
      </div>

      <div class="no-print" style="margin-bottom:16px">${legend(t)}</div>

      <div class="compare-tools no-print">
        <label class="checkrow" style="padding:0">
          <input type="checkbox" data-action="diff-only" ${state.diffOnly ? 'checked' : ''}>
          <span>${esc(t('compare.diffOnly'))}</span>
        </label>
        <a class="linkish" href="#/plans">${ICONS.plus}${esc(t('compare.addMore'))}</a>
      </div>

      <div class="cmp-scroll">
        <table class="cmp">
          <thead>
            <tr>
              <th scope="col"><span class="sr-only">Field</span></th>
              ${items
                .map(
                  (p) => `<th scope="col">
                    <span class="pill pill--demo">${esc(t('common.demo'))}</span>
                    <a class="cmp-name" href="#/plans/${p.id}">${esc(p.planName)}</a>
                    <span class="cmp-ins">${esc(p.insurer)}</span><br>
                    <button class="remove no-print" type="button" data-action="toggle-compare" data-id="${p.id}">${esc(t('compare.remove'))}</button>
                  </th>`
                )
                .join('')}
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </div>

      <div class="cmp-cards">
        ${items
          .map(
            (p) => `<article class="cmp-card">
              <div class="cmp-card__head">
                <span class="pill pill--demo">${esc(t('common.demo'))}</span>
                <h3><a href="#/plans/${p.id}" style="color:inherit;text-decoration:none">${esc(p.planName)}</a></h3>
                <span class="ins">${esc(p.insurer)}</span>
                <div style="margin-top:8px">
                  <button class="linkish" type="button" data-action="toggle-compare" data-id="${p.id}">${esc(t('compare.remove'))}</button>
                </div>
              </div>
              ${compactRows(p, t)}
            </article>`
          )
          .join('')}
      </div>

      <p class="small muted" style="margin-top:14px">${esc(t('compare.printHint'))}</p>

      <div class="demo-banner" style="margin-top:18px">
        ${ICONS.alert}<div><b>DEMONSTRATION DATA — NOT A REAL INSURANCE OFFER.</b> ${esc(SOURCES_NOTE)}</div>
      </div>
    </div>
  </section>`;
}

function compactRows(p, t) {
  const sec = (label, inner) => `<div class="cmp-card__section">
    <div class="cmp-card__label">${esc(label)}</div>${inner}
  </div>`;

  const sum = (status) =>
    p.benefits
      .filter((b) => b.status === status)
      .map((b) => `<li>${esc(b.name)}</li>`)
      .join('') || `<li class="muted">—</li>`;

  return [
    sec(t('compare.premium'),
      p.premium
        ? `<b>${esc(money(p.premium))}</b> <span class="muted small">${esc(frequencyLabel(p.premium, t))}</span>`
        : `<span class="special" style="color:var(--amber);font-weight:600">${esc(t('compare.unavailable'))}</span>`),
    sec(t('compare.category'), esc(categoryLabel(p.category, t))),
    sec(t('compare.cover'),
      `${statusPill('covered', t)}<ul style="margin-top:8px">${sum('covered')}</ul>`),
    sec(t('compare.exclusions'),
      `${statusPill('not-covered', t)}<ul style="margin-top:8px">${p.exclusions.map((e) => `<li>${esc(e.name)}</li>`).join('')}</ul>`),
    sec(t('compare.limits'),
      `<ul>${p.limits.map((l) => `<li>${esc(l.label)}: <b>${esc(l.value)}</b> <span class="muted">(${esc(l.period)})</span></li>`).join('')}</ul>`),
    sec(t('compare.checkFirst'), `<ul>${p.checkFirst.map((c) => `<li>${esc(c.name)}</li>`).join('')}</ul>`),
    sec(t('compare.waiting'), `<ul>${p.waiting.map((w) => `<li>${esc(w.label)}: <b>${esc(w.value)}</b></li>`).join('')}</ul>`),
    sec(t('compare.documents'), `<ul>${p.documents.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>`),
    sec(t('compare.contact'), contactList({ insurer: insurerById(p.insurerId), plan: p, t })),
  ].join('');
}

function buildCompareRows(items, t) {
  const list = (arr) => `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  const missing = (label) => `<span class="missing">${esc(label || t('compare.unavailable'))}</span>`;

  return [
    { group: t('compare.basics') },
    { label: t('compare.insurer'), value: (p) => esc(p.insurer) },
    { label: t('compare.plan'), value: (p) => `<a href="#/plans/${p.id}" style="font-weight:600">${esc(p.planName)}</a>` },
    {
      label: t('compare.premium'),
      value: (p) => (p.premium ? `<b>${esc(money(p.premium))}</b><br><span class="muted">${esc(frequencyLabel(p.premium, t))}</span>` : missing()),
    },
    { label: t('compare.frequency'), value: (p) => (p.premium ? esc(frequencyLabel(p.premium, t)) : missing()) },
    { label: t('compare.category'), value: (p) => esc(categoryLabel(p.category, t)) },

    { group: t('compare.cover') },
    {
      label: t('compare.hospitalisation'),
      value: (p) => groupStatus(p, 'hospitalisation', t),
    },
    { label: t('compare.outpatient'), value: (p) => groupStatus(p, 'outpatient', t) },
    { label: t('compare.maternity'), value: (p) => groupStatus(p, 'maternity', t) },
    {
      label: t('compare.other'),
      value: (p) => {
        const others = p.benefits.filter((b) => ['dental', 'optical', 'other'].includes(b.group));
        if (!others.length) return missing();
        return list(others.map((b) => `${b.name} — ${b.status === 'covered' ? 'covered' : b.status === 'not-covered' ? 'not covered' : 'check first'}`));
      },
    },

    { group: t('compare.cost') },
    {
      label: t('compare.limits'),
      value: (p) => list(p.limits.map((l) => `${l.label}: ${l.value} (${l.period})`)),
    },
    {
      label: t('compare.exclusions'),
      value: (p) => (p.exclusions.length ? list(p.exclusions.map((e) => e.name)) : missing('Not supplied')),
    },
    { label: t('compare.waiting'), value: (p) => list(p.waiting.map((w) => `${w.label}: ${w.value}`)) },

    { group: t('compare.getting') },
    { label: t('compare.eligibility'), value: (p) => list(p.eligibility) },
    { label: t('compare.documents'), value: (p) => list(p.documents) },
    { label: t('compare.enrolment'), value: (p) => list(p.enrolment.map((s) => s.title)) },
    {
      label: t('compare.contact'),
      value: (p) =>
        `<span class="muted">${esc(p.insurer)}</span><br><a href="#/insurers">${esc(t('insurers.title'))} →</a>`,
    },
  ];
}

function groupStatus(plan, group, t) {
  const items = plan.benefits.filter((b) => b.group === group);
  if (!items.length) return `<span class="missing">${esc(t('compare.unavailable'))}</span>`;
  const covered = items.filter((b) => b.status === 'covered');
  const check = items.filter((b) => b.status === 'check-first');
  const not = items.filter((b) => b.status === 'not-covered');

  let html = '';
  if (covered.length) html += `${statusPill('covered', t)}<ul style="margin:7px 0 0">${covered.map((b) => `<li>${esc(b.name)}</li>`).join('')}</ul>`;
  if (check.length) html += `<div style="margin-top:8px">${statusPill('check-first', t)}</div><ul style="margin:5px 0 0">${check.map((b) => `<li>${esc(b.name)}</li>`).join('')}</ul>`;
  if (not.length) html += `<div style="margin-top:8px">${statusPill('not-covered', t)}</div><ul style="margin:5px 0 0">${not.map((b) => `<li>${esc(b.name)}</li>`).join('')}</ul>`;
  return html;
}

/* ---------------- guide ---------------- */

export function guidePage(ctx) {
  const { t } = ctx;
  return `<section class="section">
    <div class="container">
      ${breadcrumbs([{ label: t('nav.home'), href: '#/' }, { label: t('nav.guide') }])}
      <div style="margin:22px 0 26px;max-width:680px">
        <span class="eyebrow">${esc(t('nav.guide'))}</span>
        <h1 style="font-size:clamp(1.8rem,4.4vw,2.5rem)">${esc(t('guide.title'))}</h1>
        <p class="muted" style="margin-top:10px">${esc(t('guide.sub'))}</p>
      </div>

      <div class="section-head" style="max-width:none;display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap">
        <div>
          <h2 style="font-size:1.3rem">${esc(t('guide.glossaryTitle'))}</h2>
          <p>${esc(t('guide.glossarySub'))}</p>
        </div>
        <div class="field" style="min-width:260px;flex:1;max-width:320px">
          <label class="sr-only" for="gq">${esc(t('guide.searchGlossary'))}</label>
          <input id="gq" type="search" placeholder="${esc(t('guide.searchGlossary'))}" data-action="glossary-search">
        </div>
      </div>

      <div class="glossary-grid" id="glossary-grid">
        ${GLOSSARY.map(
          (g) => `<button class="gloss" type="button" data-action="open-term" data-term="${g.id}" style="text-align:left">
            <span class="gloss__t">${esc(g.term)}${ICONS.plus}</span>
            <span class="gloss__d" style="display:block">${esc(g.definition)}</span>
            <span class="gloss__e" style="display:block"><b>${esc(t('guide.example'))}:</b> ${esc(g.example)}</span>
          </button>`
        ).join('')}
      </div>

      <div class="section-head" style="margin-top:48px">
        <h2 style="font-size:1.3rem">${esc(t('guide.faqTitle'))}</h2>
      </div>
      ${accordion(FAQS)}

      <div class="card card--pad" style="margin-top:24px;max-width:760px">
        <p class="small muted">${esc(t('guide.disclaimer'))}</p>
      </div>
    </div>
  </section>`;
}

/* ---------------- enrol ---------------- */

export function enrolPage(ctx) {
  const { t, state } = ctx;
  const done = state.enrol || [];
  const total = ENROL_STEPS.length;
  const pct = Math.round((done.length / total) * 100);

  return `<section class="section">
    <div class="container">
      ${breadcrumbs([{ label: t('nav.home'), href: '#/' }, { label: t('nav.enrol') }])}
      <div style="margin:22px 0 24px;max-width:700px">
        <span class="eyebrow">${esc(t('nav.enrol'))}</span>
        <h1 style="font-size:clamp(1.8rem,4.4vw,2.5rem)">${esc(t('enrol.title'))}</h1>
        <p class="muted" style="margin-top:10px">${esc(t('enrol.sub'))}</p>
      </div>

      <div class="detail-layout">
        <div>
          <div class="progress">
            <div class="progress__top">
              <b>${done.length} / ${total} ${esc(t('enrol.progress'))}</b>
              <span class="muted">${pct}%</span>
            </div>
            <div class="progress__bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"
                 aria-label="${esc(t('enrol.checklistTitle'))}">
              <div class="progress__fill" style="width:${pct}%"></div>
            </div>
          </div>

          ${done.length === total ? `<div class="success" style="margin-bottom:16px"><b>${esc(t('enrol.doneTitle'))}</b>${esc(t('enrol.doneBody'))}</div>` : ''}

          <div class="checklist">
            ${ENROL_STEPS.map(
              (s, i) => `<label class="check-item">
                <input type="checkbox" data-action="enrol-check" data-idx="${i}" ${done.includes(i) ? 'checked' : ''}>
                <span class="check-item__body">
                  <span class="check-item__t">${i + 1}. ${esc(s.title)}</span>
                  <span class="check-item__d">${esc(s.detail)}</span>
                </span>
              </label>`
            ).join('')}
          </div>

          <div style="display:flex;gap:8px;margin-top:14px">
            <button class="btn btn--secondary btn--sm" type="button" data-action="enrol-reset">${esc(t('enrol.reset'))}</button>
          </div>

          <div class="card card--pad" style="margin-top:22px">
            <p class="small muted">${esc(t('enrol.note'))}</p>
          </div>
        </div>

        <aside>
          <div class="side-card">
            <h2 style="font-size:.95rem">${esc(t('enrol.planLinks'))}</h2>
            <div style="display:grid;gap:8px;margin-top:12px">
              ${PLANS.map(
                (p) => `<a class="contact-row" href="#/plans/${p.id}">
                  <span class="contact-row__icon">${ICONS.doc}</span>
                  <span><span class="contact-row__k">${esc(categoryLabel(p.category, t))}</span><span class="contact-row__v">${esc(p.planName)}</span></span>
                </a>`
              ).join('')}
            </div>
            <hr>
            <a class="linkish" href="#/guide">${esc(t('nav.guide'))} ${ICONS.arrow}</a>
          </div>
        </aside>
      </div>
    </div>
  </section>`;
}

/* ---------------- insurers ---------------- */

export function insurersPage(ctx) {
  const { t, state } = ctx;
  const q = (state.insurerQuery || '').trim().toLowerCase();
  const list = INSURERS.filter(
    (i) => !q || (i.name + ' ' + i.description).toLowerCase().includes(q)
  );

  return `<section class="section">
    <div class="container">
      ${breadcrumbs([{ label: t('nav.home'), href: '#/' }, { label: t('nav.insurers') }])}
      <div style="margin:22px 0 20px;max-width:680px">
        <h1 style="font-size:clamp(1.8rem,4.4vw,2.5rem)">${esc(t('insurers.title'))}</h1>
        <p class="muted" style="margin-top:10px">${esc(t('insurers.sub'))}</p>
      </div>

      <div class="searchbar" style="max-width:420px;margin-bottom:18px">
        ${ICONS.search}
        <label class="sr-only" for="iq">${esc(t('insurers.search'))}</label>
        <input id="iq" type="search" value="${esc(state.insurerQuery || '')}" placeholder="${esc(t('insurers.search'))}" data-action="insurer-search">
      </div>

      <div class="demo-banner" style="margin-bottom:20px">${ICONS.alert}<div><b>DEMONSTRATION DATA.</b> ${esc(t('insurers.demoNote'))}</div></div>

      ${
        list.length
          ? `<div class="ins-grid">${list
              .map((ins) => {
                const products = PLANS.filter((p) => p.insurerId === ins.id);
                return `<article class="ins-card">
                  <div class="ins-card__head">
                    <span class="ins-card__mark">${esc(ins.initials)}</span>
                    <div>
                      <h3>${esc(ins.name)}</h3>
                      <span class="ins-card__meta">${esc(t('insurers.lastVerified'))}: ${esc(t('insurers.notVerified'))}</span>
                    </div>
                    <span class="pill pill--demo" style="margin-left:auto">${esc(t('common.demo'))}</span>
                  </div>
                  <p class="ins-card__desc">${esc(ins.description)}</p>
                  <div>
                    <span class="field__label">${esc(t('insurers.products'))} (${products.length})</span>
                    <ul style="display:grid;gap:6px;margin-top:6px">
                      ${products
                        .map(
                          (p) => `<li><a href="#/plans/${p.id}" style="font-weight:600;font-size:.88rem">${esc(p.planName)}</a>
                            <span class="small muted">— ${esc(categoryLabel(p.category, t))}${p.premium ? ` · ${esc(money(p.premium))}/${esc(p.premium.frequency)}` : ` · ${esc(t('common.premiumNotProvided'))}`}</span></li>`
                        )
                        .join('')}
                    </ul>
                  </div>
                  ${contactList({ insurer: ins, t })}
                </article>`;
              })
              .join('')}</div>`
          : emptyState({ title: t('insurers.emptyTitle'), body: t('plans.emptyBody'), iconName: 'search' })
      }

      <div class="card card--pad" style="margin-top:24px;max-width:760px">
        <h2 style="font-size:1rem;margin-bottom:8px">${esc(t('detail.confirmTitle'))}</h2>
        <ul class="doclist">
          <li>${ICONS.question}<span>Ask for the agent's licence, and confirm it with the insurer.</span></li>
          <li>${ICONS.question}<span>Never pay a premium into a personal mobile money number.</span></li>
          <li>${ICONS.question}<span>Get the exclusion list and benefit schedule in writing.</span></li>
        </ul>
      </div>
    </div>
  </section>`;
}

/* ---------------- about / contact / legal ---------------- */

export function aboutPage(ctx) {
  const { t } = ctx;
  return `<section class="section">
    <div class="container">
      ${breadcrumbs([{ label: t('nav.home'), href: '#/' }, { label: t('nav.about') }])}
      <div class="prose" style="margin-top:22px">
        <span class="eyebrow">${esc(t('nav.about'))}</span>
        <h1 style="font-size:clamp(1.8rem,4.4vw,2.5rem);margin-bottom:12px">${esc(t('about.title'))}</h1>
        <p class="muted" style="font-size:1.02rem">${esc(t('about.lead'))}</p>

        <h2>Why it exists</h2>
        <p>Most people in Uganda meet health insurance at the worst possible moment — at a hospital counter, with a bill in hand. Product information is scattered across brochures and sales conversations, exclusions are buried in policy documents, and prices are rarely published at all.</p>
        <p>HealthCover Uganda puts the same facts in the same shape for every plan, so a person can see what a plan pays for, what it refuses, what the ceiling is, and what to do next — without an account, a sales call or a medical questionnaire.</p>

        <h2>How product information should be verified</h2>
        <ul>
          <li>Every record states where it came from and when it was last checked.</li>
          <li>If a figure is not supplied, it is shown as “Not provided” rather than estimated.</li>
          <li>Anything conditional or unclear is marked “Check first”, with the exact question to ask.</li>
          <li>Before paying a premium, confirm the premium, the exclusion list and the benefit schedule in writing with the insurer.</li>
        </ul>

        <div class="card">
          <strong>Demonstration data</strong>
          <p style="margin-top:6px">This version ships with a fictional catalogue: five insurers that do not exist, with illustrative premiums and placeholder contacts. Every record is labelled. The data structure is designed so real, verified products can replace the samples without changing the interface.</p>
        </div>

        <h2>What this platform does not do</h2>
        <ul>
          <li>It does not issue, vary or cancel a policy.</li>
          <li>It does not decide or promise eligibility.</li>
          <li>It does not complete an enrolment or accept a payment.</li>
          <li>It does not collect medical histories, national ID numbers or payment details.</li>
          <li>It is not affiliated with, endorsed by or acting for any insurer.</li>
        </ul>

        <h2>Accessibility</h2>
        <p>The interface uses semantic HTML, visible focus states, labels on every control and text labels alongside colour for all status indicators. Comparison works on a 360px screen. If something is hard to use, please tell us through the contact page — that is genuinely useful feedback.</p>

        <h2>Languages</h2>
        <p>The interface is available in English, Luganda, Runyankole and Rutooro. Product records, exclusion wording and glossary definitions remain in English, because insurance terms are used in English in practice and a poor translation of contractual wording would be misleading. The translations are a first draft for this prototype.</p>
      </div>
    </div>
  </section>`;
}

export function contactPage(ctx) {
  const { t, state } = ctx;
  const sent = state.contactSent;
  const errors = state.contactErrors || {};
  const values = state.contactValues || {};

  return `<section class="section">
    <div class="container">
      ${breadcrumbs([{ label: t('nav.home'), href: '#/' }, { label: t('nav.contact') }])}
      <div style="margin:22px 0 26px;max-width:660px">
        <h1 style="font-size:clamp(1.8rem,4.4vw,2.5rem)">${esc(t('contact.title'))}</h1>
        <p class="muted" style="margin-top:10px">${esc(t('contact.lead'))}</p>
      </div>

      <div class="detail-layout">
        <div class="card card--pad">
          ${sent ? `<div class="success"><b>${esc(t('form.successTitle'))}</b>${esc(t('form.successBody'))}</div>` : ''}

          <form class="form" data-action="contact-form" novalidate style="margin-top:${sent ? '16px' : '0'}">
            <div class="form__row">
              <div class="field">
                <label for="c-name">${esc(t('form.name'))} <span class="muted">(${esc(t('form.nameHint'))})</span></label>
                <input id="c-name" name="name" type="text" value="${esc(values.name || '')}" autocomplete="name">
              </div>
              <div class="field">
                <label for="c-email">${esc(t('form.email'))} <span class="muted">(${esc(t('form.emailHint'))})</span></label>
                <input id="c-email" name="email" type="email" value="${esc(values.email || '')}" autocomplete="email"
                  ${errors.email ? 'aria-invalid="true" aria-describedby="c-email-error"' : ''}>
                ${errors.email ? `<span class="field__error" id="c-email-error">${esc(errors.email)}</span>` : ''}
              </div>
            </div>

            <div class="field">
              <label for="c-message">${esc(t('form.message'))}</label>
              <textarea id="c-message" name="message" ${errors.message ? 'aria-invalid="true" aria-describedby="c-msg-error"' : ''}>${esc(values.message || '')}</textarea>
              ${errors.message ? `<span class="field__error" id="c-msg-error">${esc(errors.message)}</span>` : ''}
              <span class="field__hint">${esc(t('form.privacyHint'))}</span>
            </div>

            <button class="btn" type="submit">${esc(t('form.send'))}</button>
          </form>

          ${
            sent
              ? `<div class="field" style="margin-top:18px">
                  <label for="copybox">${esc(t('form.copy'))}</label>
                  <textarea id="copybox" readonly rows="6">${esc(`Message: ${values.message || ''}\nFrom: ${values.name || 'Anonymous'} ${values.email || ''}`)}</textarea>
                  <button class="btn btn--secondary btn--sm" type="button" data-action="copy-message" style="justify-self:start">${esc(t('form.copy'))}</button>
                </div>`
              : ''
          }
        </div>

        <aside>
          <div class="side-card">
            <h2 style="font-size:.95rem">${esc(t('contact.title'))}</h2>
            <p class="small muted" style="margin-top:6px">This prototype has no verified platform phone number or email, so none is displayed. In a live deployment, that information would appear here.</p>
            <hr>
            <h3 style="font-size:.85rem;margin-bottom:8px">${esc(t('nav.guide'))}</h3>
            <a class="linkish" href="#/guide">${esc(t('guide.glossaryTitle'))} ${ICONS.arrow}</a>
            <hr>
            <p class="small muted">${esc(t('form.privacyHint'))}</p>
          </div>
        </aside>
      </div>
    </div>
  </section>`;
}

export function privacyPage(ctx) {
  const { t } = ctx;
  return `<section class="section">
    <div class="container">
      ${breadcrumbs([{ label: t('nav.home'), href: '#/' }, { label: t('privacy.title') }])}
      <div class="prose" style="margin-top:22px">
        <h1 style="font-size:clamp(1.8rem,4.4vw,2.4rem);margin-bottom:10px">${esc(t('privacy.title'))}</h1>
        <p class="muted">${esc(t('privacy.lead'))}</p>

        <h2>What we collect</h2>
        <p>Nothing is sent to a server. There is no account system, no analytics service and no advertising. The site works entirely in your browser.</p>

        <h2>What is stored on your device</h2>
        <ul>
          <li>Which plans you selected for comparison, so the selection survives a page refresh.</li>
          <li>Which enrolment checklist steps you have ticked.</li>
          <li>Your language preference.</li>
        </ul>
        <p>These are stored in your browser's local storage. They never leave your device and you can clear them at any time from your browser settings.</p>

        <h2>What we never ask for</h2>
        <ul>
          <li>Medical history, diagnoses, medication or test results.</li>
          <li>National identification numbers.</li>
          <li>Payment details or mobile money numbers.</li>
          <li>Passwords or an account of any kind.</li>
        </ul>

        <h2>The feedback form</h2>
        <p>The contact form validates your input in the browser and then tells you plainly that your message was not sent, because this prototype has no backend. It does not transmit anything, and it stores nothing after you leave the page.</p>

        <h2>Links to other sites</h2>
        <p>Plan records link to insurer websites. Once you follow those links, that site's own privacy practices apply. In this demonstration catalogue, those links point to the reserved <code>example.com</code> domain and go nowhere real.</p>

        <h2>Changes</h2>
        <p>This is a prototype prepared for the UIA Career Expo 2026 challenge. It is not a commercial service and makes no claim of legal compliance or certification.</p>
      </div>
    </div>
  </section>`;
}

export function disclaimerPage(ctx) {
  const { t } = ctx;
  return `<section class="section">
    <div class="container">
      ${breadcrumbs([{ label: t('nav.home'), href: '#/' }, { label: t('disclaimer.title') }])}
      <div class="prose" style="margin-top:22px">
        <h1 style="font-size:clamp(1.8rem,4.4vw,2.4rem);margin-bottom:10px">${esc(t('disclaimer.title'))}</h1>
        <p class="muted">${esc(t('disclaimer.lead'))}</p>

        <h2>Demonstration data</h2>
        <p>Every product record in this version is fictional. The five insurers do not exist, the premiums are illustrative, and no contact detail is in service. Records are labelled “DEMONSTRATION DATA — NOT A REAL INSURANCE OFFER” wherever they appear.</p>

        <h2>Information, not advice</h2>
        <p>The catalogue explains published product terms and general insurance concepts. It is not financial, legal or medical advice, and it does not take your circumstances into account. Choosing a policy is your decision, ideally after speaking to the insurer.</p>

        <h2>No policy is issued here</h2>
        <ul>
          <li>Nothing on this site constitutes an offer of insurance.</li>
          <li>No eligibility decision is made or promised.</li>
          <li>No enrolment is completed and no premium is collected.</li>
          <li>Only the insurer can confirm cover, price or acceptance.</li>
        </ul>

        <h2>Missing information</h2>
        <p>Where a plan does not state a premium, a limit or an exclusion, this site says so. An absent benefit is <strong>not</strong> proof that the benefit is excluded, and an absent exclusion is <strong>not</strong> proof that everything is covered. Always confirm with the insurer before paying.</p>

        <h2>Accuracy</h2>
        <p>Product terms change and errors are possible. Each record shows its source and the date it was checked, where a source exists. In this demonstration version no record has a verified source, and all are marked accordingly.</p>

        <h2>No affiliation</h2>
        <p>This prototype is not affiliated with, endorsed by or acting on behalf of any insurer, broker or regulator.</p>
      </div>
    </div>
  </section>`;
}

export function notFound(ctx) {
  const { t } = ctx;
  return `<section class="section">
    <div class="container">
      ${emptyState({
        title: 'Page not found',
        body: 'The page you asked for does not exist. The catalogue is a good place to start.',
        action: `<a class="btn" href="#/plans">${esc(t('nav.plans'))}</a>`,
      })}
    </div>
  </section>`;
}
