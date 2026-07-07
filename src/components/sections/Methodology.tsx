import { FadeIn } from '@/components/fade-in'
import { useState } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  PartyPopper,
  Quote,
  RefreshCw,
  X,
} from 'lucide-react'
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
      className="py-24 md:py-40 px-5 md:px-12 w-full bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-accent/[0.03] pointer-events-none" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <FadeIn>
          <div className="mb-16 md:mb-24 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent font-bold mb-5 block">
              Ciclo de Execução
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Metodologia <span className="text-accent">DMAIC</span>
            </h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Importamos e validamos o principal framework de engenharia de qualidade industrial
              para o ecossistema de dados corporativos.
            </p>
          </div>
        </FadeIn>

        {/* Stepper Rail */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-full overflow-x-auto scrollbar-dark pb-4 -mx-5 px-5">
            <div className="flex items-center justify-between min-w-[340px] max-w-2xl mx-auto relative px-2">
              {phases.map((p, i) => (
                <div key={p.id} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => goToPhase(i)}
                    className={cn(
                      'w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-display font-bold text-lg md:text-xl transition-all duration-300 z-10 relative flex-shrink-0',
                      activePhase === i
                        ? 'bg-accent text-white scale-110 stepper-glow border-none'
                        : activePhase > i
                          ? 'bg-accent/15 text-accent border border-accent/40 hover:bg-accent/25'
                          : 'bg-background/40 text-muted-foreground/50 border border-white/8 hover:border-white/25 backdrop-blur-sm',
                    )}
                    aria-label={`Ir para fase ${p.name}`}
                  >
                    {activePhase > i ? <Check className="w-5 h-5" /> : p.letter}
                  </button>
                  {i < phases.length - 1 && (
                    <div className="flex-1 h-[2px] bg-white/5 mx-2 md:mx-4 relative overflow-hidden rounded-full">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-accent/40 to-accent transition-all duration-500 ease-in-out rounded-full"
                        style={{ width: activePhase > i ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 font-mono text-[11px] text-muted-foreground/60 uppercase tracking-wider">
            <RefreshCw className="w-3 h-3" />
            <span>control encerra o ciclo e reabre define — kaizen contínuo</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-full max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
              Progresso do ciclo
            </span>
            <span
              className={cn(
                'font-mono text-xs font-bold text-accent transition-transform duration-300',
                pulse && 'scale-125',
              )}
            >
              {progress}%
            </span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full bg-gradient-to-r from-accent/60 to-accent transition-all duration-500 ease-out relative',
                pulse && 'progress-glow',
              )}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent progress-glow" />
            </div>
          </div>
        </div>

        {/* Phase Panel */}
        <div className="glass-panel rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <FadeIn key={activePhase} direction="up" delay={0} className="p-6 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6 mb-10">
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-accent/70 tracking-widest">
                  0{activePhase + 1}
                </span>
                <h3 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
                  {phase.name}
                </h3>
              </div>
              <span className="font-body text-base md:text-xl text-muted-foreground md:ml-auto">
                {phase.subtitle}
              </span>
            </div>

            {/* Voz do Cliente */}
            <div className="quote-container pl-6 pr-5 py-5 my-8 rounded-r-lg">
              <div className="flex gap-4 items-start">
                <Quote className="w-7 h-7 text-accent/50 shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="font-body italic text-lg md:text-xl text-foreground/85 leading-relaxed">
                  "{phase.vozDoCliente}"
                </p>
              </div>
            </div>

            {/* Grid Metodologia / Ferramentas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-4 block">
                  Metodologia
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {phase.metodologia.map((m) => (
                    <span
                      key={m}
                      className="glass-badge px-4 py-2 rounded-lg text-sm text-foreground/85 font-medium cursor-default"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-4 block">
                  Ferramentas
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {phase.ferramentas.map((f) => (
                    <span
                      key={f}
                      className="glass-badge px-4 py-2 rounded-lg text-sm text-foreground/85 font-medium cursor-default"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Entregável */}
            <div className="mb-10 p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60 block mb-1">
                  Entregável
                </span>
                <p className="font-body text-lg text-foreground font-semibold">
                  {phase.entregavel}
                </p>
              </div>
            </div>

            {/* BPMN Gate */}
            <div className="border-t border-white/5 pt-8 mt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'w-5 h-5 border-[2px] border-accent/60 flex-shrink-0 transition-all duration-300',
                    pulse ? 'gate-active' : 'rotate-45',
                  )}
                  style={{ borderRadius: '2px' }}
                />
                <span className="font-body text-foreground/90 font-medium text-base">
                  {phase.gate.pergunta}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 font-mono text-sm">
                <button
                  onClick={nextPhase}
                  className="glass-btn-emerald flex items-center gap-2 text-emerald-400/90 px-4 py-2 rounded-lg cursor-pointer font-medium"
                >
                  <Check className="w-4 h-4" />
                  <span>sim → avança</span>
                </button>
                <button
                  onClick={handleGateNo}
                  className="glass-btn-amber flex items-center gap-2 text-amber-400/90 px-4 py-2 rounded-lg cursor-pointer font-medium"
                >
                  <X className="w-4 h-4" />
                  <span>
                    não → {phase.gate.naoLabel}{' '}
                    <span className="opacity-50">({phase.gate.naoTipo})</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-10 border-t border-white/5 pt-8">
              <button
                onClick={prevPhase}
                disabled={activePhase === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 hover:border-white/20 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:border-white/10 transition-all duration-200 text-xs font-mono uppercase tracking-widest"
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
                      activePhase === i
                        ? 'bg-accent w-7 shadow-[0_0_8px_hsl(var(--accent)/0.5)]'
                        : 'bg-white/15 hover:bg-white/35',
                    )}
                    aria-label={`Ir para etapa ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={isLast ? resetCycle : nextPhase}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent hover:bg-accent/90 text-white transition-all duration-200 text-xs font-mono uppercase tracking-widest font-bold shadow-lg shadow-accent/20 hover:shadow-accent/40"
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
        <DialogContent className="max-w-md w-[90vw] border-accent/20 bg-card/95 backdrop-blur-xl rounded-2xl">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <DialogHeader>
            <div className="flex flex-col items-center text-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center shrink-0 border border-accent/30">
                <PartyPopper className="w-8 h-8 text-accent" strokeWidth={1.5} />
              </div>
              <DialogTitle className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Conquista
              </DialogTitle>
            </div>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed text-center">
              Você percorreu todas as etapas da jornada de maturidade MathOps e validou todos os
              gateways de decisão.
            </DialogDescription>
          </DialogHeader>

          <FadeIn delay={200} whileInView={true} className="mt-2">
            <div className="p-5 rounded-xl bg-accent/5 border border-accent/15 text-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/60 block mb-2">
                Progresso final
              </span>
              <span className="font-display text-4xl font-bold text-accent">100%</span>
            </div>
          </FadeIn>

          <div className="flex justify-center mt-6">
            <Button
              onClick={resetCycle}
              className="bg-accent hover:bg-accent/90 text-white font-mono uppercase tracking-widest text-sm px-8 py-3 rounded-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-200"
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
