
import { EmailTemplate, WelcomeEmailData } from "../types";
import { wrapEmailHTML } from "../utils";

export function generateWelcomeEmail(data: Omit<WelcomeEmailData, "to">): EmailTemplate {
  const { name } = data;

  const html = wrapEmailHTML(`
    <h2 style="margin: 0 0 16px; color: #111827; font-size: 24px; font-weight: 600;">
      Hi ${name}, welcome to Tradra! 🎉
    </h2>
    
    <p style="margin: 0 0 16px; color: #374151; font-size: 16px; line-height: 1.6;">
      We're thrilled to have you on board! You now have access to real-time market insights, 
      personalized stock alerts, and smarter ways to grow your portfolio.
    </p>
    
    <p style="margin: 0 0 24px; color: #374151; font-size: 16px; line-height: 1.6;">
      Here's what you can do with Tradra:
    </p>
    
    <div style="background-color: #f9fafb; border-left: 4px solid #667eea; padding: 16px 20px; margin-bottom: 24px;">
      <ul style="margin: 0; padding: 0; list-style: none;">
        <li style="margin-bottom: 12px; color: #374151; font-size: 15px;">
          📊 <strong>Track your watchlist</strong> with live price updates
        </li>
        <li style="margin-bottom: 12px; color: #374151; font-size: 15px;">
          🔔 <strong>Set price alerts</strong> to never miss important moves
        </li>
        <li style="margin-bottom: 12px; color: #374151; font-size: 15px;">
          📰 <strong>Get AI-powered news summaries</strong> tailored to your portfolio
        </li>
        <li style="color: #374151; font-size: 15px;">
          📈 <strong>Analyze trends</strong> with our advanced charting tools
        </li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 32px 0 24px;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
         style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
        Get Started
      </a>
    </div>
    
    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
      Need help getting started? Check out our 
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/docs" style="color: #667eea; text-decoration: none;">quick start guide</a> 
      or reach out to us at 
      <a href="mailto:support@tradra.com" style="color: #667eea; text-decoration: none;">support@tradra.com</a>.
    </p>
  `);

  const text = `
Hi ${name}, welcome to Tradra!

We're thrilled to have you on board! You now have access to real-time market insights, personalized stock alerts, and smarter ways to grow your portfolio.

Here's what you can do with Tradra:
- Track your watchlist with live price updates
- Set price alerts to never miss important moves
- Get AI-powered news summaries tailored to your portfolio
- Analyze trends with our advanced charting tools

Get started now: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard

Need help? Check out our quick start guide at ${process.env.NEXT_PUBLIC_APP_URL}/docs or reach out to us at support@tradra.com.

— The Tradra Team
  `.trim();

  return {
    subject: `Welcome to Tradra, ${name}! 🚀`,
    html,
    text,
  };
}