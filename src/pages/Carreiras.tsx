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

      <FadeIn delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-4 group hover:bg-white/10 transition-colors">
          <h3 className="font-display text-2xl font-bold group-hover:text-accent transition-colors">
            Engenheiro de Dados Sênior
          </h3>
          <p className="font-body text-muted-foreground">
            Buscamos um especialista em arquiteturas distribuídas e pipelines de dados escaláveis
            para liderar a estruturação de fundações analíticas.
          </p>
          <div className="mt-auto pt-6">
            <Button
              variant="outline"
              className="w-full sm:w-auto font-mono uppercase tracking-widest text-xs gap-2"
            >
              Ver Detalhes <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-4 group hover:bg-white/10 transition-colors">
          <h3 className="font-display text-2xl font-bold group-hover:text-accent transition-colors">
            Cientista de Dados Pleno
          </h3>
          <p className="font-body text-muted-foreground">
            Atue no desenvolvimento de modelos preditivos e algoritmos de otimização para resolver
            problemas complexos de negócios.
          </p>
          <div className="mt-auto pt-6">
            <Button
              variant="outline"
              className="w-full sm:w-auto font-mono uppercase tracking-widest text-xs gap-2"
            >
              Ver Detalhes <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
