import Link from "next/link";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { TrendingUp } from 'lucide-react';


const TradraLogo = () => (
  <Link href="/landing" className="group inline-flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center group-hover:scale-105 transition-transform">
      <TrendingUp className="w-5 h-5 text-black" strokeWidth={2.5} />
    </div>
    <span className="text-2xl font-bold text-white tracking-tight">
      Tradra
    </span>
  </Link>
);

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) redirect('/dashboard');
    
    return (
        <main className="min-h-screen bg-black">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Glow effect */}
            <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

           
            <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md">
                 
                    <div className="mb-12">
                        <TradraLogo />
                    </div>

                   
                    <div className="relative">
                       
                        <div className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-sm -z-10" />
                        
                        <div className="p-8">
                            {children}
                        </div>
                    </div>

             
                    <p className="text-center text-sm text-gray-500 mt-8">
                        © 2025 Tradra. All rights reserved.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Layout;