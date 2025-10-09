"use client";

import { useRef, useEffect } from "react";

interface WeightPickerProps {
  value: number;
  setValue: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const WeightPicker = ({
  value,
  setValue,
  min = 30,
  max = 150,
  step = 0.2,
}: WeightPickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numbers = Array.from(
    { length: Math.floor((max - min) / step) + 1 },
    (_, i) => +(min + i * step).toFixed(1)
  );
  const intValues = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  useEffect(() => {
    if (!containerRef.current) return;

    const index = numbers.findIndex(
      (n) => Math.abs(n - value) < 0.05 // tolerance for float imprecision
    );
    if (index === -1) return;

    const element = containerRef.current.children[index] as HTMLElement;
    containerRef.current.scrollTo({
      left:
        element.offsetLeft -
        containerRef.current.clientWidth / 2 +
        element.clientWidth / 2,
      behavior: "instant",
    });
  }, [value]); // ✅ rerun when `value` changes

  // Detect nearest tick continuously (live update)
  let scrollTimeout: NodeJS.Timeout;
  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;

    let closest = intValues[0];
    let minDist = Infinity;

    Array.from(container.children).forEach((child, i) => {
      const tickVal = numbers[i];
      if (!Number.isInteger(tickVal)) return; // only whole numbers
      const rect = (child as HTMLElement).getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const dist = Math.abs(
        rect.left +
          rect.width / 2 -
          (containerRect.left + container.clientWidth / 2)
      );
      if (dist < minDist) {
        minDist = dist;
        closest = tickVal;
      }
    });

    // 👇 Live update while scrolling
    setValue(closest);

    // 👇 Then snap gently when scrolling stops
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const index = numbers.indexOf(closest);
      const el = container.children[index] as HTMLElement;
      container.scrollTo({
        left: el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2,
        behavior: "smooth",
      });
    }, 150);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-40"
      style={{ direction: "ltr" }}
    >
      {/* Center indicator */}
      <div className="absolute top-5 bottom-0 left-1/2 -translate-x-1/2 z-10 w-2 h-24 bg-[#F97316] rounded-full shadow-[0_0_0_4px_#F9731640]" />

      {/* Scrollable ruler */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: "170px",
          paddingRight: "170px",
        }}
        className="scroll-smooth overflow-x-scroll w-full flex items-center justify-start no-scrollbar snap-x snap-mandatory py-8 px-8"
      >
        {numbers.map((number, i) => {
          const isMajor = Number.isInteger(number);
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-end snap-center min-w-3"
            >
              {/* Tick mark */}
              <div
                className={`w-[2px] ${
                  isMajor ? "h-8 bg-black" : "h-4 -mt-4 bg-gray-400"
                }`}
              ></div>
              {isMajor && (
                <span className="mt-1 text-sm text-gray-600 worksans-semibold">
                  {number}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeightPicker;
