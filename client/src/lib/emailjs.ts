import emailjs from "@emailjs/browser";

type SendEmailParams = {
  htmlContent: string;
  subject?: string;
  /** Visitor email — used as Reply-To so you can respond from your inbox. */
  replyToEmail?: string;
};

function requireEmailJsEnv() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "Missing VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, or VITE_EMAILJS_PUBLIC_KEY",
    );
  }
  return { serviceId, templateId, publicKey };
}

export const sendEmail = ({
  htmlContent,
  subject,
  replyToEmail,
}: SendEmailParams) => {
  const { serviceId, templateId, publicKey } = requireEmailJsEnv();
  const adminEmail = "krishna@waytoreact.com";

  return emailjs.send(serviceId, templateId, {
    message_html: htmlContent,
    subject: subject ?? "Notification from Soni Consultancy Services",
    to_email: adminEmail,
    reply_to: replyToEmail || adminEmail,
  }, { publicKey });
};
