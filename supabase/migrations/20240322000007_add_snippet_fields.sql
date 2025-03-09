-- Add snippet fields to music_pins table
ALTER TABLE music_pins ADD COLUMN IF NOT EXISTS snippet_start FLOAT;
ALTER TABLE music_pins ADD COLUMN IF NOT EXISTS snippet_end FLOAT;

-- Add description field if it doesn't exist
ALTER TABLE music_pins ADD COLUMN IF NOT EXISTS description TEXT;

-- Add external_url field if it doesn't exist
ALTER TABLE music_pins ADD COLUMN IF NOT EXISTS external_url TEXT;

-- Enable realtime for music_pins
alter publication supabase_realtime add table music_pins;