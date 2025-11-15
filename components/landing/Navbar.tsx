
'use client'; 
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {TradraLogo1} from "@/components/logo/TradraLog";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-white/5 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
   
        <Link href="/landing" className="group">
  <TradraLogo1 className="transition-transform group-hover:scale-105" />
</Link>


   
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Features
            </button>
            <Link 
              href="/market-overview" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Market Overview
            </Link>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Pricing
            </button>
          </div>

    
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/sign-in" 
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/sign-up" 
              className="px-5 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          </div>


          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

     
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                Features
              </button>
              <Link 
                href="/market-overview" 
                className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                Market Overview
              </Link>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                Pricing
              </button>
            </div>
            <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-white/5">
              <Link 
                href="/sign-in" 
                className="px-4 py-2 text-center text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/sign-up" 
                className="px-4 py-2 text-center bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
