import {inngest} from "@/lib/inngest/client";
import {NEWS_SUMMARY_EMAIL_PROMPT, PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";
import {sendEmail, sendNewsSummaryEmail, sendWelcomeEmail, sendWatchlistSummaryEmail} from "@/lib/nodemailer";
import {getAllUsersForNewsEmail} from "@/lib/actions/user.actions";
import { getWatchlistSymbolsByEmail, getWatchlistByEmail } from "@/lib/actions/watchlist.actions";
import { getNews, getBatchQuotes } from "@/lib/actions/finnhub.actions";
import { getFormattedTodayDate } from "@/lib/utils";
import nodemailer from 'nodemailer';

type UserForNewsEmail = {
    email: string;
    name: string;
};

export const sendSignUpEmail = inngest.createFunction(
    { id: 'sign-up-email' },
    { event: 'app/user.created'},
    async ({ event, step }) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk tolerance: ${event.data.riskTolerance}
            - Preferred industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        // Notify admin about new signup with plain text email
        await step.run('notify-admin', async () => {
            const { email, name, country, investmentGoals, riskTolerance, preferredIndustry } = event.data;
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASSWORD,
                }
            });

            return await transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL,
                to: 'emosinachi@gmail.com',
                subject: `🎉 New Signup: ${name}`,
                text: `
New user just signed up on Tradra!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${email}
Country: ${country}

Investment Goals: ${investmentGoals}
Risk Tolerance: ${riskTolerance}
Preferred Industry: ${preferredIndustry}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Check MongoDB for full details.
                `,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                        <div style="background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <h2 style="color: #10b981; margin-top: 0;">🎉 New Signup on Tradra!</h2>
                            
                            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
                                <h3 style="margin-top: 0; color: #374151;">User Details</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Name:</td>
                                        <td style="padding: 8px 0; color: #111827;">${name}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                                        <td style="padding: 8px 0; color: #111827;">${email}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Country:</td>
                                        <td style="padding: 8px 0; color: #111827;">${country}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
                                <h3 style="margin-top: 0; color: #374151;">Investment Profile</h3>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Goals:</td>
                                        <td style="padding: 8px 0; color: #111827;">${investmentGoals}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Risk Tolerance:</td>
                                        <td style="padding: 8px 0; color: #111827;">${riskTolerance}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Preferred Industry:</td>
                                        <td style="padding: 8px 0; color: #111827;">${preferredIndustry}</td>
                                    </tr>
                                </table>
                            </div>
                            
                            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                                Check MongoDB for full details.
                            </p>
                        </div>
                    </div>
                `
            });
        });

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text: prompt }
                        ]
                    }]
            }
        })

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) ||'Thanks for joining Tradra. You now have the tools to track markets and make smarter moves.'

            const { data: { email, name } } = event;

            return await sendWelcomeEmail({ email, name, intro: introText });
        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }
)

export const sendDailyNewsSummary = inngest.createFunction(
    { id: 'daily-news-summary' },
    [ { event: 'app/send.daily.news' }, { cron: '0 12 * * *' } ],
    async ({ step }) => {
        // Step #1: Get all users for news delivery
        const users = await step.run('get-all-users', getAllUsersForNewsEmail)

        if(!users || users.length === 0) return { success: false, message: 'No users found for news email' };

        // Step #2: For each user, get watchlist symbols -> fetch news (fallback to general)
        const results = await step.run('fetch-user-news', async () => {
            const perUser: Array<{ user: UserForNewsEmail; articles: MarketNewsArticle[] }> = [];
            for (const user of users as UserForNewsEmail[]) {
                try {
                    const symbols = await getWatchlistSymbolsByEmail(user.email);
                    let articles = await getNews(symbols);
                    // Enforce max 6 articles per user
                    articles = (articles || []).slice(0, 6);
                    // If still empty, fallback to general
                    if (!articles || articles.length === 0) {
                        articles = await getNews();
                        articles = (articles || []).slice(0, 6);
                    }
                    perUser.push({ user, articles });
                } catch (e) {
                    console.error('daily-news: error preparing user news', user.email, e);
                    perUser.push({ user, articles: [] });
                }
            }
            return perUser;
        });

        // Step #3: Summarize news via AI
        const userNewsSummaries: { user: UserForNewsEmail; newsContent: string | null }[] = [];

        for (const { user, articles } of results) {
                try {
                    const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace('{{newsData}}', JSON.stringify(articles, null, 2));

                    const response = await step.ai.infer(`summarize-news-${user.email}`, {
                        model: step.ai.models.gemini({ model: 'gemini-2.5-flash-lite' }),
                        body: {
                            contents: [{ role: 'user', parts: [{ text:prompt }]}]
                        }
                    });

                    const part = response.candidates?.[0]?.content?.parts?.[0];
                    const newsContent = (part && 'text' in part ? part.text : null) || 'No market news.'

                    userNewsSummaries.push({ user, newsContent });
                } catch (e) {
                    console.error('Failed to summarize news for : ', user.email);
                    userNewsSummaries.push({ user, newsContent: null });
                }
            }

        // Step #4: Send the emails
        await step.run('send-news-emails', async () => {
                await Promise.all(
                    userNewsSummaries.map(async ({ user, newsContent}) => {
                        if(!newsContent) return false;

                        return await sendNewsSummaryEmail({ 
                            email: user.email, 
                            name: user.name, 
                            date: getFormattedTodayDate(), 
                            newsContent 
                        })
                    })
                )
            })

        return { success: true, message: 'Daily news summary emails sent successfully' }
    }
)

export const sendDailyWatchlistSummary = inngest.createFunction(
    { id: 'daily-watchlist-summary' },
    [ { event: 'app/send.watchlist.summary' }, { cron: '0 9 * * *' } ], // 9 AM daily
    async ({ step }) => {
        // Step #1: Get all users
        const users = await step.run('get-all-users', getAllUsersForNewsEmail);

        if (!users || users.length === 0) {
            return { success: false, message: 'No users found' };
        }

        // Step #2: Process each user's watchlist
        const results = await step.run('process-watchlists', async () => {
            const processed = [];
            
            for (const user of users as UserForNewsEmail[]) {
                try {
                    const watchlistItems = await getWatchlistByEmail(user.email);
                    
                    if (!watchlistItems || watchlistItems.length === 0) {
                        continue; // Skip users with empty watchlists
                    }

                    const symbols = watchlistItems.map(item => item.symbol);
                    const quotes = await getBatchQuotes(symbols);

                    processed.push({
                        user,
                        watchlistItems,
                        quotes,
                    });
                } catch (e) {
                    console.error('Error processing watchlist for', user.email, e);
                }
            }
            
            return processed;
        });

        // Step #3: Send emails
        await step.run('send-watchlist-emails', async () => {
            await Promise.all(
                results.map(async ({ user, watchlistItems, quotes }) => {
                    try {
                        // Format watchlist data for email
                        const stocks = watchlistItems.map(item => {
                            const quote = quotes[item.symbol];
                            return {
                                symbol: item.symbol,
                                company: item.company,
                                price: quote ? quote.c.toFixed(2) : '--',
                                change: quote ? quote.d.toFixed(2) : '--',
                                changePercent: quote ? quote.dp.toFixed(2) : '--',
                                isPositive: quote ? quote.d >= 0 : true,
                            };
                        });

                        await sendWatchlistSummaryEmail({
                            email: user.email,
                            name: user.name,
                            date: getFormattedTodayDate(),
                            stocks,
                        });
                    } catch (e) {
                        console.error('Error sending watchlist email to', user.email, e);
                    }
                })
            );
        });

        return { 
            success: true, 
            message: `Watchlist summaries sent to ${results.length} users` 
        };
    }
);