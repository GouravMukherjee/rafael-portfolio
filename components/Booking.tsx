"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  color: "var(--text-primary)",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s, background-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "10px",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "var(--text-secondary)",
  marginBottom: "8px",
};

export default function Booking() {
  const leftRef   = useRef<HTMLDivElement>(null);
  const rightRef  = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,  { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1.0, ease: "power3.out", scrollTrigger: { trigger: leftRef.current,  start: "top 80%", once: true } });
      gsap.fromTo(rightRef.current, { opacity: 0, x: 40  }, { opacity: 1, x: 0, duration: 1.0, ease: "power3.out", scrollTrigger: { trigger: rightRef.current, start: "top 80%", once: true } });
    });
    return () => ctx.revert();
  }, []);

  const handleFocus  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor     = "var(--accent)";
    e.target.style.backgroundColor = "rgba(88,129,87,0.03)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor     = "var(--border)";
    e.target.style.backgroundColor = "rgba(255,255,255,0.03)";
  };

  return (
    <section
      id="booking"
      style={{ backgroundColor: "var(--bg-primary)", borderTop: "1px solid var(--border)", padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 48px)" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "clamp(40px, 8vw, 80px)", alignItems: "start" }}>
        {/* Left: Copy */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "24px" }}>
            Let&apos;s Work
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.92, color: "var(--text-primary)", margin: "0 0 32px" }}>
            BOOK A<br />SHOOT
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 300, color: "var(--text-secondary)", lineHeight: 1.8, maxWidth: "340px" }}>
            Got a vision? Fill out the form and I&apos;ll get back to you within{" "}
            <strong style={{ color: "var(--accent)", fontWeight: 400 }}>48 hours</strong>.
          </p>
        </div>

        {/* Right: Form */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            noValidate
          >
            {/* Row 1: First / Last */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" placeholder="Rafael" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" placeholder="Ibarra" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            {/* Row 2: Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <input type="email" placeholder="you@example.com" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>

            {/* Row 3: Shoot type + Date */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Shoot Type</label>
                <select style={{ ...inputStyle, appearance: "none" }} onFocus={handleFocus} onBlur={handleBlur} defaultValue="">
                  <option value="" disabled>Select...</option>
                  <option>Nature / Landscape</option>
                  <option>Street / Urban</option>
                  <option>Portrait</option>
                  <option>Adventure / Travel</option>
                  <option>Mixed / Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Preferred Date</label>
                <input type="date" style={{ ...inputStyle, colorScheme: "dark" }} onFocus={handleFocus} onBlur={handleBlur} />
              </div>
            </div>

            {/* Row 4: Budget */}
            <div>
              <label style={labelStyle}>Budget Range</label>
              <select style={{ ...inputStyle, appearance: "none" }} onFocus={handleFocus} onBlur={handleBlur} defaultValue="">
                <option value="" disabled>Select...</option>
                <option>$200 – $500</option>
                <option>$500 – $1,000</option>
                <option>$1,000 – $2,500</option>
                <option>$2,500+</option>
              </select>
            </div>

            {/* Row 5: Message */}
            <div>
              <label style={labelStyle}>Project Details</label>
              <textarea
                placeholder="Tell me about your project..."
                rows={5}
                style={{ ...inputStyle, resize: "none", minHeight: "120px" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "16px 32px",
                backgroundColor: sent ? "var(--accent-hover)" : "var(--accent)",
                color: "var(--bg-primary)",
                border: "none",
                borderRadius: "8px",
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                letterSpacing: "0.1em",
                transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!sent) {
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 20px 40px var(--accent-glow)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "none";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              {sent ? "Sent ✓" : "Send It →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
