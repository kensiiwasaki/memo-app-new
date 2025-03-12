/*
  # Add delete policy for memos table

  1. Security
    - Add policy for deleting memos
    - Only authenticated users can delete their own memos
*/

-- Create delete policy for memos if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'memos' 
    AND policyname = 'Users can delete their own memos'
  ) THEN
    CREATE POLICY "Users can delete their own memos"
    ON memos FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;
END $$;