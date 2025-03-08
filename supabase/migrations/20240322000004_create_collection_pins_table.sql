-- Create collection_pins junction table
CREATE TABLE IF NOT EXISTS public.collection_pins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE NOT NULL,
  music_pin_id UUID REFERENCES public.music_pins(id) ON DELETE CASCADE NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(collection_id, music_pin_id)
);

-- Enable row level security
ALTER TABLE public.collection_pins ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view collection pins for public collections" ON public.collection_pins;
CREATE POLICY "Users can view collection pins for public collections"
  ON public.collection_pins
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_id AND (c.is_public = true OR c.user_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can add pins to their own collections" ON public.collection_pins;
CREATE POLICY "Users can add pins to their own collections"
  ON public.collection_pins
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_id AND c.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can remove pins from their own collections" ON public.collection_pins;
CREATE POLICY "Users can remove pins from their own collections"
  ON public.collection_pins
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_id AND c.user_id = auth.uid()
    )
  );

-- Enable realtime
alter publication supabase_realtime add table public.collection_pins;
