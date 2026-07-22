import { ArrowUp, Linkedin, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/BrandLogo'

const serviceLinks = [
  { label: 'Diagnóstico e Visibilidade', slug: 'diagnostico-e-visibilidade' },
  { label: 'Análise e Modelagem', slug: 'analise-e-modelagem' },
]

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Metodologia', href: '/metodologia' },
]

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <Link to="/">
              <BrandLogo textClassName="text-white font-serif text-2xl" />
            </Link>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Consultoria boutique em modelagem matemática, automação e inteligência analítica.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contato@mathops.com.br"
                className="w-9 h-9 flex items-center justify-center border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors duration-300"
                aria-label="E-mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Navegação</h4>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Serviços</h4>
            {serviceLinks.map((link) => (
              <Link
                key={link.slug}
                to={`/servicos/${link.slug}`}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Contato</h4>
            <div className="flex items-start gap-2 text-sm text-zinc-400">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>São Paulo, Brasil</span>
            </div>
            <a
              href="mailto:contato@mathops.com.br"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
            >
              contato@mathops.com.br
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-300 mt-2"
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
