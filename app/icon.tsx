import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0A1628",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1.5px solid #00D4FF",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <span
            style={{
              color: "#00D4FF",
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "sans-serif",
              letterSpacing: -1,
            }}
          >
            DW
          </span>
          <span
            style={{
              color: "#00D4FF",
              fontSize: 16,
              fontWeight: 300,
              fontFamily: "sans-serif",
              marginTop: -2,
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
