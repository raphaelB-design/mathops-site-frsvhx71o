-- Política de senhas de administradores.
-- Senhas de admin devem ser definidas via Supabase Dashboard > Authentication > Users,
-- nunca em SQL. Nenhuma senha em texto claro deve ser versionada em migrações.
--
-- Esta migração não altera dados de autenticação. Ela é idempotente e pode ser
-- executada quantas vezes for necessário sem efeito colateral.
DO $$
BEGIN
  NULL;
END $$;
