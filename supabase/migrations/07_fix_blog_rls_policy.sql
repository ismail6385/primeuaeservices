-- ============================================
-- FIX BLOG RLS POLICY - Run this if posts not showing
-- ============================================
-- This ensures public can read published blog posts

-- Step 1: Drop existing policy if it exists
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow public read access for published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.blog_posts;

-- Step 2: Create the correct policy
-- This allows anonymous users (public) to read published posts
CREATE POLICY "Public can read published posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Step 3: Verify the policy
-- Run this query to check:
-- SELECT policyname, cmd, roles, qual 
-- FROM pg_policies 
-- WHERE tablename = 'blog_posts';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ RLS Policy fixed!';
  RAISE NOTICE '📋 Policy: "Public can read published posts"';
  RAISE NOTICE '👥 Roles: anon, authenticated';
  RAISE NOTICE '✅ Condition: status = published';
END $$;

