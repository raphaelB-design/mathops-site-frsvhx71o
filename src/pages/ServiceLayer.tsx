import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { serviceLayers } from '@/config/servicesData'
import { FadeIn } from '@/components/fade-in'
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'

export default function ServiceLayer() {
  const { slug } = useParams()
  const navigate = useNavigate()

  if (!slug || !serviceLayers[slug as keyof typeof serviceLayers]) {
    return <Navigate to="/" replace />
  }

  const layer = serviceLayers[slug as keyof typeof serviceLayers]

  const handleContactClick = () => {
    navigate('/')
    setTimeout(() => {
      const element = document.getElementById('contact')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div className="w-full flex flex-col min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-4xl mx-auto w-full px-6 md:px-12">
        <FadeIn>
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Início
            </Link>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{layer.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{layer.headline}</p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-12">
          {layer.services.map((service, idx) => (
            <FadeIn key={service.id} delay={100 + idx * 100}>
              <Card className="bg-white/[0.02] border-white/10 border-l-4 border-l-accent overflow-hidden rounded-none">
                <CardContent className="p-6 md:p-8">
                  <h2 className="font-display text-2xl font-bold mb-3">{service.name}</h2>
                  <p className="text-accent text-lg mb-8 font-medium leading-relaxed">
                    Descubra se sua empresa está pronta para implementar IA, antes que o
                    investimento revele isso por você.
                  </p>

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full text-left"
                    defaultValue={service.dor ? 'dor' : 'entregaveis'}
                  >
                    {service.dor && (
                      <AccordionItem value="dor" className="border-white/10">
                        <AccordionTrigger className="hover:no-underline hover:text-accent font-mono text-sm uppercase tracking-wider">
                          A Dor
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                          {service.dor}
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {service.entregaveis && (
                      <AccordionItem value="entregaveis" className="border-white/10">
                        <AccordionTrigger className="hover:no-underline hover:text-accent font-mono text-sm uppercase tracking-wider">
                          O que Entregamos
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                          <div className="flex flex-col gap-2">
                            {service.entregaveis.split(',').map((item, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                <span>{item.trim()}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {service.metodologia && (
                      <AccordionItem value="metodologia" className="border-white/10">
                        <AccordionTrigger className="hover:no-underline hover:text-accent font-mono text-sm uppercase tracking-wider">
                          Metodologia
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                          {service.metodologia}
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {service.tecnicos && (
                      <AccordionItem value="tecnicos" className="border-white/10">
                        <AccordionTrigger className="hover:no-underline hover:text-accent font-mono text-sm uppercase tracking-wider">
                          Detalhes Técnicos
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                          {service.tecnicos}
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {service.fit && (
                      <AccordionItem value="fit" className="border-white/10">
                        <AccordionTrigger className="hover:no-underline hover:text-accent font-mono text-sm uppercase tracking-wider">
                          Fit Ideal
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                          {service.fit}
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {service.prazo && (
                      <AccordionItem value="prazo" className="border-white/10">
                        <AccordionTrigger className="hover:no-underline hover:text-accent font-mono text-sm uppercase tracking-wider">
                          Prazo Estimado
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                          {service.prazo}
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleContactClick}
              className="bg-white text-black px-8 py-4 font-display font-semibold text-lg hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
            >
              Falar com um Especialista <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
