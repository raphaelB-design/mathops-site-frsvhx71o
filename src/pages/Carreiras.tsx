import { FadeIn } from '@/components/fade-in'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

export default function Carreiras() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[80vh] flex flex-col justify-center">
      <FadeIn>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Trabalhe <span className="text-accent italic">Conosco</span>
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-3xl mb-12 leading-relaxed">
          Junte-se à equipe da MathOps e participe de projetos desafiadores que transformam o
          cenário tecnológico e estratégico de grandes empresas através de inteligência artificial e
          pesquisa operacional.
        </p>
      </FadeIn>

      <FadeIn delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8"></FadeIn>
    </div>
  )
}
