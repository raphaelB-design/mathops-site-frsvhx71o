import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { TurnstileWidget } from '@/components/TurnstileWidget'
import { submitLead } from '@/services/leads'
import { useToast } from '@/hooks/use-toast'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const maturityLevels = [
  { value: 'Inicial', label: 'Inicial', desc: 'Dados dispersos, decisões por intuição' },
  {
    value: 'Em Desenvolvimento',
    label: 'Em Desenvolvimento',
    desc: 'Alguma estruturação, relatórios manuais',
  },
  { value: 'Gerenciado', label: 'Gerenciado', desc: 'Dashboards ativos, processos definidos' },
  { value: 'Otimizado', label: 'Otimizado', desc: 'Cultura data-driven, modelos preditivos' },
]

const stepLabels = ['Perfil', 'Desafios', 'Maturidade', 'Objetivos', 'Contato']

export function VocDiagnosticModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [formKey, setFormKey] = useState(0)
  const [form, setForm] = useState({
    company_name: '',
    sector: '',
    challenge: '',
    maturity_level: '',
    strategic_goals: '',
    contact_name: '',
    email: '',
  })

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }))

  const validateStep = (): string | null => {
    switch (step) {
      case 1:
        if (!form.company_name.trim()) return 'Informe o nome da empresa'
        if (!form.sector.trim()) return 'Informe o setor'
        return null
      case 2:
        if (form.challenge.trim().length < 10)
          return 'Descreva seu desafio com pelo menos 10 caracteres'
        return null
      case 3:
        if (!form.maturity_level) return 'Selecione um nível de maturidade'
        return null
      case 4:
        if (!form.strategic_goals.trim()) return 'Descreva seus objetivos estratégicos'
        return null
      case 5:
        if (!form.contact_name.trim()) return 'Informe seu nome'
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email))
          return 'E-mail inválido'
        if (!turnstileToken) return 'Complete a verificação de segurança'
        return null
      default:
        return null
    }
  }

  const handleNext = () => {
    const error = validateStep()
    if (error) {
      toast({ title: 'Validação', description: error, variant: 'destructive' })
      return
    }
    if (step < 5) setStep(step + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await submitLead(form, turnstileToken)
      setIsSuccess(true)
    } catch (err: any) {
      toast({
        title: 'Erro',
        description: err.message || 'Erro ao enviar formulário',
        variant: 'destructive',
      })
      setTurnstileToken('')
      setFormKey((p) => p + 1)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setStep(1)
      setIsSuccess(false)
      setForm({
        company_name: '',
        sector: '',
        challenge: '',
        maturity_level: '',
        strategic_goals: '',
        contact_name: '',
        email: '',
      })
      setTurnstileToken('')
      setFormKey((p) => p + 1)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="flex items-center gap-2 px-6 md:px-8 pt-6">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center flex-1">
              <div
                className={cn(
                  'flex items-center gap-2',
                  i < step ? 'text-accent' : i === step - 1 ? 'text-white' : 'text-white/30',
                )}
              >
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border',
                    i < step
                      ? 'bg-accent/20 border-accent/40 text-accent'
                      : i === step - 1
                        ? 'bg-white/10 border-white/30 text-white'
                        : 'border-white/10 text-white/30',
                  )}
                >
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className="hidden md:inline text-[10px] uppercase tracking-widest font-mono">
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div
                  className={cn('h-px flex-1 mx-2', i < step ? 'bg-accent/40' : 'bg-white/10')}
                />
              )}
            </div>
          ))}
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-4">
              Diagnóstico recebido!
            </h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Nossa equipe analisará suas respostas e entrará em contato em até 48 horas com uma
              avaliação especializada.
            </p>
            <Button onClick={handleClose} className="bg-accent text-white hover:bg-accent/90">
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="px-6 md:px-8 pt-6 pb-2">
              <DialogTitle className="text-2xl font-serif text-white">
                {step === 1 && 'Perfil da Empresa'}
                {step === 2 && 'Voz do Cliente'}
                {step === 3 && 'Maturidade Analítica'}
                {step === 4 && 'Objetivos Estratégicos'}
                {step === 5 && 'Dados de Contato'}
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Etapa {step} de 5 — Diagnóstico Estratégico VoC
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 md:px-8 pb-2 space-y-5">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label className="text-white">Empresa</Label>
                    <Input
                      value={form.company_name}
                      onChange={(e) => update('company_name', e.target.value)}
                      placeholder="Nome da sua empresa"
                      className="bg-transparent border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Setor / Indústria</Label>
                    <Input
                      value={form.sector}
                      onChange={(e) => update('sector', e.target.value)}
                      placeholder="Ex: Indústria, Varejo, Serviços..."
                      className="bg-transparent border-white/10 text-white"
                    />
                  </div>
                </>
              )}
              {step === 2 && (
                <div className="space-y-2">
                  <Label className="text-white">Desafios e Gargalos Operacionais</Label>
                  <Textarea
                    value={form.challenge}
                    onChange={(e) => update('challenge', e.target.value)}
                    placeholder="Descreva em suas próprias palavras os principais desafios, gargalos e dores operacionais que sua empresa enfrenta hoje..."
                    className="bg-transparent border-white/10 text-white min-h-[140px]"
                  />
                  <p className="text-xs text-zinc-500">Mínimo de 10 caracteres</p>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-3">
                  <Label className="text-white">Em qual estágio sua empresa se encontra?</Label>
                  <RadioGroup
                    value={form.maturity_level}
                    onValueChange={(v) => update('maturity_level', v)}
                  >
                    {maturityLevels.map((m) => (
                      <div
                        key={m.value}
                        className="flex items-start gap-3 p-4 border border-white/10 rounded-sm hover:border-white/30 transition-colors cursor-pointer"
                        onClick={() => update('maturity_level', m.value)}
                      >
                        <RadioGroupItem value={m.value} className="mt-1 border-white/30" />
                        <div>
                          <p className="text-white font-medium text-sm">{m.label}</p>
                          <p className="text-zinc-400 text-xs mt-0.5">{m.desc}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-2">
                  <Label className="text-white">
                    Objetivos estratégicos para os próximos 12 meses
                  </Label>
                  <Textarea
                    value={form.strategic_goals}
                    onChange={(e) => update('strategic_goals', e.target.value)}
                    placeholder="Quais são as metas e prioridades estratégicas da sua empresa para o próximo ano?"
                    className="bg-transparent border-white/10 text-white min-h-[120px]"
                  />
                </div>
              )}
              {step === 5 && (
                <>
                  <div className="space-y-2">
                    <Label className="text-white">Nome</Label>
                    <Input
                      value={form.contact_name}
                      onChange={(e) => update('contact_name', e.target.value)}
                      placeholder="Seu nome completo"
                      className="bg-transparent border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">E-mail corporativo</Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="voce@empresa.com"
                      className="bg-transparent border-white/10 text-white"
                    />
                  </div>
                  <TurnstileWidget key={formKey} onVerify={setTurnstileToken} />
                </>
              )}
            </div>

            <div className="flex items-center justify-between px-6 md:px-8 py-6 border-t border-white/10 mt-2">
              <Button
                variant="ghost"
                onClick={() => (step > 1 ? setStep(step - 1) : handleClose())}
                className="text-white/60 hover:text-white"
              >
                {step === 1 ? (
                  'Cancelar'
                ) : (
                  <>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
                  </>
                )}
              </Button>
              <Button
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-accent text-white hover:bg-accent/90"
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : step === 5 ? (
                  'Enviar Diagnóstico'
                ) : (
                  <>
                    Próximo <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
