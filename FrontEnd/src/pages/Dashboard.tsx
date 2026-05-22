import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, LogOut, Cpu, Compass, Users, Activity } from 'lucide-react'

interface Player {
  name: string
  role: 'Batter' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper'
  formIndex: number
  pointsProjected: number
  selectedPercentage: number
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [userEmail] = useState(() => localStorage.getItem('userEmail') || '')
  const [strategy, setStrategy] = useState<'Safe' | 'Aggressive' | 'Balanced'>('Balanced')
  
  // Guard the page against unauthenticated access
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated')
    const email = localStorage.getItem('userEmail')
    if (auth !== 'true' || !email) {
      navigate('/auth')
    }
  }, [navigate])

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    navigate('/')
  }

  // Simulated AI Lineup Data based on strategy selection
  const safePlayers: Player[] = [
    { name: 'Virat Kohli', role: 'Batter', formIndex: 9.8, pointsProjected: 98, selectedPercentage: 92 },
    { name: 'KL Rahul', role: 'Wicket-Keeper', formIndex: 8.9, pointsProjected: 87, selectedPercentage: 81 },
    { name: 'Hardik Pandya', role: 'All-Rounder', formIndex: 9.4, pointsProjected: 92, selectedPercentage: 88 },
    { name: 'Jasprit Bumrah', role: 'Bowler', formIndex: 9.9, pointsProjected: 104, selectedPercentage: 95 },
  ]

  const balancedPlayers: Player[] = [
    { name: 'Shubman Gill', role: 'Batter', formIndex: 9.1, pointsProjected: 89, selectedPercentage: 78 },
    { name: 'Rishabh Pant', role: 'Wicket-Keeper', formIndex: 8.7, pointsProjected: 84, selectedPercentage: 69 },
    { name: 'Axar Patel', role: 'All-Rounder', formIndex: 9.0, pointsProjected: 88, selectedPercentage: 74 },
    { name: 'Rashid Khan', role: 'Bowler', formIndex: 9.5, pointsProjected: 95, selectedPercentage: 83 },
  ]

  const aggressivePlayers: Player[] = [
    { name: 'Suryakumar Yadav', role: 'Batter', formIndex: 9.7, pointsProjected: 108, selectedPercentage: 86 },
    { name: 'Sanju Samson', role: 'Wicket-Keeper', formIndex: 8.5, pointsProjected: 81, selectedPercentage: 54 },
    { name: 'Glenn Maxwell', role: 'All-Rounder', formIndex: 8.8, pointsProjected: 91, selectedPercentage: 62 },
    { name: 'Mohammed Siraj', role: 'Bowler', formIndex: 8.6, pointsProjected: 82, selectedPercentage: 48 },
  ]

  const getActivePlayers = () => {
    if (strategy === 'Safe') return safePlayers
    if (strategy === 'Aggressive') return aggressivePlayers
    return balancedPlayers
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top dashboard header bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center">
            <Zap className="h-5 w-5 text-pitch" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black text-white tracking-tight">SelectXI Dashboard</h1>
            <p className="text-[10px] text-slate-400 font-medium">Logged in: {userEmail}</p>
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-colors shadow"
        >
          <LogOut className="h-3.5 w-3.5 text-rose-400" />
          Sign Out
        </button>
      </header>

      {/* Main dashboard content area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        {/* Left Side: Parameters Panel */}
        <section className="lg:col-span-4 space-y-6">
          <div className="p-6 glass rounded-3xl border border-slate-800/80">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="h-5 w-5 text-pitch" />
              <h2 className="text-base font-bold text-white tracking-tight">Optimizing Model</h2>
            </div>
            
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Algorithmic Risk Mode</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Safe', 'Balanced', 'Aggressive'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setStrategy(mode)}
                  className={`py-2 text-xs font-bold rounded-xl transition-all border ${
                    strategy === mode 
                      ? 'bg-pitch border-pitch text-slate-950 shadow-md' 
                      : 'bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800/50 space-y-3">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Risk Coefficient:</span>
                <span className="text-white">{strategy === 'Safe' ? 'Low (Alpha < 1.0)' : strategy === 'Aggressive' ? 'High (Alpha > 1.5)' : 'Balanced (Alpha = 1.0)'}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Match permutation count:</span>
                <span className="text-white">4.2M states</span>
              </div>
            </div>
          </div>

          <div className="p-6 glass rounded-3xl border border-slate-800/80">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="h-5 w-5 text-sky-brand" />
              <h2 className="text-base font-bold text-white tracking-tight">Venue Intelligence</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-300">Pitch Character (Batting Friendly)</span>
                  <span className="text-sky-brand">78%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                  <div className="h-full bg-sky-brand rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-300">Fast Bowlers Suitability</span>
                  <span className="text-pitch">62%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                  <div className="h-full bg-pitch rounded-full" style={{ width: '62%' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Generated Playing XI results */}
        <section className="lg:col-span-8 space-y-6">
          <div className="p-6 glass-strong rounded-3xl border border-slate-800/80 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-pitch" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">AI Playing XI Lineup</h2>
                  <p className="text-xs text-slate-400 font-medium">Dynamically generated based on {strategy} strategy</p>
                </div>
              </div>
              
              <div className="px-3.5 py-1.5 bg-pitch/10 border border-pitch/30 rounded-xl text-xs font-bold text-pitch flex items-center gap-1.5 animate-pulse">
                <span className="h-2 w-2 rounded-full bg-pitch" />
                Optimal Solution
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    <th className="py-3">Player Name</th>
                    <th className="py-3">Role</th>
                    <th className="py-3 text-center">Form Index</th>
                    <th className="py-3 text-center">Proj. Points</th>
                    <th className="py-3 text-center">Selected %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-sm font-semibold">
                  {getActivePlayers().map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                      <td className="py-4 text-white font-bold">{p.name}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-300">
                          {p.role}
                        </span>
                      </td>
                      <td className="py-4 text-center text-pitch">{p.formIndex}</td>
                      <td className="py-4 text-center text-white">{p.pointsProjected}</td>
                      <td className="py-4 text-center text-slate-400">{p.selectedPercentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-4 bg-slate-950 border border-slate-900 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-teal-400" />
                <span>Lineup match score matches selected risk targets perfectly.</span>
              </div>
              <button 
                onClick={() => alert('Feature incoming soon in the next update!')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-xl transition-all"
              >
                Export Lineup (.CSV)
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
