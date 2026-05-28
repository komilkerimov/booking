import { Star, MapPin, Heart } from "lucide-react";
import { useState } from "react";

interface HotelCardProps {
  id: number;
  name: string;
  location: string;
  stars: number;
  rating: number;
  reviews: number;
  price: number;
  cashback: number;
  image: string;
  badge?: string;
  onClick?: () => void;
}

export function HotelCard({ name, location, stars, rating, reviews, price, cashback, image, badge, onClick }: HotelCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="group rounded-sm overflow-hidden flex flex-col transition-all duration-300 cursor-pointer"
      style={{ background: "#fff", border: "1px solid rgba(13,27,42,0.08)" }}
      onClick={onClick}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(13,27,42,0.13)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div className="relative overflow-hidden" style={{ height: 210 }}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute top-3 left-3 px-2 py-0.5 text-xs rounded-sm" style={{ background: "#c9963a", color: "#fff", fontWeight: 600 }}>
            {badge}
          </div>
        )}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.9)" }}
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        >
          <Heart size={14} fill={liked ? "#c9963a" : "none"} color={liked ? "#c9963a" : "#0d1b2a"} />
        </button>
        <div className="absolute bottom-3 left-3 px-2 py-0.5 text-xs rounded-sm" style={{ background: "#0d1b2a", color: "#c9963a", fontWeight: 600 }}>
          Кэшбек {cashback}%
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex gap-0.5 mb-1.5">
          {Array.from({ length: stars }).map((_, i) => <Star key={i} size={11} fill="#c9963a" color="#c9963a" />)}
        </div>
        <h3 className="mb-1 leading-snug" style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 16, fontWeight: 600 }}>
          {name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={12} color="#5a5040" />
          <span style={{ color: "#5a5040", fontSize: 13 }}>{location}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded-sm text-sm" style={{ background: "#0d1b2a", color: "#fff", fontWeight: 700 }}>{rating}</span>
          <span style={{ color: "#5a5040", fontSize: 13 }}>
            {rating >= 4.7 ? "Превосходно" : rating >= 4.4 ? "Очень хорошо" : "Хорошо"} · {reviews} отз.
          </span>
        </div>
        <div className="flex items-end justify-between mt-auto pt-3" style={{ borderTop: "1px solid rgba(13,27,42,0.08)" }}>
          <div>
            <div style={{ color: "#5a5040", fontSize: 11 }}>от</div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: "#0d1b2a", fontSize: 20, fontWeight: 700 }}>
              {price.toLocaleString("ru-RU")} ₸
            </div>
            <div style={{ color: "#5a5040", fontSize: 11 }}>за ночь</div>
          </div>
          <button
            className="px-4 py-2 rounded-sm text-sm transition-all duration-200"
            style={{ background: "#c9963a", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#b8872e")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#c9963a")}
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}
