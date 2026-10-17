import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface TickerCounterProps {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  /** Intervalo entre cada "tick" do ticker, em ms (padrão: 3s) */
  tickInterval?: number
  /** Duração da contagem inicial de entrada, em ms (padrão: 2s) */
  duration?: number
}

/** Duração da fase de embaralhamento de dígitos em cada tick, em ms */
const SCRAMBLE_DURATION = 600
/** Frequência de troca dos dígitos durante o scramble, em ms */
const SCRAMBLE_STEP = 80

function formatValue(n: number, decimals: number) {
  const s = n.toFixed(decimals)
  if (s === '-0' || /^-0\.?0*$/.test(s)) return (0).toFixed(decimals)
  return s
}

/**
 * Contador animado com "ticker" contínuo: além da contagem de entrada,
 * os dígitos rolam/scramblam periodicamente e reassentam no valor real.
 * Respeita prefers-reduced-motion (fica estático no valor real).
 */
export function TickerCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  tickInterval = 3000,
  duration = 2000,
}: TickerCounterProps) {
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion ? formatValue(value, decimals) : (0).toFixed(decimals),
  )
  const formatRef = useRef<(n: number) => string>(() => '')

  formatRef.current = (n: number) => formatValue(n, decimals)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(formatValue(value, decimals))
      return
    }

    let raf = 0
    let ticker: number | undefined
    let scrambleTimer: number | undefined
    let settleTimer: number | undefined
    let startTimestamp: number | null = null

    const scramble = () => {
      const real = formatRef.current(value)
      const scrambled = real
        .split('')
        .map((c) => (/\d/.test(c) ? Math.floor(Math.random() * 10).toString() : c))
        .join('')
      setDisplay(scrambled)
    }

    const startScramble = () => {
      scramble()
      scrambleTimer = window.setInterval(scramble, SCRAMBLE_STEP)
      settleTimer = window.setTimeout(() => {
        window.clearInterval(scrambleTimer)
        scrambleTimer = undefined
        setDisplay(formatRef.current(value))
      }, SCRAMBLE_DURATION)
    }

    const startTicker = () => {
      ticker = window.setInterval(startScramble, tickInterval)
    }

    const step = (timestamp: number) => {
      if (startTimestamp === null) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      setDisplay(formatRef.current(easeProgress * value))

      if (progress < 1) {
        raf = window.requestAnimationFrame(step)
      } else {
        setDisplay(formatRef.current(value))
        startTicker()
      }
    }

    raf = window.requestAnimationFrame(step)

    return () => {
      window.cancelAnimationFrame(raf)
      if (ticker !== undefined) window.clearInterval(ticker)
      if (scrambleTimer !== undefined) window.clearInterval(scrambleTimer)
      if (settleTimer !== undefined) window.clearTimeout(settleTimer)
    }
  }, [value, decimals, tickInterval, duration, prefersReducedMotion])

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
