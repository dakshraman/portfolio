export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await req.json();
    const { name, email, service, budget, timeline, message } = data;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error: RESEND_API_KEY environment variable is missing on Netlify.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'ramandaksh6161@gmail.com',
        reply_to: email,
        subject: `New Project Inquiry: ${service || 'General'} from ${name || 'Prospective Client'}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; color: #111827;">
            <div style="border-bottom: 2px solid #0071e3; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #0071e3; margin: 0 0 6px 0; font-size: 22px; font-weight: 700;">New Project Inquiry</h2>
              <p style="margin: 0; color: #6b7280; font-size: 13px;">Received via Raman Daksh Portfolio</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; width: 140px; color: #4b5563;">Client Name:</td>
                <td style="padding: 10px 0; color: #111827; font-weight: 500;">${name || 'Not provided'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #4b5563;">Client Email:</td>
                <td style="padding: 10px 0; color: #111827;"><a href="mailto:${email}" style="color: #0071e3; text-decoration: none; font-weight: 500;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #4b5563;">Primary Need:</td>
                <td style="padding: 10px 0; color: #111827; font-weight: 500;">${service || 'General'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #4b5563;">Estimated Budget:</td>
                <td style="padding: 10px 0; color: #111827; font-weight: 500;">${budget || 'Flexible'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 10px 0; font-weight: 600; color: #4b5563;">Target Timeline:</td>
                <td style="padding: 10px 0; color: #111827; font-weight: 500;">${timeline || 'Immediate'}</td>
              </tr>
            </table>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 12px; border: 1px solid #f3f4f6; margin-top: 16px;">
              <p style="font-weight: 600; margin: 0 0 8px 0; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Project Details & Scope:</p>
              <p style="white-space: pre-wrap; color: #1f2937; line-height: 1.6; margin: 0; font-size: 14px;">${message || 'No details provided'}</p>
            </div>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f3f4f6; text-align: center;">
              <a href="mailto:${email}?subject=${encodeURIComponent('Re: ' + (service || 'Project Inquiry'))}" style="display: inline-block; background-color: #0071e3; color: #ffffff; padding: 10px 20px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: 600;">Reply to ${name || 'Client'} directly</a>
            </div>
            <p style="font-size: 11px; color: #9ca3af; margin-top: 24px; text-align: center;">
              Sent via Raman Daksh Portfolio Contact Form &bull; Powered by Resend
            </p>
          </div>
        `,
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: result.message || 'Failed to send email via Resend' }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
