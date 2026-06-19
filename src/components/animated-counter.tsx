import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({
  value,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTimestamp: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      // easeOutExpo for a smooth deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      setCount(easeProgress * value)

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step)
      } else {
        setCount(value)
      }
    }

    animationFrameId = window.requestAnimationFrame(step)

    return () => window.cancelAnimationFrame(animationFrameId)
  }, [value, duration, isVisible])

  const displayValue = count.toFixed(decimals)
  // Ensure we don't display "-0" or "-0.0" when starting the animation for negative targets
  const finalDisplay =
    displayValue === '-0' || displayValue === '-0.0' ? (0).toFixed(decimals) : displayValue

  return (
    <span ref={elementRef}>
      {prefix}
      {finalDisplay}
      {suffix}
    </span>
  )
}
