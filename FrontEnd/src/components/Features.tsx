import React from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  Sparkles, 
  MapPin, 
  Activity, 
  LineChart, 
  Layers, 
  Users, 
  Lock 
} from 'lucide-react'

interface Feature {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export const Features: React.FC = () => {
  const features: Feature[] = [
    {
      title: 'AI Playing XI Prediction',
      description: 'Machine learning algorithms optimized to project the most probable final playing elevens based on deep historical trends.',
      icon: Cpu,
      color: 'text-pitch',
    },
    {
      title: 'Fantasy Team Generator',
      description: 'Instant multi-lineup fantasy team builder that optimizes salary cap restrictions while maximizing projected points.',
      icon: Sparkles,
      color: 'text-sky-brand',
    },
    {
      title: 'Opponent & Venue Analysis',
      description: 'Deep-dive intelligence report examining batter-vs-bowler matchups, historical pitch behavior, and weather metrics.',
      icon: MapPin,
      color: 'text-teal-400',
    },
    {
      title: 'Real-Time Analytics',
      description: 'Live performance metrics tracking actual match progress to update strategic models instantly as plays develop.',
      icon: Activity,
      color: 'text-rose-400',
    },
    {
      title: 'Predictive Performance',
      description: 'Form forecasting models analyzing detailed player training indexes, recent visual trends, and fatigue indicators.',
      icon: LineChart,
      color: 'text-amber-400',
    },
    {
      title: 'Multi-Strategy Optimization',
      description: 'Select between diverse algorithmic approaches (Safe, Aggressive, Balanced, Differential) to align with your personal risk profile.',
      icon: Layers,
      color: 'text-indigo-400',
    },
    {
      title: 'Coach Collaboration',
      description: 'Shared strategic dashboard permitting direct feedback, team sharing, and alignment with leadership circles.',
      icon: Users,
      color: 'text-fuchsia-400',
    },
    {
      title: 'Role-Based Access Control',
      description: 'Secure enterprise grade security guaranteeing secure data isolation and customized user permissions.',
      icon: Lock,
      color: 'text-cyan-400',
    },
  ]

  return (
    <section id="features" className="py-24 bg-slate-900/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.05),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.03),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-base font-bold text-pitch tracking-wider uppercase">Advanced Features</h2>
          <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Elite Sports Managers
          </p>
          <p className="mt-4 text-lg text-slate-400">
            SelectXI AI consolidates complex historical stats, live feeds, and pitch characteristics into actionable winning recommendations.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="p-6 glass rounded-3xl border border-slate-800/80 hover:border-slate-700/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex p-3 bg-slate-950/80 border border-slate-800 rounded-2xl mb-5 shadow-inner">
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{feature.title}</h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
