import { useNavigate } from "react-router";

interface Section {
  title: string;
  body: string;
}

interface InfoPageProps {
  title: string;
  subtitle?: string;
  sections: Section[];
  bgImage?: string;
}

export function InfoPage({ title, subtitle, sections, bgImage }: InfoPageProps) {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", paddingTop: 70 }}>
      {/* Hero strip */}
      <div className="relative overflow-hidden" style={{ background: "#0d1b2a", padding: "48px 24px" }}>
        {bgImage && (
          <>
            <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.45) 100%)" }} />
          </>
        )}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>Главная</button>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{title}</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700 }}>{title}</h1>
          {subtitle && <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 8, fontWeight: 300 }}>{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-10">
        {sections.map((s, i) => (
          <div key={i}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
              {s.title}
            </h2>
            <div style={{ color: "#3a3028", fontSize: 15, lineHeight: 1.8, whiteSpace: "pre-line" }}>
              {s.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
