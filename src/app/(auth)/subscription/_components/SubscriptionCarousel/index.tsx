"use client";

import * as React from "react";
import Slider from "react-slick";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "@/components/Button";
import PlanCard from "../PlanCard";

interface Plan {
  id: number;
  title: string;
  price: string;
  oldMonthlyPrice: string;
  oldPrice: string;
  discount?: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: 1,
    title: "اشتراک ۶ ماهه",
    price: "۱.۱۴۰.۰۰۰ تومان",
    oldMonthlyPrice: "ماهانه ۴۷.۵۰۰ تومان",
    oldPrice: "۱.۲۴۰.۰۰۰ تومان",
  },
  {
    id: 2,
    title: "اشتراک یک ماهه",
    price: "۵۷۰.۰۰۰ تومان",
    oldMonthlyPrice: "ماهانه ۴۷.۵۰۰ تومان",
    oldPrice: "۱.۲۴۰.۰۰۰ تومان",
    discount: "50 ٪ تخفیف",
    highlighted: true,
  },
  {
    id: 3,
    title: "اشتراک ۱۲ ماهه",
    price: "۱.۱۴۰.۰۰۰ تومان",
    oldMonthlyPrice: "ماهانه ۴۷.۵۰۰ تومان",
    oldPrice: "۱.۲۴۰.۰۰۰ تومان",
  },
];

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const Icon = direction === "left" ? ArrowLeft02Icon : ArrowRight02Icon;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-20 flex justify-center items-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-white transition cursor-pointer",
        direction === "left" ? "left-2" : "right-2",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <HugeiconsIcon icon={Icon} width={18} height={18} />
    </button>
  );
}

export default function SubscriptionCarousel() {
  const sliderRef = React.useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(1);

  const settings = {
    infinite: false,
    centerMode: true,
    slidesToShow: 1.05,
    centerPadding: "25px",
    speed: 500,
    dots: false,
    arrows: false,
    initialSlide: 1,
    swipeToSlide: true,
  };

  return (
    <div className="relative flex justify-center w-full select-none overflow-hidden">
      {/* Arrows */}
      <ArrowButton
        direction="left"
        disabled={currentSlide === 0}
        onClick={() => {
          setCurrentSlide((prev) => prev - 1);
          sliderRef.current?.slickPrev();
        }}
      />
      <ArrowButton
        direction="right"
        disabled={currentSlide === 2}
        onClick={() => {
          setCurrentSlide((prev) => prev + 1);
          sliderRef.current?.slickNext();
        }}
      />

      {/* Slider */}
      <div className="w-full max-w-[400px] overflow-hidden">
        <Slider ref={sliderRef} {...settings}>
          {plans.map((plan, index) => {
            const isActive = index === currentSlide;

            return (
              <PlanCard plan={plan} isActive={isActive} />
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
