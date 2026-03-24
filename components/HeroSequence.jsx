"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroSequence.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const textRef    = useRef(null);
  const dimRef     = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image   = imageRef.current;
    const text    = textRef.current;
    const dim     = dimRef.current;
    if (!section || !image || !text || !dim) return;

    // Scale > 1 fills the viewport — overflow:hidden on imageOuter clips the excess.
    // No negative inset tricks needed; scale handles the extra coverage.
    gsap.set(image, { scale: 1.15, transformOrigin: "center center" });
    gsap.set(text,  { opacity: 0, y: 20 });
    gsap.set(dim,   { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger:       section,
        start:         "top top",
        end:           "+=900",
        pin:           true,
        scrub:         1.5,
        anticipatePin: 1,
      },
    });

    // 0.00 → 0.60  slow camera push-in
    tl.to(image, { scale: 1.35, ease: "none", duration: 0.6 }, 0);

    // 0.20 → 0.55  hero text rises and fades in
    tl.to(text, { opacity: 1, y: 0, ease: "power2.out", duration: 0.35 }, 0.2);

    // 0.65 → 1.00  dims to black — blends seamlessly into gallery
    tl.to(dim, { opacity: 1, ease: "power2.in", duration: 0.35 }, 0.65);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className={styles.section}>

      {/* Image layer — plain <img> avoids next/image wrapper interference with GSAP */}
      <div className={styles.imageOuter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src="/images/hero-snowboard.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className={styles.image}
        />
      </div>

      {/* Permanent cinematic gradient — light top, fades to black at bottom */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Scroll-driven blackout — GSAP animates opacity 0 → 1 */}
      <div ref={dimRef} className={styles.dimOverlay} aria-hidden="true" />

      {/* Hero text — invisible on load, rises in during scroll */}
      <div ref={textRef} className={styles.content}>
        <h1 className={styles.name}>
          <span className={styles.line1}>RAFAEL</span>
          <span className={styles.line2}>IBARRA</span>
        </h1>
        <p className={styles.tagline}>Nature · Light · Moments</p>
        <button
          className={styles.cta}
          onClick={() =>
            document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          View Work ↓
        </button>
      </div>

    </section>
  );
}
