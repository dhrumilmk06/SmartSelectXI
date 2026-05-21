import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'

export const Nav: React.FC = () => {
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <Zap className="h-6 w-6 text-pitch animate-pulse" />
              <span className="text-gradient">SelectXI AI</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-pitch transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-pitch transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-pitch transition-colors">Pricing</a>
              <Link to="/dashboard" className="hover:text-pitch transition-colors">Dashboard</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/auth')} 
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/auth?signup=true')} 
              className="px-4 py-2 bg-gradient-to-r from-pitch to-sky-brand text-slate-950 font-bold rounded-xl text-sm hover:opacity-90 transition-opacity glow-pitch"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
