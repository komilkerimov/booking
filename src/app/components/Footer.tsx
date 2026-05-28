import { Link } from "react-router";
import { Instagram, Send, Facebook, Phone, Mail, MapPin } from "lucide-react";
import logo from "../../imports/MDK_Travel_logo.png";

export function Footer() {
  return (
    <footer style={{ background: "#0d1b2a" }}>
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <img src={logo} alt="MDK Travel" style={{ height: 36, objectFit: "contain", objectPosition: "left" }} />
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.75 }}>
            Платформа для бронирования отелей в Узбекистане и СНГ. Кэшбек до 20% на каждое бронирование.
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { icon: <Instagram size={15} />, href: "#" },
              { icon: <Send size={15} />, href: "#" },
              { icon: <Facebook size={15} />, href: "#" },
            ].map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#c9963a";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        {[
          {
            title: "Навигация",
            links: [
              { label: "Главная", to: "/" },
              { label: "Направления", to: "/destinations" },
              { label: "Поиск отелей", to: "/search" },
              { label: "О нас", to: "/about" },
            ],
          },
          {
            title: "Клиентам",
            links: [
              { label: "Корпоративным", to: "/corporate" },
              { label: "Партнёрская программа", to: "/partners" },
              { label: "Реклама и PR", to: "/advertising" },
              { label: "Разместить объект", to: "/list-property" },
            ],
          },
          {
            title: "Поддержка",
            links: [
              { label: "Помощь и FAQ", to: "/faq" },
              { label: "Публичная оферта", to: "/offer" },
              { label: "Конфиденциальность", to: "/privacy" },
              { label: "Контакты", to: "/contacts" },
            ],
          },
        ].map(({ title, links }) => (
          <div key={title}>
            <h4
              className="mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 15, fontWeight: 600 }}
            >
              {title}
            </h4>
            <ul className="space-y-2.5">
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#c9963a")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contacts bar */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-5">
            {[
              { icon: <MapPin size={13} />, text: "Ташкент, ул. Амира Тимура 7" },
              { icon: <Phone size={13} />, text: "+998 71 200-00-00" },
              { icon: <Mail size={13} />, text: "support@hurma.uz" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>
                {icon}
                <span>{text}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>© 2024 MDK Travel / Hurma.uz</p>
        </div>
      </div>
    </footer>
  );
}
