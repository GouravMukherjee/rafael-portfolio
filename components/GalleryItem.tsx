"use client";

import { useRef, useCallback } from "react";
import { type GalleryItemData } from "./GalleryLightbox";

interface GalleryItemProps {
  item:           GalleryItemData;
  containerStyle: React.CSSProperties;
  onClick:        () => void;
}

export default function GalleryItem({ item, containerStyle, onClick }: GalleryItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef     = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const viewHintRef  = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el  = containerRef.current;
    const img = imageRef.current;
    if (!el || !img) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
    const y = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;
    // Scale stays at 1.04 to match hover baseline
    img.style.transform = `scale(1.04) translate(${x * 10}px, ${y * 7}px)`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    const img      = imageRef.current;
    const overlay  = overlayRef.current;
    const content  = contentRef.current;
    const viewHint = viewHintRef.current;
    if (img)      { img.style.filter = "brightness(0.6)"; }
    if (overlay)  { overlay.style.opacity  = "1"; }
    if (content)  { content.style.transform = "translateY(-4px)"; }
    if (viewHint) { viewHint.style.opacity = "1"; }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const img      = imageRef.current;
    const overlay  = overlayRef.current;
    const content  = contentRef.current;
    const viewHint = viewHintRef.current;
    if (img)      { img.style.filter = "brightness(1)"; img.style.transform = "scale(1) translate(0px, 0px)"; }
    if (overlay)  { overlay.style.opacity   = "0"; }
    if (content)  { content.style.transform = "translateY(0px)"; }
    if (viewHint) { viewHint.style.opacity  = "0"; }
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        backgroundColor: "var(--bg-elevated)",
        cursor: "pointer",
        ...containerStyle,
      }}
    >
      {/* ── Gradient background / image placeholder ─────────── */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          inset: 0,
          background: item.gradient,
          // CSS transition handles the hover scale + brightness; parallax
          // updates transform directly on mouse-move (overrides transition
          // during movement, snaps back smoothly on leave via this transition)
          transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease",
          transform: "scale(1) translate(0px, 0px)",
        }}
      >
        {/* Noise texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "160px",
            opacity: 0.06,
            mixBlendMode: "overlay",
          }}
        />

        {/* Vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* ── Hover overlay ────────────────────────────────────── */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)",
          opacity: 0,
          transition: "opacity 0.45s ease",
        }}
      />

      {/* ── Item number — top right ───────────────────────────── */}
      <span
        style={{
          position: "absolute", top: "18px", right: "20px",
          fontFamily: "var(--font-mono)", fontSize: "10px",
          letterSpacing: "0.2em",
          color: "rgba(224,225,221,0.35)",
          lineHeight: 1, zIndex: 2,
        }}
      >
        {item.id}
      </span>

      {/* ── Bottom content ────────────────────────────────────── */}
      <div
        ref={contentRef}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "clamp(16px, 2.5vw, 24px)",
          zIndex: 2,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
        }}
      >
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "9px",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: item.accent, marginBottom: "6px", opacity: 0.9,
        }}>
          {item.cat}
        </div>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(20px, 2.2vw, 30px)",
          lineHeight: 0.95, color: "var(--text-primary)", letterSpacing: "0.01em",
        }}>
          {item.title.toUpperCase()}
        </div>
      </div>

      {/* ── Accent line at bottom edge ────────────────────────── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "2px", backgroundColor: item.accent,
        opacity: 0.4, zIndex: 3,
      }} />

      {/* ── "View Work" pill — appears on hover ───────────────── */}
      <div
        ref={viewHintRef}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#89a17d",
          border: "1px solid #89a17d",
          borderRadius: "2px",
          padding: "7px 18px",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: 0,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
          zIndex: 4,
          whiteSpace: "nowrap",
        }}
      >
        View Work
      </div>
    </div>
  );
}
