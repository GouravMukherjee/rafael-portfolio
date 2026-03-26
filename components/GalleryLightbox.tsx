"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";

// ─── Shared data shape ────────────────────────────────────────────────────────
export interface GalleryItemData {
  id:       string;
  gradient: string;
  accent:   string;
  cat:      string;
  title:    string;
  caption:  string;
  src?:     string;
}

interface GalleryLightboxProps {
  items:        GalleryItemData[];
  initialIndex: number;
  onClose:      () => void;
}

// ─── Inline SVG noise ────────────────────────────────────────────────────────
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

// ─── Reusable prev / next button ─────────────────────────────────────────────
function NavBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "38px", height: "38px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "none",
        border: "1px solid rgba(137,161,125,0.15)",
        borderRadius: "2px",
        color: "#8a8f87",
        fontSize: "16px",
        lineHeight: 1,
        flexShrink: 0,
        transition: "border-color 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.borderColor = "#89a17d";
        b.style.color       = "#89a17d";
      }}
      onMouseLeave={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.borderColor = "rgba(137,161,125,0.15)";
        b.style.color       = "#8a8f87";
      }}
    >
      {label}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function GalleryLightbox({ items, initialIndex, onClose }: GalleryLightboxProps) {
  const overlayRef      = useRef<HTMLDivElement>(null);
  const panelRef        = useRef<HTMLDivElement>(null);
  const contentRef      = useRef<HTMLDivElement>(null);
  // Keep a ref so key-listener callbacks always read the latest index
  const currentIndexRef = useRef(initialIndex);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  currentIndexRef.current = currentIndex;

  const item       = items[currentIndex];
  const totalLabel = String(items.length).padStart(2, "0");

  // ── Close (with exit animation) ──────────────────────────────────────────
  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) { onClose(); return; }
    gsap.to(panel,   { opacity: 0, scale: 0.96, y: 16, duration: 0.22, ease: "power2.in" });
    gsap.to(overlay, { opacity: 0, duration: 0.28, ease: "power2.in", onComplete: onClose });
  }, [onClose]);

  // ── Content-swap fade (prev / next) ──────────────────────────────────────
  const animateTransition = useCallback((newIndex: number) => {
    const content = contentRef.current;
    if (!content) { setCurrentIndex(newIndex); return; }
    gsap.killTweensOf(content);
    gsap.to(content, {
      opacity: 0, duration: 0.15, ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(newIndex);
        gsap.to(content, { opacity: 1, duration: 0.2, ease: "power2.out" });
      },
    });
  }, []);

  const prev = useCallback(() => {
    animateTransition((currentIndexRef.current - 1 + items.length) % items.length);
  }, [items.length, animateTransition]);

  const next = useCallback(() => {
    animateTransition((currentIndexRef.current + 1) % items.length);
  }, [items.length, animateTransition]);

  // ── Animate in on mount + scroll-lock ────────────────────────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (overlay && panel) {
      gsap.killTweensOf([overlay, panel]);
      gsap.fromTo(overlay, { opacity: 0 },                     { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(panel,   { opacity: 0, scale: 0.96, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" });
    }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Keyboard listener (re-binds when prev / next / handleClose change) ───
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     handleClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handleClose, prev, next]);

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0,
        backgroundColor: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 500,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(16px, 4vw, 40px)",
      }}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "780px",
          backgroundColor: "var(--bg-surface)",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(137,161,125,0.15)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* ── Fading content area (image + caption) ────────────────────── */}
        <div ref={contentRef}>

          {/* Image / gradient */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 10",
              overflow: "hidden",
              background: item.src ? "#000" : item.gradient,
            }}
          >
            {/* Real image when src is provided */}
            {item.src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt={item.title}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                }}
              />
            )}

            {/* Noise texture */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              backgroundImage: NOISE_SVG, backgroundSize: "160px",
              opacity: 0.06, mixBlendMode: "overlay",
              pointerEvents: "none", zIndex: 1,
            }} />

            {/* Scanlines */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
              pointerEvents: "none", zIndex: 2,
            }} />

            {/* Vignette */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
              pointerEvents: "none", zIndex: 3,
            }} />

            {/* Ghost index number — decorative, very low opacity */}
            <div aria-hidden="true" style={{
              position: "absolute", top: "-0.05em", right: "10px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(64px, 8vw, 96px)",
              lineHeight: 1,
              color: "rgba(255,255,255,0.06)",
              pointerEvents: "none", userSelect: "none",
              zIndex: 4,
            }}>
              {item.id}
            </div>

            {/* Counter — top left */}
            <span style={{
              position: "absolute", top: "18px", left: "20px",
              fontFamily: "var(--font-mono)", fontSize: "10px",
              letterSpacing: "0.25em",
              color: "rgba(224,225,221,0.45)",
              zIndex: 5,
            }}>
              {item.id} / {totalLabel}
            </span>

            {/* ESC hint — top right */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute", top: "14px", right: "14px",
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px",
                color: "rgba(224,225,221,0.55)",
                fontFamily: "var(--font-mono)", fontSize: "9px",
                letterSpacing: "0.2em", padding: "5px 10px",
                zIndex: 5,
              }}
            >
              ESC
            </button>
          </div>

          {/* Caption bar */}
          <div style={{ padding: "20px 24px 18px" }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "10px",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: item.accent, marginBottom: "6px",
            }}>
              {item.cat}
            </div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 0.95, letterSpacing: "0.02em",
              color: "#fff",
            }}>
              {item.title.toUpperCase()}
            </div>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px", fontWeight: 300,
              lineHeight: 1.75, color: "#8a8f87",
              maxWidth: "520px", margin: "10px 0 0",
            }}>
              {item.caption}
            </p>
          </div>
        </div>

        {/* ── Navigation bar ───────────────────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid rgba(137,161,125,0.15)",
          padding: "14px 24px",
        }}>
          {/* Prev — dots — next */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <NavBtn onClick={prev} label="←" />

            {/* Progress dots */}
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              {items.map((_, i) => (
                <div key={i} style={{
                  height: "4px",
                  width:           i === currentIndex ? "18px" : "4px",
                  borderRadius:    i === currentIndex ? "2px"  : "50%",
                  backgroundColor: i === currentIndex ? "#89a17d" : "#8a8f87",
                  opacity:         i === currentIndex ? 1 : 0.3,
                  transition: "width 0.3s ease, opacity 0.3s ease, background-color 0.3s ease",
                }} />
              ))}
            </div>

            <NavBtn onClick={next} label="→" />
          </div>

          {/* Close */}
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "1px solid rgba(137,161,125,0.15)",
              borderRadius: "2px",
              color: "#8a8f87",
              fontFamily: "var(--font-mono)", fontSize: "10px",
              letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "10px 18px",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.borderColor = "#89a17d";
              b.style.color       = "#89a17d";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.borderColor = "rgba(137,161,125,0.15)";
              b.style.color       = "#8a8f87";
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
