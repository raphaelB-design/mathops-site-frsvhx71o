import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { industriesData, industriesList } from '@/config/industriesData'
import { FadeIn } from '@/components/fade-in'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa deve ter no mínimo 2 caracteres'),
  challenge: z.string().min(10, 'Descreva seu desafio com pelo menos 10 caracteres'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function IndustryLayer() {
  const { slug } = useParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Auto-scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      challenge: '',
    },
  })

  if (!slug || !(slug in industriesData)) {
    return <Navigate to="/" replace />
  }

  const layer = industriesData[slug as keyof typeof industriesData]
  const otherIndustries = industriesList.filter((ind) => ind.slug !== slug)

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('leads').insert({
        contact_name: data.name,
        email: data.email,
        company_name: data.company,
        challenge: data.challenge,
        budget_range: 'Não informado', // Default for forms that omit this field
        source: slug,
      })

      if (error) throw error

      toast({
        title: 'Solicitação enviada!',
        description: 'Nossa equipe entrará em contato em breve.',
      })
      form.reset()
    } catch (error) {
      toast({
        title: 'Erro ao enviar',
        description: 'Não foi possível enviar sua solicitação. Tente novamente mais tarde.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToForm = () => {
    const el = document.getElementById('industry-contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const Icon = layer.icon

  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      {/* Spotlight Hero Section */}
      <section className="relative w-full min-h-[75vh] flex items-center bg-black overflow-hidden border-b border-white/10 pt-16 md:pt-0">
        <div className="absolute inset-0 z-0">
          <img
            src={layer.image}
            alt={layer.name}
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 md:via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
          <FadeIn>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Início
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-accent/10 border border-accent/20 flex items-center justify-center text-accent backdrop-blur-sm shadow-xl">
                <Icon className="w-8 h-8" />
              </div>
              <span className="font-mono text-sm uppercase tracking-widest text-accent font-bold">
                Especialidade Setorial
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 max-w-4xl drop-shadow-2xl text-white">
              {layer.name}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-6 leading-relaxed font-body drop-shadow-md">
              {layer.desc}
            </p>

            <p className="text-lg text-white/70 max-w-3xl mb-12 leading-relaxed">{layer.details}</p>

            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-white text-black hover:bg-accent hover:text-white rounded-none font-display font-bold px-8 h-14 text-base transition-colors"
            >
              Analisar meu cenário <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Netflix-style Carousel */}
      <section className="py-24 px-6 md:px-12 bg-background border-b border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold mb-10 text-white">
              Explore Outras Indústrias
            </h2>
          </FadeIn>

          <Carousel
            opts={{
              align: 'start',
              dragFree: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {otherIndustries.map((ind) => (
                <CarouselItem
                  key={ind.slug}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Link
                    to={`/industrias/${ind.slug}`}
                    className="block relative group overflow-hidden aspect-[4/3] bg-black border border-white/10 rounded-sm"
                  >
                    <img
                      src={ind.thumbnail}
                      alt={ind.name}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-90 transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 p-5 z-10 w-full transform translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-3 mb-2 text-white">
                        <ind.icon className="w-5 h-5 group-hover:text-accent transition-colors" />
                        <h3 className="font-display font-bold text-lg md:text-xl drop-shadow-md">
                          {ind.name}
                        </h3>
                      </div>
                      <p className="text-sm text-white/60 line-clamp-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block">
                        {ind.desc}
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:block">
              <CarouselPrevious className="-left-12 bg-black/80 hover:bg-black border-white/20 text-white w-12 h-12" />
              <CarouselNext className="-right-12 bg-black/80 hover:bg-black border-white/20 text-white w-12 h-12" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="industry-contact" className="py-24 px-6 md:px-12 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <FadeIn>
            <div className="mb-12 text-center md:text-left">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
                Não encontrou seu setor? Fale conosco.
              </h2>
              <p className="font-body text-white/60 text-lg">
                Nossos modelos matemáticos se adaptam à realidade da sua operação, independente da
                indústria. Compartilhe o seu desafio conosco.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          Nome Completo
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          Email Corporativo
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@suaempresa.com"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Empresa
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome da corporação"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="challenge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Desafio Principal
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nos conte um pouco sobre o gargalo operacional ou estratégico atual..."
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 min-h-[140px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-accent hover:text-white transition-colors duration-300 py-6 font-display font-bold text-lg h-14 rounded-none"
                >
                  {isSubmitting ? 'Enviando...' : 'Agendar Diagnóstico'}
                </Button>
              </form>
            </Form>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
