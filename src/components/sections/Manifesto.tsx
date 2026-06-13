import { FadeIn } from '@/components/fade-in'

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="py-[120px] md:py-[180px] px-6 w-full flex justify-center bg-black"
    >
      <div className="max-w-2xl text-center w-full">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-16">
            001 · Manifesto
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="space-y-8 font-body text-xl md:text-3xl text-muted leading-relaxed">
            <p>
              Acreditamos que a verdadeira defesa não busca atalhos, mas exige a compreensão
              profunda do labirinto. Em um sistema desenhado para condenar, nossa vocação é erguer
              muralhas de garantias.
            </p>
            <p>
              Não operamos com urgências comerciais. Nossa prática é cirúrgica, artesanal e
              fundamentada na discrição absoluta. Cada caso é uma obra singular, onde a liberdade é
              o único resultado aceitável.
            </p>
            <p>
              O direito penal não é um jogo de retórica. É a fronteira final entre o indivíduo e o
              peso opressor do Estado. E nós dominamos esta fronteira.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
