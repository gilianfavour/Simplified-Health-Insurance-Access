import 'server-only'
import { cookies } from 'next/headers'
import type { Session } from '@/types'

const SESSION_COOKIE = 'session'

/**
 * Read the current session from cookies.
 * Returns null if no session is found or it has expired.
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(SESSION_COOKIE)?.value

  if (!raw) return null

  try {
    const session = JSON.parse(raw) as Session
    if (new Date(session.expiresAt) < new Date()) return null
    return session
  } catch {
    return null
  }
}

/**
 * Require a valid session. Throws if the user is not authenticated.
 * Use this at the top of Server Actions or Route Handlers.
 */
export async function requireSession(): Promise<Session> {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')
  return session
}
