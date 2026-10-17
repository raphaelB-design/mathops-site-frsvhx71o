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
  alt = 'MathOps',
  height,
  pulse = true,
}: BrandLogoProps) {
  const src = theme === 'light' ? '/mathops-marca-clara.svg' : '/mathops-marca.svg'

  return (
    <img
      src={src}
      alt={alt}
      style={height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined}
      className={cn(
        'w-auto block object-contain select-none aspect-square',
        pulse && 'animate-logo-pulse',
        className,
      )}
      loading="eager"
      decoding="async"
    />
  )
}
