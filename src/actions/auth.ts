'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ROUTES } from '@/constants'
import type { ApiResponse } from '@/types'

export async function loginAction(
  _prev: ApiResponse | null,
  formData: FormData,
): Promise<ApiResponse> {
  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' }
  }

  // TODO: verify credentials against your auth provider / database
  // Example: const user = await verifyCredentials(email, password)
  // if (!user) return { success: false, error: 'Invalid credentials.' }

  // Placeholder: set a session cookie and redirect
  const cookieStore = await cookies()
  cookieStore.set('session', JSON.stringify({ user: { email } }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  redirect(ROUTES.dashboard)
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect(ROUTES.login)
}
