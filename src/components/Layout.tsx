import { Outlet } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Layout() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Fixed Transparent Header */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-8 mix-blend-difference text-white pointer-events-none">
        <div className="w-1/3 flex justify-start pointer-events-auto">
          <button
            onClick={() => scrollTo('manifesto')}
            className="font-mono text-xs md:text-sm uppercase tracking-widest hover:text-muted-foreground transition-colors"
          >
            Menu
          </button>
        </div>

        <div className="w-1/3 flex justify-center pointer-events-auto"></div>

        <div className="w-1/3 flex justify-end pointer-events-auto">
          <button
            onClick={() => scrollTo('contact')}
            className="font-mono text-xs md:text-sm uppercase tracking-widest hover:text-muted-foreground transition-colors"
          >
            Contato
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full">
        <Outlet />
      </main>

      {/* Discreet WhatsApp Utility */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'fixed bottom-8 right-8 z-50 p-4 rounded-full',
          'bg-black border border-border group',
          'hover:border-muted-foreground transition-colors duration-500',
        )}
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors duration-500" />
      </a>
    </div>
  )
}

export default Layout
