import { useNavigate } from "react-router";
import { Shield, Headphones, CreditCard, Star, Users, Building2, Globe2, Award } from "lucide-react";

const TEAM = [
  { name: "Мухаммад Алиев", role: "Генеральный директор", avatar: "М" },
  { name: "Светлана Ким", role: "Директор по продукту", avatar: "С" },
  { name: "Тимур Рашидов", role: "Head of Technology", avatar: "Т" },
  { name: "Дилноза Юнусова", role: "Директор по маркетингу", avatar: "Д" },
];

export function About() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", paddingTop: 70 }}>
      {/* Hero */}
      <div className="relative overflow-hidden py-20 px-6" style={{ background: "#0d1b2a" }}>
        <img src="https://images.unsplash.com/photo-1715540335937-f54bf332585a?w=1200&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.52 }} />
        <div className="absolute inset-0" style={{ background: "rgba(13,27,42,0.55)" }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#c9963a", fontWeight: 500, letterSpacing: "0.12em" }}>О компании</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 52px)", color: "#fff", fontWeight: 700 }}>
            Мы открываем красоту<br />
            <span style={{ color: "#c9963a", fontStyle: "italic" }}>Шёлкового пути</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, marginTop: 14, maxWidth: 560, margin: "14px auto 0", fontWeight: 300, lineHeight: 1.75 }}>
            Hurma — платформа для бронирования отелей в Узбекистане и странах СНГ. Мы помогаем путешественникам находить лучшие варианты размещения и экономить на каждом бронировании.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "#c9963a" }}>
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Building2 size={22} />, val: "1 000 000+", label: "вариантов жилья" },
            { icon: <Users size={22} />, val: "150 000+", label: "довольных гостей" },
            { icon: <Globe2 size={22} />, val: "6", label: "городов Узбекистана" },
            { icon: <Award size={22} />, val: "20%", label: "максимальный кэшбек" },
          ].map(({ icon, val, label }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>{icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 28, fontWeight: 700 }}>{val}</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-sm tracking-widest uppercase mb-3" style={{ color: "#c9963a", fontWeight: 500 }}>Наша миссия</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#0d1b2a", fontWeight: 700, lineHeight: 1.25 }}>
              Сделать путешествия по Узбекистану доступными и приятными
            </h2>
            <p className="mt-4" style={{ color: "#5a5040", fontSize: 15, lineHeight: 1.78 }}>
              Мы верим, что каждый путешественник заслуживает комфортного и незабываемого опыта. Наша платформа объединяет лучшие отели страны и возвращает деньги за каждое бронирование.
            </p>
            <p className="mt-3" style={{ color: "#5a5040", fontSize: 15, lineHeight: 1.78 }}>
              Основанная в 2020 году в Ташкенте, Hurma выросла до крупнейшего агрегатора отелей в Центральной Азии. Сегодня нам доверяют более 150 000 путешественников ежегодно.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <CreditCard size={22} color="#c9963a" />, title: "Кэшбек до 20%", desc: "Реальные деньги за каждое бронирование" },
              { icon: <Shield size={22} color="#c9963a" />, title: "Безопасность", desc: "Защита платежей и данных клиентов" },
              { icon: <Star size={22} color="#c9963a" />, title: "Проверенные отзывы", desc: "Только реальные гости пишут отзывы" },
              { icon: <Headphones size={22} color="#c9963a" />, title: "Поддержка 24/7", desc: "Telegram, телефон, email всегда на связи" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-4 rounded-sm" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                <div className="mb-2">{icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 14 }}>{title}</div>
                <div style={{ color: "#5a5040", fontSize: 12, marginTop: 3, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "#c9963a", fontWeight: 500 }}>Наша команда</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#0d1b2a", fontWeight: 700 }}>Люди за Hurma</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: "linear-gradient(135deg, #c9963a 0%, #0d1b2a 100%)", fontSize: 28, color: "#fff", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}
                >
                  {member.avatar}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 15 }}>{member.name}</div>
                <div style={{ color: "#5a5040", fontSize: 13, marginTop: 3 }}>{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm tracking-widest uppercase mb-8" style={{ color: "#c9963a", fontWeight: 500 }}>Партнёры и клиенты</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {["Uzbekistan Airways", "Silk Road Tourism", "Ministry of Tourism", "UzCard", "HUMO", "Kapital Bank"].map((p) => (
              <div
                key={p}
                className="px-5 py-3 rounded-sm"
                style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.1)", color: "#5a5040", fontSize: 13, fontWeight: 500 }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-6" style={{ background: "#0d1b2a" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, color: "#fff", fontWeight: 700 }}>
            Готовы начать путешествие?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 10, marginBottom: 24 }}>
            Более 1 000 000 вариантов жилья по всему Узбекистану
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate("/search")}
              className="px-8 py-3 rounded-sm text-sm transition-all duration-200"
              style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b8872e")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9963a")}
            >
              Найти отель
            </button>
            <button
              onClick={() => navigate("/destinations")}
              className="px-8 py-3 rounded-sm text-sm transition-all duration-200"
              style={{ background: "transparent", color: "#fff", fontWeight: 600, border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#c9963a")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)")}
            >
              Направления
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
