# PowerShell script to deploy all Supabase Edge Functions
# Run: .\supabase\functions\deploy.ps1

Write-Host "🚀 Deploying Supabase Edge Functions..." -ForegroundColor Cyan

# Deploy send-email
Write-Host "`n📧 Deploying send-email..." -ForegroundColor Yellow
supabase functions deploy send-email

# Deploy ticket-notification
Write-Host "`n🔔 Deploying ticket-notification..." -ForegroundColor Yellow
supabase functions deploy ticket-notification

# Deploy whatsapp-notify
Write-Host "`n💬 Deploying whatsapp-notify..." -ForegroundColor Yellow
supabase functions deploy whatsapp-notify

# Deploy generate-pdf
Write-Host "`n📄 Deploying generate-pdf..." -ForegroundColor Yellow
supabase functions deploy generate-pdf

# Deploy daily-report
Write-Host "`n📊 Deploying daily-report..." -ForegroundColor Yellow
supabase functions deploy daily-report

Write-Host "`n✅ All functions deployed successfully!" -ForegroundColor Green

