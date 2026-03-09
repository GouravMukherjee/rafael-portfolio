"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef    = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLDivElement>(null);
  const barFillRef   = useRef<HTMLDivElement>(null);
  const countRef     = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loader  = loaderRef.current;
    const name    = nameRef.current;
    const barFill = barFillRef.current;
    const count   = countRef.current;
    if (!loader || !name || !barFill || !count) return;

    const tl = gsap.timeline();

    // 0.2s: Name clips up from below
    tl.fromTo(
      name,
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out" },
      0.2
    );

    // 0.2s: Progress bar fills
    tl.fromTo(
      barFill,
      { width: "0%" },
      {
        width: "100%",
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate() {
          const p = Math.round(this.progress() * 100);
          if (count) count.textContent = String(p).padStart(3, "0");
        },
      },
      0.2
    );

    // After bar completes + 0.2s gap: slide loader up
    tl.to(
      loader,
      {
        yPercent: -100,
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: () => {
          loader.style.display = "none";
          onComplete();
        },
      },
      "+=0.2"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        backgroundColor: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
      }}
    >
      {/* Name reveal */}
      <div style={{ overflow: "hidden" }}>
        <div
          ref={nameRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 10vw, 120px)",
            lineHeight: 1,
            letterSpacing: "0.05em",
            color: "var(--text-primary)",
            transform: "translateY(110%)",
            opacity: 0,
          }}
        >
          RAFAEL IBARRA
        </div>
      </div>

      {/* Progress bar + counter */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        {/* Track */}
        <div
          style={{
            width: "200px",
            height: "1px",
            background: "var(--border)",
            position: "relative",
          }}
        >
          {/* Fill */}
          <div
            ref={barFillRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "0%",
              background: "var(--accent)",
            }}
          />
        </div>

        {/* Counter */}
        <span
          ref={countRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: "var(--text-secondary)",
          }}
        >
          000
        </span>
      </div>
    </div>
  );
}
