// Server Component — purely CSS animated, no interactivity

const items = [
  "NATURE", "LANDSCAPE", "STREET", "PORTRAIT", "GOLDEN HOUR", "ADVENTURE",
  "NATURE", "LANDSCAPE", "STREET", "PORTRAIT", "GOLDEN HOUR", "ADVENTURE",
];

export default function Marquee() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "var(--bg-elevated)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "18px 0",
        overflow: "hidden",
      }}
    >
      {/* Duplicated content — the animation moves -50% to create a seamless loop */}
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marqueeScroll 18s linear infinite",
          width: "max-content",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: i % 2 === 0 ? "var(--text-secondary)" : "var(--text-muted)",
              padding: "0 24px",
            }}
          >
            {i % (items.length / 3) === 0 ? (
              <>
                {item}{" "}
                <span style={{ color: "var(--accent)" }}>✦</span>
              </>
            ) : (
              item
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
