-- Make budget_range nullable and add start_timeline column to leads table
DO $$
BEGIN
  -- Alter budget_range to allow nulls
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'leads' 
      AND column_name = 'budget_range'
  ) THEN
    ALTER TABLE public.leads ALTER COLUMN budget_range DROP NOT NULL;
  END IF;

  -- Add start_timeline column if it does not exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'leads' 
      AND column_name = 'start_timeline'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN start_timeline TEXT NULL;
  END IF;
END $$;
