-- 1. Add is_admin column
ALTER TABLE public.authorized_users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Seed Users
DO $DO_BLOCK$
DECLARE
  v_admin1_id uuid;
  v_admin2_id uuid;
BEGIN
  -- Insert/Update public.authorized_users first to avoid trigger errors
  INSERT INTO public.authorized_users (email, is_admin)
  VALUES ('raphael_batista@outlook.com', true)
  ON CONFLICT (email) DO UPDATE SET is_admin = true;

  INSERT INTO public.authorized_users (email, is_admin)
  VALUES ('priscilla.vicent@outlook.com', true)
  ON CONFLICT (email) DO UPDATE SET is_admin = true;

  -- Admin 1
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'raphael_batista@outlook.com') THEN
    v_admin1_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_admin1_id,
      '00000000-0000-0000-0000-000000000000',
      'raphael_batista@outlook.com',
      crypt('Skip@Pass123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Raphael Batista"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;

  -- Admin 2
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'priscilla.vicent@outlook.com') THEN
    v_admin2_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_admin2_id,
      '00000000-0000-0000-0000-000000000000',
      'priscilla.vicent@outlook.com',
      crypt('Skip@Pass123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Priscilla Vicent"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;
END $DO_BLOCK$;

-- 3. RLS Policies
ALTER TABLE public.authorized_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_select" ON public.authorized_users;
DROP POLICY IF EXISTS "allow_select_own" ON public.authorized_users;
DROP POLICY IF EXISTS "allow_admins_all" ON public.authorized_users;

-- Function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $FUNC$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.authorized_users 
    WHERE email = (auth.jwt()->>'email')::text
      AND is_admin = true
  );
END;
$FUNC$;

-- Allow users to select their own rows
CREATE POLICY "allow_select_own" ON public.authorized_users
FOR SELECT TO authenticated
USING (email = (auth.jwt()->>'email')::text);

-- Allow admins full access
CREATE POLICY "allow_admins_all" ON public.authorized_users
FOR ALL TO authenticated
USING (public.is_admin());
