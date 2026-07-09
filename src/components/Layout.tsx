import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, Scale, ArrowRight } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { trackClick } from '@/services/analytics'
import { useDiagnosticModal } from '@/context/DiagnosticModalContext'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { Footer } from '@/components/sections/Footer'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Metodologia', href: '/metodologia' },
  { label: 'Carreiras', href: '/carreiras' },
]

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { openDiagnostic } = useDiagnosticModal()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const handleNavDiagnostic = () => {
    trackClick('diagnostic_open', 'navbar')
    openDiagnostic()
  }

  const handleMobileDiagnostic = () => {
    setIsMenuOpen(false)
    trackClick('diagnostic_open', 'mobile_menu')
    openDiagnostic()
  }

  return (
    <div className="min-h-screen bg-black">
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent',
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-white" />
            <span className="font-serif text-xl text-white tracking-tight">MathOps</span>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm tracking-wide transition-colors duration-300',
                  location.pathname === link.href ? 'text-white' : 'text-zinc-400 hover:text-white',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            onClick={handleNavDiagnostic}
            className="hidden lg:inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 text-sm font-medium tracking-wide hover:bg-zinc-200 transition-all duration-300"
          >
            Solicitar Diagnóstico Estratégico
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="bg-black border-white/10 w-full sm:w-96">
          <SheetHeader>
            <SheetTitle className="text-white font-serif text-2xl">MathOps</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 mt-12 px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-lg font-serif transition-colors duration-300',
                  location.pathname === link.href ? 'text-white' : 'text-zinc-400 hover:text-white',
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleMobileDiagnostic}
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 text-sm font-medium tracking-wide hover:bg-zinc-200 transition-all duration-300 mt-4"
            >
              Solicitar Diagnóstico Estratégico
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </SheetContent>
      </Sheet>
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
