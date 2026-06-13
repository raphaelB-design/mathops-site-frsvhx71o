import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'none'
}

export function FadeIn({ children, className, delay = 0, direction = 'up' }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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

  const transformClass =
    direction === 'up' ? 'translate-y-12' : direction === 'down' ? '-translate-y-12' : ''

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-smooth',
        isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${transformClass}`,
        className,
      )}
    >
      {children}
    </div>
  )
}
