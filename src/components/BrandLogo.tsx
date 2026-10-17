import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  theme?: 'dark' | 'light'
  alt?: string
  height?: number | string
  pulse?: boolean
}

export function BrandLogo({
  className,
  theme = 'dark',
  alt = 'MathOps Strategy',
  height,
  pulse = true,
}: BrandLogoProps) {
  const src = theme === 'light' ? '/mathops-logo-fundo-claro.svg' : '/mathops-logo-fundo-escuro.svg'

  return (
    <img
      src={src}
      alt={alt}
      style={height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined}
      className={cn(
        'w-auto block object-contain select-none',
        pulse && 'animate-tiger-heartbeat',
        className,
      )}
      loading="eager"
      decoding="async"
    />
  )
}
