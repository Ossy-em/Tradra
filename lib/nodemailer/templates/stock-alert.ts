
import { EmailTemplate, StockAlertData } from "../types";
import { wrapEmailHTML, formatPrice } from "../utils";

export function generateStockAlertEmail(
  data: Omit<StockAlertData, "to">
): EmailTemplate {
  const { name, symbol, stockName, alertType, triggerPrice, currentPrice } = data;

  const isUpper = alertType === "upper";
  const alertIcon = isUpper ? "🚀" : "⚠️";
  const alertColor = isUpper ? "#10b981" : "#ef4444";
  const alertText = isUpper ? "reached your upper target" : "dropped below your lower target";
  const direction = isUpper ? "above" : "below";

  const html = wrapEmailHTML(`
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; width: 64px; height: 64px; background-color: ${alertColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 16px;">
        ${alertIcon}
      </div>
    </div>

    <h2 style="margin: 0 0 8px; color: #111827; font-size: 24px; font-weight: 600; text-align: center;">
      Price Alert Triggered!
    </h2>
    <p style="margin: 0 0 24px; color: #6b7280; font-size: 14px; text-align: center;">
      Hi ${name}, ${symbol} has ${alertText}.
    </p>

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <p style="margin: 0 0 4px; color: #6b7280; font-size: 14px;">Stock</p>
        <h3 style="margin: 0; color: #111827; font-size: 28px; font-weight: 700;">${symbol}</h3>
        <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">${stockName}</p>
      </div>

      <div style="display: flex; justify-content: space-around; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <div style="text-align: center;">
          <p style="margin: 0 0 4px; color: #6b7280; font-size: 12px; text-transform: uppercase;">Target Price</p>
          <p style="margin: 0; color: #111827; font-size: 20px; font-weight: 600;">${formatPrice(triggerPrice)}</p>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0 0 4px; color: #6b7280; font-size: 12px; text-transform: uppercase;">Current Price</p>
          <p style="margin: 0; color: ${alertColor}; font-size: 20px; font-weight: 600;">${formatPrice(currentPrice)}</p>
        </div>
      </div>
    </div>

    <div style="background-color: ${alertColor}15; border-left: 4px solid ${alertColor}; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
      <p style="margin: 0; color: #374151; font-size: 14px;">
        <strong>${symbol}</strong> is now trading at <strong>${formatPrice(currentPrice)}</strong>, 
        which is ${direction} your alert threshold of <strong>${formatPrice(triggerPrice)}</strong>.
      </p>
    </div>

    <div style="text-align: center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/stock/${symbol}" 
         style="display: inline-block; padding: 12px 24px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin-right: 8px;">
        View ${symbol}
      </a>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/alerts" 
         style="display: inline-block; padding: 12px 24px; background-color: #e5e7eb; color: #374151; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
        Manage Alerts
      </a>
    </div>
  `);

  const text = `
Price Alert Triggered!

Hi ${name}, ${symbol} has ${alertText}.

Stock: ${symbol} (${stockName})
Target Price: ${formatPrice(triggerPrice)}
Current Price: ${formatPrice(currentPrice)}

${symbol} is now trading at ${formatPrice(currentPrice)}, which is ${direction} your alert threshold of ${formatPrice(triggerPrice)}.

View ${symbol}: ${process.env.NEXT_PUBLIC_APP_URL}/stock/${symbol}
Manage alerts: ${process.env.NEXT_PUBLIC_APP_URL}/alerts

— The Tradra Team
  `.trim();

  return {
    subject: `${alertIcon} Alert: ${symbol} ${isUpper ? "hit upper target" : "dropped below target"} - ${formatPrice(currentPrice)}`,
    html,
    text,
  };
}