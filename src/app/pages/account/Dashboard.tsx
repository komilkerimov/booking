import { useNavigate } from "react-router";
import { CalendarCheck, Sparkles, CreditCard, ChevronRight, Star, MapPin, TrendingUp } from "lucide-react";

const RECENT_BOOKINGS = [
  { id: "HRM-284510", hotel: "Silk Road Grand Hotel", location: "Самарканд", checkIn: "2024-03-15", checkOut: "2024-03-18", status: "completed", price: 567000, image: "/assets/images/photo-1629140727571-9b5c6f6267b4.jpg" },
  { id: "HRM-193042", hotel: "Lyabi House Boutique", location: "Бухара", checkIn: "2024-05-01", checkOut: "2024-05-04", status: "upcoming", price: 645000, image: "/assets/images/photo-1731336478850-6bce7235e320.jpg" },
];

const STATUS_MAP: Record<string, { label: string; bg: string; color: string }> = {
  completed: { label: "Завершено", bg: "rgba(34,197,94,0.1)", color: "#166534" },
  upcoming: { label: "Предстоящее", bg: "rgba(201,150,58,0.12)", color: "#c9963a" },
  cancelled: { label: "Отменено", bg: "rgba(239,68,68,0.1)", color: "#c0392b" },
};

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 26, fontWeight: 700 }}>
        Мой кабинет
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <CalendarCheck size={20} color="#c9963a" />, label: "Бронирований", val: "7", sub: "всего", to: "/account/bookings" },
          { icon: <Sparkles size={20} color="#c9963a" />, label: "Бонусный баланс", val: "3 240 ₸", sub: "доступно", to: "/account/bonuses" },
          { icon: <TrendingUp size={20} color="#c9963a" />, label: "Сэкономлено", val: "48 300 ₸", sub: "кэшбек за всё время", to: "/account/bonuses" },
        ].map(({ icon, label, val, sub, to }) => (
          <button
            key={label}
            onClick={() => navigate(to)}
            className="rounded-sm p-5 text-left transition-all duration-200"
            style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9963a"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(201,150,58,0.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(13,27,42,0.08)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-3" style={{ background: "rgba(201,150,58,0.1)" }}>{icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 22, fontWeight: 700 }}>{val}</div>
            <div style={{ color: "#5a5040", fontSize: 13, marginTop: 2 }}>{label}</div>
            <div style={{ color: "#aaa", fontSize: 11, marginTop: 1 }}>{sub}</div>
          </button>
        ))}
      </div>

      {/* Upcoming booking */}
      <div className="rounded-sm p-5" style={{ background: "linear-gradient(135deg, #0d1b2a 0%, #1a2e45 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 18, fontWeight: 600 }}>Предстоящая поездка</h2>
          <span className="px-2 py-0.5 rounded-sm text-xs" style={{ background: "rgba(201,150,58,0.25)", color: "#c9963a", fontWeight: 600 }}>Предстоящее</span>
        </div>
        <div className="flex gap-4 items-start">
          <img src={RECENT_BOOKINGS[1].image} alt="" className="rounded-sm object-cover flex-shrink-0" style={{ width: 90, height: 60 }} />
          <div className="flex-1">
            <div style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontWeight: 600, fontSize: 16 }}>{RECENT_BOOKINGS[1].hotel}</div>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={12} color="rgba(255,255,255,0.5)" />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{RECENT_BOOKINGS[1].location}</span>
            </div>
            <div className="flex gap-4 mt-2">
              <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>Заезд: <strong style={{ color: "#fff" }}>{RECENT_BOOKINGS[1].checkIn}</strong></span>
              <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>Выезд: <strong style={{ color: "#fff" }}>{RECENT_BOOKINGS[1].checkOut}</strong></span>
            </div>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: "#c9963a", fontSize: 18, fontWeight: 700 }}>
            {RECENT_BOOKINGS[1].price.toLocaleString("ru-RU")} ₸
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="rounded-sm" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(13,27,42,0.08)" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700 }}>Последние бронирования</h2>
          <button onClick={() => navigate("/account/bookings")} className="flex items-center gap-1 text-sm" style={{ color: "#c9963a", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>
            Все <ChevronRight size={14} />
          </button>
        </div>
        {RECENT_BOOKINGS.map((b, i) => (
          <div key={b.id} className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: i < RECENT_BOOKINGS.length - 1 ? "1px solid rgba(13,27,42,0.06)" : "none" }}>
            <img src={b.image} alt="" className="rounded-sm object-cover flex-shrink-0" style={{ width: 64, height: 44 }} />
            <div className="flex-1">
              <div style={{ color: "#0d1b2a", fontWeight: 600, fontSize: 14 }}>{b.hotel}</div>
              <div style={{ color: "#5a5040", fontSize: 12 }}>{b.id} · {b.checkIn} — {b.checkOut}</div>
            </div>
            <span className="px-2 py-0.5 rounded-sm text-xs" style={{ background: STATUS_MAP[b.status].bg, color: STATUS_MAP[b.status].color, fontWeight: 600 }}>
              {STATUS_MAP[b.status].label}
            </span>
            <span style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 700 }}>{b.price.toLocaleString("ru-RU")} ₸</span>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="rounded-sm p-5" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700 }}>Рекомендуем вам</h2>
          <button onClick={() => navigate("/search")} className="text-sm flex items-center gap-1" style={{ color: "#c9963a", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>
            Смотреть все <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "Orient Star Khiva", loc: "Хива", price: 98000, rating: 4.6, img: "/assets/images/photo-1605346434674-a440ca4dc4c0.jpg", id: 4 },
            { name: "Malika Classic", loc: "Самарканд", price: 67000, rating: 4.2, img: "/assets/images/photo-1590675560125-0d832b9d719e.jpg", id: 6 },
          ].map((h) => (
            <button key={h.id} onClick={() => navigate(`/hotel/${h.id}`)} className="rounded-sm overflow-hidden text-left transition-all group" style={{ border: "1px solid rgba(13,27,42,0.08)", background: "#fff", cursor: "pointer", padding: 0 }}>
              <div style={{ height: 110, overflow: "hidden" }}>
                <img src={h.img} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 14 }}>{h.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin size={11} color="#5a5040" />
                    <span style={{ color: "#5a5040", fontSize: 12 }}>{h.loc}</span>
                    <Star size={11} fill="#c9963a" color="#c9963a" className="ml-1" />
                    <span style={{ color: "#5a5040", fontSize: 12 }}>{h.rating}</span>
                  </div>
                  <span style={{ color: "#c9963a", fontWeight: 700, fontSize: 13 }}>от {h.price.toLocaleString("ru-RU")} ₸</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
