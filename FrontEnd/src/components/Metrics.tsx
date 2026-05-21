import React from 'react'

export const Metrics: React.FC = () => {
  const stats = [
    { label: 'AI Lineups Generated', value: '10K+' },
    { label: 'Prediction Accuracy', value: '85%' },
    { label: 'Matches Analyzed', value: '500+' },
    { label: 'Strategic Algorithmic Modes', value: '3-5' },
  ]

  return (
    <section className="bg-slate-950 py-12 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pitch to-sky-brand">
                  {stat.value}
                </span>
              </div>
              <div className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
