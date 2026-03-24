"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    name: "Nature & Landscape",
    desc: "From golden-hour ridgelines to storm-lit coastlines. Environmental work that puts you there.",
  },
  {
    num: "02",
    name: "Street & Portrait",
    desc: "Documentary-style urban photography. Finding character in chaos.",
  },
  {
    num: "03",
    name: "Adventure & Travel",
    desc: "Chasing light across the globe. Raw, unfiltered, real.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const grid   = gridRef.current;
    if (!header || !grid) return;

    gsap.fromTo(header, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: header, start: "top 85%", once: true } });
    gsap.fromTo(Array.from(grid.children), { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: grid, start: "top 80%", once: true } });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ backgroundColor: "var(--bg-elevated)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "clamp(48px, 8vh, 80px) clamp(24px, 5vw, 48px)" }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "0", opacity: 0 }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "8px" }}>
            What I Offer
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.92, color: "var(--text-primary)", margin: 0 }}>
            SERVICES
          </h2>
        </div>
      </div>

      {/* Services grid */}
      <div
        ref={gridRef}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px", marginTop: "24px" }}
      >
        {services.map(({ num, name, desc }) => (
          <ServiceCard key={num} num={num} name={name} desc={desc} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ num, name, desc }: { num: string; name: string; desc: string }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const onEnter = () => {
    if (!cardRef.current || !arrowRef.current) return;
    cardRef.current.style.backgroundColor = "#1e2d42";
    gsap.to(arrowRef.current, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" });
  };

  const onLeave = () => {
    if (!cardRef.current || !arrowRef.current) return;
    cardRef.current.style.backgroundColor = "var(--bg-elevated)";
    gsap.to(arrowRef.current, { opacity: 0, x: -8, duration: 0.2 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        padding: "40px 32px",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        backgroundColor: "var(--bg-elevated)",
        transition: "background-color 0.3s",
        opacity: 0,
      }}
    >
      {/* Arrow — hidden by default */}
      <span
        ref={arrowRef}
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          fontFamily: "var(--font-mono)",
          fontSize: "18px",
          color: "var(--accent)",
          opacity: 0,
          transform: "translateX(-8px)",
        }}
      >
        →
      </span>

      {/* Number */}
      <div style={{ fontFamily: "var(--font-display)", fontSize: "64px", lineHeight: 1, color: "rgba(88,129,87,0.10)", marginBottom: "16px" }}>
        {num}
      </div>

      {/* Name */}
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "32px", lineHeight: 1, color: "var(--text-primary)", margin: "0 0 16px" }}>
        {name}
      </h3>

      {/* Description */}
      <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 300, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}
