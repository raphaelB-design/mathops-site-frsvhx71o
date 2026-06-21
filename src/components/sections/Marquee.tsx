import { useRef, useEffect } from 'react'

const marqueeItems = [
  { term: 'Data Science' },
  { term: 'Pesquisa Operacional' },
  { term: 'Inteligência Artificial' },
  { term: 'Simulação de Cenários' },
  { term: 'Otimização Logística' },
  { term: 'Manutenção Preditiva' },
  { term: 'Gestão de Estoques' },
]

export function Marquee() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const isHovered = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    let animationId: number
    const el = scrollRef.current
    if (!el) return

    const scroll = () => {
      if (!isDragging.current && !isHovered.current) {
        el.scrollLeft += 1
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2
        }
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0)
    scrollLeft.current = scrollRef.current?.scrollLeft || 0
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    isHovered.current = false
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX.current) * 1.5
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk
      if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
        scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 2
        scrollLeft.current -= scrollRef.current.scrollWidth / 2
      } else if (scrollRef.current.scrollLeft <= 0) {
        scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / 2
        scrollLeft.current += scrollRef.current.scrollWidth / 2
      }
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true
    startX.current = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0)
    scrollLeft.current = scrollRef.current?.scrollLeft || 0
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX.current) * 1.5
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk
      if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
        scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 2
        scrollLeft.current -= scrollRef.current.scrollWidth / 2
      } else if (scrollRef.current.scrollLeft <= 0) {
        scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / 2
        scrollLeft.current += scrollRef.current.scrollWidth / 2
      }
    }
  }

  const handleTouchEnd = () => {
    isDragging.current = false
  }

  return (
    <div
      className="w-full py-6 border-y border-white/10 bg-white/5 overflow-hidden flex items-center relative z-20 select-none"
      onMouseEnter={() => {
        isHovered.current = true
      }}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap overflow-x-hidden w-full cursor-grab active:cursor-grabbing touch-pan-y [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex w-max shrink-0 items-center">
          {marqueeItems.map((item, idx) => (
            <span key={`first-${idx}`} className="flex items-center">
              <span className="font-display text-2xl md:text-3xl font-bold uppercase text-white/40 hover:text-accent transition-colors px-8">
                {item.term}
              </span>
              <span className="text-accent/50 text-xl">•</span>
            </span>
          ))}
        </div>
        <div className="flex w-max shrink-0 items-center">
          {marqueeItems.map((item, idx) => (
            <span key={`second-${idx}`} className="flex items-center">
              <span className="font-display text-2xl md:text-3xl font-bold uppercase text-white/40 hover:text-accent transition-colors px-8">
                {item.term}
              </span>
              <span className="text-accent/50 text-xl">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
