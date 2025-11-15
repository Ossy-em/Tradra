import WatchlistPage from "@/components/WatchlistPage";
import React from "react";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

const Watchlist = async () => {
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
      <WatchlistPage />
    </div>
  );
}


export default Watchlist;