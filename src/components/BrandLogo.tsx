import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  theme?: 'dark' | 'light'
  alt?: string
  height?: number | string
  pulse?: boolean
  showText?: boolean
  textClassName?: string
}

export function BrandLogo({
  className,
  theme = 'dark',
  alt = 'MathOps',
  height,
  pulse = true,
  showText = true,
  textClassName,
}: BrandLogoProps) {
  const isLight = theme === 'light'
  const src = isLight ? '/mathops-marca-clara.svg' : '/mathops-marca.svg'

  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <img
        src={src}
        alt={alt}
        style={height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined}
        className={cn(
          'w-auto block object-contain select-none aspect-square shrink-0',
          pulse && 'animate-logo-m',
        )}
        loading="eager"
        decoding="async"
      />
      {showText && (
        <span
          className={cn(
            'font-display font-bold text-xl tracking-tight leading-none',
            isLight ? 'text-zinc-900' : 'text-white',
            textClassName,
          )}
        >
          Math<span className="text-primary">Ops</span>
        </span>
      )}
    </div>
  )
}
