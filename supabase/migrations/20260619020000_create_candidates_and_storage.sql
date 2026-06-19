-- 1. Create candidates table
CREATE TABLE IF NOT EXISTS public.candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    area_interest TEXT NOT NULL,
    motivation TEXT NOT NULL,
    cv_url TEXT
);

-- 2. Enable RLS on candidates
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for candidates
DROP POLICY IF EXISTS "allow_anon_authenticated_insert_candidates" ON public.candidates;
CREATE POLICY "allow_anon_authenticated_insert_candidates" ON public.candidates
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "allow_admins_read_candidates" ON public.candidates;
CREATE POLICY "allow_admins_read_candidates" ON public.candidates
    FOR SELECT TO authenticated USING (public.is_admin());

-- 4. Create curriculos storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('curriculos', 'curriculos', false)
ON CONFLICT (id) DO NOTHING;

-- 5. RLS Policies for storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_public_upload_curriculos" ON storage.objects;
CREATE POLICY "allow_public_upload_curriculos"
ON storage.objects FOR INSERT TO public
WITH CHECK (bucket_id = 'curriculos');

DROP POLICY IF EXISTS "allow_admin_read_curriculos" ON storage.objects;
CREATE POLICY "allow_admin_read_curriculos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'curriculos' AND public.is_admin());
