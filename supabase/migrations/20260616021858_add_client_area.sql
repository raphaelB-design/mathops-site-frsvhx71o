CREATE TABLE IF NOT EXISTS public.authorized_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.authorized_users ENABLE ROW LEVEL SECURITY;

-- Allow select to everyone (needed for the frontend to check before attempting signup)
DROP POLICY IF EXISTS "allow_select" ON public.authorized_users;
CREATE POLICY "allow_select" ON public.authorized_users FOR SELECT USING (true);

-- Trigger to prevent any unauthorized email from being inserted into auth.users
CREATE OR REPLACE FUNCTION public.check_user_authorized()
RETURNS trigger AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.authorized_users WHERE email = NEW.email) THEN
    RAISE EXCEPTION 'Este e-mail não está pré-autorizado para acesso. Entre em contato com a equipe MathOps.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS "ensure_user_authorized" ON auth.users;
CREATE TRIGGER "ensure_user_authorized"
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.check_user_authorized();

-- Seed the authorized user and corresponding auth user
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Insert into authorized_users first so the trigger won't block the auth.users insert
  INSERT INTO public.authorized_users (email)
  VALUES ('raphael_batista@outlook.com')
  ON CONFLICT (email) DO NOTHING;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'raphael_batista@outlook.com') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'raphael_batista@outlook.com',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;
END $$;
