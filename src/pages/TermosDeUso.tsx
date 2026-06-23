import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { Separator } from '@/components/ui/separator'

export default function TermosDeUso() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-foreground pb-24 pt-32">
      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <FadeIn>
          <div className="flex flex-col space-y-4 mb-12">
            <SlideUpMask>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">
                Termos de Uso
              </h1>
            </SlideUpMask>
            <p className="text-muted-foreground font-serif text-lg">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
            <Separator className="w-24 bg-accent/50 mt-8" />
          </div>

          <div className="space-y-12 text-muted-foreground font-serif leading-relaxed">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground font-bold">
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e utilizar o site da MathOps Strategy, você concorda em cumprir e estar
                vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes
                termos, não deverá utilizar nosso site ou serviços.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground font-bold">
                2. Propriedade Intelectual
              </h2>
              <p>
                Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos, ícones,
                imagens, bem como algoritmos, metodologias exclusivas e códigos subjacentes, são de
                propriedade exclusiva da MathOps Strategy e estão protegidos pelas leis de direitos
                autorais e propriedade intelectual brasileiras e internacionais. A reprodução,
                modificação, distribuição ou transmissão de qualquer conteúdo sem autorização prévia
                por escrito é estritamente proibida.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground font-bold">
                3. Limites de Responsabilidade
              </h2>
              <p>
                A MathOps Strategy envida todos os esforços para garantir que as informações
                fornecidas neste site sejam precisas e atualizadas. No entanto, não garantimos a
                exatidão, integridade ou atualidade das informações. A MathOps não se responsabiliza
                por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes do
                uso ou da incapacidade de usar este site ou de qualquer informação nele contida.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground font-bold">4. Links Externos</h2>
              <p>
                Nosso site pode conter links para sites de terceiros que não são operados ou
                controlados pela MathOps Strategy. Não nos responsabilizamos pelo conteúdo,
                políticas de privacidade ou práticas de sites de terceiros. O acesso a esses sites é
                de sua exclusiva responsabilidade.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
