-- Migration: create visit_events table, RLS, and secure RPC functions
-- 20261028120000_create_visit_events.sql

CREATE TABLE IF NOT EXISTS public.visit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  path TEXT NOT NULL,
  referrer_host TEXT,
  device VARCHAR(10) NOT NULL CHECK (device IN ('mobile', 'desktop')),
  viewport_width INTEGER,
  visitor_id TEXT NOT NULL,
  country TEXT
);

-- Enable RLS
ALTER TABLE public.visit_events ENABLE ROW LEVEL SECURITY;

-- No direct SELECT/INSERT/UPDATE/DELETE for anon or authenticated directly through standard PostgREST table endpoints
-- We drop existing policies if any
DROP POLICY IF EXISTS "deny_anon_select" ON public.visit_events;
DROP POLICY IF EXISTS "deny_authenticated_select" ON public.visit_events;
DROP POLICY IF EXISTS "service_role_all" ON public.visit_events;

-- Service role has full access
CREATE POLICY "service_role_all" ON public.visit_events
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Helpful indexes for analytics aggregation
CREATE INDEX IF NOT EXISTS idx_visit_events_created_at ON public.visit_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visit_events_visitor_id ON public.visit_events (visitor_id);
CREATE INDEX IF NOT EXISTS idx_visit_events_path ON public.visit_events (path);

-- RPC for logging visits: Callable by anon/authenticated, validates input, runs as SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.log_visit(
  p_path TEXT,
  p_referrer_host TEXT DEFAULT NULL,
  p_device VARCHAR(10) DEFAULT 'desktop',
  p_viewport_width INTEGER DEFAULT NULL,
  p_visitor_id TEXT DEFAULT '',
  p_country TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
  v_clean_path TEXT;
  v_clean_device VARCHAR(10);
  v_clean_visitor TEXT;
BEGIN
  -- Basic sanitation
  v_clean_path := SUBSTRING(TRIM(COALESCE(p_path, '/')), 1, 255);
  v_clean_visitor := SUBSTRING(TRIM(COALESCE(p_visitor_id, '')), 1, 100);

  -- Ignore admin/internal routes
  IF v_clean_path LIKE '/estatisticas%' OR v_clean_path LIKE '/login%' OR v_clean_path LIKE '/dashboard%' THEN
    RETURN NULL;
  END IF;

  -- Require a visitor id
  IF LENGTH(v_clean_visitor) < 5 THEN
    RETURN NULL;
  END IF;

  IF p_device = 'mobile' THEN
    v_clean_device := 'mobile';
  ELSE
    v_clean_device := 'desktop';
  END IF;

  -- Lightweight deduplication: if the exact same visitor hit the exact same path in the last 20 seconds, ignore
  IF EXISTS (
    SELECT 1 FROM public.visit_events
    WHERE visitor_id = v_clean_visitor
      AND path = v_clean_path
      AND created_at > (NOW() - INTERVAL '20 seconds')
  ) THEN
    RETURN NULL;
  END IF;

  INSERT INTO public.visit_events (
    path,
    referrer_host,
    device,
    viewport_width,
    visitor_id,
    country
  ) VALUES (
    v_clean_path,
    NULLIF(SUBSTRING(TRIM(COALESCE(p_referrer_host, '')), 1, 255), ''),
    v_clean_device,
    p_viewport_width,
    v_clean_visitor,
    NULLIF(SUBSTRING(TRIM(COALESCE(p_country, '')), 1, 10), '')
  ) RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- Grant execution of log_visit to public/anon/authenticated
GRANT EXECUTE ON FUNCTION public.log_visit(TEXT, TEXT, VARCHAR, INTEGER, TEXT, TEXT) TO anon, authenticated, service_role;

-- RPC for admin statistics: Only authenticated users with admin role can execute
CREATE OR REPLACE FUNCTION public.get_visit_stats(p_days INTEGER DEFAULT 30)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_adm BOOLEAN;
  v_result JSONB;
  v_days INTEGER;
  v_now TIMESTAMPTZ := NOW();
  v_today_start TIMESTAMPTZ;
  v_7d_start TIMESTAMPTZ;
  v_30d_start TIMESTAMPTZ;
  v_selected_start TIMESTAMPTZ;

  v_views_today BIGINT;
  v_uniques_today BIGINT;
  v_views_7d BIGINT;
  v_uniques_7d BIGINT;
  v_views_30d BIGINT;
  v_uniques_30d BIGINT;

  v_top_pages JSONB;
  v_top_referrers JSONB;
  v_devices JSONB;
  v_daily JSONB;
BEGIN
  -- Security check: user must be an admin
  v_is_adm := public.is_admin();
  IF v_is_adm IS NOT TRUE THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores autorizados têm acesso às estatísticas.';
  END IF;

  v_days := CASE WHEN p_days = 7 THEN 7 ELSE 30 END;
  v_today_start := DATE_TRUNC('day', v_now);
  v_7d_start := v_now - INTERVAL '7 days';
  v_30d_start := v_now - INTERVAL '30 days';
  v_selected_start := v_now - (v_days || ' days')::INTERVAL;

  -- KPI Summary
  SELECT
    COUNT(*),
    COUNT(DISTINCT visitor_id)
  INTO v_views_today, v_uniques_today
  FROM public.visit_events
  WHERE created_at >= v_today_start;

  SELECT
    COUNT(*),
    COUNT(DISTINCT visitor_id)
  INTO v_views_7d, v_uniques_7d
  FROM public.visit_events
  WHERE created_at >= v_7d_start;

  SELECT
    COUNT(*),
    COUNT(DISTINCT visitor_id)
  INTO v_views_30d, v_uniques_30d
  FROM public.visit_events
  WHERE created_at >= v_30d_start;

  -- Daily timeline for last 30 days
  WITH dates AS (
    SELECT generate_series(
      DATE_TRUNC('day', v_now - INTERVAL '29 days'),
      DATE_TRUNC('day', v_now),
      INTERVAL '1 day'
    )::date AS day_date
  ),
  counts AS (
    SELECT
      DATE_TRUNC('day', created_at)::date AS day_date,
      COUNT(*) AS pageviews,
      COUNT(DISTINCT visitor_id) AS visitors
    FROM public.visit_events
    WHERE created_at >= (DATE_TRUNC('day', v_now - INTERVAL '29 days'))
    GROUP BY 1
  )
  SELECT COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'date', TO_CHAR(d.day_date, 'YYYY-MM-DD'),
        'label', TO_CHAR(d.day_date, 'DD/MM'),
        'pageviews', COALESCE(c.pageviews, 0),
        'visitors', COALESCE(c.visitors, 0)
      ) ORDER BY d.day_date ASC
    ),
    '[]'::jsonb
  ) INTO v_daily
  FROM dates d
  LEFT JOIN counts c ON c.day_date = d.day_date;

  -- Top pages in selected period
  SELECT COALESCE(
    jsonb_agg(row_to_json(p)),
    '[]'::jsonb
  ) INTO v_top_pages
  FROM (
    SELECT
      path,
      COUNT(*) AS pageviews,
      COUNT(DISTINCT visitor_id) AS visitors
    FROM public.visit_events
    WHERE created_at >= v_selected_start
    GROUP BY path
    ORDER BY pageviews DESC
    LIMIT 10
  ) p;

  -- Top referrers in selected period
  SELECT COALESCE(
    jsonb_agg(row_to_json(r)),
    '[]'::jsonb
  ) INTO v_top_referrers
  FROM (
    SELECT
      COALESCE(referrer_host, 'Direto / Desconhecido') AS host,
      COUNT(*) AS count
    FROM public.visit_events
    WHERE created_at >= v_selected_start
    GROUP BY host
    ORDER BY count DESC
    LIMIT 10
  ) r;

  -- Devices breakdown in selected period
  SELECT COALESCE(
    jsonb_build_object(
      'mobile', COUNT(*) FILTER (WHERE device = 'mobile'),
      'desktop', COUNT(*) FILTER (WHERE device = 'desktop'),
      'total', COUNT(*)
    ),
    '{"mobile": 0, "desktop": 0, "total": 0}'::jsonb
  ) INTO v_devices
  FROM public.visit_events
  WHERE created_at >= v_selected_start;

  -- Assemble final JSON
  v_result := jsonb_build_object(
    'summary', jsonb_build_object(
      'today', jsonb_build_object('pageviews', v_views_today, 'visitors', v_uniques_today),
      'last7Days', jsonb_build_object('pageviews', v_views_7d, 'visitors', v_uniques_7d),
      'last30Days', jsonb_build_object('pageviews', v_views_30d, 'visitors', v_uniques_30d)
    ),
    'daily', v_daily,
    'topPages', v_top_pages,
    'topReferrers', v_top_referrers,
    'devices', v_devices,
    'periodDays', v_days
  );

  RETURN v_result;
END;
$$;

-- Grant execution to authenticated users (internal is_admin check enforces authorization)
GRANT EXECUTE ON FUNCTION public.get_visit_stats(INTEGER) TO authenticated, service_role;
