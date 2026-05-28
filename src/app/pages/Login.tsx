import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import logo from "../../imports/MDK_Travel_logo.png";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.includes("@")) e.email = "Введите корректный email";
    if (password.length < 6) e.password = "Минимум 6 символов";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/account"); }, 1200);
  };

  const InputField = ({ label, name, type, placeholder, value, onChange, icon }: {
    label: string; name: string; type: string; placeholder: string; value: string; onChange: (v: string) => void; icon: React.ReactNode;
  }) => (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: "#5a5040", fontWeight: 500 }}>{label}</label>
      <div className="flex items-center rounded-sm overflow-hidden" style={{ border: `1px solid ${errors[name] ? "#c0392b" : "rgba(13,27,42,0.18)"}`, background: "#f5f0e8" }}>
        <div className="px-3 flex items-center" style={{ color: "#c9963a" }}>{icon}</div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 py-3 pr-3 outline-none bg-transparent"
          style={{ color: "#0d1b2a", fontSize: 14 }}
        />
        {name === "password" && (
          <button type="button" onClick={() => setShowPw(!showPw)} className="px-3" style={{ background: "none", border: "none", cursor: "pointer", color: "#5a5040" }}>
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {errors[name] && <p className="text-xs mt-1" style={{ color: "#c0392b" }}>{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f0e8" }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-10 w-96 flex-shrink-0"
        style={{ background: "#0d1b2a" }}
      >
        <Link to="/">
          <img src={logo} alt="MDK Travel" style={{ height: 36, objectFit: "contain" }} />
        </Link>
        <div>
          <blockquote style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 22, lineHeight: 1.5, fontStyle: "italic" }}>
            "Путешествие — единственная вещь, которую вы покупаете, но которая делает вас богаче."
          </blockquote>
          <div className="mt-5 flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#c9963a", color: "#fff", fontWeight: 700 }}>Ш</div>
            <div>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Шелковый путь</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>Узбекистан</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {[
            "/assets/images/photo-1664602078796-68ee76b3fc59.jpg",
            "/assets/images/photo-1774851431070-f1cbba496e41.jpg",
            "/assets/images/photo-1629140727571-9b5c6f6267b4.jpg",
          ].map((src, i) => (
            <div key={i} className="flex-1 rounded-sm overflow-hidden" style={{ height: 80 }}>
              <img src={src} alt="" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link to="/"><img src={logo} alt="MDK Travel" style={{ height: 32, filter: "invert(1) brightness(0)", margin: "0 auto" }} /></Link>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 30, fontWeight: 700, marginBottom: 4 }}>
            Добро пожаловать
          </h1>
          <p style={{ color: "#5a5040", fontSize: 14, marginBottom: 28 }}>
            Войдите в свой аккаунт Hurma
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Email" name="email" type="email" placeholder="you@example.com" value={email} onChange={setEmail} icon={<Mail size={16} />} />
            <InputField label="Пароль" name="password" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={setPassword} icon={<Lock size={16} />} />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" style={{ accentColor: "#c9963a" }} />
                <span style={{ color: "#5a5040", fontSize: 13 }}>Запомнить меня</span>
              </label>
              <Link to="/forgot-password" style={{ color: "#c9963a", fontSize: 13, textDecoration: "none", fontWeight: 500 }}>
                Забыли пароль?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-sm text-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={{ background: loading ? "#b8872e" : "#c9963a", color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Вход...</>
              ) : "Войти"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(13,27,42,0.12)" }} />
            <span style={{ color: "#5a5040", fontSize: 12 }}>или войти через</span>
            <div className="flex-1 h-px" style={{ background: "rgba(13,27,42,0.12)" }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Google", color: "#4285f4" },
              { label: "Telegram", color: "#0088cc" },
            ].map(({ label, color }) => (
              <button
                key={label}
                className="py-2.5 rounded-sm text-sm transition-all flex items-center justify-center gap-2"
                style={{ border: "1px solid rgba(13,27,42,0.15)", background: "#fff", color: "#0d1b2a", fontWeight: 500, cursor: "pointer" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = color)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(13,27,42,0.15)")}
              >
                <span style={{ color, fontWeight: 700 }}>●</span> {label}
              </button>
            ))}
          </div>

          <p className="text-center mt-8 text-sm" style={{ color: "#5a5040" }}>
            Нет аккаунта?{" "}
            <Link to="/register" style={{ color: "#c9963a", fontWeight: 600, textDecoration: "none" }}>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
