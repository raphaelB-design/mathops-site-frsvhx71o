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
    question: 'Vocês têm cases de sucesso publicados?',
    answer:
      'Ainda não publicamos cases porque só divulgamos números lastreados em resultados auditáveis e autorizados pelo cliente. Por isso oferecemos a garantia de devolução integral no Diagnóstico Estratégico: o risco da primeira etapa é nosso, não seu.',
  },
  {
    question: 'Qual a duração típica de um projeto?',
    answer:
      'Os projetos variam de acordo com a maturidade atual dos seus dados, mas tipicamente entregamos ciclos de valor contínuos entre 2 e 6 meses, focando em entregas rápidas para validação antecipada.',
  },
  {
    question: 'Não temos dados perfeitamente estruturados. Vocês podem ajudar?',
    answer:
      'Sim. A etapa inicial de nossa metodologia é dedicada a auditar, higienizar e estruturar os dados que você possui hoje, transformando esse ruído inicial em bases sólidas para a modelagem rigorosa.',
  },
  {
    question: 'Como o modelo final é entregue?',
    answer:
      'Isso depende de como a sua operação trabalha. Podemos entregar a solução final encapsulada em uma API escalável, através de um dashboard interativo ou totalmente on-premise no seu ambiente, sempre acompanhado da nossa documentação.',
  },
  {
    question: 'Existe um Acordo de Confidencialidade (NDA) envolvido?',
    answer:
      'Absolutamente. O rigor metodológico passa também pelo sigilo operacional. Assinamos NDAs rígidos e restritivos antes de termos qualquer nível de acesso superficial aos seus ecossistemas de dados.',
  },
  {
    question: 'Qual o tamanho mínimo de empresa para trabalhar com a MathOps?',
    answer:
      'Focamos em empresas com complexidade de dados inicial ou intermediária. O tamanho do faturamento não é um impeditivo, desde que o desafio analítico seja suficientemente complexo e o potencial impacto estratégico justifique a empreitada.',
  },
  {
    question: 'Como medem o ROI de um modelo matemático entregue?',
    answer:
      'Definimos KPIs inequívocos (como diminuição percentual de perda, ganho em taxa de conversão ou economia operacional direta) no dia zero e aferimos a performance exaustivamente contra sua baseline histórica.',
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
