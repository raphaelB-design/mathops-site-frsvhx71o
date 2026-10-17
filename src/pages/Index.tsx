import { Hero } from '@/components/sections/Hero'
import { ValueStatement } from '@/components/sections/ValueStatement'
import { Services } from '@/components/sections/Services'
import { ComoFunciona } from '@/components/sections/ComoFunciona'
import { Metrics } from '@/components/sections/Metrics'
import { FinalCallout } from '@/components/sections/FinalCallout'
import { SeoTags } from '@/components/SeoTags'

export default function Index() {
  return (
    <div className="w-full flex flex-col">
      <SeoTags />
      <Hero />
      <ValueStatement />
      <Services />
      <ComoFunciona />
      <Metrics />
      <FinalCallout />
    </div>
  )
}
