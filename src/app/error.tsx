'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to your error reporting service here
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        An unexpected error occurred. Please try again, or contact support if the
        problem persists.
      </p>
      {error.digest && (
        <p className="font-mono text-xs text-zinc-400">ID: {error.digest}</p>
      )}
      <Button onClick={reset} variant="secondary">
        Try again
      </Button>
    </div>
  )
}
