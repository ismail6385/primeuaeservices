# Complete Edge Functions Setup - All Options

## 🎯 Two Ways to Use Edge Functions

### **Option 1: Supabase Edge Functions (Recommended)**
- Runs on Supabase infrastructure
- Better performance
- Auto-scaling
- Requires Supabase CLI

### **Option 2: Next.js API Routes (Ready to Use)**
- Works immediately
- No CLI setup needed
- Same functionality
- Already created in `app/api/edge/`

---

## ✅ Option 2: Next.js API Routes (READY NOW!)

Main ne **Next.js API routes** bana diye hain jo **abhi use ho sakte hain**:

### **Available Routes:**

1. **`/api/edge/send-email`** - Send emails
2. **`/api/edge/ticket-notification`** - Ticket notifications
3. **`/api/edge/whatsapp`** - WhatsApp messages
4. **`/api/edge/generate-pdf`** - Generate PDFs
5. **`/api/edge/daily-report`** - Daily reports

### **Usage Example:**

```typescript
// Send email
const response = await fetch('/api/edge/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'customer@example.com',
    subject: 'Welcome!',
    html: '<h1>Hello</h1>',
  }),
});
```

**Ye routes abhi use ho sakte hain - koi setup nahi chahiye!** ✅

---

## 🚀 Option 1: Supabase Edge Functions (Advanced)

### **Step 1: Install Supabase CLI**
```bash
npm install -g supabase
```

### **Step 2: Login**
```bash
supabase login
```

### **Step 3: Link Project**
```bash
supabase link --project-ref rczwblcyzomiiqihljua
```

### **Step 4: Set Secrets**
Supabase Dashboard → Settings → Edge Functions → Secrets:
```
RESEND_API_KEY=re_UoPUesWQ_aoQrPnY2qM8Cn54rpAZ1Lq7U
SUPABASE_URL=https://rczwblcyzomiiqihljua.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_publishable_S1E3Bwor8XFpCop1KDwoJQ_F6k6Vqfd
```

### **Step 5: Deploy All**

**Windows:**
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

---

## 📋 What Each Function Does

### **1. send-email** 📧
- Send emails via Resend
- Usage: `/api/edge/send-email` (Next.js) or Edge Function

### **2. ticket-notification** 🔔
- Auto-email on new ticket
- Can be triggered via webhook

### **3. whatsapp-notify** 💬
- Send WhatsApp messages
- Requires Twilio setup

### **4. generate-pdf** 📄
- Generate PDF documents
- Invoices, certificates, etc.

### **5. daily-report** 📊
- Daily statistics report
- Auto-send via email

---

## 🔧 Integrate with Existing Code

### **Update Contact Form to Use Edge Function:**

```typescript
// In app/api/contact/route.ts
// After saving to Supabase, call notification:
await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/edge/ticket-notification`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(ticketData),
});
```

---

## 🎯 Recommended Setup

**For Now (Quick):**
- ✅ Use Next.js API routes (`/api/edge/*`)
- ✅ Already working, no setup needed

**Later (Advanced):**
- Deploy Supabase Edge Functions
- Better performance & scaling
- Use for heavy processing

---

## 📝 Quick Test

Test the Next.js routes:

```bash
# Test send-email
curl -X POST http://localhost:3000/api/edge/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","subject":"Test","html":"<p>Test</p>"}'
```

---

**Next.js API routes abhi use ho sakte hain! Test karo aur batayein.** 🚀

