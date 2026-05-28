import { useState } from "react";
import { Check, Camera, Bell } from "lucide-react";

export function Profile() {
  const [saved, setSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: "Дилноза", lastName: "Юсупова", email: "dilooza@mail.ru",
    phone: "90 123 45 67", birthdate: "1992-07-14", gender: "Женский", city: "Ташкент", lang: "Русский",
  });
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [notif, setNotif] = useState({ bookings: true, promo: true, news: false, sms: true });
  const u = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const Field = ({ label, name, type = "text" }: { label: string; name: string; type?: string }) => (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>{label}</label>
      <input
        type={type}
        value={form[name as keyof typeof form]}
        onChange={(e) => u(name, e.target.value)}
        className="w-full px-4 py-2.5 rounded-sm outline-none"
        style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14 }}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 26, fontWeight: 700 }}>Профиль</h1>

      {/* Avatar */}
      <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #c9963a, #0d1b2a)", color: "#fff", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
              {form.firstName[0]}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#c9963a", border: "2px solid #fff", cursor: "pointer" }}>
              <Camera size={12} color="#fff" />
            </button>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700 }}>{form.firstName} {form.lastName}</div>
            <div style={{ color: "#5a5040", fontSize: 13 }}>{form.email}</div>
            <div className="mt-1 px-2 py-0.5 inline-block rounded-sm text-xs" style={{ background: "rgba(34,197,94,0.1)", color: "#166534", fontWeight: 600 }}>✓ Email подтверждён</div>
          </div>
        </div>
      </div>

      {/* Personal info */}
      <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Личные данные</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="Имя" name="firstName" />
          <Field label="Фамилия" name="lastName" />
          <Field label="Email" name="email" type="email" />
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Телефон</label>
            <div className="flex rounded-sm overflow-hidden" style={{ border: "1px solid rgba(13,27,42,0.15)" }}>
              <div className="px-3 py-2.5 flex items-center" style={{ background: "#f5f0e8", borderRight: "1px solid rgba(13,27,42,0.1)", color: "#0d1b2a", fontSize: 14 }}>+998</div>
              <input type="tel" value={form.phone} onChange={(e) => u("phone", e.target.value)} className="flex-1 px-3 py-2.5 outline-none" style={{ background: "#f5f0e8", color: "#0d1b2a", fontSize: 14 }} />
            </div>
          </div>
          <Field label="Дата рождения" name="birthdate" type="date" />
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Пол</label>
            <select value={form.gender} onChange={(e) => u("gender", e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14, cursor: "pointer" }}>
              {["Мужской", "Женский", "Не указывать"].map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Город</label>
            <select value={form.city} onChange={(e) => u("city", e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14, cursor: "pointer" }}>
              {["Ташкент", "Самарканд", "Бухара", "Хива", "Другой"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Язык интерфейса</label>
            <select value={form.lang} onChange={(e) => u("lang", e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14, cursor: "pointer" }}>
              {["Русский", "O'zbekcha", "English"].map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
            className="px-6 py-2.5 rounded-sm text-sm flex items-center gap-2 transition-all"
            style={{ background: saved ? "#22c55e" : "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}
          >
            {saved ? <><Check size={14} /> Сохранено</> : "Сохранить изменения"}
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Безопасность</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {[
            { label: "Текущий пароль", key: "current" },
            { label: "Новый пароль", key: "next" },
            { label: "Повторите новый", key: "confirm" },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>{label}</label>
              <input type="password" placeholder="••••••••" value={pwForm[key as keyof typeof pwForm]} onChange={(e) => setPwForm((f) => ({ ...f, [key]: e.target.value }))} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14 }} />
            </div>
          ))}
        </div>
        <button
          onClick={() => { setPwSaved(true); setPwForm({ current: "", next: "", confirm: "" }); setTimeout(() => setPwSaved(false), 2500); }}
          className="px-6 py-2.5 rounded-sm text-sm flex items-center gap-2"
          style={{ background: pwSaved ? "#22c55e" : "#0d1b2a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}
        >
          {pwSaved ? <><Check size={14} /> Пароль обновлён</> : "Изменить пароль"}
        </button>
      </div>

      {/* Notifications */}
      <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} color="#c9963a" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700 }}>Уведомления</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: "bookings", label: "Статус бронирований", desc: "Подтверждения, напоминания, изменения" },
            { key: "promo", label: "Акции и спецпредложения", desc: "Скидки, кэшбек-промо, сезонные предложения" },
            { key: "news", label: "Новости и советы", desc: "Путеводители, новые направления" },
            { key: "sms", label: "SMS-уведомления", desc: "Только важные сообщения о бронировании" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-start justify-between gap-4">
              <div>
                <div style={{ color: "#0d1b2a", fontSize: 14, fontWeight: 500 }}>{label}</div>
                <div style={{ color: "#5a5040", fontSize: 12, marginTop: 1 }}>{desc}</div>
              </div>
              <button
                onClick={() => setNotif((n) => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                className="w-11 h-6 rounded-full flex-shrink-0 transition-all duration-200 relative"
                style={{ background: notif[key as keyof typeof notif] ? "#c9963a" : "#e8dfc8", border: "none", cursor: "pointer" }}
              >
                <div
                  className="w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-200"
                  style={{ left: notif[key as keyof typeof notif] ? 26 : 4 }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(192,57,43,0.2)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#c0392b", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Опасная зона</h2>
        <p style={{ color: "#5a5040", fontSize: 13, marginBottom: 12 }}>Удаление аккаунта необратимо. Все данные будут потеряны.</p>
        <button className="px-5 py-2 rounded-sm text-sm" style={{ background: "transparent", color: "#c0392b", border: "1px solid rgba(192,57,43,0.4)", cursor: "pointer", fontWeight: 500 }}>
          Удалить аккаунт
        </button>
      </div>
    </div>
  );
}
