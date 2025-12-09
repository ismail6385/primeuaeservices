-- ============================================
-- BLOG TABLE SETUP - STANDALONE VERSION
-- ============================================
-- Copy this entire file and run in Supabase SQL Editor
-- This includes everything needed for blog functionality

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
  seo_title text,
  seo_description text
);

-- Step 3: Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies (if any)
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;

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

-- Step 7: Create Trigger for auto-update
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Add Documentation Comments
COMMENT ON TABLE public.blog_posts IS 'Blog posts and articles for Prime UAE Services';
COMMENT ON COLUMN public.blog_posts.slug IS 'URL-friendly unique identifier for the post';
COMMENT ON COLUMN public.blog_posts.status IS 'Post status: draft (not visible), published (visible), archived (hidden)';
COMMENT ON COLUMN public.blog_posts.tags IS 'Array of tags for categorizing posts';
COMMENT ON COLUMN public.blog_posts.views IS 'Number of times the post has been viewed';

-- Success Message
DO $$
BEGIN
  RAISE NOTICE '✅✅✅ BLOG SETUP COMPLETE! ✅✅✅';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Table Created: blog_posts';
  RAISE NOTICE '🔐 Security: RLS enabled with policies';
  RAISE NOTICE '⚡ Performance: Indexes created';
  RAISE NOTICE '🔄 Auto-update: Trigger configured';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 You can now create blog posts in /admin/blog';
END $$;

