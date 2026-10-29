import { LANGS, translate } from './i18n.js';
import { GLOSSARY, ENROL_STEPS, PLANS } from './data.js';
import { ICONS, esc, planCard } from './ui.js';
import {
  header, drawer, footer, compareTray, homePage, plansPage, planPage, comparePage,
  guidePage, enrolPage, insurersPage, aboutPage, contactPage, privacyPage, disclaimerPage,
  notFound, selectPlans, activeFilterCount,
} from './pages.js';

/* ---------------- storage ---------------- */

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private browsing — app still works, just without persistence */
    }
  },
};

/* ---------------- state ---------------- */

const state = {
  lang: store.get('hcu.lang', 'en'),
  route: '/',
  compare: (store.get('hcu.compare', []) || []).filter((id) => PLANS.some((p) => p.id === id)).slice(0, 3),
  enrol: store.get('hcu.enrol', []) || [],
  diffOnly: false,
  filtersOpen: false,
  finder: false,
  insurerQuery: '',
  contactSent: false,
  contactErrors: {},
  contactValues: {},
  filters: {
    q: '', insurer: 'all', category: 'all', benefits: [], premiumOnly: false,
    sort: 'recommended',
  },
  focusId: null,
};

const t = (key) => translate(state.lang, key);

/* ---------------- boot skeleton ---------------- */

function mountStatic() {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="sheet-back" id="sheetBack" hidden></div>
     <aside class="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="sheetTitle" aria-hidden="true">
       <div class="sheet__grab"></div>
       <h3 id="sheetTitle"></h3>
       <span class="sheet__aka" id="sheetAka"></span>
       <p id="sheetDef"></p>
       <div class="example" id="sheetExample"></div>
       <div class="sheet__foot">
         <a class="btn btn--secondary btn--block" href="#/guide" data-action="close-sheet">${esc(t('nav.guide'))}</a>
         <button class="btn" type="button" data-action="close-sheet">${esc(t('common.close'))}</button>
       </div>
     </aside>`
  );
}

/* ---------------- render ---------------- */

function langNotice() {
  if (state.lang === 'en') return '';
  return `<div class="container"><div class="lang-notice">${ICONS.info}<span>${esc(
    t('lang.notice')
  )}</span></div></div>`;
}

function render({ keepScroll = false } = {}) {
  const y = window.scrollY;
  const app = document.getElementById('app');
  const path = state.route;

  let page;
  if (path === '/' || path === '') page = homePage({ t, state });
  else if (path === '/plans') page = plansPage({ t, state });
  else if (path.startsWith('/plans/')) page = planPage({ t, state }, path.slice('/plans/'.length));
  else if (path === '/compare') page = comparePage({ t, state });
  else if (path === '/guide') page = guidePage({ t, state });
  else if (path === '/enrol') page = enrolPage({ t, state });
  else if (path === '/insurers') page = insurersPage({ t, state });
  else if (path === '/about') page = aboutPage({ t, state });
  else if (path === '/contact') page = contactPage({ t, state });
  else if (path === '/privacy') page = privacyPage({ t, state });
  else if (path === '/disclaimer') page = disclaimerPage({ t, state });
  else page = notFound({ t, state });

  app.innerHTML = `<a class="skip" href="#main">Skip to content</a>
    ${header(t, state)}
    ${langNotice()}
    <main id="main">${page}</main>
    ${footer(t)}
    ${drawer(t, state)}
    ${compareTray(t, state)}`;

  document.documentElement.lang = state.lang === 'en' ? 'en' : state.lang;
  document.title =
    path === '/' ? 'HealthCover Uganda — health insurance, made simple'
    : path.startsWith('/plans/') ? `${(PLANS.find((p) => p.id === path.split('/')[2]) || {}).planName || 'Plan'} — HealthCover Uganda`
    : `${titleFor(path)} — HealthCover Uganda`;

  if (state.focusId) {
    const el = document.getElementById(state.focusId);
    if (el) {
      el.focus();
      if (el.setSelectionRange && typeof el.value === 'string') {
        const len = el.value.length;
        try { el.setSelectionRange(len, len); } catch { /* non-text input */ }
      }
    }
    state.focusId = null;
  }

  if (keepScroll) window.scrollTo(0, y);
  else window.scrollTo(0, 0);
}

function titleFor(path) {
  const map = {
    '/plans': 'Explore plans', '/compare': 'Compare plans', '/guide': 'Insurance guide',
    '/enrol': 'How to enrol', '/insurers': 'Insurers and contacts', '/about': 'About',
    '/contact': 'Contact', '/privacy': 'Privacy notice', '/disclaimer': 'Disclaimer',
  };
  return map[path] || 'Page not found';
}

/* ---------------- routing ---------------- */

function parseRoute() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart] = raw.split('?');
  state.route = pathPart || '/';

  if (queryPart) {
    const params = new URLSearchParams(queryPart);
    const cat = params.get('category');
    if (cat && ['individual', 'family', 'self-employed', 'group', 'senior'].includes(cat)) {
      state.filters.category = cat;
    }
    const q = params.get('q');
    if (q) state.filters.q = q;
  }
}

function navigate(hash) {
  if (location.hash === hash) {
    parseRoute();
    render();
  } else {
    location.hash = hash;
  }
}

/* ---------------- toast ---------------- */

let toastTimer;
function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add('is-on'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 2400);
}

/* ---------------- glossary sheet ---------------- */

let lastFocus = null;

function openTerm(id) {
  const g = GLOSSARY.find((x) => x.id === id || x.term.toLowerCase() === String(id).toLowerCase());
  if (!g) return;
  lastFocus = document.activeElement;
  document.getElementById('sheetTitle').textContent = g.term;
  document.getElementById('sheetAka').textContent = '';
  document.getElementById('sheetDef').textContent = g.definition;
  const ex = document.getElementById('sheetExample');
  ex.innerHTML = `<b>${esc(t('guide.example'))}:</b> ${esc(g.example)}`;
  const sheet = document.getElementById('sheet');
  const back = document.getElementById('sheetBack');
  back.hidden = false;
  requestAnimationFrame(() => {
    sheet.classList.add('is-open');
    back.classList.add('is-open');
  });
  sheet.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  sheet.querySelector('.btn--secondary').focus();
}

function closeSheet() {
  const sheet = document.getElementById('sheet');
  if (!sheet || !sheet.classList.contains('is-open')) return;
  sheet.classList.remove('is-open');
  document.getElementById('sheetBack').classList.remove('is-open');
  sheet.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => {
    document.getElementById('sheetBack').hidden = true;
  }, 200);
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

/* ---------------- drawer ---------------- */

function openMenu() {
  const d = document.getElementById('drawer');
  const b = document.getElementById('drawerBack');
  b.hidden = false;
  requestAnimationFrame(() => {
    d.classList.add('is-open');
    b.classList.add('is-open');
  });
  d.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const btn = document.querySelector('[data-action="open-menu"]');
  if (btn) btn.setAttribute('aria-expanded', 'true');
  d.querySelector('a, button').focus();
}

function closeMenu() {
  const d = document.getElementById('drawer');
  if (!d.classList.contains('is-open')) return;
  d.classList.remove('is-open');
  document.getElementById('drawerBack').classList.remove('is-open');
  d.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => {
    document.getElementById('drawerBack').hidden = true;
  }, 200);
  const btn = document.querySelector('[data-action="open-menu"]');
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }
}

/* ---------------- actions ---------------- */

function toggleCompare(id) {
  const i = state.compare.indexOf(id);
  if (i >= 0) {
    state.compare.splice(i, 1);
    toast('Removed from comparison');
  } else if (state.compare.length >= 3) {
    toast(t('compare.max'));
    return;
  } else {
    state.compare.push(id);
    toast(`${state.compare.length} selected for comparison`);
  }
  store.set('hcu.compare', state.compare);
  render({ keepScroll: true });
}

function updatePlansPartial() {
  const host = document.getElementById('plans-results');
  if (!host) {
    render({ keepScroll: true });
    return;
  }
  const list = selectPlans(state.filters);
  const cards = list.length
    ? `<div class="plan-grid">${list
        .map((p) => planCard(p, { selected: state.compare.includes(p.id), t }))
        .join('')}</div>`
    : `<div class="empty">
        <div class="empty__icon">${ICONS.search}</div>
        <h3>${esc(t('plans.emptyTitle'))}</h3>
        <p>${esc(t('plans.emptyBody'))}</p>
        <button class="btn btn--secondary" type="button" data-action="reset-filters">${esc(t('common.reset'))}</button>
      </div>`;

  host.querySelector('[data-role="count"]').innerHTML =
    `${esc(t('plans.showing'))} <b>${list.length}</b> ${esc(t('plans.of'))} ${PLANS.length} ${esc(t('common.results'))}`;
  host.querySelector('[data-role="grid"]').innerHTML = cards;

  const chips = host.querySelector('[data-role="chips"]');
  if (chips) chips.innerHTML = buildChips();

  syncFilterCount();
}

/** Keeps the filter panel's counter and reset button in step with partial re-renders. */
function syncFilterCount() {
  const count = activeFilterCount(state.filters);
  const reset = document.querySelector('[data-role="filter-reset"]');
  if (reset) {
    reset.disabled = count === 0;
    reset.innerHTML = `${esc(t('common.reset'))}${count ? ` (${count})` : ''}`;
  }
  const summary = document.querySelector('[data-action="toggle-filters"]');
  if (summary) {
    summary.innerHTML = `${esc(t('common.filters'))}${count ? ` \u00b7 ${count}` : ''}
      <span class="filters__chev">${ICONS.chevronDown}</span>`;
  }
}

function buildChips() {
  const f = state.filters;
  const chips = [];
  if (f.q.trim()) chips.push(['q', `“${f.q.trim()}”`]);
  if (f.insurer !== 'all') {
    const ins = f.insurer;
    chips.push(['insurer', ins]);
  }
  if (f.category !== 'all') chips.push(['category', f.category]);
  if (f.premiumOnly) chips.push(['premium', t('plans.filterPremiumOnly')]);
  f.benefits.forEach((b) => chips.push([`benefit:${b}`, b]));

  if (!chips.length) return '';
  return chips
    .map(
      ([key, label]) => `<button class="active-chip" type="button" data-action="remove-chip" data-key="${esc(key)}">
        ${esc(label)} ${ICONS.cross}</button>`
    )
    .join('');
}

function removeChip(key) {
  const f = state.filters;
  if (key === 'q') f.q = '';
  else if (key === 'insurer') f.insurer = 'all';
  else if (key === 'category') f.category = 'all';
  else if (key === 'premium') f.premiumOnly = false;
  else if (key.startsWith('benefit:')) f.benefits = f.benefits.filter((b) => b !== key.split(':')[1]);
  render({ keepScroll: true });
}

/* ---------------- events ---------------- */

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;

  if (action === 'open-menu') { e.preventDefault(); openMenu(); return; }
  if (action === 'close-menu') { e.preventDefault(); closeMenu(); return; }
  if (action === 'open-term') { e.preventDefault(); openTerm(el.dataset.term); return; }
  if (action === 'close-sheet') { closeSheet(); return; }
  if (action === 'toggle-compare') { e.preventDefault(); toggleCompare(el.dataset.id); return; }
  if (action === 'clear-compare') {
    state.compare = [];
    store.set('hcu.compare', []);
    render({ keepScroll: true });
    toast('Comparison cleared');
    return;
  }
  if (action === 'toggle-filters') {
    state.filtersOpen = !state.filtersOpen;
    render({ keepScroll: true });
    return;
  }
  if (action === 'finder-apply') {
    const who = document.getElementById('finder-who');
    const benefit = document.getElementById('finder-benefit');
    const premium = document.querySelector('[data-action="finder-premium"]');
    state.filters = {
      ...state.filters,
      q: '',
      category: who ? who.value : 'all',
      benefits: benefit && benefit.value !== 'any' ? [benefit.value] : [],
      premiumOnly: premium ? premium.checked : false,
    };
    state.finder = true;
    render({ keepScroll: true });
    const results = document.getElementById('plans-results');
    if (results) results.scrollIntoView({ block: 'start', behavior: 'smooth' });
    toast(`${selectPlans(state.filters).length} matching plans`);
    return;
  }
  if (action === 'reset-filters') {
    state.filters = { q: '', insurer: 'all', category: 'all', benefits: [], premiumOnly: false, sort: 'recommended' };
    state.finder = false;
    render({ keepScroll: true });
    return;
  }
  if (action === 'remove-chip') { removeChip(el.dataset.key); return; }
  if (action === 'print') { window.print(); return; }
  if (action === 'cat-link') {
    e.preventDefault();
    state.filters = { ...state.filters, category: el.dataset.cat, q: '' };
    navigate('#/plans');
    return;
  }
  if (action === 'enrol-reset') {
    state.enrol = [];
    store.set('hcu.enrol', []);
    render({ keepScroll: true });
    return;
  }
  if (action === 'copy-message') {
    const box = document.getElementById('copybox');
    if (box) {
      box.select();
      try {
        navigator.clipboard.writeText(box.value);
        toast(t('form.copied'));
      } catch {
        document.execCommand('copy');
        toast(t('form.copied'));
      }
    }
    return;
  }
});

document.addEventListener('change', (e) => {
  const el = e.target;
  const action = el.dataset ? el.dataset.action : null;

  if (el.id === 'lang' || action === 'lang') {
    state.lang = el.value;
    store.set('hcu.lang', state.lang);
    render({ keepScroll: true });
    return;
  }
  if (action === 'filter-insurer') { state.filters.insurer = el.value; render({ keepScroll: true }); return; }
  if (action === 'filter-cat') { state.filters.category = el.value; render({ keepScroll: true }); return; }
  if (action === 'filter-premium') { state.filters.premiumOnly = el.checked; render({ keepScroll: true }); return; }
  if (action === 'filter-benefit') {
    const v = el.value;
    state.filters.benefits = el.checked
      ? [...state.filters.benefits, v]
      : state.filters.benefits.filter((b) => b !== v);
    render({ keepScroll: true });
    return;
  }
  if (action === 'sort') { state.filters.sort = el.value; updatePlansPartial(); return; }
  if (action === 'diff-only') { state.diffOnly = el.checked; render({ keepScroll: true }); return; }
  if (action === 'enrol-check') {
    const idx = Number(el.dataset.idx);
    state.enrol = el.checked ? [...state.enrol, idx] : state.enrol.filter((i) => i !== idx);
    store.set('hcu.enrol', state.enrol);
    render({ keepScroll: true });
    return;
  }
});

document.addEventListener('input', (e) => {
  const el = e.target;

  if (el.dataset && el.dataset.action === 'filter-q') {
    state.filters.q = el.value;
    state.focusId = 'f-q';
    const host = document.getElementById('plans-results');
    if (host) {
      updatePlansPartial();
      const input = document.getElementById('f-q');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
      state.focusId = null;
    } else {
      render({ keepScroll: true });
    }
    return;
  }

  if (el.dataset && el.dataset.action === 'glossary-search') {
    const q = el.value.trim().toLowerCase();
    const grid = document.getElementById('glossary-grid');
    if (!grid) return;
    const list = GLOSSARY.filter((g) =>
      (g.term + ' ' + g.definition + ' ' + g.example).toLowerCase().includes(q)
    );
    grid.innerHTML = list.length
      ? list
          .map(
            (g) => `<button class="gloss" type="button" data-action="open-term" data-term="${g.id}" style="text-align:left">
              <span class="gloss__t">${esc(g.term)}${ICONS.plus}</span>
              <span class="gloss__d" style="display:block">${esc(g.definition)}</span>
              <span class="gloss__e" style="display:block"><b>${esc(t('guide.example'))}:</b> ${esc(g.example)}</span>
            </button>`
          )
          .join('')
      : `<p class="muted">${esc(t('guide.noTerms'))}</p>`;
    return;
  }

  if (el.dataset && el.dataset.action === 'insurer-search') {
    state.insurerQuery = el.value;
    state.focusId = 'iq';
    render({ keepScroll: true });
    return;
  }
});

/* contact form + hero search submit */
document.addEventListener('submit', (e) => {
  const form = e.target;
  const action = form.dataset ? form.dataset.action : null;

  if (action === 'hero-search') {
    e.preventDefault();
    const q = new FormData(form).get('q') || '';
    state.filters = { ...state.filters, q: String(q), category: 'all', insurer: 'all', benefits: [], premiumOnly: false };
    navigate('#/plans');
    return;
  }

  if (action === 'contact-form') {
    e.preventDefault();
    const data = new FormData(form);
    const values = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
    };
    const errors = {};
    if (!values.message) errors.message = t('form.errorMessage');
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) errors.email = t('form.errorEmail');

    state.contactValues = values;
    state.contactErrors = errors;

    if (Object.keys(errors).length) {
      state.contactSent = false;
      render({ keepScroll: true });
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.focus();
      return;
    }

    // Honest local simulation: nothing is transmitted.
    state.contactSent = true;
    render({ keepScroll: true });
    const box = document.querySelector('.success');
    if (box) box.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSheet();
    closeMenu();
  }
  if (e.key === 'Enter' && e.target.matches('.check-item input')) {
    // native checkbox behaviour already toggles; nothing extra needed
  }
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'drawerBack') closeMenu();
  if (e.target.id === 'sheetBack') closeSheet();
});

/* ---------------- start ---------------- */

window.addEventListener('hashchange', () => {
  closeMenu();
  parseRoute();
  render();
});

function boot() {
  if (!LANGS.some((l) => l.code === state.lang)) state.lang = 'en';
  mountStatic();
  parseRoute();
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
