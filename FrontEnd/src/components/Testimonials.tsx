import React from 'react'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  quote: string
  rating: number
  avatar: string
}

export const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Aditya Sharma',
      role: 'Fantasy Cricket Analyst & Grand League Winner',
      quote: 'SelectXI AI revolutionized how I build lineups. Instead of guessing batter-vs-bowler form, the ML predictions show verified matchup parameters that let me win multiple grand leagues.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      name: 'Rajesh Patel',
      role: 'Semi-Professional Cricket Coach',
      quote: 'The Pitch Venue Analysis and Playing XI projection features are incredibly precise. My analytical decisions are heavily grounded in the pre-match metrics calculated by this platform.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120',
    },
    {
      name: 'Vikram Malhotra',
      role: 'Sports Tech Syndicate Partner',
      quote: 'Excellent platform architecture. Consolidating thousands of weather, pitch type, and historical indexes into three strategic pipelines is a massive technological milestone in fantasy cricket.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120',
    },
  ]

  return (
    <section className="py-24 bg-slate-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-bold text-pitch tracking-wider uppercase">User Feedback</h2>
          <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Professional Players
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 glass rounded-3xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-800/50">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="h-10 w-10 rounded-full object-cover border border-slate-700 shadow" 
                />
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{t.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
