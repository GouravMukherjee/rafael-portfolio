"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring   = ringRef.current;
    if (!cursor || !ring) return;

    let ringX = 0, ringY = 0;
    let cursorX = 0, cursorY = 0;
    let rafId: number;
    let running = false;

    // ── rAF loop — only active while cursor is moving or ring is catching up ──
    const loop = () => {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top  = `${cursorY}px`;

      ringX += (cursorX - ringX) * 0.12;
      ringY += (cursorY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;

      // Keep looping until ring has converged within 0.1px
      if (Math.abs(cursorX - ringX) > 0.1 || Math.abs(cursorY - ringY) > 0.1) {
        rafId = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const onMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      // Only start a new rAF chain if one isn't already running
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    // ── Hover state — delegated to document (handles dynamic elements) ────────
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest("a, button, [role='button'], input, textarea, select")) {
        document.body.classList.add("cursor-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      const rel = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (!rel?.closest("a, button, [role='button'], input, textarea, select")) {
        document.body.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout",  onOut,  { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cursor"      ref={cursorRef} aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef}   aria-hidden="true" />
    </>
  );
}
