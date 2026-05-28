import { useNavigate } from "react-router";
import { Building2, Shield, TrendingUp, Headphones, Check, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Corporate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ company: "", name: "", email: "", phone: "", employees: "" });
  const [sent, setSent] = useState(false);
  const u = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", paddingTop: 70 }}>
      <div className="relative overflow-hidden" style={{ background: "#0d1b2a", padding: "56px 24px" }}>
        <img src="https://images.unsplash.com/photo-1630487656049-6db93a53a7e9?w=1200&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.78) 30%, rgba(13,27,42,0.42) 100%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>Главная</button>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Корпоративным</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(26px, 5vw, 48px)", fontWeight: 700 }}>
            Корпоративное бронирование
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginTop: 10, maxWidth: 520, fontWeight: 300 }}>
            Специальные условия для бизнеса: корпоративные тарифы, единый счёт и персональный менеджер
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {[
            { icon: <TrendingUp size={22} color="#c9963a" />, title: "Скидки до 25%", desc: "Специальные корпоративные тарифы во всех отелях-партнёрах" },
            { icon: <Building2 size={22} color="#c9963a" />, title: "Единый счёт", desc: "Консолидированный отчёт для бухгалтерии и налоговой отчётности" },
            { icon: <Shield size={22} color="#c9963a" />, title: "Гарантия мест", desc: "Приоритетное бронирование без предоплаты и без риска отказа" },
            { icon: <Headphones size={22} color="#c9963a" />, title: "Менеджер 24/7", desc: "Персональный менеджер для решения любых вопросов" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="p-5 rounded-sm" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
              <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-3" style={{ background: "rgba(201,150,58,0.1)" }}>{icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{title}</div>
              <div style={{ color: "#5a5040", fontSize: 13, lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tariffs */}
          <div className="space-y-4">
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Тарифные планы</h2>
            {[
              { name: "Стартовый", trips: "до 20 поездок/мес", price: "Бесплатно", perks: ["Корпоративный профиль", "Кэшбек 10%", "Единый отчёт"] },
              { name: "Бизнес", trips: "до 100 поездок/мес", price: "49 000 ₸/мес", perks: ["Всё из Стартового", "Скидка до 20%", "Персональный менеджер", "Приоритетное бронирование"], highlight: true },
              { name: "Энтерпрайз", trips: "Без ограничений", price: "Индивидуально", perks: ["Всё из Бизнес", "Скидка до 25%", "API-интеграция", "Выделенный счёт"] },
            ].map(({ name, trips, price, perks, highlight }) => (
              <div key={name} className="rounded-sm p-5" style={{ background: highlight ? "#0d1b2a" : "#fff", border: `2px solid ${highlight ? "#c9963a" : "rgba(13,27,42,0.1)"}` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", color: highlight ? "#fff" : "#0d1b2a", fontWeight: 700, fontSize: 18 }}>{name}</div>
                    <div style={{ color: highlight ? "rgba(255,255,255,0.55)" : "#5a5040", fontSize: 13 }}>{trips}</div>
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: "#c9963a", fontWeight: 700, fontSize: 16, textAlign: "right" }}>{price}</div>
                </div>
                <div className="space-y-1.5">
                  {perks.map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <Check size={13} color="#c9963a" />
                      <span style={{ color: highlight ? "rgba(255,255,255,0.8)" : "#3a3028", fontSize: 13 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Оставить заявку</h2>
            {sent ? (
              <div className="rounded-sm p-8 text-center" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                <Check size={36} color="#22c55e" className="mx-auto mb-3" />
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700 }}>Заявка отправлена!</p>
                <p style={{ color: "#5a5040", fontSize: 14, marginTop: 6 }}>Менеджер свяжется с вами в течение 2 часов</p>
              </div>
            ) : (
              <div className="rounded-sm p-6 space-y-4" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                {[
                  { label: "Название компании", k: "company", placeholder: "ООО «Компания»" },
                  { label: "Контактное лицо", k: "name", placeholder: "Иван Иванов" },
                  { label: "Email", k: "email", placeholder: "corp@company.uz" },
                  { label: "Телефон", k: "phone", placeholder: "+998 71 000 00 00" },
                ].map(({ label, k, placeholder }) => (
                  <div key={k}>
                    <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>{label}</label>
                    <input type="text" placeholder={placeholder} value={form[k as keyof typeof form]} onChange={(e) => u(k, e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14 }} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Кол-во командировок в месяц</label>
                  <select value={form.employees} onChange={(e) => u("employees", e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14, cursor: "pointer" }}>
                    <option value="">Выберите</option>
                    {["1–10", "11–30", "31–100", "Более 100"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <button onClick={() => form.company && form.email && setSent(true)} className="w-full py-3 rounded-sm text-sm flex items-center justify-center gap-2 transition-all" style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
                  Отправить заявку <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
