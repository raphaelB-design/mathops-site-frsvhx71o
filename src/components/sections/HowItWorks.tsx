import { useEffect, useRef, useState } from 'react'
import { FadeIn } from '@/components/fade-in'
import { VideoBackdrop } from '@/components/VideoBackdrop'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico Analítico',
    description:
      'Mapeamento detalhado das variáveis de processos e dados. Coletamos e estruturamos as bases da operação, isolando fatos de ruídos e identificando gargalos e pontos críticos.',
  },
  {
    number: '02',
    title: 'Modelagem Estatística',
    description:
      'Construção de modelos quantitativos a partir de dados verificados, com memória de cálculo documentada e premissas explícitas para prever cenários e sustentar decisões.',
  },
  {
    number: '03',
    title: 'Implementação e Controle',
    description:
      'Entrega em produção com indicadores acordados e monitoramento contínuo, garantindo que os ganhos operacionais sejam sustentados com rastreabilidade total.',
  },
]

// A linha desenha em 1,2s; ela alcança o centro de cada cartão em ~20%, 60% e 100%
// do traço — os números acendem nesses momentos (delay = 0,25s + 0,4s por etapa).
const LINE_DRAW_S = 1.2

export function HowItWorks() {
  const gridRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [drawn, setDrawn] = useState(false)

  // IntersectionObserver dispara uma única vez ao entrar na viewport
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 px-6 md:px-12 w-full bg-background relative overflow-hidden">
      <VideoBackdrop name="10-varredura-operacao" opacity={0.3} />
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <FadeIn>
          <div className="mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Nosso Processo
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              A Engenharia do Resultado
            </h2>
          </div>
        </FadeIn>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Linha SVG que conecta os três cartões e se desenha ao entrar na viewport.
              Roda sobre a borda superior dos cartões (desktop). */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            className="absolute -top-1 left-0 right-0 h-2 hidden md:block pointer-events-none z-20"
          >
            <defs>
              <linearGradient
                id="eng-result-line"
                x1="0"
                y1="0"
                x2="100"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#3D63DD" />
                <stop offset="100%" stopColor="#2EB8A6" />
              </linearGradient>
            </defs>
            {/* Trilho base */}
            <line x1="0" y1="4" x2="100" y2="4" stroke="#1E293B" strokeWidth="1.5" />
            {/* Traço que se desenha (pathLength normalizado) */}
            <line
              x1="0"
              y1="4"
              x2="100"
              y2="4"
              stroke="url(#eng-result-line)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={prefersReducedMotion ? 'none' : '1'}
              strokeDashoffset={drawn || prefersReducedMotion ? 0 : 1}
              style={{
                transition: prefersReducedMotion
                  ? 'none'
                  : `stroke-dashoffset ${LINE_DRAW_S}s cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            />
          </svg>

          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 100}>
              <div className="relative h-full rounded-lg border border-[#1E293B] bg-[#111827]/85 backdrop-blur-md p-6 flex flex-col gap-4">
                <div
                  className="font-mono text-5xl font-bold mb-2"
                  style={{
                    color: drawn ? 'hsl(var(--accent-2))' : 'rgba(255, 255, 255, 0.1)',
                    textShadow: drawn ? '0 0 18px hsl(var(--accent-2) / 0.35)' : 'none',
                    transition: prefersReducedMotion
                      ? 'none'
                      : 'color 0.5s ease, text-shadow 0.5s ease',
                    transitionDelay: prefersReducedMotion ? '0s' : `${0.25 + index * 0.4}s`,
                  }}
                >
                  {step.number}
                </div>
                <h3 className="font-display text-xl text-white font-bold">{step.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
