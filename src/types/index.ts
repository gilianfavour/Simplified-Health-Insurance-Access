// ─── Common utility types ───────────────────────────────────────────────────

/** Make selected keys of T required */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

/** Make selected keys of T optional */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/** Unwrap a Promise */
export type Awaited<T> = T extends Promise<infer U> ? U : T

/** Generic API response envelope */
export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string }

/** Standard paginated response */
export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ─── User / Auth ─────────────────────────────────────────────────────────────

export type Role = 'admin' | 'user' | 'guest'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  createdAt: string
  updatedAt: string
}

export interface Session {
  user: Pick<User, 'id' | 'name' | 'email' | 'role'>
  expiresAt: string
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}
