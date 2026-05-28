import { useNavigate } from "react-router";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

export function Contacts() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const u = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", paddingTop: 70 }}>
      <div className="relative overflow-hidden" style={{ background: "#0d1b2a", padding: "40px 24px" }}>
        <img src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1200&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.78) 30%, rgba(13,27,42,0.42) 100%)" }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>Главная</button>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Контакты</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700 }}>Контакты</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 8, fontWeight: 300 }}>Мы всегда рады помочь — выберите удобный способ связи</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact details */}
          <div className="space-y-4">
            {[
              { icon: <Phone size={20} color="#c9963a" />, title: "Телефон", lines: ["+998 71 200-00-00", "+998 71 200-00-01"] },
              { icon: <Mail size={20} color="#c9963a" />, title: "Email", lines: ["support@hurma.uz", "info@hurma.uz"] },
              { icon: <MapPin size={20} color="#c9963a" />, title: "Адрес", lines: ["ул. Амира Тимура 7", "Ташкент, Узбекистан"] },
              { icon: <Clock size={20} color="#c9963a" />, title: "Режим работы", lines: ["Пн–Вс: 8:00 – 23:00", "Без выходных"] },
            ].map(({ icon, title, lines }) => (
              <div key={title} className="rounded-sm p-5" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: "rgba(201,150,58,0.1)" }}>{icon}</div>
                  <span style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 15 }}>{title}</span>
                </div>
                {lines.map((l) => <p key={l} style={{ color: "#5a5040", fontSize: 14, paddingLeft: 48, marginTop: 2 }}>{l}</p>)}
              </div>
            ))}

            {/* Messengers */}
            <div className="rounded-sm p-5" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 15, marginBottom: 10 }}>Мессенджеры</p>
              <div className="flex gap-3">
                {[
                  { icon: <Send size={16} />, label: "Telegram", color: "#0088cc" },
                  { icon: <MessageCircle size={16} />, label: "WhatsApp", color: "#25D366" },
                ].map(({ icon, label, color }) => (
                  <button key={label} className="flex items-center gap-2 px-4 py-2 rounded-sm text-sm transition-all" style={{ border: `1px solid ${color}`, color, background: "transparent", cursor: "pointer", fontWeight: 500 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = color; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = color; }}>
                    {icon} {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 rounded-sm p-7" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Написать нам</h2>
            <p style={{ color: "#5a5040", fontSize: 14, marginBottom: 20 }}>Ответим в течение 2 часов в рабочее время</p>
            {sent ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(34,197,94,0.1)", border: "2px solid #22c55e" }}>
                  <Mail size={28} color="#22c55e" />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 20, fontWeight: 700 }}>Сообщение отправлено!</h3>
                <p style={{ color: "#5a5040", fontSize: 14, marginTop: 6 }}>Мы свяжемся с вами по адресу {form.email}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-4">
                  {[
                    { label: "Ваше имя", k: "name", placeholder: "Иван Иванов" },
                    { label: "Email", k: "email", placeholder: "you@example.com" },
                  ].map(({ label, k, placeholder }) => (
                    <div key={k} className="flex-1">
                      <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>{label}</label>
                      <input type="text" placeholder={placeholder} value={form[k as keyof typeof form]} onChange={(e) => u(k, e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14 }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Тема</label>
                  <select value={form.subject} onChange={(e) => u("subject", e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14, cursor: "pointer" }}>
                    <option value="">Выберите тему</option>
                    {["Вопрос о бронировании", "Технические проблемы", "Возврат и отмена", "Сотрудничество", "Другое"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Сообщение</label>
                  <textarea rows={5} placeholder="Опишите ваш вопрос..." value={form.message} onChange={(e) => u("message", e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none resize-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14 }} />
                </div>
                <button onClick={() => form.name && form.email && setSent(true)} className="px-8 py-3 rounded-sm text-sm transition-all" style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b8872e")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9963a")}>
                  Отправить сообщение
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
