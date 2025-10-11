"use client";

import { useRef, useEffect, useState } from "react";

interface Props {
  data: number;
  setData: (number: number) => void;
}

const HeightPicker = ({ data, setData }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);

  const numbers = Array.from({ length: 101 }, (_, i) => 100 + i);

  // Center on selected item
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const index = numbers.indexOf(data);
    const child = el.children[index] as HTMLElement;
    if (!child) return;

    el.scrollTo({
      top: child.offsetTop - el.clientHeight / 2 + child.clientHeight / 2,
      behavior: "auto",
    });
  }, [data]);

  // Detect nearest number while scrolling
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    let closest = numbers[0];
    let minDist = Infinity;
    const center = el.scrollTop + el.clientHeight / 2;

    Array.from(el.children).forEach((child, i) => {
      const rect = child as HTMLElement;
      const dist = Math.abs(rect.offsetTop + rect.clientHeight / 2 - center);
      if (dist < minDist) {
        minDist = dist;
        closest = numbers[i];
      }
    });

    setData(closest);
  };

  // ----- Mouse drag logic -----
  const handlePointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    if (e.pointerType === "mouse" && e.button !== 0) return; // left click only
    setIsDragging(true);
    startY.current = e.clientY;
    startScrollTop.current = el.scrollTop;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    const dy = e.clientY - startY.current;
    el.scrollTop = startScrollTop.current - dy;
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(false);
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
    el.style.cursor = "grab";
    el.style.userSelect = "";
  };
  // ----------------------------

  return (
    <div className="relative flex flex-col items-center justify-center w-54 h-90 cursor-pointer lg:h-120 select-none">
      {/* Fade gradients */}
      <div className="pointer-events-none absolute top-0 h-20 w-full bg-gradient-to-b from-white to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 h-20 w-full bg-gradient-to-t from-white to-transparent z-10" />

      {/* Scroll container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingTop: "150px",
          paddingBottom: "150px",
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "pan-y", // keeps native touch vertical scroll
        }}
        className="overflow-y-scroll h-full w-full flex flex-col items-center gap-1 no-scrollbar snap-y snap-mandatory py-8"
      >
        {numbers.map((number) => (
          <div
            key={number}
            className={`snap-center flex items-center justify-center ${
              number === data
                ? "text-white text-[5rem] worksans-extrabold bg-[#F97316] font-extrabold w-52 h-28 rounded-3xl border-2 border-[#FFEDD5] shadow-[0_0_0_4px_#F9731640]"
                : "text-gray-400 text-[3.375rem] worksans-bold font-bold"
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
