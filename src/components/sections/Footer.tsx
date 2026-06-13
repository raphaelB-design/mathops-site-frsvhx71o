import { FadeIn } from '@/components/fade-in'

export function Footer() {
  return (
    <footer id="contact" className="pt-[120px] px-6 md:px-12 w-full bg-black flex flex-col">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-32">
        <FadeIn delay={0}>
          <div className="flex flex-col">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">
              Operações
            </h4>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Atendimento Global
              <br />
              Digital-First Model
              <br />
              Sede Executiva: São Paulo, SP
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-col">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">Contato</h4>
            <a
              href="mailto:strategy@mathops.com.br"
              className="font-body text-lg text-muted-foreground hover:text-white transition-colors mb-4"
            >
              strategy@mathops.com.br
            </a>
            <p className="font-body text-sm text-muted-foreground/70">
              Atendimento corporativo e diagnóstico técnico exclusivo com agendamento prévio.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex flex-col">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-6">
              Certificações
            </h4>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Lean Six Sigma Black Belt
              <br />
              LGPD Compliance Framework
              <br />
              ISO 9001 Guidelines
            </p>
          </div>
        </FadeIn>

        <div className="hidden lg:block"></div>
      </div>

      <div className="w-full flex justify-center items-center overflow-hidden py-12">
        <FadeIn delay={300} className="w-full">
          <h2 className="font-display text-[clamp(4rem,14vw,18rem)] leading-[0.8] uppercase tracking-tighter text-center text-white opacity-90 whitespace-nowrap overflow-visible">
            MATHOPS
          </h2>
        </FadeIn>
      </div>

      <div className="w-full py-8 mt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          © {new Date().getFullYear()} MathOps Strategy. Todos os direitos reservados.
        </p>
        <div className="flex gap-8 font-mono text-xs text-muted-foreground uppercase tracking-wider">
          <a href="#" className="hover:text-white transition-colors">
            Privacidade
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Termos
          </a>
        </div>
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider hidden md:block">
          Design por Skip
        </p>
      </div>
    </footer>
  )
}
