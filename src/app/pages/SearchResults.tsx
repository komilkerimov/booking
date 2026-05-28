import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { HotelCard } from "../components/HotelCard";
import { SearchBar } from "../components/SearchBar";
import { HOTELS } from "../data";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";

const CITIES = ["Все города", "Самарканд", "Бухара", "Хива", "Ташкент"];

export function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const destParam = searchParams.get("dest") || "";

  const [city, setCity] = useState(destParam || "Все города");
  const [stars, setStars] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [minRating, setMinRating] = useState(0);
  const [cashbackOnly, setCashbackOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const toggleStar = (s: number) =>
    setStars((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const filtered = HOTELS.filter((h) => {
    if (city !== "Все города" && h.location !== city) return false;
    if (stars.length && !stars.includes(h.stars)) return false;
    if (h.price > maxPrice) return false;
    if (h.rating < minRating) return false;
    if (cashbackOnly && h.cashback < 15) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return b.rating - a.rating;
  });

  const clearFilters = () => {
    setCity("Все города");
    setStars([]);
    setMaxPrice(300000);
    setMinRating(0);
    setCashbackOnly(false);
  };

  const hasFilters = city !== "Все города" || stars.length > 0 || maxPrice < 300000 || minRating > 0 || cashbackOnly;

  const FiltersPanel = () => (
    <div className="space-y-6">
      {/* City */}
      <div>
        <h4 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 15, fontWeight: 600 }}>Город</h4>
        {CITIES.map((c) => (
          <button
            key={c}
            onClick={() => setCity(c)}
            className="w-full flex items-center gap-2 py-1.5 text-left transition-colors"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <div
              className="w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0"
              style={{ borderColor: city === c ? "#c9963a" : "rgba(13,27,42,0.25)", background: city === c ? "#c9963a" : "transparent" }}
            >
              {city === c && <div className="w-2 h-2 bg-white rounded-sm" />}
            </div>
            <span style={{ color: "#0d1b2a", fontSize: 14 }}>{c}</span>
          </button>
        ))}
      </div>

      {/* Stars */}
      <div>
        <h4 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 15, fontWeight: 600 }}>Звёзды</h4>
        <div className="flex gap-2 flex-wrap">
          {[3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => toggleStar(s)}
              className="px-3 py-1.5 rounded-sm text-sm transition-all"
              style={{
                background: stars.includes(s) ? "#0d1b2a" : "transparent",
                color: stars.includes(s) ? "#fff" : "#0d1b2a",
                border: `1px solid ${stars.includes(s) ? "#0d1b2a" : "rgba(13,27,42,0.2)"}`,
                cursor: "pointer",
                fontWeight: stars.includes(s) ? 600 : 400,
              }}
            >
              {"★".repeat(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h4 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 15, fontWeight: 600 }}>Цена за ночь</h4>
        <input
          type="range"
          min={50000}
          max={300000}
          step={10000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-amber-600"
          style={{ accentColor: "#c9963a" }}
        />
        <div className="flex justify-between mt-1">
          <span style={{ color: "#5a5040", fontSize: 12 }}>50 000 ₸</span>
          <span style={{ color: "#c9963a", fontSize: 13, fontWeight: 600 }}>до {maxPrice.toLocaleString("ru-RU")} ₸</span>
        </div>
      </div>

      {/* Min rating */}
      <div>
        <h4 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 15, fontWeight: 600 }}>Рейтинг</h4>
        {[0, 4, 4.5, 4.7].map((r) => (
          <button
            key={r}
            onClick={() => setMinRating(r)}
            className="w-full flex items-center gap-2 py-1.5 text-left"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <div
              className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0"
              style={{ borderColor: minRating === r ? "#c9963a" : "rgba(13,27,42,0.25)", background: minRating === r ? "#c9963a" : "transparent" }}
            >
              {minRating === r && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </div>
            <span style={{ color: "#0d1b2a", fontSize: 14 }}>
              {r === 0 ? "Любой" : r === 4 ? "от 4.0 — Хорошо" : r === 4.5 ? "от 4.5 — Очень хорошо" : "от 4.7 — Превосходно"}
            </span>
          </button>
        ))}
      </div>

      {/* Cashback */}
      <div>
        <button
          onClick={() => setCashbackOnly(!cashbackOnly)}
          className="flex items-center gap-2 w-full text-left"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <div
            className="w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0"
            style={{ borderColor: cashbackOnly ? "#c9963a" : "rgba(13,27,42,0.25)", background: cashbackOnly ? "#c9963a" : "transparent" }}
          >
            {cashbackOnly && <div className="w-2 h-2 bg-white rounded-sm" />}
          </div>
          <span style={{ color: "#0d1b2a", fontSize: 14 }}>Только с кэшбеком ≥ 15%</span>
        </button>
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-sm transition-colors"
          style={{ color: "#c0392b", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}
        >
          <X size={14} /> Сбросить фильтры
        </button>
      )}
    </div>
  );

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>
      {/* Banner */}
      <div className="relative overflow-hidden" style={{ background: "#0d1b2a", padding: "28px 24px 20px" }}>
        <img src="https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?w=1200&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.78) 30%, rgba(13,27,42,0.42) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>Главная</button>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Поиск отелей</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 700, marginBottom: 14 }}>
            {city !== "Все города" ? `Отели · ${city}` : "Поиск отелей"}
          </h1>
          <SearchBar compact onSearch={() => {}} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p style={{ color: "#5a5040", fontSize: 14 }}>{filtered.length} вариантов</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-sm text-sm outline-none"
                style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", cursor: "pointer" }}
              >
                <option value="rating">По рейтингу</option>
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" color="#5a5040" />
            </div>
            {/* Mobile filter toggle */}
            <button
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-sm text-sm"
              style={{ background: "#0d1b2a", color: "#fff", border: "none", cursor: "pointer" }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={14} /> Фильтры
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden md:block flex-shrink-0 w-60">
            <div className="rounded-sm p-5 sticky top-24" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal size={15} color="#c9963a" />
                <span style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 700, fontSize: 16 }}>Фильтры</span>
              </div>
              <FiltersPanel />
            </div>
          </aside>

          {/* Mobile filters overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 md:hidden" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setShowFilters(false)}>
              <div
                className="absolute left-0 top-0 bottom-0 w-72 overflow-y-auto p-6"
                style={{ background: "#fff" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#0d1b2a" }}>Фильтры</span>
                  <button onClick={() => setShowFilters(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
                </div>
                <FiltersPanel />
              </div>
            </div>
          )}

          {/* Hotel grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#0d1b2a", fontWeight: 600 }}>Ничего не найдено</p>
                <p style={{ color: "#5a5040", marginTop: 8, fontSize: 14 }}>Попробуйте изменить фильтры</p>
                <button onClick={clearFilters} className="mt-4 px-5 py-2 rounded-sm text-sm" style={{ background: "#c9963a", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}>
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((hotel) => (
                  <HotelCard key={hotel.id} {...hotel} onClick={() => navigate(`/hotel/${hotel.id}`)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
