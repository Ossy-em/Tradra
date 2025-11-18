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
import { LogOut, User } from "lucide-react";
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
          className="flex items-center gap-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors px-2 sm:px-3 rounded-lg"
        >
          <Avatar className="h-8 w-8 border border-white/10">
            {/* <AvatarImage src="https://avatars.githubusercontent.com/u/153423955?s=280&v=4" /> */}
            <AvatarFallback className="bg-white/5 text-white text-sm font-semibold">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-sm font-medium text-white">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 mt-2 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl text-gray-400 shadow-xl"
      >
        <DropdownMenuLabel className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-white/10">
          
              <AvatarFallback className="bg-white/5 text-white text-sm font-semibold">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate">
              <span className="text-sm font-semibold text-white">
                {user.name}
              </span>
              <span className="text-xs text-gray-500 truncate">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/5" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-2 mx-2 px-3 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>

        <DropdownMenuSeparator className="sm:hidden bg-white/5 my-2" />

        <nav className="sm:hidden px-2 py-2">
          <NavItems initialStocks={initialStocks} />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;