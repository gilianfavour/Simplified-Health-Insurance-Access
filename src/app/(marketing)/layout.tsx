import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  )
}
