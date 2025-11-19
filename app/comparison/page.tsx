import type { Metadata } from "next";
import StockComparisonComponent from "@/components/StockMultiSelectCommand";
import Header from "@/components/Header";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Compare",
};

const ComparisonPageWrapper = async () => {
  const initialStocks = await searchStocks("");

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect('/auth/sign-in');

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };

  return (
    <div>
      <Header user={user} />
      <StockComparisonComponent />
    </div>
  );
};

export default ComparisonPageWrapper;
