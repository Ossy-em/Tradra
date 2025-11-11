import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE, WATCHLIST_SUMMARY_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"StockAi" <emosinachi@gmail.com>`,
        to: email,
        subject: `Welcome to StockAi - your stock market toolkit is ready!`,
        text: 'Thanks for joining StockAi',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}

export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"Signalist News" <signalist@jsmastery.pro>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from Signalist`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};
interface WatchlistEmailStock {
  symbol: string;
  company: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

export const sendWatchlistSummaryEmail = async ({
  email,
  name,
  date,
  stocks,
}: {
  email: string;
  name: string;
  date: string;
  stocks: WatchlistEmailStock[];
}) => {
  // Generate the stock rows HTML
  const stockRows = stocks.map(stock => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 16px 12px;">
        <div style="font-weight: 600; font-size: 15px; color: #111827; margin-bottom: 4px;">
          ${stock.symbol}
        </div>
        <div style="font-size: 13px; color: #6b7280;">
          ${stock.company}
        </div>
      </td>
      <td style="padding: 16px 12px; text-align: right; font-weight: 600; font-size: 15px; color: #111827;">
        $${stock.price}
      </td>
      <td style="padding: 16px 12px; text-align: right;">
        <div style="font-weight: 600; font-size: 15px; color: ${stock.isPositive ? '#10b981' : '#ef4444'};">
          ${stock.isPositive ? '+' : ''}${stock.change}
        </div>
        <div style="font-size: 13px; color: ${stock.isPositive ? '#059669' : '#dc2626'};">
          (${stock.isPositive ? '+' : ''}${stock.changePercent}%)
        </div>
      </td>
    </tr>
  `).join('');

  const htmlTemplate = WATCHLIST_SUMMARY_EMAIL_TEMPLATE
    .replace('{{name}}', name)
    .replace('{{date}}', date)
    .replace('{{stockCount}}', stocks.length.toString())
    .replace('{{stockRows}}', stockRows);

  const mailOptions = {
    from: `"Signalist Watchlist" <signalist@jsmastery.pro>`,
    to: email,
    subject: `📊 Your Watchlist Summary - ${date}`,
    text: `Your daily watchlist summary from Signalist`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};