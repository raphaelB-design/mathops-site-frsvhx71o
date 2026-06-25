DO $DO_BLOCK$
BEGIN
    UPDATE storage.buckets
    SET 
        public = false,
        file_size_limit = 5242880,
        allowed_mime_types = ARRAY[
            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
    WHERE id = 'curriculos';

    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    SELECT 
        'curriculos', 
        'curriculos', 
        false, 
        5242880, 
        ARRAY[
            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
    WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'curriculos');
END $DO_BLOCK$;

DROP POLICY IF EXISTS "allow_public_upload_curriculos" ON storage.objects;
DROP POLICY IF EXISTS "allow_anon_insert_curriculos" ON storage.objects;

CREATE POLICY "allow_anon_insert_curriculos"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'curriculos');

DROP POLICY IF EXISTS "allow_admin_read_curriculos" ON storage.objects;
DROP POLICY IF EXISTS "allow_admin_select_curriculos" ON storage.objects;

CREATE POLICY "allow_admin_select_curriculos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'curriculos' AND public.is_admin());
