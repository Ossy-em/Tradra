
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 py-12 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      
      <div className="container relative">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
  
          <div className="md:col-span-2">
            <Link href="/landing" className="text-xl font-bold text-white mb-4 block hover:text-gray-300 transition-colors">
              Tradra
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-sm leading-relaxed">
              Making market intelligence clearer, faster, and more accessible for everyone.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://x.com/ossydev" 
                className="w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-gray-400" />
              </a>
              <a 
                href="https://github.com/Ossy-em/" 
                className="w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-gray-400" />
              </a>
              <a 
                href="https://www.linkedin.com/in/ossyemeruwa/" 
                className="w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-gray-400" />
              </a>
              <a 
                href="mailto:emosinachi@gmail.com" 
                className="w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

    
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/market-overview" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Market Overview
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Watchlist
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Comparison
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

       
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2025 Tradra. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;