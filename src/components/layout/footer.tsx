import { APP_NAME } from '@/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 text-sm text-zinc-500 sm:px-6 lg:px-8">
        <p>
          &copy; {year} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
