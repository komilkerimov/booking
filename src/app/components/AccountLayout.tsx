import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, CalendarCheck, User, CreditCard, Sparkles,
  LogOut, ChevronRight, Bell
} from "lucide-react";
import logo from "../../imports/MDK_Travel_logo.png";

const NAV = [
  { to: "/account", icon: <LayoutDashboard size={17} />, label: "Обзор" },
  { to: "/account/bookings", icon: <CalendarCheck size={17} />, label: "Мои бронирования" },
  { to: "/account/profile", icon: <User size={17} />, label: "Профиль" },
  { to: "/account/bonuses", icon: <Sparkles size={17} />, label: "Бонусы и кэшбек" },
  { to: "/account/payment", icon: <CreditCard size={17} />, label: "Способы оплаты" },
];

const USER = { name: "Дилноза Юсупова", email: "dilooza@mail.ru", avatar: "Д", bonuses: 3240 };

export function AccountLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", paddingTop: 70 }}>
      {/* Top bar */}
      <div style={{ background: "#0d1b2a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="MDK Travel" style={{ height: 30, objectFit: "contain" }} />
          </Link>
          <div className="flex items-center gap-4">
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", position: "relative" }}>
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center" style={{ background: "#c9963a", color: "#fff", fontSize: 10, fontWeight: 700 }}>2</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#c9963a", color: "#fff", fontWeight: 700, fontSize: 13 }}>{USER.avatar}</div>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}>{USER.name.split(" ")[0]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm mb-6" style={{ color: "#5a5040" }}>
          <Link to="/" style={{ color: "#5a5040", textDecoration: "none" }}>Главная</Link>
          <ChevronRight size={13} />
          <span style={{ color: "#0d1b2a" }}>Личный кабинет</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* User card */}
            <div className="rounded-sm p-5 mb-4" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, #c9963a, #0d1b2a)", color: "#fff", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
                  {USER.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontWeight: 600, fontSize: 15 }}>{USER.name}</div>
                  <div style={{ color: "#5a5040", fontSize: 12 }}>{USER.email}</div>
                </div>
              </div>
              <div className="px-3 py-2 rounded-sm" style={{ background: "rgba(201,150,58,0.08)", border: "1px solid rgba(201,150,58,0.2)" }}>
                <div style={{ color: "#5a5040", fontSize: 11 }}>Бонусный баланс</div>
                <div style={{ fontFamily: "'Playfair Display', serif", color: "#c9963a", fontSize: 20, fontWeight: 700 }}>{USER.bonuses.toLocaleString("ru-RU")} ₸</div>
              </div>
            </div>

            {/* Nav */}
            <div className="rounded-sm overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}>
              {NAV.map(({ to, icon, label }, i) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 px-4 py-3 transition-all"
                    style={{
                      textDecoration: "none",
                      background: active ? "rgba(201,150,58,0.06)" : "#fff",
                      color: active ? "#c9963a" : "#0d1b2a",
                      fontWeight: active ? 600 : 400,
                      fontSize: 14,
                      borderLeft: `3px solid ${active ? "#c9963a" : "transparent"}`,
                      borderBottom: i < NAV.length - 1 ? "1px solid rgba(13,27,42,0.06)" : "none",
                    }}
                  >
                    <span style={{ color: active ? "#c9963a" : "#5a5040" }}>{icon}</span>
                    {label}
                  </Link>
                );
              })}
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-3 px-4 py-3 w-full text-left transition-all"
                style={{ background: "#fff", border: "none", borderTop: "1px solid rgba(13,27,42,0.08)", color: "#c0392b", fontSize: 14, cursor: "pointer" }}
              >
                <LogOut size={17} color="#c0392b" /> Выйти
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
