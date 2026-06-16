import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { ValueStatement } from '@/components/sections/ValueStatement'
import { Services } from '@/components/sections/Services'
import { Metrics } from '@/components/sections/Metrics'
import { Methodology } from '@/components/sections/Methodology'
import { Industries } from '@/components/sections/Industries'
import { Differentials } from '@/components/sections/Differentials'
import { QuoteCTA } from '@/components/sections/QuoteCTA'
import { Footer } from '@/components/sections/Footer'

export default function Index() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <Marquee />
      <ValueStatement />
      <Services />
      <Metrics />
      <Methodology />
      <Industries />
      <Differentials />
      <QuoteCTA />
      <Footer />
    </div>
  )
}
