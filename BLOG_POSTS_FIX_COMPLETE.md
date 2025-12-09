# Blog Posts Not Showing - Complete Fix Guide

## 🚨 Problem
Posts admin panel mein publish ho rahe hain, lekin frontend `/blog` page par show nahi ho rahe.

---

## ✅ **Step 1: RLS Policy Fix (MOST IMPORTANT)**

**Supabase SQL Editor mein ye run karo:**

```sql
-- File: supabase/migrations/07_fix_blog_rls_policy.sql

-- Drop old policies
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow public read access for published posts" ON public.blog_posts;

-- Create correct policy
CREATE POLICY "Public can read published posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published');
```

**Ye sabse important step hai!** Agar RLS policy galat hai, to posts kabhi show nahi hongi.

---

## ✅ **Step 2: Verify Post Status**

1. Admin panel: `/admin/blog`
2. Check post ki **Status** column
3. **Must be "published"** ✅

Agar "draft" hai:
- Post edit karo
- Status = **"Published"** select karo
- Save karo

---

## ✅ **Step 3: Check Debug API**

Browser mein ye URL open karo:
```
http://localhost:3000/api/debug/blog-posts
```

**Expected Output:**
```json
{
  "success": true,
  "allPosts": {
    "count": 1,
    "posts": [...]
  },
  "publishedPosts": {
    "count": 1,  // ← Ye > 0 hona chahiye
    "posts": [...]
  }
}
```

**Agar `publishedPosts.count = 0` hai:**
- Post status check karo (must be "published")
- RLS policy check karo

---

## ✅ **Step 4: Check Browser Console**

1. Browser DevTools open karo (F12)
2. Console tab
3. `/blog` page refresh karo
4. Look for:
   - `✅ Fetched X published blog posts` ← Ye dikhna chahiye
   - `⚠️ No published posts found` ← Agar ye dikhe, to issue hai

---

## ✅ **Step 5: Verify in Supabase**

Supabase SQL Editor mein:

```sql
-- Check all posts
SELECT id, title, slug, status, published_at, category
FROM public.blog_posts
ORDER BY created_at DESC;

-- Check published posts only
SELECT id, title, slug, status, published_at
FROM public.blog_posts
WHERE status = 'published'
ORDER BY published_at DESC;

-- Check RLS policies
SELECT policyname, cmd, roles, qual
FROM pg_policies
WHERE tablename = 'blog_posts';
```

**Expected:**
- At least 1 post with `status = 'published'`
- Policy "Public can read published posts" exists
- Policy has roles: `anon, authenticated`

---

## 🔧 **Common Issues & Fixes**

### **Issue 1: RLS Policy Missing/Wrong**
**Symptom:** Debug API shows 0 published posts but Supabase has posts

**Fix:**
```sql
-- Run in Supabase SQL Editor
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;

CREATE POLICY "Public can read published posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published');
```

### **Issue 2: Post Status is "draft"**
**Symptom:** Post exists but status is not "published"

**Fix:**
- Admin panel: Edit post
- Change status to "Published"
- Save

### **Issue 3: published_at is NULL**
**Symptom:** Status is "published" but post not showing

**Fix:**
- Edit post in admin panel
- Save again (published_at auto-set hoga)

### **Issue 4: Caching Issue**
**Symptom:** Post shows in Supabase but not on page

**Fix:**
1. Hard refresh: `Ctrl+Shift+R`
2. Clear browser cache
3. Restart dev server: `npm run dev`

---

## 🎯 **Quick Test Steps**

1. **Create Test Post:**
   ```
   Admin → Blog → New Post
   Title: "Test Post 123"
   Slug: "test-post-123"
   Content: "Test content"
   Status: Published ✅
   Category: General
   Save
   ```

2. **Check Debug API:**
   ```
   http://localhost:3000/api/debug/blog-posts
   ```
   Verify: `publishedPosts.count > 0`

3. **Check Blog Page:**
   ```
   http://localhost:3000/blog
   ```
   Post dikhni chahiye

4. **Check Individual Post:**
   ```
   http://localhost:3000/blog/test-post-123
   ```
   Post page dikhni chahiye

---

## ✅ **Verification Checklist**

After fixes, verify:

- [ ] RLS policy "Public can read published posts" exists
- [ ] Policy allows `anon` and `authenticated` roles
- [ ] Post status = "published" in admin panel
- [ ] published_at date is set
- [ ] Debug API shows publishedPosts.count > 0
- [ ] Browser console shows "✅ Fetched X published blog posts"
- [ ] Blog page shows posts

---

## 🚨 **Most Common Issue: RLS Policy**

**90% cases mein issue RLS policy hai!**

**Quick Fix:**
1. Supabase Dashboard → SQL Editor
2. Run: `supabase/migrations/07_fix_blog_rls_policy.sql`
3. Refresh blog page

**Ye fix karne ke baad posts show honi chahiye!** ✅

