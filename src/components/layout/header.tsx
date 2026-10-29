import Link from 'next/link'
import { APP_NAME, ROUTES } from '@/constants'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.home}
          className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {APP_NAME}
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <li>
              <Link
                href={ROUTES.login}
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.register}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Get started
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
