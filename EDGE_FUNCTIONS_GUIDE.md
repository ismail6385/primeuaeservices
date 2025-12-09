# Supabase Edge Functions - Complete Guide

## 🎯 What Can You Do with Edge Functions?

Edge Functions are **serverless functions** that run on Deno. Perfect for:

### **1. Email & Notifications** 📧
- ✅ Send emails when tickets are created
- ✅ Send password reset emails
- ✅ Newsletter broadcasts
- ✅ Daily/weekly reports

### **2. WhatsApp Integration** 💬
- ✅ Send WhatsApp notifications
- ✅ Automated responses
- ✅ Status updates to customers

### **3. Document Generation** 📄
- ✅ Generate PDF invoices
- ✅ Create certificates
- ✅ Generate application forms
- ✅ Export reports

### **4. Payment Processing** 💳
- ✅ Handle payment webhooks
- ✅ Process refunds
- ✅ Payment status updates
- ✅ Invoice generation

### **5. Scheduled Tasks** ⏰
- ✅ Daily reports (cron jobs)
- ✅ Reminder emails
- ✅ Data cleanup
- ✅ Backup tasks

### **6. API Integrations** 🔌
- ✅ Government portal APIs
- ✅ Third-party services
- ✅ Data synchronization
- ✅ Webhook handlers

### **7. Background Processing** ⚙️
- ✅ Image processing
- ✅ Data transformation
- ✅ Bulk operations
- ✅ Queue processing

---

## 🚀 Setup Instructions

### **Step 1: Install Supabase CLI**
```bash
npm install -g supabase
```

### **Step 2: Login**
```bash
supabase login
```

### **Step 3: Link Your Project**
```bash
supabase link --project-ref rczwblcyzomiiqihljua
```

### **Step 4: Set Environment Variables**
```bash
# In Supabase Dashboard → Settings → Edge Functions → Secrets
RESEND_API_KEY=your_resend_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### **Step 5: Deploy Function**
```bash
cd supabase/functions/send-email
supabase functions deploy send-email
```

---

## 📁 Available Functions

### **1. send-email** 📧
**Purpose:** Send emails via Resend API

**Usage:**
```typescript
fetch('https://your-project.supabase.co/functions/v1/send-email', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: 'customer@example.com',
    subject: 'Welcome!',
    html: '<h1>Welcome to Prime UAE Services</h1>',
  }),
});
```

### **2. ticket-notification** 🔔
**Purpose:** Auto-send email when new ticket created

**Setup:** Configure as database webhook in Supabase Dashboard

### **3. whatsapp-notify** 💬
**Purpose:** Send WhatsApp messages

**Usage:**
```typescript
fetch('https://your-project.supabase.co/functions/v1/whatsapp-notify', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: '971527707492',
    message: 'Your visa application is approved!',
  }),
});
```

### **4. generate-pdf** 📄
**Purpose:** Generate PDF documents

**Usage:**
```typescript
fetch('https://your-project.supabase.co/functions/v1/generate-pdf', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'invoice',
    data: {
      invoiceNumber: 'INV-001',
      clientName: 'John Doe',
      service: 'Employment Visa',
      amount: '5000',
    },
  }),
});
```

### **5. daily-report** 📊
**Purpose:** Generate and send daily reports

**Usage:** Can be called manually or scheduled via cron

---

## 🔧 How to Use in Your Code

### **From Next.js API Route:**
```typescript
// app/api/send-notification/route.ts
export async function POST(request: Request) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-email`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'customer@example.com',
        subject: 'Notification',
        html: '<p>Your message</p>',
      }),
    }
  );
  
  return Response.json(await response.json());
}
```

### **From Client Side:**
```typescript
const sendEmail = async () => {
  const { data } = await supabase.functions.invoke('send-email', {
    body: {
      to: 'customer@example.com',
      subject: 'Hello',
      html: '<p>Message</p>',
    },
  });
};
```

---

## ⚙️ Database Webhooks (Auto-trigger)

### **Setup Webhook for Ticket Notifications:**

1. Go to Supabase Dashboard
2. **Database** → **Webhooks**
3. Click **"Create a new webhook"**
4. Configure:
   - **Name:** ticket-notification
   - **Table:** tickets
   - **Events:** INSERT
   - **Type:** HTTP Request
   - **URL:** `https://your-project.supabase.co/functions/v1/ticket-notification`
   - **HTTP Method:** POST
   - **HTTP Headers:** 
     ```
     Authorization: Bearer YOUR_SERVICE_ROLE_KEY
     Content-Type: application/json
     ```

Now, whenever a new ticket is created, email will be sent automatically! 🎉

---

## 📅 Scheduled Functions (Cron)

### **Setup Daily Report:**

1. Go to Supabase Dashboard
2. **Database** → **Cron Jobs** (or use pg_cron)
3. Create cron job:
   ```sql
   SELECT cron.schedule(
     'daily-report',
     '0 9 * * *', -- 9 AM daily
     $$
     SELECT net.http_post(
       url := 'https://your-project.supabase.co/functions/v1/daily-report',
       headers := '{"Authorization": "Bearer YOUR_SERVICE_KEY"}'::jsonb
     );
     $$
   );
   ```

---

## 💰 Pricing

- **Free Tier:** 500K invocations/month
- **Pro Tier:** 2M invocations/month
- **Very affordable** for most use cases!

---

## 🎯 Recommended Functions for Your Business

1. **✅ Email Notifications** - Already have, but Edge Function is better
2. **✅ WhatsApp Integration** - Customer notifications
3. **✅ PDF Generation** - Invoices, certificates
4. **✅ Daily Reports** - Automated analytics
5. **✅ Payment Webhooks** - Handle payments
6. **✅ Document Processing** - Auto-process uploaded docs

---

## 📚 Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Deno Runtime Docs](https://deno.land/manual)
- [Example Functions](https://github.com/supabase/supabase/tree/master/examples/edge-functions)

---

**Ready to deploy? Follow the setup instructions above!** 🚀

