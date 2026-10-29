'use client'

import { useActionState } from 'react'
import { loginAction } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { ApiResponse } from '@/types'

export function LoginForm() {
  const [state, action, isPending] = useActionState<ApiResponse | null, FormData>(
    loginAction,
    null,
  )

  return (
    <form action={action} className="flex flex-col gap-4" noValidate>
      {state && !state.success && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </p>
      )}

      <Input
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
      />

      <Button type="submit" isLoading={isPending} className="w-full">
        Sign in
      </Button>
    </form>
  )
}
