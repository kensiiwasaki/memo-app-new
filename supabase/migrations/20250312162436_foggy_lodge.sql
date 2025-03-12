/*
  # Create comments policies

  1. Security
    - Enable RLS on comments table
    - Add policies for CRUD operations
*/

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create comments"
ON comments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read all comments"
ON comments FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can delete their own comments"
ON comments FOR DELETE
TO authenticated
USING (auth.uid() = user_id);