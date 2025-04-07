// src/components/CardRow.tsx

import { useRef } from "react";
import { ComplaintCard } from "./ComplaintCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardRowProps {
  title: string;
  cards: any[];
}

export const CardRow = ({ title, cards }: CardRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Inline styles for hiding scrollbar (cross-browser)
  const hideScrollbarStyles: React.CSSProperties = {
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE 10+
  };

  return (
    <div className="relative w-full mb-12">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-white mb-4 px-2">{title}</h2>

      {/* Left Scroll Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-[50%] transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full text-white"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-[50%] transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full text-white"
      >
        <ChevronRight size={28} />
      </button>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory px-4 sm:px-10"
        style={{
          ...hideScrollbarStyles,
        }}
        onWheel={(e) => {
          // Horizontal scroll with mouse wheel
          if (e.deltaY === 0) return;
          e.preventDefault();
          scrollRef.current?.scrollBy({ left: e.deltaY, behavior: "smooth" });
        }}
      >
        {/* Webkit scrollbar hide */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {cards.map((card, index) => (
          <div
            key={index}
            className="snap-start shrink-0 w-[250px] sm:w-[260px] md:w-[280px] lg:w-[300px]"
          >
            <ComplaintCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};
