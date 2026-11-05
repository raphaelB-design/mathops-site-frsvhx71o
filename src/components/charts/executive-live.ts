import { useEffect, useState } from 'react'

const TAU = Math.PI * 2

// Oscilação suave e periódica (soma de duas senoides). Em t = 0 vale 0,
// então o valor parte exatamente do estado final, sem salto.
export function waveOffset(elapsed: number, period: number, amp: number): number {
  const phase = (TAU * elapsed) / period
  return amp * (0.7 * Math.sin(phase) + 0.3 * Math.sin(phase * 2.3))
}

// Relógio do painel executivo: acumula segundos só enquanto `active` é true.
// Ao parar (fora da tela ou com reduzir movimento), zera — assim cada sessão
// começa do estado base e não há salto ao retomar.
export function useExecutiveClock(active: boolean): number {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!active) {
      setElapsed(0)
      return
    }

    let frame = 0
    let acc = 0
    let lastSet = 0
    let last = performance.now()

    const tick = (now: number) => {
      // dt limitado a 100 ms para não dar saltos após troca de aba
      acc += Math.min(now - last, 100) / 1000
      last = now
      // atualiza o estado a ~15 fps: com transições CSS de 0,5 s o movimento segue suave
      if (acc - lastSet >= 1 / 15) {
        lastSet = acc
        setElapsed(acc)
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active])

  return elapsed
}
