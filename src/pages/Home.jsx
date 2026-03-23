import React from 'react';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import UseCases from '../components/UseCases';
import SocialProof from '../components/SocialProof';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <UseCases />
      <SocialProof />
      <CTA />
    </main>
  );
}
