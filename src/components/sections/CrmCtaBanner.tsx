import { ArrowUpRight } from 'lucide-react'
import { trackClick } from '@/services/analytics'

export function CrmCtaBanner() {
  const handleClick = () => {
    trackClick('crm_access_click', 'home_banner')
  }

  return (
    <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)]" />
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
          Acesso ao Sistema
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-serif leading-relaxed">
          Portal centralizado para Clientes, Consultores e Administradores. Acesse agora para
          gerenciar seus projetos e processos.
        </p>
        <a
          href="https://www.goskip.dev/raphael-batista-743c8/builder/1094ba2d-765b-4854-b5f2-c331d8d10ef4"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-mono font-bold text-sm hover:bg-gray-200 hover:scale-105 transition-all duration-300 uppercase tracking-[0.1em]"
        >
          Acessar CRM <ArrowUpRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
