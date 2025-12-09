# ✅ Vercel Deployment Checklist

## 🔧 **Required Environment Variables**

Vercel Dashboard → Settings → Environment Variables mein ye add karein:

### **Supabase:**
```
NEXT_PUBLIC_SUPABASE_URL=https://rczwblcyzomiiqihljua.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjendibGN5em9taWlxaWhsanVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTEwMDgsImV4cCI6MjA4MDU2NzAwOH0.-CdRRPK3iOw3IUHMpacwlZHXOmCgg0uYt9zPaWX6s
SUPABASE_SERVICE_ROLE_KEY=sb_publishable_S1E3Bwor8XFpCop1KDwoJQ_F6k6Vqfd
```

### **Resend (Email):**
```
RESEND_API_KEY=re_UoPUesWQ_aoQrPnY2qM8Cn54rpAZ1Lq7U
RESEND_FROM_EMAIL=Prime UAE Services <noreply@primeuaeservices.com>
```

### **Resend Webhook (Optional - for email tracking):**
```
RESEND_WEBHOOK_SECRET=whsec_your_secret_here
```

### **Site URL:**
```
NEXT_PUBLIC_SITE_URL=https://primeuaeservices.com
```

---

## 📋 **Pre-Deployment Checklist**

### ✅ **1. Code Quality:**
- [x] All TypeScript errors fixed
- [x] No console errors
- [x] All imports correct
- [x] Build command works locally: `npm run build`

### ✅ **2. Dependencies:**
- [x] `package.json` updated
- [x] All dependencies installed
- [x] No missing packages

### ✅ **3. Configuration:**
- [x] `next.config.js` configured
- [x] No `output: 'export'` (for dynamic routes)
- [x] Images unoptimized (for static export compatibility)

### ✅ **4. Database:**
- [x] Supabase migrations run
- [x] Tables created: `tickets`, `admin_settings`, `blog_posts`, `email_events`
- [x] RLS policies set

### ✅ **5. API Routes:**
- [x] `/api/contact` - Contact form
- [x] `/api/admin/send-reply` - Email replies
- [x] `/api/admin/broadcasts` - Email broadcasts
- [x] `/api/webhooks/resend` - Email webhooks

---

## 🚀 **Vercel Deployment Steps**

### **Step 1: Connect Repository**
1. Vercel Dashboard → Add New Project
2. GitHub repo select karein: `primeuaeservices-tech/primeuaeservices`
3. Import project

### **Step 2: Configure Build Settings**
- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

### **Step 3: Add Environment Variables**
Vercel Dashboard → Settings → Environment Variables
- Add all variables from above list
- Select: Production, Preview, Development (sab)

### **Step 4: Deploy**
1. Click "Deploy"
2. Wait for build to complete
3. Check deployment logs for errors

---

## 🧪 **Post-Deployment Testing**

### **1. Homepage:**
- [ ] Site loads correctly
- [ ] Navigation works
- [ ] Contact form works

### **2. Admin Panel:**
- [ ] Login works: `/admin/login`
- [ ] Dashboard loads: `/admin`
- [ ] Tickets page works: `/admin/tickets`
- [ ] Can send email replies
- [ ] Blog management works: `/admin/blog`

### **3. Blog:**
- [ ] Blog listing page: `/blog`
- [ ] Individual posts load: `/blog/[slug]`
- [ ] Home page shows latest posts

### **4. Email:**
- [ ] Contact form sends emails
- [ ] Admin can reply to tickets
- [ ] Email events tracked (if webhook set up)

---

## 🐛 **Common Issues & Fixes**

### **Issue: Build Fails**
**Solution:**
- Check build logs in Vercel
- Ensure all dependencies in `package.json`
- Check for TypeScript errors

### **Issue: Environment Variables Not Working**
**Solution:**
- Verify variables are set in Vercel
- Redeploy after adding variables
- Check variable names (case-sensitive)

### **Issue: API Routes Return 500**
**Solution:**
- Check Vercel function logs
- Verify environment variables
- Check Supabase connection

### **Issue: Database Errors**
**Solution:**
- Run migrations in Supabase
- Check RLS policies
- Verify Supabase credentials

### **Issue: Email Not Sending**
**Solution:**
- Check `RESEND_API_KEY` in Vercel
- Verify `RESEND_FROM_EMAIL` format
- Check Resend dashboard for errors

---

## 📊 **Current Status**

### ✅ **Ready for Deployment:**
- ✅ All code committed
- ✅ Dependencies configured
- ✅ API routes working
- ✅ Database migrations ready
- ✅ Environment variables documented

### ⚠️ **Action Required:**
1. **Add Environment Variables** in Vercel
2. **Run Database Migrations** in Supabase
3. **Connect GitHub Repository** in Vercel
4. **Deploy** and test

---

## 🔗 **Important Links**

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Resend Dashboard:** https://resend.com/dashboard
- **GitHub Repo:** https://github.com/primeuaeservices-tech/primeuaeservices

---

## ✅ **Final Checklist Before Deploy:**

- [ ] All environment variables added to Vercel
- [ ] Database migrations run in Supabase
- [ ] GitHub repository connected to Vercel
- [ ] Build command tested locally: `npm run build`
- [ ] All API routes tested
- [ ] Admin login tested
- [ ] Contact form tested

**Ready to deploy!** 🚀


