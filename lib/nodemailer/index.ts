// lib/nodemailer/index.ts
import { transporter } from "./transporter";
import { generateEmailTemplate } from "./templates/index";
import { SendEmailParams, EmailType } from "./types";

/**
 * Send an email using a template
 * 
 * @example
 * await sendEmail({
 *   type: "welcome",
 *   to: "user@example.com",
 *   data: { name: "John Doe" }
 * });
 */
export async function sendEmail<T extends EmailType>(
  params: SendEmailParams<T>
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const { type, to, data } = params;

    // Generate email content from template
    const { subject, html, text } = generateEmailTemplate(type, data);

    // Send email
 // Send email
const info = await transporter.sendMail({
  from: `"Tradra" <${process.env.NODEMAILER_EMAIL}>`,
  to,
  subject,
  html,
  text,
});

    console.log(`✅ Email sent: ${type} to ${to} (${info.messageId})`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error(`❌ Failed to send ${params.type} email to ${params.to}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Export everything users need
export * from "./types";
export { transporter, verifyTransporter } from "./transporter";
export { generateEmailTemplate } from "./templates";