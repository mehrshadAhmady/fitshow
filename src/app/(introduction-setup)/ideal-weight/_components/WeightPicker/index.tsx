"use client";

import { useEffect, useMemo, useRef } from "react";

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

  // Refs for drag state & timers (avoid re-renders while dragging)
  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const numbers = useMemo(
    () =>
      Array.from(
        { length: Math.floor((max - min) / step) + 1 },
        (_, i) => +(min + i * step).toFixed(1)
      ),
    [min, max, step]
  );

  const intValues = useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    [min, max]
  );

  // Center selected value when it changes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const index = numbers.findIndex((n) => Math.abs(n - value) < 0.05);
    if (index === -1) return;

    const child = el.children[index] as HTMLElement;
    el.scrollTo({
      left: child.offsetLeft - el.clientWidth / 2 + child.clientWidth / 2,
      behavior: "auto", // "instant" isn't standard
    });
  }, [numbers, value]);

  // Wheel: convert vertical wheel to horizontal scroll for mouse users
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // If vertical wheel dominates, treat it as horizontal scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as EventListener);
  }, []);

  // Pointer Events: robust drag-to-scroll (captures pointer outside the element)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      // Left button or primary pointer
      if (e.button !== 0 && e.pointerType === "mouse") return;
      draggingRef.current = true;
      pointerIdRef.current = e.pointerId;
      startXRef.current = e.clientX;
      startScrollLeftRef.current = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      el.scrollLeft = startScrollLeftRef.current - dx;
    };

    const endDrag = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      try {
        if (pointerIdRef.current !== null)
          el.releasePointerCapture(pointerIdRef.current);
      } catch {
        // ignore if already released
      }
      pointerIdRef.current = null;
      el.style.cursor = "grab";
      el.style.userSelect = "";
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("lostpointercapture", endDrag);

    // Default cursor
    el.style.cursor = "grab";

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("lostpointercapture", endDrag);
      el.style.cursor = "";
      el.style.userSelect = "";
    };
  }, []);

  // Scroll handling + snapping
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    let closest = intValues[0];
    let minDist = Infinity;

    const containerRect = el.getBoundingClientRect();
    const targetX = containerRect.left + el.clientWidth / 2;

    // Find nearest whole-number tick to the center line
    Array.from(el.children).forEach((child, i) => {
      const tickVal = numbers[i];
      if (!Number.isInteger(tickVal)) return;
      const rect = (child as HTMLElement).getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - targetX);
      if (dist < minDist) {
        minDist = dist;
        closest = tickVal;
      }
    });

    // Live update while scrolling
    setValue(closest);

    // Debounced snap after scrolling stops
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      const index = numbers.indexOf(closest);
      if (index === -1) return;
      const child = el.children[index] as HTMLElement;
      el.scrollTo({
        left: child.offsetLeft - el.clientWidth / 2 + child.clientWidth / 2,
        behavior: "smooth",
      });
    }, 150);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-40 select-none"
      style={{ direction: "ltr" }}
    >
      {/* Center indicator */}
      <div className="absolute top-5 bottom-0 left-1/2 -translate-x-1/2 z-10 w-2 h-24 bg-[#F97316] rounded-full shadow-[0_0_0_4px_#F9731640]" />

      {/* Scrollable ruler */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        // Let touch scroll horizontally; pointer events handle drag for mouse too
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          touchAction: "pan-x", // allow horizontal panning; prevents vertical blocking
        }}
        className="overflow-x-scroll w-full lg:w-[50%] flex items-center justify-start no-scrollbar snap-x snap-mandatory py-8 px-[170px] lg:px-[50%]"
      >
        {numbers.map((number, i) => {
          const isMajor = Number.isInteger(number);
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-end snap-center min-w-3"
              draggable={false}
            >
              <div
                className={`w-[2px] ${
                  isMajor ? "h-8 bg-black" : "h-4 -mt-4 bg-gray-400"
                }`}
              />
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
