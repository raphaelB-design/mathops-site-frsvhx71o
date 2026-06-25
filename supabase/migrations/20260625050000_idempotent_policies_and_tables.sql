DO $$
BEGIN
  -- Ensure RLS is enabled for tables receiving the data
  ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
END $$;

-- Ensure idempotent insert policies for anon and authenticated
DROP POLICY IF EXISTS "allow_anon_insert_leads" ON public.leads;
CREATE POLICY "allow_anon_insert_leads" ON public.leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "allow_anon_insert_candidates" ON public.candidates;
CREATE POLICY "allow_anon_insert_candidates" ON public.candidates
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Ensure admin read policies
DROP POLICY IF EXISTS "allow_admins_read_leads" ON public.leads;
CREATE POLICY "allow_admins_read_leads" ON public.leads
  FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "allow_admins_read_candidates" ON public.candidates;
CREATE POLICY "allow_admins_read_candidates" ON public.candidates
  FOR SELECT TO authenticated USING (public.is_admin());
