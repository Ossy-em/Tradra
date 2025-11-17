import { EmailTemplate, EmailType, EmailDataMap } from "../types";
import { generateWelcomeEmail } from "./welcome";
import { generateWatchlistSummaryEmail } from "./watchlist-summary";
import { generateStockAlertEmail } from "./stock-alert";
import { generateInactiveUserEmail } from "./inactive-user";

export function generateEmailTemplate<T extends EmailType>(
  type: T,
  data: Omit<EmailDataMap[T], "to">
): EmailTemplate {
  switch (type) {
    case "welcome":
      return generateWelcomeEmail(data as Omit<EmailDataMap["welcome"], "to">);
    
    case "watchlist-summary":
      return generateWatchlistSummaryEmail(data as Omit<EmailDataMap["watchlist-summary"], "to">);
    
    case "stock-alert":
      return generateStockAlertEmail(data as Omit<EmailDataMap["stock-alert"], "to">);
    
    case "inactive-user":
      return generateInactiveUserEmail(data as Omit<EmailDataMap["inactive-user"], "to">);
    
    // TODO: Add these templates
    case "news-summary":
      throw new Error("News summary template not yet implemented");
    
    case "volume-alert":
      throw new Error("Volume alert template not yet implemented");
    
    default:
      const exhaustiveCheck: never = type;
      throw new Error(`Unknown email type: ${exhaustiveCheck}`);
  }
}