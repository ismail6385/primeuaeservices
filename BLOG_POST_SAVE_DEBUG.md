# Blog Post Not Saving - Debug Guide

## 🚨 Problem
Post save nahi ho rahi - draft bhi nahi ho rahi.

---

## 🔍 **Step 1: Check Browser Console**

1. Admin panel: `/admin/blog/new`
2. Browser DevTools open karo (F12)
3. **Console tab** select karo
4. Post create karo (Title + Content fill karo, Save click karo)
5. Console mein dekho:
   - `📝 Creating post with data: {...}`
   - `🔍 Checking authentication...`
   - `✅ Authenticated as: [email]`
   - `💾 Inserting into blog_posts table...`
   - Agar error hai: `❌ Supabase error: ...`

**Error message copy karo aur mujhe batao!**

---

## 🧪 **Step 2: Test API Route**

Browser console mein ye run karo:

```javascript
fetch('/api/test/blog-insert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Test Post',
    content: 'Test content',
    slug: 'test-post-' + Date.now(),
    status: 'draft'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Expected:** `{ success: true, message: "Post inserted successfully" }`

**Agar error hai:**
- Error message dekho
- Code 42501 = RLS policy issue
- Code 42P01 = Table not found

---

## 🔧 **Step 3: Verify Supabase Setup**

### **A. Check Table Exists:**

Supabase SQL Editor:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'blog_posts';
```

**Expected:** `blog_posts` dikhna chahiye

### **B. Check RLS Policies:**

```sql
SELECT policyname, cmd, roles, qual
FROM pg_policies
WHERE tablename = 'blog_posts';
```

**Expected:** 
- Policy "Admins can manage blog posts" exists
- cmd = "ALL" or "INSERT"
- roles includes "authenticated"

### **C. Check Your User is Authenticated:**

Admin panel mein:
- Top right corner mein email dikhna chahiye
- Agar nahi dikhe, to login karo

---

## ✅ **Step 4: Run Complete Setup**

Agar table nahi hai ya policy missing hai:

**Supabase SQL Editor mein ye run karo:**

```sql
-- File: supabase/migrations/06_complete_blog_setup.sql
-- Copy entire file content and run
```

**Ya manually:**

```sql
-- 1. Create table (if not exists)
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

-- 2. Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 3. Create policy for admins
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

---

## 🚨 **Common Errors & Fixes**

### **Error 1: "Permission denied" (42501)**
**Fix:**
```sql
CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

### **Error 2: "relation blog_posts does not exist" (42P01)**
**Fix:** Run complete setup SQL (Step 4)

### **Error 3: "Not authenticated"**
**Fix:**
- Admin panel se logout/login karo
- Verify you're logged in

### **Error 4: "duplicate key value violates unique constraint" (23505)**
**Fix:** Different slug use karo

---

## 🎯 **Quick Test**

1. **Browser Console open karo (F12)**
2. **Post create karo:**
   - Title: "Test"
   - Content: "Test content"
   - Status: Draft
   - Save
3. **Console dekho:**
   - Agar `✅ Authenticated as:` dikhe = Auth OK
   - Agar `❌ Supabase error:` dikhe = Error message dekho
4. **Error message mujhe batao!**

---

## 📝 **Debug Info Needed**

Agar abhi bhi issue ho, mujhe ye batao:

1. **Browser Console error message** (exact)
2. **Test API response** (Step 2 se)
3. **Supabase table exists?** (Step 3A se)
4. **RLS policies count?** (Step 3B se)

**In details ke saath exact error message share karo - main fix kar dunga!** ✅

