import React from 'react'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Metrics } from '../components/Metrics'
import { Features } from '../components/Features'
import { HowItWorks } from '../components/HowItWorks'
import { Testimonials } from '../components/Testimonials'
import { Pricing } from '../components/Pricing'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative">
      <Nav />
      <Hero />
      <Metrics />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  )
}
