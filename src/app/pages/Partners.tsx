import { useNavigate } from "react-router";
import { TrendingUp, Users, Globe2, Gift, Check, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Partners() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", website: "", type: "" });
  const [sent, setSent] = useState(false);
  const u = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", paddingTop: 70 }}>
      <div className="relative overflow-hidden" style={{ background: "#0d1b2a", padding: "56px 24px" }}>
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.78) 30%, rgba(13,27,42,0.42) 100%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>Главная</button>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Партнёрская программа</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(26px, 5vw, 48px)", fontWeight: 700 }}>Партнёрская программа</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginTop: 10, maxWidth: 520, fontWeight: 300 }}>Зарабатывайте вместе с Hurma — до 8% комиссии с каждого привлечённого бронирования</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {[
            { val: "8%", label: "Комиссия с брони" },
            { val: "150 000+", label: "Активных пользователей" },
            { val: "24ч", label: "Выплата вознаграждения" },
            { val: "∞", label: "Без ограничений дохода" },
          ].map(({ val, label }) => (
            <div key={label} className="rounded-sm p-5 text-center" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "#c9963a", fontSize: 28, fontWeight: 700 }}>{val}</div>
              <div style={{ color: "#5a5040", fontSize: 13, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Как это работает</h2>
            <div className="space-y-5">
              {[
                { step: "01", icon: <Users size={20} color="#c9963a" />, title: "Регистрация", desc: "Оставьте заявку и получите персональную реферальную ссылку в течение 1 рабочего дня." },
                { step: "02", icon: <Globe2 size={20} color="#c9963a" />, title: "Привлечение", desc: "Размещайте ссылку на сайте, в соцсетях или отправляйте друзьям — способ не ограничен." },
                { step: "03", icon: <TrendingUp size={20} color="#c9963a" />, title: "Отслеживание", desc: "В личном кабинете партнёра видны все переходы, регистрации и бронирования в реальном времени." },
                { step: "04", icon: <Gift size={20} color="#c9963a" />, title: "Выплата", desc: "Комиссия выплачивается на карту или HUMO/UzCard ежемесячно при остатке от 50 000 ₸." },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,150,58,0.1)", border: "1px solid rgba(201,150,58,0.3)" }}>
                    {icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: "#c9963a", fontSize: 11, fontWeight: 700 }}>{step}</span>
                      <span style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 15 }}>{title}</span>
                    </div>
                    <p style={{ color: "#5a5040", fontSize: 14, lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-sm p-5" style={{ background: "#0d1b2a" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#c9963a", fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Что вы получаете:</p>
              {["До 8% с каждого бронирования реферала", "Бонус 5 000 ₸ за первого приведённого пользователя", "Маркетинговые материалы и баннеры", "Доступ к API и виджетам для сайта"].map((p) => (
                <div key={p} className="flex items-center gap-2 mb-2">
                  <Check size={13} color="#c9963a" />
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Стать партнёром</h2>
            {sent ? (
              <div className="rounded-sm p-8 text-center" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                <Check size={36} color="#22c55e" className="mx-auto mb-3" />
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700 }}>Заявка принята!</p>
                <p style={{ color: "#5a5040", fontSize: 14, marginTop: 6 }}>Мы пришлём доступ к кабинету партнёра на {form.email}</p>
              </div>
            ) : (
              <div className="rounded-sm p-6 space-y-4" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                {[
                  { label: "Ваше имя / название", k: "name", placeholder: "Иван Иванов" },
                  { label: "Email", k: "email", placeholder: "you@example.com" },
                  { label: "Сайт или соцсеть", k: "website", placeholder: "https://..." },
                ].map(({ label, k, placeholder }) => (
                  <div key={k}>
                    <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>{label}</label>
                    <input type="text" placeholder={placeholder} value={form[k as keyof typeof form]} onChange={(e) => u(k, e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14 }} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Тип партнёрства</label>
                  <select value={form.type} onChange={(e) => u("type", e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14, cursor: "pointer" }}>
                    <option value="">Выберите</option>
                    {["Блог / контент-сайт", "Тревел-агентство", "Telegram-канал", "Instagram / соцсети", "Другое"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <button onClick={() => form.name && form.email && setSent(true)} className="w-full py-3 rounded-sm text-sm flex items-center justify-center gap-2 transition-all" style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
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
