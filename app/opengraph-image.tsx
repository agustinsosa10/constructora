import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IES Desarrollos Inmobiliarios — Salta Capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Barra roja superior */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#C41230",
          }}
        />

        {/* Acento vertical izquierdo */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "80px",
            width: "4px",
            height: "120px",
            background: "#C41230",
          }}
        />

        {/* Contenido */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "28px",
          }}
        >
          {/* Etiqueta */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#C41230",
              marginBottom: "18px",
            }}
          >
            Salta Capital · Argentina
          </div>

          {/* Título */}
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              color: "white",
              lineHeight: 0.95,
              letterSpacing: "-2px",
              marginBottom: "28px",
            }}
          >
            IES Desarrollos
            <br />
            Inmobiliarios
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.45)",
              fontWeight: 400,
              letterSpacing: "0.5px",
            }}
          >
            Construimos el futuro de Salta
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
