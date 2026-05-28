import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, Search } from "lucide-react";

const FAQS = [
  {
    category: "Бронирование",
    items: [
      { q: "Как забронировать отель?", a: "Найдите отель через поисковую форму на главной странице, выберите подходящий вариант и нажмите «Забронировать». Следуйте шагам: выберите номер, введите данные гостя, оплатите — и бронирование готово." },
      { q: "Можно ли забронировать без предоплаты?", a: "Да, большинство отелей позволяют бронировать без предоплаты. Такие отели помечены значком «Без предоплаты». Оплата производится на месте при заезде." },
      { q: "Как получить подтверждение бронирования?", a: "Подтверждение автоматически отправляется на email, указанный при бронировании. Также его можно найти в разделе «Мои бронирования» личного кабинета." },
      { q: "Можно ли изменить даты бронирования?", a: "Возможность изменения зависит от условий конкретного отеля. Свяжитесь с поддержкой Hurma — мы поможем внести изменения, если это предусмотрено тарифом." },
    ],
  },
  {
    category: "Кэшбек и бонусы",
    items: [
      { q: "Как работает кэшбек?", a: "После завершения проживания мы начисляем кэшбек на ваш бонусный счёт. Размер кэшбека зависит от отеля и вашего уровня в программе лояльности (от 5% до 20%)." },
      { q: "Когда поступает кэшбек?", a: "Кэшбек зачисляется в течение 24–48 часов после даты выезда из отеля. Средства отображаются в разделе «Бонусы и кэшбек» личного кабинета." },
      { q: "Как использовать бонусы?", a: "При оформлении бронирования на шаге оплаты выберите «Использовать бонусы». Бонусами можно оплатить до 30% от стоимости бронирования." },
    ],
  },
  {
    category: "Отмена и возврат",
    items: [
      { q: "Как отменить бронирование?", a: "Перейдите в «Мои бронирования» → найдите нужную бронь → нажмите «Отменить». Условия возврата зависят от тарифа. Бесплатная отмена возможна при наличии соответствующего тарифа." },
      { q: "Когда вернутся деньги после отмены?", a: "Срок возврата составляет 3–10 рабочих дней в зависимости от вашего банка. Бонусный кэшбек, если был начислен, будет аннулирован." },
      { q: "Что если отель не соответствует описанию?", a: "Свяжитесь с поддержкой Hurma — мы разберёмся в ситуации и поможем с компенсацией или поиском альтернативного жилья." },
    ],
  },
  {
    category: "Оплата",
    items: [
      { q: "Какие способы оплаты принимаются?", a: "Банковские карты Visa, Mastercard, HUMO, UzCard, а также электронные кошельки Click и Payme. Оплата наличными не предусмотрена." },
      { q: "Безопасна ли оплата на сайте?", a: "Да. Все транзакции защищены SSL-шифрованием. Данные карт не хранятся на наших серверах — платежи обрабатываются через сертифицированные платёжные системы." },
    ],
  },
];

export function Faq() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = FAQS.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        !search ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", paddingTop: 70 }}>
      <div className="relative overflow-hidden" style={{ background: "#0d1b2a", padding: "40px 24px" }}>
        <img src="https://images.unsplash.com/photo-1715540335937-f54bf332585a?w=1200&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.78) 30%, rgba(13,27,42,0.42) 100%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>Главная</button>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Помощь и FAQ</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700 }}>Помощь и FAQ</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 8, fontWeight: 300, marginBottom: 20 }}>Ответы на часто задаваемые вопросы</p>
          {/* Search */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-sm" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <Search size={16} color="rgba(255,255,255,0.5)" />
            <input type="text" placeholder="Поиск по вопросам..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 outline-none bg-transparent" style={{ color: "#fff", fontSize: 14 }} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10">
        {filtered.map((cat) => (
          <div key={cat.category}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
              {cat.category}
            </h2>
            <div className="space-y-2">
              {cat.items.map((item) => {
                const key = cat.category + item.q;
                const isOpen = open === key;
                return (
                  <div key={key} className="rounded-sm overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                    <button
                      onClick={() => setOpen(isOpen ? null : key)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                      style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                      <span style={{ color: "#0d1b2a", fontSize: 15, fontWeight: 500, flex: 1, textAlign: "left" }}>{item.q}</span>
                      <ChevronDown size={16} color="#5a5040" style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginLeft: 12 }} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4" style={{ borderTop: "1px solid rgba(13,27,42,0.06)" }}>
                        <p style={{ color: "#3a3028", fontSize: 14, lineHeight: 1.75, paddingTop: 12 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 600 }}>Ничего не найдено</p>
            <p style={{ color: "#5a5040", fontSize: 14, marginTop: 6 }}>Попробуйте изменить запрос или свяжитесь с нами</p>
            <button onClick={() => navigate("/contacts")} className="mt-4 px-5 py-2 rounded-sm text-sm" style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
              Написать в поддержку
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
