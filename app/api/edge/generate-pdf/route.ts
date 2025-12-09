// Next.js API Route: Generate PDF (Alternative to Edge Function)
// This works without Supabase CLI setup

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: type, data' },
        { status: 400 }
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
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #0A4D94; padding-bottom: 20px; }
            .invoice-details { margin: 30px 0; }
            table { width: 100%; border-collapse: collapse; margin: 30px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #0A4D94; color: white; }
            .total { text-align: right; font-weight: bold; font-size: 18px; margin-top: 20px; }
            .footer { margin-top: 40px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="color: #0A4D94; margin: 0;">Prime UAE Services</h1>
            <p style="color: #666; margin: 5px 0;">Professional Visa & PRO Services</p>
            <h2 style="margin-top: 20px;">INVOICE</h2>
          </div>
          <div class="invoice-details">
            <p><strong>Invoice Number:</strong> ${data.invoiceNumber || 'N/A'}</p>
            <p><strong>Date:</strong> ${data.date || new Date().toLocaleDateString()}</p>
            <p><strong>Client Name:</strong> ${data.clientName || 'N/A'}</p>
            <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
            <p><strong>Service:</strong> ${data.service || 'N/A'}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th style="text-align: right;">Amount (AED)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${data.description || 'Service Fee'}</td>
                <td style="text-align: right;">${data.amount || '0.00'}</td>
              </tr>
            </tbody>
          </table>
          <div class="total">
            <p>Total Amount: <strong>AED ${data.amount || '0.00'}</strong></p>
          </div>
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Prime UAE Services | Dubai, UAE</p>
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
            body { font-family: 'Times New Roman', serif; padding: 60px; text-align: center; }
            .certificate { border: 8px solid #F4B94F; padding: 60px; background: #fff; }
            h1 { color: #0A4D94; font-size: 36px; margin-bottom: 30px; }
            h2 { color: #0A4D94; font-size: 28px; margin: 20px 0; }
            .signature { margin-top: 80px; }
            .date { margin-top: 40px; }
          </style>
        </head>
        <body>
          <div class="certificate">
            <h1>CERTIFICATE OF COMPLETION</h1>
            <p style="font-size: 18px; margin: 30px 0;">This is to certify that</p>
            <h2>${data.name || 'Name'}</h2>
            <p style="font-size: 18px; margin: 30px 0;">has successfully completed</p>
            <p style="font-size: 20px; font-weight: bold; color: #0A4D94;">${data.service || 'Service'}</p>
            <div class="date">
              <p style="font-size: 16px;">Date: ${data.date || new Date().toLocaleDateString()}</p>
            </div>
            <div class="signature">
              <p style="font-size: 16px; margin-top: 20px;">Prime UAE Services</p>
              <p style="font-size: 14px; color: #666;">Dubai, United Arab Emirates</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // For now, return HTML (you can integrate with PDF service later)
    // Options: Puppeteer, PDFKit, or external service like html-pdf-api
    
    return NextResponse.json({
      success: true,
      html: html,
      message: 'HTML generated. Integrate with PDF service to generate PDF.',
    });
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

