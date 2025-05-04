import React from 'react'
import LandingNavbar from '../components/landing/LandingNavbar'
import Hero from '../components/landing/Hero'

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <LandingNavbar />
      <main className="space-y-20 md:space-y-32">
        <Hero />
      </main>
    </div>
  );
};

export default Landing;