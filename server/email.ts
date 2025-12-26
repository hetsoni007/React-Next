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

interface RoadmapMilestone {
  name: string;
  description: string;
  durationWeeks: { min: number; max: number };
  deliverables: string[];
  activities: string[];
}

interface ProjectPhase {
  name: string;
  tasks: string[];
}

interface TechStackRecommendation {
  category: string;
  technologies: string[];
  reasoning: string;
}

interface RoadmapEmailData {
  name: string;
  email: string;
  roadmap: {
    projectType: string;
    projectPurpose: string;
    features: string[];
    complexityLevel: string;
    planningDepth?: string;
    preferredTimeline?: string;
    clientDeadline?: string;
    milestones?: RoadmapMilestone[];
    phases?: ProjectPhase[];
    totalDuration?: { min: number; max: number };
    techStackRecommendations?: TechStackRecommendation[];
    manualRequirements?: string;
    preferredTechStack?: string[];
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

export async function sendRoadmapEmail(data: RoadmapEmailData): Promise<boolean> {
  try {
    const { client, fromEmail } = await getResendClient();
    const { roadmap } = data;
    
    const safeName = escapeHtml(data.name);
    const safeProjectType = escapeHtml(roadmap.projectType);
    const safeProjectPurpose = escapeHtml(roadmap.projectPurpose);
    const safeFeatures = roadmap.features.map(f => escapeHtml(f));
    const safeComplexity = escapeHtml(roadmap.complexityLevel);
    
    const isNewFormat = !!roadmap.phases && !roadmap.milestones;
    const safeDeadline = roadmap.clientDeadline ? escapeHtml(roadmap.clientDeadline) : (roadmap.preferredTimeline ? escapeHtml(roadmap.preferredTimeline) : 'To be discussed');
    
    let phasesOrMilestonesHtml = '';
    
    if (isNewFormat && roadmap.phases) {
      phasesOrMilestonesHtml = roadmap.phases.map((phase, i) => `
        <div style="margin-bottom: 24px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <div style="display: flex; align-items: center; margin-bottom: 12px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background-color: #1a1a1a; color: #ffffff; font-size: 14px; font-weight: 500; margin-right: 12px;">${i + 1}</span>
            <strong style="color: #1a1a1a; font-size: 16px;">${escapeHtml(phase.name)}</strong>
          </div>
          
          <div style="margin-left: 40px;">
            <ul style="margin: 0; padding-left: 20px;">
              ${phase.tasks.map(task => `<li style="color: #444; font-size: 14px; margin-bottom: 4px;">${escapeHtml(task)}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('');
    } else if (roadmap.milestones) {
      phasesOrMilestonesHtml = roadmap.milestones.map((m, i) => `
        <div style="margin-bottom: 24px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <div style="display: flex; align-items: center; margin-bottom: 12px;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background-color: #1a1a1a; color: #ffffff; font-size: 14px; font-weight: 500; margin-right: 12px;">${i + 1}</span>
            <div>
              <strong style="color: #1a1a1a; font-size: 16px;">${escapeHtml(m.name)}</strong>
              <span style="color: #666; font-size: 13px; margin-left: 12px;">${m.durationWeeks.min}-${m.durationWeeks.max} weeks</span>
            </div>
          </div>
          
          <div style="margin-left: 40px;">
            <p style="color: #666; font-size: 13px; margin: 0 0 12px 0; font-weight: 500;">Deliverables:</p>
            <ul style="margin: 0 0 16px 0; padding-left: 20px;">
              ${m.deliverables.map(d => `<li style="color: #444; font-size: 14px; margin-bottom: 4px;">${escapeHtml(d)}</li>`).join('')}
            </ul>
            
            <p style="color: #666; font-size: 13px; margin: 0 0 12px 0; font-weight: 500;">Key Activities:</p>
            <ul style="margin: 0; padding-left: 20px;">
              ${m.activities.map(a => `<li style="color: #666; font-size: 14px; margin-bottom: 4px;">${escapeHtml(a)}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('');
    }
    
    const techStackHtml = (roadmap.techStackRecommendations && roadmap.techStackRecommendations.length > 0) ? `
      <h3 style="color: #1a1a1a; font-size: 18px; margin: 30px 0 15px 0;">Recommended Tech Stack</h3>
      ${roadmap.techStackRecommendations.map(rec => `
        <div style="margin-bottom: 16px; padding: 16px; background-color: #f9f9f9; border-radius: 8px;">
          <p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(rec.category)}</p>
          <p style="margin: 0 0 8px 0;">
            ${rec.technologies.map(t => `<span style="display: inline-block; background-color: #e5e5e5; color: #1a1a1a; padding: 4px 10px; border-radius: 4px; font-size: 13px; margin-right: 6px; margin-bottom: 4px;">${escapeHtml(t)}</span>`).join('')}
          </p>
          <p style="color: #666; font-size: 13px; margin: 0;">${escapeHtml(rec.reasoning)}</p>
        </div>
      `).join('')}
    ` : '';
    
    const manualRequirementsHtml = roadmap.manualRequirements ? `
      <div style="background-color: #f0f7ff; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="color: #666; font-size: 13px; margin: 0 0 8px 0; font-weight: 500;">Your Custom Requirements:</p>
        <p style="color: #444; font-size: 14px; margin: 0; white-space: pre-wrap;">${escapeHtml(roadmap.manualRequirements)}</p>
      </div>
    ` : '';
    
    const deadlineHtml = isNewFormat ? `
      <div style="background-color: #1a1a1a; color: #ffffff; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
        <p style="font-size: 14px; margin: 0 0 8px 0;">Your Preferred Deadline</p>
        <p style="font-size: 28px; font-weight: 600; margin: 0;">${safeDeadline}</p>
      </div>
    ` : (roadmap.totalDuration ? `
      <div style="background-color: #1a1a1a; color: #ffffff; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
        <p style="font-size: 14px; margin: 0 0 8px 0;">Estimated Timeline</p>
        <p style="font-size: 28px; font-weight: 600; margin: 0;">${roadmap.totalDuration.min} - ${roadmap.totalDuration.max} weeks</p>
      </div>
    ` : '');
    
    const sectionTitle = isNewFormat ? 'Project Phases' : 'Development Milestones';
    const emailSubject = isNewFormat ? 'Your Project Requirements Summary - Soni Consultancy Services' : 'Your Project Roadmap - Soni Consultancy Services';
    const emailSubtitle = isNewFormat ? 'Your Project Requirements Summary' : 'Your Project Development Roadmap';
    const emailIntro = isNewFormat 
      ? 'Thank you for sharing your project requirements. Below is a summary of what you need, which will help us prepare for our consultation.'
      : 'Thank you for using our Project Roadmap Generator. Below is your personalized development roadmap based on your project requirements.';
    
    await client.emails.send({
      from: fromEmail,
      to: data.email,
      bcc: 'het.soni@soniconsultancyservices.com',
      subject: emailSubject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #1a1a1a; font-size: 28px; margin: 0;">Soni Consultancy Services</h1>
            <p style="color: #666; margin: 10px 0 0 0;">${emailSubtitle}</p>
          </div>
          
          <div style="background-color: #f9f9f9; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
            <h2 style="color: #1a1a1a; font-size: 20px; margin: 0 0 20px 0;">Hello ${safeName},</h2>
            <p style="color: #444; line-height: 1.6; margin: 0;">${emailIntro}</p>
          </div>
          
          <h3 style="color: #1a1a1a; font-size: 18px; margin: 30px 0 15px 0;">Project Overview</h3>
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <p style="margin: 0 0 10px 0;"><strong>Type:</strong> ${safeProjectType}</p>
            <p style="margin: 0 0 10px 0;"><strong>Purpose:</strong> ${safeProjectPurpose}</p>
            <p style="margin: 0 0 10px 0;"><strong>Complexity:</strong> ${safeComplexity.charAt(0).toUpperCase() + safeComplexity.slice(1)}</p>
            <p style="margin: 0 0 10px 0;"><strong>${isNewFormat ? 'Your Deadline' : 'Preferred Timeline'}:</strong> ${safeDeadline}</p>
            <p style="margin: 0;"><strong>Features:</strong> ${safeFeatures.join(', ')}</p>
          </div>
          
          ${manualRequirementsHtml}
          
          ${deadlineHtml}
          
          <h3 style="color: #1a1a1a; font-size: 18px; margin: 30px 0 15px 0;">${sectionTitle}</h3>
          ${phasesOrMilestonesHtml}
          
          ${techStackHtml}
          
          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 25px; margin: 30px 0; text-align: center;">
            <p style="color: #444; margin: 0 0 15px 0;">Ready to discuss your project in detail?</p>
            <a href="https://soniconsultancyservices.com/contact" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 500;">Schedule a Consultation</a>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              ${isNewFormat ? 'This summary will help us prepare a detailed proposal for your project.' : 'This roadmap is a starting point. Final timelines and approach will be refined during our discovery call.'}
            </p>
            <p style="color: #999; font-size: 12px; margin: 10px 0 0 0;">
              Prepared by Soni Consultancy Services
            </p>
          </div>
        </div>
      `,
    });

    console.log('Requirements email sent to:', data.email);
    return true;
  } catch (error) {
    console.error('Failed to send requirements email:', error);
    return false;
  }
}

// Legacy export for backwards compatibility
export const sendEstimationEmail = sendRoadmapEmail;
