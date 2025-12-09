#!/bin/bash

# Deploy all Supabase Edge Functions
# Make sure you're logged in: supabase login
# Make sure project is linked: supabase link --project-ref rczwblcyzomiiqihljua

echo "🚀 Deploying Supabase Edge Functions..."

# Deploy send-email
echo "📧 Deploying send-email..."
supabase functions deploy send-email

# Deploy ticket-notification
echo "🔔 Deploying ticket-notification..."
supabase functions deploy ticket-notification

# Deploy whatsapp-notify
echo "💬 Deploying whatsapp-notify..."
supabase functions deploy whatsapp-notify

# Deploy generate-pdf
echo "📄 Deploying generate-pdf..."
supabase functions deploy generate-pdf

# Deploy daily-report
echo "📊 Deploying daily-report..."
supabase functions deploy daily-report

echo "✅ All functions deployed successfully!"

