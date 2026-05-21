import React from 'react'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Tier {
  name: string
  price: string
  description: string
  features: string[]
  buttonText: string
  highlighted: boolean
}

export const Pricing: React.FC = () => {
  const navigate = useNavigate()

  const tiers: Tier[] = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Ideal for casual fantasy managers exploring basic analytics.',
      features: [
        'Standard Playing XI predictions',
        'Basic player form metrics',
        'Single lineup generation',
        'Email customer support',
      ],
      buttonText: 'Get Started Free',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'Perfect for active participants targeting grand league wins.',
      features: [
        'Advanced Playing XI algorithms',
        'Complete Pitch & Venue matchup indicators',
        'Generate up to 20 optimal lineups',
        'Real-time lineup change alerts',
        'Priority discord/chat community support',
      ],
      buttonText: 'Upgrade to Pro',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored for team syndicates, organizations, and sports channels.',
      features: [
        'Custom private machine learning models',
        'Real-time automated webhook integration',
        'Unrestricted team lineup generations',
        'Dedicated data scientist relationship officer',
        '99.9% uptime Service Level Agreement (SLA)',
      ],
      buttonText: 'Contact Enterprise Sales',
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-base font-bold text-pitch tracking-wider uppercase">Subscription Plans</h2>
          <p className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flexible Plans for Every Manager
          </p>
          <p className="mt-4 text-lg text-slate-400">
            Gain immediate competitive advantage by unlocking premium lineup predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div 
              key={idx}
              className={`p-8 rounded-3xl border transition-all flex flex-col justify-between ${
                tier.highlighted 
                  ? 'bg-slate-900 border-pitch shadow-2xl relative scale-105 z-10' 
                  : 'glass border-slate-800/80 hover:border-slate-700/60'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-pitch text-slate-950 text-[10px] uppercase font-black tracking-widest rounded-full shadow">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">{tier.name}</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed min-h-[40px]">
                  {tier.description}
                </p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-black text-white">{tier.price}</span>
                  {tier.price !== 'Custom' && (
                    <span className="ml-1 text-sm font-semibold text-slate-400">/month</span>
                  )}
                </div>

                <ul className="mt-8 space-y-4">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="h-4 w-4 text-pitch shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate('/auth')}
                className={`mt-10 w-full py-3.5 rounded-xl text-sm font-bold transition-all shadow-md ${
                  tier.highlighted
                    ? 'bg-gradient-to-r from-pitch to-sky-brand hover:opacity-90 text-slate-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700/80'
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
