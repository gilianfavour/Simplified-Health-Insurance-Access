import type { Metadata } from 'next'
import Link from 'next/link'
import { ROUTES } from '@/constants'
import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Sign in to your account to continue.
        </p>
      </div>

      <LoginForm />

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Don&apos;t have an account?{' '}
        <Link
          href={ROUTES.register}
          className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-50"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
