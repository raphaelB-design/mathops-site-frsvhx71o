import { useState, useEffect } from 'react'
import {
  fetchVisitorsList,
  fetchVisitorJourney,
  VisitorSummaryItem,
  VisitorJourneyStep,
} from '@/services/visitTracker'
import {
  Users,
  Smartphone,
  Monitor,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Globe,
  RefreshCw,
  ExternalLink,
  Clock,
  ArrowRight,
  Shield,
  Search,
} from 'lucide-react'

interface VisitorsTabProps {
  period: 7 | 30
}

const PAGE_SIZE = 15

export function VisitorsTab({ period }: VisitorsTabProps) {
  const [visitors, setVisitors] = useState<VisitorSummaryItem[]>([])
  const [totalVisitors, setTotalVisitors] = useState<number>(0)
  const [totalPageviews, setTotalPageviews] = useState<number>(0)
  const [avgPageviews, setAvgPageviews] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [offset, setOffset] = useState(0)

  // Expanded journeys cache: visitor_id -> { loading, steps, error }
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [journeys, setJourneys] = useState<
    Record<string, { loading: boolean; steps: VisitorJourneyStep[]; error?: string }>
  >({})

  // Search filter by visitor ID or referrer
  const [searchFilter, setSearchFilter] = useState('')

  const loadInitial = async (selectedPeriod: 7 | 30) => {
    try {
      setLoading(true)
      setError(null)
      setOffset(0)
      const res = await fetchVisitorsList(selectedPeriod, PAGE_SIZE, 0)
      setVisitors(res.visitors || [])
      setTotalVisitors(res.total_visitors || 0)
      setTotalPageviews(res.total_pageviews || 0)
      setAvgPageviews(res.avg_pageviews_per_visitor || 0)
      setHasMore(res.has_more)
    } catch (err: any) {
      console.error('Error fetching visitors:', err)
      setError(
        err?.message ||
          'Falha ao carregar a lista de visitantes individuais. Verifique suas permissões.',
      )
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    if (loadingMore || !hasMore) return
    const nextOffset = offset + PAGE_SIZE
    try {
      setLoadingMore(true)
      const res = await fetchVisitorsList(period, PAGE_SIZE, nextOffset)
      setVisitors((prev) => [...prev, ...(res.visitors || [])])
      setOffset(nextOffset)
      setHasMore(res.has_more)
    } catch (err: any) {
      console.error('Error loading more visitors:', err)
    } finally {
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    loadInitial(period)
    // Clear expanded states when period changes
    setExpandedId(null)
    setJourneys({})
  }, [period])

  const toggleJourney = async (visitorId: string) => {
    if (expandedId === visitorId) {
      setExpandedId(null)
      return
    }

    setExpandedId(visitorId)

    // Check if already fetched
    if (journeys[visitorId]?.steps) {
      return
    }

    setJourneys((prev) => ({
      ...prev,
      [visitorId]: { loading: true, steps: [] },
    }))

    try {
      const steps = await fetchVisitorJourney(visitorId, period)
      setJourneys((prev) => ({
        ...prev,
        [visitorId]: { loading: false, steps },
      }))
    } catch (err: any) {
      console.error(`Error loading journey for ${visitorId}:`, err)
      setJourneys((prev) => ({
        ...prev,
        [visitorId]: {
          loading: false,
          steps: [],
          error: err?.message || 'Falha ao carregar a jornada.',
        },
      }))
    }
  }

  // Format timestamp helper
  const formatDateTime = (iso: string) => {
    try {
      const date = new Date(iso)
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    } catch {
      return iso
    }
  }

  // Short clean representation of visitor id
  const getShortId = (id: string) => {
    if (!id) return 'anônimo'
    // UUID format: first 8 chars uppercase
    if (id.includes('-')) {
      return `VIS-${id.substring(0, 8).toUpperCase()}`
    }
    return `VIS-${id.substring(0, 8).toUpperCase()}`
  }

  const filteredVisitors = visitors.filter((v) => {
    if (!searchFilter.trim()) return true
    const q = searchFilter.toLowerCase()
    return (
      v.visitor_id.toLowerCase().includes(q) ||
      (v.first_referrer && v.first_referrer.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-6">
      {/* Tab Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Unique Visitors */}
        <div className="p-5 rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs uppercase font-medium tracking-wider">Visitantes Únicos</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">
                {totalVisitors.toLocaleString('pt-BR')}
              </span>
              <span className="text-xs text-zinc-400">no período ({period} dias)</span>
            </div>
            <p className="text-[11px] text-zinc-500">
              Identificadores anônimos distintos com sessão registrada
            </p>
          </div>
        </div>

        {/* Total Pageviews in period */}
        <div className="p-5 rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs uppercase font-medium tracking-wider">
              Total de Visualizações
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">
                {totalPageviews.toLocaleString('pt-BR')}
              </span>
              <span className="text-xs text-zinc-400">páginas abertas</span>
            </div>
            <p className="text-[11px] text-zinc-500">
              Soma total de navegações geradas por estes visitantes
            </p>
          </div>
        </div>

        {/* Avg Pages per Visitor */}
        <div className="p-5 rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs uppercase font-medium tracking-wider">
              Média de Páginas / Visitante
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">
                {avgPageviews.toLocaleString('pt-BR', {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
              </span>
              <span className="text-xs text-zinc-400">págs / visitante</span>
            </div>
            <p className="text-[11px] text-zinc-500">Profundidade média de navegação no site</p>
          </div>
        </div>
      </div>

      {/* Privacy note banner */}
      <div className="p-3.5 rounded-lg bg-blue-950/20 border border-blue-500/20 flex items-center gap-3 text-xs text-zinc-300">
        <Shield className="w-4 h-4 text-blue-400 shrink-0" />
        <p className="text-xs">
          <span className="font-semibold text-white">100% Anônimo:</span> os identificadores abaixo
          são hashes anônimos armazenados localmente no navegador do visitante, sem IPs nem dados
          pessoais. Cada linha representa uma pessoa diferente que acessou o site no período.
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => loadInitial(period)}
            className="underline hover:text-white ml-4 font-medium"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Main List Card */}
      <div className="rounded-xl bg-[#111827]/70 backdrop-blur-sm border border-white/10 overflow-hidden">
        {/* Header & Filter */}
        <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Visitantes Únicos do Período ({period} dias)
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Ordenados da visita mais recente para a mais antiga. Clique num visitante para ver sua
              jornada detalhada.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Filtrar por id ou origem..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-56 pl-8 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <button
              onClick={() => loadInitial(period)}
              disabled={loading}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
              title="Atualizar lista"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-12 text-center text-xs text-zinc-400 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
            <span>Carregando visitantes...</span>
          </div>
        ) : filteredVisitors.length === 0 ? (
          <div className="p-12 text-center text-xs text-zinc-500">
            {searchFilter
              ? 'Nenhum visitante encontrado para o filtro digitado.'
              : 'Nenhum visitante registrado no período selecionado.'}
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredVisitors.map((vis) => {
              const isExpanded = expandedId === vis.visitor_id
              const journeyState = journeys[vis.visitor_id]
              const isMobile = vis.device === 'mobile'

              return (
                <div
                  key={vis.visitor_id}
                  className={`transition-colors ${
                    isExpanded ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'
                  }`}
                >
                  {/* Visitor Row / Card */}
                  <div
                    onClick={() => toggleJourney(vis.visitor_id)}
                    className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleJourney(vis.visitor_id)
                      }
                    }}
                  >
                    {/* Left: Identifier & Device */}
                    <div className="flex items-center gap-3 min-w-[240px]">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-colors ${
                          isMobile
                            ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                            : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        }`}
                        title={
                          isMobile
                            ? 'Dispositivo: Celular (Mobile)'
                            : 'Dispositivo: Computador (Desktop)'
                        }
                      >
                        {isMobile ? (
                          <Smartphone className="w-4 h-4" />
                        ) : (
                          <Monitor className="w-4 h-4" />
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-xs text-white">
                            {getShortId(vis.visitor_id)}
                          </span>
                          <span
                            className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-medium ${
                              isMobile
                                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                                : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {isMobile ? 'Celular' : 'Computador'}
                          </span>
                        </div>
                        <p
                          className="text-[11px] font-mono text-zinc-500 truncate max-w-[220px]"
                          title={vis.visitor_id}
                        >
                          id: {vis.visitor_id}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Metrics (Origin, Pages, First/Last Seen) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 flex-1 text-xs">
                      {/* Origin */}
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-medium tracking-wider text-zinc-500 block">
                          Origem da 1ª visita
                        </span>
                        <div className="flex items-center gap-1.5 text-zinc-200">
                          <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <span className="truncate max-w-[140px]" title={vis.first_referrer}>
                            {vis.first_referrer}
                          </span>
                        </div>
                      </div>

                      {/* Pages Count */}
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-medium tracking-wider text-zinc-500 block">
                          Páginas vistas
                        </span>
                        <div className="flex items-center gap-1.5 font-medium text-white">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs">
                            {vis.pageviews_count} {vis.pageviews_count === 1 ? 'página' : 'páginas'}
                          </span>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="col-span-2 sm:col-span-1 space-y-0.5">
                        <span className="text-[10px] uppercase font-medium tracking-wider text-zinc-500 block">
                          Primeira / Última visita
                        </span>
                        <div className="text-[11px] text-zinc-300 font-mono space-y-0.5">
                          <div className="flex items-center gap-1 text-zinc-400">
                            <span className="text-[9px] uppercase text-zinc-500 w-9">Início:</span>
                            <span>{formatDateTime(vis.first_seen)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-white">
                            <span className="text-[9px] uppercase text-zinc-500 w-9">Último:</span>
                            <span className="text-blue-300 font-medium">
                              {formatDateTime(vis.last_seen)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Expand Trigger */}
                    <div className="flex items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                      <span className="text-xs text-blue-400 font-medium hidden sm:inline-block">
                        {isExpanded ? 'Ocultar jornada' : 'Ver jornada'}
                      </span>
                      <div className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-white" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Journey Details */}
                  {isExpanded && (
                    <div className="px-4 sm:px-6 pb-6 pt-2 bg-black/40 border-t border-white/5">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white tracking-wide uppercase">
                            Jornada Cronológica de Navegação
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            (sequência exata de páginas que este visitante abriu)
                          </span>
                        </div>
                      </div>

                      {journeyState?.loading ? (
                        <div className="py-6 flex items-center justify-center gap-2 text-xs text-zinc-400">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                          <span>Carregando histórico do visitante...</span>
                        </div>
                      ) : journeyState?.error ? (
                        <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-200">
                          {journeyState.error}
                        </div>
                      ) : !journeyState?.steps || journeyState.steps.length === 0 ? (
                        <div className="py-4 text-xs text-zinc-500">
                          Nenhum evento cronológico encontrado no período.
                        </div>
                      ) : (
                        <div className="relative pl-4 sm:pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-blue-500/20">
                          {journeyState.steps.map((step, idx) => {
                            const isFirst = idx === 0
                            const isLast = idx === journeyState.steps.length - 1

                            return (
                              <div
                                key={step.id || idx}
                                className="relative flex items-start gap-3 group"
                              >
                                {/* Timeline Dot */}
                                <div
                                  className={`absolute -left-4 sm:-left-6 top-1.5 w-2.5 h-2.5 rounded-full border-2 transition-colors ${
                                    isFirst
                                      ? 'bg-blue-500 border-blue-300'
                                      : isLast
                                        ? 'bg-cyan-400 border-cyan-200'
                                        : 'bg-[#111827] border-blue-500/40'
                                  }`}
                                />

                                <div className="flex-1 p-3 rounded-lg bg-[#111827]/80 border border-white/5 group-hover:border-white/10 transition-colors">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-mono text-zinc-500 w-5">
                                        #{idx + 1}
                                      </span>
                                      <span className="font-mono text-xs font-semibold text-white">
                                        {step.path}
                                      </span>
                                      {step.path === '/' && (
                                        <span className="text-[10px] text-zinc-400 font-sans">
                                          (Página Inicial)
                                        </span>
                                      )}
                                    </div>

                                    <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-zinc-500" />
                                        {formatDateTime(step.created_at)}
                                      </span>
                                      {step.referrer_host &&
                                        step.referrer_host !== 'Direto / Desconhecido' && (
                                          <span className="text-cyan-400 flex items-center gap-1">
                                            <ArrowRight className="w-3 h-3" />
                                            via {step.referrer_host}
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="p-4 border-t border-white/10 text-center bg-black/20">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-xs font-medium text-blue-300 hover:text-white transition-colors disabled:opacity-50"
            >
              {loadingMore ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Carregando mais visitantes...</span>
                </>
              ) : (
                <>
                  <span>Carregar mais visitantes</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
