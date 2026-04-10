import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          background: "#C41230",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: "-2px",
            fontFamily: "sans-serif",
            lineHeight: 1,
          }}
        >
          IES
        </span>
      </div>
    ),
    size
  );
}
