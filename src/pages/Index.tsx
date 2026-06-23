import { Hero } from '@/components/sections/Hero'
import { Marquee } from '@/components/sections/Marquee'
import { ValueStatement } from '@/components/sections/ValueStatement'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Services } from '@/components/sections/Services'
import { Metrics } from '@/components/sections/Metrics'
import { Industries } from '@/components/sections/Industries'
import { Differentials } from '@/components/sections/Differentials'
import { FAQ } from '@/components/sections/FAQ'
import { CrmCtaBanner } from '@/components/sections/CrmCtaBanner'
import { QuoteCTA } from '@/components/sections/QuoteCTA'
import { Footer } from '@/components/sections/Footer'
import { SeoTags } from '@/components/SeoTags'

export default function Index() {
  return (
    <div className="w-full flex flex-col">
      <SeoTags />
      <Hero />
      <Marquee />
      <ValueStatement />
      <HowItWorks />
      <Services />
      <Metrics />
      <Industries />
      <Differentials />
      <FAQ />
      <CrmCtaBanner />
      <QuoteCTA />
      <Footer />
    </div>
  )
}
