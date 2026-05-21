import React from 'react'
import { useNavigate } from 'react-router-dom'

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate()

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20 overflow-hidden border-t border-slate-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-pitch/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Start Building Smarter <br />
          <span className="text-gradient">Cricket Teams</span> Today
        </h2>
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-medium">
          Join thousands of sports strategists and fantasy participants using our AI engine to gain immediate advantage.
        </p>
        
        <div className="mt-10">
          <button
            onClick={() => navigate('/auth?signup=true')}
            className="px-8 py-4 bg-gradient-to-r from-pitch to-sky-brand text-slate-950 font-bold rounded-2xl text-base hover:opacity-90 transition-opacity shadow-2xl glow-pitch"
          >
            Create Your Free Account
          </button>
        </div>
      </div>
    </section>
  )
}
