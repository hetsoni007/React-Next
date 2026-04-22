function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export type LeadEmailPayload = {
  full_name: string;
  email: string;
  message: string;
  company?: string;
  /** e.g. "Project Type" — pair with inquiry_value */
  inquiry_label?: string;
  inquiry_value?: string;
};

export const generateLeadHTML = ({
  full_name,
  email,
  message,
  company = "N/A",
  inquiry_label,
  inquiry_value,
}: LeadEmailPayload) => {
  const safeName = escapeHtml(full_name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const safeMailto = encodeURIComponent(email);

  const inquiryRow =
    inquiry_label && inquiry_value != null && String(inquiry_value).length > 0
      ? `<tr>
              <td style="font-weight:bold;">${escapeHtml(inquiry_label)}:</td>
              <td>${escapeHtml(String(inquiry_value))}</td>
            </tr>`
      : "";

  const year = new Date().getFullYear();

  return `
  <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
      <tr>
        <td style="background:#0f172a; padding:16px 24px;">
          <h2 style="color:#ffffff; margin:0; font-size:20px;">
            New lead from website
          </h2>
        </td>
      </tr>

      <tr>
        <td style="padding:24px; color:#334155;">
          <p style="margin-top:0; font-size:14px;">
            You have received a new project inquiry. Details are below:
          </p>

          <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;">
            <tr>
              <td style="font-weight:bold; width:140px;">Name:</td>
              <td>${safeName}</td>
            </tr>
            <tr>
              <td style="font-weight:bold;">Email:</td>
              <td>
                <a href="mailto:${safeMailto}" style="color:#2563eb;">
                  ${safeEmail}
                </a>
              </td>
            </tr>
       
            ${inquiryRow}
          </table>

          <div style="margin-top:20px;">
            <p style="font-weight:bold; margin-bottom:6px;">Message:</p>
            <div style="background:#f1f5f9; padding:12px; border-radius:6px; font-size:14px;">
              ${safeMessage}
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td style="background:#f8fafc; padding:12px 24px; font-size:12px; color:#64748b; text-align:center;">
          © ${year} Your Way To React. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;
};

/** Payload for estimate / roadmap notification emails (client + server aligned). */
export interface RoadmapEmailData {
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
    milestones?: Array<{
      name: string;
      durationWeeks: { min: number; max: number };
      deliverables: string[];
      activities: string[];
    }>;
    phases?: Array<{
      name: string;
      description?: string;
      deliverables?: string[];
      tasks?: string[];
    }>;
    totalDuration?: { min: number; max: number };
    techStackRecommendations?: Array<{
      category: string;
      technologies: string[];
      reasoning: string;
    }>;
    manualRequirements?: string;
    preferredTechStack?: string[];
  };
}

export const generateEstimateFormHTML = (data: RoadmapEmailData) => {
  const { roadmap } = data;
  const safeName = escapeHtml(data.name);
  const safeProjectType = escapeHtml(roadmap.projectType);
  const isNewFormat = !!roadmap.phases && !roadmap.milestones;
  const safeProjectPurpose = escapeHtml(roadmap.projectPurpose);
  const safeComplexity = escapeHtml(roadmap.complexityLevel);
  const safeFeatures = roadmap.features.map((f) => escapeHtml(f));

  const emailSubtitle = isNewFormat
    ? "Your Project Requirements Summary"
    : "Your Project Development Roadmap";

  const emailIntro = isNewFormat
    ? "Thank you for sharing your project requirements. Below is a summary of what you need, which will help us prepare for our consultation."
    : "Thank you for using our Project Roadmap Generator. Below is your personalized development roadmap based on your project requirements.";

  const safeDeadline = roadmap.clientDeadline
    ? escapeHtml(roadmap.clientDeadline)
    : roadmap.preferredTimeline
      ? escapeHtml(roadmap.preferredTimeline)
      : "To be discussed";

  const manualRequirementsHtml = roadmap.manualRequirements
    ? `
        <div style="background-color: #f0f7ff; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="color: #666; font-size: 13px; margin: 0 0 8px 0; font-weight: 500;">Your Custom Requirements:</p>
          <p style="color: #444; font-size: 14px; margin: 0; white-space: pre-wrap;">${escapeHtml(
            roadmap.manualRequirements,
          )}</p>
        </div>
      `
    : "";

  const deadlineHtml = isNewFormat
    ? `
      <div style="
background: linear-gradient(156deg,rgba(169, 169, 169, 1) 0%, rgba(244, 244, 244, 1) 46%);
      color: #1a1a1a;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: center;">
      <p style="font-size: 14px; margin: 0 0 8px 0;">Your Preferred Deadline</p>
      <p style="font-size: 28px; font-weight: 600; margin: 0;">${safeDeadline}</p>
      </div>
      `
    : roadmap.totalDuration
      ? `
      <div style="background: linear-gradient(to bottom right, #e3edff, white, rgba(247, 146, 30, 0.23)); 
      color: #1a1a1a;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: center;
      ">
      <p style="font-size: 14px; margin: 0 0 8px 0;">Estimated Timeline</p>
      <p style="font-size: 28px; font-weight: 600; margin: 0;">
         ${roadmap.totalDuration.min} - ${roadmap.totalDuration.max} weeks
      </p>
      </div>
      `
      : "";

  const sectionTitle = isNewFormat
    ? "Project Phases"
    : "Development Milestones";

  let phasesOrMilestonesHtml = "";

  if (isNewFormat && roadmap.phases) {
    phasesOrMilestonesHtml = roadmap.phases
      .map((phase, i) => {
        const items = phase.deliverables || phase.tasks || [];
        const description = phase.description || "";
        return `
          <div style="margin-bottom: 24px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
             <span style="margin-right:12px; display:inline-block;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:28px; height:28px; border-radius:50%; background: linear-gradient(156deg,rgba(169, 169, 169, 1) 0%, rgba(244, 244, 244, 1) 46%);-align:center;">
      <tr>
        <td style="vertical-align:middle; text-align:center; font-size:14px; font-weight:500; line-height:14px; color:#1a1a1a;">
          ${i + 1}
        </td>
      </tr>
    </table>
  </span>
              <strong style="color: #1a1a1a; font-size: 16px;">${escapeHtml(
                phase.name,
              )}</strong>
            </div>
            ${
              description
                ? `<p style="color: #666; font-size: 14px; margin: 0 0 12px 40px;">${escapeHtml(
                    description,
                  )}</p>`
                : ""
            }
            <div style="margin-left: 40px;">
              ${
                items.length > 0
                  ? `
              <ul style="margin: 0; padding-left: 20px;">
                ${items
                  .map(
                    (item) =>
                      `<li style="color: #444; font-size: 14px; margin-bottom: 4px;">${escapeHtml(
                        item,
                      )}</li>`,
                  )
                  .join("")}
              </ul>
              `
                  : ""
              }
            </div>
          </div>
        `;
      })
      .join("");
  } else if (roadmap.milestones) {
    phasesOrMilestonesHtml = roadmap.milestones
      .map(
        (m, i) => `
          <div style="margin-bottom: 24px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="margin-right:12px; display:inline-block;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:28px; height:28px; border-radius:50%; background: linear-gradient(156deg,rgba(169, 169, 169, 1) 0%, rgba(244, 244, 244, 1) 46%);text-align:center;">
      <tr>
        <td style="vertical-align:middle; text-align:center; font-size:14px; font-weight:500; line-height:14px; color:#1a1a1a;">
          ${i + 1}
        </td>
      </tr>
    </table>
  </span>
  
              <div>
                <strong style="color: #1a1a1a; font-size: 16px;">${escapeHtml(
                  m.name,
                )}</strong>
                <span style="color: #666; font-size: 13px; margin-left: 12px;">${
                  m.durationWeeks.min
                }-${m.durationWeeks.max} weeks</span>
              </div>
            </div>
            
            <div style="margin-left: 40px;">
              <p style="color: #666; font-size: 13px; margin: 0 0 12px 0; font-weight: 500;">Deliverables:</p>
              <ul style="margin: 0 0 16px 0; padding-left: 20px;">
                ${m.deliverables
                  .map(
                    (d) =>
                      `<li style="color: #444; font-size: 14px; margin-bottom: 4px;">${escapeHtml(
                        d,
                      )}</li>`,
                  )
                  .join("")}
              </ul>
              
              <p style="color: #666; font-size: 13px; margin: 0 0 12px 0; font-weight: 500;">Key Activities:</p>
              <ul style="margin: 0; padding-left: 20px;">
                ${m.activities
                  .map(
                    (a) =>
                      `<li style="color: #666; font-size: 14px; margin-bottom: 4px;">${escapeHtml(
                        a,
                      )}</li>`,
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        `,
      )
      .join("");
  }

  const techStackHtml =
    roadmap.techStackRecommendations &&
    roadmap.techStackRecommendations.length > 0
      ? `
        <h3 style="color: #1a1a1a; font-size: 18px; margin: 30px 0 15px 0;">Recommended Tech Stack</h3>
        ${roadmap.techStackRecommendations
          .map(
            (rec) => `
          <div style="margin-bottom: 16px; padding: 16px; background-color: #f9f9f9; border-radius: 8px;">
            <p style="color: #666; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(
              rec.category,
            )}</p>
            <p style="margin: 0 0 8px 0;">
              ${rec.technologies
                .map(
                  (t) =>
                    `<span style="display: inline-block; background-color: #e5e5e5; color: #1a1a1a; padding: 4px 10px; border-radius: 4px; font-size: 13px; margin-right: 6px; margin-bottom: 4px;">${escapeHtml(
                      t,
                    )}</span>`,
                )
                .join("")}
            </p>
            <p style="color: #666; font-size: 13px; margin: 0;">${escapeHtml(
              rec.reasoning,
            )}</p>
          </div>
        `,
          )
          .join("")}
      `
      : "";

  return ` <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
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
              <p style="margin: 0 0 10px 0;"><strong>Complexity:</strong> ${
                safeComplexity.charAt(0).toUpperCase() + safeComplexity.slice(1)
              }</p>
              <p style="margin: 0 0 10px 0;"><strong>${
                isNewFormat ? "Your Deadline" : "Preferred Timeline"
              }:</strong> ${safeDeadline}</p>
              <p style="margin: 0;"><strong>Features:</strong> ${safeFeatures.join(
                ", ",
              )}</p>
            </div>
            
            ${manualRequirementsHtml}
            
            ${deadlineHtml}
            
            <h3 style="color: #1a1a1a; font-size: 18px; margin: 30px 0 15px 0;">${sectionTitle}</h3>
            ${phasesOrMilestonesHtml}
            
            ${techStackHtml}
            
            <div style="background-color: #f9f9f9; border-radius: 8px; padding: 25px; margin: 30px 0; text-align: center;">
              <p style="color: #444; margin: 0 0 15px 0;">Ready to discuss your project in detail?</p>
            <a href="https://waytoreact.com/contact" style="
      display: inline-block;
   background: linear-gradient(156deg,rgba(169, 169, 169, 1) 0%, rgba(244, 244, 244, 1) 46%);
      color: #1a1a1a;
      padding: 12px 30px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
  ">
      Schedule a Consultation
  </a>
  
            </div>
            
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                ${
                  isNewFormat
                    ? "This summary will help us prepare a detailed proposal for your project."
                    : "This roadmap is a starting point. Final timelines and approach will be refined during our discovery call."
                }
              </p>
              <p style="color: #999; font-size: 12px; margin: 10px 0 0 0;">
                Prepared by WAYTOREACT TECHNOLOGIES
              </p>
            </div>
          </div>`;
};
