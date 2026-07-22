import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { MessageSquarePlus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa deve ter no mínimo 2 caracteres'),
  challenge: z.string().min(10, 'Descreva seu desafio com pelo menos 10 caracteres'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      challenge: '',
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
        budget_range: 'Não informado',
        source: 'Industry Page - Floating Widget',
        status: 'New',
      })

      if (error) throw error

      toast({
        title: 'Solicitação enviada!',
        description: 'Nossa equipe entrará em contato em breve.',
      })
      form.reset()
      setIsOpen(false)
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
    <div className="hidden lg:block fixed bottom-24 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full shadow-2xl shadow-accent/20 bg-accent text-white hover:bg-accent/90 h-14 px-6 font-display font-bold tracking-wide flex items-center gap-2 group transition-all duration-300 hover:scale-105"
          >
            <MessageSquarePlus className="w-5 h-5 group-hover:animate-pulse" />
            <span className="hidden sm:inline">Não encontrou seu setor? Fale conosco</span>
            <span className="sm:hidden">Fale conosco</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-background border-white/10 text-white shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">
              Soluções sob medida
            </DialogTitle>
            <DialogDescription className="text-white/60 font-body text-base mt-2">
              Nossos modelos matemáticos se adaptam à realidade da sua operação, independente da
              indústria. Descreva seu desafio.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Seu nome"
                          className="bg-white/5 border-white/10 text-white"
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
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@empresa.com"
                          className="bg-white/5 border-white/10 text-white"
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
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                      Empresa
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome da corporação"
                        className="bg-white/5 border-white/10 text-white"
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
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                      Seu Desafio
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Qual gargalo operacional ou estratégico precisamos resolver?"
                        className="bg-white/5 border-white/10 text-white min-h-[100px] resize-none"
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
                className="w-full bg-white text-black hover:bg-accent hover:text-white transition-colors duration-300 py-6 font-display font-bold text-base h-12 rounded-sm mt-4"
              >
                {isSubmitting ? 'Enviando...' : 'Agendar Diagnóstico'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
