"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5,    suffix: "+", label: "Years Shooting" },
  { value: 200,  suffix: "+", label: "Projects Done"  },
  { value: 3000, suffix: "+", label: "Followers"      },
];

export default function About() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const statRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const portrait = portraitRef.current;
      const content  = contentRef.current;
      if (!portrait || !content) return;

      gsap.fromTo(portrait, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1.0, ease: "power3.out", scrollTrigger: { trigger: portrait, start: "top 80%", once: true } });
      gsap.fromTo(content,  { opacity: 0, x: 40  }, { opacity: 1, x: 0, duration: 1.0, ease: "power3.out", scrollTrigger: { trigger: content,  start: "top 80%", once: true } });

      stats.forEach(({ value }, i) => {
        const el = statRefs.current[i];
        if (!el) return;
        const obj = { count: 0 };
        gsap.to(obj, {
          count: value,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => { el.textContent = Math.round(obj.count).toLocaleString(); },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      style={{ backgroundColor: "var(--bg-primary)", borderTop: "1px solid var(--border)", padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 48px)" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "clamp(40px, 6vw, 80px)", alignItems: "start" }}>
        {/* Left: Portrait */}
        <div ref={portraitRef} style={{ opacity: 0, position: "relative" }}>
          <div style={{ aspectRatio: "4/5", background: "linear-gradient(160deg, #141f1e 0%, #0e1a16 50%, var(--bg-primary) 100%)", position: "relative", overflow: "hidden", borderRadius: "12px" }}>
            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", opacity: 0.4 }}>
              Photo Placeholder
            </span>
            <div style={{ position: "absolute", bottom: "16px", left: "16px", backgroundColor: "rgba(13,27,42,0.8)", backdropFilter: "blur(8px)", padding: "6px 12px", borderRadius: "6px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.2em", color: "var(--text-secondary)" }}>@rafael1barra</span>
            </div>
            <div style={{ position: "absolute", top: "24px", right: "-1px", backgroundColor: "var(--accent)", padding: "8px 6px", writingMode: "vertical-rl", transform: "rotate(180deg)", borderRadius: "0 0 6px 6px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", letterSpacing: "0.1em", color: "var(--bg-primary)" }}>VISUAL ARTIST</span>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div ref={contentRef} style={{ opacity: 0 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "24px" }}>
            The Artist
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 0.92, color: "var(--text-primary)", margin: "0 0 32px" }}>
            BEHIND THE <em style={{ color: "var(--text-secondary)", fontStyle: "normal", display: "block" }}>LENS</em>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 300, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "20px" }}>
            I chase light the way others chase deadlines — relentlessly, with purpose. My work lives at the intersection of raw nature, quiet streets, and the fleeting beauty of ordinary moments.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 300, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "48px" }}>
            No posed setups. No corporate sterility. Just honest frames that make you feel something real.
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
            {stats.map(({ suffix, label }, i) => (
              <div key={label}>
                <div style={{ marginBottom: "6px" }}>
                  <span ref={(el) => { statRefs.current[i] = el; }} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 52px)", color: "var(--text-primary)" }}>0</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", color: "var(--accent)" }}>{suffix}</span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-secondary)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
