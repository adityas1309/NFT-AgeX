import React from 'react'
import LandingNavbar from '../components/landing/LandingNavbar'
import Hero from '../components/landing/Hero'
import Features from "../components/landing/Features";
import PriceChart from "../components/landing/PriceChart";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <LandingNavbar />
      <main className="space-y-20 md:space-y-32">
        <Hero />
        <Features />
        <PriceChart />
        <CTA />
        <Footer />
      </main>
    </div>
  );
};

export default Landing;