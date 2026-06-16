import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="pt-20 pb-10 px-6 md:px-12 bg-background border-t border-white/10 w-full flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="font-display font-bold text-2xl tracking-tight">
            MathOps<span className="text-accent">.</span>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Consultoria boutique especializada em Engenharia de Dados, Lean Six Sigma e Pesquisa
            Operacional para empresas complexas.
          </p>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              Links
            </h4>
            <a
              href="#services"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Serviços
            </a>
            <a
              href="#methodology"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Metodologia
            </a>
            <a
              href="#industries"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Setores
            </a>
            <Link
              to="/login"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Área do Cliente
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              Legal
            </h4>
            <a
              href="#"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Privacidade
            </a>
            <a
              href="#"
              className="font-body text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
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
