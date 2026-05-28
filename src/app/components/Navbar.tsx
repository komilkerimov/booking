import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Menu, X, Globe, Phone } from "lucide-react";
import logo from "../../imports/MDK_Travel_logo.png";

const NAV_LINKS = [
  { label: "Главная", to: "/" },
  { label: "Отели", to: "/search" },
  { label: "Направления", to: "/destinations" },
  { label: "О нас", to: "/about" },
  { label: "Контакты", to: "/contacts" },
];

export function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"ru" | "uz" | "en">("ru");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen to scroll when transparent mode
  if (typeof window !== "undefined" && transparent) {
    window.onscroll = () => setScrolled(window.scrollY > 60);
  }

  const isDark = transparent && !scrolled;
  // Navbar is always dark — white on homepage fades in, solid on inner pages
  const textColor = "rgba(255,255,255,0.88)";
  const bgStyle: React.CSSProperties = isDark
    ? { background: "linear-gradient(to bottom, rgba(13,27,42,0.82) 0%, rgba(13,27,42,0) 100%)" }
    : { background: "#0d1b2a", boxShadow: "0 2px 20px rgba(13,27,42,0.25)" };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={bgStyle}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <img
            src={logo}
            alt="MDK Travel"
            style={{
              height: 38,
              objectFit: "contain",
              filter: "none",
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, to }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className="text-sm transition-colors duration-150"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: active ? "#c9963a" : textColor,
                  fontWeight: active ? 600 : 400,
                  textDecoration: "none",
                  borderBottom: active ? "2px solid #c9963a" : "2px solid transparent",
                  paddingBottom: 2,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#c9963a")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = active ? "#c9963a" : textColor)}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language */}
          <div
            className="flex items-center gap-1 rounded-full px-2 py-1"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <Globe size={11} color="rgba(255,255,255,0.6)" />
            {(["ru", "uz", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="text-xs uppercase px-1 py-0.5 rounded transition-colors"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: lang === l ? "#c9963a" : "rgba(255,255,255,0.55)",
                  fontWeight: lang === l ? 700 : 400,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="tel:+998712000000"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif", color: textColor, textDecoration: "none" }}
          >
            <Phone size={13} />
            +998 71 200-00-00
          </a>

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-sm text-sm transition-all duration-200"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "#c9963a",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b8872e")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9963a")}
          >
            Войти
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: textColor, background: "none", border: "none", cursor: "pointer" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden" style={{ background: "#0d1b2a" }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="block px-6 py-3 text-sm border-b"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.85)",
                borderColor: "rgba(255,255,255,0.07)",
                textDecoration: "none",
              }}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="px-6 py-3">
            <button
              className="w-full py-2 rounded-sm text-sm"
              style={{ background: "#c9963a", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, border: "none", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Войти
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
