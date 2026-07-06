import { ImageResponse } from "next/og";

/**
 * Default branded Open Graph image (1200×630). Renders a premium plum/marigold
 * card. Per-route dynamic OG images are added in Phase 5; each shareable URL
 * will generate its own title + description card via this same approach.
 */
export const alt = "Rofsan Sir — Your route to A* in O Level Bengali";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #382033 0%, #221a15 100%)",
          color: "#f3ede1",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Marigold accent bar */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: 14,
            height: "100%",
            background: "linear-gradient(180deg,#e2a039,#b97a23)",
          }}
        />
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#f1c878",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex", width: 40, height: 40 }}>
            {/* starburst dot */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                background: "#e2a039",
              }}
            />
          </div>
          CAIE Examiner · 8+ Years
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 86,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          <div style={{ display: "flex" }}>Your route to</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
            <span style={{ color: "#e2a039" }}>A&#42;</span>
            <span>in O Level Bengali</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 30,
            color: "#f3ede1",
            opacity: 0.9,
          }}
        >
          <div style={{ display: "flex" }}>Rofsan Sir · Lalmatia, Dhaka</div>
          <div style={{ display: "flex", color: "#f1c878" }}>rofsansir.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
