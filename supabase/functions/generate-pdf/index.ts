// Supabase Edge Function: Generate PDF
// Generates PDF documents (invoices, certificates, etc.)
// Usage: POST /functions/v1/generate-pdf

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { type, data } = await req.json();

    if (!type || !data) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: type, data' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate HTML based on type
    let html = '';

    if (type === 'invoice') {
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .invoice-details { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #0A4D94; color: white; }
            .total { text-align: right; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Prime UAE Services</h1>
            <p>Invoice #${data.invoiceNumber || 'N/A'}</p>
          </div>
          <div class="invoice-details">
            <p><strong>Date:</strong> ${data.date || new Date().toLocaleDateString()}</p>
            <p><strong>Client:</strong> ${data.clientName || 'N/A'}</p>
            <p><strong>Service:</strong> ${data.service || 'N/A'}</p>
          </div>
          <table>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>${data.description || 'Service Fee'}</td>
              <td>AED ${data.amount || '0.00'}</td>
            </tr>
          </table>
          <div class="total">
            <p>Total: AED ${data.amount || '0.00'}</p>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'certificate') {
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; text-align: center; }
            .certificate { border: 5px solid #F4B94F; padding: 40px; }
            h1 { color: #0A4D94; }
            .signature { margin-top: 60px; }
          </style>
        </head>
        <body>
          <div class="certificate">
            <h1>CERTIFICATE OF COMPLETION</h1>
            <p>This is to certify that</p>
            <h2>${data.name || 'Name'}</h2>
            <p>has successfully completed</p>
            <p><strong>${data.service || 'Service'}</strong></p>
            <p>on ${data.date || new Date().toLocaleDateString()}</p>
            <div class="signature">
              <p>Prime UAE Services</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Convert HTML to PDF using external service or library
    // For now, return HTML (you can use services like Puppeteer, PDFKit, etc.)
    // Or use a service like html-pdf-api.com

    const pdfResponse = await fetch('https://api.htmlpdfapi.com/v1/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': Deno.env.get('HTML_PDF_API_KEY') || '',
      },
      body: JSON.stringify({
        html: html,
        format: 'A4',
      }),
    });

    if (!pdfResponse.ok) {
      // Fallback: return HTML
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const pdfBlob = await pdfResponse.blob();

    return new Response(pdfBlob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${type}-${Date.now()}.pdf"`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to generate PDF' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});

