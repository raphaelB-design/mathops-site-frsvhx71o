import { FadeIn } from '@/components/fade-in'

export function Footer() {
  return (
    <footer
      id="contact"
      className="pt-[120px] px-6 md:px-12 w-full bg-black border-t border-border flex flex-col"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-32">
        <FadeIn delay={0}>
          <div className="flex flex-col">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">
              Escritório
            </h4>
            <p className="font-body text-lg text-muted">
              Av. Brigadeiro Faria Lima, 3477
              <br />
              14º Andar - Itaim Bibi
              <br />
              São Paulo, SP - Brasil
              <br />
              04538-133
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-col">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">Contato</h4>
            <p className="font-body text-lg text-muted">
              +55 11 3000-0000
              <br />
              contato@vargasparentoni.com.br
            </p>
            <p className="font-body text-lg text-muted mt-4">
              Atendimento exclusivo com hora marcada.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex flex-col">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">
              Registro
            </h4>
            <p className="font-body text-lg text-muted">
              OAB/SP 12.345
              <br />
              Sociedade de Advogados
            </p>
          </div>
        </FadeIn>

        {/* Empty column for balance on large screens */}
        <div className="hidden lg:block"></div>
      </div>

      {/* Massive Wordmark Signature */}
      <div className="w-full flex justify-center items-center overflow-hidden py-12">
        <FadeIn delay={300} className="w-full">
          <h2 className="font-display text-[clamp(4rem,11vw,14rem)] leading-[0.8] uppercase tracking-extreme text-center text-white opacity-90 whitespace-nowrap overflow-visible pl-4 md:pl-12">
            SEU <br />
            NOME
          </h2>
        </FadeIn>
      </div>

      <div className="w-full py-8 mt-12 border-t border-border flex justify-between items-center">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vargas Parentoni. Todos os direitos reservados.
        </p>
        <p className="font-mono text-xs text-muted-foreground hidden md:block">Design por Skip</p>
      </div>
    </footer>
  )
}
