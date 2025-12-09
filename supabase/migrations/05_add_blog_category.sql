-- Add category field to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS category text default 'general';

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);

-- Add comment
COMMENT ON COLUMN public.blog_posts.category IS 'Blog post category for organization';

