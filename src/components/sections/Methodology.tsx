import { FadeIn } from '@/components/fade-in'
import { useState } from 'react'
import { Check, ChevronLeft, ChevronRight, PartyPopper, Quote, RefreshCw, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Confetti } from '@/components/confetti'

interface DmaicPhase {
  id: string
  letter: string
  name: string
  subtitle: string
  vozDoCliente: string
  metodologia: string[]
  ferramentas: string[]
  entregavel: string
  gate: {
    pergunta: string
    naoLabel: string
    naoTipo: 'mesma-etapa' | 'etapa-anterior'
  }
}

const phases: DmaicPhase[] = [
  {
    id: 'define',
    letter: 'D',
    name: 'Define',
    subtitle: 'Escopo e KPIs que movem o negócio',
    vozDoCliente: 'Não sei onde estou perdendo dinheiro. Minhas decisões dependem de achismo.',
    metodologia: ['Project Charter', 'Definição de escopo', 'Alinhamento de KPIs'],
    ferramentas: ['SIPOC', 'Matriz de stakeholders', 'Entrevistas estruturadas'],
    entregavel: 'Termo de abertura + escopo validado',
    gate: {
      pergunta: 'Escopo e KPIs aprovados pelo cliente?',
      naoLabel: 'refina escopo',
      naoTipo: 'mesma-etapa',
    },
  },
  {
    id: 'measure',
    letter: 'M',
    name: 'Measure',
    subtitle: 'Baseline real da operação',
    vozDoCliente: 'Preciso enxergar o que realmente acontece, não o que imagino que acontece.',
    metodologia: [
      'Coleta estruturada de dados',
      'Validação do sistema de medição',
      'Baseline AS-IS',
    ],
    ferramentas: ['BPMN 2.0', 'ETL', 'Auditoria de fontes'],
    entregavel: 'Baseline quantificado + mapa AS-IS',
    gate: {
      pergunta: 'Dados são confiáveis e completos?',
      naoLabel: 'nova coleta',
      naoTipo: 'mesma-etapa',
    },
  },
  {
    id: 'analyze',
    letter: 'A',
    name: 'Analyze',
    subtitle: 'Causa raiz, não sintoma',
    vozDoCliente: 'Por que isso está acontecendo de verdade?',
    metodologia: ['Inferência estatística', 'Análise de causa raiz', 'Testes de hipótese'],
    ferramentas: ['ANOVA', 'Ishikawa', 'Cartas de controle'],
    entregavel: 'Causa raiz validada estatisticamente',
    gate: {
      pergunta: 'Causa raiz confirmada com significância estatística?',
      naoLabel: 'nova hipótese',
      naoTipo: 'mesma-etapa',
    },
  },
  {
    id: 'implement',
    letter: 'I',
    name: 'Implement',
    subtitle: 'Solução em produção, não em teoria',
    vozDoCliente: 'Quero ver a solução funcionando, não uma teoria.',
    metodologia: ['Desenho de solução', 'Piloto controlado', 'Validação A/B'],
    ferramentas: ['Python', 'Power Automate', 'Monte Carlo'],
    entregavel: 'Solução implantada e validada',
    gate: {
      pergunta: 'Piloto atinge a meta definida em Define?',
      naoLabel: 'ajusta solução',
      naoTipo: 'mesma-etapa',
    },
  },
  {
    id: 'control',
    letter: 'C',
    name: 'Control',
    subtitle: 'Ganho sustentado sem depender de lembrança',
    vozDoCliente: 'Quero que o ganho continue sem depender de mim lembrar disso.',
    metodologia: ['Padronização', 'Plano de resposta a desvios', 'Transferência de conhecimento'],
    ferramentas: ['CEP', 'Dashboards', 'SLA'],
    entregavel: 'Painel de sustentação + documentação',
    gate: {
      pergunta: 'Processo estável por 3 ciclos de medição?',
      naoLabel: 'retorna para Analyze',
      naoTipo: 'etapa-anterior',
    },
  },
]

const phaseProgress = (index: number) => (index + 1) * 20

export function Methodology() {
  const [activePhase, setActivePhase] = useState(0)
  const [progress, setProgress] = useState(20)
  const [pulse, setPulse] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const phase = phases[activePhase]
  const isLast = activePhase === phases.length - 1

  const triggerPulse = () => {
    setPulse(true)
    setTimeout(() => setPulse(false), 600)
  }

  const goToPhase = (index: number) => {
    setActivePhase(index)
    setProgress(phaseProgress(index))
    triggerPulse()
  }

  const nextPhase = () => {
    if (isLast) {
      setShowCelebration(true)
      triggerPulse()
    } else {
      const next = activePhase + 1
      setActivePhase(next)
      setProgress(phaseProgress(next))
      triggerPulse()
    }
  }

  const resetCycle = () => {
    setShowCelebration(false)
    setProgress(0)
    setActivePhase(0)
    setTimeout(() => {
      setProgress(phaseProgress(0))
      triggerPulse()
    }, 350)
  }

  const prevPhase = () => {
    if (activePhase > 0) {
      const prev = activePhase - 1
      setActivePhase(prev)
      setProgress(phaseProgress(prev))
      triggerPulse()
    }
  }

  const handleGateNo = () => {
    if (phase.gate.naoTipo === 'etapa-anterior') {
      setActivePhase(2)
      setProgress(phaseProgress(2))
      triggerPulse()
    }
  }

  return (
    <section
      id="methodology"
      className="py-24 md:py-32 px-6 md:px-12 w-full bg-background relative"
    >
      <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Ciclo de Execução
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Metodologia DMAIC</h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Importamos e validamos o principal framework de engenharia de qualidade industrial
              para o ecossistema de dados corporativos.
            </p>
          </div>
        </FadeIn>

        {/* Stepper Rail */}
        <div className="flex flex-col items-center mb-3">
          <div className="w-full overflow-x-auto scrollbar-dark pb-4">
            <div className="flex items-center justify-between min-w-[360px] max-w-2xl mx-auto relative px-2">
              {phases.map((p, i) => (
                <div key={p.id} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => goToPhase(i)}
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg transition-all duration-300 z-10 relative flex-shrink-0',
                      activePhase === i
                        ? 'bg-accent text-white scale-110 shadow-[0_0_20px_rgba(45,95,168,0.4)] border-none'
                        : activePhase > i
                          ? 'bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30'
                          : 'bg-background text-muted-foreground border border-white/10 hover:border-white/30',
                    )}
                  >
                    {p.letter}
                  </button>
                  {i < phases.length - 1 && (
                    <div className="flex-1 h-[2px] bg-white/5 mx-2 md:mx-4 relative overflow-hidden">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-accent/50 transition-all duration-500 ease-in-out"
                        style={{ width: activePhase > i ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 font-mono text-[11px] text-muted-foreground opacity-70">
            <RefreshCw className="w-3 h-3" />
            <span>control encerra o ciclo e reabre define — kaizen contínuo</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-full max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Progresso do ciclo
            </span>
            <span
              className={cn(
                'font-mono text-xs font-bold text-accent transition-transform duration-300',
                pulse && 'scale-125',
              )}
            >
              Progresso: {progress}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full bg-accent transition-all duration-500 ease-out',
                pulse && 'shadow-[0_0_12px_rgba(45,95,168,0.6)]',
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Phase Panel */}
        <div className="border border-white/5 rounded-xl bg-white/[0.03] shadow-2xl relative overflow-hidden">
          <FadeIn key={activePhase} direction="up" delay={0} className="p-6 md:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-8">
              <h3 className="font-display text-4xl md:text-5xl font-bold text-white">
                {phase.name}
              </h3>
              <span className="font-body text-lg md:text-xl text-muted-foreground">
                {phase.subtitle}
              </span>
            </div>

            {/* Voz do Cliente */}
            <div className="border-l-2 border-accent pl-5 my-8 bg-gradient-to-r from-accent/5 to-transparent py-4 rounded-r-lg">
              <div className="flex gap-4 items-start">
                <Quote className="w-6 h-6 text-accent shrink-0 opacity-60 mt-0.5" />
                <p className="font-body italic text-lg text-foreground/90 leading-relaxed">
                  "{phase.vozDoCliente}"
                </p>
              </div>
            </div>

            {/* Grid Metodologia / Ferramentas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
                  Metodologia
                </span>
                <div className="flex flex-wrap gap-2">
                  {phase.metodologia.map((m) => (
                    <span
                      key={m}
                      className="bg-background/50 border border-white/5 px-3 py-1.5 rounded-md text-sm text-foreground/80 font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 block">
                  Ferramentas
                </span>
                <div className="flex flex-wrap gap-2">
                  {phase.ferramentas.map((f) => (
                    <span
                      key={f}
                      className="bg-background/50 border border-white/5 px-3 py-1.5 rounded-md text-sm text-foreground/80 font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Entregável */}
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 block">
                Entregável
              </span>
              <p className="font-body text-lg text-foreground font-medium">{phase.entregavel}</p>
            </div>

            {/* BPMN Gate */}
            <div className="border-t border-white/5 pt-8 mt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 border-[2px] border-muted-foreground rotate-45 flex-shrink-0" />
                <span className="font-body text-foreground/90 font-medium">
                  {phase.gate.pergunta}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 font-mono text-sm">
                <button
                  onClick={nextPhase}
                  className="flex items-center gap-2 text-emerald-400/90 hover:text-emerald-400 hover:bg-emerald-400/10 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>sim → avança</span>
                </button>
                <button
                  onClick={handleGateNo}
                  className="flex items-center gap-2 text-amber-400/90 hover:text-amber-400 hover:bg-amber-400/10 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>
                    não → {phase.gate.naoLabel}{' '}
                    <span className="opacity-60">({phase.gate.naoTipo})</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-10 border-t border-white/5 pt-8">
              <button
                onClick={prevPhase}
                disabled={activePhase === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-sm font-mono uppercase tracking-wider"
              >
                <ChevronLeft className="w-4 h-4" /> anterior
              </button>

              <div className="hidden sm:flex gap-2.5">
                {phases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPhase(i)}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-all duration-300',
                      activePhase === i ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40',
                    )}
                    aria-label={`Ir para etapa ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={isLast ? resetCycle : nextPhase}
                className="flex items-center gap-2 px-6 py-2.5 rounded-md bg-accent hover:bg-accent/90 text-white transition-colors text-sm font-mono uppercase tracking-wider font-bold shadow-lg shadow-accent/20"
              >
                {isLast ? (
                  <>
                    novo ciclo <RefreshCw className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    próxima <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      <Confetti active={showCelebration} />
      <Dialog open={showCelebration} onOpenChange={setShowCelebration}>
        <DialogContent className="max-w-md w-[90vw] border-accent/50 bg-card rounded-xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <PartyPopper className="w-5 h-5 text-accent" />
              </div>
              <DialogTitle className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Ciclo DMAIC Concluído!
              </DialogTitle>
            </div>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed">
              Parabéns! Você percorreu todas as etapas da jornada de maturidade MathOps e validou
              todos os gateways de decisão.
            </DialogDescription>
          </DialogHeader>

          <FadeIn delay={200} whileInView={true} className="mt-4">
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-1">
                Progresso final
              </span>
              <span className="font-mono text-3xl font-bold text-accent">100%</span>
            </div>
          </FadeIn>

          <div className="flex justify-end mt-6">
            <Button
              onClick={resetCycle}
              className="bg-accent hover:bg-accent/90 text-white font-mono uppercase tracking-wider text-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Iniciar Novo Ciclo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
