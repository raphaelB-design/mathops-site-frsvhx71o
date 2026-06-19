CREATE TABLE IF NOT EXISTS public.site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  button_location TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_anon_authenticated_insert_analytics" ON public.site_analytics;
CREATE POLICY "allow_anon_authenticated_insert_analytics" ON public.site_analytics
  FOR INSERT TO anon, authenticated WITH CHECK (true);
