// Server Component

const year = new Date().getFullYear();

const links = [
  { label: "Work",      href: "#gallery"  },
  { label: "About",     href: "#about"    },
  { label: "Book",      href: "#booking"  },
  { label: "Instagram ↗", href: "https://www.instagram.com/rafael1barra/", external: true },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "clamp(32px, 5vh, 48px) clamp(24px, 5vw, 48px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {/* Wordmark */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "32px",
            letterSpacing: "0.1em",
            color: "var(--text-primary)",
          }}
        >
          RAFAEL IBARRA
        </span>

        {/* Center links */}
        <nav
          style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center" }}
          aria-label="Footer navigation"
        >
          {links.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)"; }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
          }}
        >
          © {year} Rafael Ibarra
        </span>
      </div>
    </footer>
  );
}
