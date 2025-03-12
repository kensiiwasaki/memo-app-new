/*
  # Fix RLS policies for memos table

  1. Changes
    - Drop existing RLS policies
    - Create new RLS policies with correct auth checks
    - Ensure proper access control for CRUD operations

  2. Security
    - Enable RLS on memos table
    - Add policies for:
      - Insert: Users can create their own memos
      - Select: Users can read all memos
      - Update: Users can update their own memos
      - Delete: Users can delete their own memos
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their own memos" ON memos;
DROP POLICY IF EXISTS "Users can read all memos" ON memos;
DROP POLICY IF EXISTS "Users can update their own memos" ON memos;

-- Enable RLS
ALTER TABLE memos ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Users can create their own memos"
ON memos FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read all memos"
ON memos FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can update their own memos"
ON memos FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own memos"
ON memos FOR DELETE
TO authenticated
USING (auth.uid() = user_id);