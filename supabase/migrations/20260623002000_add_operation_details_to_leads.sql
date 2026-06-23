ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS operation_details TEXT;
