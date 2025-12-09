# Complete Blog Setup Guide - Supabase

## 🚨 IMPORTANT: Run This Setup First!

Agar blog kaam nahi kar raha, to **pehle ye setup run karo**:

---

## 📋 Step-by-Step Setup

### **Step 1: Open Supabase Dashboard**
1. Go to: https://supabase.com/dashboard
2. Select your project: **rczwblcyzomiiqihljua**
3. Click **"SQL Editor"** in left sidebar

### **Step 2: Run Complete Setup**
1. Open file: `supabase/migrations/06_complete_blog_setup.sql`
2. **Copy ALL content** (Ctrl+A, Ctrl+C)
3. Paste in Supabase SQL Editor
4. Click **"Run"** button (or press Ctrl+Enter)

### **Step 3: Verify Setup**
Run this query to check:

```sql
-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'blog_posts';

-- Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'blog_posts';

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'blog_posts';
```

---

## ✅ What Gets Created

### **Table: `blog_posts`**
- ✅ `id` - UUID primary key
- ✅ `title` - Post title (required)
- ✅ `slug` - URL-friendly identifier (unique, required)
- ✅ `excerpt` - Short description
- ✅ `content` - Full post content (required)
- ✅ `featured_image` - Image URL
- ✅ `author_id` - User ID reference
- ✅ `author_name` - Author name
- ✅ `status` - draft/published/archived (default: draft)
- ✅ `published_at` - Publication date
- ✅ `created_at` - Creation timestamp (auto)
- ✅ `updated_at` - Update timestamp (auto-updated)
- ✅ `views` - View count (default: 0)
- ✅ `tags` - Array of tags
- ✅ `category` - Post category (default: general)
- ✅ `seo_title` - SEO title
- ✅ `seo_description` - SEO description

### **Security (RLS)**
- ✅ **Admins** can create/edit/delete all posts
- ✅ **Public** can only read published posts
- ✅ **Anonymous** users cannot modify posts

### **Performance**
- ✅ Indexes on: status, slug, published_at, created_at, category
- ✅ Auto-update trigger for updated_at

---

## 🧪 Test After Setup

### **1. Create Test Post via Admin:**
```
1. Go to: /admin/blog
2. Click "New Post"
3. Fill in:
   - Title: "Test Post"
   - Slug: "test-post"
   - Content: "This is a test..."
   - Status: "Published"
   - Category: "General"
4. Save
```

### **2. Check Frontend:**
- Home page: Should show post in latest articles
- Blog page: `/blog` - Should show post
- Individual post: `/blog/test-post` - Should work

---

## 🔧 Troubleshooting

### **Error: "relation blog_posts does not exist"**
- ✅ Run `06_complete_blog_setup.sql` again
- ✅ Check SQL Editor for errors
- ✅ Verify you're in correct project

### **Error: "permission denied"**
- ✅ Check RLS policies are created
- ✅ Verify you're logged in as admin
- ✅ Check policy names match

### **Error: "duplicate key value violates unique constraint"**
- ✅ Slug already exists
- ✅ Use different slug
- ✅ Or delete old post first

### **Posts not showing on frontend**
- ✅ Check post status is "published"
- ✅ Verify RLS policy allows public read
- ✅ Check browser console for errors

### **404 Error on post page**
- ✅ Verify slug is correct
- ✅ Check post is published
- ✅ Restart dev server: `npm run dev`
- ✅ Clear browser cache

---

## 📝 Common Issues & Solutions

### **Issue 1: Can't create posts**
**Solution:** Check RLS policy "Admins can manage blog posts" exists

### **Issue 2: Posts not visible to public**
**Solution:** Check RLS policy "Public can read published posts" exists

### **Issue 3: Category field missing**
**Solution:** Run migration `05_add_blog_category.sql` or `06_complete_blog_setup.sql`

### **Issue 4: Updated_at not updating**
**Solution:** Check trigger `update_blog_posts_updated_at` exists

---

## ✅ Verification Checklist

After running setup, verify:

- [ ] Table `blog_posts` exists
- [ ] All columns are present (15 columns)
- [ ] RLS is enabled
- [ ] 2 policies exist (Admins + Public)
- [ ] 5 indexes exist
- [ ] Trigger exists for updated_at
- [ ] Can create post in admin panel
- [ ] Can view published post on frontend

---

## 🚀 Quick Fix Command

Agar kuch bhi kaam nahi kar raha, to **ye complete setup run karo**:

```sql
-- Copy entire content from: supabase/migrations/06_complete_blog_setup.sql
-- Paste in Supabase SQL Editor and Run
```

**Ye sab kuch fix kar dega!** ✅

