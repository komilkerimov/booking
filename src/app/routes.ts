import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { AccountLayout } from "./components/AccountLayout";
import { Home } from "./pages/Home";
import { SearchResults } from "./pages/SearchResults";
import { HotelDetail } from "./pages/HotelDetail";
import { Destinations } from "./pages/Destinations";
import { About } from "./pages/About";
import { Booking } from "./pages/Booking";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Dashboard } from "./pages/account/Dashboard";
import { Bookings } from "./pages/account/Bookings";
import { Profile } from "./pages/account/Profile";
import { Bonuses } from "./pages/account/Bonuses";
import { PaymentMethods } from "./pages/account/PaymentMethods";
import { Contacts } from "./pages/Contacts";
import { Faq } from "./pages/Faq";
import { Corporate } from "./pages/Corporate";
import { Partners } from "./pages/Partners";
import { Advertising } from "./pages/Advertising";
import { ListProperty } from "./pages/ListProperty";
import { Offer } from "./pages/Offer";
import { Privacy } from "./pages/Privacy";
import { DownloadProject } from "./components/DownloadProject";

export const router = createBrowserRouter([
  { path: "download-project", Component: DownloadProject },
  // Auth pages — no layout
  { path: "login", Component: Login },
  { path: "register", Component: Register },
  { path: "forgot-password", Component: ForgotPassword },

  // Account pages — account layout
  {
    path: "account",
    Component: AccountLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "bookings", Component: Bookings },
      { path: "profile", Component: Profile },
      { path: "bonuses", Component: Bonuses },
      { path: "payment", Component: PaymentMethods },
    ],
  },

  // Main app — main layout
  {
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "search", Component: SearchResults },
      { path: "hotel/:id", Component: HotelDetail },
      { path: "destinations", Component: Destinations },
      { path: "about", Component: About },
      { path: "booking/:id", Component: Booking },
      { path: "contacts", Component: Contacts },
      { path: "faq", Component: Faq },
      { path: "corporate", Component: Corporate },
      { path: "partners", Component: Partners },
      { path: "advertising", Component: Advertising },
      { path: "list-property", Component: ListProperty },
      { path: "offer", Component: Offer },
      { path: "privacy", Component: Privacy },
    ],
  },
]);
