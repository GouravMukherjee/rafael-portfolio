"use client";

import { useState, useCallback } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/HeroSequence";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Services from "@/components/Services";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  // `ready` transitions from false → true when the loader animation completes.
  // It gates the entry animations on Navbar and Hero so they only fire after
  // the loader slides away, not during it.
  const [ready, setReady] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />
      <Navbar ready={ready} />
      <main>
        <HeroSequence />
        <Gallery />
        <About />
        <Services />
        <Booking />
        <Footer />
      </main>
    </>
  );
}
