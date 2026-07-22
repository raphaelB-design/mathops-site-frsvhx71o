import { useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { TurnstileWidget } from '@/components/TurnstileWidget'
import { ArrowUpRight } from 'lucide-react'

const SECTORS = [
  'Logística e Supply Chain',
  'Indústria e Manufatura',
  'Saúde',
  'Serviços Financeiros',
  'Varejo e E-commerce',
  'Agronegócio',
  'Energia',
  'Outro',
]
const SIZES = [
  '1-50 funcionários',
  '51-200 funcionários',
  '201-500 funcionários',
  '500+ funcionários',
]
const BUDGETS = [
  'Até R$ 50.000',
  'R$ 50.000 - R$ 150.000',
  'R$ 150.000 - R$ 500.000',
  'Acima de R$ 500.000',
]

const schema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().min(2, 'Nome da empresa deve ter no mínimo 2 caracteres'),
  sector: z.string().min(1, 'Selecione seu setor'),
  company_size: z.string().min(1, 'Selecione o porte da empresa'),
  challenge: z.string().min(10, 'Descreva seu desafio com pelo menos 10 caracteres'),
  budget: z.string().min(1, 'Selecione uma faixa de orçamento'),
  operation_details: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const inputCls = 'bg-white/5 border-white/10 text-white h-12 text-base'
const labelCls = 'text-xs uppercase tracking-wider text-muted-foreground font-mono'
const textareaCls = 'bg-white/5 border-white/10 text-white text-base resize-none'

function SelectField({
  control,
  name,
  label,
  placeholder,
  options,
}: {
  control: any
  name: string
  label: string
  placeholder: string
  options: string[]
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelCls}>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={inputCls}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-background border-white/10 text-white max-h-[300px]">
              {options.map((o) => (
                <SelectItem key={o} value={o} className="text-base py-3">
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function QuoteCTAForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [formKey, setFormKey] = useState(0)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
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

  async function onSubmit(data: FormValues) {
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
      setFormKey((p) => p + 1)
    } catch (error: any) {
      toast({
        title: 'Erro ao enviar',
        description: error.message || 'Não foi possível enviar sua solicitação.',
        variant: 'destructive',
      })
      setTurnstileToken('')
      setFormKey((p) => p + 1)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelCls}>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" className={inputCls} {...field} />
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
                <FormLabel className={labelCls}>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    placeholder="email@empresa.com"
                    className={inputCls}
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
              <FormLabel className={labelCls}>Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Nome da empresa" className={inputCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SelectField
            control={form.control}
            name="sector"
            label="Setor"
            placeholder="Selecione seu setor"
            options={SECTORS}
          />
          <SelectField
            control={form.control}
            name="company_size"
            label="Porte"
            placeholder="Selecione o porte"
            options={SIZES}
          />
        </div>
        <SelectField
          control={form.control}
          name="budget"
          label="Faixa de orçamento"
          placeholder="Selecione uma faixa"
          options={BUDGETS}
        />
        <FormField
          control={form.control}
          name="challenge"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Seu desafio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Qual gargalo operacional ou estratégico precisamos resolver?"
                  className={`${textareaCls} min-h-[120px]`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="operation_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelCls}>Detalhes operacionais (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Informações adicionais sobre sua operação"
                  className={`${textareaCls} min-h-[80px]`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <TurnstileWidget key={formKey} onVerify={setTurnstileToken} />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black hover:bg-accent hover:text-white transition-colors duration-300 font-display font-bold text-base h-14 min-h-[44px] rounded-sm group"
        >
          {isSubmitting ? 'Enviando...' : 'Solicitar Diagnóstico Estratégico'}
          {!isSubmitting && (
            <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          )}
        </Button>
      </form>
    </Form>
  )
}
