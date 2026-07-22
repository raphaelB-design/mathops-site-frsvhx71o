import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface SlideUpMaskProps {
  children: React.ReactNode
  className?: string
  delay?: number
  whileInView?: boolean
}

export function SlideUpMask({
  children,
  className,
  delay = 0,
  whileInView = true,
}: SlideUpMaskProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(!whileInView || prefersReducedMotion)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }
    if (!whileInView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, whileInView, prefersReducedMotion])

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex overflow-hidden pb-4 -mb-4 pt-2 -mt-2 px-1 -mx-1 align-bottom',
        className,
      )}
    >
      <span
        className={cn(
          'transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform block',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0',
        )}
      >
        {children}
      </span>
    </span>
  )
}
