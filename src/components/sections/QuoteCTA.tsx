import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FadeIn } from '@/components/fade-in'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa deve ter no mínimo 2 caracteres'),
  challenge: z.string().min(10, 'Descreva seu desafio com pelo menos 10 caracteres'),
  budget: z.string().min(1, 'Selecione uma faixa de orçamento'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function QuoteCTA() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      challenge: '',
      budget: '',
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('leads').insert({
        contact_name: data.name,
        email: data.email,
        company_name: data.company,
        challenge: data.challenge,
        budget_range: data.budget,
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

  return (
    <section className="w-full">
      {/* Quote Area */}
      <div className="py-24 md:py-32 px-6 md:px-12 bg-white text-black text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              "Dados sem um modelo matemático rigoroso são apenas ruído estatístico caro."
            </h2>
            <p className="font-mono text-sm uppercase tracking-widest text-black/60 font-bold">
              — Princípio MathOps Strategy
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Form Area */}
      <div
        id="contact"
        className="py-24 md:py-32 px-6 md:px-12 bg-background border-y border-white/10"
      >
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="mb-12 text-center md:text-left">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
                Decisões de peso merecem&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; Fundamento de peso.&nbsp;&nbsp;
              </h2>
              <p className="font-body text-white/60 text-lg">
                Toda relação com a MathOps começa por entender o problema antes de propor a solução.
                Conte-nos o cenário e o resto construímos juntos.
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
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
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
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          Orçamento Estimado
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue
                                placeholder="Selecione..."
                                className="placeholder:text-white/20"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="under_50k">Até R$ 50k</SelectItem>
                            <SelectItem value="50k_to_150k">R$ 50k - R$ 150k</SelectItem>
                            <SelectItem value="150k_to_500k">R$ 150k - R$ 500k</SelectItem>
                            <SelectItem value="above_500k">Acima de R$ 500k</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                          placeholder="Nos conte um pouco sobre a barreira analítica ou matemática que a operação enfrenta hoje..."
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 min-h-[120px] resize-none"
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
                  className="w-full bg-white text-black hover:bg-accent hover:text-white transition-colors duration-300 py-6 font-display font-bold text-lg"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar para Análise'}
                </Button>
              </form>
            </Form>
          </FadeIn>
        </div>
      </div>

      {/* Final CTA */}
    </section>
  )
}
