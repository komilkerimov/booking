import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Mail, Lock, User, Phone, Check, ChevronRight } from "lucide-react";
import logo from "../../imports/MDK_Travel_logo.png";

const STEPS = [
  { id: 1, label: "Личные данные" },
  { id: 2, label: "Контакты" },
  { id: 3, label: "Пароль" },
  { id: 4, label: "Готово" },
];

function StepBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-300"
              style={{
                background: step > s.id ? "#22c55e" : step === s.id ? "#c9963a" : "#e8dfc8",
                color: step >= s.id ? "#fff" : "#5a5040",
                fontWeight: 700,
              }}
            >
              {step > s.id ? <Check size={14} /> : s.id}
            </div>
            <span className="text-xs mt-1 hidden sm:block" style={{ color: step === s.id ? "#0d1b2a" : "#5a5040", fontWeight: step === s.id ? 600 : 400 }}>
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="w-10 sm:w-16 h-0.5 mx-1 mb-4" style={{ background: step > s.id ? "#22c55e" : "#e8dfc8", transition: "background 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    firstName: "", lastName: "", birthdate: "", gender: "",
    phone: "", email: "", city: "Ташкент",
    password: "", confirmPassword: "",
  });

  const u = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = "Введите имя";
      if (!form.lastName.trim()) e.lastName = "Введите фамилию";
    }
    if (step === 2) {
      if (!form.phone.trim()) e.phone = "Введите телефон";
      if (!form.email.includes("@")) e.email = "Введите корректный email";
    }
    if (step === 3) {
      if (form.password.length < 8) e.password = "Минимум 8 символов";
      if (form.password !== form.confirmPassword) e.confirmPassword = "Пароли не совпадают";
      if (!agreed) e.agreed = "Примите условия использования";
    }
    return e;
  };

  const next = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep((s) => s + 1);
  };

  const strength = (() => {
    const p = form.password;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["", "Слабый", "Средний", "Хороший", "Надёжный"][strength];
  const strengthColor = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"][strength];

  const Field = ({ label, name, type = "text", placeholder, icon, children }: {
    label: string; name: string; type?: string; placeholder?: string; icon?: React.ReactNode; children?: React.ReactNode;
  }) => (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>{label}</label>
      {children || (
        <div className="flex items-center rounded-sm overflow-hidden" style={{ border: `1px solid ${errors[name] ? "#c0392b" : "rgba(13,27,42,0.18)"}`, background: "#f5f0e8" }}>
          {icon && <div className="px-3 flex items-center" style={{ color: "#c9963a" }}>{icon}</div>}
          <input
            type={type}
            placeholder={placeholder}
            value={form[name as keyof typeof form]}
            onChange={(e) => u(name, e.target.value)}
            className="flex-1 py-3 pr-4 outline-none bg-transparent"
            style={{ color: "#0d1b2a", fontSize: 14, paddingLeft: icon ? 0 : 16 }}
          />
        </div>
      )}
      {errors[name] && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f0e8" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between p-10 w-80 flex-shrink-0" style={{ background: "#0d1b2a" }}>
        <Link to="/"><img src={logo} alt="MDK Travel" style={{ height: 36, objectFit: "contain" }} /></Link>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", color: "#c9963a", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Присоединяйтесь к Hurma</p>
          <p style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 20, lineHeight: 1.5 }}>
            Кэшбек до 20% на каждое бронирование
          </p>
          <div className="mt-6 space-y-3">
            {["Более 1 000 000 вариантов жилья", "Гарантия лучшей цены", "Поддержка 24/7 на русском языке", "Безопасная оплата"].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,150,58,0.2)", border: "1px solid rgba(201,150,58,0.4)" }}>
                  <Check size={11} color="#c9963a" />
                </div>
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1774851071998-e10c352a9fd2?w=400&h=200&fit=crop"
          alt="Самарканд"
          className="rounded-sm w-full object-cover"
          style={{ height: 140, opacity: 0.65 }}
        />
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="lg:hidden mb-6 text-center">
            <Link to="/"><img src={logo} alt="MDK Travel" style={{ height: 32, filter: "invert(1) brightness(0)", margin: "0 auto" }} /></Link>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
            {step < 4 ? "Регистрация" : "Аккаунт создан!"}
          </h1>
          <p style={{ color: "#5a5040", fontSize: 14, marginBottom: 24 }}>
            {step < 4 ? `Шаг ${step} из 3` : "Добро пожаловать в Hurma"}
          </p>

          <StepBar step={step} />

          {/* Step 1: Personal */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <Field label="Имя" name="firstName" placeholder="Иван" icon={<User size={16} />} />
                <Field label="Фамилия" name="lastName" placeholder="Иванов" icon={<User size={16} />} />
              </div>
              <Field label="Дата рождения" name="birthdate" type="date" placeholder="" />
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Пол</label>
                <div className="flex gap-3">
                  {["Мужской", "Женский", "Не указывать"].map((g) => (
                    <button
                      key={g}
                      onClick={() => u("gender", g)}
                      className="flex-1 py-2.5 rounded-sm text-sm transition-all"
                      style={{
                        border: `1px solid ${form.gender === g ? "#c9963a" : "rgba(13,27,42,0.18)"}`,
                        background: form.gender === g ? "rgba(201,150,58,0.08)" : "#f5f0e8",
                        color: form.gender === g ? "#c9963a" : "#5a5040",
                        fontWeight: form.gender === g ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contacts */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Телефон</label>
                <div className="flex rounded-sm overflow-hidden" style={{ border: `1px solid ${errors.phone ? "#c0392b" : "rgba(13,27,42,0.18)"}`, background: "#f5f0e8" }}>
                  <div className="flex items-center px-3 gap-1.5" style={{ borderRight: "1px solid rgba(13,27,42,0.1)" }}>
                    <Phone size={15} color="#c9963a" />
                    <span style={{ color: "#0d1b2a", fontSize: 14 }}>+998</span>
                  </div>
                  <input type="tel" placeholder="90 123 45 67" value={form.phone} onChange={(e) => u("phone", e.target.value)} className="flex-1 px-3 py-3 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 14 }} />
                </div>
                {errors.phone && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.phone}</p>}
              </div>
              <Field label="Email" name="email" type="email" placeholder="you@example.com" icon={<Mail size={16} />} />
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Город проживания</label>
                <select value={form.city} onChange={(e) => u("city", e.target.value)} className="w-full px-4 py-3 rounded-sm outline-none" style={{ background: "#f5f0e8", border: "1px solid rgba(13,27,42,0.18)", color: "#0d1b2a", fontSize: 14, cursor: "pointer" }}>
                  {["Ташкент", "Самарканд", "Бухара", "Хива", "Андижан", "Другой"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="px-4 py-3 rounded-sm flex items-start gap-2" style={{ background: "rgba(201,150,58,0.08)", border: "1px solid rgba(201,150,58,0.2)" }}>
                <Check size={14} color="#c9963a" className="mt-0.5 flex-shrink-0" />
                <p style={{ color: "#5a5040", fontSize: 12, lineHeight: 1.6 }}>На указанный телефон будет отправлен код подтверждения. Email используется для уведомлений о бронировании.</p>
              </div>
            </div>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Пароль</label>
                <div className="flex items-center rounded-sm overflow-hidden" style={{ border: `1px solid ${errors.password ? "#c0392b" : "rgba(13,27,42,0.18)"}`, background: "#f5f0e8" }}>
                  <div className="px-3 flex items-center" style={{ color: "#c9963a" }}><Lock size={16} /></div>
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="Минимум 8 символов"
                    value={form.password}
                    onChange={(e) => u("password", e.target.value)}
                    className="flex-1 py-3 outline-none bg-transparent"
                    style={{ color: "#0d1b2a", fontSize: 14 }}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="px-3" style={{ background: "none", border: "none", cursor: "pointer", color: "#5a5040" }}>
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.password}</p>}
                {/* Strength bar */}
                {form.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{ background: i <= strength ? strengthColor : "#e8dfc8" }} />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Повторите пароль</label>
                <div className="flex items-center rounded-sm overflow-hidden" style={{ border: `1px solid ${errors.confirmPassword ? "#c0392b" : "rgba(13,27,42,0.18)"}`, background: "#f5f0e8" }}>
                  <div className="px-3 flex items-center" style={{ color: "#c9963a" }}><Lock size={16} /></div>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Повторите пароль"
                    value={form.confirmPassword}
                    onChange={(e) => u("confirmPassword", e.target.value)}
                    className="flex-1 py-3 outline-none bg-transparent"
                    style={{ color: "#0d1b2a", fontSize: 14 }}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="px-3" style={{ background: "none", border: "none", cursor: "pointer", color: "#5a5040" }}>
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.confirmPassword}</p>}
              </div>
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ accentColor: "#c9963a", marginTop: 2 }} />
                  <span style={{ color: "#5a5040", fontSize: 13, lineHeight: 1.6 }}>
                    Я принимаю{" "}
                    <a href="#" style={{ color: "#c9963a", textDecoration: "none" }}>условия использования</a>
                    {" "}и{" "}
                    <a href="#" style={{ color: "#c9963a", textDecoration: "none" }}>политику конфиденциальности</a>
                  </span>
                </label>
                {errors.agreed && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors.agreed}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(34,197,94,0.12)", border: "2px solid #22c55e" }}>
                <Check size={36} color="#22c55e" />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#0d1b2a", fontWeight: 700 }}>Аккаунт создан!</h2>
              <p style={{ color: "#5a5040", fontSize: 14, marginTop: 8, lineHeight: 1.65 }}>
                Добро пожаловать, <strong>{form.firstName}</strong>!<br />
                Ваш аккаунт успешно создан. Войдите, чтобы начать путешествие.
              </p>
              <div className="mt-6 px-5 py-4 rounded-sm text-left" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.1)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Check size={14} color="#22c55e" />
                  <span style={{ color: "#0d1b2a", fontSize: 13, fontWeight: 600 }}>Приветственный бонус активирован</span>
                </div>
                <p style={{ color: "#5a5040", fontSize: 13 }}>Вам начислено <strong style={{ color: "#c9963a" }}>500 баллов</strong> за регистрацию. Используйте их при следующем бронировании.</p>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={() => navigate("/account")}
                  className="w-full py-3 rounded-sm text-sm"
                  style={{ background: "#c9963a", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}
                >
                  Перейти в личный кабинет
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 rounded-sm text-sm"
                  style={{ background: "transparent", color: "#0d1b2a", border: "1px solid rgba(13,27,42,0.2)", cursor: "pointer" }}
                >
                  На главную
                </button>
              </div>
            </div>
          )}

          {step < 4 && (
            <div className="flex items-center justify-between mt-6">
              {step > 1 ? (
                <button onClick={() => { setErrors({}); setStep((s) => s - 1); }} className="px-6 py-2.5 rounded-sm text-sm" style={{ background: "transparent", color: "#0d1b2a", border: "1px solid rgba(13,27,42,0.2)", cursor: "pointer" }}>
                  ← Назад
                </button>
              ) : <div />}
              <button
                onClick={next}
                className="px-8 py-2.5 rounded-sm text-sm flex items-center gap-2 transition-all"
                style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b8872e")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9963a")}
              >
                {step === 3 ? "Создать аккаунт" : "Продолжить"} <ChevronRight size={15} />
              </button>
            </div>
          )}

          {step < 4 && (
            <p className="text-center mt-6 text-sm" style={{ color: "#5a5040" }}>
              Уже есть аккаунт?{" "}
              <Link to="/login" style={{ color: "#c9963a", fontWeight: 600, textDecoration: "none" }}>Войти</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
