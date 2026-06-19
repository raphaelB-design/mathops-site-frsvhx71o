CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company_name TEXT NOT NULL,
    challenge TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New',
    source TEXT NOT NULL DEFAULT 'site'
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_anon_authenticated_insert" ON public.leads;
CREATE POLICY "allow_anon_authenticated_insert" ON public.leads
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (true);
