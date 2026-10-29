/** Reusable presentational components. All return HTML strings. */

const S = (d, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;

export const ICONS = {
  logo: S('<path d="M12 3l7.5 3.2v6.1c0 4.4-3.1 8-7.5 9.7-4.4-1.7-7.5-5.3-7.5-9.7V6.2z"/><path d="M12 9v6M9 12h6"/>', 'width="22" height="22" stroke-width="1.9"'),
  search: S('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>', 'width="18" height="18"'),
  arrow: S('<path d="M5 12h13M13 6l6 6-6 6"/>', 'width="18" height="18"'),
  chevronRight: S('<path d="M9 6l6 6-6 6"/>', 'width="14" height="14"'),
  chevronDown: S('<path d="M6 9l6 6 6-6"/>', 'width="18" height="18"'),
  menu: S('<path d="M4 7h16M4 12h16M4 17h16"/>', 'width="20" height="20"'),
  close: S('<path d="M6 6l12 12M18 6L6 18"/>', 'width="18" height="18"'),
  globe: S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>', 'width="16" height="16"'),
  check: S('<path d="m4 12.5 5 5L20 6.5"/>', 'width="15" height="15"'),
  cross: S('<path d="M6 6l12 12M18 6L6 18"/>', 'width="14" height="14"'),
  question: S('<circle cx="12" cy="12" r="9"/><path d="M9.6 9.2a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1.1 1-1.1 1.8v.3"/><path d="M12 17.2h.01"/>', 'width="14" height="14"'),
  info: S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>', 'width="17" height="17"'),
  alert: S('<path d="M12 3.6 21 19.5H3z"/><path d="M12 9.6v4M12 16.6h.01"/>', 'width="17" height="17"'),
  user: S('<circle cx="12" cy="8" r="3.6"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/>', 'width="21" height="21"'),
  family: S('<circle cx="8.5" cy="8.5" r="2.8"/><circle cx="16.5" cy="9.5" r="2.2"/><path d="M3.4 19.5a5.2 5.2 0 0 1 10.2 0"/><path d="M15 19.5a4.2 4.2 0 0 1 5.8-3.9"/>', 'width="21" height="21"'),
  briefcase: S('<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12.5h18"/>', 'width="21" height="21"'),
  building: S('<path d="M4 20V5.5a1.5 1.5 0 0 1 1.5-1.5H14a1.5 1.5 0 0 1 1.5 1.5V20"/><path d="M15.5 10H19a1 1 0 0 1 1 1v9M3 20h18M8 8h4M8 12h4M8 16h4"/>', 'width="21" height="21"'),
  heart: S('<path d="M12 20s-7-4.4-7-9a3.9 3.9 0 0 1 7-2.4A3.9 3.9 0 0 1 19 11c0 4.6-7 9-7 9z"/>', 'width="21" height="21"'),
  phone: S('<path d="M6.6 3.7h2.8l1.4 3.7-1.9 1.4a11.5 11.5 0 0 0 5.4 5.4l1.4-1.9 3.7 1.4v2.8a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.9a2 2 0 0 1 2-2.2z"/>', 'width="16" height="16"'),
  mail: S('<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.8 7 8.2 5.6L20.2 7"/>', 'width="16" height="16"'),
  link: S('<path d="M10 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7L11 6.9"/><path d="M14 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1.3-1.3"/>', 'width="16" height="16"'),
  printer: S('<path d="M7 9V4h10v5"/><rect x="4" y="9" width="16" height="7" rx="2"/><path d="M7 14h10v6H7z"/>', 'width="17" height="17"'),
  filter: S('<path d="M4 6h16M7 12h10M10 18h4"/>', 'width="17" height="17"'),
  doc: S('<path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z"/><path d="M13.5 3v5.5H19M8.5 13h7M8.5 17h4"/>', 'width="17" height="17"'),
  plus: S('<path d="M12 5v14M5 12h14"/>', 'width="16" height="16"'),
  calendar: S('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/>', 'width="16" height="16"'),
  pin: S('<path d="M12 21s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/>', 'width="16" height="16"'),
  external: S('<path d="M14 4h6v6M20 4l-8.5 8.5"/><path d="M18 14v4.5a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2H10"/>', 'width="16" height="16"'),
  eye: S('<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.6"/>', 'width="17" height="17"'),
  ban: S('<circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/>', 'width="15" height="15"'),
  compare: S('<rect x="3" y="5" width="7.5" height="14" rx="1.6"/><rect x="13.5" y="5" width="7.5" height="14" rx="1.6"/>', 'width="22" height="22"'),
};

export const icon = (name, cls = '') => `<span class="${cls}">${ICONS[name] || ''}</span>`;

export const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const money = (premium) =>
  premium ? `${premium.currency} ${premium.amount.toLocaleString('en-UG')}` : null;

export const frequencyLabel = (premium, t) => {
  if (!premium) return '';
  const map = { month: t('common.perMonth'), year: t('common.perYear'), week: t('common.perWeek') };
  return map[premium.frequency] || premium.frequency;
};

/** The three-state status marker: never colour alone — always a word and an icon. */
export function statusPill(status, t, opts = {}) {
  const map = {
    covered: { cls: 'pill--covered', icon: 'check', key: 'common.covered' },
    'not-covered': { cls: 'pill--not', icon: 'cross', key: 'common.notCovered' },
    'check-first': { cls: 'pill--check', icon: 'question', key: 'common.checkFirst' },
  };
  const m = map[status] || map['check-first'];
  const label = opts.label || t(m.key);
  return `<span class="pill ${m.cls}">${ICONS[m.icon]}${esc(label)}</span>`;
}

export function demoBanner(t, text) {
  return `<div class="demo-banner">${ICONS.alert}<div><b>${esc(t('common.demo'))}</b> — ${
    text || 'NOT A REAL INSURANCE OFFER'
  }. ${esc(
    t('detail.note')
  )}</div></div>`;
}

export function demoPill(t) {
  return `<span class="pill pill--demo">${esc(t('common.demo'))}</span>`;
}

/** Inline glossary trigger — the "what does this mean?" affordance. */
export const term = (id, label) =>
  `<button type="button" class="term" data-action="open-term" data-term="${esc(id)}" aria-label="What does ${esc(
    label
  )} mean?">${esc(label)}</button>`;

export function planCard(plan, { selected, t }) {
  const price = money(plan.premium);
  const topBenefits = plan.benefits
    .filter((b) => b.status === 'covered')
    .slice(0, 3)
    .map((b) => `<span class="benefit-chip">${esc(b.name)}</span>`)
    .join('');

  return `<article class="plan ${selected ? 'is-selected' : ''}">
    <div class="plan__body">
      <div class="plan__insurer">${esc(plan.insurer)}</div>
      <h3 class="plan__name"><a href="#/plans/${plan.id}">${esc(plan.planName)}</a></h3>
      <p class="plan__desc">${esc(plan.description)}</p>
      ${
        price
          ? `<p class="plan__price"><b>${esc(price)}</b><span>${esc(frequencyLabel(plan.premium, t))}</span></p>`
          : `<p class="plan__price plan__price--none">${esc(t('common.premiumNotProvided'))}</p>`
      }
      <div class="plan__benefits">${topBenefits}</div>
    </div>
    <div class="plan__foot">
      <button type="button" class="cmp-toggle" data-action="toggle-compare" data-id="${plan.id}"
        aria-pressed="${selected ? 'true' : 'false'}">
        <span class="cmp-toggle__box">${ICONS.check}</span>
        ${selected ? esc(t('common.inCompare')) : esc(t('common.addToCompare'))}
      </button>
      <a class="btn btn--sm btn--secondary" href="#/plans/${plan.id}">${esc(t('common.viewPlan'))}</a>
    </div>
  </article>`;
}

export function emptyState({ title, body, action, iconName = 'search' }) {
  return `<div class="empty">
    <div class="empty__icon">${ICONS[iconName]}</div>
    <h3>${esc(title)}</h3>
    <p>${esc(body)}</p>
    ${action || ''}
  </div>`;
}

export function legend(t) {
  return `<div class="legend">
    <span>${esc(t('compare.legend'))}:</span>
    ${statusPill('covered', t)}
    ${statusPill('not-covered', t)}
    ${statusPill('check-first', t)}
    <span class="small" style="flex:1 1 100%">${esc(t('compare.legendNote'))}</span>
  </div>`;
}

export function contactList({ insurer, plan, t }) {
  const rows = [];
  const ins = insurer;

  if (ins && ins.phone) {
    rows.push(`<a class="contact-row" href="tel:${esc(ins.phone.replace(/[^+\d]/g, ''))}">
      <span class="contact-row__icon">${ICONS.phone}</span>
      <span><span class="contact-row__k">${esc(t('insurers.phone'))}</span><span class="contact-row__v">${esc(ins.phone)}</span></span>
    </a>`);
  }
  if (ins && ins.email) {
    rows.push(`<a class="contact-row" href="mailto:${esc(ins.email)}">
      <span class="contact-row__icon">${ICONS.mail}</span>
      <span><span class="contact-row__k">${esc(t('insurers.email'))}</span><span class="contact-row__v">${esc(ins.email)}</span></span>
    </a>`);
  }
  if (ins && ins.website) {
    rows.push(`<a class="contact-row" href="${esc(ins.website)}" target="_blank" rel="noopener noreferrer">
      <span class="contact-row__icon">${ICONS.link}</span>
      <span><span class="contact-row__k">${esc(t('insurers.website'))}</span><span class="contact-row__v">${esc(ins.website.replace(/^https?:\/\//, ''))}</span></span>
    </a>`);
  }
  if (ins && ins.intermediary) {
    rows.push(`<div class="contact-row">
      <span class="contact-row__icon">${ICONS.user}</span>
      <span><span class="contact-row__k">${esc(t('insurers.intermediary'))}</span><span class="contact-row__v" style="font-weight:500">${esc(ins.intermediary)}</span></span>
    </div>`);
  }
  if (!rows.length) {
    rows.push(`<div class="contact-row">
      <span class="contact-row__icon">${ICONS.info}</span>
      <span><span class="contact-row__k">${esc(t('insurers.notVerified'))}</span><span class="contact-row__v" style="font-weight:500">No verified phone, email or website is supplied for this demonstration record.</span></span>
    </div>`);
  }
  return `<div class="contact-list">${rows.join('')}</div>`;
}

export function accordion(items) {
  return `<div class="accordion">${items
    .map(
      (item, i) => `<details class="acc" ${i === 0 ? '' : ''}>
        <summary>${esc(item.q)}${ICONS.chevronDown}<span class="sr-only">— expand answer</span></summary>
        <div class="acc__body"><p>${esc(item.a)}</p></div>
      </details>`
    )
    .join('')}</div>`;
}

export function sectionHead({ eyebrow, title, sub, id }) {
  return `<div class="section-head">
    ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
    <h2 ${id ? `id="${id}"` : ''}>${esc(title)}</h2>
    ${sub ? `<p>${esc(sub)}</p>` : ''}
  </div>`;
}

export const breadcrumbs = (items) =>
  `<nav class="crumbs" aria-label="Breadcrumb">${items
    .map((item, i) =>
      i === items.length - 1
        ? `<span aria-current="page">${esc(item.label)}</span>`
        : `<a href="${esc(item.href)}">${esc(item.label)}</a>${ICONS.chevronRight}`
    )
    .join('')}</nav>`;
