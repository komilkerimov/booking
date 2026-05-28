import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { HOTELS } from "../data";
import {
  Check, ChevronRight, Star, MapPin, Shield, CreditCard,
  User, Phone, Mail, Calendar, Users, Sparkles, Lock, Eye, EyeOff, AlertCircle
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Детали" },
  { id: 2, label: "Гости" },
  { id: 3, label: "Оплата" },
  { id: 4, label: "Подтверждение" },
];

const ROOM_TYPES = [
  { id: "standard", name: "Стандартный номер", size: "28 м²", beds: "1 двуспальная", price: 0, amenities: ["Wi-Fi", "TV", "Кондиционер"] },
  { id: "deluxe", name: "Делюкс с видом", size: "36 м²", beds: "1 King-size", price: 35000, amenities: ["Wi-Fi", "TV", "Кондиционер", "Мини-бар", "Балкон"] },
  { id: "suite", name: "Сьюит", size: "58 м²", beds: "1 King-size + гостиная", price: 80000, amenities: ["Wi-Fi", "TV", "Кондиционер", "Мини-бар", "Джакузи", "Гостиная"] },
];

const CARD_TYPES = [
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "humo", label: "HUMO" },
  { id: "uzcard", label: "UzCard" },
];

function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300"
              style={{
                background: step > s.id ? "#22c55e" : step === s.id ? "#0d1b2a" : "#e8dfc8",
                color: step >= s.id ? "#fff" : "#5a5040",
                fontWeight: 600,
              }}
            >
              {step > s.id ? <Check size={16} /> : s.id}
            </div>
            <span className="text-xs mt-1 hidden sm:block" style={{ color: step === s.id ? "#0d1b2a" : "#5a5040", fontWeight: step === s.id ? 600 : 400 }}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="w-16 sm:w-24 h-0.5 mx-2 mb-4 transition-all duration-300" style={{ background: step > s.id ? "#22c55e" : "#e8dfc8" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function SummaryCard({ hotel, roomType, checkIn, checkOut, guests }: {
  hotel: typeof HOTELS[0]; roomType: typeof ROOM_TYPES[0]; checkIn: string; checkOut: string; guests: number;
}) {
  const nights = checkIn && checkOut ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 1;
  const totalPrice = (hotel.price + roomType.price) * nights;
  const cashback = Math.round(totalPrice * hotel.cashback / 100);

  return (
    <div className="rounded-sm p-5 sticky top-24" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.1)" }}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Ваш заказ</h3>
      <img src={hotel.image} alt={hotel.name} className="w-full rounded-sm object-cover mb-3" style={{ height: 120 }} />
      <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 15, fontWeight: 600 }}>{hotel.name}</div>
      <div className="flex items-center gap-1 mt-0.5 mb-3">
        <MapPin size={12} color="#5a5040" />
        <span style={{ color: "#5a5040", fontSize: 12 }}>{hotel.address}</span>
      </div>
      <div className="flex gap-0.5 mb-3">{Array.from({ length: hotel.stars }).map((_, i) => <Star key={i} size={11} fill="#c9963a" color="#c9963a" />)}</div>
      <div className="space-y-2 text-sm mb-4 pt-3" style={{ borderTop: "1px solid rgba(13,27,42,0.08)" }}>
        <div className="flex justify-between">
          <span style={{ color: "#5a5040" }}>Номер</span>
          <span style={{ color: "#0d1b2a", fontWeight: 500, textAlign: "right", maxWidth: 120 }}>{roomType.name}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "#5a5040" }}>Заезд</span>
          <span style={{ color: "#0d1b2a" }}>{checkIn || "—"}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "#5a5040" }}>Выезд</span>
          <span style={{ color: "#0d1b2a" }}>{checkOut || "—"}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "#5a5040" }}>Ночей</span>
          <span style={{ color: "#0d1b2a" }}>{nights}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "#5a5040" }}>Гостей</span>
          <span style={{ color: "#0d1b2a" }}>{guests}</span>
        </div>
      </div>
      <div className="space-y-1.5 text-sm pt-3" style={{ borderTop: "1px solid rgba(13,27,42,0.08)" }}>
        <div className="flex justify-between">
          <span style={{ color: "#5a5040" }}>{(hotel.price + roomType.price).toLocaleString("ru-RU")} × {nights} ночей</span>
          <span style={{ color: "#0d1b2a" }}>{totalPrice.toLocaleString("ru-RU")} ₸</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "#5a5040" }}>Кэшбек {hotel.cashback}%</span>
          <span style={{ color: "#22c55e", fontWeight: 600 }}>+{cashback.toLocaleString("ru-RU")} ₸</span>
        </div>
        <div className="flex justify-between pt-2 mt-1" style={{ borderTop: "1px dashed rgba(13,27,42,0.12)" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 700 }}>Итого</span>
          <span style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700 }}>{totalPrice.toLocaleString("ru-RU")} ₸</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-4 px-3 py-2 rounded-sm" style={{ background: "rgba(201,150,58,0.08)", border: "1px solid rgba(201,150,58,0.25)" }}>
        <Sparkles size={13} color="#c9963a" />
        <span style={{ color: "#c9963a", fontSize: 12, fontWeight: 600 }}>Кэшбек придёт в течение 24 часов</span>
      </div>
    </div>
  );
}

export function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = HOTELS.find((h) => h.id === Number(id));

  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(ROOM_TYPES[0]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [showCvv, setShowCvv] = useState(false);
  const [payMethod, setPayMethod] = useState("card");
  const [cardType, setCardType] = useState("visa");

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    country: "Узбекистан", specialRequests: "",
    cardNumber: "", cardName: "", cardExpiry: "", cardCvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!hotel) return (
    <div className="flex items-center justify-center" style={{ minHeight: "100vh" }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22 }}>Отель не найден</p>
    </div>
  );

  const nights = checkIn && checkOut ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 1;
  const totalPrice = (hotel.price + selectedRoom.price) * nights;
  const cashback = Math.round(totalPrice * hotel.cashback / 100);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Введите имя";
    if (!form.lastName.trim()) e.lastName = "Введите фамилию";
    if (!form.phone.trim()) e.phone = "Введите телефон";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Введите корректный email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (payMethod === "card") {
      if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Введите номер карты";
      if (!form.cardName.trim()) e.cardName = "Введите имя держателя";
      if (!form.cardExpiry.trim()) e.cardExpiry = "Введите срок действия";
      if (!form.cardCvv.trim()) e.cardCvv = "Введите CVV";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && (!checkIn || !checkOut)) { setErrors({ dates: "Выберите даты заезда и выезда" }); return; }
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setErrors({});
    setStep((s) => s + 1);
  };

  const Field = ({ label, name, type = "text", placeholder, half = false }: { label: string; name: string; type?: string; placeholder?: string; half?: boolean }) => (
    <div className={half ? "flex-1" : "w-full"}>
      <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name as keyof typeof form]}
        onChange={(e) => update(name, e.target.value)}
        className="w-full px-4 py-2.5 rounded-sm outline-none transition-all"
        style={{
          background: "#f5f0e8",
          border: `1px solid ${errors[name] ? "#c0392b" : "rgba(13,27,42,0.15)"}`,
          color: "#0d1b2a",
          fontSize: 14,
        }}
      />
      {errors[name] && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors[name]}</p>}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", paddingTop: 70 }}>
      {/* Banner */}
      <div className="relative overflow-hidden" style={{ background: "#0d1b2a", padding: "28px 24px" }}>
        <img src={hotel.image} alt={hotel.name} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.78) 40%, rgba(13,27,42,0.42) 100%)" }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>Главная</button>
            <span>/</span>
            <button onClick={() => navigate(`/hotel/${hotel.id}`)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>{hotel.name}</button>
            <span>/</span>
            <span style={{ color: "rgba(255,255,255,0.75)" }}>Бронирование</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "clamp(20px, 3.5vw, 34px)", fontWeight: 700 }}>
            Оформление бронирования
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginTop: 6, fontWeight: 300 }}>
            {hotel.name} · {hotel.address}
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6" style={{ color: "#5a5040" }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "#5a5040" }}>Главная</button>
          <ChevronRight size={14} />
          <button onClick={() => navigate(`/hotel/${hotel.id}`)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5a5040" }}>{hotel.name}</button>
          <ChevronRight size={14} />
          <span style={{ color: "#0d1b2a" }}>Бронирование</span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#0d1b2a", fontWeight: 700, marginBottom: 28 }}>Бронирование</h1>

        <StepBar step={step} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0">

            {/* ── STEP 1: Room & Dates ── */}
            {step === 1 && (
              <div>
                {/* Dates & Guests */}
                <div className="rounded-sm p-6 mb-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
                    Даты и гости
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Дата заезда</label>
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-sm" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)" }}>
                        <Calendar size={15} color="#c9963a" />
                        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="flex-1 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 14 }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Дата выезда</label>
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-sm" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)" }}>
                        <Calendar size={15} color="#c9963a" />
                        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="flex-1 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 14 }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Гостей</label>
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-sm" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)" }}>
                        <Users size={15} color="#c9963a" />
                        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="flex-1 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 14, cursor: "pointer" }}>
                          {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} {n===1?"гость":n<5?"гостя":"гостей"}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  {errors.dates && (
                    <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-sm" style={{ background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.3)" }}>
                      <AlertCircle size={14} color="#c0392b" />
                      <span style={{ color: "#c0392b", fontSize: 13 }}>{errors.dates}</span>
                    </div>
                  )}
                </div>

                {/* Room selection */}
                <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
                    Выберите номер
                  </h2>
                  <div className="space-y-4">
                    {ROOM_TYPES.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className="rounded-sm p-4 cursor-pointer transition-all duration-200"
                        style={{
                          border: `2px solid ${selectedRoom.id === room.id ? "#c9963a" : "rgba(13,27,42,0.1)"}`,
                          background: selectedRoom.id === room.id ? "rgba(201,150,58,0.04)" : "#fff",
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div
                              className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ borderColor: selectedRoom.id === room.id ? "#c9963a" : "rgba(13,27,42,0.25)" }}
                            >
                              {selectedRoom.id === room.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#c9963a" }} />}
                            </div>
                            <div>
                              <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 16 }}>{room.name}</div>
                              <div className="flex flex-wrap gap-3 mt-1 text-xs" style={{ color: "#5a5040" }}>
                                <span>{room.size}</span>
                                <span>·</span>
                                <span>{room.beds}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {room.amenities.map((a) => (
                                  <span key={a} className="px-2 py-0.5 rounded-sm text-xs" style={{ background: "#f5f0e8", color: "#3a3028", border: "1px solid rgba(13,27,42,0.08)" }}>{a}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 18, fontWeight: 700 }}>
                              {(hotel.price + room.price).toLocaleString("ru-RU")} ₸
                            </div>
                            <div style={{ color: "#5a5040", fontSize: 11 }}>за ночь</div>
                            {room.price > 0 && <div style={{ color: "#c9963a", fontSize: 12, marginTop: 2 }}>+{room.price.toLocaleString("ru-RU")} ₸</div>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: Guest Details ── */}
            {step === 2 && (
              <div className="rounded-sm p-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Данные гостя</h2>
                <p style={{ color: "#5a5040", fontSize: 14, marginBottom: 20 }}>Данные должны совпадать с документом, удостоверяющим личность</p>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <Field label="Имя" name="firstName" placeholder="Иван" half />
                    <Field label="Фамилия" name="lastName" placeholder="Иванов" half />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Телефон</label>
                      <div className="flex rounded-sm overflow-hidden" style={{ border: `1px solid ${errors.phone ? "#c0392b" : "rgba(13,27,42,0.15)"}` }}>
                        <div className="flex items-center px-3" style={{ background: "#f5f0e8", borderRight: "1px solid rgba(13,27,42,0.1)" }}>
                          <Phone size={14} color="#c9963a" />
                          <span className="ml-1.5 text-sm" style={{ color: "#0d1b2a" }}>+998</span>
                        </div>
                        <input type="tel" placeholder="90 123 45 67" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="flex-1 px-3 py-2.5 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 14 }} />
                      </div>
                      {errors.phone && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.phone}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Email</label>
                      <div className="flex rounded-sm overflow-hidden" style={{ border: `1px solid ${errors.email ? "#c0392b" : "rgba(13,27,42,0.15)"}` }}>
                        <div className="flex items-center px-3" style={{ background: "#f5f0e8", borderRight: "1px solid rgba(13,27,42,0.1)" }}>
                          <Mail size={14} color="#c9963a" />
                        </div>
                        <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="flex-1 px-3 py-2.5 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 14 }} />
                      </div>
                      {errors.email && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Страна</label>
                    <select value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14, cursor: "pointer" }}>
                      {["Узбекистан", "Россия", "Казахстан", "Кыргызстан", "Таджикистан", "Другая"].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Особые пожелания <span style={{ color: "#aaa", fontWeight: 400 }}>(необязательно)</span></label>
                    <textarea
                      rows={3}
                      placeholder="Высокий этаж, детская кроватка, ранний заезд..."
                      value={form.specialRequests}
                      onChange={(e) => update("specialRequests", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-sm outline-none resize-none"
                      style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.15)", color: "#0d1b2a", fontSize: 14 }}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 mt-5 px-4 py-3 rounded-sm" style={{ background: "rgba(13,27,42,0.04)", border: "1px solid rgba(13,27,42,0.08)" }}>
                  <User size={14} color="#c9963a" className="mt-0.5 flex-shrink-0" />
                  <p style={{ color: "#5a5040", fontSize: 13, lineHeight: 1.6 }}>
                    Данные используются только для оформления бронирования. Мы не передаём их третьим лицам.
                  </p>
                </div>
              </div>
            )}

            {/* ── STEP 3: Payment ── */}
            {step === 3 && (
              <div>
                {/* Payment method */}
                <div className="rounded-sm p-6 mb-6" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Способ оплаты</h2>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      { id: "card", label: "Банковская карта", icon: <CreditCard size={18} /> },
                      { id: "click", label: "Click", icon: <span style={{ fontWeight: 800, fontSize: 13 }}>Click</span> },
                      { id: "payme", label: "Payme", icon: <span style={{ fontWeight: 800, fontSize: 13 }}>Payme</span> },
                    ].map(({ id, label, icon }) => (
                      <button
                        key={id}
                        onClick={() => setPayMethod(id)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm transition-all"
                        style={{
                          border: `2px solid ${payMethod === id ? "#c9963a" : "rgba(13,27,42,0.15)"}`,
                          background: payMethod === id ? "rgba(201,150,58,0.05)" : "#fff",
                          color: "#0d1b2a",
                          fontWeight: payMethod === id ? 600 : 400,
                          cursor: "pointer",
                        }}
                      >
                        {icon} {label}
                      </button>
                    ))}
                  </div>

                  {payMethod === "card" && (
                    <div className="space-y-4">
                      {/* Card type */}
                      <div className="flex gap-2">
                        {CARD_TYPES.map((ct) => (
                          <button
                            key={ct.id}
                            onClick={() => setCardType(ct.id)}
                            className="px-3 py-1.5 rounded-sm text-xs transition-all"
                            style={{
                              border: `1px solid ${cardType === ct.id ? "#c9963a" : "rgba(13,27,42,0.2)"}`,
                              background: cardType === ct.id ? "#c9963a" : "#fff",
                              color: cardType === ct.id ? "#fff" : "#0d1b2a",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            {ct.label}
                          </button>
                        ))}
                      </div>
                      {/* Card number */}
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Номер карты</label>
                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-sm" style={{ background: "#f5f0e8", border: `1px solid ${errors.cardNumber ? "#c0392b" : "rgba(13,27,42,0.15)"}` }}>
                          <CreditCard size={16} color="#c9963a" />
                          <input
                            type="text"
                            maxLength={19}
                            placeholder="0000 0000 0000 0000"
                            value={form.cardNumber}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                              update("cardNumber", v);
                            }}
                            className="flex-1 outline-none bg-transparent"
                            style={{ color: "#0d1b2a", fontSize: 15, letterSpacing: "0.05em" }}
                          />
                        </div>
                        {errors.cardNumber && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.cardNumber}</p>}
                      </div>
                      <div>
                        <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Имя держателя карты</label>
                        <input type="text" placeholder="IVAN IVANOV" value={form.cardName} onChange={(e) => update("cardName", e.target.value.toUpperCase())} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: `1px solid ${errors.cardName ? "#c0392b" : "rgba(13,27,42,0.15)"}`, color: "#0d1b2a", fontSize: 14, letterSpacing: "0.08em" }} />
                        {errors.cardName && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.cardName}</p>}
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Срок действия</label>
                          <input type="text" maxLength={5} placeholder="MM/YY" value={form.cardExpiry} onChange={(e) => { let v = e.target.value.replace(/\D/g,""); if (v.length>=2) v=v.slice(0,2)+"/"+v.slice(2); update("cardExpiry",v); }} className="w-full px-4 py-2.5 rounded-sm outline-none" style={{ background: "#f5f0e8", border: `1px solid ${errors.cardExpiry ? "#c0392b" : "rgba(13,27,42,0.15)"}`, color: "#0d1b2a", fontSize: 14 }} />
                          {errors.cardExpiry && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.cardExpiry}</p>}
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>CVV / CVC</label>
                          <div className="flex items-center gap-2 px-4 py-2.5 rounded-sm" style={{ background: "#f5f0e8", border: `1px solid ${errors.cardCvv ? "#c0392b" : "rgba(13,27,42,0.15)"}` }}>
                            <input type={showCvv ? "text" : "password"} maxLength={3} placeholder="•••" value={form.cardCvv} onChange={(e) => update("cardCvv", e.target.value)} className="flex-1 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 14 }} />
                            <button onClick={() => setShowCvv(!showCvv)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5a5040" }}>
                              {showCvv ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>
                          {errors.cardCvv && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.cardCvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {(payMethod === "click" || payMethod === "payme") && (
                    <div className="py-8 text-center rounded-sm" style={{ background: "#f5f0e8", border: "1px dashed rgba(13,27,42,0.2)" }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 16, fontWeight: 600 }}>Оплата через {payMethod === "click" ? "Click" : "Payme"}</p>
                      <p style={{ color: "#5a5040", fontSize: 14, marginTop: 6 }}>После нажатия «Оплатить» вы будете перенаправлены на страницу оплаты</p>
                    </div>
                  )}
                </div>

                {/* Security note */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-sm" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <Lock size={15} color="#22c55e" />
                  <span style={{ color: "#166534", fontSize: 13 }}>Платёж защищён SSL-шифрованием. Данные карты не сохраняются.</span>
                </div>
              </div>
            )}

            {/* ── STEP 4: Confirmation ── */}
            {step === 4 && (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(34,197,94,0.12)", border: "2px solid #22c55e" }}>
                  <Check size={36} color="#22c55e" />
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#0d1b2a", fontWeight: 700 }}>Бронирование подтверждено!</h2>
                <p style={{ color: "#5a5040", fontSize: 15, marginTop: 8, maxWidth: 400, margin: "8px auto 0" }}>
                  Подтверждение отправлено на {form.email || "ваш email"}. Номер бронирования:
                </p>
                <div className="inline-block mt-4 px-6 py-3 rounded-sm" style={{ background: "#0d1b2a" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", color: "#c9963a", fontSize: 20, fontWeight: 700, letterSpacing: "0.1em" }}>
                    HRM-{Math.floor(Math.random() * 900000) + 100000}
                  </span>
                </div>

                {/* Summary */}
                <div className="mt-8 max-w-md mx-auto text-left rounded-sm p-5" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.1)" }}>
                  <div className="space-y-3 text-sm">
                    {[
                      ["Отель", hotel.name],
                      ["Номер", selectedRoom.name],
                      ["Гость", `${form.firstName} ${form.lastName}`],
                      ["Заезд", checkIn || "—"],
                      ["Выезд", checkOut || "—"],
                      ["Ночей", String(nights)],
                      ["Гостей", String(guests)],
                      ["Итого", `${totalPrice.toLocaleString("ru-RU")} ₸`],
                      ["Кэшбек", `+${cashback.toLocaleString("ru-RU")} ₸`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span style={{ color: "#5a5040" }}>{k}</span>
                        <span style={{ color: k === "Кэшбек" ? "#22c55e" : "#0d1b2a", fontWeight: k === "Итого" || k === "Кэшбек" ? 700 : 400 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center mt-8">
                  <button
                    onClick={() => navigate("/account/bookings")}
                    className="px-6 py-3 rounded-sm text-sm"
                    style={{ background: "#0d1b2a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}
                  >
                    Мои бронирования
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 rounded-sm text-sm"
                    style={{ background: "transparent", color: "#0d1b2a", fontWeight: 600, border: "1px solid rgba(13,27,42,0.2)", cursor: "pointer" }}
                  >
                    На главную
                  </button>
                </div>
              </div>
            )}

            {/* Navigation */}
            {step < 4 && (
              <div className="flex items-center justify-between mt-6">
                {step > 1 ? (
                  <button onClick={() => { setErrors({}); setStep((s) => s - 1); }} className="px-6 py-2.5 rounded-sm text-sm" style={{ background: "transparent", color: "#0d1b2a", border: "1px solid rgba(13,27,42,0.2)", cursor: "pointer" }}>
                    ← Назад
                  </button>
                ) : (
                  <button onClick={() => navigate(`/hotel/${hotel.id}`)} className="px-6 py-2.5 rounded-sm text-sm" style={{ background: "transparent", color: "#0d1b2a", border: "1px solid rgba(13,27,42,0.2)", cursor: "pointer" }}>
                    ← К отелю
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-8 py-2.5 rounded-sm text-sm transition-all duration-200"
                  style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b8872e")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9963a")}
                >
                  {step === 3 ? "Оплатить" : "Продолжить"} →
                </button>
              </div>
            )}
          </div>

          {/* Sidebar summary */}
          {step < 4 && (
            <div className="lg:w-72 flex-shrink-0">
              <SummaryCard hotel={hotel} roomType={selectedRoom} checkIn={checkIn} checkOut={checkOut} guests={guests} />
              <div className="mt-4 px-4 py-3 rounded-sm flex items-center gap-2" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
                <Shield size={14} color="#c9963a" />
                <span style={{ color: "#5a5040", fontSize: 12 }}>Бесплатная отмена бронирования</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
