# 🚀 Email Events - Quick Setup Guide

## ✅ **Step 1: Run Database Migration** (2 minutes)

### Supabase Dashboard mein:
1. Go to: https://supabase.com/dashboard
2. Project select karo: **rczwblcyzomiiqihljua**
3. Left sidebar → **"SQL Editor"** click karo
4. File open karo: `supabase/migrations/08_create_email_events_table.sql`
5. **SARA CONTENT COPY KARO** (Ctrl+A, Ctrl+C)
6. Supabase SQL Editor mein paste karo
7. **"Run"** button click karo (ya Ctrl+Enter)

### Verify:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'email_events';
```

**Expected:** `email_events` dikhna chahiye ✅

---

## ✅ **Step 2: Setup Resend Webhook** (3 minutes)

### Resend Dashboard mein:
1. Go to: https://resend.com/dashboard
2. **Settings** → **Webhooks** click karo
3. **"Add Webhook"** button click karo
4. Webhook URL enter karo:
   ```
   https://primeuaeservices.com/api/webhooks/resend
   ```
5. **Events select karo** (sab recommended):
   - ✅ email.sent
   - ✅ email.delivered
   - ✅ email.opened
   - ✅ email.clicked
   - ✅ email.bounced
   - ✅ email.complained
   - ✅ email.delivery_delayed
   - ✅ email.unsubscribed
6. **"Save"** click karo
7. **Signing Secret copy karo** (whsec_...)

---

## ✅ **Step 3: Add Environment Variable** (1 minute)

### Vercel Dashboard mein:
1. Go to: https://vercel.com/dashboard
2. Project select karo: **primeuaeservices**
3. **Settings** → **Environment Variables** click karo
4. **Add New** click karo:
   - **Name:** `RESEND_WEBHOOK_SECRET`
   - **Value:** (Resend se copy kiya hua secret paste karo)
   - **Environment:** Production, Preview, Development (sab select karo)
5. **Save** click karo
6. **Redeploy** karo (Settings → Deployments → Latest → Redeploy)

---

## ✅ **Step 4: Test** (2 minutes)

### Test Steps:
1. Admin panel login karo: `/admin/login`
2. **Tickets** page jao
3. Kisi ticket ko open karo
4. **"Reply via Email"** click karo
5. Email send karo
6. **Email Events** page jao: `/admin/email-events`
7. Events dikhne chahiye! ✅

---

## 🎯 **Expected Results:**

### Email Events Page mein dikhega:
- ✅ **Statistics Cards:** Total, Delivered, Opened, Clicked
- ✅ **Event List:** Sent, Delivered, Opened events
- ✅ **Real-time Updates:** New events automatically appear
- ✅ **Ticket Links:** Events se tickets tak direct link

### Ticket Notes mein update hoga:
- ✅ "Email delivered at [time]"
- ✅ "Email opened at [time]"
- ✅ "Email bounced - [reason]" (agar bounce ho)

---

## 🐛 **Troubleshooting:**

### Events nahi dikh rahe?
1. ✅ Check Supabase: `email_events` table exist karti hai?
2. ✅ Check Resend: Webhook active hai?
3. ✅ Check Vercel: `RESEND_WEBHOOK_SECRET` set hai?
4. ✅ Check Vercel Logs: Webhook calls aa rahe hain?

### Webhook not receiving events?
1. ✅ Webhook URL correct hai? (https://primeuaeservices.com/api/webhooks/resend)
2. ✅ Vercel deployment successful hai?
3. ✅ Resend dashboard mein webhook "Active" status dikha raha hai?

### Database errors?
1. ✅ Migration run ho gaya?
2. ✅ RLS policies set hain?
3. ✅ Service role key correct hai?

---

## 📊 **What You'll See:**

### Statistics:
- **Total Events:** Kitne emails track kiye
- **Delivered:** Kitne successfully deliver hue
- **Opened:** Kitne emails open kiye customers ne
- **Clicked:** Kitne links click kiye
- **Rates:** Delivery rate, open rate, click rate

### Event Details:
- **Event Type:** Sent, Delivered, Opened, etc.
- **Recipient:** Customer email
- **Subject:** Email subject
- **Ticket Link:** Related ticket (agar hai)
- **Timestamp:** Kab hua

---

## ✅ **Checklist:**

- [ ] Database migration run ho gaya
- [ ] Resend webhook add ho gaya
- [ ] Webhook secret Vercel mein add ho gaya
- [ ] Vercel redeploy ho gaya
- [ ] Test email send kiya
- [ ] Email Events page mein events dikh rahe hain

---

## 🎉 **Done!**

Ab aap:
- ✅ Email delivery track kar sakte ho
- ✅ Customer engagement dekh sakte ho
- ✅ Bounced emails identify kar sakte ho
- ✅ Email analytics dekh sakte ho

**Koi issue ho to batayein!** 🚀

