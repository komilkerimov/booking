import { useState } from "react";
import { CreditCard, Plus, Trash2, Check, Shield, Eye, EyeOff } from "lucide-react";

const SAVED_CARDS = [
  { id: 1, type: "visa", last4: "4521", expiry: "08/26", name: "DILOOZA YUSUPOVA", isDefault: true },
  { id: 2, type: "humo", last4: "8834", expiry: "03/25", name: "DILOOZA YUSUPOVA", isDefault: false },
];

const TYPE_COLORS: Record<string, string> = {
  visa: "#1a1f71",
  mastercard: "#eb001b",
  humo: "#00a651",
  uzcard: "#e30613",
};

export function PaymentMethods() {
  const [cards, setCards] = useState(SAVED_CARDS);
  const [adding, setAdding] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [newCard, setNewCard] = useState({ number: "", name: "", expiry: "", cvv: "", type: "visa" });

  const handleAdd = () => {
    if (!newCard.number || !newCard.name || !newCard.expiry) return;
    const last4 = newCard.number.replace(/\s/g, "").slice(-4);
    setCards((prev) => [...prev, { id: Date.now(), type: newCard.type, last4, expiry: newCard.expiry, name: newCard.name.toUpperCase(), isDefault: prev.length === 0 }]);
    setAdding(false);
    setNewCard({ number: "", name: "", expiry: "", cvv: "", type: "visa" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const setDefault = (id: number) => setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
  const deleteCard = (id: number) => { setCards((prev) => prev.filter((c) => c.id !== id)); setDeleteConfirm(null); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 26, fontWeight: 700 }}>Способы оплаты</h1>
        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm" style={{ background: "rgba(34,197,94,0.1)", color: "#166534" }}>
            <Check size={14} /> Карта добавлена
          </div>
        )}
      </div>

      {/* Saved cards */}
      <div className="space-y-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-sm p-5 flex items-center gap-4 transition-all"
            style={{
              background: "#fff",
              border: `1px solid ${card.isDefault ? "#c9963a" : "rgba(13,27,42,0.08)"}`,
            }}
          >
            {/* Card visual */}
            <div
              className="rounded-sm flex items-center justify-center flex-shrink-0"
              style={{ width: 56, height: 36, background: TYPE_COLORS[card.type] || "#0d1b2a" }}
            >
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>{card.type.toUpperCase()}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span style={{ color: "#0d1b2a", fontWeight: 600, fontSize: 15, letterSpacing: "0.04em" }}>•••• •••• •••• {card.last4}</span>
                {card.isDefault && (
                  <span className="px-2 py-0.5 rounded-sm text-xs" style={{ background: "rgba(201,150,58,0.12)", color: "#c9963a", fontWeight: 600 }}>Основная</span>
                )}
              </div>
              <div style={{ color: "#5a5040", fontSize: 12, marginTop: 2 }}>
                {card.name} · Действует до {card.expiry}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!card.isDefault && (
                <button
                  onClick={() => setDefault(card.id)}
                  className="px-3 py-1.5 rounded-sm text-xs transition-all"
                  style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.2)", color: "#5a5040", cursor: "pointer" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "#c9963a")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(13,27,42,0.2)")}
                >
                  Сделать основной
                </button>
              )}
              {deleteConfirm === card.id ? (
                <div className="flex items-center gap-1.5">
                  <button onClick={() => deleteCard(card.id)} className="px-2 py-1 rounded-sm text-xs" style={{ background: "#c0392b", color: "#fff", border: "none", cursor: "pointer" }}>Да</button>
                  <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 rounded-sm text-xs" style={{ background: "#fff", color: "#0d1b2a", border: "1px solid rgba(13,27,42,0.2)", cursor: "pointer" }}>Нет</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(card.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }} onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#c0392b")} onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#aaa")}>
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add card */}
      {!adding ? (
        <button
          onClick={() => setAdding(true)}
          className="w-full py-4 rounded-sm flex items-center justify-center gap-2 transition-all"
          style={{ background: "#fff", border: "2px dashed rgba(13,27,42,0.2)", color: "#5a5040", cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9963a"; (e.currentTarget as HTMLButtonElement).style.color = "#c9963a"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(13,27,42,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "#5a5040"; }}
        >
          <Plus size={18} /> Добавить карту
        </button>
      ) : (
        <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Новая карта</h2>

          {/* Card type */}
          <div className="flex gap-2 mb-4">
            {["visa", "mastercard", "humo", "uzcard"].map((t) => (
              <button
                key={t}
                onClick={() => setNewCard((c) => ({ ...c, type: t }))}
                className="px-3 py-1.5 rounded-sm text-xs transition-all"
                style={{ border: `2px solid ${newCard.type === t ? "#c9963a" : "rgba(13,27,42,0.15)"}`, background: newCard.type === t ? "rgba(201,150,58,0.06)" : "#fff", fontWeight: newCard.type === t ? 700 : 400, cursor: "pointer", color: newCard.type === t ? "#c9963a" : "#0d1b2a" }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Номер карты</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-sm" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)" }}>
                <CreditCard size={16} color="#c9963a" />
                <input type="text" maxLength={19} placeholder="0000 0000 0000 0000" value={newCard.number} onChange={(e) => { const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim(); setNewCard((c) => ({ ...c, number: v })); }} className="flex-1 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 15, letterSpacing: "0.05em" }} />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Имя держателя</label>
              <input type="text" placeholder="IVAN IVANOV" value={newCard.name} onChange={(e) => setNewCard((c) => ({ ...c, name: e.target.value.toUpperCase() }))} className="w-full px-4 py-3 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14, letterSpacing: "0.06em" }} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Срок действия</label>
                <input type="text" maxLength={5} placeholder="MM/YY" value={newCard.expiry} onChange={(e) => { let v = e.target.value.replace(/\D/g, ""); if (v.length >= 2) v = v.slice(0,2) + "/" + v.slice(2); setNewCard((c) => ({ ...c, expiry: v })); }} className="w-full px-4 py-3 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14 }} />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>CVV</label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-sm" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)" }}>
                  <input type={showCvv ? "text" : "password"} maxLength={3} placeholder="•••" value={newCard.cvv} onChange={(e) => setNewCard((c) => ({ ...c, cvv: e.target.value }))} className="flex-1 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 14 }} />
                  <button type="button" onClick={() => setShowCvv(!showCvv)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5a5040" }}>
                    {showCvv ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 px-3 py-2 rounded-sm" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.18)" }}>
            <Shield size={14} color="#22c55e" />
            <span style={{ color: "#166534", fontSize: 12 }}>Данные карты защищены SSL-шифрованием и не хранятся на наших серверах</span>
          </div>

          <div className="flex gap-3 mt-5">
            <button onClick={handleAdd} className="px-6 py-2.5 rounded-sm text-sm" style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
              Добавить карту
            </button>
            <button onClick={() => setAdding(false)} className="px-6 py-2.5 rounded-sm text-sm" style={{ background: "transparent", color: "#0d1b2a", border: "1px solid rgba(13,27,42,0.2)", cursor: "pointer" }}>
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Other methods */}
      <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Другие способы оплаты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: "Click", desc: "Оплата через приложение Click", color: "#2196F3" },
            { name: "Payme", desc: "Оплата через Payme", color: "#00BCD4" },
            { name: "Бонусы", desc: "Использовать бонусный баланс (3 240 ₸)", color: "#c9963a" },
          ].map(({ name, desc, color }) => (
            <div key={name} className="p-4 rounded-sm" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.06)" }}>
              <div style={{ color, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{name}</div>
              <div style={{ color: "#5a5040", fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
