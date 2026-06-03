export default function Contact() {
  return (
    <section id="contact" style={{ background: "#000000", padding: "160px 24px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "18px", fontWeight: 400, color: "#ffffff", marginBottom: "16px" }}>
          Let's talk
        </p>
        <p style={{ fontSize: "14px", color: "#444444", marginBottom: "32px" }}>
          sdas22@gmail.com
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "32px" }}>
          {[
            { label: "GitHub", href: "https://github.com/Das-rebel" },
            { label: "LinkedIn", href: "https://linkedin.com/in/subholearns" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#333333", textDecoration: "none", transition: "color 200ms" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
