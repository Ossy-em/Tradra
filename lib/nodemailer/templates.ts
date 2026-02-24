export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Welcome to Tradra</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: rgba(255, 255, 255, 0.02) !important;
                border: 1px solid rgba(255, 255, 255, 0.05) !important;
            }
            .dark-bg {
                background-color: #000000 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #9ca3af !important;
            }
            .dark-text-muted {
                color: #6b7280 !important;
            }
            .dark-border {
                border-color: rgba(255, 255, 255, 0.05) !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.6 !important;
            }
            .mobile-title {
                font-size: 28px !important;
                line-height: 1.2 !important;
            }
            .mobile-button {
                width: 100% !important;
            }
            .mobile-button a {
                width: 100% !important;
                display: block !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
            .dashboard-preview {
                padding: 0 24px 24px 24px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 24px !important;
            }
            .mobile-padding {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #000000;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px);">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 32px 40px;">
                            <!-- Tradra Logo (Text-based for email compatibility) -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #0FEDBE 0%, #0DD9A8 100%); width: 32px; height: 32px; border-radius: 8px; text-align: center; vertical-align: middle; padding: 6px;">
                                        <span style="color: #000000; font-size: 18px; font-weight: bold; line-height: 1;">↗</span>
                                    </td>
                                    <td style="padding-left: 10px;">
                                        <span style="font-size: 24px; font-weight: bold; color: #ffffff; letter-spacing: -0.5px;">Tradra</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Dashboard Preview Image -->
                    <tr>
                        <td align="center" class="dashboard-preview" style="padding: 0 40px 32px 40px;">
                            <img  src="https://www.tradra.site/assets/images/dashboard.png" alt="Tradra Dashboard Preview" width="100%" style="max-width: 520px; width: 100%; height: auto; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 40px 40px;">
                            
                            <!-- Welcome Badge -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 20px 0;">
                                <tr>
                                    <td style="background-color: rgba(13, 237, 190, 0.1); border: 1px solid rgba(13, 237, 190, 0.2); border-radius: 20px; padding: 6px 12px;">
                                        <span style="font-size: 12px; color: #0FEDBE; font-weight: 500;">✨ Welcome to Tradra</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Welcome Heading -->
                            <h1 class="mobile-title dark-text" style="margin: 0 0 24px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2; letter-spacing: -0.5px;">
                                Hey {{name}}, you're all set! 🎉
                            </h1>
                            
                            <!-- Intro Text -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #9ca3af;">
                                Your Tradra account is ready to go. We've built this platform to help you make smarter investment decisions with real-time data, powerful analytics, and AI-powered insights.
                            </p>
                            
                            <!-- Feature Cards -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                                <tr>
                                    <td style="padding: 20px; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding-bottom: 16px;">
                                                    <span style="font-size: 14px; font-weight: 600; color: #ffffff;">Get Started in 3 Steps:</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="width: 24px; height: 24px; background: linear-gradient(135deg, #0FEDBE 0%, #0DD9A8 100%); border-radius: 6px; text-align: center; vertical-align: middle;">
                                                                <span style="color: #000000; font-size: 12px; font-weight: bold;">1</span>
                                                            </td>
                                                            <td style="padding-left: 12px;">
                                                                <span style="font-size: 14px; color: #9ca3af; line-height: 1.5;">Build your watchlist with stocks you care about</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="width: 24px; height: 24px; background: linear-gradient(135deg, #0FEDBE 0%, #0DD9A8 100%); border-radius: 6px; text-align: center; vertical-align: middle;">
                                                                <span style="color: #000000; font-size: 12px; font-weight: bold;">2</span>
                                                            </td>
                                                            <td style="padding-left: 12px;">
                                                                <span style="font-size: 14px; color: #9ca3af; line-height: 1.5;">Compare stocks side-by-side to find opportunities</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td style="width: 24px; height: 24px; background: linear-gradient(135deg, #0FEDBE 0%, #0DD9A8 100%); border-radius: 6px; text-align: center; vertical-align: middle;">
                                                                <span style="color: #000000; font-size: 12px; font-weight: bold;">3</span>
                                                            </td>
                                                            <td style="padding-left: 12px;">
                                                                <span style="font-size: 14px; color: #9ca3af; line-height: 1.5;">Stay updated with real-time market insights</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Additional Text -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #9ca3af;">
                                We're here to help you make confident decisions. If you have any questions, just reply to this email — we read every message.
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="mobile-button" style="margin: 0 0 32px 0; width: 100%;">
                                <tr>
                                    <td align="center">
                                        <a href="https://tradra.site/dashboard" style="display: inline-block; background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%); color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; line-height: 1.5; box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);">
                                            Open Dashboard →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Divider -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td style="border-top: 1px solid rgba(255, 255, 255, 0.05);"></td>
                                </tr>
                            </table>
                            
                            <!-- Footer Text -->
                            <p class="mobile-text dark-text-muted" style="margin: 0; font-size: 13px; line-height: 1.6; color: #6b7280; text-align: center;">
                                Tradra • Making smart investing accessible<br>
                                <a href="#" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a> · 
                                <a href="https://tradra.site" style="color: #6b7280; text-decoration: underline;">Visit Website</a><br>
                                © 2025 Tradra. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const NEWS_SUMMARY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Today's Market Summary</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: rgba(255, 255, 255, 0.02) !important;
                border: 1px solid rgba(255, 255, 255, 0.05) !important;
            }
            .dark-bg {
                background-color: #000000 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #9ca3af !important;
            }
            .dark-text-muted {
                color: #6b7280 !important;
            }
            .dark-border {
                border-color: rgba(255, 255, 255, 0.05) !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.6 !important;
            }
            .mobile-title {
                font-size: 28px !important;
                line-height: 1.2 !important;
            }
            .mobile-news-title {
                font-size: 16px !important;
                line-height: 1.3 !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 24px !important;
            }
            .mobile-padding {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #000000;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px);">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 32px 40px;">
                            <!-- Tradra Logo -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #0FEDBE 0%, #0DD9A8 100%); width: 32px; height: 32px; border-radius: 8px; text-align: center; vertical-align: middle; padding: 6px;">
                                        <span style="color: #000000; font-size: 18px; font-weight: bold; line-height: 1;">↗</span>
                                    </td>
                                    <td style="padding-left: 10px;">
                                        <span style="font-size: 24px; font-weight: bold; color: #ffffff; letter-spacing: -0.5px;">Tradra</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 40px 40px;">
                            
                            <!-- News Badge -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 20px 0;">
                                <tr>
                                    <td style="background-color: rgba(13, 237, 190, 0.1); border: 1px solid rgba(13, 237, 190, 0.2); border-radius: 20px; padding: 6px 12px;">
                                        <span style="font-size: 12px; color: #0FEDBE; font-weight: 500;">📰 Daily Market Summary</span>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Header -->
                            <h1 class="mobile-title dark-text" style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2; letter-spacing: -0.5px;">
                                Today's Market News
                            </h1>
                            
                            <!-- Date -->
                            <p class="mobile-text dark-text-muted" style="margin: 0 0 32px 0; font-size: 14px; line-height: 1.4; color: #6b7280;">
                                {{date}}
                            </p>
                            
                            <!-- News Summary Container -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                                <tr>
                                    <td style="padding: 24px; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px;">
                                        {{newsContent}}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 32px 0; width: 100%;">
                                <tr>
                                    <td align="center">
                                        <a href="https://tradra.site/dashboard" style="display: inline-block; background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%); color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; line-height: 1.5; box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);">
                                            View Full Dashboard →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Divider -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td style="border-top: 1px solid rgba(255, 255, 255, 0.05);"></td>
                                </tr>
                            </table>
                            
                            <!-- Footer Text -->
                            <div style="text-align: center;">
                                <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 1.6; color: #6b7280;">
                                    You're receiving this because you subscribed to Tradra news updates.
                                </p>
                                <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 1.6; color: #6b7280;">
                                    <a href="#" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a> · 
                                    <a href="https://tradra.site" style="color: #6b7280; text-decoration: underline;">Visit Website</a> · 
                                    <a href="https://tradra.site/dashboard" style="color: #6b7280; text-decoration: underline;">Dashboard</a>
                                </p>
                                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #6b7280;">
                                    © 2025 Tradra. All rights reserved.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

// News item template helper (use this to format individual news items in {{newsContent}})
export const NEWS_ITEM_TEMPLATE = `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 20px 0;">
    <tr>
        <td>
            <!-- News Item -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                    <td style="padding: 16px; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px;">
                        <!-- Category Badge -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 12px 0;">
                            <tr>
                                <td style="background-color: rgba(13, 237, 190, 0.1); border-radius: 12px; padding: 4px 10px;">
                                    <span style="font-size: 11px; color: #0FEDBE; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">{{category}}</span>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- News Title -->
                        <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #ffffff; line-height: 1.3;">
                            {{title}}
                        </h3>
                        
                        <!-- News Summary -->
                        <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.6; color: #9ca3af;">
                            {{summary}}
                        </p>
                        
                        <!-- Read More Link -->
                        <a href="{{url}}" style="display: inline-block; font-size: 14px; color: #0FEDBE; text-decoration: none; font-weight: 500;">
                            Read more →
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
`;

export const STOCK_ALERT_UPPER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚀 Price Alert: {{symbol}}</title>
    <style type="text/css">
        @media (prefers-color-scheme: dark) {
            .email-container { background-color: rgba(255, 255, 255, 0.02) !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; }
        }
        @media only screen and (max-width: 600px) {
            .mobile-padding { padding: 24px !important; }
            .mobile-title { font-size: 24px !important; }
            .mobile-price { font-size: 28px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #000000;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                    
                    <!-- Logo -->
                    <tr>
                        <td style="padding: 40px 40px 32px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #0FEDBE 0%, #0DD9A8 100%); width: 32px; height: 32px; border-radius: 8px; text-align: center; vertical-align: middle; padding: 6px;">
                                        <span style="color: #000000; font-size: 18px; font-weight: bold;">↗</span>
                                    </td>
                                    <td style="padding-left: 10px;">
                                        <span style="font-size: 24px; font-weight: bold; color: #ffffff;">Tradra</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Alert Badge -->
                    <tr>
                        <td style="padding: 0 40px 24px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px;">
                                <tr>
                                    <td align="center">
                                        <div style="font-size: 32px; margin-bottom: 8px;">🚀</div>
                                        <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #10B981;">
                                            Target Price Reached!
                                        </h1>
                                        <p style="margin: 0; font-size: 14px; color: #6b7280;">
                                            {{timestamp}}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 40px 40px;">
                            
                            <!-- Stock Info Card -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 24px 0;">
                                <tr>
                                    <td style="padding: 24px; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; text-align: center;">
                                        <h2 style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; color: #ffffff;">
                                            {{symbol}}
                                        </h2>
                                        <p style="margin: 0 0 24px 0; font-size: 16px; color: #9ca3af;">
                                            {{company}}
                                        </p>
                                        
                                        <div style="display: inline-block; padding: 16px 24px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px;">
                                            <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">
                                                CURRENT PRICE
                                            </p>
                                            <p class="mobile-price" style="margin: 0; font-size: 36px; font-weight: 700; color: #10B981;">
                                                {{currentPrice}}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Alert Details -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 24px 0;">
                                <tr>
                                    <td style="padding: 20px; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px;">
                                        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #ffffff;">
                                            Alert Details
                                        </h3>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0; font-size: 14px; color: #9ca3af;">Target Price:</td>
                                                <td align="right" style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #ffffff;">{{targetPrice}}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 12px; padding-bottom: 0; font-size: 14px; color: #9ca3af; line-height: 1.6;">
                                                    Price exceeded your upper threshold. Great timing!
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Opportunity Message -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                                <tr>
                                    <td style="padding: 20px; background: linear-gradient(135deg, rgba(13, 237, 190, 0.1) 0%, rgba(13, 237, 190, 0.02) 100%); border: 1px solid rgba(13, 237, 190, 0.2); border-radius: 8px;">
                                        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #0FEDBE;">
                                            💡 What's Next?
                                        </h3>
                                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #9ca3af;">
                                            {{symbol}} reached your target! Consider reviewing your position, taking profits, or adjusting your strategy.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://tradra.site/dashboard" style="display: inline-block; background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%); color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);">
                                            View on Dashboard →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 24px; text-align: center;">
                                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">
                                            <a href="#" style="color: #6b7280; text-decoration: underline;">Manage Alerts</a> · 
                                            <a href="#" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
                                        </p>
                                        <p style="margin: 0; font-size: 13px; color: #6b7280;">
                                            © 2025 Tradra
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;


export const STOCK_ALERT_LOWER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📉 Price Alert: {{symbol}}</title>
    <style type="text/css">
        @media (prefers-color-scheme: dark) {
            .email-container { background-color: rgba(255, 255, 255, 0.02) !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; }
        }
        @media only screen and (max-width: 600px) {
            .mobile-padding { padding: 24px !important; }
            .mobile-title { font-size: 24px !important; }
            .mobile-price { font-size: 28px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #000000;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; background-color: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                    
                    <!-- Logo -->
                    <tr>
                        <td style="padding: 40px 40px 32px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #0FEDBE 0%, #0DD9A8 100%); width: 32px; height: 32px; border-radius: 8px; text-align: center; vertical-align: middle; padding: 6px;">
                                        <span style="color: #000000; font-size: 18px; font-weight: bold;">↗</span>
                                    </td>
                                    <td style="padding-left: 10px;">
                                        <span style="font-size: 24px; font-weight: bold; color: #ffffff;">Tradra</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Alert Badge -->
                    <tr>
                        <td style="padding: 0 40px 24px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 100%); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 24px;">
                                <tr>
                                    <td align="center">
                                        <div style="font-size: 32px; margin-bottom: 8px;">📉</div>
                                        <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #FF495B;">
                                            Buying Opportunity Alert
                                        </h1>
                                        <p style="margin: 0; font-size: 14px; color: #6b7280;">
                                            {{timestamp}}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 40px 40px;">
                            
                            <!-- Stock Info Card -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 24px 0;">
                                <tr>
                                    <td style="padding: 24px; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; text-align: center;">
                                        <h2 style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; color: #ffffff;">
                                            {{symbol}}
                                        </h2>
                                        <p style="margin: 0 0 24px 0; font-size: 16px; color: #9ca3af;">
                                            {{company}}
                                        </p>
                                        
                                        <div style="display: inline-block; padding: 16px 24px; background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px;">
                                            <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">
                                                CURRENT PRICE
                                            </p>
                                            <p class="mobile-price" style="margin: 0; font-size: 36px; font-weight: 700; color: #FF495B;">
                                                {{currentPrice}}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Alert Details -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 24px 0;">
                                <tr>
                                    <td style="padding: 20px; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px;">
                                        <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #ffffff;">
                                            Alert Details
                                        </h3>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0; font-size: 14px; color: #9ca3af;">Target Price:</td>
                                                <td align="right" style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #ffffff;">{{targetPrice}}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 12px; padding-bottom: 0; font-size: 14px; color: #9ca3af; line-height: 1.6;">
                                                    Price dropped below your lower threshold. Potential buying opportunity!
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Opportunity Message -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                                <tr>
                                    <td style="padding: 20px; background: linear-gradient(135deg, rgba(13, 237, 190, 0.1) 0%, rgba(13, 237, 190, 0.02) 100%); border: 1px solid rgba(13, 237, 190, 0.2); border-radius: 8px;">
                                        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #0FEDBE;">
                                            💡 Opportunity Spotted
                                        </h3>
                                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #9ca3af;">
                                            {{symbol}} hit your buy target. This could be a good entry point. Review the charts and fundamentals before making a decision.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 0 0 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="https://tradra.site/dashboard" style="display: inline-block; background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%); color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);">
                                            Analyze on Dashboard →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 24px; text-align: center;">
                                        <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">
                                            <a href="#" style="color: #6b7280; text-decoration: underline;">Manage Alerts</a> · 
                                            <a href="#" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
                                        </p>
                                        <p style="margin: 0; font-size: 13px; color: #6b7280;">
                                            © 2025 Tradra
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const VOLUME_ALERT_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Volume Alert: {{symbol}}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #141414 !important;
                border: 1px solid #30333A !important;
            }
            .dark-bg {
                background-color: #050505 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #9ca3af !important;
            }
            .dark-text-muted {
                color: #6b7280 !important;
            }
            .dark-border {
                border-color: #30333A !important;
            }
            .dark-info-box {
                background-color: #1f2937 !important;
                border: 1px solid #374151 !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
            .mobile-volume {
                font-size: 28px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
            .mobile-volume {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <img src="https://www.tradra.site/assets/images/logo.png" alt="Tradra Logo" width="150" style="max-width: 100%; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Alert Header -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 20px 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #7c3aed; border-radius: 8px; padding: 20px;">
                                <tr>
                                    <td align="center">
                                        <h1 class="mobile-title" style="margin: 0 0 10px 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.2;">
                                            📊 Volume Alert
                                        </h1>
                                        <p style="margin: 0; font-size: 16px; color: #ffffff; opacity: 0.9;">
                                            {{timestamp}}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 0 40px 40px 40px;">
                            
                            <!-- Stock Info -->
                            <div class="dark-bg" style="text-align: center; padding: 30px 20px; background-color: #050505; border-radius: 8px; margin-bottom: 30px;">
                                <h2 class="dark-text" style="margin: 0 0 10px 0; font-size: 28px; font-weight: 700; color: #ffffff;">
                                    {{symbol}}
                                </h2>
                                <p class="dark-text-muted" style="margin: 0 0 20px 0; font-size: 16px; color: #6b7280;">
                                    {{company}}
                                </p>
                                
                                <!-- Current Volume -->
                                <div style="margin-bottom: 20px;">
                                    <p class="dark-text-muted" style="margin: 0 0 5px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Current Volume
                                    </p>
                                    <p class="mobile-volume" style="margin: 0; font-size: 36px; font-weight: 700; color: #7c3aed;">
                                        {{currentVolume}}M
                                    </p>
                                </div>
                                
                                <!-- Current Price (smaller) -->
                                <div class="dark-border" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #30333A;">
                                    <p class="dark-text-secondary" style="margin: 0 0 5px 0; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.5px;">
                                        Current Price
                                    </p>
                                    <p style="margin: 0; font-size: 18px; font-weight: 600; color: {{priceColor}};">
                                        {{currentPrice}} ({{changeDirection}}{{changePercent}}%)
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Alert Details -->
                            <div class="dark-info-box" style="background-color: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                <h3 class="dark-text" style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #ffffff;">
                                    Volume Spike Details
                                </h3>
                                <p class="mobile-text dark-text-secondary" style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.5; color: #9ca3af;">
                                    <strong>Trigger:</strong> {{alertMessage}}
                                </p>
                                <p class="mobile-text dark-text-secondary" style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.5; color: #9ca3af;">
                                    <strong>Average Volume:</strong> {{averageVolume}}M shares
                                </p>
                                <p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 16px; line-height: 1.5; color: #9ca3af;">
                                    <strong>Spike Detected:</strong> {{volumeSpike}} above normal trading activity
                                </p>
                            </div>
                            
                            <!-- What This Means -->
                            <div class="dark-info-box" style="background-color: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                <h3 class="dark-text" style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #ffffff;">
                                    💡 What This Means
                                </h3>
                                <p class="mobile-text dark-text-secondary" style="margin: 0; font-size: 16px; line-height: 1.5; color: #9ca3af;">
                                    High volume often indicates increased investor interest, potential news events, or significant price movements. This could signal an opportunity to investigate what's driving the activity.
                                </p>
                            </div>
                            
                            <!-- Action Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://stock-market-dev.vercel.app/" style="display: inline-block; background-color: #E8BA40; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 500; line-height: 1;">
                                            View Dashboard
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Disclaimer -->
                            <div class="dark-info-box" style="background-color: #1f2937; border-radius: 6px; padding: 15px; margin-bottom: 20px; border: 1px solid #374151;">
                                <p class="dark-text-muted" style="margin: 0; font-size: 13px; line-height: 1.4; color: #6b7280; text-align: center;">
                                    <strong>Disclaimer:</strong> This alert is for informational purposes only and should not be considered investment advice. High volume doesn't guarantee price direction. Always do your own research before making investment decisions.
                                </p>
                            </div>
                            
                             <!-- Footer Text -->
                            <div style="text-align: center; margin: 40px 0 0 0;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #CCDADC !important;">
                                    You're receiving this because you subscribed to Tradra news updates.
                                </p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #CCDADC !important;">
                                    <a href="#" style="color: #CCDADC !important; text-decoration: underline;">Unsubscribe</a> | 
                                    <a href="https://www.tradra.site/" style="color: #CCDADC !important; text-decoration: underline;">Visit Tradra</a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #CCDADC !important;">
                                    © 2025 Tradra. All rights reserved.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const INACTIVE_USER_REMINDER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>We Miss You! Your Market Insights Await</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #141414 !important;
                border: 1px solid #30333A !important;
            }
            .dark-bg {
                background-color: #050505 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #9ca3af !important;
            }
            .dark-text-muted {
                color: #6b7280 !important;
            }
            .dark-border {
                border-color: #30333A !important;
            }
            .dark-info-box {
                background-color: #1f2937 !important;
                border: 1px solid #374151 !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-header-padding {
                padding: 24px 24px 12px 24px !important;
            }
            .mobile-text {
                font-size: 14px !important;
                line-height: 1.5 !important;
            }
            .mobile-title {
                font-size: 24px !important;
                line-height: 1.3 !important;
            }
            .mobile-button {
                width: 100% !important;
                text-align: center !important;
            }
            .mobile-button a {
                width: calc(100% - 32px) !important;
                display: block !important;
                text-align: center !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
        }
        @media only screen and (max-width: 480px) {
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-padding {
                padding: 15px !important;
            }
            .mobile-header-padding {
                padding: 15px 15px 8px 15px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td align="left" class="mobile-header-padding" style="padding: 40px 40px 20px 40px;">
                            <img src="https://www.tradra.site/assets/images/logo.png" alt="Tradra Logo" width="150" style="max-width: 100%; height: auto;">
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="mobile-padding" style="padding: 40px 40px 40px 40px;">
                            
                            <!-- Welcome Back Heading -->
                            <h1 class="mobile-title dark-text" style="margin: 0 0 15px 0; font-size: 28px; font-weight: 600; background: linear-gradient(135deg, #FDD458 0%, #E8BA40 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: #FDD458; line-height: 1.2;">
                                We Miss You, {{name}}!
                            </h1>
                            
                            <!-- Main Message -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
                                We noticed you haven't visited Tradra in a while. The markets have been moving, and there might be some opportunities you don't want to miss!
                            </p>

                            <!-- Additional Motivation -->
                            <div class="dark-info-box" style="background-color: #050505; border: 1px solid #374151; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                                <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #E8BA40;">
                                    Market Update
                                </h3>
                                <p class="mobile-text" style="margin: 0; font-size: 14px; line-height: 1.5; color: #ccdadc;">
                                    Markets have been active lately! Major indices have seen significant movements, and there might be opportunities in your tracked stocks that you don't want to miss.
                                </p>
                            </div>
                            
                            <!-- Encouragement Message -->
                            <p class="mobile-text dark-text-secondary" style="margin: 0 0 40px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
                                Your watchlists are still active and ready to help you stay on top of your investments. Don't let market opportunities pass you by!
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 20px 0; width: 100%;">
                                <tr>
                                    <td align="center" class="mobile-button">
                                        <a href="{{dashboardUrl}}" style="display: inline-block; background: #E8BA40; color: #000000; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 500; line-height: 1; text-align: center;  width: 100%;">
                                            Return to Dashboard
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Footer Text -->
                            <div style="text-align: center; margin: 40px 0 0 0;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #CCDADC !important;">
                                    Questions? Reply to this email or contact our support team.
                                </p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #CCDADC !important;">
                                    <a href="{{unsubscribeUrl}}" style="color: #CCDADC !important; text-decoration: underline;">Unsubscribe</a> | 
                                    <a href="{{dashboardUrl}}" style="color: #CCDADC !important; text-decoration: underline;">Visit Tradra</a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #CCDADC !important;">
                                    © 2025 Tradra. All rights reserved.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const WATCHLIST_SUMMARY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <title>Your Watchlist Summary</title>
    <style type="text/css">
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #141414 !important;
                border: 1px solid #30333A !important;
            }
            .dark-bg {
                background-color: #050505 !important;
            }
            .dark-text {
                color: #ffffff !important;
            }
            .dark-text-secondary {
                color: #9ca3af !important;
            }
            .dark-border {
                border-color: #30333A !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <div style="padding: 40px 20px;">
        <table class="email-container" role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 32px; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">
                        📊 Your Watchlist Update
                    </h1>
                    <p style="margin: 12px 0 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.9);">
                        {{date}}
                    </p>
                </td>
            </tr>

            <!-- Content -->
            <tr>
                <td class="mobile-padding" style="padding: 40px 32px;">
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #374151;">
                        Hi <strong>{{name}}</strong>,
                    </p>
                    <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #374151;">
                        Here's today's summary for the <strong>{{stockCount}}</strong> stock(s) you're watching:
                    </p>

                    <!-- Watchlist Table -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
                        <thead>
                            <tr style="background-color: #f9fafb;">
                                <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Stock
                                </th>
                                <th style="padding: 12px; text-align: right; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Price
                                </th>
                                <th style="padding: 12px; text-align: right; font-size: 13px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Change
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {{stockRows}}
                        </tbody>
                    </table>

                    <!-- CTA Button -->
                    <div style="text-align: center; margin-top: 40px;">
                        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/watchlist" 
                           style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                            View Full Watchlist →
                        </a>
                    </div>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="padding: 32px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #374151;">
                        Stay informed. Trade smart.
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                        You're receiving this because you have an active watchlist on Tradra.
                    </p>
                </td>
            </tr>

        </table>
    </div>
</body>
</html>`;


import { EmailType, EmailDataMap, EmailTemplate } from "./types";

export function generateEmailTemplate<T extends EmailType>(
  type: T,
  data: Omit<EmailDataMap[T], "to">
): EmailTemplate {
  switch (type) {
   case "welcome": {
  const { name, intro } = data as Omit<EmailDataMap["welcome"], "to">;
  const introText = intro || "Welcome to your stock tracking journey!";
  
  return {
    subject: "Welcome to Tradra!",
    html: WELCOME_EMAIL_TEMPLATE
      .replace("{{name}}", name)
      .replace("{{intro}}", introText),
    text: `Welcome to Tradra, ${name}! ${introText}`,
  };
}

   case "news-summary": {
  const { name, date, newsContent } = data as Omit<EmailDataMap["news-summary"], "to">;
  
  return {
    subject: `Your Daily News Summary - ${date}`,
    html: NEWS_SUMMARY_EMAIL_TEMPLATE
      .replace("{{name}}", name)
      .replace("{{date}}", date)
      .replace("{{newsContent}}", newsContent),
    text: `Daily News Summary for ${name} - ${date}: ${newsContent}`,
  };
}

    case "stock-alert": {
      const { name, symbol, stockName, alertType, triggerPrice, currentPrice } = 
        data as Omit<EmailDataMap["stock-alert"], "to">;
      
      const template = alertType === "upper" 
        ? STOCK_ALERT_UPPER_EMAIL_TEMPLATE 
        : STOCK_ALERT_LOWER_EMAIL_TEMPLATE;
      
      const direction = alertType === "upper" ? "above" : "below";
      
      return {
        subject: `Stock Alert: ${symbol} is ${direction} your target price`,
        html: template
          .replace("{{name}}", name)
          .replace("{{symbol}}", symbol)
          .replace("{{stockName}}", stockName)
          .replace("{{triggerPrice}}", triggerPrice.toFixed(2))
          .replace("{{currentPrice}}", currentPrice.toFixed(2)),
        text: `${symbol} (${stockName}) is now ${direction} your target of $${triggerPrice.toFixed(2)}. Current price: $${currentPrice.toFixed(2)}`,
      };
    }

    case "volume-alert": {
      const { name, symbol, stockName, volume, averageVolume, percentIncrease } = 
        data as Omit<EmailDataMap["volume-alert"], "to">;
      
      return {
        subject: `Volume Alert: Unusual activity in ${symbol}`,
        html: VOLUME_ALERT_EMAIL_TEMPLATE
          .replace("{{name}}", name)
          .replace("{{symbol}}", symbol)
          .replace("{{stockName}}", stockName)
          .replace("{{volume}}", volume.toLocaleString())
          .replace("{{averageVolume}}", averageVolume.toLocaleString())
          .replace("{{percentIncrease}}", percentIncrease.toFixed(1)),
        text: `${symbol} (${stockName}) is experiencing unusual volume: ${volume.toLocaleString()} (${percentIncrease.toFixed(1)}% above average)`,
      };
    }

    case "inactive-user": {
      const { name, lastLoginDate, daysInactive } = 
        data as Omit<EmailDataMap["inactive-user"], "to">;
      
      return {
        subject: "We miss you at Tradra!",
        html: INACTIVE_USER_REMINDER_EMAIL_TEMPLATE
          .replace("{{name}}", name)
          .replace("{{lastLoginDate}}", lastLoginDate)
          .replace("{{daysInactive}}", daysInactive.toString()),
        text: `Hi ${name}, we noticed you haven't logged in for ${daysInactive} days. We miss you!`,
      };
    }

 case "watchlist-summary": {
  const { name, date, stocks, totalPortfolioValue } = 
    data as Omit<EmailDataMap["watchlist-summary"], "to">;

  const stocksHtml = stocks
    .map(
      (stock) => {
        const changeColor = stock.isPositive ? "#16a34a" : "#dc2626";
        const changeSymbol = stock.isPositive ? "+" : "";
        
        return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          <strong style="color: #111827;">${stock.symbol}</strong><br/>
          <span style="color: #6b7280; font-size: 12px;">${stock.company}</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          $${stock.price}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; color: ${changeColor};">
          ${changeSymbol}$${stock.change}<br/>
          <span style="font-size: 12px;">(${changeSymbol}${stock.changePercent}%)</span>
        </td>
      </tr>
    `;
      }
    )
    .join("");

  const portfolioSection = totalPortfolioValue
    ? `<p style="margin: 20px 0; padding: 15px; background: #f0fdf4; border-radius: 8px; text-align: center;">
         <strong style="color: #166534;">Total Portfolio Value:</strong> 
         <span style="font-size: 24px; color: #15803d;">$${totalPortfolioValue.toLocaleString()}</span>
       </p>`
    : "";

  return {
    subject: `Your Daily Watchlist Summary - ${date}`,
    html: WATCHLIST_SUMMARY_EMAIL_TEMPLATE
      .replace("{{name}}", name)
      .replace("{{date}}", date)
      .replace("{{stocks}}", stocksHtml)
      .replace("{{portfolioValue}}", portfolioSection),
    text: `Daily Watchlist Summary for ${name} - ${date}`,
  };
}

    default:
      // TypeScript should prevent this, but handle it anyway
      throw new Error(`Unknown email type: ${type}`);
  }
}