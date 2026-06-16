-- 1. Add role column
ALTER TABLE public.authorized_users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';

-- 2. Migrate existing data
UPDATE public.authorized_users SET role = 'admin' WHERE is_admin = true AND role != 'admin';

-- 3. Seed Users and Auth
DO $DO_BLOCK$
DECLARE
  v_admin1_id uuid;
  v_admin2_id uuid;
BEGIN
  -- Insert/Update public.authorized_users first to avoid trigger errors
  INSERT INTO public.authorized_users (email, is_admin, role)
  VALUES ('raphael_batista@outlook.com', true, 'admin')
  ON CONFLICT (email) DO UPDATE SET is_admin = true, role = 'admin';

  INSERT INTO public.authorized_users (email, is_admin, role)
  VALUES ('priscilla.vicent@outlook.com', true, 'admin')
  ON CONFLICT (email) DO UPDATE SET is_admin = true, role = 'admin';

  -- Seed Auth Admin 1
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
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Raphael Batista"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;

  -- Seed Auth Admin 2
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

-- 4. Role Functions
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS VARCHAR(20)
LANGUAGE plpgsql
SECURITY DEFINER
AS $FUNC$
DECLARE
  v_role VARCHAR(20);
BEGIN
  SELECT role INTO v_role
  FROM public.authorized_users
  WHERE email = (auth.jwt()->>'email')::text;
  
  RETURN COALESCE(v_role, 'user');
END;
$FUNC$;

-- Modify is_admin backward compatibility for existing features
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $FUNC$
BEGIN
  RETURN (public.get_user_role() = 'admin');
END;
$FUNC$;

-- 5. RLS Policies
DROP POLICY IF EXISTS "allow_admins_all" ON public.authorized_users;
DROP POLICY IF EXISTS "allow_consultant_select" ON public.authorized_users;
DROP POLICY IF EXISTS "allow_user_read_self" ON public.authorized_users;
DROP POLICY IF EXISTS "allow_select_own" ON public.authorized_users;
DROP POLICY IF EXISTS "allow_select" ON public.authorized_users;

-- Admin Policy: Can do everything
CREATE POLICY "allow_admins_all" ON public.authorized_users
FOR ALL TO authenticated
USING (public.get_user_role() = 'admin');

-- Consultant Policy: Read Only
CREATE POLICY "allow_consultant_select" ON public.authorized_users
FOR SELECT TO authenticated
USING (public.get_user_role() = 'consultor');

-- User Policy: Read Self
CREATE POLICY "allow_user_read_self" ON public.authorized_users
FOR SELECT TO authenticated
USING (email = (auth.jwt()->>'email')::text);
