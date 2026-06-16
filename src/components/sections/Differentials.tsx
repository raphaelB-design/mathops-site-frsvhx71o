import { FadeIn } from '@/components/fade-in'

const diffs = [
  {
    title: 'Agnóstico em Tecnologia',
    desc: 'Não vendemos software. Construímos soluções utilizando as melhores ferramentas (Open Source ou Enterprise) adequadas à sua realidade.',
  },
  {
    title: 'Matemática Aplicada',
    desc: 'Fugimos dos dashboards cosméticos. Nosso foco está nos algoritmos e regras de negócio por trás da interface gráfica.',
  },
  {
    title: 'Transferência de Know-How',
    desc: 'Documentamos todo o código e modelo arquitetural para que sua equipe interna tenha total autonomia operacional pós-projeto.',
  },
  {
    title: 'Escalabilidade Desenvolvida',
    desc: 'Soluções desenhadas para suportar crescimento em volume de dados (Big Data) sem degradação de performance.',
  },
  {
    title: 'Segurança by Design',
    desc: 'Arquiteturas de dados concebidas desde o dia zero sob as diretrizes de governança corporativa e conformidade (LGPD/GDPR).',
  },
  {
    title: 'ROI Comprovado',
    desc: 'Todo projeto inicia com a definição clara de KPIs financeiros e operacionais para demonstrar o retorno exato sobre o investimento.',
  },
]

export function Differentials() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 w-full bg-white/5 border-t border-white/10">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Por que MathOps Strategy?
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diffs.map((diff, idx) => (
            <FadeIn key={idx} delay={idx * 100}>
              <div className="flex flex-col gap-4">
                <div className="w-8 h-1 bg-accent mb-2" />
                <h3 className="font-display text-xl font-bold">{diff.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed text-sm">
                  {diff.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
