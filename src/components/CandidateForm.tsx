import { useState, useEffect } from 'react'
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

  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [captchaAnswer, setCaptchaAnswer] = useState('')

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10) + 1)
    setNum2(Math.floor(Math.random() * 10) + 1)
    setCaptchaAnswer('')
  }

  const isCaptchaValid = parseInt(captchaAnswer) === num1 + num2

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
      generateCaptcha()
    } catch (error) {
      toast({
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao enviar sua candidatura. Tente novamente.',
        variant: 'destructive',
      })
      generateCaptcha()
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
                  <SelectItem value="Engenharia de Software">Engenharia de Software</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
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
              <FormLabel className="text-white">Carta de Apresentação / Motivação</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte-nos por que você quer fazer parte da MathOps..."
                  className="bg-transparent border-white/10 text-white min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <FormLabel className="text-white">Currículo (Opcional)</FormLabel>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="bg-transparent border-white/10 text-white hover:bg-white/5"
              onClick={() => document.getElementById('cv-upload')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {file ? 'Trocar arquivo' : 'Anexar CV'}
            </Button>
            {file && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="truncate max-w-[200px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="hover:text-white transition-colors"
                  aria-label="Remover arquivo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <input
              id="cv-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="space-y-3 p-4 border border-white/10 bg-black/20 rounded-md">
          <FormLabel className="text-white">Verificação de Segurança</FormLabel>
          <div className="flex items-center gap-4">
            <span className="text-white font-mono text-lg">
              Quanto é {num1} + {num2}?
            </span>
            <Input
              type="number"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              className="bg-transparent border-white/10 text-white w-24"
              placeholder="Soma"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !isCaptchaValid}
          className="w-full bg-accent text-white hover:bg-accent/90 disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Candidatura'}
        </Button>
      </form>
    </Form>
  )
}
