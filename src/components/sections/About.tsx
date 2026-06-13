import { FadeIn } from '@/components/fade-in'

export function About() {
  return (
    <section
      id="about"
      className="py-[120px] px-6 md:px-12 w-full bg-black border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-16">
            Liderança · Posicionamento
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <FadeIn delay={200}>
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 group">
                <img
                  src="https://img.usecurling.com/ppl/large?gender=male&seed=33"
                  alt="Chief Data Strategist"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="font-display text-4xl md:text-5xl text-white mb-2 leading-none uppercase">
                    Chief Data Strategist
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-white/70">
                    MathOps & Strategy
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <FadeIn delay={400}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.9] tracking-tight mb-8">
                A Missão: Conectar dados brutos a decisões corporativas.
              </h2>
              <div className="space-y-6 font-body text-xl md:text-2xl text-muted-foreground leading-relaxed">
                <p>
                  A ausência de uma arquitetura analítica robusta transforma o processo decisório em
                  uma aposta. Minha atuação foca em eliminar essa incerteza estruturando operações
                  baseadas na previsibilidade e na precisão matemática.
                </p>
                <p>
                  Com ampla expertise em Lean Six Sigma e Engenharia de Dados, lidero projetos que
                  vão da fundação da infraestrutura à implementação de inteligência analítica em
                  alta escala.
                </p>
                <p className="text-white border-l-2 border-white pl-6 py-2 mt-4 font-medium">
                  "Não somos apenas técnicos; somos tradutores do rigor científico para o idioma dos
                  negócios."
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
