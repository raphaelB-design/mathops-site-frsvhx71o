import { useAuth } from '@/hooks/use-auth'
import { Navigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  LogOut,
  FileText,
  Activity,
  Briefcase,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Download,
  Shield,
  BarChart3,
  ChevronRight,
  User,
  Settings,
} from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

type Role = 'admin' | 'consultor' | 'user'

// ─── Shared ───────────────────────────────────────────────────────────────────
function StatusBadge({
  status,
}: {
  status: 'Em andamento' | 'Concluído' | 'Pendente aprovação' | 'Atrasado'
}) {
  const map = {
    'Em andamento': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Concluído: 'bg-green-500/10 text-green-400 border-green-500/20',
    'Pendente aprovação': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Atrasado: 'bg-red-500/10 text-red-400 border-red-500/20',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${map[status]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

function KpiCard({ icon: Icon, label, value, sub, color = 'text-accent' }: any) {
  return (
    <div className="p-5 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <p className={`font-display text-3xl font-bold mb-1 ${color}`}>{value}</p>
      <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  )
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard({ user, signOut }: any) {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Administrador
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold">Painel de Gestão</h1>
          <p className="text-muted-foreground text-sm mt-1">{user?.email}</p>
        </div>
        <div className="flex gap-3">
          <Button
            asChild
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 gap-2 text-xs font-mono uppercase tracking-wider"
          >
            <Link to="/admin">
              <Settings className="w-3.5 h-3.5" /> Usuários
            </Link>
          </Button>
          <Button
            onClick={signOut}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 gap-2 text-xs"
          >
            <LogOut className="w-3.5 h-3.5" /> Sair
          </Button>
        </div>
      </header>

      {/* KPIs */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Visão Geral do Negócio
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard
            icon={TrendingUp}
            label="Receita do Mês"
            value="R$284k"
            sub="↑ +12% vs mês anterior"
            color="text-green-400"
          />
          <KpiCard
            icon={Briefcase}
            label="Projetos Ativos"
            value="7"
            sub="2 novas contratações"
            color="text-blue-400"
          />
          <KpiCard
            icon={User}
            label="Consultores Ativos"
            value="4"
            sub="Ocupação média: 87%"
            color="text-violet-400"
          />
          <KpiCard
            icon={Activity}
            label="Leads no Funil"
            value="12"
            sub="3 em fase de proposta"
            color="text-accent"
          />
        </div>
      </div>

      {/* Projects table */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Projetos em Andamento
        </p>
        <div className="border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Cliente
                </th>
                <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Consultor
                </th>
                <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Prazo
                </th>
                <th className="text-left px-4 py-3 font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  client: 'Indústrias ABC Ltda',
                  consultant: 'Raphael',
                  deadline: '15 Jul',
                  status: 'Em andamento',
                },
                {
                  client: 'Varejo Express S.A.',
                  consultant: 'Artur',
                  deadline: '22 Jul',
                  status: 'Pendente aprovação',
                },
                {
                  client: 'TechSolutions Br',
                  consultant: 'Lucas',
                  deadline: '30 Jun',
                  status: 'Atrasado',
                },
                {
                  client: 'Grupo Logística Norte',
                  consultant: 'Priscilla',
                  deadline: '05 Ago',
                  status: 'Em andamento',
                },
              ].map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{p.client}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {p.consultant}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground hidden md:table-cell">
                    {p.deadline}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status as any} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Atenção Necessária
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              icon: AlertCircle,
              text: 'TechSolutions Br — projeto atrasado 5 dias. Consultor: Lucas.',
              color: 'text-red-400',
            },
            {
              icon: Clock,
              text: 'Varejo Express — aguardando aprovação de etapa pelo cliente há 3 dias.',
              color: 'text-amber-400',
            },
            {
              icon: FileText,
              text: '2 faturas com vencimento nos próximos 7 dias.',
              color: 'text-blue-400',
            },
          ].map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 border border-white/10 bg-white/[0.02]"
            >
              <a.icon className={`w-4 h-4 shrink-0 mt-0.5 ${a.color}`} />
              <p className="text-sm text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Consultor Dashboard ──────────────────────────────────────────────────────
function ConsultorDashboard({ user, signOut }: any) {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-blue-400">
              Consultor
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold">Minha Área</h1>
          <p className="text-muted-foreground text-sm mt-1">{user?.email}</p>
        </div>
        <Button
          onClick={signOut}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 gap-2 text-xs"
        >
          <LogOut className="w-3.5 h-3.5" /> Sair
        </Button>
      </header>

      {/* My KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <KpiCard icon={Briefcase} label="Projetos Ativos" value="3" color="text-blue-400" />
        <KpiCard
          icon={CheckCircle2}
          label="Tarefas Hoje"
          value="5"
          sub="2 concluídas"
          color="text-green-400"
        />
        <KpiCard
          icon={Clock}
          label="Próxima Entrega"
          value="3d"
          sub="Indústrias ABC"
          color="text-amber-400"
        />
      </div>

      {/* Today's tasks */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Tarefas de Hoje
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              task: 'Finalizar BPMN TO BE — Indústrias ABC',
              project: 'Mapeamento de Processos',
              priority: 'Alta',
              done: true,
            },
            {
              task: 'Revisar modelo preditivo de demanda',
              project: 'Modelagem Matemática',
              priority: 'Alta',
              done: false,
            },
            {
              task: 'Upload relatório A3 — semana 3',
              project: 'Análise de Melhoria',
              priority: 'Média',
              done: false,
            },
            {
              task: 'Responder dúvidas do cliente no chat',
              project: 'Dashboard Diagnóstico',
              priority: 'Média',
              done: false,
            },
          ].map((t, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 border transition-colors ${t.done ? 'border-white/5 opacity-50' : 'border-white/10 hover:border-white/20'}`}
            >
              <div
                className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center ${t.done ? 'bg-green-500/20 border-green-500/40' : 'border-white/20'}`}
              >
                {t.done && <CheckCircle2 className="w-3 h-3 text-green-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${t.done ? 'line-through text-muted-foreground' : ''}`}
                >
                  {t.task}
                </p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{t.project}</p>
              </div>
              <span
                className={`text-xs font-mono shrink-0 px-2 py-0.5 rounded ${t.priority === 'Alta' ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-muted-foreground'}`}
              >
                {t.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Active projects */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Meus Projetos
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Indústrias ABC Ltda',
              service: 'Mapeamento AS IS/TO BE',
              progress: 70,
              deadline: '15 Jul',
              status: 'Em andamento',
            },
            {
              name: 'TechSolutions Br',
              service: 'Análise de Melhoria',
              progress: 45,
              deadline: '30 Jun',
              status: 'Atrasado',
            },
            {
              name: 'Logística Norte',
              service: 'Dashboard Diagnóstico',
              progress: 90,
              deadline: '05 Ago',
              status: 'Em andamento',
            },
          ].map((p, i) => (
            <div
              key={i}
              className="p-5 border border-white/10 hover:border-white/20 transition-colors flex flex-col gap-3"
            >
              <div>
                <p className="font-display font-bold text-sm mb-0.5">{p.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{p.service}</p>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-mono font-bold text-white">{p.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full transition-all"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <StatusBadge status={p.status as any} />
                <span className="font-mono text-xs text-muted-foreground">{p.deadline}</span>
              </div>
              <button className="mt-auto flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-white transition-colors">
                Acessar projeto <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent messages */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Mensagens Recentes dos Clientes
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              client: 'Indústrias ABC',
              msg: 'Recebi o fluxograma AS IS. Tenho dúvidas sobre a etapa 4.',
              time: '2h',
            },
            {
              client: 'TechSolutions',
              msg: 'Quando podemos agendar a próxima reunião de revisão?',
              time: '5h',
            },
          ].map((m, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2 mb-0.5">
                  <p className="font-medium text-sm">{m.client}</p>
                  <span className="font-mono text-xs text-muted-foreground shrink-0">
                    {m.time} atrás
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{m.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Cliente Dashboard ────────────────────────────────────────────────────────
function ClienteDashboard({ user, signOut }: any) {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-green-400">
              Projeto Ativo
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold">
            Bem-vindo, {user?.email?.split('@')[0]}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Acompanhe seu projeto em tempo real</p>
        </div>
        <Button
          onClick={signOut}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 gap-2 text-xs"
        >
          <LogOut className="w-3.5 h-3.5" /> Sair
        </Button>
      </header>

      {/* Project status timeline */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Status do Projeto
        </p>
        <div className="p-6 border border-white/10 bg-white/[0.02] mb-6">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
            <div>
              <h2 className="font-display text-xl font-bold mb-1">
                Mapeamento de Processos AS IS / TO BE
              </h2>
              <p className="text-sm text-muted-foreground">
                Consultor responsável: <span className="text-white">Raphael</span>
              </p>
            </div>
            <StatusBadge status="Em andamento" />
          </div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted-foreground">Progresso Geral</span>
            <span className="font-mono font-bold text-white">65%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-accent rounded-full" style={{ width: '65%' }} />
          </div>

          {/* Etapas */}
          <div className="flex flex-col gap-3">
            {[
              { name: 'Kickoff e Imersão', status: 'Concluído', date: '01 Jun' },
              { name: 'Documentação AS IS', status: 'Concluído', date: '10 Jun' },
              { name: 'Redesenho TO BE', status: 'Em andamento', date: '25 Jun' },
              { name: 'Relatório de Gargalos', status: 'Pendente aprovação', date: '30 Jun' },
              { name: 'Plano de Ação e Entrega', status: 'Pendente', date: '10 Jul' },
            ].map((e, i) => (
              <div key={i} className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${e.status === 'Concluído' ? 'bg-green-500/20 border-green-500/40' : e.status === 'Em andamento' ? 'bg-blue-500/20 border-blue-500/40' : e.status === 'Pendente aprovação' ? 'bg-amber-500/20 border-amber-500/40' : 'bg-white/5 border-white/10'}`}
                >
                  {e.status === 'Concluído' && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  )}
                  {e.status === 'Em andamento' && (
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  )}
                  {e.status === 'Pendente aprovação' && (
                    <Clock className="w-3 h-3 text-amber-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm ${e.status === 'Pendente' ? 'text-muted-foreground' : 'text-white'}`}
                  >
                    {e.name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {e.status === 'Pendente aprovação' && (
                    <button className="text-xs font-mono font-bold text-amber-400 hover:text-white transition-colors border border-amber-500/30 px-2 py-1 hover:bg-amber-500/10">
                      Revisar e Aprovar
                    </button>
                  )}
                  <span className="font-mono text-xs text-muted-foreground">{e.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 action cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors cursor-pointer group">
          <FileText className="w-6 h-6 text-accent mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-display font-bold mb-1">Central de Documentos</h3>
          <p className="text-xs text-muted-foreground mb-4">3 arquivos disponíveis para download</p>
          <button className="flex items-center gap-1.5 text-xs font-mono text-accent hover:text-white transition-colors">
            <Download className="w-3.5 h-3.5" /> Ver documentos
          </button>
        </div>
        <div className="p-5 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors cursor-pointer group">
          <MessageSquare className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-display font-bold mb-1">Chat do Projeto</h3>
          <p className="text-xs text-muted-foreground mb-4">1 nova mensagem do consultor</p>
          <button className="flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-white transition-colors">
            <ChevronRight className="w-3.5 h-3.5" /> Abrir chat
          </button>
        </div>
        <div className="p-5 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors cursor-pointer group">
          <Activity className="w-6 h-6 text-violet-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-display font-bold mb-1">Métricas do Projeto</h3>
          <p className="text-xs text-muted-foreground mb-4">KPIs e ROI em tempo real</p>
          <button className="flex items-center gap-1.5 text-xs font-mono text-violet-400 hover:text-white transition-colors">
            <ChevronRight className="w-3.5 h-3.5" /> Ver indicadores
          </button>
        </div>
      </div>

      {/* Recent docs */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Últimos Entregáveis
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              name: 'Fluxograma AS IS — Processo de Compras.pdf',
              date: '10 Jun',
              size: '2.4 MB',
              isNew: false,
            },
            {
              name: 'Relatório de Imersão — Semana 1.pdf',
              date: '05 Jun',
              size: '1.1 MB',
              isNew: false,
            },
            {
              name: 'Ata de Kickoff e Escopo do Projeto.pdf',
              date: '01 Jun',
              size: '380 KB',
              isNew: false,
            },
          ].map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 border border-white/10 hover:border-white/20 transition-colors"
            >
              <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{d.name}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {d.date} · {d.size}
                </p>
              </div>
              {d.isNew && (
                <span className="text-xs font-mono bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 shrink-0">
                  NOVO
                </span>
              )}
              <button className="text-muted-foreground hover:text-white transition-colors shrink-0">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const { session, loading, signOut, user } = useAuth()
  const [role, setRole] = useState<Role | null>(null)
  const [roleLoading, setRoleLoading] = useState(true)

  useEffect(() => {
    if (user?.email) {
      supabase
        .from('authorized_users')
        .select('role, is_admin')
        .eq('email', user.email)
        .single()
        .then(({ data }) => {
          if (data) {
            const r = (data as any).role || ((data as any).is_admin ? 'admin' : 'user')
            setRole(r as Role)
          } else {
            setRole('user')
          }
          setRoleLoading(false)
        })
    }
  }, [user])

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!session) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-background text-white px-6 md:px-12 py-12 pt-28">
      <div className="max-w-6xl mx-auto">
        {role === 'admin' && <AdminDashboard user={user} signOut={signOut} />}
        {role === 'consultor' && <ConsultorDashboard user={user} signOut={signOut} />}
        {role === 'user' && <ClienteDashboard user={user} signOut={signOut} />}
      </div>
    </div>
  )
}
