import { ArrowUp, Linkedin, Github, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export function Footer() {
  const { user } = useAuth()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const clientAreaRoute = user ? '/dashboard' : '/login'

  return (
    <footer className="pt-20 pb-10 px-6 md:px-12 bg-background border-t border-white/10 w-full flex flex-col">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-6">
          <Link
            to="/"
            className="font-display font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity"
            onClick={scrollToTop}
          >
            MathOps<span className="text-accent">.</span>
          </Link>
          <p className="font-body text-sm text-muted-foreground leading-relaxed pr-4">
            Consultoria de alta performance especializada em transformar dados em decisões
            estratégicas e automação de processos complexos.
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
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Column 2: Serviços */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-2">
            Serviços
          </h4>
          <Link
            to="/servicos/diagnostico-e-visibilidade"
            className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Diagnóstico e Visibilidade
          </Link>
          <Link
            to="/servicos/analise-e-modelagem"
            className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Análise e Modelagem
          </Link>
          <Link
            to="/servicos/solucao-e-recorrencia"
            className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Solução e Recorrência
          </Link>
          <Link
            to="/servicos/inteligencia-artificial"
            className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Inteligência Artificial
          </Link>
        </div>

        {/* Column 3: Institucional */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-2">
            Institucional
          </h4>
          <a
            href="/#methodology"
            className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Metodologia
          </a>
          <Link
            to="/carreiras"
            className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Trabalhe Conosco
          </Link>
          <Link
            to={clientAreaRoute}
            className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Área do Cliente
          </Link>
        </div>

        {/* Column 4: Contato & Legal */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-2">
            Contato & Legal
          </h4>
          <a
            href="mailto:contato@mathops.com.br"
            className="font-body text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" /> contato@mathops.com.br
          </a>
          <div className="font-body text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" /> São Paulo, Brasil
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="#"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              to="#"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest text-center md:text-left">
          © {new Date().getFullYear()} MathOps Strategy.
        </p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase tracking-widest hover:text-white transition-colors group"
        >
          Voltar ao topo{' '}
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  )
}
