import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { HOTELS } from "../data";
import {
  Star, MapPin, Wifi, Waves, UtensilsCrossed, Dumbbell, Car, Plane,
  ChevronLeft, ChevronRight, Heart, Share2, Coffee, Sparkles
} from "lucide-react";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Бесплатный Wi-Fi": <Wifi size={16} />,
  "Бассейн": <Waves size={16} />,
  "Ресторан": <UtensilsCrossed size={16} />,
  "Фитнес-центр": <Dumbbell size={16} />,
  "Парковка": <Car size={16} />,
  "Аэропорт-шаттл": <Plane size={16} />,
  "Завтрак включён": <Coffee size={16} />,
  "Спа": <Sparkles size={16} />,
};

const SAMPLE_REVIEWS = [
  { id: 1, name: "Анна К.", rating: 5, date: "Апрель 2024", text: "Потрясающий отель! Персонал очень внимательный, завтрак великолепный. Вид из номера на город просто завораживает.", avatar: "А" },
  { id: 2, name: "Тимур М.", rating: 5, date: "Март 2024", text: "Идеальное место для знакомства с историческим центром. До основных достопримечательностей 10 минут пешком.", avatar: "Т" },
  { id: 3, name: "Светлана Р.", rating: 4, date: "Февраль 2024", text: "Очень понравился дизайн номеров — чувствуется восточный колорит. Единственный минус — немного шумно по утрам.", avatar: "С" },
];

export function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = HOTELS.find((h) => h.id === Number(id));

  const [imgIndex, setImgIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [activeTab, setActiveTab] = useState("overview");

  if (!hotel) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ minHeight: "100vh", paddingTop: 80 }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#0d1b2a" }}>Отель не найден</p>
        <button onClick={() => navigate("/search")} className="mt-4 px-5 py-2 rounded-sm" style={{ background: "#c9963a", color: "#fff", border: "none", cursor: "pointer" }}>
          К поиску
        </button>
      </div>
    );
  }

  const nights = checkIn && checkOut ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 1;
  const total = hotel.price * nights;
  const cashbackAmount = Math.round(total * hotel.cashback / 100);

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh", background: "#f5f0e8" }}>
      {/* Banner */}
      <div className="relative overflow-hidden" style={{ background: "#0d1b2a", padding: "32px 24px 28px" }}>
        <img src={hotel.image} alt={hotel.name} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.52 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.4) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>Главная</button>
            <span>/</span>
            <button onClick={() => navigate("/search")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>Отели</button>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>{hotel.name}</span>
          </div>
          <div className="flex gap-0.5 mb-2">
            {Array.from({ length: hotel.stars }).map((_, i) => <Star key={i} size={14} fill="#c9963a" color="#c9963a" />)}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 700 }}>
            {hotel.name}
          </h1>
          <div className="flex items-center gap-1.5 mt-2">
            <MapPin size={14} color="rgba(255,255,255,0.5)" />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{hotel.address}</span>
            {hotel.badge && (
              <span className="ml-2 px-2 py-0.5 rounded-sm text-xs" style={{ background: "#c9963a", color: "#fff", fontWeight: 600 }}>{hotel.badge}</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Actions row */}
        <div className="flex justify-end gap-3 py-4 mb-2">
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm transition-all"
              style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.15)", color: liked ? "#c9963a" : "#0d1b2a", cursor: "pointer" }}
            >
              <Heart size={14} fill={liked ? "#c9963a" : "none"} /> Сохранить
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-sm text-sm"
              style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", cursor: "pointer" }}
            >
              <Share2 size={14} /> Поделиться
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            {/* Photo gallery */}
            <div className="rounded-sm overflow-hidden relative mb-2" style={{ height: 420, background: "#e8dfc8" }}>
              <img
                src={hotel.images[imgIndex]}
                alt={hotel.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {/* Nav buttons */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer" }}
                onClick={() => setImgIndex((imgIndex - 1 + hotel.images.length) % hotel.images.length)}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer" }}
                onClick={() => setImgIndex((imgIndex + 1) % hotel.images.length)}
              >
                <ChevronRight size={20} />
              </button>
              {/* Counter */}
              <div className="absolute bottom-4 right-4 px-2 py-1 rounded-sm text-xs" style={{ background: "rgba(13,27,42,0.7)", color: "#fff" }}>
                {imgIndex + 1} / {hotel.images.length}
              </div>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {hotel.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className="rounded-sm overflow-hidden transition-all"
                  style={{ height: 72, border: `2px solid ${i === imgIndex ? "#c9963a" : "transparent"}`, padding: 0, cursor: "pointer" }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-6" style={{ borderColor: "rgba(13,27,42,0.12)" }}>
              {[
                { key: "overview", label: "Обзор" },
                { key: "amenities", label: "Удобства" },
                { key: "reviews", label: `Отзывы (${SAMPLE_REVIEWS.length})` },
                { key: "location", label: "Расположение" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="px-4 py-3 text-sm transition-all border-b-2"
                  style={{
                    fontWeight: activeTab === key ? 600 : 400,
                    color: activeTab === key ? "#c9963a" : "#5a5040",
                    borderBottomColor: activeTab === key ? "#c9963a" : "transparent",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "overview" && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1.5 rounded-sm" style={{ background: "#0d1b2a" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 22, fontWeight: 700 }}>{hotel.rating}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 16 }}>
                      {hotel.rating >= 4.7 ? "Превосходно" : hotel.rating >= 4.4 ? "Очень хорошо" : "Хорошо"}
                    </div>
                    <div style={{ color: "#5a5040", fontSize: 13 }}>{hotel.reviews} отзывов</div>
                  </div>
                </div>
                <p style={{ color: "#3a3028", fontSize: 15, lineHeight: 1.78 }}>{hotel.description}</p>
                {hotel.badge && (
                  <div
                    className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-sm"
                    style={{ background: "rgba(201,150,58,0.12)", border: "1px solid rgba(201,150,58,0.35)" }}
                  >
                    <Sparkles size={14} color="#c9963a" />
                    <span style={{ color: "#c9963a", fontSize: 13, fontWeight: 600 }}>{hotel.badge}</span>
                  </div>
                )}
              </div>
            )}

            {activeTab === "amenities" && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {hotel.amenities.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-sm"
                      style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}
                    >
                      <div style={{ color: "#c9963a" }}>{AMENITY_ICONS[a] || <Check size={16} />}</div>
                      <span style={{ color: "#0d1b2a", fontSize: 13 }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-5">
                {SAMPLE_REVIEWS.map((r) => (
                  <div key={r.id} className="p-5 rounded-sm" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#c9963a", color: "#fff", fontWeight: 700 }}>{r.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span style={{ fontWeight: 600, color: "#0d1b2a", fontSize: 14 }}>{r.name}</span>
                          <span style={{ color: "#5a5040", fontSize: 12 }}>{r.date}</span>
                        </div>
                        <div className="flex gap-0.5 my-1.5">
                          {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={11} fill="#c9963a" color="#c9963a" />)}
                        </div>
                        <p style={{ color: "#3a3028", fontSize: 14, lineHeight: 1.65 }}>{r.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "location" && (
              <div>
                <div
                  className="rounded-sm flex items-center justify-center"
                  style={{ height: 300, background: "linear-gradient(135deg, #e8dfc8 0%, #d4c8a8 100%)", border: "1px solid rgba(13,27,42,0.1)" }}
                >
                  <div className="text-center">
                    <MapPin size={32} color="#c9963a" className="mx-auto mb-2" />
                    <p style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 16, fontWeight: 600 }}>{hotel.address}</p>
                    <p style={{ color: "#5a5040", fontSize: 13, marginTop: 4 }}>Карта недоступна в демо-режиме</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Booking widget */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 rounded-sm p-6 shadow-lg" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.1)" }}>
              {/* Price */}
              <div className="mb-5">
                <span style={{ color: "#5a5040", fontSize: 12 }}>от</span>
                <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 30, fontWeight: 700 }}>
                  {hotel.price.toLocaleString("ru-RU")} ₸
                </div>
                <span style={{ color: "#5a5040", fontSize: 12 }}>за ночь</span>
              </div>

              {/* Cashback */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-sm mb-5" style={{ background: "rgba(201,150,58,0.1)", border: "1px solid rgba(201,150,58,0.3)" }}>
                <Sparkles size={14} color="#c9963a" />
                <span style={{ color: "#c9963a", fontSize: 13, fontWeight: 600 }}>Кэшбек {hotel.cashback}% — {cashbackAmount.toLocaleString("ru-RU")} ₸</span>
              </div>

              {/* Dates */}
              <div className="rounded-sm overflow-hidden border mb-3" style={{ borderColor: "rgba(13,27,42,0.15)" }}>
                <div className="grid grid-cols-2 divide-x" style={{ divideColor: "rgba(13,27,42,0.15)" }}>
                  <div className="p-3">
                    <div style={{ color: "#5a5040", fontSize: 10, fontWeight: 600, textTransform: "uppercase", marginBottom: 3 }}>Заезд</div>
                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="outline-none bg-transparent w-full" style={{ color: "#0d1b2a", fontSize: 13 }} />
                  </div>
                  <div className="p-3 border-l" style={{ borderColor: "rgba(13,27,42,0.15)" }}>
                    <div style={{ color: "#5a5040", fontSize: 10, fontWeight: 600, textTransform: "uppercase", marginBottom: 3 }}>Выезд</div>
                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="outline-none bg-transparent w-full" style={{ color: "#0d1b2a", fontSize: 13 }} />
                  </div>
                </div>
                <div className="p-3 border-t" style={{ borderColor: "rgba(13,27,42,0.15)" }}>
                  <div style={{ color: "#5a5040", fontSize: 10, fontWeight: 600, textTransform: "uppercase", marginBottom: 3 }}>Гости</div>
                  <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="outline-none bg-transparent w-full" style={{ color: "#0d1b2a", fontSize: 13 }}>
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}</option>)}
                  </select>
                </div>
              </div>

              {/* Total */}
              {checkIn && checkOut && (
                <div className="mb-3 p-3 rounded-sm" style={{ background: "#f5f0e8" }}>
                  <div className="flex justify-between text-sm mb-1">
                    <span style={{ color: "#5a5040" }}>{hotel.price.toLocaleString("ru-RU")} × {nights} {nights === 1 ? "ночь" : "ночей"}</span>
                    <span style={{ color: "#0d1b2a" }}>{total.toLocaleString("ru-RU")} ₸</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#5a5040" }}>Кэшбек</span>
                    <span style={{ color: "#c9963a", fontWeight: 600 }}>+{cashbackAmount.toLocaleString("ru-RU")} ₸</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t" style={{ borderColor: "rgba(13,27,42,0.1)" }}>
                    <span style={{ fontWeight: 600, color: "#0d1b2a" }}>Итого</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#0d1b2a", fontSize: 16 }}>{total.toLocaleString("ru-RU")} ₸</span>
                  </div>
                </div>
              )}

              <button
                  onClick={() => navigate(`/booking/${hotel.id}`)}
                  className="w-full py-3.5 rounded-sm text-sm transition-all duration-200"
                  style={{ background: "#c9963a", color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b8872e")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9963a")}
                >
                  Забронировать
                </button>

              <p className="text-center mt-3" style={{ color: "#5a5040", fontSize: 11 }}>Бесплатная отмена · Без предоплаты</p>
            </div>
          </div>
        </div>

        {/* Similar hotels */}
        <div className="mt-14">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#0d1b2a", fontWeight: 700, marginBottom: 20 }}>
            Похожие отели в {hotel.location}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOTELS.filter((h) => h.id !== hotel.id && h.location === hotel.location).slice(0, 3).map((h) => (
              <div
                key={h.id}
                className="rounded-sm overflow-hidden cursor-pointer group transition-all duration-300"
                style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}
                onClick={() => { navigate(`/hotel/${h.id}`); window.scrollTo(0, 0); }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(13,27,42,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
              >
                <div style={{ height: 160, overflow: "hidden" }}>
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 15 }}>{h.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span style={{ color: "#5a5040", fontSize: 13 }}>{h.rating} ★ · {h.reviews} отз.</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", color: "#c9963a", fontWeight: 700 }}>от {h.price.toLocaleString("ru-RU")} ₸</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
