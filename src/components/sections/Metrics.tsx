import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { useEffect, useRef, useState } from 'react'

const metrics = [
  { value: '40+', label: 'Infraestruturas de Dados Entregues' },
  { value: '100%', label: 'Taxa de Retorno (ROI) em 12 meses' },
  { value: '4.8σ', label: 'Score de Eficiência em Processos' },
  { value: '-38%', label: 'Em custos operacionais' },
]

function AnimatedNumber({ value }: { value: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const numMatch = value.match(/[-+]?[\d.]+/)
  const numValue = numMatch ? parseFloat(numMatch[0]) : 0
  const prefix = numMatch ? value.substring(0, value.indexOf(numMatch[0])) : ''
  const suffix = numMatch ? value.substring(value.indexOf(numMatch[0]) + numMatch[0].length) : value
  const isFloat = numMatch && numMatch[0].includes('.')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const duration = 2000 // 2 seconds

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCount(numValue * easeOutQuart)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(numValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, numValue])

  const displayValue = isFloat ? count.toFixed(1) : Math.round(count).toString()

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

export function Metrics() {
  return (
    <section id="numeros" className="py-24 md:py-32 px-6 md:px-12 w-full">
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn>
          <SlideUpMask>
            <h2 className="sr-only">Nossos Números</h2>
          </SlideUpMask>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {metrics.map((metric, idx) => (
            <FadeIn key={idx} delay={idx * 150}>
              <div className="relative flex flex-col gap-4 p-8 bg-white/5 border border-white/10 group overflow-hidden h-full hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)] hover:border-white/20 transition-all duration-500 ease-smooth">
                {/* Accent Top Border Hover Effect */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <h3 className="font-display text-4xl md:text-5xl font-bold text-white group-hover:text-accent transition-colors">
                  <AnimatedNumber value={metric.value} />
                </h3>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground leading-relaxed mt-auto">
                  {metric.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
