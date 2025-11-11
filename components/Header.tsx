import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/userDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/assets/icons/logo.svg"
            alt="Signalist logo"
            width={140}
            height={32}
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>

        {/* User Dropdown */}
        <div className="flex items-center gap-4">
          <UserDropdown user={user} initialStocks={initialStocks} />
        </div>
      </div>
    </header>
  );
};

export default Header;
