-- Update password for raphael_batista@outlook.com to Mathops0408@
-- Ensures old temporary password Skip@Pass is revoked and new one is applied
DO $$
BEGIN
  -- Update auth.users if user exists
  UPDATE auth.users
  SET
    encrypted_password = crypt('Mathops0408@', gen_salt('bf')),
    updated_at = NOW(),
    confirmation_token = COALESCE(confirmation_token, ''),
    recovery_token = COALESCE(recovery_token, ''),
    email_change_token_new = COALESCE(email_change_token_new, ''),
    email_change = COALESCE(email_change, ''),
    email_change_token_current = COALESCE(email_change_token_current, ''),
    phone_change = COALESCE(phone_change, ''),
    phone_change_token = COALESCE(phone_change_token, ''),
    reauthentication_token = COALESCE(reauthentication_token, '')
  WHERE email = 'raphael_batista@outlook.com';

  -- If for any reason the user didn't exist, create it idempotently
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
      crypt('Mathops0408@', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Raphael Batista"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL, '', '', ''
    );
  END IF;

  -- Ensure authorized_users entry exists with admin role
  INSERT INTO public.authorized_users (email, is_admin, role)
  VALUES ('raphael_batista@outlook.com', true, 'admin')
  ON CONFLICT (email) DO UPDATE SET is_admin = true, role = 'admin';
END $$;
