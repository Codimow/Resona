-- Create music_pins table
CREATE TABLE IF NOT EXISTS public.music_pins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT,
  album_art TEXT,
  genre TEXT,
  duration INTEGER,
  streaming_url TEXT,
  spotify_id TEXT,
  apple_music_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.music_pins ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view all music pins" ON public.music_pins;
CREATE POLICY "Users can view all music pins"
  ON public.music_pins
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can create their own music pins" ON public.music_pins;
CREATE POLICY "Users can create their own music pins"
  ON public.music_pins
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own music pins" ON public.music_pins;
CREATE POLICY "Users can update their own music pins"
  ON public.music_pins
  FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own music pins" ON public.music_pins;
CREATE POLICY "Users can delete their own music pins"
  ON public.music_pins
  FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime
alter publication supabase_realtime add table public.music_pins;
