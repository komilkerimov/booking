import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Calendar, ChevronDown, X, Star, Download, RotateCcw } from "lucide-react";

const ALL_BOOKINGS = [
  { id: "HRM-284510", hotel: "Silk Road Grand Hotel", location: "Самарканд", room: "Делюкс с видом", checkIn: "2024-03-15", checkOut: "2024-03-18", nights: 3, guests: 2, status: "completed", price: 567000, cashback: 85050, rating: 5, image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=300&h=180&fit=crop", hotelId: 1 },
  { id: "HRM-193042", hotel: "Lyabi House Boutique", location: "Бухара", room: "Сьюит", checkIn: "2024-05-01", checkOut: "2024-05-04", nights: 3, guests: 2, status: "upcoming", price: 645000, cashback: 129000, rating: 0, image: "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=300&h=180&fit=crop", hotelId: 3 },
  { id: "HRM-102398", hotel: "Malika Classic", location: "Самарканд", room: "Стандартный", checkIn: "2024-01-10", checkOut: "2024-01-12", nights: 2, guests: 1, status: "completed", price: 134000, cashback: 10720, rating: 4, image: "https://images.unsplash.com/photo-1590675560125-0d832b9d719e?w=300&h=180&fit=crop", hotelId: 6 },
  { id: "HRM-088741", hotel: "Registan Palace", location: "Самарканд", room: "Стандартный", checkIn: "2023-11-20", checkOut: "2023-11-23", nights: 3, guests: 2, status: "cancelled", price: 372000, cashback: 0, rating: 0, image: "https://images.unsplash.com/photo-1578898886225-c7c894047899?w=300&h=180&fit=crop", hotelId: 2 },
];

const STATUS_MAP: Record<string, { label: string; bg: string; color: string }> = {
  completed: { label: "Завершено", bg: "rgba(34,197,94,0.1)", color: "#166534" },
  upcoming: { label: "Предстоящее", bg: "rgba(201,150,58,0.12)", color: "#c9963a" },
  cancelled: { label: "Отменено", bg: "rgba(239,68,68,0.1)", color: "#c0392b" },
};

export function Bookings() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [rated, setRated] = useState<Record<string, number>>({});
  const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState<string[]>([]);

  const filters = [
    { id: "all", label: "Все" },
    { id: "upcoming", label: "Предстоящие" },
    { id: "completed", label: "Завершённые" },
    { id: "cancelled", label: "Отменённые" },
  ];

  const bookings = ALL_BOOKINGS.map((b) => cancelled.includes(b.id) ? { ...b, status: "cancelled" } : b)
    .filter((b) => filter === "all" || b.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 26, fontWeight: 700 }}>Мои бронирования</h1>
        <span style={{ color: "#5a5040", fontSize: 14 }}>{bookings.length} записей</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className="px-4 py-1.5 rounded-sm text-sm transition-all"
            style={{
              background: filter === id ? "#0d1b2a" : "#fff",
              color: filter === id ? "#fff" : "#5a5040",
              border: `1px solid ${filter === id ? "#0d1b2a" : "rgba(13,27,42,0.15)"}`,
              fontWeight: filter === id ? 600 : 400,
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 rounded-sm" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
          <Calendar size={40} color="#e8dfc8" className="mx-auto mb-3" />
          <p style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 600 }}>Нет бронирований</p>
          <p style={{ color: "#5a5040", fontSize: 14, marginTop: 6 }}>Самое время спланировать путешествие!</p>
          <button onClick={() => navigate("/search")} className="mt-4 px-5 py-2 rounded-sm text-sm" style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
            Найти отель
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => {
            const isOpen = expanded === b.id;
            const st = STATUS_MAP[b.status];
            const userRating = rated[b.id] || b.rating;

            return (
              <div key={b.id} className="rounded-sm overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                {/* Main row */}
                <div className="flex gap-4 p-5">
                  <img src={b.image} alt={b.hotel} className="rounded-sm object-cover flex-shrink-0 hidden sm:block" style={{ width: 100, height: 70 }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 700, fontSize: 16 }}>{b.hotel}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin size={12} color="#5a5040" />
                          <span style={{ color: "#5a5040", fontSize: 13 }}>{b.location} · {b.room}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-sm text-xs flex-shrink-0" style={{ background: st.bg, color: st.color, fontWeight: 600 }}>{st.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm" style={{ color: "#5a5040" }}>
                      <span>{b.checkIn} — {b.checkOut}</span>
                      <span>{b.nights} {b.nights === 1 ? "ночь" : "ночи"} · {b.guests} {b.guests === 1 ? "гость" : "гостя"}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <span style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 700, fontSize: 17 }}>{b.price.toLocaleString("ru-RU")} ₸</span>
                        {b.cashback > 0 && <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 600 }}>+{b.cashback.toLocaleString("ru-RU")} ₸ кэшбек</span>}
                      </div>
                      <button
                        onClick={() => setExpanded(isOpen ? null : b.id)}
                        className="flex items-center gap-1 text-sm"
                        style={{ color: "#5a5040", background: "none", border: "none", cursor: "pointer" }}
                      >
                        Детали <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(13,27,42,0.07)" }}>
                    <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                      {[
                        { label: "Номер брони", val: b.id },
                        { label: "Номер", val: b.room },
                        { label: "Гостей", val: String(b.guests) },
                        { label: "Ночей", val: String(b.nights) },
                      ].map(({ label, val }) => (
                        <div key={label}>
                          <div style={{ color: "#5a5040", fontSize: 11, marginBottom: 2 }}>{label}</div>
                          <div style={{ color: "#0d1b2a", fontWeight: 500 }}>{val}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => navigate(`/hotel/${b.hotelId}`)} className="flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm" style={{ background: "#0d1b2a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
                        <MapPin size={13} /> Смотреть отель
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm" style={{ background: "#fff", color: "#0d1b2a", border: "1px solid rgba(13,27,42,0.2)", cursor: "pointer" }}>
                        <Download size={13} /> Ваучер
                      </button>
                      {b.status === "upcoming" && !cancelled.includes(b.id) && (
                        <>
                          {cancelConfirm === b.id ? (
                            <div className="flex items-center gap-2">
                              <span style={{ color: "#c0392b", fontSize: 13 }}>Отменить бронь?</span>
                              <button onClick={() => { setCancelled((p) => [...p, b.id]); setCancelConfirm(null); }} className="px-3 py-1.5 rounded-sm text-xs" style={{ background: "#c0392b", color: "#fff", border: "none", cursor: "pointer" }}>Да</button>
                              <button onClick={() => setCancelConfirm(null)} className="px-3 py-1.5 rounded-sm text-xs" style={{ background: "#fff", color: "#0d1b2a", border: "1px solid rgba(13,27,42,0.2)", cursor: "pointer" }}>Нет</button>
                            </div>
                          ) : (
                            <button onClick={() => setCancelConfirm(b.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm" style={{ background: "#fff", color: "#c0392b", border: "1px solid rgba(192,57,43,0.3)", cursor: "pointer" }}>
                              <X size={13} /> Отменить
                            </button>
                          )}
                        </>
                      )}
                      {b.status === "completed" && (
                        <button onClick={() => navigate(`/booking/${b.hotelId}`)} className="flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm" style={{ background: "rgba(201,150,58,0.1)", color: "#c9963a", border: "1px solid rgba(201,150,58,0.3)", cursor: "pointer" }}>
                          <RotateCcw size={13} /> Забронировать снова
                        </button>
                      )}
                    </div>

                    {/* Rating */}
                    {b.status === "completed" && (
                      <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(13,27,42,0.07)" }}>
                        <p style={{ color: "#5a5040", fontSize: 13, marginBottom: 6 }}>Ваша оценка отеля:</p>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map((s) => (
                            <button
                              key={s}
                              onClick={() => setRated((r) => ({ ...r, [b.id]: s }))}
                              style={{ background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Star size={22} fill={s <= userRating ? "#c9963a" : "none"} color={s <= userRating ? "#c9963a" : "#e8dfc8"} />
                            </button>
                          ))}
                          {userRating > 0 && <span style={{ color: "#5a5040", fontSize: 13, alignSelf: "center", marginLeft: 6 }}>Спасибо!</span>}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
