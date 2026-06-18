import { FadeIn } from '@/components/fade-in'
import { useState } from 'react'
import {
  ArrowUpRight,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Users,
  Zap,
  BookOpen,
  TrendingUp,
  Heart,
  Shield,
} from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────────
type JobType = 'Integral' | 'PJ' | 'Remoto'
type Department = 'Dados & BI' | 'Processos' | 'Modelagem' | 'IA'

interface Job {
  id: string
  title: string
  department: Department
  type: JobType
  location: string
  level: string
  description: string
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const values = [
  {
    icon: Zap,
    title: 'Rigor sem burocracia',
    desc: 'Entregamos metodologia de ponta sem camadas de aprovação que engessam o trabalho técnico.',
  },
  {
    icon: BookOpen,
    title: 'Aprendizado constante',
    desc: 'Cada projeto expõe você a um setor diferente, um problema novo e uma abordagem que ainda não usou.',
  },
  {
    icon: TrendingUp,
    title: 'Impacto mensurável',
    desc: 'Você vê em números o resultado do seu trabalho — em R$ recuperados, processos otimizados, decisões aceleradas.',
  },
  {
    icon: Users,
    title: 'Time pequeno, entrega grande',
    desc: 'Sem hierarquia desnecessária. Sua voz importa desde o primeiro dia.',
  },
  {
    icon: Heart,
    title: 'Autonomia real',
    desc: 'Você define como vai resolver o problema. Confiamos na sua metodologia.',
  },
  {
    icon: Shield,
    title: 'Segurança e transparência',
    desc: 'Contratos claros, remuneração honesta e feedback direto — sem jogos políticos.',
  },
]

const jobs: Job[] = [
  {
    id: 'consultor-processos-senior',
    title: 'Consultor de Processos Sênior',
    department: 'Processos',
    type: 'PJ',
    location: 'São Paulo, SP (Híbrido)',
    level: 'Sênior',
    description:
      'Você vai liderar imersões em clientes, mapear processos AS IS com profundidade técnica, redesenhar fluxos TO BE em BPMN 2.0 e entregar planos de ação que vão de fato ser executados. Não é trabalho de slide — é trabalho de chão de fábrica e sala de reunião ao mesmo tempo.',
    responsibilities: [
      'Conduzir imersões e entrevistas com stakeholders em clientes de médio e grande porte',
      'Documentar processos AS IS em BPMN 2.0 com nível de detalhe auditável',
      'Redesenhar fluxos TO BE com foco em eliminação de desperdício (Lean) e padronização',
      'Identificar e quantificar gargalos e perdas financeiras com base em dados',
      'Elaborar relatórios executivos e planos de ação priorizados por impacto',
      'Aplicar metodologia DMAIC ou A3 em projetos de melhoria contínua',
      'Apresentar resultados para C-Level e gestores de operação',
    ],
    requirements: [
      'Experiência sólida em mapeamento e redesenho de processos',
      'Domínio de BPMN 2.0 (Bizagi, Lucidchart ou similar)',
      'Conhecimento aplicado de Lean, Six Sigma ou metodologias DMAIC',
      'Capacidade de facilitar workshops e entrevistas com diferentes perfis',
      'Raciocínio analítico e habilidade de traduzir complexidade em clareza',
      'Comunicação direta e confiante com executivos',
    ],
    niceToHave: [
      'Certificação Lean Six Sigma (Green Belt ou Black Belt)',
      'Experiência em manufatura, logística ou serviços financeiros',
      'Noções de análise de dados com Excel ou Power BI',
      'Vivência em consultoria ou ambiente de projetos acelerados',
    ],
  },
  {
    id: 'analista-bi-power-bi',
    title: 'Analista de BI — Power BI',
    department: 'Dados & BI',
    type: 'PJ',
    location: 'Remoto (Brasil)',
    level: 'Pleno / Sênior',
    description:
      'Você vai construir a fundação analítica de empresas que ainda tomam decisões no Excel. Modelagem dimensional, DAX que funciona de verdade e dashboards que gestores realmente abrem. Aqui não tem BI cosmético — tem lógica de negócio codificada com precisão.',
    responsibilities: [
      'Construir semantic models completos no Power BI (Star Schema, DAX avançado)',
      'Desenvolver pipelines ETL no Power Query, Dataflow ou ferramentas de terceiros',
      'Conectar e integrar múltiplas fontes de dados (ERP, CRM, planilhas, APIs)',
      'Criar dashboards por área (Comercial, Operacional, Financeiro, Supply Chain)',
      'Documentar o modelo de dados, medidas DAX e fontes com padrão auditável',
      'Configurar RLS (Row Level Security) por perfil de usuário',
      'Treinar equipes internas para autonomia pós-projeto',
    ],
    requirements: [
      'Domínio avançado de Power BI (modelagem dimensional, DAX, Power Query)',
      'Entendimento sólido de Star Schema e modelagem dimensional',
      'Capacidade de se conectar a diferentes fontes de dados e fazer ETL',
      'Organização para documentar o trabalho de forma reproduzível',
      'Mentalidade de produto: pensa em quem vai usar o dashboard no dia a dia',
    ],
    niceToHave: [
      'Experiência com Fabric, Dataflows Gen2 ou pipelines no Azure',
      'Conhecimento de SQL para manipulação na fonte',
      'Noções de Python para tratamento de dados complexos',
      'Experiência com Power Apps ou Power Automate',
    ],
  },
  {
    id: 'cientista-dados-modelagem',
    title: 'Cientista de Dados — Modelagem Estatística',
    department: 'Modelagem',
    type: 'PJ',
    location: 'Remoto (Brasil)',
    level: 'Pleno / Sênior',
    description:
      'Você vai construir modelos que dão resposta a perguntas que empresas nunca conseguiram responder: "qual vai ser minha demanda nos próximos 3 meses?", "onde estou perdendo dinheiro no processo?", "qual o pior cenário possível para esse contrato?". Entrega com memória de cálculo, intervalo de confiança e linguagem que o gestor entende.',
    responsibilities: [
      'Desenvolver modelos preditivos (séries temporais, regressão, Monte Carlo)',
      'Conduzir análises de variabilidade e identificar fontes de desperdício com base estatística',
      'Construir simulações de cenário "What-if" para suporte à decisão',
      'Documentar memórias de cálculo completas e reproduzíveis',
      'Traduzir resultados técnicos em linguagem executiva sem perder o rigor',
      'Validar modelos com métricas adequadas (RMSE, MAPE, R², intervalos de confiança)',
    ],
    requirements: [
      'Sólido conhecimento de estatística aplicada (regressão, séries temporais, simulação)',
      'Python fluente (scikit-learn, statsmodels, Prophet, Pandas)',
      'Capacidade de documentar modelos de forma auditável e reproduzível',
      'Clareza para comunicar incerteza e limitações do modelo para não-técnicos',
      'Mentalidade de negócio: o modelo serve para uma decisão, não para um paper',
    ],
    niceToHave: [
      'Experiência com R para análise estatística',
      'Conhecimento de SQL para extração e limpeza de dados',
      'Vivência em manufatura, varejo, logística ou setor financeiro',
      'Publicações ou projetos com aplicação em contexto empresarial',
    ],
  },
  {
    id: 'especialista-ia-governanca',
    title: 'Especialista em IA & Governança de Dados',
    department: 'IA',
    type: 'PJ',
    location: 'São Paulo, SP (Híbrido)',
    level: 'Sênior',
    description:
      'Produto novo, alta demanda, baixa oferta qualificada. Você vai ajudar empresas a descobrirem se estão prontas para IA — e quando não estão, vai construir a fundação que viabiliza isso. Diagnóstico de prontidão, governança de dados, dicionário de dados e roadmap executivo para IA real, não para PowerPoint.',
    responsibilities: [
      'Conduzir diagnósticos de prontidão para IA (AI Readiness Assessment)',
      'Auditar qualidade e estrutura de dados em múltiplas fontes',
      'Estruturar dicionários de dados, definições de indicadores e memórias de cálculo',
      'Desenvolver políticas de governança de dados alinhadas à LGPD',
      'Elaborar roadmaps executivos de IA com priorização por viabilidade e ROI',
      'Apresentar resultados e recomendações para C-Level',
    ],
    requirements: [
      'Entendimento profundo de fundações de dados (qualidade, catalogação, governança)',
      'Experiência com diagnóstico de maturidade analítica em empresas',
      'Capacidade de estruturar dicionários de dados e policies de governança',
      'Conhecimento de LGPD e suas implicações práticas em projetos de dados',
      'Habilidade para comunicar risco e recomendação técnica para executivos',
    ],
    niceToHave: [
      'Experiência com ferramentas de catálogo de dados (Alation, Atlan, DataHub)',
      'Familiaridade com frameworks de governança (DAMA, DCAM)',
      'Vivência com projetos de ML ou IA em produção',
      'Certificações em dados ou IA',
    ],
  },
]

const deptColors: Record<Department, string> = {
  'Dados & BI': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Processos: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Modelagem: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  IA: 'bg-accent/10 text-accent border-accent/20',
}

const typeColors: Record<JobType, string> = {
  Integral: 'bg-green-500/10 text-green-400 border-green-500/20',
  PJ: 'bg-white/5 text-muted-foreground border-white/10',
  Remoto: 'bg-white/5 text-muted-foreground border-white/10',
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`border transition-all duration-300 ${
        open ? 'border-accent/40 bg-accent/[0.02]' : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 group"
        aria-expanded={open}
      >
        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${deptColors[job.department]}`}
            >
              {job.department}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${typeColors[job.type]}`}
            >
              {job.type}
            </span>
          </div>
          <h3
            className={`font-display text-xl md:text-2xl font-bold mb-1 transition-colors ${open ? 'text-accent' : 'group-hover:text-accent'}`}
          >
            {job.title}
          </h3>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {job.level}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="font-mono text-xs text-muted-foreground hidden md:block">
            {open ? 'Fechar' : 'Ver vaga'}
          </span>
          {open ? (
            <ChevronUp className="w-5 h-5 text-accent" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-6 md:px-8 pb-8 flex flex-col gap-8 border-t border-white/10 pt-8">
          {/* Description */}
          <p className="font-body text-muted-foreground leading-relaxed">{job.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Responsibilities */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-4">
                O que você vai fazer
              </p>
              <ul className="flex flex-col gap-2.5">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-4">
                  O que esperamos
                </p>
                <ul className="flex flex-col gap-2.5">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {job.niceToHave.length > 0 && (
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    Seria ótimo se você tivesse
                  </p>
                  <ul className="flex flex-col gap-2">
                    {job.niceToHave.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0 mt-2" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Apply CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <p className="text-sm text-muted-foreground">
              Envie currículo e portfólio (opcional) para{' '}
              <a href="mailto:talentos@mathops.com.br" className="text-accent hover:underline">
                talentos@mathops.com.br
              </a>{' '}
              com o assunto: <span className="font-mono text-white">{job.id}</span>
            </p>
            <a
              href={`mailto:talentos@mathops.com.br?subject=${job.id}&body=Olá, tenho interesse na vaga de ${job.title}.`}
              className="shrink-0 bg-white text-black px-6 py-3 font-display font-bold text-sm hover:bg-accent hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              Candidatar-se <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Carreiras() {
  const [activeFilter, setActiveFilter] = useState<Department | 'Todas'>('Todas')

  const departments: Array<Department | 'Todas'> = [
    'Todas',
    'Dados & BI',
    'Processos',
    'Modelagem',
    'IA',
  ]

  const filtered =
    activeFilter === 'Todas' ? jobs : jobs.filter((j) => j.department === activeFilter)

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 px-6 md:px-12 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeIn>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-6 block">
              Carreiras · MathOps Strategy
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight mb-6">
              Construa coisas <span className="text-accent italic">que importam</span>
              <span className="text-white">.</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Na MathOps, você vai resolver problemas reais de empresas reais&nbsp; com matemáticos,
              estatisticos, especialistas em processos e autonomia técnica e impacto
              mensurável.&nbsp;
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document.getElementById('vagas')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-white text-black px-8 py-4 font-display font-semibold text-base hover:bg-accent hover:text-white transition-colors flex items-center gap-2 group w-fit"
              >
                Ver Vagas Abertas
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <a
                href="mailto:talentos@mathops.com.br"
                className="px-8 py-4 font-display font-semibold text-base border border-white/15 hover:border-white/30 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 w-fit"
              >
                Candidatura Espontânea
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 px-6 md:px-12 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-white/10">
          {[
            { val: '4', label: 'Vagas abertas agora' },
            { val: '100%', label: 'Remoto ou híbrido' },
            { val: 'PJ', label: 'Modelo de contratação' },
            { val: 'SP', label: 'Sede em São Paulo' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="px-6 py-6 first:pl-0 flex flex-col gap-1 group hover:bg-white/[0.02] transition-colors">
                <span className="font-display text-3xl md:text-4xl font-bold text-white group-hover:text-accent transition-colors">
                  {s.val}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Nossa Cultura
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">
              Por que trabalhar na MathOps?
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="p-8 border-b border-r border-white/10 hover:bg-white/[0.02] transition-colors group flex flex-col gap-4 h-full [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0">
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                    <v.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-bold group-hover:text-accent transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02] border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
              Processo Seletivo
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">
              Simples, transparente e rápido.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              {
                step: '01',
                title: 'Candidatura',
                desc: 'Envie currículo e, se quiser, portfólio ou exemplos de trabalho. Lemos tudo.',
                time: 'Dia 0',
              },
              {
                step: '02',
                title: 'Bate-papo inicial',
                desc: 'Call de 30 min com alguém do time para entender seu histórico e o que você está buscando.',
                time: 'Até 5 dias',
              },
              {
                step: '03',
                title: 'Desafio técnico',
                desc: 'Problema real de consultoria para resolver no seu tempo. Sem prova cronometrada.',
                time: '3–5 dias',
              },
              {
                step: '04',
                title: 'Entrevista final',
                desc: 'Conversa técnica + cultural com os sócios. Feedback honesto em até 48h.',
                time: 'Até 7 dias',
              },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="relative p-8 border-r border-b md:border-b-0 border-white/10 last:border-r-0 group hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-4xl font-bold text-white/10 group-hover:text-accent/20 transition-colors">
                      {p.step}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{p.time}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3 group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-4 h-4 border border-white/10 bg-background rotate-45" />
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Jobs ── */}
      <section id="vagas" className="py-24 px-6 md:px-12 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold mb-4 block">
                  Vagas Abertas
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  {filtered.length}{' '}
                  {filtered.length === 1 ? 'posição disponível' : 'posições disponíveis'}
                </h2>
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2">
                {departments.map((d) => (
                  <button
                    key={d}
                    onClick={() => setActiveFilter(d)}
                    className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-all ${
                      activeFilter === d
                        ? 'bg-accent text-white border-accent'
                        : 'border-white/10 text-muted-foreground hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-4">
            {filtered.map((job, i) => (
              <FadeIn key={job.id} delay={i * 80}>
                <JobCard job={job} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Spontaneous ── */}
      <section className="py-24 px-6 md:px-12 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Não encontrou a vaga certa?
            </h2>
            <p className="font-body text-lg text-black/60 mb-10 max-w-xl mx-auto leading-relaxed">
              Enviamos candidaturas espontâneas para um pool ativo. Se o perfil fizer sentido,
              entramos em contato assim que uma posição abrir.
            </p>
            <a
              href="mailto:talentos@mathops.com.br?subject=Candidatura Espontânea&body=Olá, gostaria de me candidatar espontaneamente para a MathOps Strategy."
              className="bg-black text-white px-10 py-4 font-display font-bold text-base hover:bg-accent transition-colors inline-flex items-center gap-2"
            >
              Enviar Candidatura Espontânea <ArrowUpRight className="w-5 h-5" />
            </a>
            <p className="font-mono text-xs text-black/40 mt-6">talentos@mathops.com.br</p>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
