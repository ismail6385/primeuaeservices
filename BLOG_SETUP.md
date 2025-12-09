# Blog Setup Guide - Supabase

## 🚀 Quick Setup Steps

### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in left sidebar

### Step 2: Run Migration
Copy the entire content from `supabase/migrations/04_create_blog_table.sql` and paste in SQL Editor, then click **"Run"**

---

## 📋 What Gets Created

### **Table: `blog_posts`**
- ✅ Title, slug, excerpt, content
- ✅ Featured image support
- ✅ Author tracking
- ✅ Status (draft/published/archived)
- ✅ Published date
- ✅ Tags array
- ✅ SEO fields (title, description)
- ✅ Views counter
- ✅ Timestamps (created_at, updated_at)

### **Security (RLS)**
- ✅ Admins can manage all posts
- ✅ Public can read published posts only
- ✅ Anonymous users cannot create/edit/delete

### **Performance**
- ✅ Indexes on status, slug, published_at, created_at
- ✅ Auto-update trigger for updated_at

---

## ✅ Verification

After running migration, verify with this query:

```sql
-- Check if table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'blog_posts';

-- Check table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'blog_posts';
```

---

## 🎯 Next Steps After Setup

1. **Create Your First Post:**
   - Go to `/admin/blog`
   - Click "New Post"
   - Fill in details
   - Set status to "Published"
   - Save

2. **View on Frontend:**
   - Home page: Latest 4 posts will show
   - Blog page: `/blog` - All posts
   - Individual post: `/blog/[slug]`

---

## 🔧 Troubleshooting

### Error: "relation blog_posts does not exist"
- Make sure migration ran successfully
- Check SQL Editor for any errors
- Verify you're in the correct project

### Error: "permission denied"
- Check RLS policies are created
- Verify you're logged in as admin

### Posts not showing on frontend
- Check post status is "published"
- Verify `published_at` date is set
- Check browser console for errors

---

**Ready to go! Run the migration and start creating blog posts!** 🎉

