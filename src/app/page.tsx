import { HeroMotion } from '@/components/effects/hero-motion';
import { RevealRuntime } from '@/components/effects/reveal/runtime';
import { Header } from '@/components/layout/header';
import { About } from '@/sections/about';
import { Booking } from '@/sections/booking';
import { Hero } from '@/sections/hero';
import { Music } from '@/sections/music';

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <HeroMotion />
      <RevealRuntime />
      <main id="main">
        <Hero />
        <About />
        <Music />
        <Booking />
      </main>
    </>
  );
}
