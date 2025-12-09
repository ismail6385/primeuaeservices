// Next.js API Route: Daily Report (Alternative to Edge Function)
// This works without Supabase CLI setup

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_UoPUesWQ_aoQrPnY2qM8Cn54rpAZ1Lq7U');

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase credentials are not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

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
          body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
          .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
          h1 { color: #0A4D94; text-align: center; }
          .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }
          .stat-card { background: linear-gradient(135deg, #0A4D94 0%, #0FB3A6 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; }
          .stat-value { font-size: 36px; font-weight: bold; margin-bottom: 5px; }
          .stat-label { font-size: 14px; opacity: 0.9; }
          table { width: 100%; border-collapse: collapse; margin-top: 30px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #0A4D94; color: white; }
          tr:hover { background: #f5f5f5; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Daily Report - ${today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h1>
          
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

          <h2 style="color: #0A4D94; margin-top: 40px;">Tickets by Service</h2>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(stats.byService).length > 0
                ? Object.entries(stats.byService)
                    .sort(([, a], [, b]) => b - a)
                    .map(
                      ([service, count]) => `
                <tr>
                  <td>${service}</td>
                  <td><strong>${count}</strong></td>
                </tr>
              `
                    )
                    .join('')
                : '<tr><td colspan="2" style="text-align: center; color: #666;">No tickets today</td></tr>'}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;

    // Send email report
    const emailResponse = await resend.emails.send({
      from: 'Prime UAE Services <noreply@primeuaeservices.com>',
      to: ['primeuaeservices@gmail.com'],
      subject: `Daily Report - ${today.toLocaleDateString()}`,
      html: reportHtml,
    });

    if (emailResponse.error) {
      throw emailResponse.error;
    }

    return NextResponse.json({
      success: true,
      report: stats,
      message: 'Daily report sent successfully',
      emailId: emailResponse.data?.id,
    });
  } catch (error: any) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate report' },
      { status: 500 }
    );
  }
}

