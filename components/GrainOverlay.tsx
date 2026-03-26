// Server Component — no interactivity
// The grain animation is on an inner div, NOT the fixed outer container.
// Animating transform on the fixed container itself causes the whole page to
// appear to "dance" because fixed elements participate in the stacking context
// of the viewport. Translating an inner child avoids this completely.
export default function GrainOverlay() {
  return (
    <div
      id="grain-wrapper"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        id="grain"
        style={{
          position: "absolute",
          // Oversize by 10% on each side so the translate animation never shows edges
          inset: "-10%",
          width: "120%",
          height: "120%",
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
          animation: "grain 0.8s steps(2) infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
