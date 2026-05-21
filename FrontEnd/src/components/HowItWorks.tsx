import React from 'react'
import { Database, Cpu, Trophy } from 'lucide-react'

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Analyze Match Data',
      description: 'We compile thousands of historical details including weather, venue indexes, pitcher characteristics, and player form indicators.',
      icon: Database,
      color: 'border-pitch text-pitch',
    },
    {
      title: 'Generate AI Recommendations',
      description: 'Our neural models process millions of permutations to find player combinations and lineups matching optimal strategies.',
      icon: Cpu,
      color: 'border-sky-brand text-sky-brand',
    },
    {
      title: 'Optimize Winning Lineups',
      description: 'Get the finalized XI optimized for fantasy points, risk control, or specific high-yield tournament modes.',
      icon: Trophy,
      color: 'border-teal-400 text-teal-400',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-base font-bold text-pitch tracking-wider uppercase">Strategic Pipeline</h2>
          <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How SelectXI AI Predicts Victory
          </p>
          <p className="mt-4 text-lg text-slate-400">
            A secure, automated, three-stage workflow translating complex sports data into winning fantasy lineups.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-pitch via-sky-brand to-teal-400 -translate-y-12 z-0 opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex flex-col items-center text-center px-4">
                  <div className={`h-24 w-24 rounded-full border-2 ${step.color} bg-slate-900 shadow-2xl flex items-center justify-center mb-6`}>
                    <Icon className="h-10 w-10" />
                  </div>
                  <div className="absolute -translate-y-8 bg-slate-900 border border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2 py-0.5 rounded-full shadow">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
