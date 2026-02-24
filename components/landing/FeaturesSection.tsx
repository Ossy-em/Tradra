

import { TrendingUp, Eye, GitCompare, Zap, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Real-Time Analytics',
    description: 'Live market data and charts powered by industry-leading providers. Never miss a beat.',
  },
  {
    icon: Eye,
    title: 'Smart Watchlists',
    description: 'Curate and track your portfolio with personalized alerts and notifications.',
  },
  {
    icon: GitCompare,
    title: 'Stock Comparison',
    description: 'Side-by-side analysis with detailed metrics to find the best opportunities.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance ensures you get data at the speed of thought.',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your data is encrypted and protected with enterprise-grade security.',
  },
  {
    icon: Globe,
    title: 'Global Markets',
    description: 'Access stocks, ETFs, and indices from exchanges worldwide.',
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 px-4 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
   
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="container relative">
 
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Everything you need in one place
          </h2>
          <p className="text-lg text-gray-400">
            Professional-grade tools designed for serious investors
          </p>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white/[0.02] border border-white/5 rounded-xl p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
            
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
         
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>

            
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/0 to-purple-500/0 group-hover:from-teal-500/5 group-hover:to-purple-500/5 transition-all duration-300 -z-10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;