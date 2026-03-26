"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalleryItem from "./GalleryItem";
import GalleryLightbox from "./GalleryLightbox";

gsap.registerPlugin(ScrollTrigger);

export const galleryItems = [
  {
    id:       "01",
    gradient: "linear-gradient(135deg, #1a3a22 0%, #2d5a34 35%, #1a2e1e 70%, #0e1a11 100%)",
    accent:   "#89a17d",
    cat:      "Nature · Landscape",
    title:    "Golden Hour Ridge",
    caption:  "Hiked three hours before first light to reach the ridgeline. The valley was still dark when the edge of the sky turned ember — it lasted eight minutes. I got six frames. This was the third.",
    gridStyle:   { gridColumn: "1 / 8",  gridRow: "1 / 3", height: "580px" },
    mobileStyle: { gridColumn: "1 / 3",  height: "260px"  },
  },
  {
    id:       "02",
    gradient: "linear-gradient(135deg, #0d2035 0%, #1b3a52 40%, #0d1b2a 100%)",
    accent:   "#8a8f87",
    cat:      "Street · Urban",
    title:    "City After Rain",
    caption:  "Two in the morning, an hour after the storm cleared. The streets reflected everything — stoplights, storefronts, the sky. Cities only look this honest when no one is watching.",
    gridStyle:   { gridColumn: "8 / 13", gridRow: "1 / 2", height: "280px" },
    mobileStyle: { gridColumn: "1 / 2",  height: "210px"  },
  },
  {
    id:       "03",
    gradient: "linear-gradient(160deg, #2a3018 0%, #3d4a22 45%, #1e2a10 100%)",
    accent:   "#c4d4bb",
    cat:      "Portrait",
    title:    "The Gaze",
    caption:  "She didn't ask what to do with her hands. Just looked into the lens like she'd been waiting for someone to finally pay attention. Shot a full roll before either of us spoke. This frame was the last.",
    gridStyle:   { gridColumn: "8 / 13", gridRow: "2 / 3", height: "280px" },
    mobileStyle: { gridColumn: "2 / 3",  height: "210px"  },
  },
  {
    id:       "04",
    gradient: "linear-gradient(160deg, #0d2218 0%, #163524 40%, #0a1812 100%)",
    accent:   "#89a17d",
    cat:      "Nature · Landscape",
    title:    "Into the Wild",
    caption:  "Forty miles from the nearest road, the forest stops performing. I set up in the same clearing three mornings in a row until the fog broke exactly right. The silence between frames was its own kind of exposure.",
    gridStyle:   { gridColumn: "1 / 5",  gridRow: "3 / 4", height: "420px" },
    mobileStyle: { gridColumn: "1 / 2",  height: "210px"  },
  },
  {
    id:       "05",
    gradient: "linear-gradient(160deg, #152038 0%, #1e2f4a 45%, #0f1a2a 100%)",
    accent:   "#555a52",
    cat:      "Portrait",
    title:    "Self Portrait",
    caption:  "Every photographer eventually turns the camera around. I kept delaying it. Set the timer, stepped back, tried to forget I was in the frame. This was take eleven — the only one where I succeeded.",
    gridStyle:   { gridColumn: "5 / 9",  gridRow: "3 / 4", height: "420px" },
    mobileStyle: { gridColumn: "2 / 3",  height: "210px"  },
  },
  {
    id:       "06",
    gradient: "linear-gradient(135deg, #1e3020 0%, #152535 50%, #0e1a14 100%)",
    accent:   "#4d6b47",
    cat:      "Street · Urban",
    title:    "Neon & Concrete",
    caption:  "The underpass smelled like rain and motor oil. Pink neon from the club across the street hit the wet ground at exactly the right angle for about twenty minutes each night. I went back four times to get the exposure right.",
    gridStyle:   { gridColumn: "9 / 13", gridRow: "3 / 4", height: "420px" },
    mobileStyle: { gridColumn: "1 / 3",  height: "210px"  },
  },
];

export default function Gallery() {
  const headerRef  = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef  = useRef<HTMLDivElement>(null);

  // Track selected index (null = lightbox closed)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleClose = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header  = headerRef.current;
      const desktop = desktopRef.current;
      const mobile  = mobileRef.current;

      if (header) {
        gsap.fromTo(header, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: header, start: "top 90%", once: true },
        });
      }

      if (desktop) {
        const items = Array.from(desktop.children) as HTMLElement[];
        items.forEach((el) => { el.style.opacity = "0"; el.style.transform = "translateY(50px)"; });
        gsap.to(items, {
          opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: desktop, start: "top 80%", once: true },
        });
      }

      if (mobile) {
        const items = Array.from(mobile.children) as HTMLElement[];
        items.forEach((el) => { el.style.opacity = "0"; el.style.transform = "translateY(40px)"; });
        gsap.to(items, {
          opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: mobile, start: "top 80%", once: true },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      style={{ backgroundColor: "var(--bg-primary)", padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 48px)" }}
    >
      {/* Section header */}
      <div
        ref={headerRef}
        style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "24px", marginBottom: "32px",
          opacity: 0,
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "8px" }}>
            Selected Work
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.92, color: "var(--text-primary)", margin: 0 }}>
            GALLERY
          </h2>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", color: "var(--text-secondary)" }}>
          06 Projects
        </span>
      </div>

      {/* Desktop 12-col asymmetric grid */}
      <div
        ref={desktopRef}
        className="hidden md:grid"
        style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: "12px" }}
      >
        {galleryItems.map((item, i) => (
          <GalleryItem
            key={item.id}
            item={item}
            containerStyle={item.gridStyle}
            onClick={() => setSelectedIndex(i)}
          />
        ))}
      </div>

      {/* Mobile 2-col grid */}
      <div
        ref={mobileRef}
        className="grid md:hidden"
        style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}
      >
        {galleryItems.map((item, i) => (
          <GalleryItem
            key={`m-${item.id}`}
            item={item}
            containerStyle={item.mobileStyle}
            onClick={() => setSelectedIndex(i)}
          />
        ))}
      </div>

      {/* Lightbox — only mounted when an item is selected */}
      {selectedIndex !== null && (
        <GalleryLightbox
          items={galleryItems}
          initialIndex={selectedIndex}
          onClose={handleClose}
        />
      )}
    </section>
  );
}
