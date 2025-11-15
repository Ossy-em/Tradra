import React from 'react';
import { TrendingUp } from 'lucide-react';

// Style 1: Modern Wordmark with Icon
const TradraLogo1 = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center">
      <TrendingUp className="w-5 h-5 text-black" strokeWidth={2.5} />
    </div>
    <span className="text-2xl font-bold text-white tracking-tight">
      Tradra
    </span>
  </div>
);

// Style 2: Minimal Wordmark (Cleanest)
const TradraLogo2 = ({ className = "" }) => (
  <span className={`text-2xl font-bold text-white tracking-tight ${className}`}>
    Tradra
  </span>
);

// Style 3: Gradient Text with Accent
const TradraLogo3 = ({ className = "" }) => (
  <span className={`text-2xl font-bold tracking-tight ${className}`}>
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
      Trad
    </span>
    <span className="text-white">ra</span>
  </span>
);

// Style 4: With Geometric Icon
const TradraLogo4 = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
      <rect width="32" height="32" rx="8" fill="url(#gradient)" />
      <path d="M8 20L16 12L24 20" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#0FEDBE" />
          <stop offset="1" stopColor="#0DD9A8" />
        </linearGradient>
      </defs>
    </svg>
    <span className="text-2xl font-bold text-white tracking-tight">
      Tradra
    </span>
  </div>
);

// Style 5: Monogram + Text
const TradraLogo5 = ({ className = "" }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
      <span className="text-lg font-black text-black">T</span>
    </div>
    <span className="text-2xl font-bold text-white tracking-tight">
      Tradra
    </span>
  </div>
);

// Style 6: Sleek with Dot Accent
const TradraLogo6 = ({ className = "" }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    <span className="text-2xl font-bold text-white tracking-tight">
      Tradra
    </span>
    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
  </div>
);

// Style 7: Bold with Underline
const TradraLogo7 = ({ className = "" }) => (
  <div className={`relative inline-block ${className}`}>
    <span className="text-2xl font-bold text-white tracking-tight">
      Tradra
    </span>
    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-transparent" />
  </div>
);
export {
  TradraLogo1,
  TradraLogo2,
  TradraLogo3,
  TradraLogo4,
  TradraLogo5,
  TradraLogo6,
  TradraLogo7
};
