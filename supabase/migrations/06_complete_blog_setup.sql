-- ============================================
-- COMPLETE BLOG SETUP - RUN THIS IN SUPABASE SQL EDITOR
-- ============================================
-- This file includes EVERYTHING needed for blog functionality
-- Run this if blog is not working properly

-- Step 1: Create trigger function for updated_at (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create blog_posts table with ALL fields
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

-- Step 3: Enable Row Level Security (RLS)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies (if any) to avoid conflicts
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Users can manage their own posts" ON public.blog_posts;

-- Step 5: Create RLS Policies
-- Policy 1: Authenticated users (admins) can do everything
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

-- Step 7: Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Add comments for documentation
COMMENT ON TABLE public.blog_posts IS 'Blog posts and articles';
COMMENT ON COLUMN public.blog_posts.slug IS 'URL-friendly unique identifier';
COMMENT ON COLUMN public.blog_posts.status IS 'Post status: draft, published, archived';
COMMENT ON COLUMN public.blog_posts.tags IS 'Array of tags for categorization';
COMMENT ON COLUMN public.blog_posts.category IS 'Blog post category for organization';

-- Step 9: Verify setup
DO $$
BEGIN
  RAISE NOTICE '✅ Blog table setup complete!';
  RAISE NOTICE '📊 Table: blog_posts created/verified';
  RAISE NOTICE '🔐 RLS policies enabled';
  RAISE NOTICE '⚡ Indexes created for performance';
  RAISE NOTICE '🔄 Auto-update trigger created';
END $$;

-- Step 10: Test query (optional - uncomment to test)
-- SELECT * FROM public.blog_posts LIMIT 1;

