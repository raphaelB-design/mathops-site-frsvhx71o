DELETE FROM public.site_config
WHERE key IN ('torre-de-controle', 'carreiras', 'inteligencia-artificial')
   OR value LIKE '%torre-de-controle%'
   OR value LIKE '%carreiras%'
   OR value LIKE '%inteligencia-artificial%';
