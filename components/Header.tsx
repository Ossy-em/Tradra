import Link from "next/link";

import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/userDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import {TradraLogo1} from "@/components/logo/TradraLog";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-8">

      <Link href="/dashboard" className="group">
  <TradraLogo1 className="transition-transform group-hover:scale-105" />
</Link>


        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>


        <div className="flex items-center gap-4">
          <UserDropdown user={user} initialStocks={initialStocks} />
        </div>
      </div>
    </header>
  );
};

export default Header;
