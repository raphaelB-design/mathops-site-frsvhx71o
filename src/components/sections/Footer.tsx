import { ArrowUp, Linkedin, Mail, MapPin, SlidersHorizontal } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { BrandLogo } from '@/components/BrandLogo'
import { LocationMapVisual } from '@/components/LocationMapVisual'
import { useConsent } from '@/hooks/use-consent'

const serviceItems = [
  {
    label: 'Diagnóstico Estratégico',
    targetId: 'servico-diagnostico-estrategico',
  },
  {
    label: 'Diagnóstico e Visibilidade Operacional',
    targetId: 'servico-diagnostico-e-visibilidade-operacional',
  },
  {
    label: 'Controle de Projetos',
    targetId: 'servico-controle-projetos-obra-evm',
  },
  {
    label: 'Monitoramento Estatístico da Operação',
    targetId: 'servico-monitoramento-estatistico-operacao',
  },
  {
    label: 'Auditoria de Memórias de Cálculo',
    targetId: 'servico-memorias',
  },
  {
    label: 'Lean Six Sigma & Melhoria de Processos',
    targetId: 'servico-lean-six-sigma-processos',
  },
  {
    label: 'Modelagem Estatística de Custos',
    targetId: 'servico-modelagem-estatistica-custos',
  },
  {
    label: 'Gestão de Riscos Organizacionais',
    targetId: 'servico-gestao-riscos-organizacionais',
  },
  {
    label: 'Transformação Organizacional e Gestão Estratégica',
    targetId: 'servico-transformacao-organizacional',
  },
]

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Metodologia', href: '/metodologia' },
]

export function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  const { openPreferences } = useConsent()

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
              Consultoria boutique em dados, processos e indicadores de gestão.
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
            {serviceItems.map((item) => {
              const href = `/#${item.targetId}`
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                const prefersReducedMotion = window.matchMedia(
                  '(prefers-reduced-motion: reduce)',
                ).matches

                if (location.pathname === '/') {
                  e.preventDefault()
                  // Atualiza hash na URL sem recarregar
                  window.history.pushState(null, '', href)
                  const el = document.getElementById(item.targetId)
                  if (el) {
                    el.scrollIntoView({
                      behavior: prefersReducedMotion ? 'auto' : 'smooth',
                      block: 'center',
                    })
                    // Dispara evento para highlight visual imediato se já estava em hash igual
                    window.dispatchEvent(new HashChangeEvent('hashchange'))
                  }
                } else {
                  // Se vier de outra página (ex: /diagnostico, /metodologia), usa navigate
                  e.preventDefault()
                  navigate(href)
                }
              }

              return (
                <Link
                  key={item.label}
                  to={href}
                  onClick={handleClick}
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 min-h-[36px] focus:outline-none focus-visible:text-white focus-visible:underline"
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Contato</h4>
            <div className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-zinc-400" />
              <span>Avenida Brigadeiro Faria Lima, 1811 /SP</span>
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
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={openPreferences}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-300 py-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
              <span>Privacidade e cookies</span>
            </button>
            <Link
              to="/privacidade"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-300 py-1"
            >
              Privacidade
            </Link>
            <Link
              to="/termos-de-uso"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-300 py-1"
            >
              Termos de Uso
            </Link>
            <Link
              to="/politica-de-privacidade"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-300 py-1"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
