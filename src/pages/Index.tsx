import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { PracticeAreas } from '@/components/sections/PracticeAreas'
import { Team } from '@/components/sections/Team'
import { Footer } from '@/components/sections/Footer'

export default function Index() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <Manifesto />
      <PracticeAreas />
      <Team />
      <Footer />
    </div>
  )
}
