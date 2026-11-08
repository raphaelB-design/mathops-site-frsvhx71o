-- Restaura as validações estritas das políticas de INSERT de leads e candidates.
-- A migração 20260625050000_idempotent_policies_and_tables.sql as havia recriado com WITH CHECK (true).
-- Idempotente: DROP POLICY IF EXISTS antes de cada CREATE POLICY.

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- Leads
DROP POLICY IF EXISTS "allow_anon_insert_leads" ON public.leads;
CREATE POLICY "allow_anon_insert_leads" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(contact_name) >= 2 AND length(contact_name) <= 200 AND
    email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$' AND
    length(challenge) >= 10
  );

-- Candidates
DROP POLICY IF EXISTS "allow_anon_insert_candidates" ON public.candidates;
CREATE POLICY "allow_anon_insert_candidates" ON public.candidates
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(full_name) >= 2 AND length(full_name) <= 200 AND
    email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$' AND
    length(motivation) >= 20
  );
