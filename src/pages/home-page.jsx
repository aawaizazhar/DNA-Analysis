import React from 'react';
import Hero from '../components/hero-section';
import Problem from '../components/problem-statement';
import Features from '../components/features-section';
import HowItWorks from '../components/how-it-works';
import UseCases from '../components/use-cases';
import SocialProof from '../components/social-proof';
import CTA from '../components/call-to-action';

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
