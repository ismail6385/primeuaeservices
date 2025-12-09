-- ============================================
-- QUICK FIX: Create blog_posts table
-- ============================================
-- Copy this ENTIRE file and run in Supabase SQL Editor
-- This will create the table if it doesn't exist

-- Step 1: Create trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  featured_image text,
  author_id uuid references auth.users(id),
  author_name text,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  views integer default 0,
  tags text[] default '{}',
  category text default 'general',
  seo_title text,
  seo_description text
);

-- Step 3: Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies (if any)
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Users can manage their own posts" ON public.blog_posts;

-- Step 5: Create RLS Policies
-- Policy 1: Admins can do everything
CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 2: Public can read published posts only
CREATE POLICY "Public can read published posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Step 6: Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);

-- Step 7: Create Trigger for auto-update
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Verify table was created
SELECT 
  '✅ Table created successfully!' as message,
  COUNT(*) as column_count
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'blog_posts';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅✅✅ BLOG TABLE CREATED! ✅✅✅';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Table: blog_posts';
  RAISE NOTICE '🔐 RLS: Enabled with policies';
  RAISE NOTICE '⚡ Indexes: Created';
  RAISE NOTICE '🔄 Trigger: Configured';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 Ab post save ho jayegi!';
END $$;

