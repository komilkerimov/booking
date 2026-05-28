import { useState } from "react";
import { MapPin, Calendar, Users, Search } from "lucide-react";

interface SearchBarProps {
  onSearch?: (params: { destination: string; checkIn: string; checkOut: string; guests: number; rooms: number }) => void;
  compact?: boolean;
}

export function SearchBar({ onSearch, compact = false }: SearchBarProps) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [guestOpen, setGuestOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Отели");

  const tabs = ["Отели", "Хостелы", "Апартаменты", "Санатории"];

  return (
    <div className="w-full max-w-5xl rounded-sm shadow-2xl overflow-visible" style={{ background: "#fff" }}>
      {!compact && (
        <div className="flex border-b" style={{ borderColor: "rgba(13,27,42,0.1)" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-3 text-sm transition-all duration-150 border-b-2"
              style={{
                fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? "#c9963a" : "#5a5040",
                borderBottomColor: activeTab === tab ? "#c9963a" : "transparent",
                background: "none",
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap md:flex-nowrap items-stretch divide-x divide-black/10">
        {/* Destination */}
        <div className="flex-1 min-w-[180px] flex items-center gap-3 px-5 py-4">
          <MapPin size={17} color="#c9963a" />
          <div className="flex-1">
            <div className="text-xs mb-1" style={{ color: "#5a5040" }}>Направление</div>
            <input
              type="text"
              placeholder="Самарканд, Ташкент..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full outline-none bg-transparent"
              style={{ color: "#0d1b2a", fontSize: 14 }}
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="flex-1 min-w-[150px] flex items-center gap-3 px-5 py-4">
          <Calendar size={17} color="#c9963a" />
          <div className="flex-1">
            <div className="text-xs mb-1" style={{ color: "#5a5040" }}>Заезд</div>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full outline-none bg-transparent"
              style={{ color: "#0d1b2a", fontSize: 14 }}
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="flex-1 min-w-[150px] flex items-center gap-3 px-5 py-4">
          <Calendar size={17} color="#c9963a" />
          <div className="flex-1">
            <div className="text-xs mb-1" style={{ color: "#5a5040" }}>Выезд</div>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full outline-none bg-transparent"
              style={{ color: "#0d1b2a", fontSize: 14 }}
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative flex-1 min-w-[150px]">
          <button
            className="w-full flex items-center gap-3 px-5 py-4 text-left"
            onClick={() => setGuestOpen(!guestOpen)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <Users size={17} color="#c9963a" />
            <div>
              <div className="text-xs mb-1" style={{ color: "#5a5040" }}>Гости и номера</div>
              <div style={{ color: "#0d1b2a", fontSize: 14 }}>{guests} гост. · {rooms} ном.</div>
            </div>
          </button>
          {guestOpen && (
            <div
              className="absolute top-full left-0 mt-1 w-60 rounded-sm shadow-xl p-4 z-20"
              style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.1)" }}
            >
              {[
                { label: "Взрослые", val: guests, set: setGuests },
                { label: "Номера", val: rooms, set: setRooms },
              ].map(({ label, val, set }) => (
                <div key={label} className="flex items-center justify-between py-2">
                  <span style={{ color: "#0d1b2a", fontSize: 14 }}>{label}</span>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-7 h-7 rounded-full border flex items-center justify-center"
                      style={{ borderColor: "#c9963a", color: "#c9963a", background: "none", cursor: "pointer", fontSize: 18 }}
                      onClick={() => set(Math.max(1, val - 1))}
                    >−</button>
                    <span style={{ color: "#0d1b2a", minWidth: 16, textAlign: "center" }}>{val}</span>
                    <button
                      className="w-7 h-7 rounded-full border flex items-center justify-center"
                      style={{ borderColor: "#c9963a", color: "#c9963a", background: "none", cursor: "pointer", fontSize: 18 }}
                      onClick={() => set(val + 1)}
                    >+</button>
                  </div>
                </div>
              ))}
              <button
                className="w-full mt-2 py-2 rounded-sm text-sm"
                style={{ background: "#c9963a", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}
                onClick={() => setGuestOpen(false)}
              >Применить</button>
            </div>
          )}
        </div>

        {/* Search button */}
        <button
          className="flex items-center gap-2 px-7 py-4 transition-colors duration-200"
          style={{ background: "#0d1b2a", color: "#fff", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer" }}
          onClick={() => onSearch?.({ destination, checkIn, checkOut, guests, rooms })}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9963a")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#0d1b2a")}
        >
          <Search size={17} />
          Найти
        </button>
      </div>
    </div>
  );
}
