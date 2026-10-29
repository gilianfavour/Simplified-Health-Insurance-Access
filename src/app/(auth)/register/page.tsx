import type { Metadata } from 'next'
import Link from 'next/link'
import { ROUTES } from '@/constants'

export const metadata: Metadata = {
  title: 'Create account',
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Get started for free today.
        </p>
      </div>

      {/* TODO: add RegisterForm component similar to LoginForm */}
      <p className="text-sm text-zinc-500">Registration form coming soon.</p>

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Already have an account?{' '}
        <Link
          href={ROUTES.login}
          className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-50"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
