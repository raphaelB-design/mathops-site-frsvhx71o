-- Add VoC diagnostic fields to leads table
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS maturity_level TEXT,
ADD COLUMN IF NOT EXISTS strategic_goals TEXT;

-- Ensure RLS is enabled
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Ensure idempotent INSERT policy for anon and authenticated
DROP POLICY IF EXISTS "allow_anon_insert_leads" ON public.leads;
CREATE POLICY "allow_anon_insert_leads" ON public.leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Ensure admin read policy remains
DROP POLICY IF EXISTS "allow_admins_read_leads" ON public.leads;
CREATE POLICY "allow_admins_read_leads" ON public.leads
  FOR SELECT TO authenticated USING (public.is_admin());
