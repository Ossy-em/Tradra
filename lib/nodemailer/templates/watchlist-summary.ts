// lib/nodemailer/templates/watchlist-summary.ts
import { EmailTemplate, WatchlistSummaryData } from "../types";
import { wrapEmailHTML, formatStockRow, formatPrice } from "../utils";

export function generateWatchlistSummaryEmail(
  data: Omit<WatchlistSummaryData, "to">
): EmailTemplate {
  const { name, stocks, totalPortfolioValue } = data;

  const stockRows = stocks.map(formatStockRow).join("");

  const portfolioSection = totalPortfolioValue
    ? `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
      <p style="margin: 0 0 4px; font-size: 14px; opacity: 0.9;">Total Portfolio Value</p>
      <h3 style="margin: 0; font-size: 32px; font-weight: 700;">${formatPrice(totalPortfolioValue)}</h3>
    </div>
    `
    : "";

  const html = wrapEmailHTML(`
    <h2 style="margin: 0 0 8px; color: #111827; font-size: 24px; font-weight: 600;">
      Your Daily Watchlist Summary
    </h2>
    <p style="margin: 0 0 24px; color: #6b7280; font-size: 14px;">
      Hi ${name}, here's what happened with your stocks today.
    </p>

    ${portfolioSection}

    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <thead>
        <tr style="border-bottom: 2px solid #e5e7eb;">
          <th style="padding: 12px 8px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Stock</th>
          <th style="padding: 12px 8px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Price</th>
          <th style="padding: 12px 8px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Change</th>
        </tr>
      </thead>
      <tbody>
        ${stockRows}
      </tbody>
    </table>

    <div style="text-align: center; margin-top: 32px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/watchlist" 
         style="display: inline-block; padding: 12px 24px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
        View Full Watchlist
      </a>
    </div>
  `);

  const text = `
Your Daily Watchlist Summary

Hi ${name}, here's what happened with your stocks today.
${totalPortfolioValue ? `\nTotal Portfolio Value: ${formatPrice(totalPortfolioValue)}\n` : ""}
${stocks
  .map(
    (s) =>
      `${s.symbol} (${s.name}): ${formatPrice(s.currentPrice)} (${s.change >= 0 ? "+" : ""}${formatPrice(s.change)}, ${s.changePercent >= 0 ? "+" : ""}${s.changePercent.toFixed(2)}%)`
  )
  .join("\n")}

View your full watchlist: ${process.env.NEXT_PUBLIC_APP_URL}/watchlist

— The Tradra Team
  `.trim();

  return {
    subject: `📊 Your Daily Watchlist Summary - ${new Date().toLocaleDateString()}`,
    html,
    text,
  };
}