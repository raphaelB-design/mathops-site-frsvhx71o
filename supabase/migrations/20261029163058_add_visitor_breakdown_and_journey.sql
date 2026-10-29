-- Migration: visitor analytics functions and indexes
-- Supports individual visitor breakdown, pagination and chronological journey

-- Ensure index on visitor_id and created_at for fast aggregation and sorting
CREATE INDEX IF NOT EXISTS idx_visit_events_visitor_created ON public.visit_events (visitor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visit_events_created_at_desc ON public.visit_events (created_at DESC);

-- Function: get_visitor_stats
-- Returns list of unique visitors within selected period with aggregated stats and pagination
CREATE OR REPLACE FUNCTION public.get_visitor_stats(
  p_days integer DEFAULT 30,
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_is_adm BOOLEAN;
  v_days INTEGER;
  v_limit INTEGER;
  v_offset INTEGER;
  v_now TIMESTAMPTZ := NOW();
  v_start TIMESTAMPTZ;
  v_total_visitors BIGINT;
  v_total_pageviews BIGINT;
  v_avg_pageviews NUMERIC;
  v_visitors JSONB;
BEGIN
  -- Security check: user must be an admin
  v_is_adm := public.is_admin();
  IF v_is_adm IS NOT TRUE THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores autorizados têm acesso às estatísticas.';
  END IF;

  v_days := CASE WHEN p_days = 7 THEN 7 ELSE 30 END;
  v_limit := GREATEST(1, LEAST(COALESCE(p_limit, 50), 200));
  v_offset := GREATEST(0, COALESCE(p_offset, 0));
  v_start := v_now - (v_days || ' days')::INTERVAL;

  -- Overall totals for the summary in the Visitors tab
  SELECT
    COUNT(DISTINCT visitor_id),
    COUNT(*)
  INTO v_total_visitors, v_total_pageviews
  FROM public.visit_events
  WHERE created_at >= v_start;

  v_avg_pageviews := CASE 
    WHEN v_total_visitors > 0 THEN ROUND((v_total_pageviews::numeric / v_total_visitors::numeric), 1)
    ELSE 0
  END;

  -- Visitor aggregation with window functions to find first and last event
  WITH filtered AS (
    SELECT
      id,
      visitor_id,
      path,
      referrer_host,
      device,
      created_at
    FROM public.visit_events
    WHERE created_at >= v_start
  ),
  aggregated AS (
    SELECT
      visitor_id,
      COUNT(*)::INTEGER AS pageviews_count,
      MIN(created_at) AS first_seen,
      MAX(created_at) AS last_seen,
      (ARRAY_AGG(device ORDER BY created_at DESC))[1] AS latest_device,
      (ARRAY_AGG(referrer_host ORDER BY created_at ASC) FILTER (WHERE referrer_host IS NOT NULL AND referrer_host <> ''))[1] AS first_referrer
    FROM filtered
    GROUP BY visitor_id
    ORDER BY last_seen DESC
    LIMIT v_limit OFFSET v_offset
  )
  SELECT COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'visitor_id', visitor_id,
        'pageviews_count', pageviews_count,
        'first_seen', first_seen,
        'last_seen', last_seen,
        'device', latest_device,
        'first_referrer', COALESCE(first_referrer, 'Direto / Desconhecido')
      )
      ORDER BY last_seen DESC
    ),
    '[]'::jsonb
  ) INTO v_visitors
  FROM aggregated;

  RETURN jsonb_build_object(
    'period_days', v_days,
    'total_visitors', COALESCE(v_total_visitors, 0),
    'total_pageviews', COALESCE(v_total_pageviews, 0),
    'avg_pageviews_per_visitor', COALESCE(v_avg_pageviews, 0),
    'limit', v_limit,
    'offset', v_offset,
    'has_more', (v_offset + v_limit) < COALESCE(v_total_visitors, 0),
    'visitors', v_visitors
  );
END;
$$;

-- Function: get_visitor_journey
-- Returns chronological journey of pages visited by a specific visitor_id within the period (or overall)
CREATE OR REPLACE FUNCTION public.get_visitor_journey(
  p_visitor_id text,
  p_days integer DEFAULT 30
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_is_adm BOOLEAN;
  v_days INTEGER;
  v_start TIMESTAMPTZ;
  v_events JSONB;
BEGIN
  -- Security check: user must be an admin
  v_is_adm := public.is_admin();
  IF v_is_adm IS NOT TRUE THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores autorizados têm acesso às estatísticas.';
  END IF;

  IF p_visitor_id IS NULL OR TRIM(p_visitor_id) = '' THEN
    RETURN '[]'::jsonb;
  END IF;

  v_days := CASE WHEN p_days = 7 THEN 7 ELSE 30 END;
  v_start := NOW() - (v_days || ' days')::INTERVAL;

  SELECT COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'id', id,
        'path', path,
        'referrer_host', COALESCE(referrer_host, 'Direto / Desconhecido'),
        'device', device,
        'created_at', created_at
      )
      ORDER BY created_at ASC
    ),
    '[]'::jsonb
  ) INTO v_events
  FROM public.visit_events
  WHERE visitor_id = p_visitor_id
    AND created_at >= v_start;

  RETURN v_events;
END;
$$;
