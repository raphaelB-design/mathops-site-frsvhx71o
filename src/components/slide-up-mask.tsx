import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SlideUpMaskProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SlideUpMask({ children, className, delay = 0 }: SlideUpMaskProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
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
  }, [delay])

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
          'transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          isVisible ? 'translate-y-0' : 'translate-y-[120%]',
        )}
      >
        {children}
      </span>
    </span>
  )
}
