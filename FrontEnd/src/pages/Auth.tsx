import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Zap, Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react'

export const Auth: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isSignUp, setIsSignUp] = useState(() => searchParams.get('signup') === 'true')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API Auth Request
    setTimeout(() => {
      if (!email || !password) {
        setError('Please fill in all fields.')
        setLoading(false)
        return
      }

      // Save dummy credentials & status in localStorage for navigation guards
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)
      setLoading(false)
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative grid-bg">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pitch/10 rounded-full blur-[100px] pointer-events-none" />

      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      <div className="w-full max-w-md p-8 glass-strong rounded-3xl border border-slate-800 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mb-3">
            <Zap className="h-6 w-6 text-pitch animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {isSignUp ? 'Create your Account' : 'Welcome Back'}
          </h2>
          <p className="mt-1.5 text-xs text-slate-400 font-medium">
            {isSignUp ? 'Unlock professional cricket intelligence' : 'Sign in to access your dashboard'}
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-rose-950/50 border border-rose-900/50 text-rose-300 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
              <input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-pitch rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-pitch rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-slate-600"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-8 w-full py-3.5 bg-gradient-to-r from-pitch to-sky-brand hover:opacity-90 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 glow-pitch"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              isSignUp ? 'Sign Up' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp)
              setError('')
            }}
            className="text-xs text-slate-400 hover:text-white font-semibold transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  )
}
