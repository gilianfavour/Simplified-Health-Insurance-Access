import Link from 'next/link'
import { APP_NAME, ROUTES } from '@/constants'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href={ROUTES.home}
          className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {APP_NAME}
        </Link>
      </div>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
