import { useState, useEffect } from 'react'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { TurnstileWidget } from '@/components/TurnstileWidget'
import { submitVoCLead } from '@/services/crm'
import { useToast } from '@/hooks/use-toast'
import { ChevronLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const MATURITY_OPTIONS = [
  { value: 'Inicial', desc: 'Dados dispersos, decisões no instinto' },
  { value: 'Em Desenvolvimento', desc: 'Algumas métricas, ainda manuais' },
  { value: 'Gerenciado', desc: 'Dashboards ativos, análise reativa' },
  { value: 'Otimizado', desc: 'Decisões data-driven consolidadas' },
]

const STEP_TITLES = [
  'Perfil da Empresa',
  'Voz do Cliente',
  'Maturidade Analítica',
  'Objetivos Estratégicos',
  'Dados de Contato',
]

interface FormData {
  company_name: string
  sector: string
  challenge: string
  maturity_level: string
  strategic_goals: string
  contact_name: string
  email: string
}

const EMPTY: FormData = {
  company_name: '',
  sector: '',
  challenge: '',
  maturity_level: '',
  strategic_goals: '',
  contact_name: '',
  email: '',
}

export function VoCDiagnosticModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const { toast } = useToast()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(EMPTY)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileKey, setTurnstileKey] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep(0)
        setData(EMPTY)
        setSuccess(false)
        setTurnstileToken('')
        setTurnstileKey((k) => k + 1)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [open])

  const update = (k: keyof FormData, v: string) => setData((d) => ({ ...d, [k]: v }))

  const validate = (): string | null => {
    switch (step) {
      case 0:
        if (!data.company_name.trim()) return 'Informe o nome da empresa'
        if (!data.sector.trim()) return 'Informe o setor'
        return null
      case 1:
        if (data.challenge.trim().length < 10) return 'Descreva com pelo menos 10 caracteres'
        return null
      case 2:
        if (!data.maturity_level) return 'Selecione um nível de maturidade'
        return null
      case 3:
        if (!data.strategic_goals.trim()) return 'Descreva seus objetivos estratégicos'
        return null
      case 4: {
        if (!data.contact_name.trim()) return 'Informe seu nome'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'E-mail inválido'
        if (!turnstileToken) return 'Complete a verificação de segurança'
        return null
      }
      default:
        return null
    }
  }

  const next = () => {
    const err = validate()
    if (err) {
      toast({ title: 'Validação', description: err, variant: 'destructive' })
      return
    }
    setStep((s) => Math.min(s + 1, 4))
  }

  const submit = async () => {
    const err = validate()
    if (err) {
      toast({ title: 'Validação', description: err, variant: 'destructive' })
      return
    }
    setSubmitting(true)
    try {
      await submitVoCLead({ ...data, token: turnstileToken })
      setSuccess(true)
    } catch (e: any) {
      toast({
        title: 'Erro',
        description: e.message || 'Falha ao enviar diagnóstico',
        variant: 'destructive',
      })
      setTurnstileKey((k) => k + 1)
      setTurnstileToken('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogDescription className="sr-only">
          Formulário de diagnóstico estratégico em 5 etapas
        </DialogDescription>
        {success ? (
          <div className="flex flex-col items-center py-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-accent mb-6" />
            <h2 className="font-display text-2xl font-bold mb-3">Diagnóstico recebido!</h2>
            <p className="text-zinc-400 max-w-md">
              Nossa equipe analisará suas respostas e entrará em contato em até 48h com uma
              avaliação especializada.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif text-white">
                {STEP_TITLES[step]}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${((step + 1) / 5) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-white/40">{step + 1}/5</span>
              </div>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {step === 0 && (
                <>
                  <div>
                    <Label className="text-white mb-2 block">Empresa</Label>
                    <Input
                      value={data.company_name}
                      onChange={(e) => update('company_name', e.target.value)}
                      placeholder="Nome da empresa"
                      className="bg-transparent border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Setor/Indústria</Label>
                    <Input
                      value={data.sector}
                      onChange={(e) => update('sector', e.target.value)}
                      placeholder="Ex: Varejo, Indústria, Finanças"
                      className="bg-transparent border-white/10 text-white"
                    />
                  </div>
                </>
              )}
              {step === 1 && (
                <div>
                  <Label className="text-white mb-2 block">
                    Descreva seus principais gargalos e desafios operacionais
                  </Label>
                  <Textarea
                    value={data.challenge}
                    onChange={(e) => update('challenge', e.target.value)}
                    placeholder="Quais processos geram mais retrabalho? Onde você sente perda de eficiência? Que decisões dependem de estimativas?"
                    className="bg-transparent border-white/10 text-white min-h-[160px]"
                  />
                </div>
              )}
              {step === 2 && (
                <div>
                  <Label className="text-white mb-3 block">
                    Como você classificaria a maturidade analítica da sua empresa?
                  </Label>
                  <RadioGroup
                    value={data.maturity_level}
                    onValueChange={(v) => update('maturity_level', v)}
                  >
                    {MATURITY_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={cn(
                          'flex items-start gap-3 p-4 border rounded-sm cursor-pointer hover:bg-white/5 transition-colors',
                          data.maturity_level === opt.value
                            ? 'border-accent bg-accent/5'
                            : 'border-white/10',
                        )}
                      >
                        <RadioGroupItem value={opt.value} className="mt-1" />
                        <div>
                          <span className="text-white font-medium block">{opt.value}</span>
                          <span className="text-zinc-400 text-sm">{opt.desc}</span>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}
              {step === 3 && (
                <div>
                  <Label className="text-white mb-2 block">
                    Objetivos estratégicos para os próximos 12 meses
                  </Label>
                  <Textarea
                    value={data.strategic_goals}
                    onChange={(e) => update('strategic_goals', e.target.value)}
                    placeholder="Ex: Reduzir custos operacionais em 15%, implementar governança de dados, automatizar conciliação financeira..."
                    className="bg-transparent border-white/10 text-white min-h-[160px]"
                  />
                </div>
              )}
              {step === 4 && (
                <>
                  <div>
                    <Label className="text-white mb-2 block">Nome</Label>
                    <Input
                      value={data.contact_name}
                      onChange={(e) => update('contact_name', e.target.value)}
                      placeholder="Seu nome completo"
                      className="bg-transparent border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">E-mail corporativo</Label>
                    <Input
                      value={data.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="voce@empresa.com"
                      className="bg-transparent border-white/10 text-white"
                    />
                  </div>
                  <TurnstileWidget key={turnstileKey} onVerify={setTurnstileToken} />
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              {step > 0 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => s - 1)}
                  className="bg-transparent border-white/10 text-white hover:bg-white/5"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
                </Button>
              ) : (
                <div />
              )}
              {step < 4 ? (
                <Button onClick={next} className="bg-accent text-white hover:bg-accent/90">
                  Próximo <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={submit}
                  disabled={submitting}
                  className="bg-accent text-white hover:bg-accent/90"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" /> Enviando
                    </>
                  ) : (
                    'Enviar Diagnóstico'
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
