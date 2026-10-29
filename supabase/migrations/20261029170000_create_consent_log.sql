-- Migration: create consent_log table for LGPD compliance records
-- Records anonymous visitor choices (anonymous visitor_id, categories selected, timestamp)
-- Without any personally identifiable information (no names, no emails, no IPs).

CREATE TABLE IF NOT EXISTS public.consent_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  visitor_id TEXT NOT NULL,
  necessary BOOLEAN NOT NULL DEFAULT true,
  analytics BOOLEAN NOT NULL DEFAULT false,
  marketing BOOLEAN NOT NULL DEFAULT false,
  action TEXT NOT NULL DEFAULT 'custom', -- 'accept_all', 'reject_all', 'custom'
  policy_version TEXT NOT NULL DEFAULT '1.0',
  user_agent_category TEXT -- e.g. 'desktop' or 'mobile'
);

-- Index for chronological auditing and lookup by visitor
CREATE INDEX IF NOT EXISTS idx_consent_log_created_at_desc ON public.consent_log (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consent_log_visitor_id ON public.consent_log (visitor_id);

-- Enable RLS
ALTER TABLE public.consent_log ENABLE ROW LEVEL SECURITY;

-- Policies:
-- 1. Allow public (anon & authenticated) to insert their anonymous consent decision
DROP POLICY IF EXISTS "allow_anon_insert_consent_log" ON public.consent_log;
CREATE POLICY "allow_anon_insert_consent_log" ON public.consent_log
  FOR INSERT TO public
  WITH CHECK (true);

-- 2. Allow admins only to read consent logs (for auditing compliance)
DROP POLICY IF EXISTS "allow_admins_read_consent_log" ON public.consent_log;
CREATE POLICY "allow_admins_read_consent_log" ON public.consent_log
  FOR SELECT TO authenticated
  USING (public.is_admin());
