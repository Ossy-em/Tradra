'use client'; 
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 px-4 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-xs text-gray-400 font-medium">Trusted by thousands of investors</span>
          </div>
          
     
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Smart investing starts with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 animate-gradient">
              better data
            </span>
          </h1>
          
  
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Real-time market insights, powerful analytics, and intelligent comparisons. 
            Everything you need to make informed investment decisions.
          </p>

    
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/auth/sign-up"
              className="group relative px-8 py-3.5 bg-white text-black font-medium rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-white/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="/market-overview"
              className="px-8 py-3.5 bg-white/5 text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View Live Demo
            </Link>
          </div>


          <p className="mt-8 text-xs text-gray-500">
            No credit card required • Cancel anytime • 14-day free trial
          </p>
        </div>


        <div className="mt-20 max-w-5xl mx-auto">
          <div className="relative">
        
            <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1 backdrop-blur-sm">
              <div className="rounded-lg bg-black/40 backdrop-blur-xl border border-white/5 overflow-hidden">
        
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-6 bg-white/5 rounded text-xs flex items-center px-3 text-gray-500">
                      tradra.app/dashboard
                    </div>
                  </div>
                </div>
                
               
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-20 bg-white/5 rounded-lg border border-white/5" />
                    <div className="h-20 bg-white/5 rounded-lg border border-white/5" />
                    <div className="h-20 bg-white/5 rounded-lg border border-white/5" />
                  </div>
                  <div className="h-48 bg-white/5 rounded-lg border border-white/5 mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 bg-white/5 rounded-lg border border-white/5" />
                    <div className="h-32 bg-white/5 rounded-lg border border-white/5" />
                  </div>
                </div>
              </div>
            </div>

         
            <div className="absolute -top-6 -right-6 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg animate-float">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-white">Live Data</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg animate-float-delayed">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-xs font-medium text-white">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection