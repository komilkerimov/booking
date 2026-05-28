import { useNavigate } from "react-router";
import { DESTINATIONS } from "../data";
import { MapPin, ChevronRight } from "lucide-react";

const HERO = "https://images.unsplash.com/photo-1778867363464-21b77cb40c5a?w=1200&q=80";

export function Destinations() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: 340, background: "#0d1b2a", paddingTop: 70 }}>
        <img src={HERO} alt="Узбекистан" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.38 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,27,42,0.5) 0%, rgba(13,27,42,0.75) 100%)" }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#c9963a", fontWeight: 500, letterSpacing: "0.12em" }}>
            Путешествие начинается здесь
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 52px)", color: "#fff", fontWeight: 700 }}>
            Направления по Узбекистану
          </h1>
          <p style={{ color: "rgba(255,255,255,0.68)", fontSize: 16, marginTop: 10, maxWidth: 500, fontWeight: 300 }}>
            Шесть уникальных городов — тысячелетняя история, архитектура ЮНЕСКО и тёплое узбекское гостеприимство
          </p>
        </div>
      </div>

      {/* Destinations grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-sm overflow-hidden cursor-pointer transition-all duration-300"
              style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}
              onClick={() => navigate(`/search?dest=${encodeURIComponent(dest.name)}`)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(13,27,42,0.14)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.transform = "none";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 240 }}>
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-107"
                  style={{ transition: "transform 0.6s ease" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,27,42,0.7) 0%, rgba(13,27,42,0.05) 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 24, fontWeight: 700 }}>{dest.name}</h2>
                  <div className="px-2 py-0.5 rounded-sm text-xs" style={{ background: "rgba(201,150,58,0.85)", color: "#fff", fontWeight: 600 }}>
                    {dest.hotels} отелей
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p style={{ color: "#5a5040", fontSize: 14, lineHeight: 1.65, marginBottom: 14 }}>{dest.description}</p>
                {/* Highlights */}
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider mb-2.5" style={{ color: "#c9963a", fontWeight: 600 }}>Главные достопримечательности</p>
                  <div className="flex flex-wrap gap-2">
                    {dest.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded-sm text-xs"
                        style={{ background: "#f5f0e8", color: "#3a3028", border: "1px solid rgba(13,27,42,0.1)" }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className="flex items-center gap-1 text-sm transition-colors"
                  style={{ color: "#c9963a", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
                >
                  <MapPin size={14} /> Смотреть отели <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="mt-16 rounded-sm overflow-hidden" style={{ border: "1px solid rgba(13,27,42,0.1)" }}>
          <div className="px-6 py-4 flex items-center justify-between" style={{ background: "#0d1b2a" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 18, fontWeight: 600 }}>
              Карта направлений
            </span>
            <span className="text-xs px-2 py-0.5 rounded-sm" style={{ background: "rgba(201,150,58,0.2)", color: "#c9963a" }}>Узбекистан</span>
          </div>
          <div
            className="flex items-center justify-center"
            style={{ height: 300, background: "linear-gradient(135deg, #e8dfc8 0%, #d9cdb0 100%)" }}
          >
            <div className="text-center">
              {/* Simple SVG map dots */}
              <svg viewBox="0 0 400 200" width="400" height="200" style={{ opacity: 0.5 }}>
                <text x="60" y="80" style={{ fontSize: 11, fill: "#0d1b2a", fontFamily: "sans-serif" }}>Ташкент</text>
                <circle cx="55" cy="72" r="6" fill="#c9963a" />
                <text x="140" y="120" style={{ fontSize: 11, fill: "#0d1b2a", fontFamily: "sans-serif" }}>Самарканд</text>
                <circle cx="135" cy="112" r="6" fill="#c9963a" />
                <text x="100" y="148" style={{ fontSize: 11, fill: "#0d1b2a", fontFamily: "sans-serif" }}>Бухара</text>
                <circle cx="95" cy="140" r="5" fill="#c9963a" />
                <text x="50" y="155" style={{ fontSize: 11, fill: "#0d1b2a", fontFamily: "sans-serif" }}>Хива</text>
                <circle cx="48" cy="147" r="5" fill="#c9963a" />
                <text x="175" y="130" style={{ fontSize: 11, fill: "#0d1b2a", fontFamily: "sans-serif" }}>Шахрисабз</text>
                <circle cx="172" cy="122" r="4" fill="#c9963a" />
                <text x="80" y="110" style={{ fontSize: 11, fill: "#0d1b2a", fontFamily: "sans-serif" }}>Коканд</text>
                <circle cx="78" cy="102" r="4" fill="#c9963a" />
                <line x1="55" y1="72" x2="135" y2="112" stroke="#c9963a" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="135" y1="112" x2="95" y2="140" stroke="#c9963a" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="95" y1="140" x2="48" y2="147" stroke="#c9963a" strokeWidth="1" strokeDasharray="4,4" />
              </svg>
              <p style={{ color: "#5a5040", fontSize: 13, marginTop: 8 }}>Интерактивная карта</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
