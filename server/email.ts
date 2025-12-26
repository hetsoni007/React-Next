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

interface EstimationEmailData {
  name: string;
  email: string;
  estimation: {
    projectType: string;
    projectPurpose: string;
    features: string[];
    complexityLevel: string;
    milestones: { name: string; description: string; durationWeeks: { min: number; max: number }; costRange: { min: number; max: number } }[];
    totalDuration: { min: number; max: number };
    totalCost: { min: number; max: number };
    hostingCosts: { tier: string; monthly: { min: number; max: number }; description: string }[];
    techStackRecommendation?: string[];
    currency: string;
    currencySymbol: string;
  };
}

function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, char => htmlEntities[char] || char);
}

export async function sendEstimationEmail(data: EstimationEmailData): Promise<boolean> {
  try {
    const { client, fromEmail } = await getResendClient();
    const { estimation } = data;
    
    const safeName = escapeHtml(data.name);
    const safeProjectType = escapeHtml(estimation.projectType);
    const safeProjectPurpose = escapeHtml(estimation.projectPurpose);
    const safeFeatures = estimation.features.map(f => escapeHtml(f));
    const safeComplexity = escapeHtml(estimation.complexityLevel);
    const safeTechStack = estimation.techStackRecommendation?.map(t => escapeHtml(t)) || [];
    
    const milestonesHtml = estimation.milestones.map((m, i) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">
          <strong>${i + 1}. ${escapeHtml(m.name)}</strong><br/>
          <span style="color: #666; font-size: 13px;">${escapeHtml(m.description)}</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">
          ${escapeHtml(estimation.currencySymbol)}${m.costRange.min.toLocaleString()} - ${escapeHtml(estimation.currencySymbol)}${m.costRange.max.toLocaleString()}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">
          ${m.durationWeeks.min}-${m.durationWeeks.max} weeks
        </td>
      </tr>
    `).join('');
    
    const result = await client.emails.send({
      from: fromEmail,
      to: data.email,
      bcc: 'het.soni@soniconsultancyservices.com',
      subject: `Your Project Estimation - Soni Consultancy Services`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #1a1a1a; font-size: 28px; margin: 0;">Soni Consultancy Services</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Professional Project Estimation</p>
          </div>
          
          <div style="background-color: #f9f9f9; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
            <h2 style="color: #1a1a1a; font-size: 20px; margin: 0 0 20px 0;">Hello ${safeName},</h2>
            <p style="color: #444; line-height: 1.6; margin: 0;">
              Thank you for using our Project Estimation Tool. Below is your personalized ball-park estimation based on your project requirements.
            </p>
          </div>
          
          <h3 style="color: #1a1a1a; font-size: 18px; margin: 30px 0 15px 0;">Project Overview</h3>
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <p style="margin: 0 0 10px 0;"><strong>Type:</strong> ${safeProjectType}</p>
            <p style="margin: 0 0 10px 0;"><strong>Purpose:</strong> ${safeProjectPurpose}</p>
            <p style="margin: 0 0 10px 0;"><strong>Complexity:</strong> ${safeComplexity.charAt(0).toUpperCase() + safeComplexity.slice(1)}</p>
            <p style="margin: 0;"><strong>Features:</strong> ${safeFeatures.join(', ')}</p>
          </div>
          
          <h3 style="color: #1a1a1a; font-size: 18px; margin: 30px 0 15px 0;">Milestone-Based Estimation</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr style="background-color: #f0f0f0;">
                <th style="padding: 12px; text-align: left;">Phase</th>
                <th style="padding: 12px; text-align: right;">Cost Range</th>
                <th style="padding: 12px; text-align: right;">Duration</th>
              </tr>
            </thead>
            <tbody>
              ${milestonesHtml}
            </tbody>
            <tfoot>
              <tr style="background-color: #1a1a1a; color: #ffffff;">
                <td style="padding: 15px;"><strong>Total Investment</strong></td>
                <td style="padding: 15px; text-align: right;">
                  <strong>${estimation.currencySymbol}${estimation.totalCost.min.toLocaleString()} - ${estimation.currencySymbol}${estimation.totalCost.max.toLocaleString()}</strong>
                </td>
                <td style="padding: 15px; text-align: right;">
                  <strong>${estimation.totalDuration.min}-${estimation.totalDuration.max} weeks</strong>
                </td>
              </tr>
            </tfoot>
          </table>
          
          ${safeTechStack.length > 0 ? `
            <h3 style="color: #1a1a1a; font-size: 18px; margin: 30px 0 15px 0;">Recommended Tech Stack</h3>
            <p style="color: #444; margin-bottom: 30px;">${safeTechStack.join(' • ')}</p>
          ` : ''}
          
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 25px; margin: 30px 0; text-align: center;">
            <p style="color: #444; margin: 0 0 15px 0;">Ready to discuss your project in detail?</p>
            <a href="https://soniconsultancyservices.com/contact" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 500;">Schedule a Consultation</a>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              This is a ball-park estimation based on the information provided. Final pricing may vary based on detailed requirements analysis.
            </p>
            <p style="color: #999; font-size: 12px; margin: 10px 0 0 0;">
              Prepared by Soni Consultancy Services
            </p>
          </div>
        </div>
      `,
    });

    console.log('Estimation email sent:', result);
    return true;
  } catch (error) {
    console.error('Failed to send estimation email:', error);
    return false;
  }
}
