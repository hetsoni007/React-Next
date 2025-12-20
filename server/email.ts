// Resend Email Integration for Contact Form Notifications
import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
export async function getResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

interface ContactEmailData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export async function sendContactNotification(data: ContactEmailData): Promise<boolean> {
  try {
    const { client, fromEmail } = await getResendClient();
    
    const result = await client.emails.send({
      from: fromEmail,
      to: 'het.soni@soniconsultancyservices.com',
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 15px 0;"><strong style="color: #666;">Name:</strong><br/><span style="color: #1a1a1a;">${data.name}</span></p>
            <p style="margin: 0 0 15px 0;"><strong style="color: #666;">Email:</strong><br/><a href="mailto:${data.email}" style="color: #0066cc;">${data.email}</a></p>
            <p style="margin: 0 0 15px 0;"><strong style="color: #666;">Project Type:</strong><br/><span style="color: #1a1a1a;">${data.projectType}</span></p>
            <p style="margin: 0;"><strong style="color: #666;">Message:</strong><br/><span style="color: #1a1a1a; white-space: pre-wrap;">${data.message}</span></p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <p style="color: #999; font-size: 12px;">This email was sent from the Soni Consultancy Services website contact form.</p>
          </div>
        </div>
      `,
      replyTo: data.email
    });

    console.log('Contact notification email sent:', result);
    return true;
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return false;
  }
}
