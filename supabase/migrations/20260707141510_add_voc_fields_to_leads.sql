ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS maturity_level TEXT,
ADD COLUMN IF NOT EXISTS strategic_goals TEXT;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_anon_insert_leads" ON public.leads;
CREATE POLICY "allow_anon_insert_leads" ON public.leads
    FOR INSERT TO anon, authenticated WITH CHECK (true);

INSERT INTO public.authorized_users (email, is_admin, role)
VALUES ('raphael_batista@outlook.com', true, 'admin')
ON CONFLICT (email) DO UPDATE SET is_admin = true, role = 'admin';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'raphael_batista@outlook.com') THEN
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'raphael_batista@outlook.com',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Raphael Batista"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL, '', '', ''
    );
  END IF;
END $$;
