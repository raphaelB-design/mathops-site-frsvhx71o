import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Upload, X, CheckCircle2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { submitCandidate, uploadCV } from '@/services/crm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  full_name: z.string().min(3, 'Mínimo de 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  area_interest: z.string().min(1, 'Obrigatório'),
  motivation: z.string().min(50, 'Mínimo de 50 caracteres').max(500, 'Máximo de 500 caracteres'),
})

type FormValues = z.infer<typeof formSchema>

export function CandidateForm() {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { full_name: '', email: '', area_interest: '', motivation: '' },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)
      let cv_url = null
      if (file) {
        const ext = file.name.split('.').pop()
        const slug = values.full_name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
        const path = `${Date.now()}-${slug}.${ext}`
        await uploadCV(file, path)
        cv_url = path
      }
      await submitCandidate({ ...values, cv_url })
      setIsSuccess(true)
    } catch (error) {
      toast({
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao enviar sua candidatura. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white mb-4">Candidatura recebida!</h3>
        <p className="text-muted-foreground max-w-md">
          Analisaremos seu perfil em breve. Caso haja fit com nossos projetos futuros, entraremos em
          contato.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nome completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome"
                    className="bg-transparent border-white/10 text-white"
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
                <FormLabel className="text-white">E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="voce@email.com"
                    className="bg-transparent border-white/10 text-white"
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
          name="area_interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Área de interesse</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-transparent border-white/10 text-white">
                    <SelectValue placeholder="Selecione uma área" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Dados & Business Intelligence">
                    Dados & Business Intelligence
                  </SelectItem>
                  <SelectItem value="Mapeamento e Automação de Processos">
                    Mapeamento e Automação de Processos
                  </SelectItem>
                  <SelectItem value="Modelagem Matemática e Estatística">
                    Modelagem Matemática e Estatística
                  </SelectItem>
                  <SelectItem value="Inteligência Artificial e Governança">
                    Inteligência Artificial e Governança
                  </SelectItem>
                  <SelectItem value="Comercial e Relacionamento">
                    Comercial e Relacionamento
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Por que a MathOps Strategy?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte-nos o que te motiva..."
                  className="bg-transparent border-white/10 text-white resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-right text-muted-foreground">
                {field.value?.length || 0}/500
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">
            Currículo — PDF ou DOCX (opcional)
          </label>
          {!file ? (
            <div className="border-2 border-dashed border-white/10 p-6 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:bg-white/[0.02] transition-colors cursor-pointer relative rounded-md">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Upload className="w-6 h-6 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Clique ou arraste seu arquivo aqui</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border border-white/10 bg-white/[0.02] rounded-md">
              <span className="text-sm text-white truncate max-w-[250px]">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
                className="text-muted-foreground hover:text-white"
              >
                <X className="w-4 h-4 mr-2" /> Remover arquivo
              </Button>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-accent text-white hover:bg-accent/90 py-6 font-display font-bold text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando candidatura...' : 'Enviar Candidatura'}
        </Button>
      </form>
    </Form>
  )
}
