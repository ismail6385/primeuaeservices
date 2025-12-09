-- Enhance tickets table with additional useful fields
-- Priority: Add priority, assignment, and tracking fields

-- Add new columns to tickets table
ALTER TABLE public.tickets 
ADD COLUMN IF NOT EXISTS priority text default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
ADD COLUMN IF NOT EXISTS assigned_to uuid references auth.users(id),
ADD COLUMN IF NOT EXISTS follow_up_date timestamp with time zone,
ADD COLUMN IF NOT EXISTS estimated_value decimal,
ADD COLUMN IF NOT EXISTS notes text,
ADD COLUMN IF NOT EXISTS lead_score integer default 0;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tickets_status ON public.tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON public.tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_email ON public.tickets(email);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON public.tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON public.tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tickets_service ON public.tickets(service);

-- Add comment for documentation
COMMENT ON COLUMN public.tickets.priority IS 'Priority level: low, normal, high, urgent';
COMMENT ON COLUMN public.tickets.assigned_to IS 'User ID of the admin assigned to this ticket';
COMMENT ON COLUMN public.tickets.follow_up_date IS 'Date and time for follow-up action';
COMMENT ON COLUMN public.tickets.estimated_value IS 'Estimated revenue/value of this inquiry';
COMMENT ON COLUMN public.tickets.notes IS 'Internal notes and comments about the ticket';
COMMENT ON COLUMN public.tickets.lead_score IS 'Lead quality score (0-100)';

