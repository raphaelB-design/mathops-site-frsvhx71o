import { Hero } from '@/components/sections/Hero'
import { Metrics } from '@/components/sections/Metrics'
import { Solutions } from '@/components/sections/Solutions'
import { Methodology } from '@/components/sections/Methodology'
import { Industries } from '@/components/sections/Industries'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { About } from '@/components/sections/About'
import { Footer } from '@/components/sections/Footer'

export default function Index() {
  return (
    <div className="w-full flex flex-col bg-black text-white selection:bg-white selection:text-black">
      <Hero />
      <Metrics />
      <Solutions />
      <Methodology />
      <Industries />
      <FAQ />
      <CTA />
      <About />
      <Footer />
    </div>
  )
}
