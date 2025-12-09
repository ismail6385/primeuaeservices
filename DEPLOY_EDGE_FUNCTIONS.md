# Deploy All Edge Functions - Step by Step

## 🚀 Quick Deploy (All Functions)

### **Step 1: Install Supabase CLI**
```bash
npm install -g supabase
```

### **Step 2: Login to Supabase**
```bash
supabase login
```
(Browser mein login karo)

### **Step 3: Link Your Project**
```bash
supabase link --project-ref rczwblcyzomiiqihljua
```

### **Step 4: Set Environment Variables**
Supabase Dashboard → **Settings** → **Edge Functions** → **Secrets**

Add these secrets:
```
RESEND_API_KEY=re_UoPUesWQ_aoQrPnY2qM8Cn54rpAZ1Lq7U
SUPABASE_URL=https://rczwblcyzomiiqihljua.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_publishable_S1E3Bwor8XFpCop1KDwoJQ_F6k6Vqfd
```

### **Step 5: Deploy All Functions**

**Windows (PowerShell):**
```powershell
cd supabase\functions
.\deploy.ps1
```

**Mac/Linux:**
```bash
cd supabase/functions
chmod +x deploy.sh
./deploy.sh
```

**Or Deploy Individually:**
```bash
supabase functions deploy send-email
supabase functions deploy ticket-notification
supabase functions deploy whatsapp-notify
supabase functions deploy generate-pdf
supabase functions deploy daily-report
```

---

## ✅ Verification

After deployment, test each function:

### **1. Test send-email:**
```bash
curl -X POST https://rczwblcyzomiiqihljua.supabase.co/functions/v1/send-email \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test",
    "html": "<p>Test email</p>"
  }'
```

---

## 🔧 Alternative: Use Next.js API Routes (No CLI Needed)

Agar Edge Functions deploy karna mushkil ho, to main Next.js API routes bhi bana sakta hoon jo same kaam karein. Batayein agar wo chahiye!

---

**Ready to deploy? Follow the steps above!** 🚀

