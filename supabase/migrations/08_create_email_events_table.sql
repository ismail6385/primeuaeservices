-- Create email_events table for tracking Resend webhook events
-- This helps with analytics and debugging email delivery

CREATE TABLE IF NOT EXISTS public.email_events (
  id uuid default gen_random_uuid() primary key,
  email_id text not null, -- Resend email ID
  event_type text not null check (event_type in ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'delivery_delayed', 'unsubscribed')),
  recipient_email text,
  subject text,
  ticket_id bigint references public.tickets(id),
  event_data jsonb, -- Store full webhook payload for reference
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.email_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users (admins) to read email events
CREATE POLICY "Admins can read email events"
ON public.email_events FOR SELECT
TO authenticated
USING (true);

-- Create policy to allow service role to insert email events (from webhook)
CREATE POLICY "Service role can insert email events"
ON public.email_events FOR INSERT
TO service_role
WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email_events_email_id ON public.email_events(email_id);
CREATE INDEX IF NOT EXISTS idx_email_events_event_type ON public.email_events(event_type);
CREATE INDEX IF NOT EXISTS idx_email_events_recipient_email ON public.email_events(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_events_ticket_id ON public.email_events(ticket_id);
CREATE INDEX IF NOT EXISTS idx_email_events_created_at ON public.email_events(created_at DESC);

-- Add comment for documentation
COMMENT ON TABLE public.email_events IS 'Tracks email events from Resend webhooks (sent, delivered, opened, clicked, bounced, etc.)';
COMMENT ON COLUMN public.email_events.email_id IS 'Resend email ID';
COMMENT ON COLUMN public.email_events.event_type IS 'Type of email event';
COMMENT ON COLUMN public.email_events.event_data IS 'Full webhook payload JSON for reference';

