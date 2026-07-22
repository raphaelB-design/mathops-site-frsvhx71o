import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  textClassName?: string
  showText?: boolean
}

export function BrandLogo({ className, textClassName, showText = true }: BrandLogoProps) {
  return (
    <span className="flex items-center gap-2">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('w-6 h-6 text-accent animate-pulse', className)}
        aria-label="MathOps"
      >
        <path
          d="M3 7L7 3L11 7"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13 17L17 21L21 17"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="7"
          y="7"
          width="10"
          height="10"
          rx="1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
      {showText && (
        <span className={cn('font-serif text-xl text-white tracking-tight', textClassName)}>
          MathOps
        </span>
      )}
    </span>
  )
}
