import { ArrowUp, Linkedin, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/BrandLogo'
import { LocationMapVisual } from '@/components/LocationMapVisual'

const serviceItems = [
  { label: 'Diagnóstico Estratégico', href: '/diagnostico' },
  {
    label: 'Diagnóstico e Visibilidade Operacional',
  },
  {
    label: 'Controle de Projetos',
  },
  {
    label: 'Monitoramento Estatístico da Operação',
  },
  {
    label: 'Auditoria de Memórias de Cálculo',
  },
  {
    label: 'Lean Six Sigma & Melhoria de Processos',
  },
  {
    label: 'Modelagem Estatística de Custos',
  },
  {
    label: 'Gestão de Riscos Organizacionais',
  },
  {
    label: 'Transformação Organizacional e Gestão Estratégica',
  },
]

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Metodologia', href: '/metodologia' },
]

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/' && !window.location.hash) {
      e.preventDefault()
      scrollToTop()
    } else {
      scrollToTop()
    }
  }

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto pl-3 pr-6 sm:pl-4 sm:pr-6 lg:pl-4 lg:pr-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4 items-start">
            <Link
              to="/"
              onClick={handleLogoClick}
              aria-label="Ir para a Home"
              className="inline-flex items-center w-fit p-1 -ml-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-opacity hover:opacity-90"
            >
              <BrandLogo
                height={48}
                className="md:[&>img]:h-14 md:[&>img]:w-14 [&>img]:h-12 [&>img]:w-12"
                textClassName="text-xl md:text-2xl"
              />
            </Link>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Consultoria em dados, processos e indicadores de gestão.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.linkedin.com/company/mathops-strategy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@mathops.com.br"
                className="w-11 h-11 flex items-center justify-center border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors duration-300"
                aria-label="E-mail"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Navegação</h4>
            {navLinks.map((link) => {
              if (link.href.startsWith('/#')) {
                const targetId = link.href.replace('/#', '')
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={(e) => {
                      if (window.location.pathname === '/') {
                        e.preventDefault()
                        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                )
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 min-h-[44px] flex items-center"
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Serviços</h4>
            {serviceItems.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 min-h-[36px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  key={item.label}
                  className="text-sm text-zinc-400 select-none inline-flex items-center gap-2 min-h-[36px]"
                >
                  {item.label}
                </span>
              ),
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Contato</h4>
            <div className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-zinc-400" />
              <span>Avenida Brigadeiro Faria Lima, 1811 - ESC 1119, Jardim Paulistano/SP</span>
            </div>

            {/* Visual elegante do mapa estilizado dark da MathOps */}
            <LocationMapVisual className="mt-1 mb-1" />

            <a
              href="mailto:contato@mathops.com.br"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
            >
              contato@mathops.com.br
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-300 mt-2 min-h-[44px] py-2"
            >
              Voltar ao topo
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} MathOps Strategy. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/termos-de-uso"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-300"
            >
              Termos de Uso
            </Link>
            <Link
              to="/politica-de-privacidade"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-300"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
