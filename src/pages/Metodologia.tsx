import { Methodology as DMAIC } from '@/components/sections/Methodology'
import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { HowItWorks } from '@/components/sections/HowItWorks'

export default function Metodologia() {
  return (
    <div className="w-full flex flex-col">
      {/* Methodology Page Hero */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 w-full overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/15 blur-[120px] rounded-full z-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center mt-12 mb-12">
          <FadeIn delay={100}>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-6 block">
              O Caminho do Resultado
            </span>
          </FadeIn>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-[0.95] tracking-tight mb-8 text-white flex flex-col items-center gap-y-2">
            <span className="flex flex-wrap justify-center gap-x-4">
              <SlideUpMask delay={200}>Nossa</SlideUpMask>
              <SlideUpMask delay={300}>
                <em className="text-accent not-italic">Metodologia</em>
              </SlideUpMask>
            </span>
          </h1>
          <FadeIn delay={400}>
            <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Transformamos complexidade analítica em clareza estratégica através de um processo
              rigoroso e transparente.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Process Section */}
      <HowItWorks />

      {/* DMAIC Section */}
      <DMAIC />

      {/* Mathematical Modeling Section */}
      <section className="py-24 px-6 md:px-12 w-full bg-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto w-full relative z-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="md:w-1/3 shrink-0">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                  Modelagem Matemática
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                  Estruturando o Caos
                </h2>
              </div>
              <div className="md:w-2/3 flex flex-col gap-6 font-body text-muted-foreground text-lg leading-relaxed">
                <p>
                  A incerteza pode ser tratada como parâmetro modelável, não como limite fixo do
                  planejamento. Utilizamos técnicas avançadas de Pesquisa Operacional e otimização
                  não-linear para traduzir desafios operacionais complexos em equações
                  determinísticas.
                </p>
                <p>
                  Criamos Digital Twins (Gêmeos Digitais) da sua cadeia de valor. Isso nos permite
                  simular milhares de cenários hipotéticos de estresse, validando a robustez de cada
                  decisão antes que um único real seja alocado.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-6 md:px-12 w-full bg-white/5 relative overflow-hidden border-t border-white/5">
        <div className="max-w-4xl mx-auto w-full relative z-10">
          <FadeIn>
            <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
              <div className="md:w-1/3 shrink-0">
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                  Estatística Avançada
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                  Separando o Sinal do Ruído
                </h2>
              </div>
              <div className="md:w-2/3 flex flex-col gap-6 font-body text-muted-foreground text-lg leading-relaxed">
                <p>
                  Em mercados saturados de dados, a maioria das empresas reage a anomalias
                  estatísticas como se fossem tendências reais. Nossa camada de inteligência
                  estatística garante que cada insight extraído tenha validade comprobatória.
                </p>
                <p>
                  Aplicamos Controle Estatístico de Processo (CEP), inferência bayesiana e análise
                  de séries temporais não-estacionárias para prever gargalos, dimensionar estoques
                  de segurança e isolar variáveis de confusão que distorcem o ROI real de suas
                  operações.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
