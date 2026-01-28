-- ==========================================
-- 1% BESSER - HABIT TRACKER
-- Supabase Database Schema
-- ==========================================

-- Enable UUID extension (usually already enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- DAILY ENTRIES TABLE
-- ==========================================
-- Stores daily habits: morning goals and evening completions

CREATE TABLE IF NOT EXISTS daily_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,  -- Simple text ID for demo, can be changed to UUID REFERENCES auth.users(id)
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  morning_goal TEXT,
  evening_completed BOOLEAN DEFAULT NULL,
  reflection_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one entry per user per day
  UNIQUE(user_id, date)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_entries_user_date 
  ON daily_entries(user_id, date DESC);

CREATE INDEX IF NOT EXISTS idx_daily_entries_user_completed 
  ON daily_entries(user_id, evening_completed);

-- ==========================================
-- ROW LEVEL SECURITY (Optional)
-- ==========================================
-- Uncomment if using Supabase Auth

-- ALTER TABLE daily_entries ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own entries
-- CREATE POLICY "Users can view own entries" ON daily_entries
--   FOR SELECT USING (auth.uid()::text = user_id);

-- Policy: Users can insert their own entries
-- CREATE POLICY "Users can insert own entries" ON daily_entries
--   FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Policy: Users can update their own entries
-- CREATE POLICY "Users can update own entries" ON daily_entries
--   FOR UPDATE USING (auth.uid()::text = user_id);

-- ==========================================
-- HELPER FUNCTIONS
-- ==========================================

-- Function to calculate streak for a user
CREATE OR REPLACE FUNCTION calculate_streak(p_user_id TEXT)
RETURNS INTEGER AS $$
DECLARE
  streak_count INTEGER := 0;
  current_date_check DATE := CURRENT_DATE;
  entry_exists BOOLEAN;
BEGIN
  -- Check if today is completed
  SELECT evening_completed INTO entry_exists
  FROM daily_entries
  WHERE user_id = p_user_id AND date = CURRENT_DATE;
  
  -- If today not completed yet, start checking from yesterday
  IF entry_exists IS NULL OR entry_exists = FALSE THEN
    current_date_check := CURRENT_DATE - INTERVAL '1 day';
  END IF;
  
  -- Count consecutive completed days
  LOOP
    SELECT evening_completed INTO entry_exists
    FROM daily_entries
    WHERE user_id = p_user_id AND date = current_date_check;
    
    EXIT WHEN entry_exists IS NULL OR entry_exists = FALSE;
    
    streak_count := streak_count + 1;
    current_date_check := current_date_check - INTERVAL '1 day';
  END LOOP;
  
  RETURN streak_count;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- SAMPLE DATA (Optional - for testing)
-- ==========================================

-- INSERT INTO daily_entries (user_id, date, morning_goal, evening_completed, reflection_note)
-- VALUES 
--   ('demo-user-001', CURRENT_DATE - INTERVAL '2 days', '30 Minuten Sport machen', true, 'Hat gut geklappt!'),
--   ('demo-user-001', CURRENT_DATE - INTERVAL '1 day', '1 Kapitel im Buch lesen', true, 'Spannendes Kapitel'),
--   ('demo-user-001', CURRENT_DATE, '10 Minuten meditieren', NULL, NULL);
