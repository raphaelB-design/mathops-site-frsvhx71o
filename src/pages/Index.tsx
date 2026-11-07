import { Suspense, lazy } from 'react'
import { Hero } from '@/components/sections/Hero'
import { SeoTags } from '@/components/SeoTags'

// Seções abaixo da dobra: carregadas sob demanda para reduzir o bundle inicial.
// São visuais (vídeos de fundo, SVGs animados), mas o conteúdo existe já no HTML
// renderizado — nenhuma animação (DMAIC, linha, varredura de luz, contadores)
// depende do import síncrono.
const ValueStatement = lazy(() =>
  import('@/components/sections/ValueStatement').then((m) => ({ default: m.ValueStatement })),
)
const Services = lazy(() =>
  import('@/components/sections/Services').then((m) => ({ default: m.Services })),
)
const ComoFunciona = lazy(() =>
  import('@/components/sections/ComoFunciona').then((m) => ({ default: m.ComoFunciona })),
)
const FinalCallout = lazy(() =>
  import('@/components/sections/FinalCallout').then((m) => ({ default: m.FinalCallout })),
)

function SectionSkeleton() {
  return <div className="min-h-[60vh] w-full bg-background" aria-hidden="true" />
}

export default function Index() {
  return (
    <div className="w-full flex flex-col">
      <SeoTags />
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <ValueStatement />
        <Services />
        <ComoFunciona />
        <FinalCallout />
      </Suspense>
    </div>
  )
}
