import { FadeIn } from '@/components/fade-in'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Helmet } from '@/components/Helmet'

const faqs = [
  {
    question: 'Como começamos a trabalhar juntos?',
    answer:
      'Pelo Diagnóstico Estratégico: em 2 semanas mapeamos seus processos e indicadores e entregamos um roadmap com escopo e KPIs definidos. Se não houver fit, devolvemos 100% do valor.',
  },
  {
    question: 'Qual a duração típica de um projeto?',
    answer:
      'O Diagnóstico leva 2 semanas. Os serviços variam de 1 a 12 semanas, conforme o escopo definido no roadmap.',
  },
  {
    question: 'Não temos dados perfeitamente estruturados. Vocês podem ajudar?',
    answer:
      'Sim. A etapa inicial de nossa metodologia é dedicada a auditar, higienizar e estruturar os dados que você possui hoje, transformando esse ruído inicial em bases sólidas para a modelagem rigorosa.',
  },
  {
    question: 'Como o modelo final é entregue?',
    answer:
      'Em painel Power BI publicado no seu ambiente, acompanhado de documentação, memória de cálculo e dicionário de dados.',
  },
  {
    question: 'Existe um Acordo de Confidencialidade (NDA) envolvido?',
    answer: 'Sim. Assinamos NDA antes de qualquer acesso aos seus dados.',
  },
  {
    question: 'Qual o tamanho mínimo de empresa para trabalhar com a MathOps?',
    answer:
      'Focamos em empresas com complexidade de dados inicial ou intermediária. O tamanho do faturamento não é um impeditivo, desde que o desafio analítico seja suficientemente complexo e o potencial impacto estratégico justifique a empreitada.',
  },
  {
    question: 'Como medem o resultado do projeto?',
    answer:
      'Definimos com você, no diagnóstico, os indicadores de sucesso e a linha de base. Ao final, medimos contra essa mesma base.',
  },
]

export function FAQ() {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          })}
        </script>
      </Helmet>
      <section className="w-full py-24 md:py-32 bg-white/[0.02] border-t border-white/10 px-6 md:px-12 text-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
                Dúvidas Frequentes
              </h2>
              <p className="font-body text-white/60 text-lg">
                Transparência metodológica é o nosso padrão. Entenda como operamos antes de firmar
                compromissos.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/10 px-6 data-[state=open]:border-accent/30 bg-black/40 backdrop-blur-sm transition-colors"
                >
                  <AccordionTrigger className="font-display text-lg text-left hover:text-accent py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-white/70 text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
