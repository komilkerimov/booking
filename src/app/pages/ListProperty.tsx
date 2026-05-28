import { useNavigate } from "react-router";
import { Building2, TrendingUp, Shield, Headphones, Check, ChevronRight } from "lucide-react";
import { useState } from "react";

export function ListProperty() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", property: "", city: "", rooms: "", phone: "", email: "" });
  const [sent, setSent] = useState(false);
  const u = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", paddingTop: 70 }}>
      <div className="relative overflow-hidden" style={{ background: "#0d1b2a", padding: "56px 24px" }}>
        <img src="/assets/images/photo-1646991761123-d83ce47c30c9.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.78) 30%, rgba(13,27,42,0.42) 100%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>Главная</button>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Разместить объект</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(26px, 5vw, 48px)", fontWeight: 700 }}>Разместить объект</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginTop: 10, maxWidth: 520, fontWeight: 300 }}>Зарегистрируйте ваш отель или апартаменты — получите тысячи новых гостей</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {[
            { val: "6 000+", label: "Объектов на платформе" },
            { val: "150 000+", label: "Активных гостей" },
            { val: "0₸", label: "Регистрация бесплатна" },
            { val: "15%", label: "Комиссия с бронирования" },
          ].map(({ val, label }) => (
            <div key={label} className="rounded-sm p-5 text-center" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "#c9963a", fontSize: 28, fontWeight: 700 }}>{val}</div>
              <div style={{ color: "#5a5040", fontSize: 13, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Почему Hurma?</h2>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {[
                { icon: <TrendingUp size={20} color="#c9963a" />, title: "Больше бронирований", desc: "Доступ к базе активных путешественников и корпоративных клиентов по всему СНГ." },
                { icon: <Building2 size={20} color="#c9963a" />, title: "Простое управление", desc: "Удобный личный кабинет: управляйте номерами, ценами и бронированиями в одном месте." },
                { icon: <Shield size={20} color="#c9963a" />, title: "Гарантия оплаты", desc: "Деньги поступают на счёт автоматически — без задержек и посредников." },
                { icon: <Headphones size={20} color="#c9963a" />, title: "Поддержка 24/7", desc: "Персональный менеджер поможет настроить профиль и ответит на любые вопросы." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 rounded-sm" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,150,58,0.1)" }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</div>
                    <div style={{ color: "#5a5040", fontSize: 13, lineHeight: 1.65 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-sm p-5" style={{ background: "#0d1b2a" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#c9963a", fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Что входит в размещение:</p>
              {["Неограниченное количество фото", "Синхронизация с вашим PMS/Channel Manager", "Аналитика и отчёты о бронированиях", "Возможность отвечать на отзывы гостей", "Приоритетное размещение в поиске (Pro-тариф)"].map((p) => (
                <div key={p} className="flex items-center gap-2 mb-2">
                  <Check size={13} color="#c9963a" />
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Подать заявку</h2>
            {sent ? (
              <div className="rounded-sm p-8 text-center" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                <Check size={36} color="#22c55e" className="mx-auto mb-3" />
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700 }}>Заявка принята!</p>
                <p style={{ color: "#5a5040", fontSize: 14, marginTop: 6 }}>Наш менеджер свяжется с вами по адресу {form.email} в течение 24 часов</p>
              </div>
            ) : (
              <div className="rounded-sm p-6 space-y-4" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                {[
                  { label: "Ваше имя", k: "name", placeholder: "Иван Иванов" },
                  { label: "Название объекта", k: "property", placeholder: "Отель «Ташкент»" },
                  { label: "Город", k: "city", placeholder: "Ташкент" },
                  { label: "Email", k: "email", placeholder: "hotel@example.com" },
                  { label: "Телефон", k: "phone", placeholder: "+998 71 000 00 00" },
                ].map(({ label, k, placeholder }) => (
                  <div key={k}>
                    <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>{label}</label>
                    <input type="text" placeholder={placeholder} value={form[k as keyof typeof form]} onChange={(e) => u(k, e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14 }} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Количество номеров</label>
                  <select value={form.rooms} onChange={(e) => u("rooms", e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14, cursor: "pointer" }}>
                    <option value="">Выберите</option>
                    {["1–10", "11–30", "31–100", "Более 100"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <button onClick={() => form.name && form.email && setSent(true)} className="w-full py-3 rounded-sm text-sm flex items-center justify-center gap-2" style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
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
