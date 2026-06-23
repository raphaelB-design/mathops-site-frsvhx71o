import { FadeIn } from '@/components/fade-in'
import { SlideUpMask } from '@/components/slide-up-mask'
import { Separator } from '@/components/ui/separator'

export default function PoliticaDePrivacidade() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen text-foreground pb-24 pt-32">
      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <FadeIn>
          <div className="flex flex-col space-y-4 mb-12">
            <SlideUpMask>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter">
                Política de Privacidade
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
                1. Compromisso com a LGPD
              </h2>
              <p>
                A MathOps Strategy está comprometida com a proteção e privacidade dos seus dados
                pessoais. Esta política descreve como coletamos, usamos, armazenamos e protegemos
                suas informações de acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº
                13.709/2018).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground font-bold">
                2. Dados Coletados
              </h2>
              <p>
                No âmbito de nossos processos seletivos e captação de talentos, bem como contato
                comercial, podemos coletar os seguintes dados:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Área de interesse para atuação</li>
                <li>Motivação (texto de apresentação)</li>
                <li>Currículo (URL ou arquivo enviado)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground font-bold">
                3. Finalidade do Tratamento
              </h2>
              <p>
                Os dados pessoais listados acima são coletados e processados exclusivamente para
                fins de recrutamento, seleção de talentos para oportunidades na MathOps Strategy e
                contato comercial de leads. Não compartilhamos, vendemos ou alugamos seus dados para
                terceiros.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground font-bold">
                4. Direitos do Titular (LGPD)
              </h2>
              <p>
                Conforme estabelecido pela LGPD, você possui os seguintes direitos em relação aos
                seus dados pessoais armazenados em nosso banco de dados:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Confirmação da existência de tratamento.</li>
                <li>Acesso aos seus dados.</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.</li>
                <li>Eliminação dos dados pessoais tratados com o consentimento.</li>
              </ul>
              <p>
                Para exercer seus direitos, entre em contato conosco através do e-mail{' '}
                <strong>contato@mathopsstrategy.com.br</strong>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground font-bold">
                5. Segurança da Informação
              </h2>
              <p>
                Implementamos medidas técnicas e organizacionais rigorosas para proteger seus dados
                pessoais contra acesso não autorizado, alteração, divulgação ou destruição acidental
                ou ilícita. Seus dados são armazenados em servidores seguros com acesso restrito
                apenas a colaboradores autorizados da MathOps Strategy.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
