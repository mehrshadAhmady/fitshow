"use client";

import { useRef, useEffect } from "react";

interface Props {
  data: number;
  setData: (number: number) => void;
}

const HeightPicker = ({ data, setData }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const numbers = Array.from({ length: 101 }, (_, i) => 100 + i); // 150–190

  // Scroll to selected item on mount
  useEffect(() => {
    if (containerRef.current) {
      const index = numbers.indexOf(data);
      const element = containerRef.current.children[index] as HTMLElement;
      containerRef.current.scrollTo({
        top:
          element.offsetTop -
          containerRef.current.clientHeight / 2 +
          element.clientHeight / 2,
        behavior: "instant",
      });
    }
  }, []);

  // Detect nearest number after scroll
  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let closest = numbers[0];
    let closestDistance = Infinity;

    Array.from(container.children).forEach((child, i) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const distance = Math.abs(
        rect.top +
          rect.height / 2 -
          (container.getBoundingClientRect().top + container.clientHeight / 2)
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = numbers[i];
      }
    });

    setData(closest);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-54 h-80 cursor-pointer">
      {/* Fade gradients */}
      <div className="pointer-events-none absolute top-0 h-20 w-full bg-gradient-to-b from-white to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 h-20 w-full bg-gradient-to-t from-white to-transparent z-10" />

      {/* Scroll container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingTop: "150px",
          paddingBottom: "150px",
        }}
        className="scroll-smooth overflow-y-scroll h-full w-full flex flex-col items-center gap-4 no-scrollbar snap-y snap-mandatory"
      >
        {numbers.map((number) => (
          <div
            key={number}
            className={`snap-center flex items-center justify-center ${
              number === data
                ? "text-white text-7xl bg-[#F97316] font-extrabold w-52 h-28 rounded-3xl border-2 border-[#FFEDD5] shadow-[0_0_0_4px_#F9731640]"
                : "text-gray-400 text-3xl font-bold"
            }`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeightPicker;
