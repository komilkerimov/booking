import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f5f0e8", minHeight: "100vh" }}>
      <Navbar transparent={isHome} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
