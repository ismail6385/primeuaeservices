# Resend Webhook Setup Guide

## 📧 What are Resend Webhooks?

Resend webhooks provide real-time notifications about email events:
- ✅ **email.sent** - Email was sent successfully
- ✅ **email.delivered** - Email was delivered to recipient
- 👁️ **email.opened** - Recipient opened the email
- 🖱️ **email.clicked** - Recipient clicked a link in the email
- ❌ **email.bounced** - Email bounced (invalid address)
- ⚠️ **email.complained** - Recipient marked email as spam
- ⏳ **email.delivery_delayed** - Email delivery is delayed
- 🚫 **email.unsubscribed** - Recipient unsubscribed

## 🎯 Benefits for Your Project

1. **Track Email Delivery Status**
   - Know when customer emails are delivered
   - Detect bounced emails (invalid addresses)
   - Monitor email engagement

2. **Update Ticket Status**
   - Automatically update ticket notes when emails are opened/clicked
   - Mark tickets when emails bounce
   - Track customer engagement

3. **Analytics**
   - See which emails are most engaging
   - Track open rates and click rates
   - Identify delivery issues

## 🔧 Setup Instructions

### Step 1: Get Your Webhook URL

Your webhook endpoint is:
```
https://yourdomain.com/api/webhooks/resend
```

For local development:
```
http://localhost:3000/api/webhooks/resend
```

### Step 2: Configure in Resend Dashboard

1. Go to [Resend Dashboard](https://resend.com/dashboard)
2. Navigate to **Settings** → **Webhooks**
3. Click **Add Webhook**
4. Enter your webhook URL:
   ```
   https://primeuaeservices.com/api/webhooks/resend
   ```
5. Select the events you want to track:
   - ✅ email.sent
   - ✅ email.delivered
   - ✅ email.opened
   - ✅ email.clicked
   - ✅ email.bounced
   - ✅ email.complained
   - ✅ email.delivery_delayed
   - ✅ email.unsubscribed
6. Click **Save**

### Step 3: Get Webhook Secret

1. After creating the webhook, Resend will show you a **Signing Secret**
2. Copy this secret
3. Add it to your `.env.local` file:

```env
RESEND_WEBHOOK_SECRET=whsec_your_secret_here
```

### Step 4: Deploy and Test

1. Deploy your code to Vercel
2. Test by sending an email from your admin panel
3. Check Vercel logs to see webhook events

## 🔒 Security

The webhook handler verifies the signature from Resend to ensure requests are legitimate. Make sure to:
- ✅ Set `RESEND_WEBHOOK_SECRET` in your environment variables
- ✅ Never commit the secret to Git
- ✅ Use HTTPS in production

## 📊 Database Setup

Run the migration to create the `email_events` table:

```sql
-- Run in Supabase SQL Editor
-- File: supabase/migrations/08_create_email_events_table.sql
```

This table stores all email events for analytics and debugging.

## 🧪 Testing

### Test Webhook Locally

1. Use a tool like [ngrok](https://ngrok.com/) to expose your local server:
   ```bash
   ngrok http 3000
   ```

2. Use the ngrok URL in Resend webhook settings:
   ```
   https://your-ngrok-url.ngrok.io/api/webhooks/resend
   ```

3. Send a test email and check your terminal logs

### Test Webhook in Production

1. Send an email from admin panel
2. Check Vercel function logs
3. Verify events are being logged in database

## 📝 How It Works

1. **Email Sent**: When you send an email via Resend, it gets an `email_id`
2. **Webhook Triggered**: Resend sends webhook to your endpoint
3. **Event Processed**: Your handler processes the event
4. **Database Updated**: Ticket notes are updated with email status
5. **Analytics Stored**: Event is logged in `email_events` table

## 🎨 Example Use Cases

### Track Reply Email Delivery

When admin sends a reply:
- Webhook confirms delivery
- Ticket notes updated: "Email delivered at [time]"
- If bounced, ticket marked with bounce reason

### Monitor Customer Engagement

- See if customers open your emails
- Track which links they click
- Identify engaged vs. unengaged customers

### Handle Bounces

- Automatically detect invalid email addresses
- Add notes to tickets about bounce reasons
- Optionally mark tickets as "pending" if email invalid

## 🐛 Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is correct in Resend dashboard
2. Verify endpoint is accessible (not behind firewall)
3. Check Vercel function logs for errors
4. Verify `RESEND_WEBHOOK_SECRET` is set correctly

### Events Not Updating Tickets

1. Check if recipient email matches ticket email
2. Verify Supabase connection is working
3. Check database logs for errors
4. Ensure RLS policies allow updates

### Signature Verification Failing

1. Verify `RESEND_WEBHOOK_SECRET` matches Resend dashboard
2. Check if secret has any extra spaces
3. Ensure you're using the correct secret (not API key)

## 📚 Additional Resources

- [Resend Webhooks Documentation](https://resend.com/docs/dashboard/webhooks)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Webhook Security Best Practices](https://resend.com/docs/dashboard/webhooks#security)

## ✅ Checklist

- [ ] Webhook endpoint created (`/api/webhooks/resend`)
- [ ] Webhook configured in Resend dashboard
- [ ] `RESEND_WEBHOOK_SECRET` added to environment variables
- [ ] Database migration run (`08_create_email_events_table.sql`)
- [ ] Test email sent and webhook received
- [ ] Events logged in database
- [ ] Ticket notes updated correctly

---

**Need Help?** Check the webhook logs in Vercel or contact support.

