import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Dashboard',
    default: 'Dashboard',
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-full flex-col">
      {/* TODO: add sidebar nav here */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
