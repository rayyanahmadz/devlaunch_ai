-- ==========================================
-- DevLaunch AI - Supabase PostgreSQL Schema
-- ==========================================

-- 1. Create Profiles Table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  tier TEXT DEFAULT 'Free' CHECK (tier IN ('Free', 'Pro', 'Enterprise')),
  usage_count INT DEFAULT 0,
  usage_limit INT DEFAULT 3,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  country TEXT NOT NULL,
  target_audience TEXT,
  budget TEXT,
  timeline TEXT,
  description TEXT NOT NULL,
  goals TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  generated_content JSONB NOT NULL,
  is_saved BOOLEAN DEFAULT false
);

-- Enable RLS on Projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Create Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY DEFAULT 'global',
  ai_model_name TEXT DEFAULT 'gemini-3.5-flash',
  system_prompt_preset TEXT NOT NULL,
  free_tier_limit INT DEFAULT 3,
  pro_tier_limit INT DEFAULT 50
);

-- Enable RLS on Settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;


-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Profiles RLS
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Projects RLS
CREATE POLICY "Users can view their own projects" 
  ON public.projects FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert their own projects" 
  ON public.projects FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
  ON public.projects FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
  ON public.projects FOR DELETE 
  USING (auth.uid() = user_id);

-- Settings RLS
CREATE POLICY "Anyone can view settings" 
  ON public.settings FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can update settings" 
  ON public.settings FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.tier = 'Enterprise'
    )
  );


-- ==========================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_is_saved ON public.projects(is_saved);


-- ==========================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ==========================================
-- Create a trigger function that automatically inserts a new profile row
-- whenever a new user signs up via Supabase Auth.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, tier, usage_limit)
  VALUES (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', 'New Architect'),
    'Free',
    3
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind Trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==========================================
-- SEED DEFAULT SYSTEM VALUES
-- ==========================================
INSERT INTO public.settings (key, ai_model_name, system_prompt_preset, free_tier_limit, pro_tier_limit)
VALUES (
  'global',
  'gemini-3.5-flash',
  'You are DevLaunch AI, a world-class Elite Startup Architect, CTO, and Product Strategist. Generate highly detailed, professional, and launch-ready software plans.',
  3,
  50
) ON CONFLICT (key) DO NOTHING;
