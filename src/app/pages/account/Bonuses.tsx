import { Sparkles, TrendingUp, Gift, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router";

const HISTORY = [
  { id: 1, type: "cashback", label: "Кэшбек за Silk Road Grand Hotel", date: "18 мар 2024", amount: +85050 },
  { id: 2, type: "promo", label: "Промо-бонус: первое бронирование", date: "15 мар 2024", amount: +5000 },
  { id: 3, type: "cashback", label: "Кэшбек за Malika Classic", date: "12 янв 2024", amount: +10720 },
  { id: 4, type: "spend", label: "Использовано при бронировании", date: "10 янв 2024", amount: -15000 },
  { id: 5, type: "welcome", label: "Приветственный бонус", date: "05 янв 2024", amount: +500 },
];

const LEVELS = [
  { name: "Странник", min: 0, max: 50000, color: "#aaa", perks: ["Кэшбек 5%"] },
  { name: "Путешественник", min: 50000, max: 200000, color: "#c9963a", perks: ["Кэшбек 10%", "Ранний заезд"] },
  { name: "Исследователь", min: 200000, max: 500000, color: "#3b82f6", perks: ["Кэшбек 15%", "Поздний выезд", "Трансфер"] },
  { name: "Посол", min: 500000, max: Infinity, color: "#8b5cf6", perks: ["Кэшбек 20%", "Приоритетная поддержка", "Бесплатный номер раз в год"] },
];

const TOTAL_SPENT = 86000;
const CURRENT = LEVELS[1];
const NEXT = LEVELS[2];
const PROGRESS = ((TOTAL_SPENT - CURRENT.min) / (NEXT.min - CURRENT.min)) * 100;

export function Bonuses() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 26, fontWeight: 700 }}>Бонусы и кэшбек</h1>

      {/* Balance */}
      <div
        className="rounded-sm p-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d1b2a 0%, #1e3450 100%)" }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: "#c9963a", transform: "translate(30%, -30%)" }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} color="#c9963a" />
            <span style={{ color: "#c9963a", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Бонусный баланс</span>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 42, fontWeight: 700 }}>3 240 ₸</div>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginTop: 4 }}>Можно использовать при следующем бронировании</p>
          <button onClick={() => navigate("/search")} className="mt-5 px-5 py-2.5 rounded-sm text-sm flex items-center gap-1.5" style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
            Использовать бонусы <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Level */}
      <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p style={{ color: "#5a5040", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Ваш уровень</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: CURRENT.color, fontSize: 22, fontWeight: 700 }}>{CURRENT.name}</h2>
          </div>
          <div className="text-right">
            <p style={{ color: "#5a5040", fontSize: 12 }}>До уровня "{NEXT.name}"</p>
            <p style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 700, fontSize: 16 }}>
              {(NEXT.min - TOTAL_SPENT).toLocaleString("ru-RU")} ₸
            </p>
          </div>
        </div>
        {/* Progress */}
        <div className="rounded-full h-3 mb-2 overflow-hidden" style={{ background: "#f5f0e8" }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, PROGRESS)}%`, background: `linear-gradient(90deg, ${CURRENT.color}, ${NEXT.color})` }} />
        </div>
        <div className="flex justify-between text-xs" style={{ color: "#5a5040" }}>
          <span>{CURRENT.min.toLocaleString("ru-RU")} ₸</span>
          <span style={{ color: "#0d1b2a", fontWeight: 600 }}>{TOTAL_SPENT.toLocaleString("ru-RU")} ₸ потрачено</span>
          <span>{NEXT.min.toLocaleString("ru-RU")} ₸</span>
        </div>
        <div className="mt-4">
          <p style={{ color: "#5a5040", fontSize: 12, marginBottom: 8 }}>Привилегии уровня {CURRENT.name}:</p>
          <div className="flex flex-wrap gap-2">
            {CURRENT.perks.map((p) => (
              <div key={p} className="flex items-center gap-1.5 px-3 py-1 rounded-sm text-sm" style={{ background: "rgba(201,150,58,0.08)", border: "1px solid rgba(201,150,58,0.25)" }}>
                <Check size={12} color="#c9963a" />
                <span style={{ color: "#c9963a", fontWeight: 500 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All levels */}
      <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Все уровни программы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEVELS.map((lv) => {
            const isCurrent = lv.name === CURRENT.name;
            return (
              <div
                key={lv.name}
                className="rounded-sm p-4"
                style={{
                  border: `2px solid ${isCurrent ? lv.color : "rgba(13,27,42,0.08)"}`,
                  background: isCurrent ? `rgba(201,150,58,0.04)` : "#fff",
                }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", color: lv.color, fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                  {lv.name} {isCurrent && "✓"}
                </div>
                <div style={{ color: "#5a5040", fontSize: 12, marginBottom: 8 }}>
                  от {lv.min.toLocaleString("ru-RU")} ₸
                </div>
                <div className="space-y-1">
                  {lv.perks.map((p) => (
                    <div key={p} className="flex items-center gap-1.5 text-xs" style={{ color: "#5a5040" }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: lv.color }} />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Earn more */}
      <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Как заработать больше</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <TrendingUp size={20} color="#c9963a" />, title: "Бронируйте отели", desc: "До 20% кэшбека с каждого бронирования", action: "Найти отель", to: "/search" },
            { icon: <Gift size={20} color="#c9963a" />, title: "Пригласите друга", desc: "+2 000 ₸ за каждого реферала", action: "Пригласить", to: "#" },
            { icon: <Sparkles size={20} color="#c9963a" />, title: "Оставьте отзыв", desc: "+200 ₸ за каждый подтверждённый отзыв", action: "Мои брони", to: "/account/bookings" },
          ].map(({ icon, title, desc, action, to }) => (
            <div key={title} className="p-4 rounded-sm" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.06)" }}>
              <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-3" style={{ background: "rgba(201,150,58,0.12)" }}>{icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{title}</div>
              <div style={{ color: "#5a5040", fontSize: 12, marginBottom: 10 }}>{desc}</div>
              <button onClick={() => navigate(to)} className="text-sm flex items-center gap-1" style={{ color: "#c9963a", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
                {action} <ChevronRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="rounded-sm" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <h2 className="px-5 py-4" style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700, borderBottom: "1px solid rgba(13,27,42,0.07)" }}>
          История операций
        </h2>
        {HISTORY.map((h, i) => (
          <div key={h.id} className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: i < HISTORY.length - 1 ? "1px solid rgba(13,27,42,0.06)" : "none" }}>
            <div>
              <div style={{ color: "#0d1b2a", fontSize: 14, fontWeight: 500 }}>{h.label}</div>
              <div style={{ color: "#5a5040", fontSize: 12, marginTop: 1 }}>{h.date}</div>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", color: h.amount > 0 ? "#22c55e" : "#c0392b", fontWeight: 700, fontSize: 15 }}>
              {h.amount > 0 ? "+" : ""}{h.amount.toLocaleString("ru-RU")} ₸
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
