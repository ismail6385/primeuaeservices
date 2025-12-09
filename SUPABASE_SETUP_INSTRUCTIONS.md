# Supabase Setup Instructions

## ⚠️ **IMPORTANT: Run This First!**

Agar aapko error aa raha hai "relation tickets does not exist", to pehle base tables create karni hongi.

## 🚀 **Step-by-Step Setup**

### **Step 1: Supabase Dashboard Mein Jao**
1. https://supabase.com/dashboard par jao
2. Apne project ko select karo
3. Left sidebar mein **"SQL Editor"** click karo

### **Step 2: Complete Setup Run Karo**

**Option A: Complete Setup (Recommended)**
- File: `supabase/migrations/00_complete_setup.sql`
- Ye file **sab kuch ek saath** setup karegi:
  - ✅ Tickets table (with all enhanced fields)
  - ✅ Admin settings table
  - ✅ Indexes for performance
  - ✅ RLS policies
  - ✅ Triggers

**Steps:**
1. `00_complete_setup.sql` file open karo
2. Saara content copy karo
3. Supabase SQL Editor mein paste karo
4. **"Run"** button click karo

### **Step 3: Verify Setup**

SQL Editor mein ye query run karo:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('tickets', 'admin_settings');
```

Agar dono tables dikhen, to setup successful hai! ✅

---

## 📋 **Alternative: Step-by-Step Setup**

Agar aap step-by-step karna chahte hain:

### **Step 1: Base Tables**
1. `01_create_tickets_table.sql` run karo
2. `02_create_admin_settings_table.sql` run karo

### **Step 2: Enhancements**
1. `03_enhance_tickets_table.sql` run karo (ab error nahi aayega)

---

## 🔍 **Troubleshooting**

### **Error: "relation already exists"**
- Matlab table pehle se hai
- `00_complete_setup.sql` use karo (IF NOT EXISTS ke saath)

### **Error: "permission denied"**
- Check karo ke aap project owner/admin hain
- Supabase dashboard mein proper permissions hain

### **Error: "syntax error"**
- SQL Editor mein proper formatting check karo
- Copy-paste karte waqt extra spaces na aayein

---

## ✅ **After Setup**

1. **Test Contact Form:**
   - Website par contact form submit karo
   - Supabase → Table Editor → `tickets` check karo
   - Data dikhna chahiye

2. **Test Admin Login:**
   - `/admin/login` par jao
   - Login karo
   - `/admin/tickets` par jao
   - Tickets dikhne chahiye

3. **Check Settings:**
   - `/admin/settings` par jao
   - Settings save karo
   - Supabase → `admin_settings` table check karo

---

## 📞 **Need Help?**

Agar koi issue ho to:
1. Error message share karo
2. Screenshot bhejo (agar possible ho)
3. Main help kar dunga! 🚀

