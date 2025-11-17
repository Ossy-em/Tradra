// lib/nodemailer/index.ts
import { transporter } from "./transporter";
import { generateEmailTemplate } from "./templates";
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

// Export types and utilities
export * from "./types";
export { transporter, verifyTransporter } from "./transporter";
export { generateEmailTemplate } from "./templates";

// Helper functions for specific email types
export async function sendWelcomeEmail({ 
  email, 
  name
}: { 
  email: string; 
  name: string;
}) {
  return sendEmail({
    type: "welcome",
    to: email,
    data: { name }
  });
}

export async function sendNewsSummaryEmail({ 
  email, 
  name,
  articles
}: { 
  email: string; 
  name: string;
  articles: Array<{
    title: string;
    summary: string;
    url: string;
    source: string;
    publishedAt: string;
  }>;
}) {
  return sendEmail({
    type: "news-summary",
    to: email,
    data: { name, articles }
  });
}

export async function sendWatchlistSummaryEmail({
  email,
  name,
  stocks,
  totalPortfolioValue,
}: {
  email: string;
  name: string;
  stocks: Array<{
    symbol: string;
    name: string;
    currentPrice: number;
    change: number;
    changePercent: number;
  }>;
  totalPortfolioValue?: number;
}) {
  return sendEmail({
    type: "watchlist-summary",
    to: email,
    data: { name, stocks, totalPortfolioValue }
  });
}

export async function sendStockAlertEmail({
  email,
  name,
  symbol,
  stockName,
  alertType,
  triggerPrice,
  currentPrice,
}: {
  email: string;
  name: string;
  symbol: string;
  stockName: string;
  alertType: "upper" | "lower";
  triggerPrice: number;
  currentPrice: number;
}) {
  return sendEmail({
    type: "stock-alert",
    to: email,
    data: { name, symbol, stockName, alertType, triggerPrice, currentPrice }
  });
}

export async function sendVolumeAlertEmail({
  email,
  name,
  symbol,
  stockName,
  volume,
  averageVolume,
  percentIncrease,
}: {
  email: string;
  name: string;
  symbol: string;
  stockName: string;
  volume: number;
  averageVolume: number;
  percentIncrease: number;
}) {
  return sendEmail({
    type: "volume-alert",
    to: email,
    data: { name, symbol, stockName, volume, averageVolume, percentIncrease }
  });
}

export async function sendInactiveUserEmail({
  email,
  name,
  lastLoginDate,
  daysInactive,
}: {
  email: string;
  name: string;
  lastLoginDate: string;
  daysInactive: number;
}) {
  return sendEmail({
    type: "inactive-user",
    to: email,
    data: { name, lastLoginDate, daysInactive }
  });
}