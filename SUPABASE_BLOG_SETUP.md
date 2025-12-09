# Supabase Blog Setup - Step by Step

## 🎯 Quick Setup (3 Steps)

### **Step 1: Open Supabase Dashboard**
1. Go to: https://supabase.com/dashboard
2. Select your project: **rczwblcyzomiiqihljua**
3. Click **"SQL Editor"** in left sidebar

### **Step 2: Copy & Paste SQL**
1. Open file: `supabase/migrations/04_create_blog_table.sql`
2. **Copy ALL content** (Ctrl+A, Ctrl+C)
3. Paste in Supabase SQL Editor
4. Click **"Run"** button (or press Ctrl+Enter)

### **Step 3: Verify Setup**
Run this query to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'blog_posts';
```

Agar `blog_posts` dikhe, to setup successful hai! ✅

---

## 📋 What Gets Created

### **Table Structure:**
```
blog_posts
├── id (uuid, primary key)
├── title (text, required)
├── slug (text, unique, required)
├── excerpt (text)
├── content (text, required)
├── featured_image (text, URL)
├── author_id (uuid, references auth.users)
├── author_name (text)
├── status (draft/published/archived)
├── published_at (timestamp)
├── created_at (timestamp, auto)
├── updated_at (timestamp, auto-updated)
├── views (integer, default 0)
├── tags (text array)
├── seo_title (text)
└── seo_description (text)
```

### **Security (RLS):**
- ✅ Admins can create/edit/delete all posts
- ✅ Public can only read published posts
- ✅ Anonymous users cannot modify posts

### **Performance:**
- ✅ Indexes on: status, slug, published_at, created_at
- ✅ Auto-update trigger for updated_at

---

## 🧪 Test After Setup

### **1. Create Test Post via Admin:**
```
1. Go to: /admin/blog
2. Click "New Post"
3. Fill in:
   - Title: "Welcome to Our Blog"
   - Slug: "welcome-to-our-blog"
   - Content: "This is a test post..."
   - Status: "Published"
4. Save
```

### **2. Check Frontend:**
- Home page: Should show 1 post in grid
- Blog page: `/blog` - Should show the post
- Individual post: `/blog/welcome-to-our-blog` - Should display full post

---

## 🔧 Troubleshooting

### **Error: "relation blog_posts does not exist"**
- ✅ Migration nahi chali
- Solution: SQL Editor mein migration run karo

### **Error: "permission denied"**
- ✅ RLS policies issue
- Solution: Check policies are created (see SQL file)

### **Error: "function update_updated_at_column does not exist"**
- ✅ Trigger function missing
- Solution: Run `00_complete_setup.sql` first (it creates the function)

### **Posts not showing on frontend**
- ✅ Check post status is "published"
- ✅ Verify `published_at` is set
- ✅ Check browser console for errors

---

## 📝 Quick Reference

### **Create Post:**
```sql
INSERT INTO public.blog_posts (
  title, slug, content, status, published_at, author_name
) VALUES (
  'My First Post',
  'my-first-post',
  'This is the content...',
  'published',
  now(),
  'Admin'
);
```

### **List All Posts:**
```sql
SELECT id, title, status, published_at 
FROM public.blog_posts 
ORDER BY created_at DESC;
```

### **Update Post Status:**
```sql
UPDATE public.blog_posts 
SET status = 'published', published_at = now() 
WHERE id = 'post-id-here';
```

---

## ✅ Checklist

- [ ] Migration file copied
- [ ] SQL run in Supabase
- [ ] Table verified
- [ ] Test post created
- [ ] Frontend checked
- [ ] Everything working!

---

**Setup complete hone ke baad test karo aur batayein!** 🚀

