// Supabase Edge Function: Daily Report
// Generates and sends daily reports
// Can be scheduled via cron or called manually

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';

serve(async (req) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Fetch today's tickets
    const { data: tickets, error: ticketsError } = await supabase
      .from('tickets')
      .select('*')
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString());

    if (ticketsError) throw ticketsError;

    // Calculate statistics
    const stats = {
      total: tickets?.length || 0,
      open: tickets?.filter(t => t.status === 'open').length || 0,
      pending: tickets?.filter(t => t.status === 'pending').length || 0,
      closed: tickets?.filter(t => t.status === 'closed').length || 0,
      byService: {} as Record<string, number>,
    };

    tickets?.forEach((ticket: any) => {
      const service = ticket.service || 'General';
      stats.byService[service] = (stats.byService[service] || 0) + 1;
    });

    // Generate report HTML
    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #0A4D94; }
          .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 20px 0; }
          .stat-card { background: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center; }
          .stat-value { font-size: 32px; font-weight: bold; color: #0A4D94; }
          .stat-label { color: #666; margin-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #0A4D94; color: white; }
        </style>
      </head>
      <body>
        <h1>Daily Report - ${today.toLocaleDateString()}</h1>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-value">${stats.total}</div>
            <div class="stat-label">Total Tickets</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.open}</div>
            <div class="stat-label">Open</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.pending}</div>
            <div class="stat-label">Pending</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${stats.closed}</div>
            <div class="stat-label">Closed</div>
          </div>
        </div>

        <h2>By Service</h2>
        <table>
          <tr>
            <th>Service</th>
            <th>Count</th>
          </tr>
          ${Object.entries(stats.byService).map(([service, count]) => `
            <tr>
              <td>${service}</td>
              <td>${count}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;

    // Send email report
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prime UAE Services <noreply@primeuaeservices.com>',
        to: ['primeuaeservices@gmail.com'],
        subject: `Daily Report - ${today.toLocaleDateString()}`,
        html: reportHtml,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(
      JSON.stringify({
        success: true,
        report: stats,
        message: 'Daily report sent successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error generating report:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate report' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});

