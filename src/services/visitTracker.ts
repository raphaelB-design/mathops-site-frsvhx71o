import { supabase } from '@/lib/supabase/client'

const VISITOR_STORAGE_KEY = 'mathops_vid'
const LAST_PAGE_KEY = 'mathops_last_pv'

// Generates an anonymous random visitor identifier (UUID-like or random string)
export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return ''

  try {
    let visitorId = localStorage.getItem(VISITOR_STORAGE_KEY)
    if (!visitorId || visitorId.length < 8) {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        visitorId = crypto.randomUUID()
      } else {
        visitorId = 'v_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
      }
      localStorage.setItem(VISITOR_STORAGE_KEY, visitorId)
    }
    return visitorId
  } catch {
    return 'anon_' + Math.random().toString(36).substring(2, 10)
  }
}

// Simple heuristic to avoid logging automated headless crawlers
function isObviousBot(): boolean {
  if (typeof navigator === 'undefined') return true
  const ua = (navigator.userAgent || '').toLowerCase()
  if (!ua) return false

  const botPatterns = [
    'bot',
    'crawler',
    'spider',
    'lighthouse',
    'headlesschrome',
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'sogou',
    'exabot',
    'facebot',
    'ia_archiver',
  ]
  return botPatterns.some((pattern) => ua.includes(pattern))
}

// Extracts clean hostname from document.referrer (excluding MathOps own domain)
function getReferrerHost(): string | null {
  if (typeof document === 'undefined' || !document.referrer) return null
  try {
    const url = new URL(document.referrer)
    const currentHost = window.location.hostname
    if (url.hostname === currentHost || url.hostname.endsWith(currentHost)) {
      return null
    }
    return url.hostname
  } catch {
    return null
  }
}

export interface VisitStatsData {
  summary: {
    today: { pageviews: number; visitors: number }
    last7Days: { pageviews: number; visitors: number }
    last30Days: { pageviews: number; visitors: number }
  }
  daily: Array<{
    date: string
    label: string
    pageviews: number
    visitors: number
  }>
  topPages: Array<{
    path: string
    pageviews: number
    visitors: number
  }>
  topReferrers: Array<{
    host: string
    count: number
  }>
  devices: {
    mobile: number
    desktop: number
    total: number
  }
  periodDays: number
}

/**
 * Fire-and-forget visit logger via Supabase RPC.
 * Never throws, never blocks UI or navigation.
 */
export function recordPageView(pathname: string) {
  if (typeof window === 'undefined') return

  // Ignore admin and internal pages
  if (
    pathname.startsWith('/estatisticas') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/dashboard')
  ) {
    return
  }

  // Ignore obvious web crawlers
  if (isObviousBot()) {
    return
  }

  // Client-side lightweight deduplication (~20s on same path)
  try {
    const now = Date.now()
    const rawLast = sessionStorage.getItem(LAST_PAGE_KEY)
    if (rawLast) {
      const parsed = JSON.parse(rawLast)
      if (parsed.path === pathname && now - parsed.time < 20000) {
        return
      }
    }
    sessionStorage.setItem(LAST_PAGE_KEY, JSON.stringify({ path: pathname, time: now }))
  } catch {
    // sessionStorage might be disabled or restricted; continue safely
  }

  const visitorId = getOrCreateVisitorId()
  const referrerHost = getReferrerHost()
  const viewportWidth = window.innerWidth || null
  const device = viewportWidth && viewportWidth < 768 ? 'mobile' : 'desktop'

  // Fire-and-forget RPC call
  Promise.resolve().then(async () => {
    try {
      await (supabase as any).rpc('log_visit', {
        p_path: pathname,
        p_referrer_host: referrerHost,
        p_device: device,
        p_viewport_width: viewportWidth,
        p_visitor_id: visitorId,
        p_country: null,
      })
    } catch {
      // Intentionally silent fail: visits tracking must never interfere with user experience
    }
  })
}

/**
 * Fetches aggregated statistics for authorized admin users only.
 */
export async function fetchVisitStats(days: 7 | 30 = 30): Promise<VisitStatsData> {
  const { data, error } = await (supabase as any).rpc('get_visit_stats', {
    p_days: days,
  })

  if (error) {
    throw error
  }

  return data as VisitStatsData
}
