import { Hero } from '@/components/sections/Hero'
import { ValueStatement } from '@/components/sections/ValueStatement'
import { Oferta } from '@/components/sections/Oferta'
import { ComoFunciona } from '@/components/sections/ComoFunciona'
import { Metrics } from '@/components/sections/Metrics'
import { Differentials } from '@/components/sections/Differentials'
import { FAQ } from '@/components/sections/FAQ'
import { QuoteCTA } from '@/components/sections/QuoteCTA'
import { SeoTags } from '@/components/SeoTags'

export default function Index() {
  return (
    <div className="w-full flex flex-col">
      <SeoTags />
      <Hero />
      <ValueStatement />
      <Oferta />
      <ComoFunciona />
      <Metrics />
      <Differentials />
      <FAQ />
      <QuoteCTA />
    </div>
  )
}
