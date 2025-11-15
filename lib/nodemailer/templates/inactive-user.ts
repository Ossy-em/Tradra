// lib/nodemailer/templates/inactive-user.ts
import { EmailTemplate, InactiveUserData } from "../types";
import { wrapEmailHTML } from "../utils";

export function generateInactiveUserEmail(
  data: Omit<InactiveUserData, "to">
): EmailTemplate {
  const { name, lastLoginDate, daysInactive } = data;

  const html = wrapEmailHTML(`
    <h2 style="margin: 0 0 8px; color: #111827; font-size: 24px; font-weight: 600;">
      We miss you, ${name}! 👋
    </h2>
    <p style="margin: 0 0 24px; color: #6b7280; font-size: 14px;">
      It's been ${daysInactive} days since you last logged in.
    </p>

    <p style="margin: 0 0 16px; color: #374151; font-size: 16px; line-height: 1.6;">
      The markets have been moving, and your watchlist might have some interesting updates waiting for you.
    </p>

    <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
      <h3 style="margin: 0 0 16px; color: #111827; font-size: 18px; font-weight: 600;">
        Here's what you're missing:
      </h3>
      <ul style="margin: 0; padding: 0 0 0 20px; color: #374151; font-size: 15px; line-height: 1.8;">
        <li>Real-time updates on your favorite stocks</li>
        <li>AI-powered news summaries tailored to your portfolio</li>
        <li>Price alerts that help you make timely decisions</li>
        <li>New insights and market trends</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 32px 0 24px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
         style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
        Welcome Back
      </a>
    </div>

    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center;">
      Last login: ${lastLoginDate}
    </p>
  `);

  const text = `
We miss you, ${name}!

It's been ${daysInactive} days since you last logged in. The markets have been moving, and your watchlist might have some interesting updates waiting for you.

Here's what you're missing:
- Real-time updates on your favorite stocks
- AI-powered news summaries tailored to your portfolio
- Price alerts that help you make timely decisions
- New insights and market trends

Welcome back: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard

Last login: ${lastLoginDate}

— The Tradra Team
  `.trim();

  return {
    subject: `We miss you, ${name}! Check out what's new 📈`,
    html,
    text,
  };
}