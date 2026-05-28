import { useState } from "react";
import { useNavigate } from "react-router";
import { SearchBar } from "../components/SearchBar";
import { HotelCard } from "../components/HotelCard";
import { HOTELS, DESTINATIONS } from "../data";
import { Shield, Headphones, CreditCard, Star, ChevronRight } from "lucide-react";

const HERO = "https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?w=1800&h=900&fit=crop&auto=format";

const REVIEWS = [
  { id: 1, name: "Дилноза Юсупова", city: "Ташкент", text: "Забронировала отель в Самарканде за 5 минут. Кэшбек пришёл мгновенно, сервис на высшем уровне!", rating: 5, hotel: "Silk Road Grand Hotel" },
  { id: 2, name: "Алексей Морозов", city: "Москва", text: "Отличный сервис! Нашёл отель по хорошей цене, поддержка ответила за минуту. Буду пользоваться снова.", rating: 5, hotel: "Lyabi House Boutique" },
  { id: 3, name: "Камола Исмоилова", city: "Самарканд", text: "Использую Hurma уже второй год. Кэшбек реально накапливается и экономит деньги.", rating: 4, hotel: "Malika Classic" },
];

export function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Все");

  const filters = ["Все", "5 звёзд", "4 звезды", "С кэшбеком", "Бюджетные"];
  const filteredHotels = HOTELS.filter((h) => {
    if (activeFilter === "5 звёзд") return h.stars === 5;
    if (activeFilter === "4 звезды") return h.stars === 4;
    if (activeFilter === "С кэшбеком") return h.cashback >= 15;
    if (activeFilter === "Бюджетные") return h.price < 100000;
    return true;
  });

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "96vh", background: "#0d1b2a" }}
      >
        <img
          src={HERO}
          alt="Регистан, Самарканд"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.42 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(13,27,42,0.25) 0%, rgba(13,27,42,0.55) 55%, rgba(13,27,42,0.92) 100%)" }}
        />
        <div className="relative z-10 px-6 max-w-4xl mx-auto">
          <div
            className="inline-block px-4 py-1.5 rounded-sm mb-6 text-sm uppercase"
            style={{ background: "rgba(201,150,58,0.18)", border: "1px solid rgba(201,150,58,0.45)", color: "#c9963a", fontWeight: 500, letterSpacing: "0.12em" }}
          >
            Путешествуй по Шёлковому пути
          </div>
          <h1
            className="mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 6vw, 70px)", fontWeight: 700, color: "#fff", lineHeight: 1.13 }}
          >
            Откройте лучшие<br />
            <span style={{ color: "#c9963a", fontStyle: "italic" }}>отели Узбекистана</span>
          </h1>
          <p className="mb-10 mx-auto" style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 520, fontWeight: 300 }}>
            Более 1 000 000 вариантов жилья — от бутик-отелей в древних крепостях до роскошных курортов. Кэшбек до 20%.
          </p>
          <div className="flex justify-center">
            <SearchBar onSearch={() => navigate("/search")} />
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { val: "1 000 000+", label: "вариантов жилья" },
              { val: "20%", label: "максимальный кэшбек" },
              { val: "24/7", label: "поддержка клиентов" },
              { val: "150 000+", label: "довольных гостей" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#c9963a" }}>{val}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5" style={{ borderColor: "rgba(255,255,255,0.35)" }}>
            <div className="w-1 h-2 rounded-full" style={{ background: "#c9963a" }} />
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "#c9963a", fontWeight: 500 }}>Популярные маршруты</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, color: "#0d1b2a", fontWeight: 700 }}>Выберите направление</h2>
          </div>
          <button
            onClick={() => navigate("/destinations")}
            className="hidden md:flex items-center gap-1 text-sm transition-colors"
            style={{ color: "#c9963a", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
          >
            Все направления <ChevronRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DESTINATIONS.slice(0, 4).map((dest, i) => (
            <button
              key={dest.id}
              onClick={() => navigate(`/search?dest=${encodeURIComponent(dest.name)}`)}
              className="group relative rounded-sm overflow-hidden cursor-pointer text-left"
              style={{ height: i === 0 ? 340 : 220, border: "none", padding: 0 }}
            >
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,27,42,0.82) 0%, rgba(13,27,42,0.08) 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: i === 0 ? 24 : 18, fontWeight: 600 }}>{dest.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{dest.hotels} отелей</p>
              </div>
              <div
                className="absolute top-3 right-3 px-2 py-0.5 rounded-sm text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "#c9963a", color: "#fff", fontWeight: 600 }}
              >
                Смотреть →
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── FEATURED HOTELS ── */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "#c9963a", fontWeight: 500 }}>Рекомендуем</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, color: "#0d1b2a", fontWeight: 700 }}>Лучшие отели</h2>
            </div>
            <button
              onClick={() => navigate("/search")}
              className="hidden md:flex items-center gap-1 text-sm"
              style={{ color: "#c9963a", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
            >
              Все отели <ChevronRight size={15} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-1.5 rounded-sm text-sm transition-all duration-200"
                style={{
                  background: activeFilter === f ? "#0d1b2a" : "transparent",
                  color: activeFilter === f ? "#fff" : "#5a5040",
                  border: `1px solid ${activeFilter === f ? "#0d1b2a" : "rgba(13,27,42,0.2)"}`,
                  fontWeight: activeFilter === f ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} onClick={() => navigate(`/hotel/${hotel.id}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "#c9963a", fontWeight: 500 }}>Наши преимущества</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, color: "#0d1b2a", fontWeight: 700 }}>Почему выбирают Hurma</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <CreditCard size={26} color="#c9963a" />, title: "Кэшбек до 20%", desc: "Возвращаем реальные деньги за каждое бронирование. Без скрытых условий." },
            { icon: <Shield size={26} color="#c9963a" />, title: "Безопасный платёж", desc: "Ваши данные защищены шифрованием. Оплачивайте любым удобным способом." },
            { icon: <Star size={26} color="#c9963a" />, title: "Реальные отзывы", desc: "Только проверенные отзывы от тех, кто действительно останавливался в отеле." },
            { icon: <Headphones size={26} color="#c9963a" />, title: "Поддержка 24/7", desc: "Наши специалисты на связи каждый день. Telegram, телефон, email." },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-sm transition-all duration-300"
              style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#c9963a"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(201,150,58,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(13,27,42,0.08)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4" style={{ background: "rgba(201,150,58,0.1)" }}>{icon}</div>
              <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 17, fontWeight: 600 }}>{title}</h3>
              <p style={{ color: "#5a5040", fontSize: 14, lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-20 px-6" style={{ background: "#0d1b2a" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "#c9963a", fontWeight: 500 }}>Отзывы гостей</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, color: "#fff", fontWeight: 700 }}>Что говорят наши клиенты</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.id} className="p-6 rounded-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex gap-0.5 mb-4">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={13} fill="#c9963a" color="#c9963a" />)}</div>
                <p className="mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, fontStyle: "italic" }}>"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm" style={{ background: "#c9963a", color: "#fff", fontWeight: 700 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{r.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{r.city} · {r.hotel}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 px-6 relative overflow-hidden" style={{ background: "#c9963a" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000'%3E%3Cpath d='M0 0h4v4H0V0zm8 0h4v4H8V0zM0 8h4v4H0V8z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, color: "#fff", fontWeight: 700, marginBottom: 10 }}>Получите кэшбек 20% уже сегодня</h2>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 16, marginBottom: 26, fontWeight: 300 }}>Зарегистрируйтесь бесплатно и начните экономить на каждом бронировании</p>
          <button
            className="px-8 py-3.5 rounded-sm text-sm transition-all duration-200"
            style={{ background: "#0d1b2a", color: "#fff", fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#1a2e45")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#0d1b2a")}
          >
            Создать аккаунт бесплатно
          </button>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="rounded-sm p-10 md:p-14 flex flex-col md:flex-row items-center gap-8" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
          <div className="flex-1">
            <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "#c9963a", fontWeight: 500 }}>Специальные предложения</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#0d1b2a", fontWeight: 700 }}>Подпишитесь на акции и скидки</h2>
            <p className="mt-2" style={{ color: "#5a5040", fontSize: 14 }}>Первыми узнавайте о горячих предложениях и эксклюзивных скидках.</p>
          </div>
          <div className="flex-1 w-full">
            {subscribed ? (
              <div className="p-4 rounded-sm text-center" style={{ background: "rgba(201,150,58,0.1)", border: "1px solid #c9963a" }}>
                <p style={{ color: "#c9963a", fontWeight: 600 }}>Спасибо! Вы успешно подписались.</p>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Ваш email адрес"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-sm outline-none"
                  style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14 }}
                />
                <button
                  onClick={() => email && setSubscribed(true)}
                  className="px-5 py-3 rounded-sm text-sm transition-all duration-200"
                  style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b8872e")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9963a")}
                >
                  Подписаться
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
