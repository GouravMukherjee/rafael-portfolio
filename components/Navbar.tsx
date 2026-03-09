"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Work",      href: "gallery", external: null },
  { label: "About",     href: "about",   external: null },
  { label: "Book",      href: "booking", external: null },
  { label: "Instagram", href: "",        external: "https://www.instagram.com/rafael1barra/" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface NavbarProps {
  ready: boolean;
}

export default function Navbar({ ready }: NavbarProps) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const navRef        = useRef<HTMLElement>(null);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const overlayLinks  = useRef<HTMLDivElement>(null);
  const animated      = useRef(false);

  // Entry animation — fires once after loader completes
  useEffect(() => {
    if (!ready || animated.current || !navRef.current) return;
    animated.current = true;
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, [ready]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu open/close animation
  useEffect(() => {
    const overlay = overlayRef.current;
    const links   = overlayLinks.current;
    if (!overlay || !links) return;

    if (menuOpen) {
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
      gsap.fromTo(overlay,  { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        Array.from(links.children),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => { overlay.style.display = "none"; },
      });
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navStyle: React.CSSProperties = {
    backgroundColor: scrolled ? "rgba(13,27,42,0.9)"  : "transparent",
    backdropFilter:  scrolled ? "blur(20px)"           : "none",
    borderBottom:    scrolled ? "1px solid var(--border)" : "none",
    mixBlendMode:    scrolled ? "normal"               : "difference",
    opacity:         ready    ? 1                       : 0,
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-7 transition-colors duration-500"
        style={navStyle}
      >
        {/* Wordmark */}
        <button
          onClick={() => scrollTo("hero")}
          style={{ fontFamily: "var(--font-display)", fontSize: "22px", letterSpacing: "0.15em", color: "var(--text-primary)", background: "none", border: "none", padding: 0 }}
        >
          RI
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map(({ label, href, external }) => (
            <li key={label}>
              {external ? (
                <a
                  href={external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-primary)", textDecoration: "none" }}
                >
                  {label} ↗
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: "var(--accent)" }} />
                </a>
              ) : (
                <button
                  onClick={() => scrollTo(href)}
                  className="relative group"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-primary)", background: "none", border: "none", padding: 0 }}
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ backgroundColor: "var(--accent)" }} />
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="block h-px w-6 transition-all duration-300" style={{ backgroundColor: "var(--text-primary)", transform: menuOpen ? "rotate(45deg) translate(1px, 3px)" : "none" }} />
          <span className="block h-px w-6 transition-all duration-300" style={{ backgroundColor: "var(--text-primary)", opacity: menuOpen ? 0 : 1 }} />
          <span className="block h-px w-6 transition-all duration-300" style={{ backgroundColor: "var(--text-primary)", transform: menuOpen ? "rotate(-45deg) translate(1px, -3px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        style={{ display: "none", position: "fixed", inset: 0, zIndex: 99, backgroundColor: "var(--bg-primary)", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
      >
        <div ref={overlayLinks} className="flex flex-col items-center gap-8">
          {navLinks.map(({ label, href, external }) =>
            external ? (
              <a
                key={label}
                href={external}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 8vw, 56px)", color: "var(--text-primary)", textDecoration: "none", opacity: 0 }}
              >
                {label} ↗
              </a>
            ) : (
              <button
                key={label}
                onClick={() => { setMenuOpen(false); setTimeout(() => scrollTo(href), 300); }}
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 8vw, 56px)", color: "var(--text-primary)", background: "none", border: "none", padding: 0, opacity: 0 }}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}
