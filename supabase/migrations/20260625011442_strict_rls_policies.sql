-- 1. Ensure RLS is enabled on target tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_analytics ENABLE ROW LEVEL SECURITY;

-- 2. Clean up potentially existing permissive policies for these tables
-- Leads
DROP POLICY IF EXISTS "allow_anon_authenticated_insert" ON public.leads;
DROP POLICY IF EXISTS "allow_anon_insert_leads" ON public.leads;
DROP POLICY IF EXISTS "allow_anon_select_leads" ON public.leads;
DROP POLICY IF EXISTS "allow_anon_update_leads" ON public.leads;
DROP POLICY IF EXISTS "allow_anon_delete_leads" ON public.leads;

-- Candidates
DROP POLICY IF EXISTS "allow_anon_authenticated_insert_candidates" ON public.candidates;
DROP POLICY IF EXISTS "allow_anon_insert_candidates" ON public.candidates;
DROP POLICY IF EXISTS "allow_anon_select_candidates" ON public.candidates;
DROP POLICY IF EXISTS "allow_anon_update_candidates" ON public.candidates;
DROP POLICY IF EXISTS "allow_anon_delete_candidates" ON public.candidates;

-- Site Analytics
DROP POLICY IF EXISTS "allow_anon_authenticated_insert_analytics" ON public.site_analytics;
DROP POLICY IF EXISTS "allow_anon_insert_analytics" ON public.site_analytics;
DROP POLICY IF EXISTS "allow_anon_select_analytics" ON public.site_analytics;
DROP POLICY IF EXISTS "allow_anon_update_analytics" ON public.site_analytics;
DROP POLICY IF EXISTS "allow_anon_delete_analytics" ON public.site_analytics;

-- 3. Create strict policies for Leads
CREATE POLICY "allow_anon_insert_leads" ON public.leads
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (
        length(contact_name) >= 2 AND length(contact_name) <= 120 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
        length(challenge) >= 10
    );

-- 4. Create strict policies for Candidates
CREATE POLICY "allow_anon_insert_candidates" ON public.candidates
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (
        length(full_name) >= 2 AND length(full_name) <= 120 AND
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
        length(motivation) >= 20
    );

-- 5. Create strict policies for Site Analytics
CREATE POLICY "allow_anon_insert_analytics" ON public.site_analytics
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (true);
