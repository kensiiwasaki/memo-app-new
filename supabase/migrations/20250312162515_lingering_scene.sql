/*
  # Update comments policies

  1. Security
    - Enable RLS on comments table if not already enabled
    - Add policies for CRUD operations if they don't exist
*/

-- Enable RLS (if not already enabled)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE schemaname = 'public' 
    AND tablename = 'comments' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies (if they don't exist)
DO $$ 
BEGIN
  -- Insert policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'comments' 
    AND policyname = 'Users can create comments'
  ) THEN
    CREATE POLICY "Users can create comments"
    ON comments FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Select policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'comments' 
    AND policyname = 'Users can read all comments'
  ) THEN
    CREATE POLICY "Users can read all comments"
    ON comments FOR SELECT
    TO authenticated
    USING (true);
  END IF;

  -- Delete policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'comments' 
    AND policyname = 'Users can delete their own comments'
  ) THEN
    CREATE POLICY "Users can delete their own comments"
    ON comments FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;
END $$;