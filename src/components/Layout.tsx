import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, ArrowRight, ExternalLink } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { BrandLogo } from '@/components/BrandLogo'
import { trackClick } from '@/services/analytics'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { FloatingContactWidget } from '@/components/FloatingContactWidget'
import { Footer } from '@/components/sections/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Metodologia', href: '/metodologia' },
]

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: id.startsWith('servico-') ? 'center' : 'start',
          })
        }
      }
      // Executa logo e com um pequeno delay para aguardar carregamento de componentes assíncronos/lazy
      const timer1 = setTimeout(scrollToTarget, 50)
      const timer2 = setTimeout(scrollToTarget, 250)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [location.pathname, location.hash])

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false)
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '')
      if (location.pathname === '/') {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: id.startsWith('servico-') ? 'center' : 'start',
          })
        }
      }
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false)
    if (location.pathname === '/' && !location.hash) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (location.pathname === '/' && location.hash) {
      // Se estiver em '/' mas com hash, deixa navegar para '/' e rola suave ao topo
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Se estiver em outra rota, navega para '/' e garante que o scroll inicial seja 0
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavCRM = () => {
    trackClick('crm_portal_open', 'navbar')
  }

  const handleMobileDiagnostic = () => {
    setIsMenuOpen(false)
    trackClick('diagnostic_open', 'mobile_menu')
  }

  return (
    <div className="min-h-screen bg-black">
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent',
        )}
      >
        <nav className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 flex items-center justify-between h-20 md:h-22">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="inline-flex items-center p-1 -ml-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-opacity hover:opacity-90"
            aria-label="Ir para a Home"
          >
            <BrandLogo
              height={48}
              className="md:[&>img]:h-14 md:[&>img]:w-14 [&>img]:h-12 [&>img]:w-12"
              textClassName="text-xl md:text-2xl"
            />
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={cn(
                  'inline-flex items-center text-sm tracking-wide transition-colors duration-300 min-h-[44px] px-2',
                  location.pathname === link.href ? 'text-white' : 'text-zinc-400 hover:text-white',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Porta de entrada do CRM dos clientes (abre em nova aba) */}
          {/* TODO: substituir pela URL real do CRM quando o usuário fornecer */}
          <a
            href="https://crm.mathops.com.br"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavCRM}
            className="hidden lg:inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium tracking-wide rounded-sm min-h-[44px] bg-accent/10 border border-accent/40 text-white hover:bg-accent/20 hover:border-accent/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Área do Cliente (Acessar CRM MathOps em nova aba)"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-zinc-200 group-hover:text-white transition-colors text-sm font-medium">
                Área do Cliente
              </span>
            </span>

            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform transition-colors" />
          </a>
          <button
            className="lg:hidden text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
            <SheetTitle className="text-left">
              <Link
                to="/"
                onClick={handleLogoClick}
                aria-label="Ir para a Home"
                className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <BrandLogo
                  height={48}
                  className="sm:[&>img]:h-14 sm:[&>img]:w-14 [&>img]:h-12 [&>img]:w-12"
                  textClassName="text-xl sm:text-2xl"
                />
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 mt-12 px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-lg font-serif transition-colors duration-300 min-h-[44px] py-3 flex items-center',
                  location.pathname === link.href ? 'text-white' : 'text-zinc-400 hover:text-white',
                )}
                onClick={() => handleLinkClick(link.href)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/diagnostico"
              onClick={handleMobileDiagnostic}
              className="inline-flex items-center justify-center gap-2 btn-primary-gradient px-5 py-3.5 text-sm font-medium tracking-wide rounded-sm mt-4 min-h-[44px]"
            >
              Solicitar Diagnóstico Estratégico
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <FloatingContactWidget />
      <CookieBanner />
    </div>
  )
}
