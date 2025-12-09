-- ============================================
-- BLOG POSTS TABLE SETUP
-- ============================================
-- Run this in Supabase SQL Editor
-- This creates the blog_posts table with all features

-- Create blog posts table
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
  seo_title text,
  seo_description text
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running)
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;

-- Create policy to allow authenticated users (admins) to manage blog posts
CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy to allow public read access for published posts
CREATE POLICY "Public can read published posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE public.blog_posts IS 'Blog posts and articles';
COMMENT ON COLUMN public.blog_posts.slug IS 'URL-friendly unique identifier';
COMMENT ON COLUMN public.blog_posts.status IS 'Post status: draft, published, archived';
COMMENT ON COLUMN public.blog_posts.tags IS 'Array of tags for categorization';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Blog table setup complete!';
  RAISE NOTICE '📊 Table: blog_posts created';
  RAISE NOTICE '🔐 RLS policies enabled';
  RAISE NOTICE '⚡ Indexes created for performance';
END $$;
