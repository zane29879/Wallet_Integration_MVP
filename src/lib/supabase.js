import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://onbwtukreuhdmxlaulrx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uYnd0dWtyZXVoZG14bGF1bHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MzMxNjIsImV4cCI6MjA3MDQwOTE2Mn0.8RtGGxiYttgVWlU25Z-rNj4tl3yHCnCbRAYp0lVGIFs"
);
