/**
 * Client-safe runtime config.
 * Only NEXT_PUBLIC_* variables are accessible here.
 * Never put secrets in this file.
 */
export const config = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? 'development',
} as const

export type Config = typeof config
