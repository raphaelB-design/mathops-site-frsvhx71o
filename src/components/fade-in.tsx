import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'none'
  whileInView?: boolean
  staggerChildren?: number
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  whileInView = true,
  staggerChildren,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(!whileInView)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!whileInView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay, whileInView])

  const transformClass =
    direction === 'up' ? 'translate-y-12' : direction === 'down' ? '-translate-y-12' : ''

  if (staggerChildren) {
    return (
      <div ref={ref} className={className}>
        {React.Children.map(children, (child, i) => {
          if (React.isValidElement(child)) {
            const childStyle = (child.props as any).style || {}
            const childClassName = (child.props as any).className || ''
            return React.cloneElement(child, {
              style: {
                ...childStyle,
                transitionDelay: `${delay + i * staggerChildren}ms`,
              },
              className: cn(
                childClassName,
                'transition-all duration-1000 ease-out will-change-transform',
                isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${transformClass}`,
              ),
            } as any)
          }
          return child
        })}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-out will-change-transform',
        isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${transformClass}`,
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
