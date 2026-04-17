import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0A1628",
          borderRadius: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "6px solid #00D4FF",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              color: "#00D4FF",
              fontSize: 72,
              fontWeight: 800,
              fontFamily: "sans-serif",
              letterSpacing: -4,
            }}
          >
            DW
          </span>
          <span
            style={{
              color: "#00D4FF",
              fontSize: 80,
              fontWeight: 300,
              fontFamily: "sans-serif",
              marginTop: -8,
            }}
          >
            |
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
