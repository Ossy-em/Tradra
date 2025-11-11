'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import NavItems from "@/components/NavItems";
import { signOut } from "@/lib/actions/auth.actions";

const UserDropdown = ({
  user,
  initialStocks,
}: {
  user: User;
  initialStocks: StockWithWatchlistStatus[];
}) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors px-2 sm:px-3"
        >
          <Avatar className="h-8 w-8 border border-[var(--border)] shadow-sm">
            <AvatarImage src="https://avatars.githubusercontent.com/u/153423955?s=280&v=4" />
            <AvatarFallback className="bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-semibold">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-sm font-medium text-[var(--foreground)]">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 mt-2 rounded-lg border border-[var(--border)] bg-[var(--foreground)]/5 backdrop-blur-md text-[var(--muted-foreground)] shadow-lg"
      >
        {/* User Info */}
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-[var(--border)]">
              <AvatarImage src="https://avatars.githubusercontent.com/u/153423955?s=280&v=4" />
              <AvatarFallback className="bg-[var(--accent)] text-[var(--accent-foreground)] text-sm font-semibold">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {user.name}
              </span>
              <span className="text-xs text-[var(--muted-foreground)] truncate">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-[var(--border)]" />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] rounded-md cursor-pointer transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>

        <DropdownMenuSeparator className="sm:hidden bg-[var(--border)]" />

        {/* Mobile Nav */}
        <nav className="sm:hidden px-3 py-2">
          <NavItems initialStocks={initialStocks} />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
