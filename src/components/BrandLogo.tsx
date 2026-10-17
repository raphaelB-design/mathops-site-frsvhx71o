import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  theme?: 'dark' | 'light'
  alt?: string
  height?: number | string
}

export function BrandLogo({
  className,
  theme = 'dark',
  alt = 'MathOps Strategy',
  height,
}: BrandLogoProps) {
  const src = theme === 'light' ? '/mathops-logo-fundo-claro.svg' : '/mathops-logo-fundo-escuro.svg'

  return (
    <img
      src={src}
      alt={alt}
      style={height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined}
      className={cn('w-auto block object-contain', className)}
      loading="eager"
      decoding="async"
    />
  )
}
