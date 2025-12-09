# Blog Posts Not Showing - Fix Guide

## 🔍 Problem
Post publish karne ke baad blog page par show nahi ho rahi.

## ✅ Quick Fixes Applied

1. **Dynamic Rendering** - Force dynamic rendering added
2. **Better Error Logging** - Console mein errors dikhenge
3. **Debug API** - `/api/debug/blog-posts` se check kar sakte ho

---

## 🧪 Step 1: Check Debug API

Browser mein ye URL open karo:
```
http://localhost:3000/api/debug/blog-posts
```

Ye dikhayega:
- Total posts count
- Published posts count
- All posts with status
- Any errors

**Expected:** Published posts count > 0 hona chahiye

---

## 🔧 Step 2: Check RLS Policies

Supabase Dashboard → **Authentication** → **Policies**

Verify karo:
1. Policy "Public can read published posts" exists
2. Policy allows `anon` role
3. Policy uses: `status = 'published'`

**Fix if missing:**
```sql
CREATE POLICY "Public can read published posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published');
```

---

## 🔍 Step 3: Verify Post Status

Admin panel mein:
1. Go to `/admin/blog`
2. Check post ki status column
3. Verify: Status = "published" ✅

Agar "draft" hai:
- Post ko edit karo
- Status = "Published" select karo
- Save karo

---

## 🔄 Step 4: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Refresh blog page (`/blog`)
4. Look for:
   - `Fetched X published blog posts`
   - Any error messages

**Expected:** `Fetched 1 published blog posts` (or more)

---

## 🗄️ Step 5: Check Supabase Directly

Supabase SQL Editor mein ye query run karo:

```sql
-- Check all posts
SELECT id, title, slug, status, published_at, category
FROM public.blog_posts
ORDER BY created_at DESC;

-- Check published posts only
SELECT id, title, slug, status, published_at, category
FROM public.blog_posts
WHERE status = 'published'
ORDER BY published_at DESC;
```

**Expected:** Published posts dikhne chahiye

---

## 🚨 Common Issues & Solutions

### Issue 1: RLS Policy Missing
**Symptom:** Debug API shows 0 published posts but Supabase has posts

**Fix:**
```sql
-- Run in Supabase SQL Editor
CREATE POLICY "Public can read published posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published');
```

### Issue 2: Status Not Set
**Symptom:** Post exists but status is "draft"

**Fix:**
- Edit post in admin panel
- Change status to "Published"
- Save

### Issue 3: published_at Missing
**Symptom:** Status is "published" but post not showing

**Fix:**
- Edit post
- Save again (published_at auto-set hoga)

### Issue 4: Caching Issue
**Symptom:** Post shows in Supabase but not on page

**Fix:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Restart dev server: `npm run dev`

---

## ✅ Verification Checklist

After fixes, verify:

- [ ] Debug API shows published posts count > 0
- [ ] RLS policy "Public can read published posts" exists
- [ ] Post status = "published" in admin panel
- [ ] published_at date is set
- [ ] Browser console shows "Fetched X published blog posts"
- [ ] Hard refresh karne ke baad bhi posts dikh rahe hain

---

## 🎯 Quick Test

1. **Create Test Post:**
   - Go to `/admin/blog/new`
   - Title: "Test Post"
   - Slug: "test-post-123"
   - Content: "Test content"
   - Status: **Published** ✅
   - Category: General
   - Save

2. **Check Debug API:**
   - Open: `/api/debug/blog-posts`
   - Verify: publishedPosts.count > 0

3. **Check Blog Page:**
   - Open: `/blog`
   - Post dikhni chahiye

4. **Check Individual Post:**
   - Open: `/blog/test-post-123`
   - Post page dikhni chahiye

---

## 📞 Still Not Working?

1. **Check Supabase Connection:**
   - Verify `.env.local` has correct Supabase URL and key
   - Restart dev server after changing env vars

2. **Check Network Tab:**
   - Browser DevTools → Network tab
   - Refresh `/blog` page
   - Look for failed requests to Supabase

3. **Check Server Logs:**
   - Terminal mein dev server logs dekho
   - Look for Supabase errors

---

**Sab steps follow karo - issue fix ho jayega!** ✅

