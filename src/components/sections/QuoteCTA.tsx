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
import { TurnstileWidget } from '@/components/TurnstileWidget'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa deve ter no mínimo 2 caracteres'),
  sector: z.string().min(1, 'Selecione seu setor'),
  company_size: z.string().min(1, 'Selecione o porte da empresa'),
  challenge: z.string().min(10, 'Descreva seu desafio com pelo menos 10 caracteres'),
  budget: z.string().min(1, 'Selecione uma faixa de orçamento'),
  operation_details: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function QuoteCTA() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [formKey, setFormKey] = useState(0)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      sector: '',
      company_size: '',
      challenge: '',
      budget: '',
      operation_details: '',
    },
  })

  async function onSubmit(data: ContactFormValues) {
    if (!turnstileToken) {
      toast({
        title: 'Verificação necessária',
        description: 'Por favor, complete a verificação de segurança.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase.functions.invoke('submit-lead', {
        body: {
          contact_name: data.name,
          email: data.email,
          company_name: data.company,
          sector: data.sector,
          company_size: data.company_size,
          challenge: data.challenge,
          budget_range: data.budget,
          operation_details: data.operation_details,
          token: turnstileToken,
        },
      })

      if (error) throw error

      toast({
        title: 'Solicitação enviada!',
        description: 'Nossa equipe entrará em contato em breve.',
      })
      form.reset()
      setTurnstileToken('')
      setFormKey((prev) => prev + 1)
    } catch (error: any) {
      toast({
        title: 'Erro ao enviar',
        description:
          error.message || 'Não foi possível enviar sua solicitação. Tente novamente mais tarde.',
        variant: 'destructive',
      })
      setTurnstileToken('')
      setFormKey((prev) => prev + 1)
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

      {/* Final CTA */}
    </section>
  )
}
