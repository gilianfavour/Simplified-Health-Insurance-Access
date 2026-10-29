import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Overview',
}

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-sm text-zinc-500">Welcome back. Here&apos;s your overview.</p>
    </div>
  )
}
