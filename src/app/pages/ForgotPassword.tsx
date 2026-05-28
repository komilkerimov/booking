import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Check, ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import logo from "../../imports/MDK_Travel_logo.png";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "code" | "newpass" | "done">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Введите корректный email"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("code"); }, 1000);
  };

  const handleCode = () => {
    const full = code.join("");
    if (full.length < 6) { setError("Введите весь код"); return; }
    setError("");
    setStep("newpass");
  };

  const handleNewPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError("Минимум 8 символов"); return; }
    if (password !== confirm) { setError("Пароли не совпадают"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("done"); }, 1000);
  };

  const handleCodeInput = (i: number, v: string) => {
    if (v.length > 1) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) {
      const el = document.getElementById(`code-${i + 1}`);
      el?.focus();
    }
  };

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={{ background: "#f5f0e8" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/"><img src={logo} alt="MDK Travel" style={{ height: 32, filter: "invert(1) brightness(0)", margin: "0 auto 16px" }} /></Link>
        </div>
        {children}
      </div>
    </div>
  );

  if (step === "email") return (
    <Card>
      <div className="rounded-sm p-8" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.1)" }}>
        <Link to="/login" className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "#5a5040", textDecoration: "none" }}>
          <ArrowLeft size={14} /> Назад ко входу
        </Link>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(201,150,58,0.1)" }}>
          <Mail size={24} color="#c9963a" />
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 6 }}>
          Восстановление пароля
        </h1>
        <p style={{ color: "#5a5040", fontSize: 14, textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>
          Введите email, привязанный к вашему аккаунту — мы отправим код восстановления
        </p>
        <form onSubmit={handleEmail} className="space-y-4">
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>Email адрес</label>
            <div className="flex items-center rounded-sm overflow-hidden" style={{ border: `1px solid ${error ? "#c0392b" : "rgba(13,27,42,0.18)"}`, background: "#f5f0e8" }}>
              <div className="px-3" style={{ color: "#c9963a" }}><Mail size={16} /></div>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 py-3 pr-4 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 14 }} />
            </div>
            {error && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{error}</p>}
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 rounded-sm text-sm flex items-center justify-center gap-2" style={{ background: "#c9963a", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>
            {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Отправка...</> : "Отправить код →"}
          </button>
        </form>
      </div>
    </Card>
  );

  if (step === "code") return (
    <Card>
      <div className="rounded-sm p-8" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.1)" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(201,150,58,0.1)" }}>
          <Mail size={24} color="#c9963a" />
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 6 }}>
          Введите код
        </h1>
        <p style={{ color: "#5a5040", fontSize: 14, textAlign: "center", marginBottom: 8, lineHeight: 1.6 }}>
          Код отправлен на <strong style={{ color: "#0d1b2a" }}>{email}</strong>
        </p>
        <p style={{ color: "#c9963a", fontSize: 12, textAlign: "center", marginBottom: 28 }}>Для демо введите любые 6 цифр</p>
        <div className="flex gap-2 justify-center mb-6">
          {code.map((val, i) => (
            <input
              key={i}
              id={`code-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={(e) => handleCodeInput(i, e.target.value)}
              onKeyDown={(e) => { if (e.key === "Backspace" && !val && i > 0) document.getElementById(`code-${i - 1}`)?.focus(); }}
              className="w-12 h-14 rounded-sm text-center outline-none text-xl"
              style={{ border: `2px solid ${val ? "#c9963a" : "rgba(13,27,42,0.18)"}`, background: "#f5f0e8", color: "#0d1b2a", fontWeight: 700 }}
            />
          ))}
        </div>
        {error && <p className="text-xs mb-3 text-center" style={{ color: "#c0392b" }}>{error}</p>}
        <button onClick={handleCode} className="w-full py-3 rounded-sm text-sm" style={{ background: "#c9963a", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>
          Подтвердить →
        </button>
        <button onClick={() => {}} className="w-full mt-3 text-sm" style={{ background: "none", border: "none", cursor: "pointer", color: "#5a5040" }}>
          Отправить снова
        </button>
      </div>
    </Card>
  );

  if (step === "newpass") return (
    <Card>
      <div className="rounded-sm p-8" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.1)" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(201,150,58,0.1)" }}>
          <Lock size={24} color="#c9963a" />
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 6 }}>
          Новый пароль
        </h1>
        <p style={{ color: "#5a5040", fontSize: 14, textAlign: "center", marginBottom: 24 }}>Придумайте надёжный пароль для вашего аккаунта</p>
        <form onSubmit={handleNewPass} className="space-y-4">
          {[
            { label: "Новый пароль", val: password, set: setPassword, show: showPw, toggle: () => setShowPw(!showPw) },
            { label: "Повторите пароль", val: confirm, set: setConfirm, show: showPw, toggle: () => setShowPw(!showPw) },
          ].map(({ label, val, set, show, toggle }) => (
            <div key={label}>
              <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>{label}</label>
              <div className="flex items-center rounded-sm overflow-hidden" style={{ border: "1px solid rgba(13,27,42,0.18)", background: "#f5f0e8" }}>
                <div className="px-3" style={{ color: "#c9963a" }}><Lock size={16} /></div>
                <input type={show ? "text" : "password"} placeholder="••••••••" value={val} onChange={(e) => set(e.target.value)} className="flex-1 py-3 outline-none bg-transparent" style={{ color: "#0d1b2a", fontSize: 14 }} />
                <button type="button" onClick={toggle} className="px-3" style={{ background: "none", border: "none", cursor: "pointer", color: "#5a5040" }}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}
          {error && <p className="text-xs" style={{ color: "#c0392b" }}>{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 rounded-sm text-sm flex items-center justify-center gap-2" style={{ background: "#c9963a", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>
            {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Сохранение...</> : "Сохранить пароль"}
          </button>
        </form>
      </div>
    </Card>
  );

  return (
    <Card>
      <div className="rounded-sm p-8 text-center" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.1)" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(34,197,94,0.12)", border: "2px solid #22c55e" }}>
          <Check size={36} color="#22c55e" />
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Пароль обновлён!</h1>
        <p style={{ color: "#5a5040", fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>Теперь вы можете войти в аккаунт с новым паролем</p>
        <button onClick={() => navigate("/login")} className="w-full py-3 rounded-sm text-sm" style={{ background: "#c9963a", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>
          Войти в аккаунт
        </button>
      </div>
    </Card>
  );
}
