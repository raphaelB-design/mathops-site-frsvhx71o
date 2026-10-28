import { useState, useEffect } from 'react'
import { Helmet } from '@/components/Helmet'
import { useAuth } from '@/hooks/use-auth'
import { fetchVisitStats, VisitStatsData } from '@/services/visitTracker'
import {
  Users,
  Eye,
  Calendar,
  Smartphone,
  Monitor,
  ArrowUpRight,
  RefreshCw,
  LogOut,
  Lock,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

export default function Estatisticas() {
  const { user, loading: authLoading, signIn, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [period, setPeriod] = useState<7 | 30>(30)
  const [stats, setStats] = useState<VisitStatsData | null>(null)
  const [statsLoading, setStatsLoading] = useState(false)
  const [statsError, setStatsError] = useState<string | null>(null)

  const loadData = async (selectedPeriod: 7 | 30) => {
    try {
      setStatsLoading(true)
      setStatsError(null)
      const data = await fetchVisitStats(selectedPeriod)
      setStats(data)
    } catch (err: any) {
      console.error('Error fetching stats:', err)
      setStatsError(
        err?.message ||
          'Falha ao carregar métricas de acesso. Verifique suas permissões de administrador.',
      )
    } finally {
      setStatsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadData(period)
    }
  }, [user, period])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setIsSubmitting(true)
    const { error } = await signIn(email.trim(), password)
    setIsSubmitting(false)
    if (error) {
      setLoginError(error.message || 'Credenciais inválidas.')
    }
  }

  // Calculate percentages for devices
  const totalDevices = stats?.devices.total || 0
  const mobilePct =
    totalDevices > 0 ? Math.round(((stats?.devices.mobile || 0) / totalDevices) * 100) : 0
  const desktopPct =
    totalDevices > 0 ? Math.round(((stats?.devices.desktop || 0) / totalDevices) * 100) : 0

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-[#F5F4F0] antialiased selection:bg-blue-600/30 selection:text-white">
      <Helmet>
        <title>Painel de Estatísticas | MathOps</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Helmet>

      {/* Top Bar */}
      <header className="border-b border-white/10 bg-[#0A0F1C]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
                MathOps <span className="text-zinc-500 font-normal">/</span> Estatísticas
              </h1>
              <p className="text-[11px] text-zinc-400">Painel gerencial de tráfego próprio</p>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-400 hidden sm:inline-block">{user.email}</span>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
                title="Encerrar sessão"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {authLoading ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-1/3 rounded-full animate-pulse" />
            </div>
            <p className="mt-4 text-xs text-zinc-500">Validando credenciais...</p>
          </div>
        ) : !user ? (
          /* Login Card */
          <div className="min-h-[70vh] flex items-center justify-center py-12">
            <div className="w-full max-w-md p-8 rounded-xl bg-[#111827]/80 backdrop-blur-xl border border-white/10 shadow-2xl relative">
              <div className="text-center mb-8">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">Área Restrita</h2>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Acesso reservado ao administrador do MathOps Strategy.
                </p>
              </div>

              {loginError && (
                <div className="mb-6 p-3 rounded-md bg-red-950/60 border border-red-500/30 text-xs text-red-200">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider text-zinc-400 mb-1.5">
                    E-mail do Administrador
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@dominio.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider text-zinc-400 mb-1.5">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <span>Acessar Painel</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Dashboard Content */
          <div className="space-y-8">
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  Visão Geral de Acessos
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Métricas de tráfego coletadas em tempo real de forma 100% interna e anônima.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Period Selector */}
                <div className="flex items-center p-1 rounded-lg bg-[#111827] border border-white/10 text-xs">
                  <button
                    onClick={() => setPeriod(7)}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      period === 7
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Últimos 7 dias
                  </button>
                  <button
                    onClick={() => setPeriod(30)}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      period === 30
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Últimos 30 dias
                  </button>
                </div>

                <button
                  onClick={() => loadData(period)}
                  disabled={statsLoading}
                  className="p-2 rounded-lg bg-[#111827] border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                  title="Atualizar dados"
                >
                  <RefreshCw className={`w-4 h-4 ${statsLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {statsError && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-center justify-between">
                <span>{statsError}</span>
                <button
                  onClick={() => loadData(period)}
                  className="underline hover:text-white ml-4"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Hoje */}
              <div className="p-5 rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                <div className="flex items-center justify-between text-zinc-400 mb-3">
                  <span className="text-xs uppercase font-medium tracking-wider">Hoje</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight text-white">
                      {stats?.summary.today.pageviews.toLocaleString('pt-BR') ?? '—'}
                    </span>
                    <span className="text-xs text-zinc-400">visualizações</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                      {stats?.summary.today.visitors.toLocaleString('pt-BR') ?? '—'} visitantes
                      únicos
                    </span>
                  </div>
                </div>
              </div>

              {/* Últimos 7 dias */}
              <div className="p-5 rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                <div className="flex items-center justify-between text-zinc-400 mb-3">
                  <span className="text-xs uppercase font-medium tracking-wider">
                    Últimos 7 dias
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight text-white">
                      {stats?.summary.last7Days.pageviews.toLocaleString('pt-BR') ?? '—'}
                    </span>
                    <span className="text-xs text-zinc-400">visualizações</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                      {stats?.summary.last7Days.visitors.toLocaleString('pt-BR') ?? '—'} visitantes
                      únicos
                    </span>
                  </div>
                </div>
              </div>

              {/* Últimos 30 dias */}
              <div className="p-5 rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                <div className="flex items-center justify-between text-zinc-400 mb-3">
                  <span className="text-xs uppercase font-medium tracking-wider">
                    Últimos 30 dias
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight text-white">
                      {stats?.summary.last30Days.pageviews.toLocaleString('pt-BR') ?? '—'}
                    </span>
                    <span className="text-xs text-zinc-400">visualizações</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-cyan-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                      {stats?.summary.last30Days.visitors.toLocaleString('pt-BR') ?? '—'} visitantes
                      únicos
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Evolution Chart (30 Days) */}
            <div className="p-6 rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Evolução Diária (Últimos 30 dias)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Volume diário de visualizações de página vs visitantes únicos
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
                    <span className="text-zinc-300">Visualizações</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-cyan-400 inline-block" />
                    <span className="text-zinc-300">Visitantes Únicos</span>
                  </div>
                </div>
              </div>

              <div className="h-72 w-full">
                {stats?.daily && stats.daily.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={stats.daily}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis
                        dataKey="label"
                        stroke="#71717a"
                        fontSize={11}
                        tickLine={false}
                        axisLine={{ stroke: '#ffffff15' }}
                        interval={Math.ceil(stats.daily.length / 10)}
                      />
                      <YAxis
                        stroke="#71717a"
                        fontSize={11}
                        tickLine={false}
                        axisLine={{ stroke: '#ffffff15' }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0A0F1C',
                          borderColor: '#ffffff20',
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: '#F5F4F0',
                        }}
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="pageviews"
                        name="Visualizações"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPv)"
                      />
                      <Area
                        type="monotone"
                        dataKey="visitors"
                        name="Visitantes"
                        stroke="#22D3EE"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVis)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-zinc-500">
                    Ainda não há registros de acesso suficientes no período.
                  </div>
                )}
              </div>
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Páginas Mais Visitadas (Top 10) */}
              <div className="lg:col-span-2 p-6 rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Páginas mais visitadas</h3>
                    <p className="text-xs text-zinc-400">
                      Classificação por volume de visualizações ({period} dias)
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-3 font-medium">Página</th>
                        <th className="pb-3 font-medium text-right">Visualizações</th>
                        <th className="pb-3 font-medium text-right">Visitantes Únicos</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {stats?.topPages && stats.topPages.length > 0 ? (
                        stats.topPages.map((page, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 pr-4 font-mono text-zinc-200 truncate max-w-xs flex items-center gap-1.5">
                              <span className="text-[10px] text-zinc-500 w-4">#{idx + 1}</span>
                              <span className="truncate" title={page.path}>
                                {page.path}
                              </span>
                            </td>
                            <td className="py-3 text-right font-medium text-white">
                              {page.pageviews.toLocaleString('pt-BR')}
                            </td>
                            <td className="py-3 text-right text-cyan-400">
                              {page.visitors.toLocaleString('pt-BR')}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="py-8 text-center text-zinc-500">
                            Nenhum acesso computado para o período selecionado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Origens & Dispositivos */}
              <div className="space-y-6">
                {/* Dispositivos */}
                <div className="p-6 rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-1">Dispositivos</h3>
                  <p className="text-xs text-zinc-400 mb-4">
                    Distribuição de navegadores ({period} dias)
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="flex items-center gap-1.5 text-zinc-300">
                          <Monitor className="w-3.5 h-3.5 text-blue-400" /> Desktop
                        </span>
                        <span className="font-medium text-white">
                          {desktopPct}% ({stats?.devices.desktop ?? 0})
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${desktopPct}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="flex items-center gap-1.5 text-zinc-300">
                          <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Mobile
                        </span>
                        <span className="font-medium text-white">
                          {mobilePct}% ({stats?.devices.mobile ?? 0})
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                          style={{ width: `${mobilePct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Origens (Referrers) */}
                <div className="p-6 rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-1">Origens de Tráfego</h3>
                  <p className="text-xs text-zinc-400 mb-4">
                    Top canais de entrada ({period} dias)
                  </p>

                  <div className="space-y-2.5">
                    {stats?.topReferrers && stats.topReferrers.length > 0 ? (
                      stats.topReferrers.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0"
                        >
                          <span className="text-zinc-300 truncate max-w-[170px]" title={item.host}>
                            {item.host}
                          </span>
                          <span className="font-medium text-white font-mono flex items-center gap-1">
                            {item.count}
                            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-zinc-500 py-4 text-center">
                        Nenhum referenciador registrado ainda.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
