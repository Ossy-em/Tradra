
import { Search, Eye, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Search Any Stock',
    description: 'Find stocks from global markets instantly. Access comprehensive data on thousands of companies.'
  },
  {
    icon: Eye,
    number: '02',
    title: 'Track & Compare',
    description: 'Build your watchlist and analyze stocks side-by-side with detailed metrics and insights.'
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Make Smarter Decisions',
    description: 'Get real-time updates and AI-powered analytics to stay ahead of market movements.'
  }
];

const HowItWorks = () => {
  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            How it works
          </h2>
          <p className="text-lg text-gray-400">
            Get started in minutes, not hours
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="relative bg-white/[0.02] border border-white/5 rounded-xl p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                    {/* Number badge */}
                    <div className="absolute -top-4 left-8 px-3 py-1 bg-black border border-white/10 rounded-full">
                      <span className="text-xs font-mono font-bold text-white">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 mt-2">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;