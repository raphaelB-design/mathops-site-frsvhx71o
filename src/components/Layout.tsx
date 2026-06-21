import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { trackClick } from '@/services/analytics'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const navLinks = [
    { label: 'Sobre a MathOps', path: '/sobre' },
    { label: 'Serviços', id: 'services' },
    { label: 'Metodologia', path: '/metodologia' },
    { label: 'Setores', id: 'industries' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-black/90 backdrop-blur-xl border-white/10'
            : 'bg-transparent border-transparent',
        )}
      >
        <Link
          to="/"
          className="font-display font-bold text-xl tracking-tight cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          MathOps<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm tracking-wider text-muted-foreground">
          {navLinks.map((link) =>
            link.path ? (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id!)}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.goskip.dev/raphael-batista-743c8/builder/1094ba2d-765b-4854-b5f2-c331d8d10ef4"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('crm_access_click', 'header_desktop')}
            className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-white border border-white/20 px-5 py-2.5 hover:bg-white hover:text-black transition-colors"
          >
            Área do Cliente
          </a>
          <a
            href="https://wa.me/5511991553336?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista%20MathOps"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('whatsapp_click', 'navbar')}
            className="bg-white text-black px-5 py-2.5 font-display font-semibold text-sm hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
          >
            Falar com Especialista <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display font-bold text-xl"
            >
              MathOps<span className="text-accent">.</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Fechar menu"
              className="p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8 font-display text-2xl tracking-wider">
            {navLinks.map((link) =>
              link.path ? (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id!)}
                  className="hover:text-accent transition-colors"
                >
                  {link.label}
                </button>
              ),
            )}
            <a
              href="https://www.goskip.dev/raphael-batista-743c8/builder/1094ba2d-765b-4854-b5f2-c331d8d10ef4"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setIsMobileMenuOpen(false)
                trackClick('crm_access_click', 'header_mobile')
              }}
              className="mt-8 font-mono text-sm font-bold uppercase tracking-[0.08em] text-white border border-white/20 px-8 py-4 w-full max-w-xs text-center hover:bg-white hover:text-black transition-colors"
            >
              Área do Cliente
            </a>
            <a
              href="https://wa.me/5511991553336?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista%20MathOps"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setIsMobileMenuOpen(false)
                trackClick('whatsapp_click', 'mobile_menu')
              }}
              className="mt-4 bg-white text-black px-8 py-4 font-bold text-lg w-full max-w-xs hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              Falar com Especialista <ArrowUpRight className="w-5 h-5" />
            </a>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full mt-[72px]">
        <Outlet />
      </main>

      <FloatingWhatsApp />
    </div>
  )
}

export default Layout
