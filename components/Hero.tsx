export default function Hero() {
  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        padding: "0 24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: "clamp(48px, 10vw, 120px)",
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "#ffffff",
            marginBottom: "24px",
            lineHeight: 1.05,
          }}
        >
          SUBHAJIT DAS
        </h1>
        <p
          style={{
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            color: "#888888",
            marginBottom: "24px",
          }}
        >
          Growth & AI
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#333333",
          }}
        >
          Bangalore, India
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "#1a1a1a",
        }}
      />
    </section>
  );
}