import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, TrendingUp, Target, MapPin, Award, Search, ArrowRight } from 'lucide-react'

export const Hero: React.FC = () => {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8 grid-bg">
      {/* Background glow filters */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pitch/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-sky-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left column: Text & CTAs */}
        <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/80 text-[11px] font-bold text-slate-400 mb-6 shadow-xl"
          >
            <span className="h-2 w-2 rounded-full bg-pitch animate-pulse" />
            AI-Powered Cricket Intelligence Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white max-w-xl"
          >
            Build Winning <br />
            Cricket Lineups <br />
            with <span className="text-gradient">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-400 max-w-lg font-semibold leading-relaxed"
          >
            AI-powered lineup predictions for selectors, coaches, and fantasy cricket players using real-time analytics and predictive insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => navigate('/auth?signup=true')}
              className="px-6 py-3.5 bg-pitch hover:bg-pitch/90 text-slate-950 font-black rounded-xl hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all flex items-center gap-2 text-sm shadow-lg"
            >
              Generate Lineup
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#how-it-works"
              className="px-6 py-3.5 bg-slate-900/60 hover:bg-slate-800/80 text-white font-bold rounded-xl border border-slate-800 transition-all flex items-center gap-2 text-sm backdrop-blur-md"
            >
              <Play className="h-4 w-4 text-white fill-white" />
              View Demo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-600"
          >
            <span>No credit card required</span>
            <span>•</span>
            <span>Free 14-day trial</span>
            <span>•</span>
            <span>Cancel anytime</span>
          </motion.div>
        </div>

        {/* Right column: Beautiful dashboard mockup and charts */}
        <div className="lg:col-span-6 relative flex justify-center items-center py-10 w-full min-h-[550px]">
          
          {/* Relative wrapper container to lock the floating cards securely with the mockup */}
          <div className="relative w-full max-w-[480px]">
            
            {/* Main tablet device mockup frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.1 }}
              className="w-full bg-[#0c1322] border border-slate-800/85 rounded-3xl p-5 shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              {/* Search/URL Mock Header */}
              <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-slate-800/50">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#080d1a] border border-slate-900 rounded-lg text-[10px] text-slate-400 font-bold flex-1 select-none">
                  <Search className="h-3 w-3 text-slate-600" />
                  <span>i/match/IND-vs-AUS</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-950/80 border border-emerald-800/50 rounded-lg text-[9px] font-black tracking-widest text-pitch uppercase select-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-pitch animate-pulse" />
                  LIVE
                </div>
              </div>

              {/* Sub-Card 1: Win Probability Graph */}
              <div className="bg-[#090e1c] border border-slate-900 rounded-2xl p-4 mb-4 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Win Probability</span>
                    <span className="text-2xl font-black text-pitch mt-0.5 block">73.4%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">VS AUS</span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">Over 8 of 50</span>
                  </div>
                </div>

                {/* Sparkline curve */}
                <svg className="w-full h-16 mt-2" viewBox="0 0 300 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="curve-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path d="M 0 45 Q 75 35 150 25 T 300 20 L 300 60 L 0 60 Z" fill="url(#curve-glow)" />
                  {/* Line path */}
                  <path d="M 0 45 Q 75 35 150 25 T 300 20" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Sub-Card 2: Venue Advantage Bar Chart */}
              <div className="bg-[#090e1c] border border-slate-900 rounded-2xl p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Venue Advantage</span>
                    <span className="text-xs font-black text-slate-300">+12%</span>
                  </div>
                  <span className="text-[9px] text-sky-brand font-black uppercase tracking-wider">Top 6</span>
                </div>

                {/* Cyan Bar chart */}
                <div className="flex justify-between items-end h-20 px-1 mt-4">
                  {[
                    { name: 'Rohit', val: 'h-[50%]' },
                    { name: 'Kohli', val: 'h-[85%]' },
                    { name: 'Gill', val: 'h-[65%]' },
                    { name: 'Pant', val: 'h-[75%]' },
                    { name: 'Hardik', val: 'h-[80%]' },
                    { name: 'Jadeja', val: 'h-[70%]' }
                  ].map((b, idx) => (
                    <div key={idx} className="flex flex-col items-center w-10">
                      <div className={`w-7 sm:w-8 rounded-t-md bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)] ${b.val}`} />
                      <span className="text-[8px] text-slate-500 font-semibold mt-2">{b.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-Card 3: AI Captain Pick Footer */}
              <div className="bg-[#090e1c] border border-slate-900 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">AI Captain Pick</span>
                  <span className="text-sm font-black text-white mt-0.5 block">Virat Kohli</span>
                  <span className="text-[9px] text-slate-400 font-medium block">Confidence 94% - Avg 58.2 vs AUS</span>
                </div>
                
                {/* Circular confidence indicator */}
                <div className="relative h-11 w-11 flex items-center justify-center">
                  <svg className="absolute inset-0 h-full w-full -rotate-90">
                    <circle cx="22" cy="22" r="18" fill="transparent" stroke="#101827" strokeWidth="2.5" />
                    <circle cx="22" cy="22" r="18" fill="transparent" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="113" strokeDashoffset="18" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs font-black text-white">C</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 1: Win Probability (Top Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -30, y: -40 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, type: 'spring' }}
              className="absolute -left-4 sm:-left-12 top-8 flex items-center gap-3 px-3 py-2.5 bg-[#090e1c]/90 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-md z-20 animate-float-slow select-none pointer-events-none w-44"
            >
              <div className="h-9 w-9 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center text-pitch shrink-0">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block leading-none">Win Probability</span>
                <span className="text-sm font-black text-white mt-1 block leading-none">73.4%</span>
              </div>
            </motion.div>

            {/* Floating Card 2: Player Form (Top Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 30, y: -30 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, type: 'spring' }}
              className="absolute -right-4 sm:-right-12 top-16 flex items-center gap-3 px-3 py-2.5 bg-[#090e1c]/90 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-md z-20 select-none pointer-events-none w-44"
              style={{ animation: 'float 5s ease-in-out infinite alternate' }}
            >
              <div className="h-9 w-9 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center text-sky-brand shrink-0">
                <Target className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block leading-none">Player Form</span>
                <span className="text-sm font-black text-white mt-1 block leading-none">9.2/10</span>
              </div>
            </motion.div>

            {/* Floating Card 3: Venue Advantage (Middle Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -40, y: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, type: 'spring' }}
              className="absolute -left-6 sm:-left-16 top-[250px] flex items-center gap-3 px-3 py-2.5 bg-[#090e1c]/90 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-md z-20 select-none pointer-events-none w-44"
              style={{ animation: 'float 7s ease-in-out infinite' }}
            >
              <div className="h-9 w-9 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center text-pitch shrink-0">
                <MapPin className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block leading-none">Venue Advantage</span>
                <span className="text-sm font-black text-white mt-1 block leading-none">+12%</span>
              </div>
            </motion.div>

            {/* Floating Card 4: Fantasy Points (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 40, y: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, type: 'spring' }}
              className="absolute -right-4 sm:-right-12 bottom-12 flex items-center gap-3 px-3 py-2.5 bg-[#090e1c]/90 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-md z-20 select-none pointer-events-none w-44"
              style={{ animation: 'float 6s ease-in-out infinite alternate-reverse' }}
            >
              <div className="h-9 w-9 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-center text-sky-brand shrink-0">
                <Award className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider block leading-none">Fantasy Points</span>
                <span className="text-sm font-black text-white mt-1 block leading-none">847 pts</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
