import { FadeIn } from '@/components/fade-in'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Qual o diferencial competitivo da abordagem MathOps?',
    a: 'Ao contrário de consultorias tradicionais que apenas apontam problemas, a abordagem MathOps alia o método Lean Six Sigma à matemática aplicada e engenharia de dados. Entregamos a arquitetura completa: desde o mapeamento até a automação do dashboard, garantindo rigor quantitativo e precisão em cada etapa.',
  },
  {
    q: 'Como funciona o Diagnóstico Estratégico Gratuito?',
    a: 'É uma sessão técnica de 45 minutos onde mapeamos os principais desafios da sua operação, avaliamos o nível de maturidade dos seus dados e propomos um roadmap inicial de melhorias, sem compromisso.',
  },
  {
    q: 'Quais os requisitos para minha infraestrutura de TI interna?',
    a: 'Nossa metodologia é agnóstica e adaptável. Avaliamos sua infraestrutura atual (seja ela baseada em planilhas, ERPs legados ou nuvem) e desenhamos a solução mais eficiente para a sua realidade, minimizando custos de licenciamento e fricção tecnológica.',
  },
  {
    q: 'Como é garantida a segurança e conformidade com a LGPD?',
    a: 'Todos os nossos processos seguem frameworks rígidos de segurança da informação e governança de dados. Aplicamos técnicas de anonimização, controle de acessos (RBAC) e auditoria completa para garantir compliance total com a LGPD e outras normativas.',
  },
]

export function FAQ() {
  return (
    <section className="py-[120px] px-6 md:px-12 w-full bg-black">
      <div className="max-w-4xl mx-auto w-full">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-12 text-center">
            Knowledge Base · Dúvidas Estratégicas
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/20">
                <AccordionTrigger className="text-left font-display text-2xl md:text-3xl hover:text-white text-white/80 transition-colors py-8 data-[state=open]:text-white">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-lg text-muted-foreground pb-8 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  )
}
