// ─── App ─────────────────────────────────────────────────────────────────────

export const APP_NAME = 'Simplified Health Insurance Access'
export const APP_DESCRIPTION =
  'Making health insurance simpler and more accessible for everyone.'

// ─── Routes ──────────────────────────────────────────────────────────────────

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
} as const

// ─── Pagination ───────────────────────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100
