import React from 'react'
import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs sm:text-sm font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 text-base font-bold tracking-tight text-white">
          <Zap className="h-5 w-5 text-pitch" />
          <span className="text-gradient">SelectXI AI</span>
        </Link>
        <div className="flex flex-wrap justify-center gap-6 text-slate-400">
          <a href="#features" className="hover:text-pitch transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-pitch transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-pitch transition-colors">Pricing</a>
          <Link to="/dashboard" className="hover:text-pitch transition-colors">Dashboard</Link>
        </div>
        <div className="text-center md:text-right text-slate-600">
          &copy; {new Date().getFullYear()} SelectXI AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
