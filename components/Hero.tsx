"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroProps {
  ready: boolean;
}

export default function Hero({ ready }: HeroProps) {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLDivElement>(null);
  const line2Ref   = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const animated   = useRef(false);

  useEffect(() => {
    if (!ready || animated.current) return;
    animated.current = true;

    const tl = gsap.timeline();
    tl.fromTo(eyebrowRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.1)
      .fromTo(line1Ref.current,   { y: "110%" }, { y: "0%", duration: 1.0, ease: "power4.out" }, 0.1)
      .fromTo(line2Ref.current,   { y: "110%" }, { y: "0%", duration: 1.0, ease: "power4.out" }, 0.22)
      .fromTo(bottomRef.current,  { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.6)
      .fromTo(scrollRef.current,  { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, 1.2);
  }, [ready]);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Animated grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-80px",
          backgroundImage: `linear-gradient(rgba(88,129,87,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(88,129,87,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          animation: "gridShift 20s linear infinite",
        }}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, rgba(14,21,32,0.5) 0%, rgba(13,27,42,0) 50%, rgba(9,20,32,0.92) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 clamp(24px, 5vw, 48px) clamp(48px, 8vh, 80px)",
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "24px", opacity: 0 }}
        >
          Visual Artist · Photographer
        </div>

        {/* Title lines */}
        <div style={{ marginBottom: "clamp(32px, 5vh, 56px)" }}>
          <div style={{ overflow: "hidden" }}>
            <div
              ref={line1Ref}
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(72px, 13vw, 180px)", lineHeight: 0.88, color: "var(--text-primary)", transform: "translateY(110%)" }}
            >
              RAFAEL
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              ref={line2Ref}
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(72px, 13vw, 180px)", lineHeight: 0.88, color: "var(--text-secondary)", paddingLeft: "clamp(40px, 8vw, 120px)", transform: "translateY(110%)" }}
            >
              IBARRA
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          ref={bottomRef}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", opacity: 0 }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 300, color: "var(--text-secondary)", maxWidth: "280px", lineHeight: 1.7, margin: 0 }}>
            Nature. Light. Moments.
            <br />
            Every frame is a decision. Every shot is a statement.
          </p>

          <button
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-4"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-primary)" }}>
              View Work
            </span>
            <span
              className="flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--accent)]"
              style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: "18px" }}
            >
              ↓
            </span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "clamp(24px, 3vw, 40px)",
          bottom: "clamp(48px, 8vh, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0,
        }}
      >
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, var(--accent), transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", writingMode: "vertical-rl" }}>
          Scroll
        </span>
      </div>
    </section>
  );
}
