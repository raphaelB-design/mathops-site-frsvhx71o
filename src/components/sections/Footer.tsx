import { ArrowUp, Linkedin, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const serviceLinks = [
  { label: 'Diagnóstico e Visibilidade', slug: 'diagnostico-e-visibilidade' },
  { label: 'Análise e Modelagem', slug: 'analise-e-modelagem' },
  { label: 'Solução e Recorrência', slug: 'solucao-e-recorrencia' },
  { label: 'Inteligência Artificial', slug: 'inteligencia-artificial', isNew: true },
]

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="pt-20 pb-10 px-6 md:px-12 bg-black border-t border-white/10 w-full flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        {/* Pre-footer CTA */}

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link
              to="/"
              onClick={scrollToTop}
              className="font-display font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity"
            >
              MathOps<span className="text-accent">.</span>
            </Link>
            <p className="font-body text-sm text-muted-foreground leading-relaxed pr-4">
              Consultoria boutique especializada em modelagem matemática, automação de processos e
              inteligência analítica para operações complexas.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-2">
              Serviços
            </h4>
            {serviceLinks.map((s) => (
              <Link
                key={s.slug || s.path}
                to={s.path || `/servicos/${s.slug}`}
                className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-white transition-colors"
              >
                {s.label}
                {s.isNew && null}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-2">
              Empresa
            </h4>
            <Link
              to="/sobre"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Sobre a MathOps
            </Link>
            <Link
              to="/metodologia"
              onClick={scrollToTop}
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Metodologia
            </Link>
            <Link
              to="/carreiras"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Trabalhe Conosco
            </Link>
            <a
              href="https://www.goskip.dev/raphael-batista-743c8/builder/1094ba2d-765b-4854-b5f2-c331d8d10ef4"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Área do Cliente
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-2">
              Contato
            </h4>
            <a
              href="mailto:contato@mathopsstrategy.com.br"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" /> contato@mathopsstrategy.com.br
            </a>
            <div className="font-body text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" /> São Paulo, SP — Brasil
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/termos-de-uso"
                onClick={scrollToTop}
                className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                to="/politica-de-privacidade"
                onClick={scrollToTop}
                className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
              >
                Política de Privacidade (LGPD)
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} MathOps Strategy. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase tracking-widest hover:text-white transition-colors group"
          >
            Voltar ao topo{' '}
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
